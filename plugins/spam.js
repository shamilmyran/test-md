// © https://github.com/Neeraj-x0
/*

const Asena = require('../Utilis/events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const Heroku = require('heroku-client');
const heroku = new Heroku({
    token: Config.HEROKU.API_KEY
});


let baseURI = '/apps/' + Config.HEROKU.APP_NAME;


Asena.addCommand({pattern: 'spam ?(.*)', fromMe: true, desc:'spams the message' }, (async (message, match, m) => {

    if (message.jid === '905524317852-1612300121@g.us') {

        return;
    }


    if (match[1] === '') {

        return await message.sendMessage(message.jid, 'Need something to spam');

    }

    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);

    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);
    
    await message.sendMessage(message.jid, `${match[1]}`, MessageType.text);

}));

Asena.addCommand({pattern: 'killspam', fromMe: true, desc:'stops the spam message'}, (async (message, match, m) => {

    await message.sendMessage(message.jid,'Stopping Spam Please wait a bit....', MessageType.text);

    console.log(baseURI);
    await heroku.delete(baseURI + '/dynos').catch(async (error) => {
        await message.sendMessage(message.jid, error.message, MessageType.text);

    });
}));

*/