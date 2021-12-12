import { Client, Intents, Message } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "./util/types";

@injectable()
export class BajaoBot {
    private client: Client;
    private readonly token: string;

    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.Token) token: string
    ) {
        this.client = client;
        this.token = token
    }

    public listen(): Promise<string> {
        this.client.on('messageCreate', (message: Message) => {
            console.log("Message received", message.content);
        });
        return this.client.login(this.token);
    }

}