const fs = require("fs")
let alfadb = JSON.parse(fs.readFileSync('./database/settings.json'));

const chalk = require("chalk")
const { writeFile, readFile } = require("fs");
const { isAdmin} = require("../lib");
const { command, styletext, listall, tiny, isPrivate } = require("../lib/");
const { parse } = require("csv-parse");
const { Base64 } = require('js-base64');
  const { BOT_NAME, OWNER_NAME, FOOTER, THEME, FONT_STYLE } = require("../database/settings");

let path = './database/settings.json'
let db = JSON.parse(fs.readFileSync('./database/settings.json'));
const fetch = require('node-fetch')

command(
  {
    pattern: "set",
    fromMe: true,
    desc: "configure a verible",
    dontAddCommandList: true,
    type: "owner",

  },
  async (message, match, m) => {
const _0x599e17=_0x5c71;(function(_0xe21c22,_0x9089b5){const _0x2b1864=_0x5c71,_0x44b9ac=_0xe21c22();while(!![]){try{const _0x38bb5f=parseInt(_0x2b1864(0x1cf))/0x1+-parseInt(_0x2b1864(0x1df))/0x2+parseInt(_0x2b1864(0x1d4))/0x3*(-parseInt(_0x2b1864(0x1bb))/0x4)+parseInt(_0x2b1864(0x1a2))/0x5*(parseInt(_0x2b1864(0x1b0))/0x6)+parseInt(_0x2b1864(0x1c9))/0x7+-parseInt(_0x2b1864(0x1bc))/0x8*(parseInt(_0x2b1864(0x1ae))/0x9)+parseInt(_0x2b1864(0x1a4))/0xa*(parseInt(_0x2b1864(0x1dd))/0xb);if(_0x38bb5f===_0x9089b5)break;else _0x44b9ac['push'](_0x44b9ac['shift']());}catch(_0x5c7f9e){_0x44b9ac['push'](_0x44b9ac['shift']());}}}(_0x4e0e,0x310cb));if(!match)return;let args=match[_0x599e17(0x1af)]('\x20'),variable=args[0x0][_0x599e17(0x1d3)](),intdata=args[_0x599e17(0x1de)](0x1)[_0x599e17(0x198)]('\x20');readFile(path,async(_0xb80b5b,_0x2b68b3)=>{const _0x395262=_0x599e17;if(_0xb80b5b){console[_0x395262(0x1aa)](_0xb80b5b);return;}const _0x5256f0=JSON['parse'](_0x2b68b3);let _0x2d809d=[];if(/HANDLER/['test'](variable)){if(!intdata)return message[_0x395262(0x19f)]['sendMessage'](message[_0x395262(0x1bf)],{'text':_0x395262(0x1a8)});_0x5256f0['config'][_0x395262(0x1c8)]=intdata,writeFile(path,JSON[_0x395262(0x1d1)](_0x5256f0,null,0x2),_0x236dc7=>{const _0x31780c=_0x395262;if(_0x236dc7)return message['client'][_0x31780c(0x1d8)](message[_0x31780c(0x1bf)],_0x31780c(0x19b));});}if(/WORKTYPE/['test'](variable)){if(!intdata){_0x2d809d['push']({'title':styletext('Public',parseInt(''+FONT_STYLE)),'rowId':global[_0x395262(0x193)]+'set\x20WORKTYPE\x20Public'},{'title':styletext(_0x395262(0x1b6),parseInt(''+FONT_STYLE)),'rowId':global[_0x395262(0x193)]+_0x395262(0x1c4)},{'title':styletext(_0x395262(0x1b2),parseInt(''+FONT_STYLE)),'rowId':global['prefix']+_0x395262(0x1c4)},{'title':styletext(_0x395262(0x1b9),parseInt(''+FONT_STYLE)),'rowId':global[_0x395262(0x193)]+_0x395262(0x1c4)});let _0x5ad2dd=_0x395262(0x1ac)+BOT_NAME+'\x20〙═══⊷❍\x0a┃✧╭──────────────\x0a┃✧│\x0a┃✧│\x20Set\x20WorkType\x0a┃✧│\x0a┃✧│\x20\x20▎▍▌▌▉▏▎▌▉▐▏▌▎\x0a┃✧│\x20\x20\x20'+message[_0x395262(0x1c5)]+_0x395262(0x194);return await message['client'][_0x395262(0x1d8)](message[_0x395262(0x1bf)],{'text':styletext(_0x5ad2dd,parseInt(''+FONT_STYLE)),'buttonText':styletext(_0x395262(0x1da),parseInt(''+FONT_STYLE)),'sections':[{'title':styletext(_0x395262(0x199),parseInt(''+FONT_STYLE)),'rows':_0x2d809d}]});}_0x5256f0[_0x395262(0x192)]['WORK_TYPE']=intdata,writeFile(path,JSON[_0x395262(0x1d1)](_0x5256f0,null,0x2),_0x1a9434=>{const _0x3c8d4d=_0x395262;if(_0x1a9434)return message['client'][_0x3c8d4d(0x1d8)](message[_0x3c8d4d(0x1bf)],_0x3c8d4d(0x19b));});}if(/BOTNAME/[_0x395262(0x1d7)](variable)){if(!intdata)return message[_0x395262(0x19f)]['sendMessage'](message[_0x395262(0x1bf)],{'text':_0x395262(0x1a0)});_0x5256f0['config'][_0x395262(0x1d6)]=intdata,writeFile(path,JSON[_0x395262(0x1d1)](_0x5256f0,null,0x2),_0x4740e5=>{const _0x4231e8=_0x395262;if(_0x4740e5)return message[_0x4231e8(0x19f)][_0x4231e8(0x1d8)](message[_0x4231e8(0x1bf)],_0x4231e8(0x19b));});}if(/OWNER/[_0x395262(0x1d7)](variable)){if(!intdata)return message[_0x395262(0x19f)]['sendMessage'](message['jid'],{'text':_0x395262(0x1c0)});_0x5256f0[_0x395262(0x192)]['OWNER_NAME']=intdata,writeFile(path,JSON['stringify'](_0x5256f0,null,0x2),_0x19b281=>{const _0x137a2a=_0x395262;if(_0x19b281)return message[_0x137a2a(0x19f)]['sendMessage'](message[_0x137a2a(0x1bf)],'Failed\x20to\x20Register\x20Data');});}if(/SUDO/['test'](variable))return message['client'][_0x395262(0x1d8)](message[_0x395262(0x1bf)],_0x395262(0x1c2));if(/AUTHOR/[_0x395262(0x1d7)](variable)){if(!intdata)return message[_0x395262(0x19f)]['sendMessage'](message['jid'],{'text':'```Usage:\x20set\x20author\x20Alien```'});_0x5256f0[_0x395262(0x192)]['AUTHOR']=intdata,writeFile(path,JSON[_0x395262(0x1d1)](_0x5256f0,null,0x2),_0x371d50=>{const _0x31b42=_0x395262;if(_0x371d50)return message[_0x31b42(0x19f)][_0x31b42(0x1d8)](message[_0x31b42(0x1bf)],_0x31b42(0x19b));});}if(/PACKNAME/[_0x395262(0x1d7)](variable)){if(!intdata)return message['client'][_0x395262(0x1d8)](message[_0x395262(0x1bf)],{'text':_0x395262(0x196)});_0x5256f0[_0x395262(0x192)][_0x395262(0x1cd)]=intdata,writeFile(path,JSON['stringify'](_0x5256f0,null,0x2),_0x2adf79=>{if(_0x2adf79)return message['client']['sendMessage'](message['jid'],'Failed\x20to\x20Register\x20Data');});}if(/RMBG/[_0x395262(0x1d7)](variable)){if(!intdata)return message[_0x395262(0x19f)][_0x395262(0x1d8)](message[_0x395262(0x1bf)],{'text':_0x395262(0x1a6)});_0x5256f0[_0x395262(0x192)][_0x395262(0x1b7)]=intdata,writeFile(path,JSON[_0x395262(0x1d1)](_0x5256f0,null,0x2),_0x5989aa=>{const _0x45b5e7=_0x395262;if(_0x5989aa)return message[_0x45b5e7(0x19f)][_0x45b5e7(0x1d8)](message[_0x45b5e7(0x1bf)],_0x45b5e7(0x19b));});}if(/LANG/['test'](variable)){if(!intdata)return message[_0x395262(0x19f)]['sendMessage'](message['jid'],{'text':_0x395262(0x1ca)});_0x5256f0[_0x395262(0x192)][_0x395262(0x19a)]=intdata,writeFile(path,JSON[_0x395262(0x1d1)](_0x5256f0,null,0x2),_0x4ac129=>{const _0x48bdfc=_0x395262;if(_0x4ac129)return message['client'][_0x48bdfc(0x1d8)](message[_0x48bdfc(0x1bf)],_0x48bdfc(0x19b));});}if(/ANTILINKACTION/[_0x395262(0x1d7)](variable)){if(!intdata){let _0x484953=[];_0x484953[_0x395262(0x1be)]({'title':styletext(_0x395262(0x1ab),parseInt(''+FONT_STYLE)),'rowId':global[_0x395262(0x193)]+'set\x20ANTILINKACTION\x20ban'},{'title':styletext(_0x395262(0x197),parseInt(''+FONT_STYLE)),'rowId':global[_0x395262(0x193)]+'set\x20ANTILINKACTION\x20kick'});let _0x7b5b13=_0x395262(0x1ac)+BOT_NAME+_0x395262(0x1c3)+message[_0x395262(0x1c5)]+_0x395262(0x194);await message[_0x395262(0x19f)][_0x395262(0x1d8)](message['jid'],{'text':styletext(_0x7b5b13,parseInt(''+FONT_STYLE)),'buttonText':styletext(_0x395262(0x1da),parseInt(''+FONT_STYLE)),'sections':[{'title':styletext('Select\x20Type',parseInt(''+FONT_STYLE)),'rows':_0x484953}]});}_0x5256f0[_0x395262(0x192)][_0x395262(0x1d2)]=intdata,writeFile(path,JSON[_0x395262(0x1d1)](_0x5256f0,null,0x2),_0x304359=>{const _0x2f4eb0=_0x395262;if(_0x304359)return message[_0x2f4eb0(0x19f)][_0x2f4eb0(0x1d8)](message[_0x2f4eb0(0x1bf)],_0x2f4eb0(0x19b));});}if(/FOOTER/[_0x395262(0x1d7)](variable)){if(!intdata)return message[_0x395262(0x19f)]['sendMessage'](message[_0x395262(0x1bf)],{'text':_0x395262(0x1a5)});_0x5256f0['config']['FOOTER']=intdata,writeFile(path,JSON['stringify'](_0x5256f0,null,0x2),_0x37ddc1=>{const _0x2c298f=_0x395262;if(_0x37ddc1)return message[_0x2c298f(0x19f)][_0x2c298f(0x1d8)](message[_0x2c298f(0x1bf)],_0x2c298f(0x19b));});}if(/THEME/[_0x395262(0x1d7)](variable)){if(!intdata){_0x2d809d[_0x395262(0x1be)]({'title':styletext(_0x395262(0x1a3),parseInt(''+FONT_STYLE)),'rowId':global['prefix']+_0x395262(0x19d)},{'title':styletext(_0x395262(0x1b8),parseInt(''+FONT_STYLE)),'rowId':global[_0x395262(0x193)]+'set\x20THEME\x20xasena'},{'title':styletext(_0x395262(0x1cb),parseInt(''+FONT_STYLE)),'rowId':global[_0x395262(0x193)]+'set\x20THEME\x20alfa'},{'title':styletext(_0x395262(0x1b3),parseInt(''+FONT_STYLE)),'rowId':global[_0x395262(0x193)]+'set\x20THEME\x20alfa'},{'title':styletext(_0x395262(0x1a7),parseInt(''+FONT_STYLE)),'rowId':global['prefix']+'set\x20THEME\x20alfa'},{'title':styletext(_0x395262(0x1c6),parseInt(''+FONT_STYLE)),'rowId':global[_0x395262(0x193)]+_0x395262(0x19d)});let _0x54ba0a=_0x395262(0x1ac)+BOT_NAME+_0x395262(0x1d9)+message[_0x395262(0x1c5)]+_0x395262(0x194);await message[_0x395262(0x19f)][_0x395262(0x1d8)](message[_0x395262(0x1bf)],{'text':styletext(_0x54ba0a,parseInt(''+FONT_STYLE)),'buttonText':styletext(_0x395262(0x1da),parseInt(''+FONT_STYLE)),'sections':[{'title':styletext(_0x395262(0x199),parseInt(''+FONT_STYLE)),'rows':_0x2d809d}]});}_0x5256f0[_0x395262(0x192)][_0x395262(0x19c)]=intdata,writeFile(path,JSON[_0x395262(0x1d1)](_0x5256f0,null,0x2),_0x4550f8=>{const _0x23ceb1=_0x395262;if(_0x4550f8)return message[_0x23ceb1(0x19f)][_0x23ceb1(0x1d8)](message[_0x23ceb1(0x1bf)],_0x23ceb1(0x19b));});}if(/FONT/['test'](variable)){if(!intdata){let _0xe6481=[];listall('Fancy')[_0x395262(0x1a9)]((_0x197b79,_0x5db610)=>{const _0x577cbe=_0x395262;_0xe6481[_0x577cbe(0x1be)]({'title':styletext((_0x5db610+=0x1)+'\x20'+_0x197b79,parseInt(''+FONT_STYLE)),'rowId':global[_0x577cbe(0x193)]+'set\x20FONT\x20'+(_0x5db610+=0x1)});});if(!intdata){let _0x3204dd=_0x395262(0x1ac)+BOT_NAME+'\x20〙═══⊷❍\x0a┃✧╭──────────────\x0a┃✧│\x0a┃✧│\x20Set\x20WorkType\x0a┃✧│\x0a┃✧│\x20\x20▎▍▌▌▉▏▎▌▉▐▏▌▎\x0a┃✧│\x20\x20\x20'+message[_0x395262(0x1c5)]+_0x395262(0x194);return await message['client'][_0x395262(0x1d8)](message['jid'],{'text':styletext(_0x3204dd,parseInt(''+FONT_STYLE)),'buttonText':styletext(_0x395262(0x1da),parseInt(''+FONT_STYLE)),'sections':[{'title':styletext('Select\x20Type',parseInt(''+FONT_STYLE)),'rows':_0xe6481}]});}}_0x5256f0[_0x395262(0x192)][_0x395262(0x1ce)]=intdata,writeFile(path,JSON['stringify'](_0x5256f0,null,0x2),_0x34b0c3=>{const _0x1bb8a3=_0x395262;if(_0x34b0c3)return message[_0x1bb8a3(0x19f)][_0x1bb8a3(0x1d8)](message[_0x1bb8a3(0x1bf)],_0x1bb8a3(0x19b));});}if(/MENU/['test'](variable)){if(!intdata){let _0x1bfcee=[{'buttonId':_0x395262(0x1d5),'buttonText':{'displayText':_0x395262(0x1cc)},'type':0x1},{'buttonId':_0x395262(0x1b1),'buttonText':{'displayText':'Disable'},'type':0x1}],_0x48e626={'text':_0x395262(0x1a1),'footer':_0x395262(0x1e0),'buttons':_0x1bfcee,'headerType':0x2};return await message['client']['sendMessage'](message[_0x395262(0x1bf)],_0x48e626);}_0x5256f0[_0x395262(0x192)][_0x395262(0x1d0)]=intdata,writeFile(path,JSON[_0x395262(0x1d1)](_0x5256f0,null,0x2),_0x2a2049=>{const _0x5e4135=_0x395262;if(_0x2a2049)return message['client']['sendMessage'](message[_0x5e4135(0x1bf)],_0x5e4135(0x19b));});}if(/MODE/[_0x395262(0x1d7)](variable)){if(!intdata)return message['client'][_0x395262(0x1d8)](message['jid'],{'text':'```Sorry\x20Not\x20Yet\x20Avalable\x20(comming\x20soon)```'});_0x5256f0[_0x395262(0x192)][_0x395262(0x1b4)]=intdata,writeFile(path,JSON[_0x395262(0x1d1)](_0x5256f0,null,0x2),_0x28d43c=>{const _0x38b04f=_0x395262;if(_0x28d43c)return message[_0x38b04f(0x19f)][_0x38b04f(0x1d8)](message['jid'],_0x38b04f(0x19b));});}if(/STORE/[_0x395262(0x1d7)](variable)){if(!intdata)return message['client'][_0x395262(0x1d8)](message['jid'],{'text':_0x395262(0x195)});_0x5256f0[_0x395262(0x192)][_0x395262(0x19e)]=intdata,writeFile(path,JSON[_0x395262(0x1d1)](_0x5256f0,null,0x2),_0x283066=>{const _0x21339f=_0x395262;if(_0x283066)return message['client']['sendMessage'](message[_0x21339f(0x1bf)],'Failed\x20to\x20Register\x20Data');});}if(/CHATBOT/[_0x395262(0x1d7)](variable)){if(!intdata){let _0x3d2c51=[{'buttonId':_0x395262(0x1ba),'buttonText':{'displayText':'Enable'},'type':0x1},{'buttonId':_0x395262(0x1bd),'buttonText':{'displayText':'Disable'},'type':0x1}],_0x58644f={'text':_0x395262(0x1ad),'footer':_0x395262(0x1e0),'buttons':_0x3d2c51,'headerType':0x2};return await message[_0x395262(0x19f)][_0x395262(0x1d8)](message[_0x395262(0x1bf)],_0x58644f);}_0x5256f0[_0x395262(0x192)]['CHAT_BOT']=intdata,writeFile(path,JSON['stringify'](_0x5256f0,null,0x2),_0x5a646c=>{const _0x2a464d=_0x395262;if(_0x5a646c)return message[_0x2a464d(0x19f)][_0x2a464d(0x1d8)](message['jid'],_0x2a464d(0x19b));});}if(/GOODBYE/[_0x395262(0x1d7)](variable)){if(!intdata)return message['client'][_0x395262(0x1d8)](message[_0x395262(0x1bf)],{'text':'```Usage:\x20set\x20goodbye\x20Hi\x20@user\x20It\x20was\x20Nice\x20Seeing\x20you```'});_0x5256f0[_0x395262(0x1dc)]['GOODBYE_MSG']=intdata,writeFile(path,JSON[_0x395262(0x1d1)](_0x5256f0,null,0x2),_0x36c909=>{const _0x24ebae=_0x395262;if(_0x36c909)return message[_0x24ebae(0x19f)][_0x24ebae(0x1d8)](message[_0x24ebae(0x1bf)],_0x24ebae(0x19b));});}if(/WELCOME/[_0x395262(0x1d7)](variable)){if(!intdata)return message['client'][_0x395262(0x1d8)](message[_0x395262(0x1bf)],{'text':_0x395262(0x1c7)});_0x5256f0[_0x395262(0x1dc)][_0x395262(0x1b5)]=intdata,writeFile(path,JSON[_0x395262(0x1d1)](_0x5256f0,null,0x2),_0x2b913f=>{const _0x2da13a=_0x395262;if(_0x2b913f)return message[_0x2da13a(0x19f)]['sendMessage'](message['jid'],_0x2da13a(0x19b));});}if(/ALIVE/['test'](variable)){if(!intdata)return message[_0x395262(0x19f)][_0x395262(0x1d8)](message[_0x395262(0x1bf)],{'text':_0x395262(0x1c1)});_0x5256f0[_0x395262(0x1dc)][_0x395262(0x1db)]=intdata,writeFile(path,JSON[_0x395262(0x1d1)](_0x5256f0,null,0x2),_0xe17c3f=>{const _0x45908a=_0x395262;if(_0xe17c3f)return message['client']['sendMessage'](message['jid'],_0x45908a(0x19b));else{}});}setTimeout(()=>{process['send']('reset');},0xbb8);});function _0x5c71(_0x17e156,_0x569c96){const _0x4e0eff=_0x4e0e();return _0x5c71=function(_0x5c71f5,_0xda3d9f){_0x5c71f5=_0x5c71f5-0x192;let _0x3c1d7c=_0x4e0eff[_0x5c71f5];return _0x3c1d7c;},_0x5c71(_0x17e156,_0x569c96);}function _0x4e0e(){const _0xa731c5=['Select\x20Type','LANG','Failed\x20to\x20Register\x20Data','THEME','set\x20THEME\x20alfa','STORAGE_JID','client','```Usage:\x20set\x20botname\x20Aurora```','Enable\x20or\x20disable\x20inbuilt\x20menu\x20to\x20add\x20your\x20own\x20menu\x20plugin','5FFMNaE','Alfa','68840jzenkH','```Usage:\x20set\x20footer\x20Alfa-Bot-MD```','```Usage:\x20set\x20rmbg\x20yourkey```','Ragnork(Coming\x20soon)','```Usage:\x20set\x20handler\x20#```','forEach','log','Ban','╭═══〘\x20','Enable\x20or\x20disable\x20chatGPT\x20Auto\x20chatbot','11988cDApcb','split','1799598fjejXl','set\x20MENU\x20false','Admin(coming\x20soon)','Lyfe(Coming\x20soon)','MODE','WELCOME_MSG','Private','RMBG_KEY','X-Asena','Fun(coming\x20soon)','set\x20CHATBOT\x20true','67544lmIqVr','1616oCSERV','set\x20CHATBOT\x20false','push','jid','```Usage:\x20set\x20owner\x20Alien-Alfa```','```Usage:\x20set\x20alive\x20I\x20am\x20active```','_Use\x20Command:\x20Setsudo_','\x20〙═══⊷❍\x0a┃✧╭──────────────\x0a┃✧│\x0a┃✧│\x20Set\x20Antilink\x20Action\x0a┃✧│\x0a┃✧│\x20\x20▎▍▌▌▉▏▎▌▉▐▏▌▎\x0a┃✧│\x20\x20\x20','set\x20WORKTYPE\x20Private','pushName','Random(Coming\x20soon)','```Usage:\x20set\x20welcome\x20Hi\x20@user\x20Welcome\x20to\x20@gname```','HANDLER','945952EyOuxr','```Usage:\x20set\x20lang\x20ML```','Hermit(Coming\x20soon)','Enable','PACKNAME','FONT_STYLE','73399FHmfvr','INTERNAL_MENU','stringify','ANTILINK_ACTION','toUpperCase','3wzJmKb','set\x20MENU\x20true','BOT_NAME','test','sendMessage','\x20〙═══⊷❍\x0a┃✧╭──────────────\x0a┃✧│\x0a┃✧│\x20Set\x20Theme\x0a┃✧│\x0a┃✧│\x20\x20▎▍▌▌▉▏▎▌▉▐▏▌▎\x0a┃✧│\x20\x20\x20','Options','ALIVE','MESSAGE_MEM','88GiJfDK','slice','153366qRFVMt','[ᴀʟɪᴇɴ\x20ᴀʟꜰᴀ-ᴍᴅ]','config','prefix','\x0a┃✧│\x20\x0a┃✧╰───────────────\x0a╰═════════════════⊷','```Usage:\x20set\x20store\x20targerJID```','```Usage:\x20set\x20packname\x20WhatsappBot```','Kick','join'];_0x4e0e=function(){return _0xa731c5;};return _0x4e0e();}
})




