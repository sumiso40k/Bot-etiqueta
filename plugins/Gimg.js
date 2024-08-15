import { googleImage } from '@bochilteam/scraper'; // Asegúrate de haber instalado el módulo correctamente

let handler = async (m, { conn, text }) => {
    if (!text) {
        return m.reply('Por favor, proporciona un término de búsqueda.');
    }

    try {
        const results = await googleImage(text);
        const jsonResponse = JSON.stringify(results, null, 2);
        m.reply(jsonResponse);
    } catch (error) {
        console.error(error);
        m.reply('Hubo un error al realizar la búsqueda.');
    }
}

handler.command = ['imagen', 'buscarimagen', 'gi']; // Comandos que activarán esta función
export default handler;
