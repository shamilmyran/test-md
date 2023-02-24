const fs = require("fs")
const { command } = require("../lib");
const Config = require("../config");
const Heroku = require("heroku-client");
const heroku = new Heroku({ token: Config.HEROKU_API_KEY });
const baseURI = "/apps/" + Config.HEROKU_APP_NAME;
var parsedData = JSON.parse(fs.readFileSync('./database/settings.json', "utf8"));
  const { LOGS, KOYEB_APP_NAME, KOYEB_API_KEY, DATABASE_URL, STORAGE_JID, HEROKU_API_KEY, ANTILINK_ACTION, SESSION_ID, BRANCH, ALIVE, HEROKU_APP_NAME, GOODBYE_MSG, WELCOME_MSG, HANDLERS, WORK_TYPE, BOT_NAME, OWNER_NAME, SUDO, AUTHOR, PACKNAME, RMBG_KEY, LANG, ANTILINK_ACTION, ANTILINK, FOOTER, THEME, FONT_STYLE, LANGUAGE, INTERNAL_MENU, MODE} = require("../database/settings");


command({ pattern: "setsudo ?(.*)", 
    fromMe: true, 
    desc: "set sudo", 
    type: "user" },
  async (message,match, m) => {
    let SUDO = SUDO
    var newSudo = (message.mention[0]).split("@")[0] || (message.reply_message.jid).split("@")[0]
    if (!newSudo)
      return await m.sendMessage("*reply to a number*", { quoted: m });
    var setSudo = (SUDO + "," + newSudo).replace(/,,/g, ",");
    setSudo = setSudo.startsWith(",") ? setSudo.replace(",", "") : setSudo;
    await message.sendMessage("_new sudo numbers are:_" + setSudo, {
      quoted: m,
    });
    SUDO = setSudo
    writeFile('./database/settings.json', JSON.stringify(parsedData, null, 2), (err) => {
     if (err) {
       return message.client.sendMessage(message.jid, "Failed to Register Data")
      }   
 });
  }
);

command({ pattern: "getsudo ?(.*)", 
    fromMe: true, 
    desc: "shows sudo", 
    type: "user" 
  }, async (message, match, m) => {
    let SUDO = SUDO


    await message.sendMessage("```" + `SUDO Numbers are : ${SUDO}` + "```");
  }
);
