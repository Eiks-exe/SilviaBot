import { Message } from 'discord.js';
import Action from './Action';

export default class coffee {
    static match(message: Message): boolean {
        return message.content.startsWith(`${process.env.PREFIX} coffee`) || message.content.startsWith(`${process.env.MOBPREFIX}coffee`) ;
    }
    static action(message: Message ,action: Action): void {
        action.coffee(message)
    }
}