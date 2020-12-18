
module.exports = class HiSilvia 
{
    static match (message)
    {
        return message.content.startsWith(`hi ${process.env.PREFIX}`)
    }

   static action (message)
    {
        console.log(message.reply('Hi! comment vas tu <3 ?'))
    }
}