command(
  {
    pattern: "confnew",
    fromMe: true,
    desc: "configure new verible",
    dontAddCommandList: true,
    type: "owner",

  },
  async (message, match, m) => {
    const _0x29f6c5=_0x3046;function _0x3046(_0x28e7a0,_0x3ecc1c){const _0x346abc=_0x346a();return _0x3046=function(_0x304641,_0x32c46f){_0x304641=_0x304641-0x1d6;let _0x3052ea=_0x346abc[_0x304641];return _0x3052ea;},_0x3046(_0x28e7a0,_0x3ecc1c);}(function(_0x277109,_0x509376){const _0x4b8649=_0x3046,_0x56d55c=_0x277109();while(!![]){try{const _0xaaa474=-parseInt(_0x4b8649(0x1df))/0x1+-parseInt(_0x4b8649(0x1e2))/0x2*(-parseInt(_0x4b8649(0x1e4))/0x3)+-parseInt(_0x4b8649(0x1d9))/0x4*(parseInt(_0x4b8649(0x1d6))/0x5)+parseInt(_0x4b8649(0x1e8))/0x6+-parseInt(_0x4b8649(0x1dc))/0x7*(parseInt(_0x4b8649(0x1e6))/0x8)+-parseInt(_0x4b8649(0x1e1))/0x9*(-parseInt(_0x4b8649(0x1e7))/0xa)+-parseInt(_0x4b8649(0x1e5))/0xb;if(_0xaaa474===_0x509376)break;else _0x56d55c['push'](_0x56d55c['shift']());}catch(_0x4b006c){_0x56d55c['push'](_0x56d55c['shift']());}}}(_0x346a,0xd1046));function _0x346a(){const _0x251097=['1059730jiGSwn','Failed\x20to\x20Register\x20Data','split','311950rHVFCi','stringify','9dkdTlH','2BEZrIR','sendMessage','4280691moCCrF','6442348AZiQdp','80NXpKXp','14662310WcgiDn','9491868hUHIik','jid','262490phyDaZ','log','parse','92PuWSVo','toUpperCase','push'];_0x346a=function(){return _0x251097;};return _0x346a();}if(!match)return;let args=match[_0x29f6c5(0x1de)]('\x20'),ver=args[0x0][_0x29f6c5(0x1da)](),text=args['slice'](0x1)['join']('\x20');readFile(path,async(_0x116684,_0x3ef523)=>{const _0x456568=_0x29f6c5;if(_0x116684){console[_0x456568(0x1d7)](_0x116684);return;}const _0x3d6135=JSON[_0x456568(0x1d8)](_0x3ef523);_0x3d6135[_0x456568(0x1db)]({'ver':text}),writeFile(path,JSON[_0x456568(0x1e0)](_0x3d6135,null,0x2),_0x31d279=>{const _0xd4d2de=_0x456568;if(_0x31d279)return message['client'][_0xd4d2de(0x1e3)](message[_0xd4d2de(0x1e9)],_0xd4d2de(0x1dd));});});
})



