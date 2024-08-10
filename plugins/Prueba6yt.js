import fetch from 'node-fetch';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

const streamPipeline = promisify(pipeline);

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

            // Descargar el video a un archivo temporal
            const videoResponse = await fetch(downloadUrl);
            if (!videoResponse.ok) throw new Error('Error al descargar el video');
            
            const tempFilePath = `/tmp/${filename}`;
            await streamPipeline(videoResponse.body, fs.createWriteStream(tempFilePath));

            // Enviar el video descargado
            await conn.sendMessage(m.chat, { video: { url: tempFilePath }, fileName: filename, mimetype: 'video/mp4', caption: `╭━❰  *YOUTUBE*  ❱━⬣\n${downloadUrl}\n╰━❰ *${wm}* ❱━⬣`, thumbnail: await fetch(thumb).then(res => res.buffer()) }, { quoted: m });

            // Eliminar el archivo temporal después de enviarlo
            fs.unlinkSync(tempFilePath);
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
            


/*import fetch from 'node-fetch';

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
            await await conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${filename}.mp4`, mimetype: 'video/mp4', caption: `╭━❰  *YOUTUBE*  ❱━⬣\n${downloadUrl}\n╰━❰ *${wm}* ❱━⬣`, thumbnail: await fetch(thumb) }, { quoted: m })
            //await await conn.sendFile(m.chat, downloadUrl, filename, `Title: ${data.dlink}\nCreator: ${data.creator}`, m);
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
*/
