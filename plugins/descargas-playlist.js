import yts from 'yt-search';
import { proto, generateWAMessageFromContent } from '@adiwajshing/baileys';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    if (!text) {
        conn.reply(m.chat, `${lenguajeGB['smsAvisoMG']()}𝙀𝙨𝙘𝙧𝙞𝙗𝙖 𝙚𝙡 𝙣𝙤𝙢𝙗𝙧𝙚 𝙙𝙚 𝙪𝙣 𝙫𝙞𝙙𝙚𝙤 𝙤 𝙘𝙖𝙣𝙖𝙡 𝙙𝙚 𝙮𝙤𝙪𝙩𝙪𝙗𝙚`, m, {contextInfo: {externalAdReply: {mediaUrl: null, mediaType: 1, description: null, title: mg, body: wm, previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}});
        return;
    }

    let result = await yts(text);
    let ytres = result.videos;

    let sections = ytres.slice(0, 5).map((v, index) => ({
        title: `${v.title}`,
        rows: [
            {
                title: '🎶 AUDIO',
                rowId: `${usedPrefix}ytmp3 ${v.url}`,
                description: `❤️ *TÍTULO:* ${v.title}\n💜 *DURACIÓN:* ${v.timestamp}\n🧡 *VISTAS:* ${v.views}\n💚 *SUBIDO:* ${v.ago}`
            },
            {
                title: '🎥 VIDEO',
                rowId: `${usedPrefix}ytmp4 ${v.url}`,
                description: `❤️ *TÍTULO:* ${v.title}\n💜 *DURACIÓN:* ${v.timestamp}\n🧡 *VISTAS:* ${v.views}\n💚 *SUBIDO:* ${v.ago}`
            }
        ],
        thumbnail: v.thumbnail
    }));

    const listMessage = {
        text: `🔎 𝘽𝙪𝙨𝙦𝙪𝙚𝙙𝙖 𝙙𝙚: ${text}`,
        footer: wm,
        title: 'Resultados de búsqueda',
        buttonText: 'Ver resultados',
        sections
    };

    await conn.sendMessage(m.chat, listMessage, { quoted: m });
};

handler.help = ['playlist'];
handler.tags = ['dl'];
handler.command = /^playlist|ytbuscar|yts(earch)?$/i;
handler.limit = 1;

export default handler;
