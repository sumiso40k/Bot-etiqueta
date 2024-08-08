
import axios from 'axios';

const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} = (await import("@whiskeysockets/baileys"))["default"];


let handler = async (message, { conn, text }) => {
  if (!text) {
    return message.reply("_*[ ⚠️ ] Ingresa lo que quieres buscar en YouTube*_");
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
          'text': `*Publicado:* ${result.timeAgo}\n*Link:* ${result.link}`
        }),
        'footer': proto.Message.InteractiveMessage.Footer.fromObject({
          'text': "*Video* -" + (" " + count++)
        }),
        'header': proto.Message.InteractiveMessage.Header.fromObject({
          'title': result.title, 
          'hasMediaAttachment': true,
          'imageMessage': await createImageMessage(result.img) 
        }),
        'nativeFlowMessage': proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          'buttons': [
              {
                'name': "quick_reply",
                'buttonParamsJson': JSON.stringify({
                display_text: 'Descargar Audio 🔈',
                id: `.ytmp3 ${result.link}`
                })
              },
              {
                'name': "quick_reply",
                'buttonParamsJson': JSON.stringify({
                display_text: 'Descargar Video 📹',
                id: `.ytmp4 ${result.link}`
                })
              }
          ]
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
handler.command = ['yts', 'ytsearch'];

export default handler;




/*
import yts from 'yt-search';
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
if (!text) conn.reply(m.chat, `_*[ ⚠️ ] Ingresa lo que quieres buscar en Youtube*_\n\n> Ejemplo:\n_.${command} música electrónica_`, m)    
    let result = await yts(text);
    let ytres = result.videos;
    
let listSections = [];
    for (let index in ytres) {
        let v = ytres[index];
        listSections.push({
            title: `⊰᯽⊱┈──╌❊ - ❊╌──┈⊰᯽⊱`,
            rows: [
                {
                    header: '🎶 𝐀𝐔𝐃𝐈𝐎',
                    title: "",
                    description: `${v.title}`, 
                    id: `${usedPrefix}ytmp3 ${v.url}`
                },
                {
                    header: "🎥 𝐕𝐈𝐃𝐄𝐎",
                    title: "" ,
                    description: `${v.title}`, 
                    id: `${usedPrefix}ytmp4 ${v.url}`
                }
            ]
        });
    }

    await conn.sendList(m.chat, `🔎 𝘽𝙪𝙨𝙦𝙪𝙚𝙙𝙖 𝙙𝙚:`, `${text}`, `Ver Resultados`, listSections, m);
};
handler.help = ['playlist']
handler.tags = ['dl']
handler.command = ['yts', 'ytsearch']

export default handler
*/
