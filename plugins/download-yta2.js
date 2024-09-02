import CobaltAPI from 'cobalt-api'; // Asegúrate de haber instalado el paquete cobalt-api
import fetch from 'node-fetch'; // Asegúrate de tener node-fetch para descargar el archivo

const getYoutubeId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
};

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return await conn.reply(m.chat, `_*[ ⚠️ ] Agrega un enlace de YouTube*_\n\n_Ejemplo:_\n.${command} https://www.youtube.com`, m);

    let youtubeLink = '';

    if (args[0].includes('you')) {
        youtubeLink = args[0];
    } else {
        return await conn.reply(m.chat, '_*[ ⚠️ ] El enlace no es de YouTube*_', m);
    }

    const isShort = youtubeLink.includes('youtube.com/shorts/');
    const videoId = getYoutubeId(youtubeLink);

    const shortYoutubeUrl = isShort ? youtubeLink : `https://youtu.be/${videoId}`;

    conn.reply(m.chat, '_*[ ⏳ ] Descargando el audio...*_', m);

    try {
        // Crear instancia de CobaltAPI con la URL del video
        const cobalt = new CobaltAPI(shortYoutubeUrl);
        cobalt.setQuality('max'); // Puedes ajustar la calidad si es necesario
        cobalt.enableAudioOnly(); // Configura para descargar solo el audio
        cobalt.setAFormat('mp3'); // Establece el formato de audio a mp3

        // Envía la solicitud y obtiene la respuesta
        const response = await cobalt.sendRequest();

        if (response.status === 'success') {
            const audioUrl = response.audio; // URL directa al archivo de audio

            // Descargar el archivo de audio
            const audioResponse = await fetch(audioUrl);
            const audioBuffer = await audioResponse.buffer();
            const fileName = `${response.title}.mp3`; // Nombre del archivo

            // Enviar el archivo de audio a través de WhatsApp
            await conn.sendMessage(m.chat, { audio: { url: audioUrl }, fileName, mimetype: 'audio/mp4', caption: `╭━❰  *YOUTUBE*  ❱━⬣\n${response.title}\n╰━❰ *${wm}* ❱━⬣` }, { quoted: m });
        } else {
            await conn.reply(m.chat, `_[ ❌ ] No se pudo descargar el audio. Intenta de nuevo más tarde._`, m);
        }
    } catch (e) {
        await conn.reply(m.chat, `_[ ❌ ] Error al descargar el audio, vuelve a intentarlo_`, m);
        console.log(e);
    }
};

handler.command = ['ytmp34', 'yta4'];
export default handler;
