import { Player, QueryType, Queue } from "discord-player";
import { Message } from "discord.js";
import container from "../util/inversify.config";
import { TYPES } from "../util/types";
import * as playdl from "play-dl";
import { BotCommand } from "./botcommand";



export class PlayCommand extends BotCommand {
    /**
     * @param  {Message} message - Takes in the message in which the command was sent. It parses the contents
     * of this message and gets all the data required.
     */

    public async execute(message: Message) {
        const tokenised = message.content.split(' ');
        if (tokenised.length >= 3) {
            // Concatenating all words to form the search query
            const searchQuery = tokenised.slice(2, tokenised.length).reduce((prev, curr) => { return prev + " " + curr });
            const _player = container.get<Player>(TYPES.Player);
            const _res = await _player.search(searchQuery, {
                requestedBy: message.member!,
                searchEngine: QueryType.AUTO,

            });


            if (!_res || !_res.tracks.length) {
                return message.channel.send(`No results found ${message.author}, your taste in music suxx ☢️`);
            }

            // Using custom extractor to override youtube-dl with play-dl
            // youtube-dl is working very buggy at the moment.
            const _queue: Queue = _player.createQueue(message.guild!, {
                metadata: {
                    channel: message.channel,
                },
                async onBeforeCreateStream(track, source, _queue) {
                    return (await playdl.stream(track.url)).stream;
                },
            });


            try {
                if (!_queue.connection) await _queue.connect(message.member!.voice.channel!);
            }
            catch {
                _player.deleteQueue(message.guild!.id);
                return message.channel.send(`Can\'t join this voice channel, why is that? ${message.author}`);
            }
            // await message.channel.send(`Bajaoing ${_res.playlist ? 'playlist' : 'track'} 🎶🎶`);
            _res.playlist ? _queue.addTracks(_res.tracks) : _queue.addTrack(_res.tracks[0]);
            if (!_queue.playing) await _queue.play();


        }
        else { message.channel.send(`Tumse naa ho paayega ${message.author}`) }
    }
}