import pkg from 'rahad-all-downloader';
const { alldl } = pkg;
import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    const videoUrl = text.trim(); // Extrae la URL del mensaje
    if (!videoUrl) {
        return m.reply('Por favor, proporciona la URL del video.');
    }
    try {
        const result = await alldl(videoUrl);

        // Verifica que haya datos en la respuesta
        if (result && result.data && result.data.videoUrl) {
            const downloadUrl = result.data.videoUrl;
            const filename = result.data.title || 'video.mp4'; // Usa el título del video o 'video' como nombre del archivo
 
            console.log(downloadUrl);
            // Envío del video
            await conn.sendFile(m.chat, downloadUrl, `${filename}.mp4`, `Titulo: ${filename}`, m);

        } else {
            m.reply('No se encontraron enlaces de descarga.');
        }
    } catch (error) {
        m.reply(`Error: ${error.message}`);
    }
};

handler.command = /^(descargar1|download1)$/i;
export default handler;
