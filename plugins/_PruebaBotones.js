const handler = async function(m, { conn }) {
  const caption = `
┏┅ ━━━━━━━━━━━━ ┅ ━
┇「 𝐌𝐄𝐍𝐒𝐀𝐉𝐄 𝐃𝐄 𝐏𝐑𝐔𝐄𝐁𝐀 」
┣┅ ━━━━━━━━━━━━ ┅ ━
┃ Este es un mensaje de prueba.
┃ Por favor, selecciona una opción:
┣┅ ━━━━━━━━━━━━ ┅ ┅ ━
┗┅ ━━━━━━━━━━━━ ┅ ┅ ┅
`.trim()

  const buttons = [
    ['Botón 1', 'comando1'],
    ['Botón 2', 'comando2']
  ];

  // Verificar que buttons sea un array antes de usarlo
  if (!Array.isArray(buttons)) {
    throw new Error('El parámetro "buttons" debe ser un array.');
  }

  await conn.sendButton(m.chat, caption, null, buttons, m);
}

handler.help = ['prueba'];
handler.tags = ['test'];
handler.command = /^(prueba)$/i;
export default handler;
