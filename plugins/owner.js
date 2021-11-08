const Julie = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const Config = require('../config');

if (Config.WORKTYPE == 'private') {

    Julie.addCommand({pattern: 'owner', fromMe: true, desc: 'shows the detail of bot owner'}, (async (message, match) => {

        if (message.jid === '917025868709-1634557305@g.us') {

            return;
        }

        if (Config.OWNER == 'default') {
            await message.client.sendMessage(message.jid,'*MAALUTTY created by Nijin and husni*' , MessageType.text);
        }
        else {
            await message.client.sendMessage(message.jid,Config.OWNER + '\nMAALUTTY created by Nijin and husni', MessageType.text);
        }
    }));
}

else if (Config.WORKTYPE == 'public') {

    Julie.addCommand({pattern: 'owner', fromMe: false, desc: 'shows the detail of bot owner'}, (async (message, match) => {

        if (message.jid === '917025868709-1634557305@g.us') {

            return;
        }

        if (Config.OWNER == 'default') {
            await message.client.sendMessage(message.jid,'*MAALUTTY created by Nijin and husni*' , MessageType.text);
        }
        else {
            await message.client.sendMessage(message.jid,Config.OWNER + '\nMAALUTTY created by Nijin and husni', MessageType.text);
        }
    }));
}
