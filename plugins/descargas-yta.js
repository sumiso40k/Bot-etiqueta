

/*import { youtubedl, youtubedlv2 } from '@bochilteam/scraper' 
import fetch from 'node-fetch'
import yts from 'yt-search'
import ytdl from 'ytdl-core'


let handler = async (m, { text, conn, args, usedPrefix, command }) => {


if (!args[0]) return await conn.reply(m.chat, '_*[ ⚠️ ] Agrega un enlace de YouTube*_\n\n> Ejemplo:\n_.ytmp3 https://www.youtube.com/_', m)    

let youtubeLink = '';

if (args[0].includes('you')) {
    youtubeLink = args[0];
} else {
    return await conn.reply(m.chat, '_*[ ⚠️ ] El enlace no es de YouTube*_', m)
}
  
conn.reply(m.chat, '_*[ ⏳ ] Descargando el audio...*_', m)
try {
    let q = '128kbps'
    let v = youtubeLink
    const yt = await youtubedl(v).catch(async _ => await youtubedlv2(v))
    const dl_url = await yt.audio[q].download()
    const ttl = await yt.title
    const size = await yt.audio[q].fileSizeH
    await conn.sendFile(m.chat, dl_url, ttl + '.mp3', null, m, false, { mimetype: 'audio/mp4' })
} catch {
    try {
        let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${lolkeysapi}&url=${youtubeLink}`)    
        let lolh = await lolhuman.json()
        let n = lolh.result.title || 'error'
        await conn.sendMessage(m.chat, { audio: { url: lolh.result.link }, fileName: `${n}.mp3`, mimetype: 'audio/mp4' }, { quoted: m }) 
    } catch {   
        try {
            let searchh = await yts(youtubeLink)
            let __res = searchh.all.map(v => v).filter(v => v.type == "video")
            let infoo = await ytdl.getInfo('https://youtu.be/' + __res[0].videoId)
            let ress = await ytdl.chooseFormat(infoo.formats, { filter: 'audioonly' })
            conn.sendMessage(m.chat, { audio: { url: ress.url }, fileName: __res[0].title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })  
        } catch {
            await conn.reply(m.chat, '_*[ ❌ ] Ocurrió un error al descargar el audio, inténtalo más tarde*_', m)
        }
    }
}}

handler.command = ['ytmp3', 'yta']
export default handler
*/
