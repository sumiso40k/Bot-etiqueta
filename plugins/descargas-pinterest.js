import { pinterest } from '@bochilteam/scraper';
const { proto, generateWAMessageFromContent, generateWAMessageContent } = (await import('@adiwajshing/baileys')).default;

let handler = async(m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `*⚠️ 𝙌𝙪𝙚 𝙚𝙨𝙩𝙖 𝙗𝙪𝙨𝙘𝙖𝙙𝙤?*\n𝙐𝙨𝙖𝙧 𝙙𝙚 𝙡𝙖 𝙨𝙞𝙜𝙪𝙞𝙚𝙣𝙩𝙚 𝙢𝙖𝙣𝙚𝙧𝙖\n𝙀𝙟 : ${usedPrefix + command} Loli`, m, { contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, description: null, title: 'Super Bot de Whatsapp', body: '💫 𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 🥳', previewType: 0, thumbnail: 'img_url', sourceUrl: 'source_url' }}});
    
    try {
        const json = await pinterest(text);
        let results = json.slice(0, 5); // Obtener los primeros 5 resultados
        let carousel = [];

        for (let result of results) {
            carousel.push({
                body: proto.Message.fromObject({ text: null }),
                footer: proto.Message.fromObject({ text: 'Pinterest' }),
                header: proto.Message.fromObject({ title: result.title, hasMediaAttachment: true, imageMessage: { url: result.url } }),
                nativeFlowMessage: proto.Message.fromObject({ buttons: [] })
            });
        }

        const messageContent = {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.fromObject({
                        body: proto.Message.fromObject({ text: `Resultados de: ${text}` }),
                        footer: proto.Message.fromObject({ text: 'Pinterest' }),
                        header: proto.Message.fromObject({ hasMediaAttachment: false }),
                        carouselMessage: proto.Message.fromObject({ cards: carousel })
                    })
                }
            }
        };

        const message = generateWAMessageFromContent(m.chat, messageContent, { quoted: m });
        await conn.relayMessage(m.chat, message.message, { messageId: message.key.id });

    } catch (e) {
        await conn.reply(m.chat, `Error al buscar en Pinterest: ${e.message}`, m);
        console.error(e);
    }
};

handler.help = ['pinterest <keyword>'];
handler.tags = ['internet'];
handler.command = /^(pinterest|dlpinterest|pinterestdl)$/i;

export default handler;
