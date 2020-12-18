module.exports = class ty
{
    static match (message)
    {
        return message.content.startsWith(`ty ${process.env.PREFIX}`)

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