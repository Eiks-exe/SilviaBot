module.exports = class stop {
    static match(message) {
        return message.content.startsWith('<@!598581926898696203> stop')
    }
    static action(message ,lect) {
        lect.stop(message)
    }

}