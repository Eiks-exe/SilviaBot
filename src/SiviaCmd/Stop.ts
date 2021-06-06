import { Message } from 'discord.js';
import Player from './Player';

export default class stop {
    static match(message: Message): boolean {
        return message.content.startsWith(`${process.env.PREFIX} stop`) || message.content.startsWith(`${process.env.MOBPREFIX}stop`) ;
    }
    static action(message: Message ,lect: Player): void {
        lect.stop(message)
    }
}
