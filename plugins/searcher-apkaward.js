
import axios from 'axios';
const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} = (await import("@whiskeysockets/baileys"))["default"];

let handler = async (message, { conn, text }) => {
  if (!text) {
    return message.reply("_*[ ⚠️ ] Ingresa el nombre del APK que quieres buscar*_");
  }

  async function createImageMessage(url) {
    try {
      const { imageMessage } = await generateWAMessageContent({
        'image': { 'url': url }
      }, { 'upload': conn.waUploadToServer });
      return imageMessage;
    } catch (error) {
      console.error(`Error al crear la imagen para la URL: ${url}`, error);
      return null;  // Retorna null si hay un error
    }
  }

  try {
    let imageMessages = [];
    let { data } = await axios.get(`https://api-airi.vercel.app/apkaward?query=${encodeURIComponent(text)}`);
    message.reply(`${data}`);
    if (!Array.isArray(data.results) || data.results.length === 0) {
      return message.reply("_*[ ⚠️ ] No se encontraron resultados para la búsqueda*_");
    }

    for (let result of data.results) {
      console.log(`Procesando resultado: ${result.title}`);
      console.log(`Imagen URL: ${result.imageUrl}`);
      console.log(`Enlaces de descarga:`, result.downloadLinks);

      let bodyText = `*${result.title}*\n\n*Versión:* ${result.version}\n*Requisitos de Android:* ${result.androidRequirement || "No especificado"}\n\n*Enlaces de Descarga:*\n`;

      for (let link of result.downloadLinks) {
        if (link.fileName && link.downloadLink) {
          bodyText += `- ${link.fileName}: ${link.downloadLink}\n`;
        } else {
          console.warn(`Enlace de descarga inválido para: ${result.title}`);
        }
      }

      const imageMessage = await createImageMessage(result.imageUrl);
      if (imageMessage) {
        imageMessages.push({
          'body': proto.Message.InteractiveMessage.Body.fromObject({
            'text': bodyText
          }),
          'header': proto.Message.InteractiveMessage.Header.fromObject({
            'title': result.title,
            'hasMediaAttachment': true,
            'imageMessage': imageMessage
          }),
        });
      }
    }

    if (imageMessages.length > 0) {
      const finalMessage = generateWAMessageFromContent(message.chat, {
        'viewOnceMessage': {
          'message': {
            'interactiveMessage': proto.Message.InteractiveMessage.fromObject({
              'body': proto.Message.InteractiveMessage.Body.create({
                'text': `*Resultados de búsqueda para: ${text}*`
              }),
              'carouselMessage': proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                'cards': [...imageMessages]
              })
            })
          }
        }
      }, { 'quoted': message });

      await conn.relayMessage(message.chat, finalMessage.message, { 'messageId': finalMessage.key.id });
    } else {
      message.reply("_*[ ⚠️ ] No se encontraron imágenes para mostrar en los resultados.*_");
    }

  } catch (error) {
    console.error(error);
    message.reply("_*[ ❌ ] Hubo un error al buscar. Inténtalo de nuevo más tarde.*_");
  }
};

handler.help = ["apksearch"];
handler.tags = ["search"];
handler.command = ['apkaward', 'apksearch'];

export default handler;



/*import axios from 'axios';
const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} = (await import("@whiskeysockets/baileys"))["default"];

let handler = async (message, { conn, text }) => {
  if (!text) {
    return message.reply("_*[ ⚠️ ] Ingresa el nombre del APK que quieres buscar*_");
  }

  async function createImageMessage(url) {
    const { imageMessage } = await generateWAMessageContent({
      'image': { 'url': url }
    }, { 'upload': conn.waUploadToServer });
    return imageMessage;
  }

  try {
    let imageMessages = [];
    let { data } = await axios.get(`https://api-airi.vercel.app/apkaward?query=${encodeURIComponent(text)}`);

    if (!data.results || data.results.length === 0) {
      return message.reply("_*[ ⚠️ ] No se encontraron resultados para la búsqueda*_");
    }

    for (let result of data.results) {
      let bodyText = `*${result.title}*\n\n*Versión:* ${result.version}\n*Requisitos de Android:* ${result.androidRequirement || "No especificado"}\n\n*Enlaces de Descarga:*\n`;

      for (let link of result.downloadLinks) {
        bodyText += `- ${link.fileName}: ${link.downloadLink}\n`;
      }

      imageMessages.push({
        'body': proto.Message.InteractiveMessage.Body.fromObject({
          'text': bodyText
        }),
        'header': proto.Message.InteractiveMessage.Header.fromObject({
          'title': result.title,
          'hasMediaAttachment': true,
          'imageMessage': await createImageMessage(result.imageUrl)
        }),
      });
    }

    const finalMessage = generateWAMessageFromContent(message.chat, {
      'viewOnceMessage': {
        'message': {
          'interactiveMessage': proto.Message.InteractiveMessage.fromObject({
            'body': proto.Message.InteractiveMessage.Body.create({
              'text': `*Resultados de búsqueda para: ${text}*`
            }),
            'carouselMessage': proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              'cards': [...imageMessages]
            })
          })
        }
      }
    }, { 'quoted': message });

    await conn.relayMessage(message.chat, finalMessage.message, { 'messageId': finalMessage.key.id });

  } catch (error) {
    console.error(error);
    message.reply("_*[ ❌ ] Hubo un error al buscar. Inténtalo de nuevo más tarde.*_");
  }
};

handler.help = ["apksearch"];
handler.tags = ["search"];
handler.command = ['apkaward', 'apksearch'];

export default handler;
*/
