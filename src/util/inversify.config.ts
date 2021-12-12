import "reflect-metadata";
import { Container } from "inversify";
import { BajaoBot } from "../bot";
import { Client, Intents } from "discord.js";
import { TYPES } from "./types";

let container = new Container();

container.bind<BajaoBot>(TYPES.BajaoBot).to(BajaoBot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
}));
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN!);

export default container;