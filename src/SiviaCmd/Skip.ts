import { Message } from 'discord.js';
import Player from './Player';

export default class skip {
    static match(message: Message): boolean {
        return message.content.startsWith(`${process.env.PREFIX} skip`) || message.content.startsWith(`${process.env.MOBPREFIX}skip`) ;
    }
    static action(message: Message ,lect: Player): void {
        lect.skip(message)
    }
}