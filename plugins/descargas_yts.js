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
