const Discord = require('discord.js')

module.exports = class SumV
{

    static match(message)
    {
        return message.content.startsWith('<@!598581926898696203> sumv')
    }

    static action(message)
    {
        if(message.member.voice.channel)
        {   
            let mention = message.mentions.users.first();
            let summoner = message.member ;
            let embed = new Discord.RichEmbed()
                .setTitle('hellow')
                .setDescription('you have been invited by: ' + summoner + 'in: ' + message.member.voice.channel)
                .setThumbnail('https://cdn.discordapp.com/avatars/598581926898696203/7bfb011f9100c1b9e4c6a6af5a722757.png')
                .addField('come to talk :grin:')
                .setURL('')
                
            mention.send(embed)
                .then(done =>
                {
                    message.delete()
                    message.channel.send('done!')
                })
                .catch(console.log)

        }
    }
}