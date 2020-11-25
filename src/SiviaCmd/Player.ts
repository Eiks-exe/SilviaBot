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
            const firstResult = videos[0];
            firstResult.url = url ? url : videos[0].url;
            if (message.member?.voice.channel) {
                const connection = await message.member.voice.channel.join();

                const embed = new Discord.MessageEmbed();
                embed.setColor('#00cc00');
                embed.title = 'playing';
                embed.description = firstResult.title;
                embed.addField('duration', firstResult.timestamp);
                embed.addField('link', firstResult.url);
                embed.setThumbnail(firstResult.image);

                if (!url) message.delete();
                message.channel.send(embed);
                if (firstResult.url != this.queue.peek()) this.queue.enqueue(firstResult.url);
                if (firstResult.url === this.queue.peek()) {
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
