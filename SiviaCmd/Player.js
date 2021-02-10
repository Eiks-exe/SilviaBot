const yts = require('yt-search');
var youtubeStream = require('ytdl-core');
const Discord = require('discord.js');
const Play = require('./PlayUrl');
const Queue = require('@datastructures-js/queue');


module.exports = class Player {
    constructor(){
        this.queue = new Queue()
        this.connection = undefined ;
        this.stream = undefined
        this.message
    }
        
    async play(SearchMsg, message, nextPlay) {
        try{
            let itemUrl = '' 
            if(nextPlay){
                const {url , title , timestamp , image } = await (await yts({videoId: nextPlay.replace('https://youtube.com/watch?v=','')}))
                itemUrl= url;
                this.playEmbed(
                    "▶ Playing",
                    title,
                    timestamp,
                    url,
                    image
                )

            }else{
                const {url , title , timestamp , image } = await (await yts(SearchMsg)).videos[0]
                itemUrl = url;
                this.queue.size() && this.playEmbed('✅ Added to queue', title, timestamp, url, image);
                !this.queue.size() && this.playEmbed(
                  "▶ Playing",
                  title,
                  timestamp,
                  url,
                  image
                )
                
            }
            if(message.member.voice.channel){
                this.connection = await message.member.voice.channel.join()
                if(itemUrl != this.queue.front()) this.queue.enqueue(itemUrl);
                if(itemUrl === this.queue.front()){
                    

                    this.stream = youtubeStream(this.queue.front() ,  {filter: 'audioonly' , quality:'lowestaudio'});
                    const action = async () => {
                        this.queue.dequeue()
                        if(this.queue.front()){
                            this.play('', message, this.queue.front())
                        }else{
                            message.channel.send('❎ queue is empty')
                            this.connection.disconnect()
                        }
                    };
                    this.connection.play(this.stream).on('finish',action)
                    
                    
                    console.log('startplaying ' + this.queue.front());
                }
            }else{
                message.delete()
                message.reply('❌ you must be in a VoiceChannel')
            }
        } catch(error){
            console.error(error)
        }

    }

    async playEmbed(statut, title, timestamp, url, image){
            
        let embed = new Discord.MessageEmbed();
            embed.setColor('#00cc00');
            embed.title = statut
            embed.description = title ;
            embed.addField('duration', timestamp);
            embed.addField('link', url);
            embed.setThumbnail(image);
                const embedMsg = await message.channel.send(embed);
            if(statut === '✅ Added to queue'){
                embedMsg;
                message.delete();
            } else {
                embedMsg;
                embedMsg.react('⏹');
                embedMsg.react('⏭');
                embedMsg.react('🔈');
                embedMsg.react('🔉');
                embedMsg.react('🔊');
                
                const filter = (reaction, user) => {
                    return ["⏹", "⏭", "🔈", "🔉", "🔊"].includes(reaction.emoji.name) && user.id === message.author.id;
                };
                
                const collector = embedMsg.createReactionCollector(filter, { time: 60000 });
                
                collector.on("collect", async (reaction, user ) => {
                    try {
                        if(user){
                            switch (reaction.emoji.name) {
                                case '⏹':
                                    collector.stop() ;
                                    this.connection.disconnect();
                                    reaction.message.reactions.removeAll();
                                    break;
                                case '⏭':
                                    collector.stop() ;
                                    reaction.message.reactions.removeAll();
                                    this.connection.play(this.stream).destroy();
                                    this.queue.dequeue();
                                    if(this.queue.front()){
                                        message.channel.send('⏭ song skipped');
                                        this.play('', message, this.queue.front());
                                    }else{
                                        message.channel.send('❎ queue is empty');
                                        this.connection.disconnect();
                                        
                                    }
                                    break;
                                case '🔈':
                                    this.connection.play(this.stream).setVolume(0.5)
                                    message.channel.send('🔈');
                                    break;
                                case '🔊':
                                    this.connection.play(this.stream).setVolume(1)
                                    message.channel.send('🔉');
                                    break;
                                case '🔊':
                                    this.connection.play(this.stream).setVolume(2)
                                    message.channel.send('🔊');
                                    break;       
                                default:
                                    message.channel.send('an error occured');
                                    break;
                            }
                        }
                    } catch(err){
                        console.error(err);
                    }
                })
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
    async skip(message){
        try{
            if(this.connection){
                this.connection.play(this.stream).destroy()
                this.queue.dequeue()
                        if(this.queue.front()){
                            message.channel.send('⏭ song skipped')
                            this.play('', message, this.queue.front())
                        }else{
                            message.channel.send('❎ queue is empty')
                            this.connection.disconnect()
                            
                        }
            }
        }catch(error){
            console.error(error)
        }
    }

}