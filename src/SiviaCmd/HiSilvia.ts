import { Message } from 'discord.js';

export default class HiSilvia {
    static match(message: Message): boolean {
        return message.content.startsWith(`hi ${process.env.PREFIX}`);
    }

    static action(message: Message): void {
        console.log(message.reply('Hi! comment vas tu <3 ?'));
    }
}
