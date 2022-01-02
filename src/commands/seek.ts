import { Player } from "discord-player";
import { Message } from "discord.js";
import container from "../util/inversify.config";
import { TYPES } from "../util/types";
import { BotCommand } from "./botcommand";
import ms from "ms";

export class SeekCommand extends BotCommand {

    /**
     * @param  {Message} message - Takes in the message in which the command was sent. It parses the contents
     * of this message and gets all the data required.
     */
    public async execute(message: Message) {
        const tokenised = message.content.split(' ');
        if (tokenised.length == 3) {
            const _player = container.get<Player>(TYPES.Player);

            const queue = _player.getQueue(message.guild!.id);

            if (!queue || !queue.playing) return message.channel.send(`What is dead may never move,got it ${message.author}? No music to seek, no music to groove 🤷‍♂️`);

            try {
                const msTime = ms(tokenised[2]);
                if (msTime >= queue.current.durationMS) {
                    return message.channel.send(`Can't go beyond the speed of light, or the duration of the track folks🤷‍♂️`);
                }
                await queue.seek(msTime);
            }
            catch (e) {
                message.channel.send(`Time entered is not proper`);
            }
        } else {
            message.channel.send(`Wrong usage of this command.`)
        }
    }
}