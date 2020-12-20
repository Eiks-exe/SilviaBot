module.exports = class stop {
    static match(message) {
        return message.content.startsWith(`${process.env.PREFIX} stop`)
    }
    static action(message ,lect) {
        lect.stop(message)
    }

}