import axios from 'axios';
import { generateWAMessageContent, generateWAMessageFromContent, proto } from '@whiskeysockets/baileys';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        return conn.sendMessage(m.chat.remoteJid, { text: 'Escribe el texto que quieres buscar en Pinterest' });
    }

    async function getImageMessage(url) {
        const { imageMessage } = await generateWAMessageContent({ image: { url: url } }, { upload: conn.waUploadToServer });
        return imageMessage;
    }

    let response = await axios.get(`https://www.pinterest.com/search/pins/?q=${encodeURIComponent(text)}&rs=typed`);
    let results = response.data.resource_response.data.results;
    let imageUrls = results.map(result => result.images.orig.url);

    let imageMessages = [];
    for (let i = 0; i < imageUrls.length; i++) {
        let url = imageUrls[i];
        let imageMessage = await getImageMessage(url);
        imageMessages.push({
            imageMessage: imageMessage,
            caption: `Resultado - ${i + 1}`
        });
    }

    for (let msg of imageMessages) {
        const messageContent = generateWAMessageFromContent(m.chat.remoteJid, {
            imageMessage: msg.imageMessage,
            extendedTextMessage: { text: msg.caption }
        });

        await conn.relayMessage(m.chat.remoteJid, messageContent.m, { messageId: messageContent.chat.id });
    }
};

handler.command = ['pinterest'];
export default handler;
