const Maalutty = require('../events');

const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');

const axios = require('axios');

const Language = require('../language');

const Lang = Language.getString('wallpaper');

Maalutty.addCommand({pattern: 'git', fromMe: false, desc: Lang.WP}, (async (message, match) => {

    var r_text = new Array ();

    

    

    r_text[0] = "https://i.imgur.com/DKvubGl.jpeg";

    

    

    var i = Math.floor(1*Math.random())

    var respoimage = await axios.get(`${r_text[i]}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer(respoimage.data), MessageType.image, {mimetype: Mimetype.png, caption: `ᴀͥᴩͭᴩᷤᴜꜱᷟᴇͤʀ 🤍

*bot making video* : https://youtu.be/jF8wF1KdyOw

*Bot number * :https://wa.me/79819726542.



*owner number * :https://wa.me/919400296608.

*owner id instagram* :https://instagram.com/mr_karippelil_boss.

*github* : https://github.com/nijin-husni/Maalutty.

*audio commands* :https://github.com/nijin-husni/uploads/tree/main/bgm.

*sticker commands* :https://github.com/nijin-husni/uploads/tree/main/stickers.

■□■□■□■□■□■□■□■□■□■□

ᴀͥᴩͭᴩᷤᴜꜱᷟᴇͤʀ 🤍

▣▣ ~ᴀͥᴩͭᴩᷤᴜꜱᷟᴇͤʀ~ ▣▣

`}) 

}));
