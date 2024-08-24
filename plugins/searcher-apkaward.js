import fetch from 'node-fetch';
import axios from 'axios';

const handler = async (m, {conn, command, text, usedPrefix}) => {
if (!text) throw `Ingresa una búsqueda`
try { 
    let { data } = await axios.get(`https://api-airi.vercel.app/apkaward?query=${encodeURIComponent(text)}`);
    
    if (!data.results) {
        return message.reply("_*[ ⚠️ ] No se encontraron resultados para la búsqueda*_");
    }
    
    const icon = data.results[0].imageUrl;
const texto1 = `⧁ 𝙏𝙄𝙏𝙐𝙇𝙊
» ${data.results[0].title}
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
⧁  𝙑𝙀𝙍𝙎𝙄𝙊𝙉
»  ${data.results[0].version}
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
⧁  𝙇𝙄𝙉𝙆
»  ${data.results[0].link}`.trim()


await conn.sendFile(m.chat, icon, 'error.jpg', texto1, m)
//await conn.sendButton(m.chat, null, texto1, yt_play[0].thumbnail, [['Descargar Audio 🔈', `.ytmp3 ${yt_play[0].url}`], ['Descargar Video 📹', `.ytmp4 ${yt_play[0].url}`]], null, null, m)



} catch (e) {

await conn.reply(m.chat, `❌ _*El comando está fallando, repórtalo al creador del bot*_`, m)


console.log(`❌ El comando #apkaward está fallando`)
console.log(e)

}}
handler.command = ['apkaward']
//handler.limit = 3
//handler.register = true 
export default handler;
