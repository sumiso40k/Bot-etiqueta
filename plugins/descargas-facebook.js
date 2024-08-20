import axios from 'axios';

const handler = async (m, {conn, args, command, usedPrefix}) => {

    if (!args[0]) return await conn.reply(m.chat,  `_*[ ⚠️ ] Agrega el enlace de un video de Facebook*_\n\n> Ejemplo:\n_.fb https://www.facebook.com/_`, m);

    if (!args[0].match(/www.facebook.com|fb.watch/g)) return await conn.reply(m.chat, `_*[ ⚠️ ] El enlace no es de Facebook*_`, m);

    await conn.reply(m.chat, `_*[ ⏳ ] Descargando el video...*_`, m);
    
    try { 
        

        
        const response = await axios.get(`https://deliriusapi-official.vercel.app/download/facebook`, {
            params: {
                url: encodeURIComponent(args[0])
            }
        });
        
        
        //const response = await axios.get(`https://deliriusapi-official.vercel.app/download/instagram?url=${args[0]}`);
        const result = response.data;
        const dlink = result.urls[0].hd || result.urls[1]?.sd || '';
        await conn.sendFile(m.chat, dlink, 'error.mp4', `${wm} 1`, m);
        
    } catch (err) {
        await conn.reply(m.chat, `_*[ ❌ ] Ocurrió un error al descargar el video, inténtalo más tarde*_`, m);
        console.error(`Error en el comando .fb`, err);
    }
};

handler.command = ['fb', 'fbdl', 'facebook', 'facebookdl'];
export default handler;
