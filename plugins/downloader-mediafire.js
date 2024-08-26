

import axios from 'axios';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `_*[ ⚠️ ] Agrega un enlace de mediafire*_`;
  try {
    let res = await mediafireDl(args[0]);
    let { name, size, date, mime, link } = res;
    let caption = `
> ┃ 𝗠𝗘𝗗𝗜𝗔𝗙𝗜𝗥𝗘  
> ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
> ┃ 💫 *Nombre*
> ┃ ${name}
> ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
> ┃ 💪 *Tamaño*
> ┃ ${size}
> ┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
> ┃ 🚀 *Tipo*
> ┃ ${mime}`.trim();
    conn.reply(m.chat, caption, m);
    await conn.sendFile(m.chat, link, name, '', m, null, { mimetype: mime, asDocument: true });
  } catch (e) {
    await conn.reply(m.chat, `_*[ ❌ ] Ocurrió un error al descargar el archivo*_`, m);
    console.log(e);
  }
  handler.limit = false;
};

handler.help = ['mediafire'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = ['mediafire2'];

export default handler;

async function mediafireDl(url) {
  const res = await axios.get(`https://www-mediafire-com.translate.goog/${url.replace('https://www.mediafire.com/', '')}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`);
  const root = parse(res.data);

  const link = root.querySelector('#downloadButton').getAttribute('href');
  const name = root.querySelector('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').getAttribute('title').replaceAll(' ', '').replaceAll('\n', '');
  const date = root.querySelector('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text;
  const size = root.querySelector('#downloadButton').text.replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('                         ', '').replaceAll(' ', '');

  let mime = '';
  let rese = await axios.head(link);
  mime = rese.headers['content-type'];

  return { name, size, date, mime, link };
}





/*
import axios from 'axios';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import {mediafiredl} from '@bochilteam/scraper';

const handler = async (m, {conn, args, usedPrefix, command}) => {

if (!args[0]) return conn.reply(m.chat, `_*[ ⚠️ ] Ingresa un enlace de mediafire*_`, m)   

try {
    const resEX = await mediafiredl(args[0]);
    let caption = `┏━━『 𝐌𝐄𝐃𝐈𝐀𝐅𝐈𝐑𝐄 』━━•\n┃❥ 𝐍𝐨𝐦𝐛𝐫𝐞 :\n┃${resEX.filename}\n┃——————«•»——————\n┃❥ 𝐏𝐞𝐬𝐨 :\n┃${resEX.filesizeH}\n┃——————«•»——————\n┃❥ 𝐓𝐢𝐩𝐨 :\n┃${resEX.ext}\n╰━━━⊰ 𓃠 ${vs} ⊱━━━━•\n\n> ⏳ ᴱˢᵖᵉʳᵉ ᵘⁿ ᵐᵒᵐᵉⁿᵗᵒ ᵉⁿ ˡᵒˢ ᵠᵘᵉ ᵉⁿᵛᶦᵒˢ ˢᵘˢ ᵃʳᶜʰᶦᵛᵒˢ`.trim()
    conn.reply(m.chat, caption, m)
    await conn.sendFile(m.chat, resEX.url, resEX.filename, '', m, null, {mimetype: resEX.ext, asDocument: true});
    
} catch {
try {
    const res = await mediafireDl(args[0]);
    const {name, size, date, mime, link} = res;
    await conn.reply(m.chat, `┏━━『 𝐌𝐄𝐃𝐈𝐀𝐅𝐈𝐑𝐄 』━━•\n┃❥ 𝐍𝐨𝐦𝐛𝐫𝐞 :\n┃${name}\n┃——————«•»——————\n┃❥ 𝐏𝐞𝐬𝐨 :\n┃ ${size}\n┃——————«•»——————\n┃❥ 𝐓𝐢𝐩𝐨 :\n┃${mime}\n╰━━━⊰ 𓃠 ${vs} ⊱━━━━•\n\n> ⏳ ᴱˢᵖᵉʳᵉ ᵘⁿ ᵐᵒᵐᵉⁿᵗᵒ ᵉⁿ ˡᵒˢ ᵠᵘᵉ ᵉⁿᵛᶦᵒˢ ˢᵘˢ ᵃʳᶜʰᶦᵛᵒˢ`, m)
    await conn.sendFile(m.chat, link, name, '', m, null, {mimetype: mime, asDocument: true});
    
} catch (e) {
    m.reply('_*[ ❌ ] No se pudo descargar el archivo*_')
    console.log(e) 
    
}}}
handler.command = /^(mediafire|mediafiredl|dlmediafire)$/i

//handler.limit = 3
export default handler;

async function mediafireDl(url) {
  const res = await axios.get(`https://www-mediafire-com.translate.goog/${url.replace('https://www.mediafire.com/', '')}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`);
  const $ = cheerio.load(res.data);
  const link = $('#downloadButton').attr('href');
  const name = $('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').attr('title').replaceAll(' ', '').replaceAll('\n', '');
  const date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text();
  const size = $('#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '').replaceAll(' ', '');
  let mime = '';
  const rese = await axios.head(link);
  mime = rese.headers['content-type'];
  return {name, size, date, mime, link};
}
*/
