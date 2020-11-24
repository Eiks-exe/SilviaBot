import * as dotenv from 'dotenv';
dotenv.config();
import { Client } from 'discord.js';
const client = new Client();
import Join from './SiviaCmd/Join';
import Leave from './SiviaCmd/Leave';
import HiSilvia from './SiviaCmd/HiSilvia';
import Sum from './SiviaCmd/Sum';
import Play from './SiviaCmd/Play';
import Help from './SiviaCmd/Help';
import SumV from './SiviaCmd/SumV';
import ty from './SiviaCmd/ty';
import Stop from './SiviaCmd/Stop';
import Player from './SiviaCmd/Player';
const lect = new Player();

client.login(process.env.TOKEN || '');
//ready
client.on('ready', () => {
    //Signifie que le bot à bien démarré
    console.log('Je suis prête !'); //Lorsque que le bot est lancé observer la console Visual Studio
    if (client.user) client.user.setActivity('all of you', { type: 'WATCHING' });
    //client.user.setAvatar('./Silvia.jpg')
});

client.on('message', function (message) {
    if (Join.match(message)) {
        Join.action(message);
    } else if (Leave.match(message)) {
        Leave.action(message);
    } else if (HiSilvia.match(message)) {
        HiSilvia.action(message);
    } else if (Play.match(message)) {
        Play.action(message, lect);
    } else if (Sum.match(message)) {
        Sum.action(message);
    } else if (Help.match(message)) {
        Help.action(message);
    } else if (SumV.match(message)) {
        SumV.action(message);
    } else if (message.content === '<@!598581926898696203>') {
        message.reply('yes, sir ?');
        console.log(message.channel.type);
    } else if (message.content === 'ping') {
        // Send "pong" to the same channel
        message.channel.send('pong');
    } else if (ty.match(message)) {
        ty.action(message);
    } else if (Stop.match(message)) {
        Stop.action(message);
    } else if (message.content === 'what is my avatar') {
        // Send the user's avatar URL
        message.reply(message.author.displayAvatarURL());
    } else if (message.content === 'botAvatar') {
        if (client.user) message.reply(client.user.displayAvatarURL());
    }
});
