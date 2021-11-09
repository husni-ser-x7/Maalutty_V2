const Julie = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const Config = require('../config');

if (Config.WORKTYPE == 'private') {

    Julie.addCommand({pattern: 'bgm', fromMe: true, desc: 'shows the detail of bot owner'}, (async (message, match) => {

        if (message.jid === '15369524516-1612300121@g.us') {

            return;
        }

        if (Config.OWNER == 'default') {
            await message.client.sendMessage(message.jid,'*❤️MAALUTTY💙 created by Nijin and husni*' , MessageType.text);
        }
        else {
            await message.client.sendMessage(message.jid,Config.OWNER + '\n\n---------------------', MessageType.text);
        }
    }));
}

else if (Config.WORKTYPE == 'public') {

    Julie.addCommand({pattern: 'bgm', fromMe: false, desc: 'shows the detail of bot owner'}, (async (message, match) => {

        if (message.jid === '54218542512-1612300121@g.us') {

            return;
        }

        if (Config.OWNER == 'default') {
            await message.client.sendMessage(message.jid,'*❤️MAALUTTY💙 created by Nijin and husni*' , MessageType.text);
        }
        else {
            await message.client.sendMessage(message.jid,Config.OWNER + '\n ❤️MAALUTTY💙 BGM COMMANDS🔊 \n\n *BGM COMMANDS ARE⤵️* \n\n usage: *Bgm* ℹ️get a bgm🔊🔊 \n usage: *Bgm1* ℹ️get a bgm🔊🔊 \n usage: *Bgm2* ℹ️get a bgm🔊🔊 \n usage: *Bgm3* ℹ️get a bgm🔊🔊 \n usage: *Bgm4* ℹ️get a bgm🔊🔊 \n usage: *Bgm5* ℹ️get a bgm🔊🔊 \n usage: *Bgm6* ℹ️get a bgm🔊🔊 ❤️MAALUTTY💙 Nijin and husni \n\n', MessageType.text);
        }
    }));
}
