const handler = async function(m, { conn }) {
  // Mensaje de prueba
  const caption = `
┏┅ ━━━━━━━━━━━━ ┅ ━
┇「 𝐌𝐄𝐍𝐒𝐀𝐉𝐄 𝐃𝐄 𝐏𝐑𝐔𝐄𝐁𝐀 」
┣┅ ━━━━━━━━━━━━ ┅ ━
┃ Este es un mensaje de prueba.
┃ Por favor, selecciona una opción:
┣┅ ━━━━━━━━━━━━ ┅ ┅ ━
┗┅ ━━━━━━━━━━━━ ┅ ┅ ┅
`.trim()

  // Envío del mensaje con botones
  await conn.sendButton(m.chat, caption, null, [
    ['Botón 1', '.menu'],
    ['Botón 2', '.perfil']
  ], m)
}

handler.help = ['prueba']
handler.tags = ['test']
handler.command = /^(prueba)$/i
export default handler
