

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const handler = async (m, { conn, args, command, usedPrefix }) => {
    if (!args[0]) return await conn.reply(m.chat, `_*[ ⚠️ ] Agrega el enlace de un video de Facebook*_\n\n> Ejemplo:\n_.fb https://www.facebook.com/_`, m);

    if (!args[0].match(/www.facebook.com|fb.watch/g)) return await conn.reply(m.chat, `_*[ ⚠️ ] El enlace no es de Facebook*_`, m);

    try {
        await conn.reply(m.chat, `_*[ ⏳ ] Descargando video...*_`, m);

        const response = await fetch(`https://deliriusapi-official.vercel.app/download/facebook?url=${encodeURIComponent(args[0])}`);
        
        if (!response.ok) {
            throw new Error(`Error en la respuesta de la API: ${response.statusText}`);
        }

        const json = await response.json();
        console.log(JSON.stringify(json, null, 2));

        if (json && json.urls && json.urls.length > 0) {
            const videoUrl = json.urls[0].hd || json.urls[1]?.sd || '';
            
            if (videoUrl) {
                const videoResponse = await fetch(videoUrl);
                if (!videoResponse.ok) {
                    throw new Error(`Error al obtener el video: ${videoResponse.statusText}`);
                }

                const videoPath = path.join('/tmp', 'video.mp4');
                const fileStream = fs.createWriteStream(videoPath);

                await new Promise((resolve, reject) => {
                    videoResponse.body.pipe(fileStream);
                    videoResponse.body.on('error', reject);
                    fileStream.on('finish', resolve);
                });

                console.log(`Video descargado en: ${videoPath}`);

                await conn.sendFile(m.chat, videoPath, 'video.mp4', `_*☑️ ${json.title}*_`, m);

                fs.unlinkSync(videoPath); // Elimina el archivo después de enviarlo
            } else {
                throw new Error("No se encontró URL del video");
            }
        } else {
            throw new Error("Respuesta inválida de la API");
        }
    } catch (err) {
        await conn.reply(m.chat, `_*[ ❌ ] Ocurrió un error al descargar el video, inténtalo más tarde*_`, m);
        console.error(`Error en el comando .fb:`, err);
    }
};

handler.command = ['fb', 'fbdl', 'facebook', 'facebookdl'];
export default handler;



/*
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const handler = async (m, { conn, args, command, usedPrefix }) => {
    if (!args[0]) return await conn.reply(m.chat, `_*[ ⚠️ ] Agrega el enlace de un video de Facebook*_\n\n> Ejemplo:\n_.fb https://www.facebook.com/_`, m);

    if (!args[0].match(/www.facebook.com|fb.watch/g)) return await conn.reply(m.chat, `_*[ ⚠️ ] El enlace no es de Facebook*_`, m);

    try {
        await conn.reply(m.chat, `_*[ ⏳ ] Descargando video...*_`, m);

        const response = await fetch(`https://deliriusapi-official.vercel.app/download/facebook?url=${encodeURIComponent(args[0])}`);
        
        if (!response.ok) {
            //throw new Error(`Error en la respuesta de la API: ${response.statusText}`);
        }

        const json = await response.json();
        console.log(json);

        if (json && json.urls && json.urls.length > 0) {
            const videoUrl = json.urls[0].hd || json.urls[1]?.sd || '';
            
            if (videoUrl) {
                
                const videoResponse = await fetch(videoUrl);
                const videoBuffer = await videoResponse.buffer();
                const videoPath = path.join('/tmp', 'video.mp4');
                
                fs.writeFileSync(videoPath, videoBuffer);
                
                
                await conn.sendFile(m.chat, videoPath, 'video.mp4', `_*☑️ ${json.title}*_`, m);

                
                fs.unlinkSync(videoPath);
            } else {
                throw new Error("No se encontró URL del video");
            }
        } else {
            throw new Error("Respuesta inválida de la API");
        }
    } catch (err) {
        await conn.reply(m.chat, `_*[ ❌ ] Ocurrió un error al descargar el video, inténtalo más tarde*_`, m);
        console.error(`Error en el comando .fb:`, err);
    }
};

handler.command = ['fb', 'fbdl', 'facebook', 'facebookdl'];
export default handler;
*/


