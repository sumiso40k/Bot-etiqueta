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

    let selectedVideos = videoResults.slice(0, 5); // Usamos slice en lugar de splice para no modificar el array original
    console.log("Videos seleccionados:", selectedVideos);

    let videoMessages = [];

    for (let video of selectedVideos) {
      videoMessages.push({
        'body': proto.Message.InteractiveMessage.Body.fromObject({
          'text': `*Título:* ${video.title}\n*Autor:* ${video.author.nickname} (@${video.author.username})\n*URL:* ${video.url}`
        })
      });
    }

    console.log("Mensajes de video generados:", videoMessages);

    const finalMessage = generateWAMessageFromContent(message.chat, {
      'viewOnceMessage': {
        'message': {
          'messageContextInfo': {
            'deviceListMetadata': {},
            'deviceListMetadataVersion': 2
          },
          'interactiveMessage': proto.Message.InteractiveMessage.fromObject({
            'body': proto.Message.InteractiveMessage.Body.create({
              'text': "*`Resultados de TikTok para :`* " + text
            }),
            'footer': proto.Message.InteractiveMessage.Footer.create({
              'text': "`Resultados proporcionados por la API de TikTok`"
            }),
            'header': proto.Message.InteractiveMessage.Header.create({
              'hasMediaAttachment': false
            }),
            'carouselMessage': proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              'cards': videoMessages
            })
          })
        }
      }
    }, { 'quoted': message });

    console.log("Mensaje final generado:", finalMessage);

    await conn.relayMessage(message.chat, finalMessage.message, { 'messageId': finalMessage.key.id });
  } catch (error) {
    console.error("Error al manejar la solicitud:", error);
    return message.reply("*`Hubo un error al procesar tu solicitud`*");
  }
};

handler.help = ["tiktok"];
handler.tags = ["search"];
handler.command = /^(tiktoksearch)$/i;

export default handler;
