import yts from 'yt-search';
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
if (!text) conn.reply(m.chat,  `${lenguajeGB['smsAvisoMG']()}𝙀𝙨𝙘𝙧𝙞𝙗𝙖 𝙚𝙡 𝙣𝙤𝙢𝙗𝙧𝙚 𝙙𝙚 𝙪𝙣 𝙫𝙞𝙙𝙚𝙤 𝙤 𝙘𝙖𝙣𝙖𝙡 𝙙𝙚 𝙮𝙤𝙪𝙩𝙪𝙗𝙚`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: mg, body: wm, previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}})    
    let result = await yts(text);
    let ytres = result.videos;
    
let listSections = [];
    for (let index in ytres) {
        let v = ytres[index];
        listSections.push({
            title: `• Opción : [ ${index} ]`,
            rows: [
                {
                    header: '🎶 𝐀𝐔𝐃𝐈𝐎',
                    title: "",
                    description: `❤️꙰༻ *TÍTULO:* ${v.title}\n💜꙰༻ *DURACIÓN:* ${v.timestamp}\n⁖🧡꙰༻ *VISTAS:* ${v.views}\n⁖💚꙰༻ *SUBIDO:* ${v.ago}\n`, 
                    id: `${usedPrefix}ytmp3 ${v.url}`
                },
                {
                    header: "🎥 𝐕𝐈𝐃𝐄𝐎",
                    title: "" ,
                    description: `❤️꙰༻ *TÍTULO:* ${v.title}\n⁖💜꙰༻ *DURACIÓN:* ${v.timestamp}\n ⁖🧡꙰༻ *VISTAS:* ${v.views}\n ⁖💚꙰༻ *SUBIDO:* ${v.ago}\n`, 
                    id: `${usedPrefix}ytmp4 ${v.url}`
                }
            ]
        });
    }

    await conn.sendList(m.chat, `🔎 𝘽𝙪𝙨𝙦𝙪𝙚𝙙𝙖 𝙙𝙚: ${text}`, `\n${wm}`, `Seleciones Aqui`, listSections, m);
};
handler.help = ['playlist']
handler.tags = ['dl']
handler.command = /^playlist|ytbuscar|yts(earch)?$/i
handler.limit = 1
handler.level = 3

export default handler
