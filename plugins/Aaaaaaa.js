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
            const filename = result.data.title || 'video'; // Usa el título del video o 'video' como nombre del archivo
            const thumb = result.data.thumbnail || ''; // Usa la miniatura si está disponible
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

handler.command = /^(descargar|download)$/i;
export default handler;
