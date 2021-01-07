const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = class Help
{
    static match(message)
    {
        if(message.content.startsWith(`${process.env.PREFIX} help`)){
            return (message.content.startsWith(`${process.env.PREFIX} help`))
        } else if(message.content.startsWith(`${process.env.MOBPREFIX}help`)){
            return (message.content.startsWith(`${process.env.MOBPREFIX}help`))
        }
    }

    static action(message)
    {
       console.log(client.user.isMentionned) 
    }
} 