import axios from 'axios';

const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} = (await import("@whiskeysockets/baileys"))["default"];

let handler = async (message, { conn, text }) => {
  if (!text) {
    return message.reply("_*[ ⚠️ ] Ingresa lo que quieres buscar en Spotify*_");
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
    let { data } = await axios.get(`https://deliriusapi-official.vercel.app/search/spotify?q=${encodeURIComponent(text)}&limit=20`);
    console.log(data)

    if (!data.data) {
      return message.reply("_*[ ⚠️ ] No se encontraron resultados para la búsqueda*_");
    }

    shuffleArray(data.data);
    let selectedResults = data.data.splice(0, 10);
    let count = 1;

    for (let result of selectedResults) {
      let buttons = [];

      if (!message.isGroup) { // Si no es un grupo, agregar botones
        buttons = [
          {
            'name': "quick_reply",
            'buttonParamsJson': JSON.stringify({
              display_text: '⬇️ Audio',
              id: `.dlspotify ${data.url}`
            })
          },
          {
            'name': "quick_reply",
            'buttonParamsJson': JSON.stringify({
              display_text: '⬇️ Audio (Documento)',
              id: `.dlspotifydoc ${data.url}`
            })
          }
        ];
      }

      imageMessages.push({
        'body': proto.Message.InteractiveMessage.Body.fromObject({
          'text': `*Artista:* ${data.artist}\n*Álbum:* ${data.album}\n*Duración:* ${data.duration}\n*Publicado:* ${data.publish}\n*Popularidad:* ${data.popularity}\n*Link:* ${data.url}`
        }),
        'footer': proto.Message.InteractiveMessage.Footer.fromObject({
          'text': ""
        }),
        'header': proto.Message.InteractiveMessage.Header.fromObject({
          'title': data.title, 
          'hasMediaAttachment': true,
          'imageMessage': await createImageMessage(data.image)
        }),
        'nativeFlowMessage': proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          'buttons': buttons // Añadimos los botones si es necesario
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
              'text': "."
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

handler.help = ["spotifys"];
handler.tags = ["search"];
handler.command = ['spotifysearch', 'spotifys'];

export default handler;
