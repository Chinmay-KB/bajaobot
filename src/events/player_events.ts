import { Player, Queue, Track } from "discord-player";
import { Client } from "discord.js";
import { inject, injectable } from "inversify";
import { MessageResponder } from "../services/message_responder";
import { TYPES } from "../util/types";

@injectable()
export class PlayerEvents {
    private player: Player;
    private messageResponder: MessageResponder;
    constructor(
        @inject(TYPES.Player) player: Player,
        @inject(TYPES.MessageResponder) messageResponder: MessageResponder
    ) {
        this.player = player;
        this.messageResponder = messageResponder;
    }

    events() {
        // Find a way to send messages in the channel the bot is active
        this.player.on('trackStart', (queue: Queue<any>, track: Track) => {

            console.log(`queue is ${queue} track is ${track}`);
            queue.metadata.send(`Started playing ${track.title} in **${queue.connection.channel.name}** 🎧`);
        });

    }


}