import { BotCommand } from "../commands/botcommand";

export class Command {
    public command: string;
    public alias: string;
    public description: string;
    public botCommand: BotCommand;

    constructor(command: string, alias: string, botCommand: BotCommand, description: string,) {
        this.command = command;
        this.alias = alias;
        this.description = description;
        this.botCommand = botCommand;
    }



    /**
     * @param  {string[]} messageCommand : Takes in the tokenised array of messages, excluding the trigger
     * @returns boolean - whether the message was regarding a command or not
     */
    contains(messageCommand: string[]): boolean {
        return messageCommand[1].search(this.command) >= 0 || messageCommand[1] === this.alias;
    }


}