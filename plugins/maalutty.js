const Maalutty = require("../Utilis/events");
const { forwardOrBroadCast } = require("../Utilis/groupmute");
const { getBuffer } = require('../Utilis/download');
const { parseJid } = require("../Utilis/vote");
// HUSNI SER
const url = 'https://i.ibb.co/C7ZVWh7/Screenshot-2021-10-25-21-10-01-2.png'
Maalutty.addCommand(
  { pattern: 'maalutty?(.*)', fromMe: true, desc: "Forward replied msg." },
  async (message, match) => {
    if (match == "") return await message.sendMessage("*Give me a jid*\nExample .maalutty jid1 jid2 jid3 jid4 ...");
    if (!message.reply_message)
      return await message.sendMessage("*Reply to a Message*");
    const buff = await getBuffer(url)
    let options = {}
    options.ptt = true 
    options.quoted = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        
      },
      message: {
        "orderMessage": {
        	"itemCount" : 0000,
             "status": 1,
           "surface" : 1,
           "message": "❤️ᴍᷝᴀⷮᴀᷤɩᴜᴛⷨᴛⷷy💙",
           "orderTitle": "",
           "thumbnail": buff.buffer,
           "sellerJid": '0@s.whatsapp.net' 
        }
      }
    }
      options.contextInfo = {
           forwardingScore: 999,
           isForwarded: true 
        } 
    options.duration = 999999, 
    match.match(parseJid).map((jid) => {
      forwardOrBroadCast(jid, message, options);
    });
  }
);
