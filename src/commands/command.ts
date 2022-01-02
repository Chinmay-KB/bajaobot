import { Command } from "../util/command";
import { ClearCommand } from "./clear";
import { HelpCommand } from "./help";
import { NowPlayingCommand } from "./now_playing";
import { PauseCommand } from "./pause";
import { PlayCommand } from "./play";
import { QueueCommand } from "./queue";
import { ResumeCommand } from "./resume";
import { SkipCommand } from "./skip";
import { BackCommand } from "./back";
import { SeekCommand } from "./seek";

const commands = new Map<string, Command>([
    ['play', new Command('play', 'p', new PlayCommand, 'Play a song, or if a song is already playing, add it to the queue.')],
    ['pause', new Command('pause', 'px', new PauseCommand, 'Pause currently playing song')],
    ['resume', new Command('resume', 'res', new ResumeCommand, 'Resume currently paused song')],
    ['clear', new Command('clear', 'clr', new ClearCommand, 'Clear the queue')],
    ['nowPlaying', new Command('now', 'np', new NowPlayingCommand, 'Display info about now playing songs')],
    ['queue', new Command('queue', 'q', new QueueCommand, 'Display the queue')],
    ['skip', new Command('skip', 'skp', new SkipCommand, 'Skip currently playing track')],
    ['help', new Command('help', 'h', new HelpCommand, 'List all available commands')],
    ['bacc', new Command('bacc', 'b', new BackCommand, 'Plays the previous track (if available)')],
    ['seek', new Command('seek', 'sk', new SeekCommand, 'Seeks to the timestamp provided in the command, if applicable')]

]);





export { commands };
