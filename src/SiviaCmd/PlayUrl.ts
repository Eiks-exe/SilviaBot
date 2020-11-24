/* import { Message } from "discord.js";

import youtubeStream from 'ytdl-core';
import Discord from 'discord.js';
const { getInfo } = require('ytdl-core');
export class Play {
    static match(message: Message): boolean {
        return message.content.startsWith('<@!598581926898696203> playUrl ');
    }

    static async action(message) {
        //let voiceChannel = message.guild.channels
        //    .filter(function (channel){return channel.type === 'voice'})
        //    .first()
        const args = message.content.split(' ');
        const videoID = message.content.split('=');

        message.member.voice.channel
            .join()
            .then(function (connection) {
                message.delete();
                youtubeStream.getInfo(videoID[1]).then((i) => {
                    const embed = new Discord.MessageEmbed();
                    embed.setColor('#00cc00');
                    embed.title = 'playing';
                    embed.description = i.videoDetails.title;
                    //embed.addField(i.videoDetails.author)
                    embed.setThumbnail(
                        'https://cdn.discordapp.com/avatars/598581926898696203/61e90b2c4f5c6cfef254c053e873a5cc.png?size=2048',
                    );

                    message.channel.send(embed);
                });
                const stream = youtubeStream(args[2]);
                connection.play(stream).on('end', function () {
                    connection.disconnect();
                });
            })
            .catch(console.error);
    }
}*/
