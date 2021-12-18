import { Player } from "discord-player";
import { Client, Message, MessageEmbed } from "discord.js";
import container from "../util/inversify.config";
import { TYPES } from "../util/types";
import { BotCommand } from "./botcommand";

export class QueueCommand extends BotCommand {
    /**
     * @param  {Message} message - Takes in the message in which the command was sent. It parses the contents
     * of this message and gets all the data required.
     */
    public async execute(message: Message) {
        const _player = container.get<Player>(TYPES.Player);
        const client = container.get<Client>(TYPES.Client);

        const queue = _player.getQueue(message.guild!.id);

        const embed = new MessageEmbed();

        embed.setColor('BLUE');
        embed.setAuthor(`Server queue - ${message.guild?.name}`, client.user?.displayAvatarURL({ size: 512, dynamic: true }));

        const tracks = queue.tracks.map((track, i) => `#**${i + 1}** - ${track.title} | ${track.author} (played by : ${track.requestedBy})`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `And **${songs - 5}** more tracks...` : `In this queue **${songs}** song${songs > 1 ? 's' : ''}...`;

        embed.setDescription(`Current ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

        embed.setTimestamp();
        embed.setFooter('Make discord music bots great again - Made with 🤬 by Kabi 🤓');

        message.channel.send({ embeds: [embed] });
    }
}