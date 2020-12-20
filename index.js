const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const Join = require('./SiviaCmd/Join')
const Leave = require('./SiviaCmd/Leave')
const HiSilvia = require('./SiviaCmd/HiSilvia')
const Sum = require('./SiviaCmd/Sum')
const Help = require('./SiviaCmd/Help')
const SumV = require('./SiviaCmd/SumV')
const ty = require('./SiviaCmd/ty')

const Player = require('./SiviaCmd/Player');
const PlayUrl = require('./SiviaCmd/PlayUrl')
const Play = require('./SiviaCmd/Play')
const Stop = require('./SiviaCmd/Stop');
//const Skip = require('./SiviaCmd/Skip')
const lect = new Player();
const dotenv = require('dotenv')
dotenv.config()


client.login(process.env.TOKEN);
//ready
client.on("ready", () => { //Signifie que le bot à bien démarré
    console.log("Je suis prête !"); //Lorsque que le bot est lancé observer la console Visual Studio
    client.user.setActivity("all of you", { type: "WATCHING" });
    client.user.setUsername("Silvia");
    client.user.setStatus('online')
    //client.user.setAvatar('./Silvia.jpg')

});


client.on('message', function (message) {

    if (Join.match(message)) {
        Join.action(message)
    } else if (Leave.match(message)) {
        Leave.action(message)
    } else if (HiSilvia.match(message)) {
        HiSilvia.action(message)
    } else if (Play.match(message)) {
        Play.action(message , lect)
    } else if (Sum.match(message)) {
        Sum.action(message)
    } else if (Help.match(message)) {
        Help.action(message)
    } else if (SumV.match(message)) {
        SumV.action(message)
    } else if (message.content === `${process.env.PREFIX}`) {
        message.reply('yes, sir ?')
        console.log(message.channel.type)
    } else if (message.content === 'ping') {
        // Send "pong" to the same channel
        message.channel.send('pong');
    } else if (PlayUrl.match(message)) {
        PlayUrl.action(message)
    } else if (ty.match(message)) {
        ty.action(message)
    } else if (Stop.match(message)) {
        Stop.action(message , lect)
    } else if (message.content === 'what is my avatar') {
        // Send the user's avatar URL
        message.send(message.author.displayAvatarURL());
    } else if (message.content === 'botAvatar') {
        message.send(client.user.displayAvatarURL())
    }

});