const yts = require('yt-search');
var youtubeStream = require('ytdl-core');
const Discord = require('discord.js');
const Play = require('./PlayUrl');
const Queue = require('@datastructures-js/queue');


module.exports = class player {
    constructor(){
        this.queue = new Queue()
        this.connection = undefined
    }
        
    async play(SearchMsg, message, nextPlay) {
        try{
            let itemUrl = '' 
            if(nextPlay){
                const {url , title , timestamp , image } = await (await yts({videoId: nextPlay.replace('https://youtube.com/watch?v=','')}))
                itemUrl= url;
                playEmbed('▶ Playing', title, timestamp, url, image);
            }else{
                const {url , title , timestamp , image } = await (await yts(SearchMsg)).videos[0]
                itemUrl= url;
                playEmbed('✅ Added to queue', title, timestamp,url, image)
            }
            if(message.member.voice.channel){
                this.connection = await message.member.voice.channel.join()
                if(itemUrl != this.queue.front()) this.queue.enqueue(itemUrl);
                if(itemUrl === this.queue.front()){
                    
                    

                    const stream = youtubeStream(this.queue.front());
                    const action = async () => {
                        this.queue.dequeue()
                        if(this.queue.front()){
                            const temp = this.queue.front();
                            this.play('', message, temp).catch(error)
                        }else{
                            message.channel.send('❎ queue is empty')
                            this.connection.disconnect()
                            
                        }
                    };
                    this.connection.play(stream).on('finish',action)
                    console.log('startplaying ' + this.queue.front());
                }
            }else{
                message.delete()
                message.reply('❌ you must be in a VoiceChannel')
            }
        } catch(error){
            console.error(error)
        }
            function playEmbed(statut, title, timestamp, url, image){
            let embed = new Discord.MessageEmbed()
                        embed.setColor('#00cc00')
                        embed.title = statut
                        embed.description = title ;
                        embed.addField('duration', timestamp);
                        embed.addField('link', url)
                        embed.setThumbnail(image)
                        message.channel.send(embed)
                        if(statut === '✅ Added to queue'){
                            message.delete()
                        } 

        } 
    }

    async stop(message){
        try{
            if(this.connection){
                this.connection.disconnect()
                this.queue.clear()
                message.channel.send('i stopped playing')
            }else{
                
            }
            
        }catch(error){
            console.error(error)
        }
    }
    
}