const fs = require("fs")
const { writeFile, readFile } = require("fs");
const { command, transplate } = require("../lib");
const Config = require("../database/settings");
const Heroku = require("heroku-client");
const heroku = new Heroku({ token: Config.HEROKU_API_KEY });
const baseURI = "/apps/" + Config.HEROKU_APP_NAME;
var parsedData = JSON.parse(fs.readFileSync('./database/settings.json', "utf8"));

command({ pattern: "setsudo ?(.*)", 
    fromMe: true, 
    desc: "set sudo", 
    type: "user" },
  async (message,match, m) => {
    let SUDO = parsedData.config.SUDO
    var newSudo;
    if(match.include("@")){
      newSudo = (match).toString().split("@")[1]}
    if(message.reply_message){
      newSudo = (message.reply_message.jid).split("@")[0]}
    if (!newSudo)
      return await m.sendMessage("*reply to a number*", { quoted: m });
    var setSudo = (SUDO + "," + newSudo).replace(/,,/g, ",");
    setSudo = setSudo.startsWith(",") ? setSudo.replace(",", "") : setSudo;
    await message.sendMessage({text: "_new sudo numbers are:" + setSudo+'_'}, {
      quoted: m,
    });
    parsedData.config.SUDO = setSudo
    writeFile('./database/settings.json', JSON.stringify(parsedData, null, 2), (err) => {
     if (err) {
       return message.client.sendMessage(message.jid, {text: transplate("Failed to Register Data")})
      }   
 });
  }
);

command({ pattern: "getsudo ?(.*)", 
    fromMe: true, 
    desc: "shows sudo", 
    type: "user" 
  }, async (message, match, m) => {
    let SUDO = parsedData.config.SUDO

let r = await transplate(`SUDO Numbers are : ${SUDO}`)
   return await message.sendMessage('```'+r+'```');
  }
);


