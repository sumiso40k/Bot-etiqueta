
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



//----------------------------------------
if (command==='ytmp4doc') {
    
    conn.reply(m.chat, '_*[ ⏳ ] Descargando el video...*_', m);
    
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      let apiResponse = await fetch(`https://deliriusapi-official.vercel.app/download/ytmp4?url=${shortYoutubeUrl}`);
      let apiData = await apiResponse.json().catch(() => {
        console.log('La respuesta no es un JSON válido');
      });

      if (!apiData.status) throw new Error('Ocurrió un error en la API');

      let downloadUrl = apiData.data.download.url;
      let title = apiData.data.title || 'video';
      let image = apiData.data.image;
      let capt = `╭━❰  *YOUTUBE*  ❱━⬣\n${title}\n╰━❰ *${wm}* ❱━⬣`
      
      
      await conn.sendMessage(m.chat, {document: {url: downloadUrl}, caption: capt, mimetype: 'video/mp4', fileName: `${title}.mp4`}, {quoted: m});
      
      
      break;
    } catch (err) {
      console.log(`Intento ${attempt} fallido: ${err.message}`);
      if (attempt === 2) {
        await conn.reply(m.chat, `_[ ❌ ] Error al descargar el video, vuelve a intentarlo_`, m);
      }
    }
  }
}

//----------------------------------------

if (command==='ytmp3doc'){
    
    conn.reply(m.chat, '_*[ ⏳ ] Descargando el audio...*_', m);
    
    for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      let apiResponse = await fetch(`https://deliriusapi-official.vercel.app/download/ytmp4?url=${shortYoutubeUrl}`);
      let apiData = await apiResponse.json().catch(() => {
        console.log('La respuesta no es un JSON válido');
      });

      if (!apiData.status) throw new Error('Ocurrió un error en la API');

      let downloadUrl = apiData.data.download.url;
      let title = apiData.data.title || 'video';
      let image = apiData.data.image;
      let capt = `╭━❰  *YOUTUBE*  ❱━⬣\n${title}\n╰━❰ *${wm}* ❱━⬣`
      
      
      await conn.sendMessage(m.chat, {document: {url: downloadUrl}, caption: capt, mimetype: 'audio/mp4', fileName: `${title}.mp3`}, {quoted: m});
      
      
      break;
    } catch (err) {
      console.log(`Intento ${attempt} fallido: ${err.message}`);
      if (attempt === 2) {
        await conn.reply(m.chat, `_[ ❌ ] Error al descargar el audio, vuelve a intentarlo_`, m);
      }
    }
  }
}
//----------------------------------------

};

handler.command = ['ytmp4doc', 'ytmp3doc'];
export default handler;
      
