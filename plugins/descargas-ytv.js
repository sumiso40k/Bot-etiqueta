


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

  conn.reply(m.chat, '_*[ ⏳ ] Descargando el video...*_', m);

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      let apiResponse = await fetch(`https://api.eypz.c0m.in/ytdl?url=${shortYoutubeUrl}`);
      let apiData = await apiResponse.json().catch(() => {
        console.log('La respuesta no es un JSON válido');
      });

      if (!apiData.status) throw new Error('Ocurrió un error en la API');

      let downloadUrl = apiData.result.mp4;
      let title = apiData.result.title || 'video';
      let image = apiData.result.thumb;

      await conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${title}.mp4`, mimetype: 'video/mp4', caption: `╭━❰  *YOUTUBE*  ❱━⬣\n${title}\n╰━❰ *${wm}* ❱━⬣` }, { quoted: m });
      
      break;
    } catch (err) {
      console.log(`Intento ${attempt} fallido: ${err.message}`);
      if (attempt === 2) {
        await conn.reply(m.chat, `_[ ❌ ] Error al descargar el video, vuelve a intentarlo_`, m);
      }
    }
  }
};

handler.command = ['ytmp4', 'ytv'];
export default handler;




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
      let deliriusResponse = await fetch(`https://deliriusapi-official.vercel.app/download/ytmp4?url=${shortYoutubeUrl}`);
      let deliriusData = await deliriusResponse.json().catch(() => {
        console.log('La respuesta no es un JSON válido');
      });

      if (!deliriusData.status) throw new Error('Ocurrió un error en la API');

      let downloadUrl = deliriusData.data.download.url;
      let title = deliriusData.data.title || 'video';
      let image = deliriusData.data.image;

      await conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${title}.mp4`, mimetype: 'video/mp4', caption: `╭━❰  *YOUTUBE*  ❱━⬣\n${title}\n╰━❰ *${wm}* ❱━⬣`, thumbnail: await fetch(image) }, { quoted: m });
      
      break; // Salir del loop si la descarga fue exitosa
    } catch (err) {
      console.log(`Intento ${attempt} fallido: ${err.message}`);
      if (attempt === 2) {
        await conn.reply(m.chat, `_[ ❌ ] Error al descargar el video, vuelve a intentarlo_`, m);
      }
    }
  }
};

handler.command = ['ytmp4', 'ytv'];
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

  const videoId = getYoutubeId(youtubeLink);
  const shortYoutubeUrl = `https://youtu.be/${videoId}`;

  conn.reply(m.chat, '_*[ ⏳ ] Descargando el video...*_', m);

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      let deliriusResponse = await fetch(`https://deliriusapi-official.vercel.app/download/ytmp4?url=${shortYoutubeUrl}`);
      let deliriusData = await deliriusResponse.json().catch(() => {
        console.log('La respuesta no es un JSON válido');
      });

      if (!deliriusData.status) throw new Error('Ocurrió un error en la API');

      let downloadUrl = deliriusData.data.download.url;
      let title = deliriusData.data.title || 'video';
      let image = deliriusData.data.image;

      await conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${title}.mp4`, mimetype: 'video/mp4', caption: `╭━❰  *YOUTUBE*  ❱━⬣\n${title}\n╰━❰ *${wm}* ❱━⬣`, thumbnail: await fetch(image) }, { quoted: m });
      
      break; // Salir del loop si la descarga fue exitosa
    } catch (err) {
      console.log(`Intento ${attempt} fallido: ${err.message}`);
      if (attempt === 2) {
        await conn.reply(m.chat, `_[ ❌ ] Error al descargar el video, vuelve a intentarlo_`, m);
      }
    }
  }
};

handler.command = ['ytmp4', 'ytv'];
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

  
  const videoId = getYoutubeId(youtubeLink);
  
  const shortYoutubeUrl = `https://youtu.be/${videoId}`;

  conn.reply(m.chat, '_*[ ⏳ ] Descargando el video...*_', m);


    try {
      
      let deliriusResponse = await fetch(`https://deliriusapi-official.vercel.app/download/ytmp4?url=${shortYoutubeUrl}`);

      
      let deliriusData = await deliriusResponse.json().catch(() => {
        console.log('La respuesta no es un JSON válido');
      });
      
      if (!deliriusData.status) console.log('Ocurrió un rror en la API');

      let downloadUrl = deliriusData.data.download.url;
      let title = deliriusData.data.title || 'video';
      let image = deliriusData.data.image;

      await conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${title}.mp4`, mimetype: 'video/mp4', caption:`╭━❰  *YOUTUBE*  ❱━⬣\n${title}\n╰━❰ *${wm}* ❱━⬣`, thumbnail: await fetch(image) }, { quoted: m });
      //await conn.sendMessage(m.chat, { video: { url: n2 }, fileName: `${n}.mp4`, mimetype: 'video/mp4', caption: `╭━❰  ${wm}  ❱━⬣\n┃ 💜 ${mid.smsYT1}\n┃ ${n}\n╰━━━━━❰ *𓃠 ${vs}* ❱━━━━⬣`, thumbnail: await fetch(n4) }, { quoted: m })
    } catch (err1) {
      await conn.reply(m.chat, `_[ ❌ ] Error al descargar el audio, vuelve a intentarlo_`, m);
         //thumbnail: await fetch(n4)
    }
};


handler.command = ['ytmp4', 'ytv'];
export default handler;
*/


/*
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'
import yts from 'yt-search'
import ytdl from 'ytdl-core'
import axios from 'axios'


let handler = async (m, { conn, args, usedPrefix, command }) => {

if (!args[0]) return await conn.reply(m.chat,  `_*[ ⚠️ ] Agrega un enlace de YouTube*_\n\n> Ejemplo:\n_.${command} https://www.youtube.com/_`, m)
  
let youtubeLink = '';
if (args[0].includes('you')) {
    youtubeLink = args[0];
} else {
    return await conn.reply(m.chat, '_*[ ⚠️ ] El enlace no es de YouTube*_', m)
}

conn.reply(m.chat, `_*[ ⏳ ] Descargando el video...*_`, m)
try {
    let qu = args[1] || '360'
    let q = qu + 'p'
    let v = youtubeLink
    const yt = await youtubedl(v).catch(async _ => await youtubedlv2(v))
    const dl_url = await yt.video[q].download()
    const ttl = await yt.title
    const size = await yt.video[q].fileSizeH
    
    await await conn.sendMessage(m.chat, { video: { url: dl_url }, fileName: `${ttl}.mp4`, mimetype: 'video/mp4', caption: `╭━❰  *YOUTUBE*  ❱━⬣\n${ttl}\n╰━❰ *${wm}* ❱━⬣`, thumbnail: await fetch(yt.thumbnail) }, { quoted: m })
} catch (E1) {
    //console.log('Error 1 ' + E1)  
try {  
    let mediaa = await ytMp4(youtubeLink)
    await conn.sendMessage(m.chat, { video: { url: mediaa.result }, fileName: `error.mp4`, caption: `╭━❰  *YOUTUBE*  ❱━⬣\nVideo de YouTube\n╰━❰ *${wm}* ❱━⬣`, thumbnail: mediaa.thumb, mimetype: 'video/mp4' }, { quoted: m })     
} catch (E2) {  
    //console.log('Error 2 ' + E2)   
try {
    let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${lolkeysapi}&url=${youtubeLink}`)    
    let lolh = await lolhuman.json()
    let n = lolh.result.title || 'error'
    let n2 = lolh.result.link
    let n3 = lolh.result.size
    let n4 = lolh.result.thumbnail
    await conn.sendMessage(m.chat, { video: { url: n2 }, fileName: `${n}.mp4`, mimetype: 'video/mp4', caption: `╭━❰  *YOUTUBE*  ❱━⬣\n${n}\n╰━❰ *${wm}* ❱━⬣`, thumbnail: await fetch(n4) }, { quoted: m })
} catch (E3) {
    //console.log('Error 3 ' + E3)   
}}}}

handler.command = ['ytmp4', 'ytv']
export default handler

function bytesToSize(bytes) {
return new Promise((resolve, reject) => {
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
if (bytes === 0) return 'n/a';
const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
if (i === 0) resolve(`${bytes} ${sizes[i]}`);
resolve(`${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`)})};

async function ytMp3(url) {
return new Promise((resolve, reject) => {
ytdl.getInfo(url).then(async(getUrl) => {
let result = [];
for(let i = 0; i < getUrl.formats.length; i++) {
let item = getUrl.formats[i];
if (item.mimeType == 'audio/webm; codecs=\"opus\"') {
let { contentLength } = item;
let bytes = await bytesToSize(contentLength);
result[i] = { audio: item.url, size: bytes }}};
let resultFix = result.filter(x => x.audio != undefined && x.size != undefined) 
let tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].audio}`);
let tinyUrl = tiny.data;
let title = getUrl.videoDetails.title;
let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
resolve({ title, result: tinyUrl, result2: resultFix, thumb })}).catch(reject)})}

