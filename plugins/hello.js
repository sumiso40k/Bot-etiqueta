import chalk from 'chalk';

let handler = async (m, { conn }) => {
        m.reply(`Hola mundo`);
        console.log(chalk.blue('╭━❬ ✤ Airi-Bot ✤ ❭━╮\n│ARCHIVOS DE LA CARPETA TMP ELIMINADOS\n╰━➤'));
}

handler.command = ['hola']
export default handler
