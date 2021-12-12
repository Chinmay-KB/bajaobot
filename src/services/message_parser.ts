import { Player, QueryType } from "discord-player";
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

    public async parseMessage(message: Message) {

        if (message.content.startsWith('--')) {
            const tokenised = message.content.split(' ');
            if (tokenised.length >= 3) {
                if (this.play.contains(tokenised[1])) {
                    const searchQuery = tokenised.slice(2, tokenised.length).reduce((prev, curr) => { return prev + " " + curr });
                    const _player = container.get<Player>(TYPES.Player);
                    const _res = await _player.search(searchQuery, {
                        requestedBy: message.member!,
                        searchEngine: QueryType.AUTO
                    });

                    if (!_res || !_res.tracks.length) {
                        return this.messageResponder.sendReply(message, 'No results found');
                    }

                    const _queue = await _player.createQueue(message.guild!, {
                        metadata: message.channel
                    });
                    try {
                        if (!_queue.connection) await _queue.connect(message.member!.voice.channel!);
                    }
                    catch {
                        await _player.deleteQueue(message.guild!.id);
                        return this.messageResponder.sendReply(message, 'Can\'t join this voice channel');
                    }
                    await this.messageResponder.sendReply(message, 'Loading the songs');
                    _res.playlist ? _queue.addTracks(_res.tracks) : _queue.addTrack(_res.tracks[0]);
                    if (!_queue.playing) await _queue.play();

                } else {
                    return this.messageResponder.sendReply(message, 'This is NOT a play command');

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