async function ytMp4(url) {
return new Promise(async(resolve, reject) => {
ytdl.getInfo(url).then(async(getUrl) => {
let result = [];
for(let i = 0; i < getUrl.formats.length; i++) {
let item = getUrl.formats[i];
if (item.container == 'mp4' && item.hasVideo == true && item.hasAudio == true) {
let { qualityLabel, contentLength } = item;
let bytes = await bytesToSize(contentLength);
result[i] = { video: item.url, quality: qualityLabel, size: bytes }}};
let resultFix = result.filter(x => x.video != undefined && x.size != undefined && x.quality != undefined) 
let tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].video}`);
let tinyUrl = tiny.data;
let title = getUrl.videoDetails.title;
let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
resolve({ title, result: tinyUrl, rersult2: resultFix[0].video, thumb })}).catch(reject)})};

async function ytPlay(query) {
return new Promise((resolve, reject) => {
yts(query).then(async(getData) => {
let result = getData.videos.slice( 0, 5 );
let url = [];
for (let i = 0; i < result.length; i++) { url.push(result[i].url) }
let random = url[0];
let getAudio = await ytMp3(random);
resolve(getAudio)}).catch(reject)})};

async function ytPlayVid(query) {
return new Promise((resolve, reject) => {
yts(query).then(async(getData) => {
let result = getData.videos.slice( 0, 5 );
let url = [];
for (let i = 0; i < result.length; i++) { url.push(result[i].url) }
let random = url[0];
let getVideo = await ytMp4(random);
resolve(getVideo)}).catch(reject)})};
*/
