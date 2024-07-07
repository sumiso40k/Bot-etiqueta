import { createHash } from 'crypto'

const Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
const handler = async function(m, { conn, text, usedPrefix, command }) {
  const user = global.db.data.users[m.sender]
  
  if (user.registered === true) {
    throw '[❗𝐈𝐍𝐅𝐎❗] 𝚈𝙰 𝙴𝚂𝚃𝙰𝚂 𝚁𝙴𝙶𝙸𝚂𝚃𝚁𝙰𝙳𝙾\n\n𝚀𝚞𝚒𝚎𝚛𝚎𝚜 𝚟𝚘𝚕𝚟𝚎𝚛 𝚊 𝚛𝚎𝚐𝚒𝚜𝚝𝚛𝚊𝚛𝚝𝚎?\n\n 📌𝚄𝚜𝚊 𝚎𝚜𝚝𝚎 𝚌𝚘𝚖𝚊𝚗𝚍𝚘 𝚙𝚊𝚛𝚊 𝚋𝚘𝚛𝚛𝚊𝚛 𝚝𝚞 𝚛𝚎𝚐𝚒𝚜𝚝𝚛𝚘\n*' + usedPrefix + 'unreg* <Número de serie>'
  }
  
  if (!Reg.test(text)) {
    throw '*[❗𝐈𝐍𝐅𝐎❗] 𝙵𝙾𝚁𝙼𝙰𝚃𝙾 𝙸𝙽𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙾*\n\n*—◉ 𝚄𝚂𝙾 𝙳𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾: ' + usedPrefix + command + ' nombre.edad*\n*—◉ Ejemplo: ' + usedPrefix + command + ' Airi.20*'
  }
  
  let [_, name, splitter, age] = text.match(Reg)
  
  if (!name) throw '*[❗𝐈𝐍𝐅𝐎❗] 𝙳𝙴𝙱𝙴𝚂 𝙿𝙾𝙽𝙴𝚁 𝚄𝙽 𝙽𝙾𝙼𝙱𝚁𝙴*'
  if (!age) throw '[❗𝐈𝐍𝐅𝐎❗] 𝙳𝙴𝙱𝙴𝚂 𝙿𝙾𝙽𝙴𝚁 𝚄𝙽𝙰 𝙴𝙳𝙰𝙳*'
  if (name.length >= 30) throw '[❗𝐈𝐍𝐅𝐎❗] 𝙴𝙻 𝙽𝙾𝙼𝙱𝚁𝙴 𝙴𝚂 𝙳𝙴𝙼𝙰𝚂𝙸𝙰𝙳𝙾 𝙻𝙰𝚁𝙶𝙾'
  
  age = parseInt(age)
  
  if (age > 100) throw '*[❗] Como sigues vivo con esa edad? 👴🏻*'
  if (age < 5) throw '*[❗] Un bebé que sabe usar WhatsApp? 😲*'
  
  user.name = name.trim()
  user.age = age
  user.regTime = +new Date
  user.registered = true
  
  const sn = createHash('md5').update(m.sender).digest('hex')
  
  const caption = `
┏┅ ━━━━━━━━━━━━ ┅ ━
┇「 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐈𝐎𝐍 」
┣┅ ━━━━━━━━━━━━ ┅ ━
┃ *𝙽𝙾𝙼𝙱𝚁𝙴:* ${name}
┃ *𝙴𝙳𝙰𝙳:* ${age} años
┃ *𝙽𝚄𝙼𝙴𝚁𝙾 𝙳𝙴 𝚂𝙴𝚁𝙸𝙴:* ${sn}
┣┅ ━━━━━━━━━━━━ ┅ ┅ ━
┃ ¡𝚃𝚄 𝙽𝚄𝙼𝙴𝚁𝙾 𝙳𝙴 𝚂𝙴𝚁𝙸𝙴 𝚃𝙴 𝚂𝙴𝚁𝚅𝙸𝚁𝙰 
┃ 𝙿𝙾𝚁 𝚂𝙸 𝙳𝙴𝚂𝙴𝙰𝚂 𝙱𝙾𝚁𝚁𝙰𝚁 
┃ 𝚃𝚄 𝚁𝙴𝙶𝙸𝚂𝚃𝚁𝙾 𝙴𝙽 𝙴𝙻 𝙱𝙾𝚃!
┗┅ ━━━━━━━━━━━━ ┅ ┅ ┅
`.trim()

  await conn.sendButton(m.chat, caption, '', '', [
    ['Perfil', '#perfil'],
    ['Menú', '#menu']
  ], m)
  
  global.db.data.users[m.sender].money += 10000
  global.db.data.users[m.sender].exp += 10000
}

handler.help = ['verificar']
handler.tags = ['xp']
handler.command = /^(verify|register|verificar|reg|registrar)$/i
export default handler
