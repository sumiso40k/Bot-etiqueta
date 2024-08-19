
import fetch from 'node-fetch';
import axios from 'axios';
import instagramGetUrl from 'instagram-url-direct';
import {instagram} from '@xct007/frieren-scraper';
import {instagramdl} from '@bochilteam/scraper';
const handler = async (m, {conn, args, command, usedPrefix}) => {
if (!args[0]) throw `${lenguajeGB['smsAvisoMG']()}${mid.smsInsta}\n*${usedPrefix + command} https://www.instagram.com/p/CCoI4DQBGVQ/?igshid=YmMyMTA2M2Y=*`
const { key } = await conn.sendMessage(m.chat, {text: wait}, {quoted: m});
// await delay(1000 * 2);
await conn.sendMessage(m.chat, {text: waitt, edit: key});
await conn.sendMessage(m.chat, {text: waittt, edit: key});
await conn.sendMessage(m.chat, {text: waitttt, edit: key});
try{
const responseIg = await axios.get(`https://deliriusapi-official.vercel.app/download/instagram?url=${args[0]}`);
const resultlIg = responseIg.data;
let linkig=resultlIg.data[0].url
await conn.sendFile(m.chat,linkig, 'error.mp4', `${wm}`, m);
}catch{
try{
const resultD = await instagramDl(args[0]);
const linkD=resultD[0].download_link
await conn.sendFile(m.chat, linkD, 'error.mp4', `${wm}`, m);
await conn.sendMessage(m.chat, {text: waittttt, edit: key})
} catch{
try {
const apiUrll = `https://api.betabotz.org/api/download/igdowloader?url=${encodeURIComponent(args[0])}&apikey=bot-secx3`;
const responsel = await axios.get(apiUrll);
const resultl = responsel.data;
for (const item of resultl.message) {
const shortUrRRl = await (await fetch(`https://tinyurl.com/api-create.php?url=${item.thumbnail}`)).text();
let tXXxt = `✨ *ENLACE | URL:* ${shortUrRRl}\n\n${wm}`.trim()  
conn.sendFile(m.chat, item._url, null, tXXxt, m);
await conn.sendMessage(m.chat, {text: waittttt, edit: key})
await new Promise((resolve) => setTimeout(resolve, 10000));
}} catch {    
try {
const datTa = await instagram.v1(args[0]);
for (const urRRl of datTa) {
const shortUrRRl = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
const tXXxt = `✨ *ENLACE | URL:* ${shortUrRRl}\n\n${wm}`.trim();
conn.sendFile(m.chat, urRRl.url, 'error.mp4', tXXxt, m);
await conn.sendMessage(m.chat, {text: waittttt, edit: key})
await new Promise((resolve) => setTimeout(resolve, 10000));
}} catch {
try {
const resultss = await instagramGetUrl(args[0]).url_list[0];
const shortUrl2 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
const txt2 = `✨ *ENLACE | URL:* ${shortUrl2}\n\n${wm}`.trim();
await conn.sendFile(m.chat, resultss, 'error.mp4', txt2, m);
await conn.sendMessage(m.chat, {text: waittttt, edit: key})
} catch {
try {
const resultssss = await instagramdl(args[0]);
const shortUrl3 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
const txt4 = `✨ *ENLACE | URL:* ${shortUrl3}\n\n${wm}`.trim();
for (const {url} of resultssss) await conn.sendFile(m.chat, url, 'error.mp4', txt4, m);
await conn.sendMessage(m.chat, {text: waittttt, edit: key})
} catch {
try {
const human = await fetch(`https://api.lolhuman.xyz/api/instagram?apikey=${lolkeysapi}&url=${args[0]}`);
const json = await human.json();
const videoig = json.result;
const shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
const txt1 = `✨ *ENLACE | URL:* ${shortUrl1}\n\n${wm}`.trim();
await conn.sendFile(m.chat, videoig, 'error.mp4', txt1, m);
await conn.sendMessage(m.chat, {text: waittttt, edit: key})
} catch (e) {
conn.sendMessage(m.chat, {text: `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, edit: key});
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)
}}}}}}}}
handler.help = ['instagram <link ig>']
handler.tags = ['downloader']
handler.command =/^(instagram|ig(dl)?)$/i
handler.limit = 2
handler.register = true
export default handler



/*import fetch from 'node-fetch';
import axios from 'axios';
import instagramGetUrl from 'instagram-url-direct';
import {instagram} from '@xct007/frieren-scraper';
import {instagramdl} from '@bochilteam/scraper';
import instagramDl from '@sasmeee/igdl';
import {fileTypeFromBuffer} from 'file-type';


const handler = async (m, {conn, args, command, usedPrefix}) => {

    if (!args[0]) return conn.reply(m.chat,`_*[ ⚠️ ] Agrega el enlace de un video o una publicación de Instagram*_\n\n> Ejemplo:\n_.${command} https://www.instagram.com/_`, m);
    await conn.reply(m.chat, '_*[ ⏳ ] Descargando...*_', m);

    try {
        const img = await instagramDl(args[0]);
        for (let i = 0; i < img.length; i++) {
            const bufferInfo = await getBuffer(img[i].download_link);
            if (bufferInfo.detectedType.mime.startsWith('image/')) {
                await conn.sendMessage(m.chat, {image: {url: img[i].download_link}}, {quoted: m});
            } else if (bufferInfo.detectedType.mime.startsWith('video/')) {
                await conn.sendMessage(m.chat, {video: {url: img[i].download_link }}, {quoted: m});
                //handler.limit = 2;
            }
        }
    } catch {   
        try {
            const datTa = await instagram.download(args[0]);
            for (const urRRl of datTa) {
            const shortUrRRl = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
            const tXXxt = `_*☑️ Video de Instagram*_`.trim();
            conn.sendFile(m.chat, urRRl.url, 'error.mp4', tXXxt, m);
            await new Promise((resolve) => setTimeout(resolve, 10000));
            //handler.limit = 2;
            }
        } catch {
            try {
                const resultss = await instagramGetUrl(args[0]).url_list[0];
                const shortUrl2 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
                const txt2 = `_*☑️ Video de Instagram*_`.trim();
                await conn.sendFile(m.chat, resultss, 'error.mp4', txt2, m);
                //handler.limit = 2        
            } catch {
                try {
                    const resultssss = await instagramdl(args[0]);
                    const shortUrl3 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
                    const txt4 = `_*☑️ Video de Instagram*_`.trim();
                    for (const {url} of resultssss) await conn.sendFile(m.chat, url, 'error.mp4', txt4, m);
                    //handler.limit = 2          
                } catch {
                    try {
                        const human = await fetch(`https://api.lolhuman.xyz/api/instagram?apikey=${lolkeysapi}&url=${args[0]}`);
                        const json = await human.json();
                        const videoig = json.result;
                        const shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
                        const txt1 = `_*☑️ Video de Instagram*_`.trim();
                        await conn.sendFile(m.chat, videoig, 'error.mp4', txt1, m);
                        //handler.limit = 2            
                    } catch {
                        console.log('Error al descargar el video de Instagram')  
                        conn.sendMessage(m.chat, '_*[ ❌ ] Ocurrió un error, inténtalo más tarde*_', m);
                        //handler.limit = 0
                    }
                }
            }
        }
    }
};

handler.help = ['instagram <link ig>']
handler.tags = ['downloader']
handler.command = ['ig']
//handler.limit = 2

export default handler;

const getBuffer = async (url, options) => {
    options = options || {};
    const res = await axios({method: 'get', url, headers: {'DNT': 1, 'Upgrade-Insecure-Request': 1}, ...options, responseType: 'arraybuffer'});
    const buffer = Buffer.from(res.data, 'binary');
    const detectedType = await fileTypeFromBuffer(buffer);
    if (!detectedType || (detectedType.mime !== 'image/jpeg' && detectedType.mime !== 'image/png' && detectedType.mime !== 'video/mp4')) {
        return null;
    }
    return { buffer, detectedType };
};
*/
