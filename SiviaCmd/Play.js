

module.exports = class temp {
    static match(message) {
        if(message.content.startsWith(`${process.env.PREFIX} play `)){
            return (message.content.startsWith(`${process.env.PREFIX} play `))
        } else if(message.content.startsWith(`${process.env.MOBPREFIX}play `)){
            return (message.content.startsWith(`${process.env.MOBPREFIX}play `))
        } 
    }

    static action(message, lect) {
        if(message.content.startsWith(`${process.env.PREFIX} play `)){
            let args = message.content.split(`${process.env.PREFIX} play `)
            lect.play(args[1], message)   
        } else if(message.content.startsWith(`${process.env.MOBPREFIX}play `)){
            let args = message.content.split(`${process.env.MOBPREFIX}play `)
            lect.play(args[1], message)
        }
        

    }
}