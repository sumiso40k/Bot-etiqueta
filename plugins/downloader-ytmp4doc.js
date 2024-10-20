import ytdl from "node-yt-dl";
import { ytmp4 } from 'ruhend-scraper';
import fetch from 'node-fetch';

const getYoutubeId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
};

let handler = async (m, { text, conn, args, usedPrefix, command }) => {
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
        await conn.sendMessage(m.chat, {document: {url: downloadUrl}, caption: `╭━❰  *YOUTUBE*  ❱━⬣\n${title}\n╰━❰ *${wm}* ❱━⬣`, mimetype: 'video/mp4', fileName: `${title}.mp4`}, {quoted: m});
    //╚────── ¤ ◎ node-yt-dl ◎ ¤ ──────╝
    } catch (e1) {
        try {
        //╔────── ¤ ◎ ruhend-scraper ◎ ¤ ──────╗
            let result2 = await ytmp4(shortYoutubeUrl);
            let title2 = result2.title;
            let thumb2 = result2.thumbnail;
            let downloadUrl2 = result2.video;
            await conn.sendMessage(m.chat, {document: {url: downloadUrl2}, caption: `╭━❰  *YOUTUBE*  ❱━⬣\n${title2}\n╰━❰ *${wm}* ❱━⬣`, mimetype: 'video/mp4', fileName: `${title2}.mp4`}, {quoted: m});
        //╚────── ¤ ◎ ruhend-scraper ◎ ¤ ──────╝
        } catch (e2) {
            try {
            //╔────── ¤ ◎ lol-human ◎ ¤ ──────╗
                let data = await fetch(`https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${shortYoutubeUrl}`)    
                let result3 = await data.json()
                let title3 = result3.data.title || 'error';
                let thumb3 = result3.data.image;
                let downloadUrl3 = result3.data.download.url;
                await conn.sendMessage(m.chat, {document: {url: downloadUrl3}, caption: `╭━❰  *YOUTUBE*  ❱━⬣\n${title3}\n╰━❰ *${wm}* ❱━⬣`, mimetype: 'video/mp4', fileName: `${title3}.mp4`}, {quoted: m});
            //╚────── ¤ ◎ lol-human ◎ ¤ ──────╝
            } catch (e3) {
                await conn.reply(m.chat, `_[ ❌ ] Error al descargar el video, vuelve a intentarlo_`, m);
                console.log(e3);
            }
        }
    }
};

handler.command = ['ytmp4doc', 'ytvdoc'];
export default handler;
