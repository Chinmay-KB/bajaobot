import { Channel, Client, Guild, Message } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../util/types";

@injectable()
export class MessageResponder {
    private client: Client;
    constructor(
        @inject(TYPES.Client) client: Client
    ) {
        this.client = client;
    }
    public sendReply(message: Message, reply: string): Promise<Message | Message[]> {
        return message.reply(reply);
    }

    public sendMessage(channel: Channel, message: String) {
        // channel.
    }
}