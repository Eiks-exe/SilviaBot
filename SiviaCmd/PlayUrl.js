var youtubeStream = require('ytdl-core');
const Discord = require('discord.js');
const {
    getInfo
} = require('ytdl-core');
module.exports = class Play {
    static match(message) {
        return message.content.startsWith(`${process.env.PREFIX} playUrl `)
    }

    static async action(message) {
        //let voiceChannel = message.guild.channels
        //    .filter(function (channel){return channel.type === 'voice'})
        //    .first() 
        let args = message.content.split(' ')
        let videoID = message.content.split('=')

        message.member.voice.channel
            .join()
            .then(function (connection) {
                message.delete()
                youtubeStream.getInfo(videoID[1]).then((i) => {
                    let embed = new Discord.MessageEmbed()
                    embed.setColor('#00cc00')
                    embed.title = 'playing'
                    embed.description = i.videoDetails.title
                    //embed.addField(i.videoDetails.author)
                    embed.setThumbnail('https://cdn.discordapp.com/avatars/598581926898696203/61e90b2c4f5c6cfef254c053e873a5cc.png?size=2048')

                    message.channel.send(embed)
                })
                let stream = youtubeStream(args[2])
                connection.play(stream).on('end', function () {
                    connection.disconnect()

                })

            })
            .catch(console.error);
    }

}