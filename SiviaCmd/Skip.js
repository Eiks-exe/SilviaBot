
module.exports = class Skip{
    static match(message){
        return (message.content.startsWith(`${process.env.PREFIX} skip`) || message.content.startsWith(`${process.env.MOBPREFIX}skip`) )
    }
    static action(message ,lect) {
        lect.skip(message)
    }

}