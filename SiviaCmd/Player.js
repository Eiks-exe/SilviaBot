const ytS = require('yt-search');
var youtubeStream = require('ytdl-core');
const Discord = require('discord.js');
const Queue = require('@datastructures-js/queue');


module.exports = class player {
    constructor() {
        this.queue = new Queue();
        console.log(this.queue);
    }

    play(SearchMsg , message) {
        let a = this.queue
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
                        a.enqueue(firstResult.url)
                        if (a.isEmpty() || firstResult.url == a.front()) {
                            console.log('startplaying')
                            let stream = youtubeStream(a.front())
                            connection.play(stream).on('end', function () {
                                console.log('next' + a.size())
                                a.dequeue()
                                if (a.size() > 0) {
                                    this.play(a.front())
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