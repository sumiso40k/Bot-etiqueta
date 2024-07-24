import fetch from 'node-fetch';

const handler = async (m, { conn, args, command, usedPrefix }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `_*[ ⚠️ ] Agrega un enlace de Youtube *_\n\n> Ejemplo:\n_.ytmp3 https://youtu.be/_`, m);
    }

    try {
        await conn.reply(m.chat, `_*[ ⏳ ] Descargando el audio...*_`, m);

        const apiUrl = `https://api.lolhuman.xyz/api/ytaudio?apikey=GataDiosV2&url=${encodeURIComponent(args[0])}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === 200 && data.result && data.result.link && data.result.link.link) {
            const downloadUrl = data.result.link.link;
            const filename = `${data.result.title || 'audio'}.webm`;
            await conn.sendFile(m.chat, downloadUrl, filename, `Title: ${data.result.title}\nUploader: ${data.result.uploader}`, m);
        } else {
            throw new Error('_*[ ❌ ] Ocurrió un error al descargar el audio*_');
        }
    } catch (err) {
        console.error(err);
        await conn.reply(m.chat, `_*[ ❌ ] Ocurrió un error al descargar el audio, inténtalo más tarde*_`, m);
    }
};

handler.command = ['pruebaytmp3', 'pruebaytaudio'];
export default handler;
