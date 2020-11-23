const ytS = require('yt-search');
var youtubeStream = require('ytdl-core');
const Discord = require('discord.js');
const Queue = require('@datastructures-js/queue');


module.exports = class player {
    constructor() {
        this.queue = new Queue();
        console.log(this.queue);
    }

    play(SearchMsg, message) {
        let a = this
        ytS(SearchMsg, function (err, r) {
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

                        let embed = new Discord.MessageEmbed()
                        embed.setColor('#00cc00')
                        embed.title = 'playing'
                        embed.description = firstResult.title
                        embed.addField('duration', firstResult.timestamp)
                        embed.addField('link', firstResult.url)
                        embed.setThumbnail(firstResult.image)

                        message.delete()
                        message.channel.send(embed)
                        a.queue.enqueue(firstResult.url)
                        if (a.queue.isEmpty() || firstResult.url == a.queue.front()) {
                            console.log('startplaying')
                            let stream = youtubeStream(a.queue.front())
                            connection.play(stream).on('finish', () => {
                                //console.log('next' + a.size())
                                message.channel.send('next')
                                a.queue.dequeue()
                                message.channel.send('next')
                                if (!a.queue.isEmpty()) {
                                    message.channel.send('next')
                                    a.play(a.queue.front())
                                    message.channel.send('next')
                                } else {
                                    connection.disconnect()
                                }
                            })
                        }


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