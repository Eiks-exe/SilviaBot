import ytS from 'yt-search';
import youtubeStream from 'ytdl-core';
import Discord, { Message } from 'discord.js';
import { Queue } from '../Tool/Queue';

export default class player {
    private queue: Queue<string>;
    connection: any;
    constructor() {
        this.queue = new Queue<string>();
        console.log(this.queue);
        this.connection = undefined ;
    }

    async play(SearchMsg: string, message: Message, nextPlay?: string): Promise<void> {
        try {
            let itemUrl = '';
            if (nextPlay) {
                const { url, title, timestamp, image } = await ytS({
                    videoId: nextPlay.replace('https://youtube.com/watch?v=', ''),
                });
                itemUrl = url;
                this.playMessage('playing', title, timestamp, url, image, message);
            } else {
                const { url, title, timestamp, image } = await (await ytS(SearchMsg)).videos[0];
                itemUrl = url;

                this.playMessage('add playlist', title, timestamp, url, image, message);
            }

            if (message.member?.voice.channel) {
                this.connection = await message.member.voice.channel.join();
                if (itemUrl != this.queue.peek()) this.queue.enqueue(itemUrl);
                if (itemUrl === this.queue.peek()) {
                    console.log('startplaying ' + this.queue.peek());
                    const stream = youtubeStream(this.queue.peek() || '');
                    const action = async () => {
                        //console.log('next' + this.queue.size())
                        this.queue.dequeue();
                        if (this.queue.peek()) {
                            console.log(this.queue.peek());
                            const temp = this.queue.peek() || '';
                            await this.play('', message, temp);
                        } else {
                            //console.log('disconnecting');
                            this.connection.disconnect();
                        }
                    };
                    this.connection.play(stream).on('finish', action);
                }
            } else {
                message.delete();
                message.reply('u should be connected to a channel');
            }
        } catch (error) {
            console.error('ERR:', error);
        }
    }

    async stop(message: Message){
        try{
            if(this.connection){
                this.connection.disconnect();
                this.queue.clear();
                message.reply('i stopped playing');
            }else{
                message.reply("im not playing playing anything right now.")
            }
        }catch(error){
            console.error(error)
        }
    }

    private playMessage(
        status: 'playing' | 'add playlist',
        title: string,
        timestamp: string,
        url: string,
        image: string,
        message: Discord.Message,
    ) {
        const embed = new Discord.MessageEmbed();
        embed.setColor('#00cc00');
        embed.title = status;
        embed.description = title;
        embed.addField('duration', timestamp);
        embed.addField('link', url);
        embed.setThumbnail(image);
        message.channel.send(embed);
        if (status == 'add playlist') message.delete();
    }
}
