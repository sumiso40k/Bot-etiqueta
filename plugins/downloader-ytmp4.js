
import ytdl from "node-yt-dl";

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
    
    conn.reply(m.chat, '_*[ ⏳ ] Descargando el video...*_', m);
    
    try {
    //╔────── ¤ ◎ node-yt-dl ◎ ¤ ──────╗
        let result = await ytdl.mp4(shortYoutubeUrl);
        let title = result.title;
        let thumb = result.metadata.thumbnail;
        let downloadUrl = result.media;
        await conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${title}.mp4`, mimetype: 'video/mp4', caption:`╭━❰  *YOUTUBE*  ❱━⬣\n${title}\n╰━❰ *${wm}* ❱━⬣`}, thumbnail: await fetch(thumb), { quoted: m });
    //╚────── ¤ ◎ node-yt-dl ◎ ¤ ──────╝
    } catch (e) {
        await conn.reply(m.chat, `_[ ❌ ] Error al descargar el video, vuelve a intentarlo_`, m);
        console.log(e);
    }
};

handler.command = ['ytmp4', 'ytv'];
export default handler;
