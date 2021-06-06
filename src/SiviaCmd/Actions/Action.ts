const giphy = require('giphy-api')('z5KWQNcwPIMNn0BgVkSi5aJp7Q7CPoK7');
import { Message } from 'discord.js';
export default class Actions {
    getRandom(max : number){
        return Math.floor(Math.random()* max)
    }
    async coffee(message: Message) {
        giphy.search('anime manga coffee')
            .then((res : any) => {
                message.channel.send("here's some coffee <3 ❤️☕️");
                message.channel.send(res.data[this.getRandom(5)].url);
            }).catch((err : any) => console.error(err))

       
    }
}

