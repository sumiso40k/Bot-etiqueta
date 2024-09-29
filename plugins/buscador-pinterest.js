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

  let imageMessages = [];
  let { data } = await axios.get("https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D" + text + "&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22" + text + "%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559");
  let imageUrls = data.resource_response.data.results.map(result => result.images.orig.url);
  shuffleArray(imageUrls);
  let selectedImages = imageUrls.splice(0, 10);
  let count = 1;

  for (let imageUrl of selectedImages) {
    imageMessages.push({
      'body': proto.Message.InteractiveMessage.Body.fromObject({
        'text': "*Imagen* -" + (" " + count++)
      }),
      'footer': proto.Message.InteractiveMessage.Footer.fromObject({
        'text': ""
      }),
      'header': proto.Message.InteractiveMessage.Header.fromObject({
        'title': '',
        'hasMediaAttachment': true,
        'imageMessage': await createImageMessage(imageUrl)
      }),
      'nativeFlowMessage': proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        
      })
    });
  }

  const finalMessage = generateWAMessageFromContent(message.chat, {
    'viewOnceMessage': {
      'message': {
        'messageContextInfo': {
          'deviceListMetadata': {},
          'deviceListMetadataVersion': 2
        },
        'interactiveMessage': proto.Message.InteractiveMessage.fromObject({
          'body': proto.Message.InteractiveMessage.Body.create({
            'text': "*Resultado de:* " + text
          }),
          'footer': proto.Message.InteractiveMessage.Footer.create({
            'text': ""
          }),
          'header': proto.Message.InteractiveMessage.Header.create({
            'hasMediaAttachment': false
          }),
          'carouselMessage': proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            'cards': [...imageMessages]
          })
        })
      }
    }
  }, { 'quoted': message });

  await conn.relayMessage(message.chat, finalMessage.message, { 'messageId': finalMessage.key.id });
};

handler.help = ["pinterest"];
handler.tags = ["search"];
handler.command = ['pinterest'];

export default handler;
