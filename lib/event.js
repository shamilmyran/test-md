/* Copyright (C) 2022 Albin Thomas.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Alien-Alfa WhatsApp Bot - Albin Thomas
*/
const fs = require("fs")
let alfadb = JSON.parse(fs.readFileSync('./database/settings.json'));
  const { LOGS, KOYEB_APP_NAME, KOYEB_API_KEY, DATABASE_URL, STORAGE_JID, HEROKU_API_KEY, ANTILINK_ACTION, SESSION_ID, BRANCH, ALIVE, HEROKU_APP_NAME, GOODBYE_MSG, WELCOME_MSG, HANDLERS, WORK_TYPE, BOT_NAME, OWNER_NAME, SUDO, AUTHOR, PACKNAME, RMBG_KEY, LANG, ANTILINK_ACTION, ANTILINK, FOOTER, THEME, FONT_STYLE, LANGUAGE, INTERNAL_MENU, MODE} = require("../database/settings");

var commands = [];

function command(info, func) {
  let types = ['converter','downloader','game','group','heroku','tool','user','xediazi','search','Textpro','Maker menu','user','textmaker','edit', 'theme']
  var infos = info;
  infos.function = func;
  infos.pattern = new RegExp( `${HANDLERS}( ?${info.pattern})`,  `is` );
  if (!infos.dontAddCommandList) infos.dontAddCommandList = false;
  if (!infos.fromMe) infos.dontAddCommandList = false;
  if (!info.type||!types.includes(info.type)) infos.type = 'misc';
  commands.push(infos);
  return infos;
}
module.exports = {
  command,
  commands,
};