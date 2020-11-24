import ytS from 'yt-search';
import youtubeStream from 'ytdl-core';
import Discord, { Message } from 'discord.js';
import { Queue } from '../Tool/Queue';

export default class player {
    private queue: Queue<string>;
    constructor() {
        this.queue = new Queue<string>();
        console.log(this.queue);
    }

    async play(SearchMsg: string, message: Message, url?: string): Promise<void> {
        try {
            const r = await ytS(SearchMsg);

            const videos = r.videos;
            //const playlists = r.playlists;
            //const accounts = r.accounts;

            const firstResult = videos[0];
            firstResult.url = url ? url : videos[0].url;
            console.log(firstResult);
            //console.log(firstResult.url)
            //console.log(videos)
            //console.log(firstResult.thumbnail)

            if (message.member?.voice.channel) {
                const connection = await message.member.voice.channel.join();

                const embed = new Discord.MessageEmbed();
                embed.setColor('#00cc00');
                embed.title = 'playing';
                embed.description = firstResult.title;
                embed.addField('duration', firstResult.timestamp);
                embed.addField('link', firstResult.url);
                embed.setThumbnail(firstResult.image);

                message.delete();
                message.channel.send(embed);
                this.queue.enqueue(firstResult.url);
                if (this.queue.size() > 0 || firstResult.url == this.queue.peek()) {
                    console.log('startplaying');
                    const stream = youtubeStream(this.queue.peek() || '');
                    const action = async () => {
                        //console.log('next' + this.queue.size())
                        console.log('dequeue');
                        this.queue.dequeue();
                        console.log('dequeue : OK');
                        if (this.queue.peek()) {
                            console.log('Play Next');
                            const temp = this.queue.peek() || '';
                            connection.disconnect();
                            await this.play(temp, message);
                            console.log('Play Next : OK');
                        } else {
                            connection.disconnect();
                        }
                    };
                    connection.play(stream).on('finish', action);
                }
            } else {
                message.delete();
                message.reply('u should be connected to a channel');
            }
        } catch (error) {
            console.error(error);
        }
    }
}
