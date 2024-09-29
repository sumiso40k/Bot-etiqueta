import fetch from 'node-fetch';
import yts from 'yt-search';
import axios from 'axios';

const handler = async (m, {conn, command, args, text, usedPrefix}) => {
if (!text) throw `_*[ ⚠️ ] Agrega lo que quieres buscar*_`
try { 
const yt_play = await search(args.join(' '))
const texto1 = `⧁ 𝙏𝙄𝙏𝙐𝙇𝙊
» ${yt_play[0].title}
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
⧁ 𝙋𝙐𝘽𝙇𝙄𝘾𝘼𝘿𝙊
» ${yt_play[0].ago}
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
⧁ 𝗗𝗨𝗥𝗔𝗖𝗜𝗢𝗡
» ${secondString(yt_play[0].duration.seconds)}
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
⧁  𝙑𝙄𝙎𝙏𝘼𝙎
» ${MilesNumber(yt_play[0].views)}
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
⧁  𝘼𝙐𝙏𝙊𝙍
» ${yt_play[0].author.name}
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
⧁ 𝙐𝙍𝙇
» ${yt_play[0].url}`.trim()

await conn.sendButton(m.chat, null, texto1, yt_play[0].thumbnail, [['Descargar Audio 🔈', `.ytmp3 ${yt_play[0].url}`], ['Descargar Video 📹', `.ytmp4 ${yt_play[0].url}`]], null, null, m)

} catch (e) {

await conn.reply(m.chat, `❌ _*El comando #play está fallando, repórtalo al creador del bot*_`, m)


console.log(`❌ El comando #play está fallando`)
console.log(e)
}}
handler.command = ['play2']
//handler.limit = 3
//handler.register = true 
export default handler;

async function search(query, options = {}) {
const search = await yts.search({query, hl: 'es', gl: 'ES', ...options});
return search.videos;
}

function MilesNumber(number) {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1.';
    const arr = number.toString().split('.');
    arr[0] = arr[0].replace(exp, rep);
    return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
    const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
    const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
    const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
    return dDisplay + hDisplay + mDisplay + sDisplay;
}
  
