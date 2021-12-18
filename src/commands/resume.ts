import { Player, QueryType, Queue } from "discord-player";
import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { MessageResponder } from "../services/message_responder";
import { Command } from "../util/command";
import container from "../util/inversify.config";
import { TYPES } from "../util/types";
import { BotCommand } from "./botcommand";

export class ResumeCommand extends BotCommand {

    /**
     * @param  {Message} message - Takes in the message in which the command was sent. It parses the contents
     * of this message and gets all the data required.
     */
    public async execute(message: Message) {
        const _player = container.get<Player>(TYPES.Player);

        const queue = _player.getQueue(message.guild!.id);

        if (!queue) return message.channel.send(`It's very quiet out here ${message.author}... isn't it ? ❌`);

        const success = queue.setPaused(false);

        return message.channel.send(success ? `Let the music ${queue.current.title} play ✅` : `Something went wrong ${message.author}... try again ? ❌`);
    }
}