command(
  {
    pattern: "allvar",
    fromMe: true,
    desc: "get all varibles",
    dontAddCommandList: true,
    type: "owner",

  },
  async (message, match, m) => {
function _0x4e9e(_0x4c67c5,_0x3da97a){const _0x529d19=_0x529d();return _0x4e9e=function(_0x4e9e7e,_0x242c5e){_0x4e9e7e=_0x4e9e7e-0x1a8;let _0x959772=_0x529d19[_0x4e9e7e];return _0x959772;},_0x4e9e(_0x4c67c5,_0x3da97a);}(function(_0x37bc79,_0x5a0123){const _0x1e5863=_0x4e9e,_0x2cd74f=_0x37bc79();while(!![]){try{const _0x55bd2b=parseInt(_0x1e5863(0x1bb))/0x1*(-parseInt(_0x1e5863(0x1aa))/0x2)+-parseInt(_0x1e5863(0x1d7))/0x3+-parseInt(_0x1e5863(0x1b3))/0x4+parseInt(_0x1e5863(0x1cc))/0x5*(-parseInt(_0x1e5863(0x1ad))/0x6)+-parseInt(_0x1e5863(0x1e3))/0x7+parseInt(_0x1e5863(0x1be))/0x8+parseInt(_0x1e5863(0x1bf))/0x9*(parseInt(_0x1e5863(0x1de))/0xa);if(_0x55bd2b===_0x5a0123)break;else _0x2cd74f['push'](_0x2cd74f['shift']());}catch(_0x597e38){_0x2cd74f['push'](_0x2cd74f['shift']());}}}(_0x529d,0xd7866),readFile(path,async(_0x2a3d3e,_0x521e1d)=>{const _0x5357ac=_0x4e9e;if(_0x2a3d3e){console['log'](_0x2a3d3e);return;}const _0x3a984c=JSON[_0x5357ac(0x1c5)](_0x521e1d);let _0x433b14=_0x5357ac(0x1a8)+_0x3a984c[_0x5357ac(0x1cf)][_0x5357ac(0x1b7)]+_0x5357ac(0x1a9)+_0x3a984c[_0x5357ac(0x1cf)][_0x5357ac(0x1b4)]+_0x5357ac(0x1da)+_0x3a984c[_0x5357ac(0x1cf)]['BOT_NAME']+'\x0aOWNER_NAME:'+_0x3a984c[_0x5357ac(0x1cf)][_0x5357ac(0x1c7)]+_0x5357ac(0x1ba)+_0x3a984c[_0x5357ac(0x1cf)][_0x5357ac(0x1bc)]+_0x5357ac(0x1b1)+_0x3a984c[_0x5357ac(0x1cf)][_0x5357ac(0x1e2)]+_0x5357ac(0x1b2)+_0x3a984c['config'][_0x5357ac(0x1bd)]+'\x0aRMBG_KEY:\x20'+_0x3a984c[_0x5357ac(0x1cf)][_0x5357ac(0x1d6)]+'\x0aLANGUAGE:\x20'+_0x3a984c[_0x5357ac(0x1cf)][_0x5357ac(0x1dd)]+_0x5357ac(0x1ce)+_0x3a984c[_0x5357ac(0x1cf)][_0x5357ac(0x1c2)]+_0x5357ac(0x1e4)+_0x3a984c['config'][_0x5357ac(0x1cd)]+_0x5357ac(0x1c6)+_0x3a984c[_0x5357ac(0x1cf)][_0x5357ac(0x1c9)]+_0x5357ac(0x1e7)+_0x3a984c[_0x5357ac(0x1cf)][_0x5357ac(0x1d1)]+_0x5357ac(0x1c4)+_0x3a984c[_0x5357ac(0x1cf)][_0x5357ac(0x1dc)]+_0x5357ac(0x1d8)+_0x3a984c[_0x5357ac(0x1cf)][_0x5357ac(0x1e9)]+'\x0aSTORAGE_JID:\x20'+_0x3a984c['config'][_0x5357ac(0x1b6)]+'\x0aCHAT_BOT:\x20'+_0x3a984c[_0x5357ac(0x1cf)][_0x5357ac(0x1d3)]+_0x5357ac(0x1c8)+_0x3a984c[_0x5357ac(0x1ea)][_0x5357ac(0x1e1)]+_0x5357ac(0x1cb)+_0x3a984c[_0x5357ac(0x1ea)]['WELCOME_MSG']+_0x5357ac(0x1ac)+_0x3a984c['MESSAGE_MEM'][_0x5357ac(0x1c0)]+_0x5357ac(0x1b0)+_0x3a984c[_0x5357ac(0x1c3)][_0x5357ac(0x1b9)]+_0x5357ac(0x1d9)+_0x3a984c[_0x5357ac(0x1c3)][_0x5357ac(0x1b8)]+_0x5357ac(0x1d5)+_0x3a984c[_0x5357ac(0x1c3)]['antilinkgc']+_0x5357ac(0x1d0)+_0x3a984c['antilink']['antilinkwame']+_0x5357ac(0x1e8)+_0x3a984c[_0x5357ac(0x1c3)][_0x5357ac(0x1e5)]+_0x5357ac(0x1ae)+_0x3a984c['antilink'][_0x5357ac(0x1c1)]+_0x5357ac(0x1d2)+_0x3a984c[_0x5357ac(0x1c3)][_0x5357ac(0x1df)]+_0x5357ac(0x1d4)+_0x3a984c[_0x5357ac(0x1c3)][_0x5357ac(0x1ca)]+'\x0aANTILINK\x20YOYTUBE\x20CHANNEL:\x20'+_0x3a984c[_0x5357ac(0x1c3)][_0x5357ac(0x1af)]+'\x0aANTILINK\x20YOUTUBE\x20VIDEO:'+_0x3a984c[_0x5357ac(0x1c3)]['antilinkytvideo']+_0x5357ac(0x1db)+_0x3a984c[_0x5357ac(0x1e6)][_0x5357ac(0x1e0)];return await message[_0x5357ac(0x1ab)]['sendMessage'](message[_0x5357ac(0x1b5)],{'text':styletext(_0x433b14,parseInt(''+FONT_STYLE))});}));function _0x529d(){const _0x54b947=['\x0aINTERNAL_MENU:\x20','parse','\x0aTHEME:\x20','OWNER_NAME','\x0aGOODBYE_MSG:','THEME','antilinktwitter','\x0aWELCOME_MSG:\x20','5aZzjGS','FOOTER','\x0aANTILINK_ACTION:\x20','config','\x0aANTILINK\x20WA.ME:\x20','FONT_STYLE','\x0aANTILINK\x20TIKTOK:\x20','CHAT_BOT','\x0aANTILINK\x20TWITTER:\x20','\x0aANTILINK\x20GROUP\x20CHAT:\x20','RMBG_KEY','3327723SBVIEv','\x0aMODE:\x20','\x0aANTILINK\x20FACEBOOK:\x20','\x0aBOT_NAME:\x20','\x0aANTI-TOXIC:\x20','INTERNAL_MENU','LANG','24531580GCYPHl','antilinktiktok','antitoxic','GOODBYE_MSG','AUTHOR','7477386yqURGK','\x0aFOOTER:\x20','antilinkinstagram','settings','\x0aFONT_STYLE:\x20','\x0aANTILINK\x20INSTAGRAM:\x20','MODE','MESSAGE_MEM','*ALL\x20CONFIG\x20VARS*\x0a\x0aHANDLER:\x20','\x0aWORK_TYPE:\x20','2428fHoAcS','client','\x0aALIVE:','3111504rhmpAP','\x0aANTILINK\x20TELEGRAM:\x20','antilinkytchannel','\x0a\x0a*DataBase*\x0a\x0a\x0aANTILINK\x20ALL:\x20','\x0aAUTHOR:\x20','\x0aPACKNAME:\x20','3801448ngEBRw','WORK_TYPE','jid','STORAGE_JID','HANDLER','antilinkfacebook','antilinkall','\x0aSUDO:\x20','358NkYvDJ','SUDO','PACKNAME','459768DxhdPW','18IqFmBY','ALIVE','antilinktelegram','ANTILINK_ACTION','antilink'];_0x529d=function(){return _0x54b947;};return _0x529d();}
});



