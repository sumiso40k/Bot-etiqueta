// Importamos la librería axios para realizar solicitudes HTTP
import axios from 'axios';

// Importamos funciones y objetos necesarios de la librería @whiskeysockets/baileys
const {
  generateWAMessageContent, // Genera el contenido de un mensaje de WhatsApp
  generateWAMessageFromContent, // Genera un mensaje de WhatsApp a partir de un contenido
  proto // Proporciona los prototipos necesarios para crear mensajes interactivos
} = (await import("@whiskeysockets/baileys"))["default"];

// Definimos el handler asíncrono que manejará el comando de búsqueda en Pinterest
let handler = async (message, { conn, text, usedPrefix, command }) => {
  // Si no se proporciona un texto de búsqueda, se envía un mensaje de error al usuario
  if (!text) {
    return message.reply("_*[ ⚠️ ] Ingresa el texto de lo que quieres buscar en Pinterest*_");
  }

  // Función asíncrona para crear un mensaje de imagen a partir de una URL
  async function createImageMessage(url) {
    const { imageMessage } = await generateWAMessageContent({
      'image': { 'url': url } // Especificamos la URL de la imagen
    }, { 'upload': conn.waUploadToServer }); // Proporcionamos la función de carga de WhatsApp
    return imageMessage; // Devolvemos el mensaje de imagen generado
  }

  // Función para mezclar un array (algoritmo de Fisher-Yates)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generamos un índice aleatorio
      [array[i], array[j]] = [array[j], array[i]]; // Intercambiamos los elementos
    }
  }

  try {
    // Inicializamos un array para almacenar los mensajes de imagen
    let imageMessages = [];
    
    // Realizamos una solicitud GET a la API de Pinterest para buscar imágenes
    let { data } = await axios.get("https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D" + encodeURIComponent(text) + "&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22" + encodeURIComponent(text) + "%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559");
    
    
    /*respuesta
{
  "resource_response": {
    "data": {
      "results": [
        {
          "images": {
            "orig": {
              "url": "https://i.pinimg.com/originals/1a/2b/3c/4d5e6f7g8h9i.jpg"
            }
          }
        },
        {
          "images": {
            "orig": {
              "url": "https://i.pinimg.com/originals/2a/3b/4c/5d6e7f8g9h0i.jpg"
            }
          }
        }
        // ... otros resultados
      ]
    }
  }
}
    */
    
    
    // Verificamos si la respuesta contiene resultados válidos
    // data es la variable que llama a la API por lo tanto es ahí donde se obtienen los datos
    if (!data.resource_response || !data.resource_response.data || !data.resource_response.data.results) {
      return message.reply("_*[ ⚠️ ] No se encontraron resultados para la búsqueda*_");
    }

    // Extraemos las URLs de las imágenes de los resultados de búsqueda
    // la ruta es resource_response/data/results y dentro de results se encuentran las propiedades images con una ruta asi: images/orig/url en url se guarda la url directa de la imagen
    let imageUrls = data.resource_response.data.results.map(result => result.images.orig.url);
    
    shuffleArray(imageUrls); // Mezclamos las URLs de las imágenes
    
    let selectedImages = imageUrls.splice(0, 5); // Seleccionamos las primeras 5 imágenes
    let count = 1; // Inicializamos un contador para numerar las imágenes

    // Iteramos sobre las imágenes seleccionadas para crear mensajes interactivos
    for (let imageUrl of selectedImages) {
      imageMessages.push({
        'body': proto.Message.InteractiveMessage.Body.fromObject({
          'text': "*`Imagen`* -" + (" " + count++) // Texto del cuerpo del mensaje con el número de imagen
        }),
        'footer': proto.Message.InteractiveMessage.Footer.fromObject({
          'text': "author" // Texto del pie del mensaje
        }),
        'header': proto.Message.InteractiveMessage.Header.fromObject({
          'title': '', // Título del encabezado (vacío en este caso)
          'hasMediaAttachment': true, // Indicamos que el encabezado tiene un adjunto de medios
          'imageMessage': await createImageMessage(imageUrl) // Añadimos el mensaje de imagen creado
        }),
        'nativeFlowMessage': proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          'buttons': [{
            'name': "cta_url", // Nombre del botón
            'buttonParamsJson': `{"display_text":"Menu 🗒️", "button_text":".menu"}` // Parámetros del botón
          }]
        })
      });
    }

    // Generamos el mensaje final con el contenido interactivo
    const finalMessage = generateWAMessageFromContent(message.chat, {
      'viewOnceMessage': {
        'message': {
          'messageContextInfo': {
            'deviceListMetadata': {},
            'deviceListMetadataVersion': 2
          },
          'interactiveMessage': proto.Message.InteractiveMessage.fromObject({
            'body': proto.Message.InteractiveMessage.Body.create({
              'text': "*`Resultado de :`* " + text // Texto del cuerpo del mensaje
            }),
            'footer': proto.Message.InteractiveMessage.Footer.create({
              'text': "`𝚁𝙴𝙼-𝙲𝙷𝙰𝙼 𝙱𝚈 𝙶𝙰𝙱𝚁𝙸𝙴𝙻 - 𝙹𝚃𝚡𝚜`" // Texto del pie del mensaje
            }),
            'header': proto.Message.InteractiveMessage.Header.create({
              'hasMediaAttachment': false // Indicamos que el encabezado no tiene adjunto de medios
            }),
            'carouselMessage': proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              'cards': [...imageMessages] // Añadimos los mensajes de imagen creados como tarjetas del carrusel
            })
          })
        }
      }
    }, { 'quoted': message }); // El mensaje se cita en la respuesta

    // Enviamos el mensaje final al chat
    await conn.relayMessage(message.chat, finalMessage.message, { 'messageId': finalMessage.key.id });
    
  } catch (error) {
    // En caso de error, se registra en la consola y se envía un mensaje de error al usuario
    console.error(error);
    message.reply("_*[ ❌ ] Hubo un error al buscar las imágenes. Inténtalo de nuevo más tarde.*_");
  }
};

// Añadimos información de ayuda y etiquetas al comando
handler.help = ["pinterest"];
handler.tags = ["search"];
handler.command = ['pinterest'];

// Exportamos el handler para que pueda ser utilizado por el bot
export default handler;
