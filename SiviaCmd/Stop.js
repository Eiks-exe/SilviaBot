module.exports = class stop {
    static match(message) {
        return (message.content.startsWith(`${process.env.PREFIX} stop`) || message.content.startsWith(`${process.env.MOBPREFIX}stop`) )
    }
    static action(message ,lect) {
        lect.stop(message)
    }

}