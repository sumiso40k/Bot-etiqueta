import fetch from 'node-fetch';
import axios from 'axios';


const handler = async (m, {conn, text, usedPrefix, command}) => {

if (!text) return conn.reply(m.chat, `_*[ ⚠️ ] Escribe lo que quieras a ChatGPT*_\n\n> Ejemplo:\n_.${command} Recomienda un top 10 de películas de acción_`, m)

try {
let gpt = await fetch(`https://delirius-api-oficial.vercel.app/api/chatgpt?q=${text}`)
let res = await gpt.json()
await m.reply(res.data)
} catch {
try {
let gpt = await fetch(`https://delirius-api-oficial.vercel.app/api/ia2?text=${text}`)
let res = await gpt.json()
await m.reply(res.gpt)
} catch {
}}};
handler.command = ['ia']
export default handler;
