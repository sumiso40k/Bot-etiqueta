import fetch from 'node-fetch';

let handler = m => m

handler.all = async function (m, {conn}) {
    let chat = global.db.data.chats[m.chat]

    if (m.mentionedJid.includes(this.user.jid) && m.isGroup && !chat.isBanned) {

        // Obtener el texto directamente de m.text
        let text = m.text || '';

        // Eliminar la mención del texto
        let cleanText = text.replace(/@\d+/g, '').trim();

        if (cleanText) {
            let gpt = await fetch(`https://api.dorratz.com/ai/gpt4?username=user&query=${encodeURIComponent(cleanText)}`)
            let res = await gpt.json()
            await m.reply(res.msg)
        } else {
            await m.reply('No se ha detectado texto después de la mención.')
        }
    }

    return !0 
}
export default handler
