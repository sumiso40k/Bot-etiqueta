


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
    
    conn.reply(m.chat, '_*[ ⏳ ] Descargando el audio...*_', m);
    
    try {
    //╔────── ¤ ◎ node-yt-dl ◎ ¤ ──────╗
        let result = await ytdl.mp3(shortYoutubeUrl);
        let title = result.title;
        let thumb = result.metadata.thumbnail;
        let downloadUrl = result.media;
        await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, fileName: `${title}.mp3`, mimetype: 'audio/mp4', caption:`╭━❰  *YOUTUBE*  ❱━⬣\n${title}\n╰━❰ *${wm}* ❱━⬣`}, { quoted: m });
    //╚────── ¤ ◎ node-yt-dl ◎ ¤ ──────╝
    } catch (e) {
        await conn.reply(m.chat, `_[ ❌ ] Error al descargar el audio, vuelve a intentarlo_`, m);
        console.log(e);
    }
};

handler.command = ['ytmp3', 'yta'];
export default handler;






/*
import pkg from 'rahad-all-downloader';
const { alldl } = pkg;
import fetch from 'node-fetch';
import { toAudio } from '../lib/converter.js';

const getYoutubeId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const matches = url.match(regex);
  return matches ? matches[1] : null;
};

let handler = async (m, { conn, text }) => {
    
    
      if (!text) return await conn.reply(m.chat, '_*[ ⚠️ ] Agrega un enlace de YouTube*_\n\n> Ejemplo:\n_.ytmp3 https://www.youtube.com_', m);
        
        let youtubeLink = '';

    if (text.includes('you')) {
    youtubeLink = text;
  } else {
    return await conn.reply(m.chat, '_*[ ⚠️ ] El enlace no es de YouTube*_', m);
  }
  
  const isShort = youtubeLink.includes('youtube.com/shorts/');
  const videoId = getYoutubeId(youtubeLink);

  
  const shortYoutubeUrl = isShort ? youtubeLink : `https://youtu.be/${videoId}`;

  conn.reply(m.chat, '_*[ ⏳ ] Descargando el audio...*_', m);
  
    try {
        const result = await alldl(shortYoutubeUrl);

        if (result && result.data && result.data.videoUrl) {
            const downloadUrl = result.data.videoUrl;
            const filename = result.data.title || 'audio.mp3';
            
            let response = await fetch(downloadUrl);
            
            let media = await response.buffer();
            
            let audio = await toAudio(media, 'mp4');
            
            
            await conn.sendFile(m.chat, audio.data, `${filename}.mpeg`, `Titulo: ${filename}`, m, null, { mimetype: 'audio/mpeg' });
        } else {
            await conn.reply(m.chat, `_[ ❗ ] Error al descargar el audio, vuelve a intentarlo_`, m);
        }
    } catch (error) {
        console.log(error)
        await conn.reply(m.chat, `_[ ❌ ] Error al descargar el video, vuelve a intentarlo_`, m);
    }
};

handler.command = ['ytmp3', 'yta'];
export default handler;
*/




/*
import fetch from 'node-fetch';

const getYoutubeId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const matches = url.match(regex);
  return matches ? matches[1] : null;
};

let handler = async (m, { text, conn, args, usedPrefix, command }) => {
  if (!args[0]) return await conn.reply(m.chat, '_*[ ⚠️ ] Agrega un enlace de YouTube*_\n\n> Ejemplo:\n_.ytmp4 https://www.youtube.com_', m);

  let youtubeLink = '';

  if (args[0].includes('you')) {
    youtubeLink = args[0];
  } else {
    return await conn.reply(m.chat, '_*[ ⚠️ ] El enlace no es de YouTube*_', m);
  }

  
  const isShort = youtubeLink.includes('youtube.com/shorts/');
  const videoId = getYoutubeId(youtubeLink);

  
  const shortYoutubeUrl = isShort ? youtubeLink : `https://youtu.be/${videoId}`;

  conn.reply(m.chat, '_*[ ⏳ ] Descargando el audio...*_', m);

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      let apiResponse = await fetch(`https://api.eypz.c0m.in/ytdl?url=${shortYoutubeUrl}`);
      let apiData = await apiResponse.json().catch(() => {
        console.log('La respuesta no es un JSON válido');
      });

      if (!apiData.status) throw new Error('Ocurrió un error en la API');

      let downloadUrl = apiData.result.mp3;
      let title = apiData.result.title || 'audio';
      let image = apiData.result.thumb;

      await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, fileName: `${title}.mp3`, mimetype: 'audio/mp4', caption: `╭━❰  *YOUTUBE*  ❱━⬣\n${title}\n╰━❰ *${wm}* ❱━⬣` }, { quoted: m });
      
      break;
    } catch (err) {
      console.log(`Intento ${attempt} fallido: ${err.message}`);
      if (attempt === 2) {
        await conn.reply(m.chat, `_[ ❌ ] Error al descargar el video, vuelve a intentarlo_`, m);
      }
    }
  }
};

handler.command = ['ytmp3', 'yta'];
export default handler;
*/



/*
import fetch from 'node-fetch';

const getYoutubeId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const matches = url.match(regex);
  return matches ? matches[1] : null;
};

let handler = async (m, { text, conn, args, usedPrefix, command }) => {
  if (!args[0]) return await conn.reply(m.chat, '_*[ ⚠️ ] Agrega un enlace de YouTube*_\n\n> Ejemplo:\n_.ytmp4 https://www.youtube.com_', m);

  let youtubeLink = '';

  if (args[0].includes('you')) {
    youtubeLink = args[0];
  } else {
    return await conn.reply(m.chat, '_*[ ⚠️ ] El enlace no es de YouTube*_', m);
  }

  // Verificar si el enlace es un Short
  const isShort = youtubeLink.includes('youtube.com/shorts/');
  const videoId = getYoutubeId(youtubeLink);

  // Si no es un Short, modificar el enlace al enlace corto
  const shortYoutubeUrl = isShort ? youtubeLink : `https://youtu.be/${videoId}`;

  conn.reply(m.chat, '_*[ ⏳ ] Descargando el video...*_', m);

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      let deliriusResponse = await fetch(`https://deliriusapi-official.vercel.app/download/ytmp3?url=${shortYoutubeUrl}`);
      let deliriusData = await deliriusResponse.json().catch(() => {
        console.log('La respuesta no es un JSON válido');
      });

      if (!deliriusData.status) throw new Error('Ocurrió un error en la API');

      let downloadUrl = deliriusData.data.download.url;
      let title = deliriusData.data.title || 'video';
      let image = deliriusData.data.image;

      await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, fileName: `${title}.mp3`, mimetype: 'audio/mp4', caption: `╭━❰  *YOUTUBE*  ❱━⬣\n${title}\n╰━❰ *${wm}* ❱━⬣` }, { quoted: m });
      
      break; // Salir del loop si la descarga fue exitosa
    } catch (err) {
      console.log(`Intento ${attempt} fallido: ${err.message}`);
      if (attempt === 2) {
        await conn.reply(m.chat, `_[ ❌ ] Error al descargar el video, vuelve a intentarlo_`, m);
      }
    }
  }
};

handler.command = ['ytmp3', 'yta'];
export default handler;
*/

/*
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper' 
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
