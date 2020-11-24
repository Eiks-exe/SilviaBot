import { Message } from 'discord.js';
import Player from './Player';

export default class temp {
    static match(message: Message): boolean {
        return message.content.startsWith('<@!598581926898696203> play ');
    }

    static action(message: Message, lect: Player): void {
        const args = message.content.split('<@!598581926898696203> play '); // crée un array avec le contenu du msg séparé par un ' '
        lect.play(args[1], message);
        // reconversion du tableau en chaine de caractères
        //console.log(StrArgs)
    }
}
