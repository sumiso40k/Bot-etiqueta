import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';

const getYoutubeId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const matches = url.match(regex);
  return matches ? matches[1] : null;
};

let handler = async (m, { text, conn, args, usedPrefix, command }) => {
  if (!args[0]) return await conn.reply(m.chat, '_*[ ⚠️ ] Agrega un enlace de YouTube*_\n\n> Ejemplo:\n_.ytmp3 https://www.youtube.com/_', m);

  let youtubeLink = '';

  if (args[0].includes('you')) {
    youtubeLink = args[0];
  } else {
    return await conn.reply(m.chat, '_*[ ⚠️ ] El enlace no es de YouTube*_', m);
  }

  // Extraer la ID del video de la URL de YouTube
  const videoId = getYoutubeId(youtubeLink);
  if (!videoId) return await conn.reply(m.chat, '_*[ ⚠️ ] No se pudo extraer la ID del video*_', m);

  // Crear la URL corta con la ID del video
  const shortYoutubeUrl = `https://youtu.be/${videoId}`;

  conn.reply(m.chat, '_*[ ⏳ ] Descargando el audio...*_', m);
  //conn.reply(m.chat, shortYoutubeUrl, m);

  try {
    let q = '128kbps';
    let v = shortYoutubeUrl;
    const yt = await youtubedl(v).catch(async _ => await youtubedlv2(v));
    const dl_url = await yt.audio[q].download();
    const ttl = await yt.title;
    const size = await yt.audio[q].fileSizeH;
    await conn.sendFile(m.chat, dl_url, ttl + '.mp3', null, m, false, { mimetype: 'audio/mp4' });
  } catch (err1) {
    //await conn.reply(m.chat, `_[ ❌ ] Error al descargar con bochilteam/scraper: ${err1.message}_`, m);

    try {
      // Solicitud a DeliriusAPI con la URL corta
      let deliriusResponse = await fetch(`https://deliriusapi-official.vercel.app/download/ytmp3?url=${shortYoutubeUrl}`);
      if (!deliriusResponse.ok) throw new Error(`HTTP status ${deliriusResponse.status}`);
      
      let deliriusData = await deliriusResponse.json().catch(() => {
        throw new Error('La respuesta no es un JSON válido');
      });
      
      if (!deliriusData.status) throw new Error('Error en la API de Delirius');

      let downloadUrl = deliriusData.data.download.url;
      let title = deliriusData.data.title || 'audio';

      await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, fileName: `${title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m });
    } catch (err2) {
      await conn.reply(m.chat, `_[ ❌ ] Error al descargar con DeliriusAPI: ${err2.message}_`, m);

      try {
        let searchh = await yts(shortYoutubeUrl);
        let __res = searchh.all.map(v => v).filter(v => v.type == "video");
        let infoo = await ytdl.getInfo('https://youtu.be/' + __res[0].videoId);
        let ress = await ytdl.chooseFormat(infoo.formats, { filter: 'audioonly' });
        await conn.sendMessage(m.chat, { audio: { url: ress.url }, fileName: __res[0].title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m });
      } catch (err3) {
        if (err3.message.includes('Status code: 410')) {
          await conn.reply(m.chat, `_[ ❌ ] Error al descargar con ytdl-core: El video ya no está disponible (Error 410)._`, m);
        } else {
          await conn.reply(m.chat, `_[ ❌ ] Error al descargar con ytdl-core: ${err3.message}_`, m);
        }
      }
    }
  }
};

handler.command = ['ytmp3', 'yta'];
export default handler;





/*
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';

let handler = async (m, { text, conn, args, usedPrefix, command }) => {
  if (!args[0]) return await conn.reply(m.chat, '_*[ ⚠️ ] Agrega un enlace de YouTube*_\n\n> Ejemplo:\n_.ytmp3 https://www.youtube.com/_', m);

  let youtubeLink = '';

  if (args[0].includes('you')) {
    youtubeLink = args[0];
  } else {
    return await conn.reply(m.chat, '_*[ ⚠️ ] El enlace no es de YouTube*_', m);
  }

  conn.reply(m.chat, '_*[ ⏳ ] Descargando el audio...*_', m);

  try {
    let q = '128kbps';
    let v = youtubeLink;
    const yt = await youtubedl(v).catch(async _ => await youtubedlv2(v));
    const dl_url = await yt.audio[q].download();
    const ttl = await yt.title;
    const size = await yt.audio[q].fileSizeH;
    await conn.sendFile(m.chat, dl_url, ttl + '.mp3', null, m, false, { mimetype: 'audio/mp4' });
  } catch (err1) {
    await conn.reply(m.chat, `_[ ❌ ] Error al descargar con bochilteam/scraper: ${err1.message}_`, m);

    try {
      // Nueva solicitud a DeliriusAPI
      let deliriusResponse = await fetch(`https://deliriusapi-official.vercel.app/download/ytmp3?url=${youtubeLink}`);
      if (!deliriusResponse.ok) throw new Error(`HTTP status ${deliriusResponse.status}`);
      
      let deliriusData = await deliriusResponse.json().catch(() => {
        throw new Error('La respuesta no es un JSON válido');
      });
      
      if (!deliriusData.status) throw new Error('Error en la API de Delirius');

      let downloadUrl = deliriusData.data.download.url;
      let title = deliriusData.data.title || 'audio';

      await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, fileName: `${title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m });
    } catch (err2) {
      await conn.reply(m.chat, `_[ ❌ ] Error al descargar con DeliriusAPI: ${err2.message}_`, m);

      try {
        let searchh = await yts(youtubeLink);
        let __res = searchh.all.map(v => v).filter(v => v.type == "video");
        let infoo = await ytdl.getInfo('https://youtu.be/' + __res[0].videoId);
        let ress = await ytdl.chooseFormat(infoo.formats, { filter: 'audioonly' });
        await conn.sendMessage(m.chat, { audio: { url: ress.url }, fileName: __res[0].title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m });
      } catch (err3) {
        if (err3.message.includes('Status code: 410')) {
          await conn.reply(m.chat, `_[ ❌ ] Error al descargar con ytdl-core: El video ya no está disponible (Error 410)._`, m);
        } else {
          await conn.reply(m.chat, `_[ ❌ ] Error al descargar con ytdl-core: ${err3.message}_`, m);
        }
      }
    }
  }
};

handler.command = ['ytmp3', 'yta'];
export default handler;
*/


/*import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';

let handler = async (m, { text, conn, args, usedPrefix, command }) => {
  if (!args[0]) return await conn.reply(m.chat, '_*[ ⚠️ ] Agrega un enlace de YouTube*_\n\n> Ejemplo:\n_.ytmp3 https://www.youtube.com/_', m);

  let youtubeLink = '';

  if (args[0].includes('you')) {
    youtubeLink = args[0];
  } else {
    return await conn.reply(m.chat, '_*[ ⚠️ ] El enlace no es de YouTube*_', m);
  }

  conn.reply(m.chat, '_*[ ⏳ ] Descargando el audio...*_', m);

  try {
    let q = '128kbps';
    let v = youtubeLink;
    const yt = await youtubedl(v).catch(async _ => await youtubedlv2(v));
    const dl_url = await yt.audio[q].download();
    const ttl = await yt.title;
    const size = await yt.audio[q].fileSizeH;
    await conn.sendFile(m.chat, dl_url, ttl + '.mp3', null, m, false, { mimetype: 'audio/mp4' });
  } catch (err1) {
    await conn.reply(m.chat, `_[ ❌ ] Error al descargar con bochilteam/scraper: ${err1.message}_`, m);

    try {
      let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytaudio?apikey=${lolkeysapi}&url=${youtubeLink}`);
      if (!lolhuman.ok) throw new Error(`HTTP status ${lolhuman.status}`);
      let lolh = await lolhuman.json().catch(() => {
        throw new Error('La respuesta no es un JSON válido');
      });
      if (lolh.status !== 200) throw new Error(lolh.message);
      let n = lolh.result.title || 'error';
      await conn.sendMessage(m.chat, { audio: { url: lolh.result.link.link }, fileName: `${n}.mp3`, mimetype: 'audio/mp4' }, { quoted: m });
    } catch (err2) {
      await conn.reply(m.chat, `_[ ❌ ] Error al descargar con lolhuman API: ${err2.message}_`, m);

      try {
        let searchh = await yts(youtubeLink);
        let __res = searchh.all.map(v => v).filter(v => v.type == "video");
        let infoo = await ytdl.getInfo('https://youtu.be/' + __res[0].videoId);
        let ress = await ytdl.chooseFormat(infoo.formats, { filter: 'audioonly' });
        await conn.sendMessage(m.chat, { audio: { url: ress.url }, fileName: __res[0].title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m });
      } catch (err3) {
        if (err3.message.includes('Status code: 410')) {
          await conn.reply(m.chat, `_[ ❌ ] Error al descargar con ytdl-core: El video ya no está disponible (Error 410)._`, m);
        } else {
          await conn.reply(m.chat, `_[ ❌ ] Error al descargar con ytdl-core: ${err3.message}_`, m);
        }
      }
    }
  }
};

handler.command = ['ytmp3', 'yta'];
export default handler;
*/
