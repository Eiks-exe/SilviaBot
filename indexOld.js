const Discord = require('discord.js');
const client = new Discord.Client();
const chs = '&'
client.login('NTk4NTgxOTI2ODk4Njk2MjAz.XSYveQ.F3zsMR1TpJCd6SFvGN2CphsLx-w');
//ready
client.on("ready", () => { //Signifie que le bot à bien démarré
    console.log("Je suis prêt !"); //Lorsque que le bot est lancé observer la console Visual Studio

    client.user.setActivity("the FastFamily");
});


//join
client.on('message', message => 
{
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;

  if (message.content[0] === chs ) 
  {
    // Only try to join the sender's voice channel if they are in one themselvess
    if (message.content === chs , 'join') 
    {  
      if (message.member.voice.channel) 
      {
          message.member.voice.channel.join()
            .then(connection => 
              { // Connection is an instance of VoiceConnection
                message.reply('I have successfully connected to the channel!');
              })
            .catch(console.log);
      } 
        else 
        {
          message.reply('You need to join a voice channel first!', );
          
        }
    }
    if(message.guild.voice.connection)
    {
      if(message.content === chs , 'leave')
      {
        if(message.member.voice.channel)
        {
          message.member.voice.channel.leave()
          
        }
      }
    }
    
    
      
  }
});

