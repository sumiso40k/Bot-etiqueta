let handler = async (m, { conn, text }) => {
    // Obtener la URL desde el mensaje enviado con el comando
    let apkUrl = text.trim();
    
    // Verificar si la URL es válida
    if (!apkUrl || !apkUrl.startsWith('https://')) {
        return m.reply('Por favor, envía una URL válida.');
    }

    // Obtener el nombre del archivo a partir de la URL
    let fileName = apkUrl.split('/').pop();

    // Enviar el archivo APK
    await conn.sendMessage(m.chat, { 
        document: { 
            url: apkUrl 
        }, 
        mimetype: 'application/vnd.android.package-archive', 
        fileName: fileName, 
        caption: null 
    }, { 
        quoted: m 
    });
}

handler.command = /^(dlapkaward)$/i;
export default handler;
