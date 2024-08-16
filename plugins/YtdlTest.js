import { youtube } from '@xct007/frieren-scraper';

let handler = async (m, { conn, text }) => {
    if (!text || !text.includes('youtube.com') && !text.includes('youtu.be')) {
        return m.reply('Por favor, proporciona un enlace válido de YouTube.');
    }

    try {
        const Obj = await youtube.download(text);
        const jsonResponse = JSON.stringify(Obj, null, 2);
        m.reply(jsonResponse);
    } catch (error) {
        console.error(error);
        m.reply('Hubo un error al intentar descargar el video.');
    }
}

handler.command = ['yt9', 'youtube9', 'descargar9']; // Comandos que activarán esta función
export default handler;
