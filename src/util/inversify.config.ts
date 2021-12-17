import "reflect-metadata";
import { Container } from "inversify";
import { BajaoBot } from "../bot";
import { Client, Intents } from "discord.js";
import { TYPES } from "./types";
import { Player } from "discord-player";
import { MessageResponder } from "../services/message_responder";
import { MessageParser } from "../services/message_parser";
import { PlayCommand } from "../commands/play";
import { PlayerEvents } from "../events/player_events";

let container = new Container();

container.bind<BajaoBot>(TYPES.BajaoBot).to(BajaoBot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ],
}));
container.bind<Player>(TYPES.Player).toConstantValue(new Player(container.get<Client>(TYPES.Client), {

}))
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN!);
container.bind<MessageResponder>(TYPES.MessageResponder).toConstantValue(new MessageResponder(container.get<Client>(TYPES.Client)));
container.bind<MessageParser>(TYPES.MessageParser).toConstantValue(new MessageParser(container.get<MessageResponder>(TYPES.MessageResponder)));
var _playerEvents = new PlayerEvents(container.get<Player>(TYPES.Player));
_playerEvents.events();
export default container;