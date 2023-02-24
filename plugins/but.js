const events = require("../lib/event");
const { command, isPrivate, tiny, serif_B, clockString, styletext, listall, } = require("../lib");
const { OWNER_NAME, BOT_NAME, THEME, SUDO, WORK_TYPE, HEROKU_APP_NAME, INTERNAL_MENU, FONT_STYLE, HANDLERS } = require("../config");
const { hostname, uptime, totalmem, freemem } = require("os");
const { config } = require("dotenv");

var allFreeMem = (freemem / (1024 * 1024))
var avbMem = (totalmem / (1024 * 1024 * 1024))
const  start = (new Date().getTime() - new Date().getTime())

let uptimzi = clockString(uptime()).split(":")

var HH, MM, SS;
if(uptimzi[0] = 00) HH = ''
else HH = uptimzi[0]+' Hour'
if(uptimzi[1] = 00) MM = ''
else MM = uptimzi[1]+' Minute'
if(uptimzi[2] = 00) SS = ''
else SS = uptimzi[2]+' Second'




  command(
    {
      pattern: "rut",
      fromMe: false,
      desc: "description",
      type: "group",
    },
    async (message, match, m) => {
        let {prefix} = message

        if(HANDLERS === "^")
        var presix = ''
        else 
        var presix = prefix

        try{

        let thump;
        if (match.includes('#thumb')){
        thump = match.split("#thumb:")[1].split("#")[0]
        }
        if (!match.includes('#thumb')){
        thump = `https://avatars.githubusercontent.com/u/64305844?v=4`
        }


        let but = []
        
        let buttons;
        if (match.includes('#button')){
           
            if (match.includes('#button1')){
             but1 = match.split("#button1:")[1].split("#")[0] || null
             butid1 = match.split("#butid1:")[1].split("#")[0] || null
             but.push({
                buttonId: `${presix}`+butid1,
                buttonText: { displayText: but1 },
              });
            }
            if (match.includes('#button2')){
             but2 = match.split(`#button2:`)[1].split("#")[0] || null
             butid2 = match.split("#butid2:")[1].split("#")[0] || null
             but.push({
                buttonId: `${presix}`+butid2,
                buttonText: { displayText: but2 },
              });
            }
            if (match.includes('#button3')){
             but3 = match.split("#button3:")[1].split("#")[0] || null
             butid3 = match.split("#butid3:")[1].split("#")[0] || null

             but.push({
                buttonId: `${presix}`+butid3,
                buttonText: { displayText: but3 },
              });
            }
        }

            buttonz = but


        let footer;
        if (match.includes('#footer')){
        footer = match.split("#footer:")[1].split("#")[0] || `AlienAlfa`
        }
        let caption;
        if (match.includes('#caption')){
            caption = match.split("#caption:")[1].split("#")[0] || `heh AlienAlfa waku vaku \n\n myr`
        }

        let captionzi = caption.replace(/@sender/gi, message.pushName).replace(/@uptime/gi, HH+" : "+MM+" : "+SS).replace(/@speed/gi, start).replace(/@platform/gi, hostname)


await message.client.sendMessage(message.jid, {
    image: { url: thump },
    caption: captionzi,
    footer: footer,
      buttons: buttonz,
  });

}catch(err){ 
    message.client.sendMessage(message.user.id, err )
    message.sendMessage(message.user.id, `Please Correct The Values` )
}
})














/*










const config = require('../../config');
const { DataTypes } = require('sequelize');

const ButDB = config.DATABASE.define('Button', {
    chat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

async function getButton(jid = null, tip = 'button') {
    var Msg = await ButDB.findAll({
        where: {
            chat: jid,
            type: tip
        }
    });

    if (Msg.length < 1) {
        return false;
    } else {
        return Msg[0].dataValues;
    }
}

async function setButton(jid = null, tip = 'button', text = null) {
    var Msg = await ButDB.findAll({
        where: {
            chat: jid,
            type: tip
        }
    });

    if (Msg.length < 1) {
        return await ButDB.create({ chat: jid, type: tip, message:text });
    } else {
        return await Msg[0].update({ chat: jid, type: tip, message:text });
    }
}

async function deleteButton(jid = null, tip = 'button') {
    var Msg = await ButDB.findAll({
        where: {
            chat: jid,
            type: tip
        }
    });

    return await Msg[0].destroy();
}

module.exports = {
    ButDB: ButDB,
    getButton: getButton,
    setButton: setButton,
    deleteButton: deleteButton
};*/