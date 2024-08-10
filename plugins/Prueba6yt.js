import fetch from 'node-fetch';

const handler = async (m, { conn, args, command, usedPrefix }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `_*[ ⚠️ ] Agrega un enlace de Youtube*_`, m);
    }

    try {
        await conn.reply(m.chat, `_*[ ⏳ ] Descargando el video...*_`, m);

        const apiUrl = `https://anydl.guruapi.tech/ytdl/v2/ytmp4?url=${encodeURIComponent(args[0])}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data && data.dlink) {
            const downloadUrl = data.dlink;
            const filename = `${data.title || 'video'}.mp4`;
            const thumb = data.thumbnail;
            //await conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${filename}.mp4`, mimetype: 'video/mp4', caption: `╭━❰  *YOUTUBE*  ❱━⬣\n${filename}\n╰━❰ *${wm}* ❱━⬣`, thumbnail: await fetch(thumb) }, { quoted: m })
            await conn.sendFile(m.chat, downloadUrl, filename, `Title: ${data.title}\nCreator: ${data.creator}`, m);
        } else {
            throw new Error('_*[ ❌ ] Ocurrió un error al descargar el video*_');
        }
    } catch (err) {
        console.error(err);
        await conn.reply(m.chat, `_*[ ❌ ] Ocurrió un error al descargar el video, inténtalo más tarde*_`, m);
    }
};

handler.command = ['ytv6', 'ytmp46'];
export default handler;
