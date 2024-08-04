import {Chalk} from 'chalk';

const customChalk = new Chalk({level: 3});
let handler = async (m, { conn }) => {
        m.reply(`Hola mundo`);
        
        console.log(customChalk.hex('#E991E6').bold('╭━❬ ✤ Airi-Bot ✤ ❭━╮\n│ARCHIVOS DE LA CARPETA TMP ELIMINADOS\n╰━➤'));
        
        //console.log(chalk.blue('╭━❬ ✤ Airi-Bot ✤ ❭━╮\n│ARCHIVOS DE LA CARPETA TMP ELIMINADOS\n╰━➤'));

}

handler.command = ['hola']
export default handler
