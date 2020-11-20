
module.exports = class HiSilvia 
{
    static match (message)
    {
        return message.content.startsWith('Hi <@!598581926898696203>')
    }

   static action (message)
    {
        console.log(message.reply('Hi! comment vas tu <3 ?'))
    }
}