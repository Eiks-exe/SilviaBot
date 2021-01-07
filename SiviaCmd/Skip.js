
module.exports = class Skip{
    static match(message){
        return message.content.startsWith(`${process.env.PREFIX} skip`)
    }
    static action(message ,lect) {
        lect.skip(message)
    }

}