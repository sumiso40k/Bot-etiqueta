import { createHash } from 'crypto'


let handler = async function (m, { args }) {
if (!args[0]) throw `_*[ ⚠️ ] Ingresa tu número de serie, si no sabes cuál es usa el comando*_ _.myns_`
let user = global.db.data.users[m.sender]
let sn = createHash('md5').update(m.sender).digest('hex')
if (args[0] !== sn) throw `_*[ ⚠️ ] Número de serie incorrecto, si no sabes cual es usa el comando*_ _.myns_`

user.registered = false
m.reply(`_*[ ✅ ] Registro eliminado correctamente*_`)
}
handler.help = ['', 'ister'].map(v => 'unreg' + v + ' <numero de serie>')
handler.tags = ['xp']
handler.command = /^unreg(ister)?$/i
handler.register = true
export default handler
