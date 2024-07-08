import { createHash } from 'crypto';

const handler = async function(m, { conn }) {
  const caption = `
┏┅ ━━━━━━━━━━━━ ┅ ━
┇「 𝐌𝐄𝐍𝐒𝐀𝐉𝐄 𝐃𝐄 𝐏𝐑𝐔𝐄𝐁𝐀 」
┣┅ ━━━━━━━━━━━━ ┅ ━
┃ Este es un mensaje de prueba.
┃ Por favor, selecciona una opción:
┣┅ ━━━━━━━━━━━━ ┅ ┅ ━
┗┅ ━━━━━━━━━━━━ ┅ ┅ ┅
`.trim();

  const buttons = [
    ['Botón 1', '#comando1'],
    ['Botón 2', '#comando2']
  ];

  try {
    await conn.sendButton(m.chat, caption, null, buttons, null, null, true); // Ajusta los parámetros según sea necesario
  } catch (error) {
    console.error('Error al enviar el botón:', error);
  }
};

handler.help = ['prueba'];
handler.tags = ['test'];
handler.command = /^(prueba)$/i;
export default handler;
