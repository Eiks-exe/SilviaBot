const ytS = require('yt-search');
var youtubeStream = require('ytdl-core');
const Discord = require('discord.js');
const Queue = require('@datastructures-js/queue');


module.exports = class player {
   
    play(SearchMsg, message, url) {
        let a = this
        ytS(SearchMsg, function (err, r) {
            if (err) throw err

            const videos = r.videos
            const playlists = r.playlists
            const accounts = r.accounts

            const firstResult = videos[0]
            firstResult.url = url ? url : videos[0].url
            console.log(firstResult)
            //console.log(firstResult.url)
            //console.log(videos)
            //console.log(firstResult.thumbnail)

            if (message.member.voice.channel) {
                message.member.voice.channel
                    .join()
                    .then(function (connection) {
                        const data = {
                            title: firstResult.title, 
                            timestamp:firstResult.timestamp, 
                            url: firstResult.url, 
                            image: firstResult.image
                        }
                        playEmbed('playing', data)
                        
                        console.log('startplaying')
                        let stream = youtubeStream(firstResult.url)
                        connection.play(stream).on('finish', () => {
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
        
  
        async function playEmbed(statut, info){
            let embed = new Discord.MessageEmbed()
                        embed.setColor('#00cc00')
                        embed.title = 'playing'
                        embed.description = Object.values(info)[0]
                        embed.addField('duration', Object.values(info)[1])
                        embed.addField('link', Object.values(info)[2])
                        embed.setThumbnail(Object.values(info)[3])

                        message.delete()
                        message.channel.send(embed)

        } 
    }
    
}