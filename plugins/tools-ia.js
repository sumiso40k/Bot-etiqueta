import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, 'Escribe un texto para hablar con chatgpt', m);

try {
//let msg = await conn.sendMessage(m.chat, {text: '*chatgpt esta escribiendo.....*'});

let userid = conn.getName(m.sender) || 'default';
let apiurl = `https://api.guruapi.tech/ai/gpt4?username=${userid}&query=hii${encodeURIComponent(text)}`;
let result = await fetch(apiurl);
let response = await result.json();
  let mesg = response.msg;

await conn.reply(m.chat, mesg, m);
} catch {}}

handler.command = handler.help = ["chatgpt"];

export default handler
