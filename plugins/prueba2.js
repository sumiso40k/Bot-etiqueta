import _0x22035f from 'axios';
const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} = (await import("@whiskeysockets/baileys"))["default"];
let handler = async (_0x56dba6, {
  conn: _0x1ff905,
  text: _0x14f0b8,
  usedPrefix: _0xe68d3d,
  command: _0x553707
}) => {
  if (!_0x14f0b8) {
    return _0x56dba6.reply("*`Ingresa el texto de lo que quieres buscar en pinterest🙃`*");
  }
  async function _0x5e7c40(_0x4dca5d) {
    const {
      imageMessage: _0x3c9205
    } = await generateWAMessageContent({
      'image': {
        'url': _0x4dca5d
      }
    }, {
      'upload': _0x1ff905.waUploadToServer
    });
    return _0x3c9205;
  }
  function _0x2338d5(_0x324abe) {
    for (let _0x164454 = _0x324abe.length - 1; _0x164454 > 0; _0x164454--) {
      const _0x3d870a = Math.floor(Math.random() * (_0x164454 + 1));
      [_0x324abe[_0x164454], _0x324abe[_0x3d870a]] = [_0x324abe[_0x3d870a], _0x324abe[_0x164454]];
    }
  }
  let _0x1d07ad = [];
  let {
    data: _0x4cb469
  } = await _0x22035f.get("https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D" + _0x14f0b8 + "&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22" + _0x14f0b8 + "%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559");
  let _0xb9319c = _0x4cb469.resource_response.data.results.map(_0x1f5d19 => _0x1f5d19.images.orig.url);
  _0x2338d5(_0xb9319c);
  let _0x3a712c = _0xb9319c.splice(0, 5);
  let _0x614e1b = 1;
  for (let _0x35a49b of _0x3a712c) {
    _0x1d07ad.push({
      'body': proto.Message.InteractiveMessage.Body.fromObject({
        'text': "*`Imagen`* -" + (" " + _0x614e1b++)
      }),
      'footer': proto.Message.InteractiveMessage.Footer.fromObject({
        'text': author
      }),
      'header': proto.Message.InteractiveMessage.Header.fromObject({
        'title': '',
        'hasMediaAttachment': true,
        'imageMessage': await _0x5e7c40(_0x35a49b)
      }),
      'nativeFlowMessage': proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        'buttons': [{
          'name': "cta_url",
          'buttonParamsJson': "{\"display_text\":\"url 🔍\",\"url\":\"https://www.pinterest.com/search/pins/?rs=typed&q=" + _0x14f0b8 + "\",\"merchant_url\":\"https://www.pinterest.com/search/pins/?rs=typed&q=" + _0x14f0b8 + "\"}"
        }]
      })
    });
  }
  const _0x56e9e1 = generateWAMessageFromContent(_0x56dba6.chat, {
    'viewOnceMessage': {
      'message': {
        'messageContextInfo': {
          'deviceListMetadata': {},
          'deviceListMetadataVersion': 0x2
        },
        'interactiveMessage': proto.Message.InteractiveMessage.fromObject({
          'body': proto.Message.InteractiveMessage.Body.create({
            'text': "*`Resultado de :`* " + _0x14f0b8
          }),
          'footer': proto.Message.InteractiveMessage.Footer.create({
            'text': "`𝚁𝙴𝙼-𝙲𝙷𝙰𝙼 𝙱𝚈 𝙶𝙰𝙱𝚁𝙸𝙴𝙻 - 𝙹𝚃𝚡𝚜`"
          }),
          'header': proto.Message.InteractiveMessage.Header.create({
            'hasMediaAttachment': false
          }),
          'carouselMessage': proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            'cards': [..._0x1d07ad]
          })
        })
      }
    }
  }, {
    'quoted': _0x56dba6
  });
  await _0x1ff905.relayMessage(_0x56dba6.chat, _0x56e9e1.message, {
    'messageId': _0x56e9e1.key.id
  });
};
handler.help = ["pinterest"];
handler.tags = ["search"];
handler.command = /^(pinterest)$/i;
export default handler;