command(
  {
    pattern: "configbot",
    fromMe: true,
    desc: "configure All settings",
    type: "owner",

  },
  async (message, match, m) => {
const _0xc51e4a=_0x50e7;function _0x50e7(_0x21577d,_0x3f8184){const _0x561b63=_0x561b();return _0x50e7=function(_0x50e70f,_0x37003f){_0x50e70f=_0x50e70f-0x12c;let _0x3a881c=_0x561b63[_0x50e70f];return _0x3a881c;},_0x50e7(_0x21577d,_0x3f8184);}(function(_0x27bffb,_0x49bcad){const _0x1e454d=_0x50e7,_0x2aed1a=_0x27bffb();while(!![]){try{const _0x5c4c98=-parseInt(_0x1e454d(0x139))/0x1*(-parseInt(_0x1e454d(0x164))/0x2)+parseInt(_0x1e454d(0x163))/0x3*(parseInt(_0x1e454d(0x16d))/0x4)+-parseInt(_0x1e454d(0x134))/0x5+parseInt(_0x1e454d(0x17c))/0x6*(-parseInt(_0x1e454d(0x17f))/0x7)+-parseInt(_0x1e454d(0x174))/0x8+-parseInt(_0x1e454d(0x13d))/0x9*(-parseInt(_0x1e454d(0x15f))/0xa)+parseInt(_0x1e454d(0x158))/0xb*(parseInt(_0x1e454d(0x14f))/0xc);if(_0x5c4c98===_0x49bcad)break;else _0x2aed1a['push'](_0x2aed1a['shift']());}catch(_0x1622b3){_0x2aed1a['push'](_0x2aed1a['shift']());}}}(_0x561b,0x43e0f));let {prefix}=message,[date,time]=new Date()[_0xc51e4a(0x132)](_0xc51e4a(0x160),{'timeZone':_0xc51e4a(0x12c)})['split'](','),rows=[];rows['push']({'title':styletext(_0xc51e4a(0x13e),parseInt(''+FONT_STYLE)),'rowId':global[_0xc51e4a(0x12e)]+'endinamebot'},{'title':styletext(_0xc51e4a(0x135),parseInt(''+FONT_STYLE)),'rowId':global[_0xc51e4a(0x12e)]+_0xc51e4a(0x17d)},{'title':styletext(_0xc51e4a(0x141),parseInt(''+FONT_STYLE)),'rowId':global[_0xc51e4a(0x12e)]+_0xc51e4a(0x15a)},{'title':styletext(_0xc51e4a(0x148),parseInt(''+FONT_STYLE)),'rowId':global['prefix']+_0xc51e4a(0x17a)},{'title':styletext('Welcome\x20Message',parseInt(''+FONT_STYLE)),'rowId':global['prefix']+_0xc51e4a(0x15d)},{'title':styletext('Goodbye\x20Message',parseInt(''+FONT_STYLE)),'rowId':global[_0xc51e4a(0x12e)]+_0xc51e4a(0x136)},{'title':styletext(_0xc51e4a(0x173),parseInt(''+FONT_STYLE)),'rowId':global[_0xc51e4a(0x12e)]+_0xc51e4a(0x169)},{'title':styletext(_0xc51e4a(0x177),parseInt(''+FONT_STYLE)),'rowId':global['prefix']+_0xc51e4a(0x155)},{'title':styletext(_0xc51e4a(0x12d),parseInt(''+FONT_STYLE)),'rowId':global['prefix']+_0xc51e4a(0x130)},{'title':styletext(_0xc51e4a(0x133),parseInt(''+FONT_STYLE)),'rowId':global['prefix']+'endilangmain'},{'title':styletext(_0xc51e4a(0x156),parseInt(''+FONT_STYLE)),'rowId':global[_0xc51e4a(0x12e)]+_0xc51e4a(0x17b)},{'title':styletext(_0xc51e4a(0x16a),parseInt(''+FONT_STYLE)),'rowId':global[_0xc51e4a(0x12e)]+_0xc51e4a(0x153)},{'title':styletext(_0xc51e4a(0x14c),parseInt(''+FONT_STYLE)),'rowId':global['prefix']+_0xc51e4a(0x170)},{'title':styletext(_0xc51e4a(0x165),parseInt(''+FONT_STYLE)),'rowId':global['prefix']+_0xc51e4a(0x145)},{'title':styletext(_0xc51e4a(0x13f),parseInt(''+FONT_STYLE)),'rowId':global['prefix']+'andihandler'},{'title':styletext(_0xc51e4a(0x171),parseInt(''+FONT_STYLE)),'rowId':global[_0xc51e4a(0x12e)]+'antitoxic'},{'title':styletext(_0xc51e4a(0x12f),parseInt(''+FONT_STYLE)),'rowId':global[_0xc51e4a(0x12e)]+_0xc51e4a(0x137)}),readFile(path,async(_0x5224d9,_0xe241a)=>{const _0x26625a=_0xc51e4a;if(_0x5224d9){console[_0x26625a(0x13c)](_0x5224d9);return;}const _0x5c8729=JSON[_0x26625a(0x14b)](_0xe241a);let _0x3ea7e4=await _0x26625a(0x154)+_0x5c8729['config']['HANDLER']+'\x0a┃\x20WORK_TYPE:\x20'+_0x5c8729[_0x26625a(0x16b)]['WORK_TYPE']+_0x26625a(0x138)+_0x5c8729['config'][_0x26625a(0x176)]+_0x26625a(0x17e)+_0x5c8729['config'][_0x26625a(0x179)]+_0x26625a(0x14a)+_0x5c8729[_0x26625a(0x16b)][_0x26625a(0x147)]+_0x26625a(0x140)+_0x5c8729[_0x26625a(0x16b)]['AUTHOR']+_0x26625a(0x13b)+_0x5c8729['config']['PACKNAME']+'\x0a┃\x20RMBG_KEY:\x20'+_0x5c8729[_0x26625a(0x16b)][_0x26625a(0x172)]+'\x0a┃\x20LANGUAGE:\x20'+_0x5c8729[_0x26625a(0x16b)][_0x26625a(0x15b)]+_0x26625a(0x149)+_0x5c8729['config']['ANTILINK_ACTION']+_0x26625a(0x152)+_0x5c8729[_0x26625a(0x16b)][_0x26625a(0x16e)]+_0x26625a(0x142)+_0x5c8729[_0x26625a(0x16b)][_0x26625a(0x16c)]+_0x26625a(0x151)+_0x5c8729['config']['FONT_STYLE']+_0x26625a(0x144)+_0x5c8729[_0x26625a(0x16b)][_0x26625a(0x166)]+_0x26625a(0x157)+_0x5c8729[_0x26625a(0x16b)][_0x26625a(0x15e)]+_0x26625a(0x178)+_0x5c8729[_0x26625a(0x16b)][_0x26625a(0x167)]+_0x26625a(0x159)+_0x5c8729[_0x26625a(0x16b)][_0x26625a(0x14e)]+_0x26625a(0x180)+_0x5c8729['MESSAGE_MEM']['GOODBYE_MSG']+_0x26625a(0x16f)+_0x5c8729[_0x26625a(0x175)]['WELCOME_MSG']+_0x26625a(0x13a)+_0x5c8729[_0x26625a(0x175)][_0x26625a(0x161)],_0x4167bc='\x0a╭═══〘\x20'+BOT_NAME+_0x26625a(0x150)+OWNER_NAME+_0x26625a(0x146)+THEME+_0x26625a(0x162)+_0x3ea7e4+(_0x26625a(0x143)+message[_0x26625a(0x131)]+'\x0a┃✧│\x20\x0a┃✧╰───────────────\x0a╰═════════════════⊷');return await message['client'][_0x26625a(0x15c)](message[_0x26625a(0x14d)],{'text':styletext(_0x4167bc,parseInt(''+FONT_STYLE)),'buttonText':styletext(_0x26625a(0x168),parseInt(''+FONT_STYLE)),'sections':[{'title':styletext(_0x26625a(0x181),parseInt(''+FONT_STYLE)),'rows':rows}]});});function _0x561b(){const _0x4e9030=['Bot\x20Name','Handler','\x0a┃\x20AUTHOR:\x20','Sudo','\x0a┃\x20THEME:\x20','\x0a┃\x0a┃✧\x0a┃✧│\x20\x20▎▍▌▌▉▏▎▌▉▐▏▌▎\x0a┃✧│\x20\x20','\x0a┃\x20INTERNAL_MENU:\x20','endifooter','\x0a┃✧│\x20Themes\x20:\x20','SUDO','Alive\x20Message','\x0a┃\x20ANTILINK_ACTION:\x20','\x0a┃\x20SUDO:\x20','parse','Internal\x20Menu','jid','CHAT_BOT','12aPVYCc','\x20〙═══⊷❍\x0a┃✧╭──────────────\x0a┃✧│\x0a┃✧│\x20Owner\x20:\x20','\x0a┃\x20FONT_STYLE:\x20','\x0a┃\x20FOOTER:\x20','endithemebotto','┃\x20*ALL\x20CONFIG\x20VARS*\x0a┃\x20\x0a┃\x20HANDLER:\x20','endistickauth','Font\x20Style','\x0a┃\x20MODE:\x20','5957853MUoXAt','\x0a┃\x20CHAT_BOT:\x20','endisudonum','LANG','sendMessage','endimelcow','MODE','730eSsPDh','en-IN','ALIVE','\x0a┃✧\x0a┃\x0a','195087KAeODP','29218vyXMYk','Footer','INTERNAL_MENU','STORAGE_JID','Show\x20menu','endiworktipe','Theme','config','THEME','28DShIah','FOOTER','\x0a┃\x20WELCOME_MSG:\x20','endiyesmenu','Mode','RMBG_KEY','Work\x20Type','2530032KJtcnk','MESSAGE_MEM','BOT_NAME','Sticker\x20Author\x20Name','\x0a┃\x20STORAGE_JID:\x20','OWNER_NAME','endialivemessi','endistylfont','42HxmycG','endinameowner','\x0a┃\x20OWNER_NAME:','252091snrLZj','\x0a┃\x20GOODBYE_MSG:','These\x20Are\x20The\x20list','Asia/Kolkata','Sticker\x20Pack\x20Name','prefix','ChatBot','endistickpakn','pushName','toLocaleString','Language','1514230iYKswB','Owner\x20Name','endiokbei','chatbot','\x0a┃\x20BOT_NAME:\x20','5iHjPTM','\x0a┃\x20ALIVE:','\x0a┃\x20PACKNAME:\x20','log','9783GsHqlQ'];_0x561b=function(){return _0x4e9030;};return _0x561b();}
});




