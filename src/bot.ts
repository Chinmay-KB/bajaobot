import { Client, Intents, Message } from "discord.js";
import { inject, injectable } from "inversify";
import { MessageParser } from "./services/message_parser";
import { TYPES } from "./util/types";

@injectable()
export class BajaoBot {
    private client: Client;
    private readonly token: string;
    private messageParser: MessageParser;

    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.Token) token: string,
        @inject(TYPES.MessageParser) messageParser: MessageParser
    ) {
        this.client = client;
        this.token = token;
        this.messageParser = messageParser;
    }

    public listen(): Promise<string> {
        this.client.on('messageCreate', (message: Message) => {
            this.messageParser.parseMessage(message);
        });
        return this.client.login(this.token);
    }

}