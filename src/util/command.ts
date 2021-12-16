export class Command {
    private command: string;
    private alias: string;

    constructor(command: string, alias: string) {
        this.command = command;
        this.alias = alias;
        
    }
    /**
     * @param  {string[]} messageCommand : Takes in the tokenised array of messages, excluding the trigger
     * @returns boolean - whether the message was regarding a command or not
     */
    contains(messageCommand: string[]): boolean {
        return messageCommand[1].search(this.command) >= 0 || messageCommand[1] === this.alias;
    }

}