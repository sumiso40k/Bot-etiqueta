import CobaltAPI from "cobalt-api";

const cobalt = new CobaltAPI("https://www.youtube.com/watch?v=OAr6AIvH9VY");

let handler = async (m, { conn }) => {
    try {
        const response = await cobalt.sendRequest();
        if (response.status) {
            // Si la descarga es exitosa, enviamos los datos
            m.reply(`Download successful: ${JSON.stringify(response.data)}`);
        } else {
            // Si la descarga falla, enviamos el mensaje de error
            m.reply(`Download failed: ${response.text}`);
        }
    } catch (error) {
        // En caso de que haya un error en el proceso, enviamos el mensaje de error
        m.reply(`Error: ${error.message}`);
    }
};

handler.command = /^(cobalt)$/i;
export default handler;
