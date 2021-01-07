module.exports = class Leave 
{
    static match (message)
    {
        return message.content == `${process.env.PREFIX} leave`
    }

   static action (message)
    {
        
        if(message.member.voice.channel)
        {
            if(message.guild.voice.connection)
            {
                message.member.voice.channel.leave()
                message.delete()
            }
            
        }
    }
}