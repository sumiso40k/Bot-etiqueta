import { ytmp4, ytmp4v2, ytmp4v3, ytmp4v4 } from 'ruhend-scraper';

let handler = async (m, { conn, text, command }) => {
    try {
        if (!text) throw 'Por favor, proporciona una URL de YouTube.';

        let data;

        // Selecciona la versión correcta del scraper basado en el comando
        switch (command) {
            case 'ytmp4v1':
                data = await ytmp4(text);
                break;
            case 'ytmp4v2':
                data = await ytmp4v2(text);
                break;
            case 'ytmp4v3':
                data = await ytmp4v3(text);
                break;
            case 'ytmp4v4':
                data = await ytmp4v4(text);
                break;
            default:
                throw 'Comando no reconocido.';
        }

        // Envía la respuesta con el valor completo de data
        m.reply(JSON.stringify(data, null, 2));

    } catch (e) {
        m.reply(`Ocurrió un error: ${e.message}`);
    }
}

// Define los comandos para cada versión
handler.command = /^(ytmp4v1|ytmp4v2|ytmp4v3|ytmp4v4)$/i;

export default handler;
