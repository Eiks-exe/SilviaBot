module.exports = class stop {
    static match(message) {
        if(message.content.startsWith(`${process.env.PREFIX} stop`)){
            return (message.content.startsWith(`${process.env.PREFIX} stop`))
        } else if(message.content.startsWith(`${process.env.MOBPREFIX}stop`)){
            return (message.content.startsWith(`${process.env.MOBPREFIX}stop`))
        }
    }
    static action(message ,lect) {
        lect.stop(message)
    }

}