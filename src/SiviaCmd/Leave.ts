import { Message } from 'discord.js';

export default class Leave {
    static match(message: Message): boolean {
        return message.content == `${process.env.PREFIX} leave`;
    }

    static action(message: Message): void {
        if (message.member?.voice.channel) {
            if (message.guild?.voice?.connection) {
                message.member.voice.channel.leave();
                message.channel.send('leaved');
                message.delete();
            }
        }
    }
}
