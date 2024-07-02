import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix }) => {
    let user = global.db.data.users[m.sender]
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

    let { name, money, registered, age } = global.db.data.users[who] || {}
    let username = conn.getName(who)
    let prem = global.prems.includes(who.split`@`[0])

    let str = `
╭━〔 👤 *PERFIL* 〕━⬣
┃ 𝙉𝙊𝙈𝘽𝙍𝙀 *:* ${username} ${user.registered ? '✓' : ''}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝙉𝙐𝙈𝙀𝙍𝙊 *:* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝙀𝙉𝙇𝘼𝘾𝙀 *:* wa.me/${who.split`@`[0]}${registered ? '\n┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n┃ 𝙀𝘿𝘼𝘿 ' + age + ' *años*' : ''}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝙈𝙊𝙉𝙀𝘿𝘼𝙎 *:* ${money}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝙍𝙀𝙂𝙄𝙎𝙏𝙍𝘼𝘿𝙊(𝘼) *:* ${registered ? '✅' : '❎'}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝙋𝙍𝙀𝙈𝙄𝙐𝙈 *:* ${prem ? '✅' : '❎'}
╰━━━━〔 ${wm} 〕━━━⬣
`.trim()

    conn.sendMessage(m.chat, { text: str, buttons: [
        { buttonId: '#minarcoins', buttonText: { displayText: 'Minar Monedas' }, type: 1 },
        { buttonId: '#menu', buttonText: { displayText: 'Menú' }, type: 1 }
    ] }, { quoted: m })
}

handler.help = ['profile [@user]']
handler.tags = ['xp']
handler.command = /^perfil|profile?$/i
export default handler
