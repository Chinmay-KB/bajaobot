import { Player } from "discord-player";
import { Message } from "discord.js";
import container from "../util/inversify.config";
import { TYPES } from "../util/types";
import { BotCommand } from "./botcommand";

export class SkipCommand extends BotCommand {

    /**
     * @param  {Message} message - Takes in the message in which the command was sent. It parses the contents
     * of this message and gets all the data required.
     */
    public async execute(message: Message) {
        const _player = container.get<Player>(TYPES.Player);

        const queue = _player.getQueue(message.guild!.id);

        if (!queue || !queue.playing) return message.channel.send(`Nothing to skip over ${message.author} 🫂`);

        const success = queue.skip();

        return message.channel.send(success ? `${queue.current.title} is skipped ✅` : `Oopsie, something went wrong ${message.author}... try again ? ❌`);
    }
}