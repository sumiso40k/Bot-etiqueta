import fetch from 'node-fetch';
import axios from 'axios';

const handler = async (m, {conn, command, args, text, usedPrefix}) => {

if (!text) throw `_*[ ⚠️ ] Agrega lo que quieres buscar en Spotify*_\n\n_Ejemplo:_\n.play2 Marshmello Moving On`

try { 
    
    let { data } = await axios.get(`https://deliriusapi-official.vercel.app/search/spotify?q=${encodeURIComponent(text)}&limit=10`);

    const image = data.data[0].image;
    const url = data.data[0].url;
    const info = `⧁ 𝙏𝙄𝙏𝙐𝙇𝙊
» ${data.data[0].title}
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
⧁ 𝙋𝙐𝘽𝙇𝙄𝘾𝘼𝘿𝙊
» ${data.data[0].publish}
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
⧁ 𝗗𝗨𝗥𝗔𝗖𝗜𝗢𝗡
» ${data.data[0].duration}
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
⧁  𝙋𝙊𝙋𝙐𝙇𝘼𝙍𝙄𝘿𝘼𝘿
» ${data.data[0].popularity}
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
⧁  𝘼𝙍𝙏𝙄𝙎𝙏𝘼
» ${data.data[0].artist}
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
⧁ 𝙐𝙍𝙇
» ${url}

_*🎶 Enviando música...*_`.trim()

await conn.sendFile(m.chat, image, 'imagen.jpg', info, m);


//＼／＼／＼／＼／＼／ DESCARGAR ＼／＼／＼／＼／＼／

    const apiUrl = `https://deliriusapi-official.vercel.app/download/spotifydl?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.data.url) {
        const downloadUrl = data.data.url;
        const filename = `${data.data.title || 'audio'}.mp3`;
        await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, fileName: filename, mimetype: 'audio/mpeg', caption: `╭━❰  *SPOTIFY*  ❱━⬣\n${filename}\n╰━❰ *${wm}* ❱━⬣`, quoted: m })
    } else {
        throw new Error('_*[ ❌ ] Ocurrió un error al descargar el  archivo mp3_');
    }

} catch (e) {

await conn.reply(m.chat, `❌ _*El comando #play está fallando, repórtalo al creador del bot*_`, m)


console.log(`❌ El comando #play está fallando`)
console.log(e)
}}

handler.command = ['play2']
export default handler;
