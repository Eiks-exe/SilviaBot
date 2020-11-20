const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = class Sum {
    static match(message) {
        return message.content.startsWith('sum ')
    }
    static action(message) {
        client.login('NTk4NTgxOTI2ODk4Njk2MjAz.XSYveQ.F3zsMR1TpJCd6SFvGN2CphsLx-w');
        let a = message.content.split(' ')
        let b = a[a.length-1];
        let c = b.replace('<@!','')
        let mention = c.replace('>','')
        //let dm = client.users.fetch(mention);
        let embed = new Discord.MessageEmbed()
        embed.setColor('#00cc00')
        embed.title = 'Hellow'
        embed.setDescription('**you have been summoned by:  **' + message.author + 'in: ' + message.channel)
        embed.setThumbnail('https://cdn.discordapp.com/avatars/598581926898696203/7bfb011f9100c1b9e4c6a6af5a722757.png')
        //console.log(member)
        console.log(message.author)
        console.log(mention)
       
        //.addField('by: ' + summoner )
        //.addField('in: ' + message.channel)
//        client.users.fetch(mention)
//          .then((user) =>{
//                user.send('hi')
//            })
//          .catch(console.log)
        /*dm.send("invocation ")
            .then(done => {
                message.delete()
                message.channel.send('done')
            })
            .catch(console.log)*/
    }
}