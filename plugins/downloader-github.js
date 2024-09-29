import fetch from 'node-fetch'
const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let handler = async (m, { args, usedPrefix, command }) => {

    if (!args[0]) return conn.reply(m.chat, `_*[ ⚠️ ] Ingresa el enlace del repositorio de GitHub que quieras clonar*_\n\n_Ejemplo:_\n.gitclone https://github.com/Rudyrex/Airi-Bot`, m)    
    if (!regex.test(args[0])) return conn.reply(m.chat, `_*[ ❗ ] Ese enlace no es de GitHub*_`, m)

    try {   
        let [_, user, repo] = args[0].match(regex) || []
        repo = repo.replace(/.git$/, '')
        let url = `https://api.github.com/repos/${user}/${repo}/zipball`
        let filename = (await fetch(url, { method: 'HEAD' })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
        conn.reply(m.chat, `_*[ ⏳ ] Clonando repositorio, espera un momento*_`, m)
        conn.sendFile(m.chat, url, filename, null, m)
    } catch { 
        m.reply('_*[ ❌ ] No fue posible clonar el repositorio*_')
    }
}

handler.help = ['gitclone <url>']
handler.tags = ['downloader']
handler.command = /gitclone|clonarepo|clonarrepo|repoclonar/i

export default handler;
