import fetch from 'node-fetch';

const handler = async (m, { conn, args, command, usedPrefix }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `_*[ ⚠️ ] Agrega un enlace de Youtube *_\n\n> Ejemplo:\n_.ytmp3 https://youtu.be/_`, m);
    }

    try {
        await conn.reply(m.chat, `_*[ ⏳ ] Descargando el audio...*_`, m);

        const apiUrl = `https://api.lolhuman.xyz/api/ytaudio?apikey=GataDiosV2&url=${encodeURIComponent(args[0])}`;
        await conn.reply(m.chat, `_*[ ⏳ ] Solicitando a la API...*_`, m);
        
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log(data); // Log para ver la respuesta completa de la API
        await conn.reply(m.chat, `_*[ ✅ ] Respuesta de la API recibida*_`, m);

        if (data.status === 200 && data.result && data.result.link && data.result.link.link) {
            await conn.reply(m.chat, `_*[ ✅ ] Enlace de descarga obtenido*_`, m);
            
            const downloadUrl = data.result.link.link;
            const filename = `${data.result.title || 'audio'}.webm`;
            
            await conn.reply(m.chat, `_*[ ⏳ ] Enviando el archivo...*_`, m);
            await conn.sendFile(m.chat, downloadUrl, filename, `Title: ${data.result.title}\nUploader: ${data.result.uploader}`, m);
            await conn.reply(m.chat, `_*[ ✅ ] Archivo enviado con éxito*_`, m);
        } else {
            throw new Error('No se pudo obtener la URL de descarga');
        }
    } catch (err) {
        console.error(err);
        await conn.reply(m.chat, `_*[ ❌ ] Ocurrió un error al descargar el audio, inténtalo más tarde*_\n\n${err.message}`, m);
    }
};

handler.command = ['pruebaytmp3', 'pruebayt'];
export default handler;
