import ytdl from "node-yt-dl";
import down from "bima-sky";
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
        await conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${title}.mp4`, mimetype: 'video/mp4', caption:`╭━❰  *YOUTUBE 1*  ❱━⬣\n${title}\n╰━❰ *${wm}* ❱━⬣`, thumbnail: await fetch(thumb) }, { quoted: m });
    //╚────── ¤ ◎ node-yt-dl ◎ ¤ ──────╝
    } catch (e1) {
        try {
        //╔────── ¤ ◎ ruhend-scraper ◎ ¤ ──────╗
            let result2 = await ytmp4(shortYoutubeUrl);
            let title2 = result2.title;
            let thumb2 = result2.thumbnail;
            let downloadUrl2 = result2.video;
            await conn.sendMessage(m.chat, { video: { url: downloadUrl2 }, fileName: `${title2}.mp4`, mimetype: 'video/mp4', caption:`╭━❰  *YOUTUBE 2*  ❱━⬣\n${title2}\n╰━❰ *${wm}* ❱━⬣`, thumbnail: await fetch(thumb2) }, { quoted: m });
        //╚────── ¤ ◎ ruhend-scraper ◎ ¤ ──────╝
        } catch (e2) {
            try {
            //╔────── ¤ ◎ lol-human ◎ ¤ ──────╗
                let data = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${lolkeysapi}&url=${shortYoutubeUrl}`)    
                let result3 = await data.json()
                let title3 = result3.result.title || 'error';
                let thumb3 = result3.result.thumbnail;
                let downloadUrl3 = result3.result.link;
                await conn.sendMessage(m.chat, { video: { url: downloadUrl3 }, fileName: `${title3}.mp4`, mimetype: 'video/mp4', caption:`╭━❰  *YOUTUBE 3*  ❱━⬣\n${title3}\n╰━❰ *${wm}* ❱━⬣`, thumbnail: await fetch(thumb3) }, { quoted: m });
            //╚────── ¤ ◎ lol-human ◎ ¤ ──────╝
            } catch (e3) {
                try {
                //╔────── ¤ ◎ bimasky-dl ◎ ¤ ──────╗
                    await down.youtubedl(link).then(result () => {
                        await conn.reply(m.chat, result.message);
                    })
                //╚────── ¤ ◎ bimasky-dl ◎ ¤ ──────╝
                } catch (e4) {
                    console.log(e4);
                    //await conn.reply(m.chat, `_[ ❌ ] Error al descargar el video, vuelve a intentarlo_`, m);
                }
            }
        }
    }
};

handler.command = ['ytmp4', 'ytv8'];
export default handler;