/*
import fg from 'api-dylux';
import fetch from 'node-fetch';
import {snapsave} from '@bochilteam/scraper';
import fbDownloader from 'fb-downloader-scrapper';
import {facebook} from '@xct007/frieren-scraper';
import axios from 'axios';

const handler = async (m, {conn, args, command, usedPrefix}) => {


if (!args[0])
return await conn.reply(m.chat,  `_*[ ⚠️ ] Agrega el enlace de un video de Facebook*_\n\n> Ejemplo:\n_.fb https://www.facebook.com/_`, m)

if (!args[0].match(/www.facebook.com|fb.watch/g))
return await conn.reply(m.chat, `_*[ ⚠️ ] El enlace no es de Facebook*_`, m)

try { 
await conn.reply(m.chat, `_*[ ⏳ ] Descargando el video...*_`, m)

const d2ata = await facebook.v1(args[0]);
let r2es = '';
if (d2ata.urls && d2ata.urls.length > 0) {
r2es = `${d2ata.urls[0]?.hd || d2ata.urls[1]?.sd || ''}` 
}
conn.sendFile(m.chat, r2es, 'error.mp4', `_*☑️ Video de Facebook*_`, m)

} catch (err1) {

try {
const req = await igeh(args[0])
conn.sendMessage(m.chat, {video: {url: req.url_list}}, m)

} catch (err1_2) {
try {
const Rres = await fetch(`https://api.lolhuman.xyz/api/facebook?apikey=${lolkeysapi}&url=${args[0]}`);
const Jjson = await Rres.json();
let VIDEO = Jjson.result[0];
if (VIDEO == '' || !VIDEO || VIDEO == null) VIDEO = Jjson.result[1];
conn.sendFile(m.chat, VIDEO, 'error.mp4', `_*☑️ Video de Facebook*_`, m);

} catch (err2) {
try {
const ress = await fg.fbdl(args[0]);
const urll = await ress.data[0].url;
await conn.sendFile(m.chat, urll, 'error.mp4', `_*☑️ Video de Facebook*_`, m);

} catch (err3) {
try {
const res = await fbDownloader(args[0]);
for (const result of res.download) {
const ur = result.url;
await conn.sendFile(m.chat, ur, 'error.mp4', `_*☑️ Video de Facebook*_`, m);

}} catch (err4) {
try {
const res3 = await fetch(`https://latam-api.vercel.app/api/facebookdl?apikey=nekosmic&q=${args[0]}`);
const json = await res3.json();
const url3 = await json.video;
await conn.sendFile(m.chat, url3, 'error.mp4', `_*☑️ Video de Facebook*_`, m);

} catch (err5) {
try {
const {result} = await snapsave(args[0]).catch(async (_) => await facebookdlv2(args[0])).catch(async (_) => await savefrom(args[0]));
for (const {url, isVideo} of result.reverse()) await conn.sendFile(m.chat, url, `facebook.${!isVideo ? 'bin' : 'mp4'}`, `_*☑️ Video de Facebook*_`, m);

} catch (err6) {
await conn.reply(m.chat, `_*[ ❌ ] Ocurrió un error al descargar el video, inténtalo más tarde*_`, m)
console.log(`El comando .fb está fallando`)
console.log(err6)

}}}}}}}
}


handler.command = /^(facebook|fb|facebookdl|fbdl|facebook2|fb2|facebookdl2|fbdl2|facebook3|fb3|facebookdl3|fbdl3|facebook4|fb4|facebookdl4|fbdl4|facebook5|fb5|facebookdl5|fbdl5)$/i
//handler.limit = 3 
export default handler

const delay = time => new Promise(res => setTimeout(res, time))

async function igeh(url_media) {
return new Promise(async (resolve, reject)=>{
const BASE_URL = 'https://instasupersave.com/';
try {
const resp = await axios(BASE_URL);
const cookie = resp.headers['set-cookie']; // get cookie from request
const session = cookie[0].split(';')[0].replace('XSRF-TOKEN=', '').replace('%3D', '');
const config = {method: 'post', url: `${BASE_URL}api/convert`, headers: {'origin': 'https://instasupersave.com', 'referer': 'https://instasupersave.com/pt/', 'sec-fetch-dest': 'empty', 'sec-fetch-mode': 'cors', 'sec-fetch-site': 'same-origin', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.52', 'x-xsrf-token': session, 'Content-Type': 'application/json', 'Cookie': `XSRF-TOKEN=${session}; instasupersave_session=${session}`}, data: {url: url_media}};
axios(config).then(function(response) {
const ig = [];
if (Array.isArray(response.data)) {
response.data.forEach((post) => {
ig.push(post.sd === undefined ? post.thumb : post.sd.url);
 });
} else {
ig.push(response.data.url[0].url);
}
resolve({results_number: ig.length, url_list: ig});
}).catch(function(error) {
reject(error.message);
});
} catch (e) {
reject(e.message);
}})}
*/
