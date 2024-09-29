

import fetch from "node-fetch"; // Asegúrate de que este módulo esté instalado.

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
        // Realiza la solicitud a la API de Cobalt
        const response = await fetch('https://api.cobalt.tools/api/json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: shortYoutubeUrl,
                vCodec: 'h264',
                vQuality: '720',
                aFormat: 'mp3',
                isAudioOnly: true
            })
        });
        
        const result = await response.json();

        if (result.status !== 'success') {
            throw new Error(result.text || 'Error en la descarga');
        }

        let downloadUrl = result.url;
        let title = videoId; // Usamos el videoId como título en caso de que no se proporcione uno.
        
        await conn.sendMessage(m.chat, { 
            audio: { url: downloadUrl }, 
            fileName: `${title}.mp3`, 
            mimetype: 'audio/mp4', 
            caption: `╭━❰  *YOUTUBE*  ❱━⬣\n${title}\n╰━❰ *${wm}* ❱━⬣`
        }, { quoted: m });

    } catch (e) {
        await conn.reply(m.chat, `_[ ❌ ] Error al descargar el audio, vuelve a intentarlo_`, m);
        console.log(e);
    }
};

handler.command = ['ytmp34', 'yta4'];
export default handler;


/*
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
*/
