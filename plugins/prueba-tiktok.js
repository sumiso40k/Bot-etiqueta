import axios from 'axios'; // Importa axios para hacer solicitudes HTTP
const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} = (await import("@whiskeysockets/baileys"))["default"]; // Importa funciones y objetos necesarios del módulo @whiskeysockets/baileys

// Define un manejador de comandos asíncrono
let handler = async (message, { conn, text, usedPrefix, command }) => {
  // Verifica si el texto (query) está vacío y responde con un mensaje de error si es así
  if (!text) {
    return message.reply("*`Ingresa el texto de lo que quieres buscar en TikTok`*");
  }

  // Hace una solicitud GET a la API de TikTok con el texto de búsqueda
  let { data } = await axios.get(`https://delirios-api-delta.vercel.app/search/tiktoksearch?query=${text}`);
  
  // Verifica si la solicitud fue exitosa
  if (data.status !== 200) {
    return message.reply("*`Hubo un error al obtener los resultados de TikTok`*");
  }

  let videoResults = data.meta; // Obtiene los resultados de la búsqueda de la respuesta
  let selectedVideos = videoResults.splice(0, 5); // Selecciona los primeros 5 resultados

  let videoMessages = []; // Array para almacenar los mensajes de texto

  // Itera sobre los videos seleccionados y crea mensajes de texto para cada uno
  for (let video of selectedVideos) {
    videoMessages.push({
      'body': proto.Message.InteractiveMessage.Body.fromObject({
        'text': `*Título:* ${video.title}\n*Autor:* ${video.author.nickname} (@${video.author.username})\n*URL:* ${video.url}`
      })
    });
  }

  // Genera el mensaje final con el contenido de los mensajes de texto
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
            'cards': [...videoMessages] // Inserta los mensajes de texto creados en el carrusel
          })
        })
      }
    }
  }, { 'quoted': message });

  // Envía el mensaje final al chat
  await conn.relayMessage(message.chat, finalMessage.message, { 'messageId': finalMessage.key.id });
};

// Define el comando y sus atributos
handler.help = ["tiktok"];
handler.tags = ["search"];
handler.command = /^(tiktoksearch)$/i;

export default handler; // Exporta el manejador para que pueda ser utilizado por otros módulos
