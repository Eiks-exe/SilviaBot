module.exports = class stop {
    static match(message) {
        return message.content.startsWith('<@!598581926898696203> stop')
    }
    static action(message) {
        message.member.voice.channel
            .join()
            .then(function (connection) {
                connection.dispatcher.end()
                message.delete()
                message.channel.send('i stopped')
                
            })
    }

}