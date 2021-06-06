import { Message } from 'discord.js';

export default class Leave {
    static match(message: Message): boolean {
        return message.content == `${process.env.PREFIX} leave`;
    }

    static action(message: Message): void {
        if (message.member && message.member.voice.channel) {
            if (message.guild && message.member.voice.connection) {
                message.member.voice.channel.leave();
                message.channel.send('leaved');
                message.delete();
            }
        }
    }
}
