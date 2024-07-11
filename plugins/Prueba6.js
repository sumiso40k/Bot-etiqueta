import axios from 'axios';
const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} = (await import("@whiskeysockets/baileys"))["default"];

let handler = async (message, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return message.reply("_*[ ⚠️ ] Ingresa el texto de lo que quieres buscar en Pinterest*_");
  }

  async function createImageMessage(url) {
    const { imageMessage } = await generateWAMessageContent({
      'image': { 'url': url }
    }, { 'upload': conn.waUploadToServer });
    return imageMessage;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  try {
    let imageMessages = [];
    
    let { data } = await axios.get("https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D" + encodeURIComponent(text) + "&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22" + encodeURIComponent(text) + "%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559");

    if (!data.resource_response || !data.resource_response.data || !data.resource_response.data.results) {
      return message.reply("_*[ ⚠️ ] No se encontraron resultados para la búsqueda*_");
    }

    let imageUrls = data.resource_response.data.results.map(result => result.images.orig.url);
    
    shuffleArray(imageUrls);
    
    let selectedImages = imageUrls.splice(0, 5);
    let count = 1;

    for (let imageUrl of selectedImages) {
      imageMessages.push({
        'body': proto.Message.ImageMessage.create({
          'url': imageUrl
        }),
        'footer': proto.Message.TextMessage.create({
          'text': "author"
        }),
        'buttonsMessage': proto.Message.ButtonsMessage.create({
          'headerType': 4,
          'imageMessage': await createImageMessage(imageUrl),
          'contentText': '*`Imagen`* -' + (" " + count++),
          'footerText': '𝚁𝙴𝙼-𝙲𝙷𝙰𝙼 𝙱𝚈 𝙶𝙰𝙱𝚁𝙸𝙴𝙻 - 𝙹𝚃𝚡𝚜',
          'buttons': [{
            'buttonId': '.menu',
            'buttonText': { 'displayText': 'Menu 🗒️' },
            'type': 1
          }]
        })
      });
    }

    for (let imageMessage of imageMessages) {
      const finalMessage = generateWAMessageFromContent(message.chat, {
        'buttonsMessage': imageMessage
      }, { 'quoted': message });

      await conn.relayMessage(message.chat, finalMessage.message, { 'messageId': finalMessage.key.id });
    }
    
  } catch (error) {
    console.error(error);
    message.reply("_*[ ❌ ] Hubo un error al buscar las imágenes. Inténtalo de nuevo más tarde.*_");
  }
};

handler.help = ["pinterest"];
handler.tags = ["search"];
handler.command = ['pinterest'];

export default handler;
