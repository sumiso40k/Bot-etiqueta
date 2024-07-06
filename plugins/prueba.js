import axios from 'axios';
import { generateWAMessageContent, generateWAMessageFromContent, proto } from '@whiskeysockets/baileys';

let handler = async (message, { conn, text, usedPrefix, command }) => {
    if (!text) {
        return message.reply('Escribe el texto que quieres buscar en Pinterest');
    }

    async function getImageMessage(url) {
        const { imageMessage } = await generateWAMessageContent({ image: { url: url } }, { upload: conn.waUploadToServer });
        return imageMessage;
    }

    let response = await axios.get(`https://www.pinterest.com/search/pins/?q=${encodeURIComponent(text)}&rs=typed`);
    let results = response.data.resource_response.data.results;
    let imageUrls = results.map(result => result.images.orig.url);

    let imageMessages = [];
    for (let url of imageUrls) {
        let imageMessage = await getImageMessage(url);
        imageMessages.push({
            body: proto.Message.fromObject({ extendedTextMessage: { text: `Resultado - ${imageMessages.length}` } }),
            footer: proto.Message.fromObject({ extendedTextMessage: { text: 'Busca más en Pinterest' } }),
            header: proto.Message.fromObject({ imageMessage: imageMessage }),
            nativeFlowMessage: proto.Message.fromObject({ buttons: [{ buttonId: `id${text}`, buttonText: { displayText: 'Buscar de nuevo' }, type: 1 }] })
        });
    }

    const messageContent = generateWAMessageFromContent(message.key.remoteJid, {
        viewOnceMessage: {
            message: {
                messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                interactiveMessage: proto.Message.fromObject({
                    carouselMessage: { cards: imageMessages }
                })
            }
        }
    }, { quoted: message });

    await conn.relayMessage(message.key.remoteJid, messageContent.message, { messageId: messageContent.key.id });
};

handler.command = ['pinterest'];
export default handler;
