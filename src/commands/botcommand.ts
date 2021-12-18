import { Message } from "discord.js";

export abstract class BotCommand {
    abstract execute(message: Message): any;
}