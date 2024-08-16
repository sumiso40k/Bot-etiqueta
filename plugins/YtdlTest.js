import { youtubedl } from '@RFIunknown/UBS';

let handler = async (m, { conn, text }) => {
    if (!text || !text.includes('youtube.com') && !text.includes('youtu.be')) {
        return m.reply('Por favor, proporciona un enlace válido de YouTube.');
    }

    try {
        const data = await youtubedl(text);
        const jsonResponse = JSON.stringify(data, null, 2);

        const resolutions = Object.keys(data.video);
        const highestResolution = resolutions[0];
        const downloadUrl = await data.video[highestResolution].download();

        m.reply(`Información del video:\n${jsonResponse}\n\nEnlace de descarga (${highestResolution}): ${downloadUrl}`);
    } catch (error) {
        console.error(error);
        m.reply('Hubo un error al intentar descargar el video.');
    }
}

handler.command = ['yt9', 'youtube9', 'descargar9']; // Comandos que activarán esta función
export default handler;
