
module.exports = class Skip{
    static match(message){
        if(message.content.startsWith(`${process.env.PREFIX} skip`)){
            return (message.content.startsWith(`${process.env.PREFIX} skip`))
        } else if(message.content.startsWith(`${process.env.MOBPREFIX}skip`)){
            return (message.content.startsWith(`${process.env.MOBPREFIX}skip`))
        }
    }
    static action(message ,lect) {
        lect.skip(message)
    }

}