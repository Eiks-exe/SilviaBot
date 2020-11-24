import { Message } from 'discord.js';

export default class Join {
    static match(message: Message): boolean {
        return message.content == '<@!598581926898696203> join';
    }

    static action(message: Message): void {
        if (message.member && message.member.voice.channel) {
            message.member.voice.channel
                .join()
                .then(() => {
                    message.delete();
                    message.reply('I have successfully connected to the channel!');
                })
                .catch(console.log);
        } else {
            message.reply('u should be connected to a channel sir');
        }
    }
}
