import { Message } from 'discord.js';

export default class ty {
    static match(message: Message): boolean {
        return message.content.startsWith('thx <@!598581926898696203>');
    }

    static action(message: Message): void {
        message.channel
            .send('You are welcome <3')
            .then(() => {
                message.delete();
            })
            .catch(console.log);
    }
}
