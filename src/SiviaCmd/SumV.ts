import { Message, MessageEmbed } from 'discord.js';

export default class SumV {
    static match(message: Message): boolean {
        return message.content.startsWith('<@!598581926898696203> sumv');
    }

    static action(message: Message): void {
        if (message.member?.voice.channel) {
            const mention = message.mentions.users.first();
            const summoner = message.member;
            const embed = new MessageEmbed()
                .setTitle('hellow')
                .setDescription('you have been invited by: ' + summoner + 'in: ' + message.member.voice.channel)
                .setThumbnail(
                    'https://cdn.discordapp.com/avatars/598581926898696203/7bfb011f9100c1b9e4c6a6af5a722757.png',
                )
                .addField('name', 'come to talk :grin:')
                .setURL('');

            if (mention)
                mention
                    .send(embed)
                    .then(() => {
                        message.delete();
                        message.channel.send('done!');
                    })
                    .catch(console.log);
        }
    }
}
