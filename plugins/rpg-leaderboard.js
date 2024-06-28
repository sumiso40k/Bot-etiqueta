import fetch from 'node-fetch'
import fs from 'fs'
let handler = async (m, { conn, args, participants, usedPrefix }) => {
let users = Object.entries(global.db.data.users).map(([key, value]) => { 
return {...value, jid: key}
  })
let sortedExp = users.map(toNumber('exp')).sort(sort('exp'))
let sortedLim = users.map(toNumber('limit')).sort(sort('limit'))
let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
let sortedRole = users.map(toNumber('role')).sort(sort('role'))
let sortedMoney = users.map(toNumber('money')).sort(sort('money'))
let sortedJoincount = users.map(toNumber('joincount')).sort(sort('joincount'))
let sortedPremium = users.map(toNumber('premium')).sort(sort('premium'))
let usersExp = sortedExp.map(enumGetKey)
let usersLim = sortedLim.map(enumGetKey)
let usersLevel = sortedLevel.map(enumGetKey)
let usersRole = sortedRole.map(enumGetKey)
let usersMoney = sortedMoney.map(enumGetKey)
let usersJoincount = sortedJoincount.map(enumGetKey)
let usersPremium = sortedPremium.map(enumGetKey)
           
console.log(participants)
let len = args[0] && args[0].length > 0 ? Math.min(100, Math.max(parseInt(args[0]), 10)) : Math.min(10, sortedExp.length)
let text = `\`🏆 𝚃𝙰𝙱𝙻𝙰 𝙳𝙴 𝙲𝙻𝙰𝚂𝙸𝙲𝙰𝙲𝙸𝙾𝙽\`
    
💠 *𝐓𝐎𝐏 ${len} 𝐗𝐏 🎯* 
𝐓𝐮: *${usersExp.indexOf(m.sender) + 1}* 𝐝𝐞 *${usersExp.length} 𝐮𝐬𝐮𝐚𝐫𝐢𝐨𝐬*

${sortedExp.slice(0, len).map(({ jid, exp }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *${exp} ⚡*`).join`\n`}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

💠 *𝐓𝐎𝐏 ${len} 𝐃𝐈𝐀𝐌𝐀𝐍𝐓𝐄 💎* 
𝐓𝐮 : *${usersLim.indexOf(m.sender) + 1}* 𝐝𝐞́ *${usersLim.length} 𝐮𝐬𝐮𝐚𝐫𝐢𝐨𝐬*

${sortedLim.slice(0, len).map(({ jid, limit }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *${limit} 💎*`).join`\n`}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

💠 *𝐓𝐎𝐏 ${len} 𝐍𝐈𝐕𝐄𝐋 💪* 
𝐓𝐮 : *${usersLevel.indexOf(m.sender) + 1}* 𝐝𝐞 *${usersLevel.length} 𝐮𝐬𝐮𝐚𝐫𝐢𝐨𝐬*

${sortedLevel.slice(0, len).map(({ jid, level }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *${level} 🔅*`).join`\n`}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

💠 *𝐓𝐎𝐏 ${len} 𝐑𝐎𝐋 🌟* 
𝐓𝐮 : *${usersLevel.indexOf(m.sender) + 1}* 𝐝𝐞 *${usersLevel.length} 𝐮𝐬𝐮𝐚𝐫𝐢𝐨𝐬*

${sortedLevel.slice(0, len).map(({ jid, role, level }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} ${role}`).join`\n`}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

💠 *𝐓𝐎𝐏 ${len} 𝐔𝐒𝐔𝐀𝐑𝐈𝐎𝐒 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 🎟️* 
𝐓𝐮 : *${usersLevel.indexOf(m.sender) + 1}* 𝐝𝐞 *${usersLevel.length} 𝐮𝐬𝐮𝐚𝐫𝐢𝐨𝐬*

${sortedLim.slice(0, len).map(({ jid, premium, level }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *${premium ? `✅` : `❌`} 🎟️*`).join`\n`}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

💠 *𝐓𝐎𝐏 ${len} 𝐓𝐎𝐊𝐄𝐍𝐒 🧿* 
𝐓𝐮 : *${usersJoincount.indexOf(m.sender) + 1}* 𝐝𝐞 *${usersJoincount.length} 𝐮𝐬𝐮𝐚𝐫𝐢𝐨𝐬*

${sortedJoincount.slice(0, len).map(({ jid, joincount }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *${joincount} 🧿*`).join`\n`}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

💠 *𝐓𝐎𝐏 ${len} 𝐋𝐎𝐋𝐈𝐂𝐎𝐈𝐍𝐒 🪙*
𝐓𝐮 : *${usersMoney.indexOf(m.sender) + 1}* 𝐝𝐞 *${usersMoney.length} 𝐮𝐬𝐮𝐚𝐫𝐢𝐨𝐬*

${sortedMoney.slice(0, len).map(({ jid, money }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *${money} 🪙*`).join`\n`}
`.trim()
await m.reply(text, null, { mentions: conn.parseMention(text) })}
handler.help = ['top']
handler.tags = ['xp']
handler.command = ['leaderboard', 'lb', 'top'] 
handler.register = true
handler.fail = null
handler.exp = 0

export default handler

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return {...b[i], [property]: a[property] === undefined ? _default : a[property]}
  }
  else return a => a === undefined ? _default : a
}

function enumGetKey(a) {
  return a.jid
}
