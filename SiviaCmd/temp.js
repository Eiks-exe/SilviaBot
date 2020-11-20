const ytS = require('yt-search')
var youtubeStream = require('ytdl-core')
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = class temp {
    static match(message) {
        return message.content.startsWith('<@!598581926898696203> play ')
    }

    static action(message) {
        let args = message.content.split('<@!598581926898696203> play ') // crée un array avec le contenu du msg séparé par un ' ' 
        let StrArgs = args[1]
        // reconversion du tableau en chaine de caractères
        //console.log(StrArgs)
        ytS(StrArgs, function (err, r) {
            if (err) throw err

            const videos = r.videos
            const playlists = r.playlists
            const accounts = r.accounts

            const firstResult = videos[0]

            console.log(firstResult)
            //console.log(firstResult.url)
            //console.log(videos)
            //console.log(firstResult.thumbnail)

            if (message.member.voice.channel) {
                message.member.voice.channel
                    .join()
                    .then(function (connection) {
                        let stream = youtubeStream(firstResult.url)
                        let embed = new Discord.MessageEmbed()
                        embed.setColor('#00cc00')
                        embed.title = 'playing'
                        embed.description = firstResult.title
                        embed.addField('duration', firstResult.timestamp)
                        embed.addField('link', firstResult.url)
                        embed.setThumbnail(firstResult.image)

                        message.delete()
                        message.channel.send(embed)
                        connection.play(stream).on('end', function () {
                            connection.disconnect()


                        })

                    })
                    .catch(console.error);
            }
            else {
                message.delete()
                message.reply('u should be connected to a channel');
            }

        })
    }
}