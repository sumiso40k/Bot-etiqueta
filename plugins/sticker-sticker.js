import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
let banner = `contextInfo: {
  forwardingScore: 9999999,
  isForwarded: true,
  mentionedJid: [user],
  "externalAdReply": {
    showAdAttribution: true,
    renderLargerThumbnail: true,
    thumbnailUrl: "https://raw.githubusercontent.com/Rudyrex/Airi-Bot/refs/heads/main/src/img/banner1.jpg",
    title: "¡Oferta Especial!",
    body: "Haz clic aquí para más información",
    mediaType: 1, // Imagen
    sourceUrl: "https://example.com",
    mediaUrl: "https://raw.githubusercontent.com/Rudyrex/Airi-Bot/refs/heads/main/src/img/banner1.jpg"
  }
}`
let stiker = false
try {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/webp|image|video/g.test(mime)) {
if (/video/g.test(mime)) if ((q.msg || q).seconds > 8) return m.reply(`_*[ ⚠️ ] El video no debe durar mas de 7 segundos*_`)
let img = await q.download?.()

if (!img) return conn.reply(m.chat, `_*[ ❌ ] Úsalo en una imagen, gif o video*_`, banner, m)

let out
try {
stiker = await sticker(img, false, global.packname, global.author)
} catch (e) {
console.error(e)
} finally {
if (!stiker) {
if (/webp/g.test(mime)) out = await webp2png(img)
else if (/image/g.test(mime)) out = await uploadImage(img)
else if (/video/g.test(mime)) out = await uploadFile(img)
if (typeof out !== 'string') out = await uploadImage(img)
stiker = await sticker(false, out, global.packname, global.author)
}}
} else if (args[0]) {
if (isUrl(args[0])) stiker = await sticker(false, args[0], global.packname, global.author)

else return m.reply(`URL invalido`)
  
}
} catch (e) {
console.error(e)
if (!stiker) stiker = e
} finally {
if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '',m, true)

else return conn.reply(m.chat, `_*[ ❌ ] Úsalo en una imagen, gif o video*_`, m)
}}
handler.help = ['stiker (caption|reply media)', 'stiker <url>', 'stikergif (caption|reply media)', 'stikergif <url>']
handler.tags = ['sticker']
handler.command = /^s(tic?ker)?(gif)?(wm)?$/i

export default handler

const isUrl = (text) => {
return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))}
  
