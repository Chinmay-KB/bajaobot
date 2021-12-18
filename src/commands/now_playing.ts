import { Player } from "discord-player";
import { Client, Message, MessageEmbed } from "discord.js";

import container from "../util/inversify.config";
import { TYPES } from "../util/types";
import { BotCommand } from "./botcommand";

export class NowPlayingCommand extends BotCommand {
    /**
     * @param  {Message} message - Takes in the message in which the command was sent. It parses the contents
     * of this message and gets all the data required.
     */
    public async execute(message: Message) {
        const _player = container.get<Player>(TYPES.Player);
        const client = container.get<Client>(TYPES.Client);

        const queue = _player.getQueue(message.guild!.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        const track = queue.current;

        const embed = new MessageEmbed();

        embed.setColor('BLUE');
        embed.setThumbnail(track.thumbnail);
        embed.setAuthor(track.title, client.user?.displayAvatarURL({ size: 512, dynamic: true }));


        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.end;
        const trackProgress = timestamp.progress;
        const progressBar = queue.createProgressBar();


        embed.setDescription(`Duration **${trackDuration}**\nProgress **${trackProgress}%** ${progressBar}\nPlayed by ${track.requestedBy}`);

        embed.setTimestamp();

        embed.setFooter('Make discord music bots great again - Made with 🤬 by Kabi 🤓');

        message.channel.send({ embeds: [embed] });
    }
}