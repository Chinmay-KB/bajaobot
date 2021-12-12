import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import container from "../util/inversify.config";
import { TYPES } from "../util/types";
import { MessageResponder } from "./message_responder";
@injectable()
export class MessageParser {
    private messageResponder: MessageResponder;

    constructor(
        @inject(TYPES.MessageResponder) messageResponder: MessageResponder
    ) {
        this.messageResponder = messageResponder;
    }
    private play = new Command('play', 'p');

    public parseMessage(message: Message) {

        if (message.content.startsWith('--')) {
            const tokenised = message.content.split(' ');
            if (tokenised.length >= 3) {
                if (this.play.contains(tokenised[1])) {
                    this.messageResponder.sendReply(message, 'This is a play command');
                } else {
                    this.messageResponder.sendReply(message, 'This is NOT a play command');

                }
            }
        }

    }

}

class Command {
    private command: string;
    private alias: string;

    constructor(command: string, alias: string) {
        this.command = command;
        this.alias = alias;
    }

    contains(messageCommand: string): boolean {
        return messageCommand.search(this.command) >= 0;
    }
}