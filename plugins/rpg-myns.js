import { createHash } from 'crypto'
let handler = async function (m, { conn, text, usedPrefix }) {
let sn = createHash('md5').update(m.sender).digest('hex')
conn.fakeReply(m.chat, sn, '0@s.whatsapp.net', `⬇️ 𝗘𝗦𝗧𝗘 𝗘𝗦 𝗧𝗨 𝗡𝗨́𝗠𝗘𝗥𝗢 𝗗𝗘 𝗦𝗘𝗥𝗜𝗘\n𝗨𝗦𝗔𝗟𝗢 𝗣𝗔𝗥𝗔 𝗕𝗢𝗥𝗥𝗔𝗥 𝗧𝗨 𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗢 ⬇️`, 'status@broadcast')
}
handler.help = ['myns']
handler.tags = ['xp']
handler.command = ['myns']
handler.register = true
export default handler
