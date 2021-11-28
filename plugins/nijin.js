/* Copyright (C) 2020 nijin-husni.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

Amalser - Amal,farhan
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const exec = require('child_process').exec;
const os = require("os");
const fs = require('fs');
const Config = require('../config')
const Language = require('../language');
const Lang = Language.getString('evaluators');
const SLang = Language.getString('conventer');
const NLang = Language.getString('scrapers');
const googleTTS = require('google-translate-tts');
const Heroku = require('heroku-client');
const heroku = new Heroku({
    token: Config.HEROKU.API_KEY
});
let baseURI = '/apps/' + Config.HEROKU.APP_NAME;

var dd = ''
var errmsg = ''
if (Config.LANG == 'TR') dd = 'Sunucudaki dosyanın içini yazdırır.', errmsg = '*Aradığın Dosya Sunucuda Mevcut Değil!*'
if (Config.LANG == 'EN') dd = 'Prints the inside of the file on the server.', errmsg = '*The file you are looking for is not available on the server!*'
if (Config.LANG == 'AZ') dd = 'Faylın mənbə kodlarını serverdə göstərir.', errmsg = '*Axtardığınız fayl serverdə yoxdur!*'
if (Config.LANG == 'ES') dd = 'Imprime el interior del archivo en el servidor.', errmsg = '*¡El archivo que está buscando no está disponible en el servidor!*'
if (Config.LANG == 'HI') dd = 'सर्वर पर फ़ाइल के अंदर प्रिंट करता है', errmsg = '*आप जिस फ़ाइल की तलाश कर रहे हैं वह सर्वर पर उपलब्ध नहीं है!*'
if (Config.LANG == 'PT') dd = 'Imprime o interior do arquivo no servidor.', errmsg = '*O arquivo que você está procurando não está disponível no servidor!*'
if (Config.LANG == 'ML') dd = 'ഫയലിന്റെ ഉള്ളിൽ സെർവറിൽ പ്രിന്റുചെയ്യുന്നു', errmsg = '*നിങ്ങൾ തിരയുന്ന ഫയൽ സെർവറിൽ ലഭ്യമല്ല!*'
if (Config.LANG == 'ID') dd = 'Mencetak bagian dalam file di server', errmsg = '*File yang Anda cari tidak tersedia di server!*'
if (Config.LANG == 'RU') dd = 'Печатает внутреннюю часть файла на сервере', errmsg = '*Файл, который вы ищете, недоступен на сервере!*'

Asena.addCommand({pattern: 'print ?(.*)', fromMe: true, desc: dd}, (async (message, match) => {    
    exec('cat ' + match[1], async (err, stdout, stderr) => {
        if (err) {
            return await message.client.sendMessage(message.jid,errmsg, MessageType.text)
        }
        await message.client.sendMessage(message.jid, `Root ~# ${match[1]} \n\n` + stdout, MessageType.text)
    });
}));
var bdesc = ''
var berr = ''
var need_way = ''
if (Config.LANG == 'TR') bdesc = 'Sunucu içindeki ses, video ve fotoğrafları gönderir.', berr = '*Aradığın Dosya Sunucuda Mevcut Değil!*', need_way = '*Dosya Yolu Girmen Gerekiyor!*'
if (Config.LANG == 'EN') bdesc = 'Sends audio, video and photos inside the server.', berr = '*The file you are looking for is not available on the server!*', need_way = '*File Path Required!*'
if (Config.LANG == 'AZ') bdesc = 'Server daxilində səs, video və fotoşəkillər göndərir.', berr = '*Axtardığınız fayl serverdə yoxdur!*', need_way = '*Fayl yolu tələb olunur!*'
if (Config.LANG == 'HI') bdesc = 'सर्वर के अंदर ऑडियो, वीडियो और फोटो भेजता है', berr = '*आप जिस फ़ाइल की तलाश कर रहे हैं वह सर्वर पर उपलब्ध नहीं है!*', need_way = '*फ़ाइल पथ आवश्यक!*'
if (Config.LANG == 'PT') bdesc = 'Envia áudio, vídeo e fotos dentro do servidor.', berr = '*O arquivo que você está procurando não está disponível no servidor!*', need_way = '*Caminho do arquivo obrigatório!*'
if (Config.LANG == 'RU') bdesc = 'Отправляет аудио, видео и фото внутри сервера', berr = '*Файл, который вы ищете, недоступен на сервере!*', need_way = '*Требуется путь к файлу!*'
if (Config.LANG == 'ES') bdesc = 'Envía audio, video y fotos dentro del servidor.', berr = '*¡El archivo que está buscando no está disponible en el servidor!*', need_way = '*¡Ruta de archivo requerida!*'
if (Config.LANG == 'ID') bdesc = 'Ini mengirimkan audio, video dan foto di dalam server.', berr = '*File yang Anda cari tidak tersedia di server!*', need_way = '*Jalur File Diperlukan!*'
if (Config.LANG == 'ML') bdesc = 'സെർവറിനുള്ളിൽ ഓഡിയോ, വീഡിയോ, ഫോട്ടോകൾ അയയ്ക്കുന്നു.', berr = '*നിങ്ങൾ തിരയുന്ന ഫയൽ സെർവറിൽ ലഭ്യമല്ല!*', need_way = '*ഫയൽ പാത്ത് ആവശ്യമാണ്!*'
let wk_q = Config.WORKTYPE == 'public' ? false : true
Asena.addCommand({pattern: 'bashmedia ?(.*)', fromMe: wk_q, desc: bdesc, usage: 'video.mp4 && media/gif/pic.mp4'}, (async (message, match) => {    
    var id = message.jid
    try {
        if (match[1].includes('jpg') || match[1].includes('tiff') || match[1].includes('raw') || match[1].includes('dng') || match[1].includes('png') || match[1].includes('jpeg')) {
            await message.client.sendMessage(id,fs.readFileSync(`/root/WhatsAsenaDuplicated/${match[1]}`), MessageType.image, {caption: 'Made by WhatsAsena' })
        }
        else if (match[1].includes('mp4') || match[1].includes('avi') || match[1].includes('webm') || match[1].includes('mkv') || match[1].includes('mpeg')) {
            await message.client.sendMessage(id,fs.readFileSync(`/root/WhatsAsenaDuplicated/${match[1]}`), MessageType.video, {caption: 'Made by WhatsAsena' });
        }
        else if (match[1].includes('mp3') || match[1].includes('waw') || match[1].includes('flac') || match[1].includes('weba') || match[1].includes('ogg') || match[1].includes('m4a')) {
            await message.client.sendMessage(id,fs.readFileSync(`/root/WhatsAsenaDuplicated/${match[1]}`), MessageType.audio);
        }
        else {
            await message.client.sendMessage(id,need_way, MessageType.text)
        }
    } catch (err) {
        await message.client.sendMessage(id,berr, MessageType.text)
    }
}));
let wk_ad = Config.WORKTYPE == 'public' ? false : true
var addsdesc = ''
var rep_add = ''
var suc_add = ''
if (Config.LANG == 'TR') addsdesc = 'Sunucuya resim, ses veya video yükler.', rep_add = '*Herhangi Bir Medya Mesajına Yanıt Ver!*', suc_add = '*Medya Sunucuya Eklendi! ✅*'
if (Config.LANG == 'EN') addsdesc = 'Uploads image, audio or video to the server.', rep_add = '*Reply to Any Media Message!*', suc_add = '*Media Added to Server! ✅*'
if (Config.LANG == 'AZ') addsdesc = 'Serverə şəkil, səs və ya video yükləyir.', rep_add = '*Hər hansı bir Mediya Mesajına Cavab!*', suc_add = '*Serverə Media əlavə edildi! ✅*'
if (Config.LANG == 'HI') addsdesc = 'सर्वर पर छवि, ऑडियो या वीडियो अपलोड करता है।', rep_add = '*किसी भी मीडिया संदेश का उत्तर दें!*', suc_add = '*मीडिया सर्वर में जोड़ा गया! ✅*'
if (Config.LANG == 'PT') addsdesc = 'Carrega imagem, áudio ou vídeo para o servidor.', rep_add = '*Responda a qualquer mensagem da mídia!*', suc_add = '*Mídia adicionada ao servidor! ✅*'
if (Config.LANG == 'RU') addsdesc = 'Загружает изображение, аудио или видео на сервер.', rep_add = '*Ответьте на любое сообщение СМИ!*', suc_add = '*Медиа добавлены на сервер! ✅*'
if (Config.LANG == 'ML') addsdesc = 'ഇമേജ്, ഓഡിയോ അല്ലെങ്കിൽ വീഡിയോ സെർവറിലേക്ക് അപ്‌ലോഡുചെയ്യുന്നു.', rep_add = '*ഏതെങ്കിലും മീഡിയ സന്ദേശത്തിന് മറുപടി നൽകുക!*', suc_add = '*മീഡിയ സെർവറിൽ ചേർത്തു! ✅*'
if (Config.LANG == 'ES') addsdesc = 'Carga imagen, audio o video al servidor.', rep_add = '*¡Responde a cualquier mensaje de los medios!*', suc_add = '*¡Medios agregados al servidor! ✅*'
if (Config.LANG == 'ID') addsdesc = 'Upload gambar, audio atau video ke server.', rep_add = '*Balas Pesan Media Apa Pun!*', suc_add = '*Media Ditambahkan ke Server! ✅*'

Asena.addCommand({pattern: 'addserver$', fromMe: wk_ad, desc: addsdesc}, (async (message, match) => {    
    if (message.reply_message.image) {
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });
        var fin = location.split('.')[1]
        exec('mv ' + location + ' /root/WhatsAsenaDuplicated/server-image.' + fin)
        await message.client.sendMessage(message.jid,suc_add, MessageType.text)
    }
    else if (message.reply_message.video) {
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
            
        });
        var fin = location.split('.')[1]
        exec('mv ' + location + ' /root/WhatsAsenaDuplicated/server-video.' + fin)
        await message.client.sendMessage(message.jid,suc_add, MessageType.text)
    }
    else if (message.reply_message.audio) {
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
            
        });
        var fin = location.split('.')[1]
        exec('mv ' + location + ' /root/WhatsAsenaDuplicated/server-audio.' + fin)
        await message.client.sendMessage(message.jid,suc_add, MessageType.text)
    }
    else { await message.client.sendMessage(message.jid,rep_add, MessageType.text)
    }
}));
async function checkUsAdmin(message, user = message.data.participant) {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup['participants'].map((member) => {     
        if (member.jid.split("@")[0] == user.split("@")[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}
async function checkImAdmin(message, user = message.client.user.jid) {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup['participants'].map((member) => {     
        if (member.jid.split("@")[0] == user.split("@")[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}
var antilink_var = ''
async function antlch() {
    await heroku.get(baseURI + '/config-vars').then(async (vars) => {
        antilink_var = vars.ANTI_LINK
    });
}
antlch()
var ldc = ''
if (Config.LANG == 'AZ') ldc = '*Bağlantı Aşkarlandı!*'
if (Config.LANG == 'TR') ldc = '*‎Link Tespit Edildi!*'
if (Config.LANG == 'EN') ldc = '*Link Detected!*'
if (Config.LANG == 'ML') ldc = '*ലിങ്ക് കണ്ടെത്തി!*'
if (Config.LANG == 'ID') ldc = '*Tautan Terdeteksi!*'
if (Config.LANG == 'PT') ldc = '*Link Detectado!*'
if (Config.LANG == 'RU') ldc = '*Ссылка обнаружена!*'
if (Config.LANG == 'HI') ldc = '*लिंक का पता चला!*'
if (Config.LANG == 'ES') ldc = '*Enlace Detectado!*'
Asena.addCommand({on: 'text', fromMe: false, deleteCommand: false}, (async (message, match) => {
    if (antilink_var == 'true' && message.jid !== '905511384572-1616356915@g.us') {
        let regex1 = new RegExp('http://')
        let regex2 = new RegExp('https://')
        if (regex1.test(message.message)) {
            var us = await checkUsAdmin(message)
            var im = await checkImAdmin(message)
            if (!im) return;
            if (us) return;
            await message.client.groupRemove(message.jid, [message.data.participant]);     
            if (Config.ANTILINKMSG == 'default') {
                await message.client.sendMessage(message.jid,ldc, MessageType.text, {quoted: message.data })
            } else {
                await message.client.sendMessage(message.jid,Config.ANTILINKMSG, MessageType.text, {quoted: message.data })
            }
        } 
        else if (regex2.test(message.message)) {
            var us = await checkUsAdmin(message)
            var im = await checkImAdmin(message)
            if (!im) return;
            if (us) return;
            await message.client.groupRemove(message.jid, [message.data.participant]);      
            if (Config.ANTILINKMSG == 'default') {
                await message.client.sendMessage(message.jid,ldc, MessageType.text, {quoted: message.data })
            } else {
                await message.client.sendMessage(message.jid,Config.ANTILINKMSG, MessageType.text, {quoted: message.data })
            }  
        }
