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

        // Verificamos que haya al menos un enlace de descarga disponible
        if (result && result.length > 0) {
            const downloadUrl = result[0].url; // Toma el primer enlace de descarga
            const filename = result[0].title || 'video'; // Usa el título del video o 'video' como nombre del archivo
            const thumb = result[0].thumbnail || ''; // Usa la miniatura si está disponible
            const wm = 'TuMarca'; // Reemplaza con tu marca o personalización

            // Envío del video
            await conn.sendMessage(m.chat, {
                video: { url: downloadUrl },
                fileName: `${filename}.mp4`,
                mimetype: 'video/mp4',
                caption: `╭━❰  *YOUTUBE*  ❱━⬣\n${filename}\n╰━❰ *${wm}* ❱━⬣`,
                thumbnail: thumb ? await fetch(thumb).then(res => res.buffer()) : null,
            }, { quoted: m });

        } else {
            m.reply('No se encontraron enlaces de descarga.');
        }
    } catch (error) {
        m.reply(`Error: ${error.message}`);
    }
};

handler.command = /^(descargar1|download1)$/i;
export default handler;
