import fetch from 'node-fetch';

const handler = async (m, {conn, text}) => {

    if (!text) {
        return conn.reply(m.chat, `_*[ ⚠️ ] Escribe lo que quieras a ChatGPT*_\n\n> Ejemplo:\n_Envía un mensaje para obtener una respuesta de ChatGPT_`, m);
    }
    
    try {
        let ia = await fetch(`https://api.diego-ofc.store/ai/bing?username=airi&query=${text}`);
        let res = await ia.json();
        await m.reply(res.msg);
    } catch {
        // Manejo de errores en caso de que la API falle.
        await m.reply(`_*[ ⚠️ ] Hubo un error al procesar tu solicitud. Inténtalo de nuevo más tarde.*_`, m);
    }
};

export default handler;



/*
import fetch from 'node-fetch';
import axios from 'axios';


const handler = async (m, {conn, text, usedPrefix, command}) => {

    if (!text) {
        return conn.reply(m.chat, `_*[ ⚠️ ] Escribe lo que quieras a ChatGPT*_\n\n> Ejemplo:\n_.${command} Recomienda un top 10 de películas de acción_`, m)
    }
    
    try {
        //let gpt = await fetch(`https://delirius-api-oficial.vercel.app/api/chatgpt?q=${text}`)
        
        let ia = await fetch(`https://api.diego-ofc.store/ai/gpt4?username=airi&query=${text}`);
        let res = await ia.json();
        await m.reply(res.msg);
    } catch {
        /*
        try {
            let gpt = await fetch(`https://delirius-api-oficial.vercel.app/api/ia2?text=${text}`)
            let res = await gpt.json()
            await m.reply(res.gpt)
        } catch {
            
        }
        */
    }
};
handler.command = ['ia']
export default handler;
*/
