let handler  = async (m, { conn, usedPrefix: _p }) => {
let info = `*✅ BIENVENIDO A LOS GRUPOS OFICIALES*

  1) *${nn}*
  
  2) *${nnn}*

➤ Grupo del Colaboracion LoliBot, GataBot-MD
 *${nnnt}*

➤ Grupo del colaboración LoliBot, DorratBot-MD
*${nnnt2}*

➤ Grupo del col 3 (sin limite)
*${nnntt}*

➤ Infomarte sobre las nuevas actualizaciones del bot
*${nna}*
 
➤ *¡Visita todos los enlaces oficiales en un único lugar!*
https://atom.bio/lolibot

 ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

*⇶⃤꙰𝑬𝒏𝒍𝒂𝒄𝒆 𝒍𝒐𝒍𝒊𝒃𝒐𝒕ꦿ⃟⃢*
*${nnnttt}*`.trim() 
conn.reply(m.chat, info, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, 
title: `${wm}`,
body: '', previewType: 0, thumbnail: imagen2, sourceUrl: nna}}})
//conn.fakeReply(m.chat, info, '0@s.whatsapp.net', '𝙏𝙝𝙚-𝙇𝙤𝙡𝙞𝘽𝙤𝙩-𝙈𝘿', 'status@broadcast')
}
handler.command = /^linkgc|grupos|gruposgatabot|gatabotgrupos|gruposdegatabot|groupofc|gruposgb|grupogb|groupgb$/i
export default handler
