import fetch from 'node-fetch';

const handler = async (m, { conn, args, command, usedPrefix }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `_*[ ⚠️ ] Agrega un enlace de Youtube *_\n\n> Ejemplo:\n_.ytmp3 https://youtu.be/_`, m);
    }

await conn.reply(m.chat, `_*[ ⏳ ] Descargando el audio...*_`, m);

    try {
        const apiUrl = `https://delirios-api-delta.vercel.app/download/ytmp3?url=${encodeURIComponent(args[0])}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status && data.data && data.data.download && data.data.download.url) {
            const downloadUrl = data.data.download.url;
            const filename = data.data.download.filename || 'audio.mp3';
            await conn.sendFile(m.chat, downloadUrl, filename, `Title: ${data.data.title}\nAuthor: ${data.data.author}`, m);
        } else {
            throw new Error('_*[ ❌ ] Ocurrió un error al descargar el audio*_');
        }
    } catch (e1) {
        console.error(e1);
        try {
            let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${lolkeysapi}&url=${encodeURIComponent(args[0])}`);  
let lolh = await lolhuman.json();
let n = lolh.result.title || 'error';
await conn.sendMessage(m.chat, { audio: { url: lolh.result.link }, fileName: `${n}.mp3`, mimetype: 'audio/mp4' }, { quoted: m });
        } catch (e2) {
            console.error(e2);
            await conn.reply(m.chat, `_*[ ❌ ] Ocurrió un error al descargar el audio, inténtalo más tarde*_`, m);
        }
    }
};

handler.command = ['ytmp3', 'yta'];
export default handler;
