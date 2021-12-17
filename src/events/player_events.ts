import { Player, Queue, Track } from "discord-player";
import { inject, injectable } from "inversify";
import { MessageResponder } from "../services/message_responder";
import { TYPES } from "../util/types";

@injectable()
export class PlayerEvents {
    private player: Player;
    constructor(
        @inject(TYPES.Player) player: Player,
    ) {
        this.player = player;
    }

    events() {
        // Find a way to send messages in the channel the bot is active
        this.player.on('trackStart', (queue: Queue<any>, track: Track) => {
            queue.metadata.channel.send(`Now Playing ${track.title} in **${queue.connection.channel.name}** 😎`);
        });

        this.player.on('trackAdd', (queue: Queue<any>, track: Track) => {
            queue.metadata.channel.send(`Your wish is my command. Track ${track.title} now in your queue ✅`);
        });

        this.player.on('botDisconnect', (queue: Queue<any>) => {
            queue.metadata.channel.send('You removed me from the voice channel, your loss ❌');
        });

        this.player.on('channelEmpty', (queue: Queue<any>) => {
            queue.metadata.channel.send('If nobody\'s here, why should I care ... ❌');
        });

        this.player.on('queueEnd', (queue: Queue<any>) => {
            queue.metadata.channel.send('That\s all folks ✅');
        });

    }


}