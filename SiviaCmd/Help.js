const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = class Help
{
    static match(message)
    {
        return message.content.startsWith(`${process.env.PREFIX} help`)
    }

    static action(message)
    {
       console.log(client.user.isMentionned) 
    }
} 