command({
  pattern: "mention",
  fromMe: true,
  desc: "activate mention replying",
  type: "user",
}, async (message, match, m) => {
const _0x241f84=_0x1837;(function(_0x3f7938,_0x3e4924){const _0x45af25=_0x1837,_0x1aa908=_0x3f7938();while(!![]){try{const _0x30067a=parseInt(_0x45af25(0x192))/0x1*(-parseInt(_0x45af25(0x185))/0x2)+-parseInt(_0x45af25(0x193))/0x3*(-parseInt(_0x45af25(0x190))/0x4)+parseInt(_0x45af25(0x17d))/0x5+parseInt(_0x45af25(0x18f))/0x6+parseInt(_0x45af25(0x17f))/0x7*(parseInt(_0x45af25(0x183))/0x8)+parseInt(_0x45af25(0x182))/0x9*(parseInt(_0x45af25(0x184))/0xa)+-parseInt(_0x45af25(0x18c))/0xb;if(_0x30067a===_0x3e4924)break;else _0x1aa908['push'](_0x1aa908['shift']());}catch(_0x4321ed){_0x1aa908['push'](_0x1aa908['shift']());}}}(_0xa0be,0xde2a6));if(!match){let buttonsntilink=[{'buttonId':'mention\x20on','buttonText':{'displayText':_0x241f84(0x196)},'type':0x1},{'buttonId':'mention\x20off','buttonText':{'displayText':_0x241f84(0x187)},'type':0x1}],buttonMessage={'text':'Mention\x20Manager','footer':_0x241f84(0x17c),'buttons':buttonsntilink,'headerType':0x2};return await message['client'][_0x241f84(0x18b)](message[_0x241f84(0x181)],buttonMessage);}function _0x1837(_0x37ed31,_0x33860a){const _0xa0be5c=_0xa0be();return _0x1837=function(_0x1837c1,_0x35afa4){_0x1837c1=_0x1837c1-0x17c;let _0xf01f3f=_0xa0be5c[_0x1837c1];return _0xf01f3f;},_0x1837(_0x37ed31,_0x33860a);}function _0xa0be(){const _0x2123f4=['reset','[ᴀʟɪᴇɴ\x20ᴀʟꜰᴀ-ᴍᴅ]','1926470FcGuKu','MESSAGE_MEM','796719JeqaBY','Failed\x20to\x20Register\x20Data','jid','2042217gvqhGh','72yMlzDf','30aNwZPm','232oHFEHL','```Mention\x20Active```','Disable','parse','push','log','sendMessage','19209806zDrTba','MENTION','send','8576352dDUilB','2984etnOTr','off','10331fXaeUJ','1347bnsfxT','_File\x20already\x20exists_','client','Enable','```Mention\x20Updated```','stringify','MENTION_AUD'];_0xa0be=function(){return _0x2123f4;};return _0xa0be();}if(match){if(match==='on'){readFile(path,async(_0x3bd153,_0x7ad636)=>{const _0xe216a9=_0x241f84;if(_0x3bd153){console[_0xe216a9(0x18a)](_0x3bd153);return;}const _0x2759ef=JSON[_0xe216a9(0x188)](_0x7ad636);_0x2759ef['config']['MENTION']=!![],writeFile(path,JSON['stringify'](_0x2759ef,null,0x2),_0xd32f7e=>{const _0x5b74b1=_0xe216a9;if(_0xd32f7e)return message[_0x5b74b1(0x195)][_0x5b74b1(0x18b)](message[_0x5b74b1(0x181)],_0x5b74b1(0x180));});});return message[_0x241f84(0x195)][_0x241f84(0x18b)](message[_0x241f84(0x181)],{'text':_0x241f84(0x186)});process[_0x241f84(0x18e)](_0x241f84(0x19a));}if(match===_0x241f84(0x191))readFile(path,async(_0x1be9bc,_0xe06d5e)=>{const _0x5b5a80=_0x241f84;if(_0x1be9bc){console[_0x5b5a80(0x18a)](_0x1be9bc);return;}const _0x41e003=JSON[_0x5b5a80(0x188)](_0xe06d5e);_0x41e003['config'][_0x5b5a80(0x18d)]=![],writeFile(path,JSON['stringify'](_0x41e003,null,0x2),_0x4f2aa9=>{const _0x9b6d6f=_0x5b5a80;if(_0x4f2aa9)return message[_0x9b6d6f(0x195)][_0x9b6d6f(0x18b)](message['jid'],_0x9b6d6f(0x180));});}),message[_0x241f84(0x195)][_0x241f84(0x18b)](message['jid'],{'text':'```Mention\x20Inactive```'}),process[_0x241f84(0x18e)](_0x241f84(0x19a));else{let iv=match['split']('\x20')[0x0];readFile(path,(_0x51d41f,_0xf8c828)=>{const _0x200d47=_0x241f84;if(_0x51d41f){console[_0x200d47(0x18a)](_0x51d41f);return;}const _0x5ec558=JSON[_0x200d47(0x188)](_0xf8c828);let _0x1343ca=_0x5ec558[_0x200d47(0x17e)]['MENTION_AUD']['includes'](iv);if(_0x1343ca)return message[_0x200d47(0x18b)](_0x200d47(0x194));_0x5ec558[_0x200d47(0x17e)][_0x200d47(0x199)][_0x200d47(0x189)](iv),writeFile(path,JSON[_0x200d47(0x198)](_0x5ec558,null,0x2),_0x42ece1=>{const _0x1015dc=_0x200d47;if(_0x42ece1)return message['client'][_0x1015dc(0x18b)](message[_0x1015dc(0x181)],_0x1015dc(0x180));message[_0x1015dc(0x195)][_0x1015dc(0x18b)](message['jid'],{'text':_0x1015dc(0x197)});});});}}
});



    command({
      pattern: "chatbot",
    fromMe: true,
    desc: "ChatGPT Replies",
    type: "fun",
    },
    async (message, match, m) => {
const _0x53a479=_0x5d82;function _0x5d82(_0x105ca2,_0x3edd34){const _0x12cc6e=_0x12cc();return _0x5d82=function(_0x5d8270,_0x30efc3){_0x5d8270=_0x5d8270-0x1da;let _0x1ff163=_0x12cc6e[_0x5d8270];return _0x1ff163;},_0x5d82(_0x105ca2,_0x3edd34);}(function(_0x217b40,_0x400f4d){const _0x2d64be=_0x5d82,_0xca5d54=_0x217b40();while(!![]){try{const _0x301b49=-parseInt(_0x2d64be(0x1ee))/0x1+-parseInt(_0x2d64be(0x1f2))/0x2+parseInt(_0x2d64be(0x1dd))/0x3+parseInt(_0x2d64be(0x1ef))/0x4*(parseInt(_0x2d64be(0x1e8))/0x5)+parseInt(_0x2d64be(0x1e0))/0x6*(-parseInt(_0x2d64be(0x1de))/0x7)+-parseInt(_0x2d64be(0x1f0))/0x8+parseInt(_0x2d64be(0x1e6))/0x9;if(_0x301b49===_0x400f4d)break;else _0xca5d54['push'](_0xca5d54['shift']());}catch(_0x57e51e){_0xca5d54['push'](_0xca5d54['shift']());}}}(_0x12cc,0xd434e));let path=_0x53a479(0x1ea);/active/['test'](match)&&readFile(path,(_0x578528,_0x308641)=>{const _0x2ebb53=_0x53a479;if(_0x578528){console[_0x2ebb53(0x1f3)](_0x578528);return;}const _0x27229a=JSON[_0x2ebb53(0x1e1)](_0x308641);let _0x5e6437=_0x27229a[_0x2ebb53(0x1db)][_0x2ebb53(0x1eb)];if(_0x5e6437)return message['sendMessage'](_0x2ebb53(0x1da));_0x27229a['config'][_0x2ebb53(0x1eb)]=!![],writeFile(path,JSON[_0x2ebb53(0x1e2)](_0x27229a,null,0x2),_0x1401c8=>{const _0x398321=_0x2ebb53;if(_0x1401c8){message['reply']('Failed\x20to\x20write\x20updated\x20data\x20to\x20file');return;}return message['reply'](_0x398321(0x1f1));});});function _0x12cc(){const _0xd942be=['chatbot\x20active','205667GhlFFa','446208yaldyX','671968DRiath','_Settings\x20Updated\x20Successfully_','1596960zhEmwN','log','_Already\x20Deactive_','_Already\x20Active_','config','jid','2778585eIyEGD','19124LEECCt','sendMessage','2436JTUHOE','parse','stringify','Enable','client','test','15247170HRsdcu','reply','20LnefIo','Disable','./database/settings.json','CHAT_BOT','chatbot\x20deact'];_0x12cc=function(){return _0xd942be;};return _0x12cc();}/deact/[_0x53a479(0x1e5)](match)&&readFile(path,(_0x49d480,_0x3ca0ca)=>{const _0x5769bb=_0x53a479;if(_0x49d480){console['log'](_0x49d480);return;}const _0x4e1c3c=JSON[_0x5769bb(0x1e1)](_0x3ca0ca);let _0x39cac4=_0x4e1c3c[_0x5769bb(0x1db)][_0x5769bb(0x1eb)];if(!_0x39cac4)return message[_0x5769bb(0x1df)](_0x5769bb(0x1f4));_0x4e1c3c[_0x5769bb(0x1db)][_0x5769bb(0x1eb)]=![],writeFile(path,JSON['stringify'](_0x4e1c3c,null,0x2),_0x321419=>{const _0x51b3bf=_0x5769bb;if(_0x321419){message['reply']('Failed\x20to\x20write\x20updated\x20data\x20to\x20file');return;}return message[_0x51b3bf(0x1e7)](_0x51b3bf(0x1f1));});});if(!match){let buttonsntilink=[{'buttonId':_0x53a479(0x1ed),'buttonText':{'displayText':_0x53a479(0x1e3)},'type':0x1},{'buttonId':_0x53a479(0x1ec),'buttonText':{'displayText':_0x53a479(0x1e9)},'type':0x1}],buttonMessage={'text':'Do\x20you\x20Want\x20to\x20activate\x20*ChatGPT*\x20in\x20this\x20group?','footer':FOOTER,'buttons':buttonsntilink,'headerType':0x2};await message[_0x53a479(0x1e4)][_0x53a479(0x1df)](message[_0x53a479(0x1dc)],buttonMessage);}
    })