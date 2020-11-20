module.exports = class ty
{
    static match (message)
    {
        return message.content.startsWith('thx <@!598581926898696203>')

    }
    
    static action (message)
    {
        message.channel.send('You are welcome <3')
            .then(done=>{
                message.delete()
            })
            .catch(console.log)
    }
}