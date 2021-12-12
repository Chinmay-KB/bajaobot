import { Message } from "discord.js";
import { inject, injectable } from "inversify";

@injectable()
export class MessageResponder {
    public sendReply(message: Message, reply: string): Promise<Message | Message[]> {
        return message.reply(reply);
    }
}