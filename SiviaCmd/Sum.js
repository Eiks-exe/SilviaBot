const Discord = require('discord.js');
const giphyApi = require('giphy-api');
const gif = require('giphy-api')();

const client = new Discord.Client();
module.exports = class Sum {
    static match(message) {
        return message.content.startsWith('ninpo ')
    }

    static action(message) {
        gif.id('Mscw2tH9hcAne', function (err, res){
            
        });
        
        let dm = message.mentions.users.first();
        
        let a = message.content.split(' ')
        let summoned = a[a.length - 1]
        let embed = new Discord.MessageEmbed()
            .setColor('#00cc00')
            .setTitle('Hellow')
            .setDescription('**you have been summoned by:  **' + Object.values(message.author)[4] + ' in: ' + message.channel.name)
            .setThumbnail('https://cdn.discordapp.com/avatars/598581926898696203/61e90b2c4f5c6cfef254c053e873a5cc.webp')
            .setImage('https://giphy.com/gifs/naruto-uzumaki-shippuuden-Mscw2tH9hcAne')
        //console.log(member)
        console.log(message.author)
        dm.send(embed)
            .then(done => {
                message.delete()

                message.channel.send('ninpo: invocation ' + summoned )

            })
            .catch(console.log)
    }
}