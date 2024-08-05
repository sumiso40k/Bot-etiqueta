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
