import { Message } from 'discord.js';

export default class stop {
    static match(message: Message): boolean {
        return message.content.startsWith('<@!598581926898696203> stop');
    }
    static action(message: Message): void {
        if (message.member?.voice.channel)
            message.member.voice.channel.join().then(function (connection) {
                connection.dispatcher.end();
                message.delete();
                message.channel.send('i stopped');
            });
    }
}
