import fetch from 'node-fetch';

const handler = async (m, { conn, args, command, usedPrefix }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `_*[ ⚠️ ] Agrega un enlace de Youtube*_`, m);
    }

    try {
        await conn.reply(m.chat, `_*[ ⏳ ] Descargando video...*_`, m);

        const apiUrl = `https://deliriusapi-official.vercel.app/download/ytmp4?url=${encodeURIComponent(args[0])}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.data && data.data.download.url) {
            const downloadUrl = data.data.download.url;
            const filename = `${data.data.title || 'video'}.mp4`;
            const thumb = data.data.image;
            await conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${filename}.mp4`, mimetype: 'video/mp4', caption: `╭━❰  *YOUTUBE*  ❱━⬣\n${filename}\n╰━❰ *${wm}* ❱━⬣`, thumbnail: await fetch(thumb) }, { quoted: m })
            //await conn.sendFile(m.chat, downloadUrl, filename, `Titulo: ${filename}`, m);
        } else {
            throw new Error('_*[ ❌ ] Ocurrió un error al descargar el video*_');
        }
    } catch (err) {
        console.error(err);
        await conn.reply(m.chat, `_*[ ❌ ] Ocurrió un error al descargar el video, inténtalo más tarde*_`, m);
    }
};

handler.command = ['ytv', 'ytmp4'];
export default handler;
              




/*import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
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
    
    await await conn.sendMessage(m.chat, { video: { url: dl_url }, fileName: `${ttl}.mp4`, mimetype: 'video/mp4', caption: `╭━❰  *YOUTUBE*  ❱━⬣\n${dl_url}\n╰━❰ *${wm}* ❱━⬣`, thumbnail: await fetch(yt.thumbnail) }, { quoted: m })
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
