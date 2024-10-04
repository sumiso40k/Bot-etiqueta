import fetch from 'node-fetch';

let handler = m => m

handler.all = async function (m, {conn, text}) {
let chat = global.db.data.chats[m.chat]
    
if (m.mentionedJid.includes(this.user.jid) && m.isGroup && !chat.isBanned) {

let gpt = await fetch(`https://api.dorratz.com/ai/gpt4?username=user&query=${text}`)
let res = await gpt.json()
await m.reply(res.msg)

}


return !0 }
export default handler
