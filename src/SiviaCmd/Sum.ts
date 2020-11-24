import { Message, MessageEmbed } from 'discord.js';

//import gif from 'giphy-api' ;
export default class Sum {
    static match(message: Message): boolean {
        return message.content.startsWith('ninpo ');
    }

    static action(message: Message): void {
        const dm = message.mentions.users.first();

        const a = message.content.split(' ');
        const summoned = a[a.length - 1];
        const embed = new MessageEmbed()
            .setColor('#00cc00')
            .setTitle('Hellow')
            .setDescription(
                '**you have been summoned by:  **' + Object.values(message.author)[4] + ' in: ' + message.channel.id,
            )
            .setThumbnail(
                'https://cdn.discordapp.com/avatars/598581926898696203/61e90b2c4f5c6cfef254c053e873a5cc.webp',
            );
        //console.log(member)
        console.log(message.author);
        dm?.send(embed)
            .then(() => {
                message.delete();

                message.channel.send('ninpo: invocation ' + summoned);
            })
            .catch(console.log);
    }
}
