import { Player, QueryType, Queue } from "discord-player";
import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { MessageResponder } from "../services/message_responder";
import { Command } from "../util/command";
import container from "../util/inversify.config";
import { TYPES } from "../util/types";
import * as playdl from "play-dl";

@injectable()
export class PauseCommand {
    private messageResponder: MessageResponder;
    private pause = new Command('pause', 'px');

    constructor(
        @inject(TYPES.MessageResponder) messageResponder: MessageResponder
    ) {
        this.messageResponder = messageResponder;
    }
    /**
     * @param  {Message} message - Takes in the message in which the command was sent. It parses the contents
     * of this message and gets all the data required.
     */
    public async execute(message: Message) {
        const tokenised = message.content.split(' ');
        if (tokenised.length >= 2) {
            if (this.pause.contains(tokenised)) {
                // Concatenating all words to form the search query
                const _player = container.get<Player>(TYPES.Player);

                const queue = _player.getQueue(message.guild!.id);

                if (!queue) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

                const success = queue.setPaused(true);

                return message.channel.send(success ? `Current music ${queue.current.title} paused ✅` : `Something went wrong ${message.author}... try again ? ❌`);
            }
        }
        else { this.messageResponder.sendReply(message, `Tumse naa ho paayega ${message.author}`) }
    }
}