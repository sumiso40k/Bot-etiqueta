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

    let cards = selectedVideos.map((video, index) => ({
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `*Título:* ${video.title}\n*Autor:* ${video.author.nickname} (@${video.author.username})\n*URL:* ${video.url}`
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: `Video ${index + 1}`
      })
    }));

    const finalMessage = generateWAMessageFromContent(message.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `*Resultados de TikTok para:* ${text}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: "`Resultados de TikTok`"
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: cards
            })
          })
        }
      }
    }, { quoted: message });

    await conn.relayMessage(message.chat, finalMessage.message, { messageId: finalMessage.key.id });
    console.log("Mensaje enviado correctamente");

  } catch (error) {
    console.error("Error al manejar la solicitud:", error);
    return message.reply(`*Hubo un error al procesar tu solicitud: ${error.message}*`);
  }
};

handler.help = ["tiktok"];
handler.tags = ["search"];
handler.command = /^(tiktoksearch)$/i;

export default handler;
