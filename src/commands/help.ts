import { Player, } from "discord-player";
import { Client, Message, MessageEmbed } from "discord.js";
import container from "../util/inversify.config";
import { TYPES } from "../util/types";
import { BotCommand } from "./botcommand";
import { commands } from "./command";

export class HelpCommand extends BotCommand {
    /**
     * @param  {Message} message - Takes in the message in which the command was sent. It parses the contents
     * of this message and gets all the data required.
     */
    public async execute(message: Message) {


        const embed = new MessageEmbed();
        let helpCommands: string[] = new Array;
        commands.forEach((value, key, map) => {
            helpCommands.push(`Command :  **-- ${value.command}** | Alias : **-- ${value.alias}** | ${value.description}`);
        });

        embed.setDescription(helpCommands.join('\n'));

        embed.setTimestamp();

        embed.setFooter('Make discord music bots great again - Made with 🤬 by Kabi 🤓');

        message.channel.send({ embeds: [embed] });
    }
}