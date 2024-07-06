import axios from 'axios';
const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} = (await import("@whiskeysockets/baileys"))["default"];

let handler = async (message, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return message.reply("*`Ingresa el texto de lo que quieres buscar en TikTok`*");
  }

  try {
    let { data } = await axios.get(`https://delirios-api-delta.vercel.app/search/tiktoksearch?query=${text}`);
    console.log("Datos recibidos de la API:", data);

    if (data.status !== 200) {
      return message.reply("*`Hubo un error al obtener los resultados de TikTok`*");
    }

    let videoResults = data.meta;
    if (!videoResults || videoResults.length === 0) {
      return message.reply("*`No se encontraron resultados para la búsqueda en TikTok`*");
    }

    let selectedVideos = videoResults.slice(0, 5);
    console.log("Videos seleccionados:", selectedVideos);

    let messageText = `*Resultados de TikTok para:* ${text}\n\n`;
    selectedVideos.forEach((video, index) => {
      messageText += `*${index + 1}.* *Título:* ${video.title}\n*Autor:* ${video.author.nickname} (@${video.author.username})\n*URL:* ${video.url}\n\n`;
    });

    console.log("Texto del mensaje:", messageText);

    const finalMessage = {
      conversation: messageText
    };

    await conn.sendMessage(message.chat, finalMessage, { quoted: message });
    console.log("Mensaje enviado correctamente");

  } catch (error) {
    console.error("Error al manejar la solicitud:", error);
    return message.reply("*`Hubo un error al procesar tu solicitud`*");
  }
};

handler.help = ["tiktok"];
handler.tags = ["search"];
handler.command = /^(tiktoksearch)$/i;

export default handler;
