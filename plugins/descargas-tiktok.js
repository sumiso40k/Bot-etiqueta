import fg from 'api-dylux' 
import axios from 'axios'
import cheerio from 'cheerio'
import { tiktok } from "@xct007/frieren-scraper";
//let generateWAMessageFromContent = (await import(global.baileys)).default
import { tiktokdl } from '@bochilteam/scraper'
let handler = async (m, { conn, text, args, usedPrefix, command}) => {


if (!text) return conn.reply(m.chat, `_*[ ⚠️ ] Agrega el enlace de un video de TikTok*_\n\n> Ejemplo:\n_.tiktok https://vm.tiktok.com_`, m)

if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(text)) return conn.reply(m.chat, `_*[ ⚠️ ] El enlace es incorrecto*_`,  m)  
await conn.reply(m.chat, `_*[ ⏳ ] Descargando el video...*_`,  m) 

try {
    const dataF = await tiktok.v1(args[0])
    conn.sendFile(m.chat, dataF.play, 'tiktok.mp4', `_*☑️ Video de TikTok*_`, m) 
} catch (e1) {
    m.reply('reintentando 1/3');
try {
    const tTiktok = await tiktokdlF(args[0])
    conn.sendFile(m.chat, tTiktok.video, 'tiktok.mp4', `_*☑️ Video de TikTok*_`, m) 
} catch (e2) {
    m.reply('reintentando 2/3');
try {
    let p = await fg.tiktok(args[0]) 
    conn.sendFile(m.chat, p.nowm, 'tiktok.mp4', `_*☑️ Video de TikTok*_`, m)
} catch (e3) {
    m.reply('reintentando 3/3');
try { 
    const { author: { nickname }, video, description } = await tiktokdl(args[0])
    const url = video.no_watermark2 || video.no_watermark || 'https://tikcdn.net' + video.no_watermark_raw || video.no_watermark_hd
    conn.sendFile(m.chat, url, 'tiktok.mp4', `_*☑️ Video de TikTok*_`, m)
} catch {
    await conn.reply(m.chat, `_*[ ❌ ] Ocurrió un error al descargar el video, prueba con otro enlace o inténtalo más tarde*_`, m)
}}}}}


handler.help = ['tiktok']
handler.tags = ['dl']
handler.command = ['tiktok']
//handler.limit = 1

export default handler
const delay = time => new Promise(res => setTimeout(res, time))

async function tiktokdlF(url) {
if (!/tiktok/.test(url)) return 'Enlace incorrecto';
const gettoken = await axios.get("https://tikdown.org/id");
const $ = cheerio.load(gettoken.data);
const token = $("#download-form > input[type=hidden]:nth-child(2)").attr( "value" );
const param = { url: url, _token: token };
const { data } = await axios.request("https://tikdown.org/getAjax?", { method: "post", data: new URLSearchParams(Object.entries(param)), headers: { "content-type": "application/x-www-form-urlencoded; charset=UTF-8", "user-agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36" }, });
var getdata = cheerio.load(data.html);
if (data.status) {
return { status: true, thumbnail: getdata("img").attr("src"), video: getdata("div.download-links > div:nth-child(1) > a").attr("href"), audio: getdata("div.download-links > div:nth-child(2) > a").attr("href"), }} else
return { status: false }}
    
