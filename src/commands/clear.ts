import { Player } from "discord-player";
import { Message } from "discord.js";
import container from "../util/inversify.config";
import { TYPES } from "../util/types";
import { BotCommand } from "./botcommand";

export class ClearCommand extends BotCommand {

    /**
     * @param  {Message} message - Takes in the message in which the command was sent. It parses the contents
     * of this message and gets all the data required.
     */
    public async execute(message: Message) {
        const _player = container.get<Player>(TYPES.Player);

        const queue = _player.getQueue(message.guild!.id);

        if (!queue || !queue.playing) return message.channel.send(`What is dead may never die,got it ${message.author}? No music to clear 🤷‍♂️`);

        // if (!queue.tracks[0]) return message.channel.send(`No music in the queue after the current one ${message.author}... try again ? ❌`);

        queue.clear();

        message.channel.send(`The queue is now as useless as \`ueue\` in \`queue\`🗑️`);
    }
}