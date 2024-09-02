import ytdl from "node-yt-dl";

let handler = async (m, { conn, text }) => {
    const videoUrl = text.trim(); // Extrae la URL del mensaje
    if (!videoUrl) {
        return m.reply('Por favor, proporciona la URL del video.');
    }
    try {
        const result = await ytdl.mp3(videoUrl);
        const message = `Resultado:\n${JSON.stringify(result, null, 2)}`;
        m.reply(message);
    } catch (error) {
        m.reply(`Error: ${error.message}`);
    }
};

handler.command = /^(descargar2|download2)$/i;
export default handler;
