import { createHash } from 'crypto';

const Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;

const handler = async function(m, { conn, text, usedPrefix, command }) {
  const user = global.db.data.users[m.sender];
  
  if (user.registered === true) {
    throw '[❗𝐈𝐍𝐅𝐎❗] Ya estás registrado\n\n¿Quieres volver a registrarte?\n\nUsa este comando para borrar tu registro\n*' + usedPrefix + 'unreg* <Número de serie>';
  }
  
  if (!Reg.test(text)) {
    throw '[❗𝐈𝐍𝐅𝐎❗] Formato incorrecto\n\nUso del comando: ' + usedPrefix + command + ' nombre.edad\nEjemplo: ' + usedPrefix + command + ' Airi.20';
  }
  
  let [_, name, splitter, age] = text.match(Reg);
  
  if (!name) throw '[❗𝐈𝐍𝐅𝐎❗] Debes poner un nombre';
  if (!age) throw '[❗𝐈𝐍𝐅𝐎❗] Debes poner una edad';
  if (name.length >= 30) throw '[❗𝐈𝐍𝐅𝐎❗] El nombre es demasiado largo';
  
  age = parseInt(age);
  
  if (age > 100) throw '[❗] ¿Cómo sigues vivo con esa edad? 👴🏻';
  if (age < 5) throw '[❗] ¿Un bebé que sabe usar WhatsApp? 😲';
  
  user.name = name.trim();
  user.age = age;
  user.regTime = +new Date;
  user.registered = true;
  
  const sn = createHash('md5').update(m.sender).digest('hex');
  
  const caption = `
┏┅ ━━━━━━━━━━━━ ┅ ━
┇「 INFORMACION 」
┣┅ ━━━━━━━━━━━━ ┅ ┅ ━
┃ *Nombre:* ${name}
┃ *Edad:* ${age} años
┃ *Número de serie:* ${sn}
┣┅ ━━━━━━━━━━━━ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅
┃ ¡Tu número de serie te servirá por si deseas borrar tu registro en el bot!
┗┅ ━━━━━━━━━━━━ ┅ ┅ ┅
`.trim();

  await conn.sendButton(m.chat, caption, null, null, [
    {buttonId: '.perfil', buttonText: {displayText: 'Perfil'}, type: 1},
    {buttonId: '.menu', buttonText: {displayText: 'Menú'}, type: 1}
  ], { quoted: m });
  
  global.db.data.users[m.sender].money += 10000;
  global.db.data.users[m.sender].exp += 10000;
}

handler.help = ['verificar'];
handler.tags = ['xp'];
handler.command = /^(verify|register|verificar|reg|registrar)$/i;

export default handler;
