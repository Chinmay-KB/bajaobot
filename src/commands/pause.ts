import { Player } from "discord-player";
import { Message } from "discord.js";
import container from "../util/inversify.config";
import { TYPES } from "../util/types";
import { BotCommand } from "./botcommand";

export class PauseCommand extends BotCommand {
    /**
     * @param  {Message} message - Takes in the message in which the command was sent. It parses the contents
     * of this message and gets all the data required.
     */
    public async execute(message: Message) {
        const tokenised = message.content.split(' ');
        if (tokenised.length >= 2) {
            const _player = container.get<Player>(TYPES.Player);

            const queue = _player.getQueue(message.guild!.id);

            if (!queue) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

            const success = queue.setPaused(true);

            return message.channel.send(success ? `Current music ${queue.current.title} paused ✅` : `Something went wrong ${message.author}... try again ? ❌`);
        }
        else { message.channel.send(`Tumse naa ho paayega ${message.author}`) }
    }
}