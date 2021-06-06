import * as dotenv from 'dotenv';
dotenv.config();
import { Client } from 'discord.js';
const client = new Client();
import Join from './SiviaCmd/Join';
import Leave from './SiviaCmd/Leave';
import HiSilvia from './SiviaCmd/HiSilvia';
import Sum from './SiviaCmd/Sum';

import Help from './SiviaCmd/Help';
import SumV from './SiviaCmd/SumV';
import ty from './SiviaCmd/ty';

import Player from './SiviaCmd/Player';
import Stop from './SiviaCmd/Stop';
import Play from './SiviaCmd/Play';
import Skip from './SiviaCmd/Skip';

import Actions from './SiviaCmd/Actions/Action';
import Coffee from './SiviaCmd/Actions/Coffee';

const lect = new Player();
const action = new Actions();
client.login(process.env.TOKEN || '');
//ready
client.on('ready', () => {
    //Signifie que le bot à bien démarré
    console.log('im ready !'); //Lorsque que le bot est lancé observer la console Visual Studio
    if (client.user) client.user.setActivity('all of you', { type: 'WATCHING' });
    client.user?.setUsername("InferusVoid");
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
    } else if (message.content === process.env.PREFIX) {
        message.reply('yes, sir ?');
        console.log(message.channel.type);
    } else if (message.content === 'ping') {
        // Send "pong" to the same channel
        message.channel.send('pong');
    } else if (ty.match(message)) {
        ty.action(message);
    } else if (Stop.match(message)) {
        Stop.action(message, lect);
    } else if (Skip.match(message)) {
        Skip.action(message, lect);
    } else if (Coffee.match(message)){
        Coffee.action(message, action);
    }
});
