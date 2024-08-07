import axios from 'axios';
const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} = (await import("@whiskeysockets/baileys"))["default"];

let handler = async (message, { conn, text }) => {
  if (!text) {
    return message.reply("_*[ ⚠️ ] Ingresa el texto de lo que quieres buscar en YouTube*_");
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
    let { data } = await axios.get(`https://api-airi.vercel.app/youtube?query=${encodeURIComponent(text)}`);

    if (!data.results) {
      return message.reply("_*[ ⚠️ ] No se encontraron resultados para la búsqueda*_");
    }

    shuffleArray(data.results);
    let selectedResults = data.results.splice(0, 10);
    let count = 1;

    for (let result of selectedResults) {
      imageMessages.push({
        'body': proto.Message.InteractiveMessage.Body.fromObject({
          'text': "*`Video`* -" + (" " + count++) 
        }),
        'footer': proto.Message.InteractiveMessage.Footer.fromObject({
          'text': "author"
        }),
        'header': proto.Message.InteractiveMessage.Header.fromObject({
          'title': result.title, 
          'hasMediaAttachment': true,
          'imageMessage': await createImageMessage(result.img) 
        }),
        'nativeFlowMessage': proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          'buttons': [{
            'name': "quick_reply",
            'buttonParamsJson': JSON.stringify({
              display_text: 'Ver en YouTube',
              id: result.link
            })
          }]
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
              'text': "*Resultado de :* " + text
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

  } catch (error) {
    console.error(error);
    message.reply("_*[ ❌ ] Hubo un error al buscar. Inténtalo de nuevo más tarde.*_");
  }
};

handler.help = ["ytsearch"];
handler.tags = ["search"];
handler.command = ['yts2', 'ytsearch2'];

export default handler;
