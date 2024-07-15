let handler = async (m, { conn }) => {
    m.reply(`
𝗠𝗘𝗡𝗨 𝗗𝗘 𝗖𝗢𝗠𝗔𝗡𝗗𝗢𝗦


> 👤 *PERFIL* 👤


▢ \`.perfil\`
ⓘ _Muestra tu perfil_

▢ \`.reg\`
ⓘ _Te registra en el bot_

▢ \`.myns\`
ⓘ _Muestra tu número de serie_

▢ \`.unreg\`
ⓘ _Borra tu registro_


> 🔍 *BUSCADORES* 🔍

▢ \`.ytsearch\`
ⓘ _Busca videos en Youtube_

▢ \`.play\`
ⓘ _Busca algo específico en Youtube, te da información y opción de descargar_
${readMore}

> 📥 *DESCARGAS* 📥

▢ \`.ytmp3\`
ⓘ _Descarga audio de Youtube_

▢ \`.ytmp4\`
ⓘ _Descarga video de Youtube_


_Nota: Algunos comandos necesitan parámetros adicionales._

_Para obtener más información del uso correcto de los comandos, envía el comando que quieras y recibiras información de como usarlo correctamente_
    `);
}

handler.command = ['menu', 'help']
handler.register = false

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
