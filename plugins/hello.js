import chalk, {Chalk} from 'chalk';

const customChalk = new Chalk({level: 3});
let handler = async (m, { conn }) => {
        m.reply(`Hola mundo`);
        
        console.log(customChalk.hex('#E991E6').bold('╭━❬ ✤ Airi-Bot ✤ ❭━╮\n│MENSAJE DE PRUEBA\n╰━➤'));
        
        console.log(chalk.blue('╭━❬ ✤ Airi-Bot ✤ ❭━╮\n│MENSAJE DE PRUEBA\n╰━➤'));

}

handler.command = ['hola']
export default handler
