import { Message } from "discord.js";
import { injectable } from "inversify";
import { commands } from "../commands/command";
@injectable()
export class MessageParser {

    public async parseMessage(message: Message) {

        if (message.content.startsWith('--')) {
            const tokenised = message.content.split(' ');
            if (tokenised.length >= 2) {
                commands.forEach((value, key, map) => {
                    if (value.contains(tokenised))
                        value.botCommand.execute(message);
                });
            }
        }

    }

}

