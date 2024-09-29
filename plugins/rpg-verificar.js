import { createHash } from 'crypto'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {

  let user = db.data.users[m.sender]
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
  let name2 = conn.getName(m.sender)
  if (user.registered === true) throw `_*[ ⚠️ ] Ya estas registrad@, si quieres borrar tu registro actual usa:*_ _.unreg_`
  if (!Reg.test(text)) throw `_*[ ⚠️ ] Agrega tu nombre y edad*_\n\n> Ejemplo:\n_.${command} Airi.20_`
  
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw '_*[ ⚠️ ] Falta tu nombre*_'
  if (!age) throw '_*[ ⚠️ ] Falta tu edad*_'
  if (name.length >= 30) throw '_*[ ⚠️ ] El nombre es muy largo*_' 
  age = parseInt(age)
  if (age > 100) throw '_*[ ⚠️ ] Estas muy ancian@*_'
  if (age < 5) throw '_*[ ⚠️ ] Los bebés no usan WhatsApp*_'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true

  let sn = createHash('md5').update(m.sender).digest('hex')
  await conn.reply(m.chat,  `⧼⧼⧼ *𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀𝐃𝐎* ⧽⧽⧽

• *𝐍𝐨𝐦𝐛𝐫𝐞:* ${name}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
• *𝐄𝐝𝐚𝐝:* ${age} 𝐚𝐧̃𝐨𝐬`)
await m.reply(`${sn}`)
    
}

handler.help = ['daftar', 'register'].map(v => v + ' <nama>.<umur>')
handler.tags = ['xp']
handler.command = /^(verify|verificar|registrar|reg(ister)?)$/i
export default handler
  
