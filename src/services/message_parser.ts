import { Player, QueryType } from "discord-player";
import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { PlayCommand } from "../commands/play";
import { Command } from "../util/command";
import container from "../util/inversify.config";
import { TYPES } from "../util/types";
import { MessageResponder } from "./message_responder";
@injectable()
export class MessageParser {
    private messageResponder: MessageResponder;
    private play = new Command('play', 'p');
    constructor(
        @inject(TYPES.MessageResponder) messageResponder: MessageResponder
    ) {
        this.messageResponder = messageResponder;
    }

    public async parseMessage(message: Message) {

        if (message.content.startsWith('--')) {
            const tokenised = message.content.split(' ');
            if (tokenised.length >= 2) {
                if (this.play.contains(tokenised)) {
                    new PlayCommand(
                        container.get<MessageResponder>(TYPES.MessageResponder)
                    ).execute(message);
                }
            }
        }

    }

}

