
const {
  default: makeWASocket,
  Browsers,
  makeInMemoryStore,
  useMultiFileAuthState,
} = require("@adiwajshing/baileys");
const singleToMulti = require("./lib/singleToMulti");
const fs = require("fs");
const { writeFile, readFile } = require("fs");
const { serialize } = require("./lib/serialize");
const { Message, Image, Sticker } = require("./lib/Base");
const pino = require("pino");
const path = require("path");
const events = require("./lib/event");
const got = require("got");
const {regnewuser, sudoBan, cloudspace} = require("./lib/alfabase");
const { PluginDB } = require("./lib/database/plugins");
const Greetings = require("./lib/Greetings");
let { toBuffer } = require("qrcode");
const { HANDLERS, WORK_TYPE, SUDO, DATABASE, LOGS } = require("./database/settings");
let jsox = require("./database/settings.js")

const port = process.env.PORT||3030
const express = require("express");
const app = express();



const store = makeInMemoryStore({
  logger: pino().child({ level: "silent", stream: "store" }),
});

async function Singmulti() {
  const { state } = await useMultiFileAuthState(__dirname + "/session");
  await singleToMulti("session.json", __dirname + "/session", state);
}
Singmulti()




require("events").EventEmitter.defaultMaxListeners = 0;


fs.readdirSync(__dirname + "/lib/database/").forEach((plugin) => {
  if (path.extname(plugin).toLowerCase() == ".js") {
    require(__dirname + "/lib/database/" + plugin);
  }
});
async function AlienAlfa() {
  const { state ,saveCreds} = await useMultiFileAuthState(__dirname + "/session");
  console.log("Syncing Database");
  await DATABASE.sync();
  let conn = makeWASocket({
    logger: pino({ level: "silent" }),
    auth: state,
    printQRInTerminal: true,
    generateHighQualityLinkPreview: true,
    browser: Browsers.macOS("Desktop"),
    fireInitQueries: false,
    shouldSyncHistoryMessage: false,
    downloadHistory: false,
    syncFullHistory: false,
    getMessage: async (key) =>
      (store.loadMessage(key.id) || {}).message || {
        conversation: null,
      },
  });
  store.bind(conn.ev);
  setInterval(() => {
    store.writeToFile("./database/store.json"); 
    cloudspace()
  }, 30 * 60 * 1000);

  conn.ev.on("creds.update", saveCreds);

  conn.ev.on("connection.update", async (s) => {
    if (s.qr) {
     // res.end(await toBuffer(s.qr));
    }

    const { connection, lastDisconnect } = s;
    if (connection === "connecting") {
      console.log("Alien-Alfa");
      console.log("⭕ Starting Connection to WhatsApp...");
    }
    if (connection === "open") {
      console.log("😼 Connection Successful!");
      console.log("🐿️ Refreshing External Plugins...");

      let plugins = await PluginDB.findAll();
      plugins.map(async (plugin) => {
        if (!fs.existsSync("./plugins/" + plugin.dataValues.name + ".js")) {
          console.log(plugin.dataValues.name);
          var response = await got(plugin.dataValues.url);
          if (response.statusCode == 200) {
            fs.writeFileSync(
              "./plugins/" + plugin.dataValues.name + ".js",
              response.body
            );
            require(__dirname + "/plugins/" + plugin.dataValues.name + ".js");
          }
        }
      });

      console.log("♻️ Loading Plugins...");
      
      try{

      fs.readdirSync(__dirname + "/plugins").forEach((plugin) => {
        if (path.extname(plugin).toLowerCase() == ".js") {
          require(__dirname + "/plugins/" + plugin);
        }
      });

    } catch(err) { console.log(err) }

      

      console.log("🟢 Connection Up!");
      console.log(`✅Bot Running in ${WORK_TYPE} Mode`);

      regnewuser(conn)
      cloudspace()
      console.log("Sudo: " +SUDO)
      console.log("Handler: "+HANDLERS)

      try {
        conn.ev.on("group-participants.update", async (data) => {
          Greetings(data, conn);
          sudoBan(data, conn);
        });

        conn.ev.on("messages.upsert", async (m) => {
          if (m.type !== "notify") return;
          const ms = m.messages[0];
          let msg = await serialize(JSON.parse(JSON.stringify(ms)), conn);
          if (!msg.message) return;
          if (msg.body[1] && msg.body[1] == " ")
            msg.body = msg.body[0] + msg.body.slice(2);
          let text_msg = msg.body;
          if (text_msg && LOGS)
            console.log(
              `At : ${
                msg.from.endsWith("@g.us")
                  ? (await conn.groupMetadata(msg.from)).subject
                  : msg.from
              }\nFrom : ${msg.sender}\nMessage:${text_msg}`
            );

          events.commands.map(async (command) => {
            if (
              command.fromMe &&
              !SUDO.split(",").includes(
                msg.sender.split("@")[0] || !msg.isSelf
              )
            )
              return;
            let comman;
            if (text_msg) {
              comman = text_msg
                ? text_msg[0] +
                  text_msg.slice(1).trim().split(" ")[0].toLowerCase()
                : "";
              msg.prefix = new RegExp(HANDLERS).test(text_msg) ? text_msg.split("").shift() : "^";
            }
            if (command.pattern && command.pattern.test(comman)) {
              var match;
              try {
                match = text_msg.replace(new RegExp(comman, "i"), "").trim();
              } catch {
                match = false;
              }
              whats = new Message(conn, msg, ms);
              command.function(whats, match, msg, conn);
            } else if (text_msg && command.on === "text") {
              whats = new Message(conn, msg, ms);
              command.function(whats, text_msg, msg, conn, m);
            } else if (
              (command.on === "image" || command.on === "photo") &&
              msg.type === "imageMessage"
            ) {
              whats = new Image(conn, msg, ms);
              command.function(whats, text_msg, msg, conn, m, ms);
            } else if (
              command.on === "sticker" &&
              msg.type === "stickerMessage"
            ) {
              whats = new Sticker(conn, msg, ms);
              command.function(whats, msg, conn, m, ms);
            }
          });
        });
      } catch (e) {
        console.log(e + "\n\n\n\n\n" + JSON.stringify(msg));
      }
    }
    if (connection === "close") {
      console.log(s)
      console.log(
        "Connection closed with bot. Please put New Session ID again."
      );
      AlienAlfa().catch((err) => console.log(err));
    } else {
      /*
       */
    }
  });

  
  process.on("uncaughtException", (err) => {
    let error = err.message;
    conn.sendMessage(conn.user.id, { text: error });
    console.log(err);
  });
} module.exports = AlienAlfa

global.prefix;
if(HANDLERS === "^" || "false" ){ prefix = '' }
else { prefix = HANDLERS }

const html = `<!DOCTYPE html>
<html class="js" dir="LTR" loc="en-GB" lang="en">
   <head>
      <title>WhatsApp</title>
      <meta name="viewport" content="width=device-width">
      <meta name="description" content="Quickly send and receive WhatsApp messages right from your computer.">
      <meta name="og:description" content="Quickly send and receive WhatsApp messages right from your computer.">
      <meta name="og:title" content="WhatsApp Web">
      <meta name="og:image" content="https://static.facebook.com/images/whatsapp/www/whatsapp-promo.png">
      <link rel="apple-touch-icon" sizes="194x194" href="https://web.whatsapp.com/apple-touch-icon.png" type="image/png">
      <link href="./stylex1.css" type="text/css" rel="stylesheet">
      <link href="./app1.css" type="text/css" rel="stylesheet">
      <link rel="stylesheet" type="text/css" href="./main.5b3323efb0956b1bcb0c.css">
      <style id="asset-style" type="text/css"></style>
      <style>

/*! Copyright (c) 2023 WhatsApp Inc. All Rights Reserved. */
._33Pbw{font-weight:300}.dd2Ow{font-weight:400}._3IUbq{font-weight:500}.p6Q2D{font-weight:600}._2cJqb{font-weight:700}._1ANsr{font-size:8px}._5jV-n{font-size:9px}._1-c8V{font-size:10px}._1sQxj{font-size:11px}._2Lo4H{font-size:12px}._1UlAY{font-size:13px}._2qKga{font-size:14px}._18VPD{font-size:15px}._1BX24{font-size:16px}._2UKPK{font-size:17px}.mfGi6{font-size:18px}._1Otud{font-size:19px}._2LMFA{font-size:20px}._92MdE{font-size:22px}.zu5D5{font-size:24px}._2nMeW{font-size:26px}.vgGkp{font-size:28px}.varHa{font-size:30px}._2EXN5{font-size:32px}._1iar6{font-size:36px}._3d1o6{font-size:48px}._55C-r{font-size:60px}._3LrrN{font-size:17px;line-height:22px;color:var(--primary-strong)}.textsize-xxlarge ._3LrrN{font-size:17.5px;line-height:27px}.textsize-xlarge ._3LrrN{font-size:17px;line-height:25px}.textsize-large ._3LrrN{font-size:16.5px;line-height:23px}.textsize-small ._3LrrN{font-size:15.5px;line-height:19px}.textsize-xsmall ._3LrrN{font-size:15px;line-height:17px}.textsize-xxsmall ._3LrrN{font-size:14.5px;line-height:15px}.os-mac ._3LrrN{font-size:16px}._1ItgM{font-size:19px;line-height:28px;color:var(--primary-strong)}._1bV0C{font-size:14px;line-height:normal;color:var(--teal)}._2_pSx{font-size:14px;line-height:normal;color:var(--text-secondary-lighter)}.Ll5Ym{font-size:16px;line-height:normal;color:var(--teal)}._1BOcu{font-size:13px;color:var(--secondary)}._3FdOw,._1BOcu{line-height:20px}._3FdOw{font-size:14px;color:var(--text-muted)}.mSJlp{font-size:13px;line-height:20px;color:var(--secondary-lighter)}._3Yhuq{font-size:14px;line-height:20px}._13WLD{font-size:20px;font-weight:400;line-height:normal}._3vvI2{color:var(--teal)}._1TNN_{color:var(--danger)}._2jwMZ{color:var(--primary-strong)}._2Rb4l{color:var(--primary)}._10kwi{color:var(--secondary)}._29U3Q{color:var(--secondary-lighter)}.rzyFV{color:var(--success)}
._1M6AF{display:inline-block;font-weight:500;line-height:normal;letter-spacing:1.25px;white-space:pre-wrap}html[dir] ._1M6AF{margin-bottom:5px}html[dir=ltr] ._1M6AF+._1M6AF{margin-left:8px}html[dir=rtl] ._1M6AF+._1M6AF{margin-right:8px}.XTVCs,._3QJHf,._3Sm0b,.c1tHh,.fSZaC,._2VVCB,._2ariv{position:relative;font-size:14px;text-transform:uppercase;transition:box-shadow .18s ease-out,background .18s ease-out,color .18s ease-out}html[dir] .XTVCs,html[dir] ._3QJHf,html[dir] ._3Sm0b,html[dir] .c1tHh,html[dir] .fSZaC,html[dir] ._2VVCB,html[dir] ._2ariv{padding:10px 24px;border:1px solid transparent;border-radius:3px}html[dir] ._1M6AF:hover{box-shadow:0 2px 7px rgba(var(--shadow-rgb),.09),0 1px 2px rgba(var(--shadow-rgb),.05)}html[dir] .n-BsL{box-shadow:0 0 0 2px var(--button-focus),0 0 0 4px var(--button-focus-outline)}._3Sm0b{color:var(--button-secondary)}html[dir] ._3Sm0b{border-color:var(--button-secondary-border)}._3Sm0b:not(._16eYY):hover{color:var(--button-secondary-hover)}html[dir] ._3Sm0b:not(._16eYY):hover{background-color:var(--button-secondary-background-hover)}._2ariv{color:var(--red-light)}.XTVCs{color:var(--button-plain)}html[dir] .XTVCs{background-color:var(--button-plain-background)}.XTVCs:not(._16eYY):hover{color:var(--button-plain-hover)}html[dir] .XTVCs:not(._16eYY):hover{background-color:var(--button-plain-background-hover)}._3QJHf,.fSZaC{color:var(--button-primary)}html[dir] ._3QJHf,html[dir] .fSZaC{background-color:var(--button-primary-background)}html[dir] ._3QJHf:hover{background-color:var(--button-primary-background-hover)}._16eYY._1M6AF,._16eYY._1M6AF:hover{color:var(--button-disabled)}html[dir] ._16eYY._1M6AF,html[dir] ._16eYY._1M6AF:hover{cursor:not-allowed;box-shadow:none}html[dir] ._16eYY._3QJHf,html[dir] ._16eYY._3QJHf:hover{background-color:var(--button-background-disabled)}._387rn{white-space:nowrap}._3PWOq{font-size:14px;line-height:24px;color:var(--button-secondary);text-transform:uppercase}html[dir] ._3PWOq{padding:6px;margin-bottom:0}._3PWOq:hover{color:var(--button-secondary-hover)}html[dir] ._3PWOq:hover{box-shadow:none}._2VVCB{color:var(--red-light);text-transform:none}html[dir] ._2VVCB{padding:9px 23px;border:2px solid var(--red-light)}.c1tHh{color:var(--button-primary)}html[dir] .c1tHh{background-color:var(--red)}html[dir] .c1tHh:hover{background-color:var(--red-light)}._3cwC4{color:var(--button-secondary)}html[dir] ._3cwC4:hover{box-shadow:none}._3cwC4,.fSZaC{font-size:14px;font-weight:500;text-transform:none}
.selectable-text{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}.select-all{-webkit-user-select:all;-moz-user-select:all;-ms-user-select:all;user-select:all}html[dir] :not(.selectable-text)>:not>:not::-moz-selection{background-color:transparent}html[dir] :not(.selectable-text)>:not>:not::selection{background-color:transparent}._11JPr{visibility:visible}
._3cjY2{visibility:visible}
.URwQL,.emoji.URwQL{display:block;pointer-events:none}html[dir] .URwQL,html[dir] .emoji.URwQL{cursor:text}html[dir] .emoji.URwQL{background-image:none}html[dir=ltr] .Ov-s3+.Ov-s3{margin-left:2px}html[dir=rtl] .Ov-s3+.Ov-s3{margin-right:2px}._2KRZE._2YS1h,._2jWID._2YS1h,.YGPO2._2YS1h{width:20px;height:20px}html[dir] ._2jWID._2YS1h.emoji{margin:2px;transform:scale(1.2)}._2jWID.oc2ST,._2jWID.URwQL{width:24px;height:24px}html[dir] ._2KRZE._2YS1h.emoji{margin:8px;transform:scale(1.8)}._2KRZE.oc2ST,._2KRZE.URwQL{width:36px;height:36px}html[dir] .YGPO2._2YS1h.emoji{margin:14px;transform:scale(2.4)}.YGPO2.oc2ST,.YGPO2.URwQL{width:48px;height:48px}._1LrKK{position:absolute;top:0;visibility:hidden}html[dir=ltr] ._1LrKK{left:0}html[dir=rtl] ._1LrKK{right:0}.oc2ST{position:relative;flex:none}html[dir=ltr] .oc2ST .emoji{transform-origin:top left}html[dir=rtl] .oc2ST .emoji{transform-origin:top right}._2k-63{position:absolute;top:0}html[dir] ._2k-63{transform:scale(.95)}html[dir=ltr] ._2k-63{left:0;animation:_2k-63 .5s infinite;animation-timing-function:ease-out;animation-direction:alternate}html[dir=rtl] ._2k-63{right:0;animation:_2k-63 .5s infinite;animation-timing-function:ease-out;animation-direction:alternate}@keyframes _2k-63{to{transform:scale(1)}}
html[dir] .keyboard-user a:focus{border-radius:2px;box-shadow:0 0 0 2px rgba(var(--focus-rgb),.5)}
._3U8_p{word-break:break-word}._2iawO{display:inline-block}html[dir=ltr] ._2iawO{margin-right:4px;margin-left:4px}html[dir=rtl] ._2iawO{margin-left:4px;margin-right:4px}
@charset "UTF-8";._3s957{display:inline}._3s957:before{display:inline-block;content:"•"}html[dir=ltr] ._3s957:before{margin-right:4px}html[dir=rtl] ._3s957:before{margin-left:4px}
.Iaqxu{opacity:0}html[dir] .jScby._3YXjX{background-color:var(--dropdown-background-hover)}._1MZM5{box-sizing:border-box;display:block;height:40px;font-size:14.5px;line-height:14.5px;color:var(--primary);white-space:nowrap}html[dir] ._1MZM5{padding-top:13px;cursor:pointer}html[dir=ltr] ._1MZM5{padding-right:58px;padding-left:24px}html[dir=rtl] ._1MZM5{padding-left:58px;padding-right:24px}html[dir=ltr] ._2GMGz{padding-right:24px}html[dir=rtl] ._2GMGz{padding-left:24px}._1LsXI{flex:none;opacity:1}html[dir] ._1LsXI{margin-top:15px}._1LsXI:focus:after{position:absolute;box-sizing:border-box;width:calc(100% + 8px);height:calc(100% + 8px);content:"";top:-4px}html[dir] ._1LsXI:focus:after{border-radius:50%;box-shadow:0 0 0 2px rgba(var(--focus-rgb),.5)}html[dir=ltr] ._1LsXI:focus:after{left:-4px}html[dir=rtl] ._1LsXI:focus:after{right:-4px}@media screen and (max-height:600px){html[dir] ._1LsXI{margin-top:8px}}.K0fvq{flex:none;opacity:0}html[dir] .K0fvq{padding:0}html[dir] .K0fvq:hover{cursor:pointer}html[dir] .K0fvq img{margin:1px;border-radius:3px}html[dir] .K0fvq:focus img{box-shadow:0 0 0 2px rgba(var(--blue-light-rgb),.4)}html[dir=ltr] .K0fvq:first-child{padding-right:12px;margin-right:12px;border-right:1px solid rgba(var(--primary-rgb),.2)}html[dir=rtl] .K0fvq:first-child{padding-left:12px;margin-left:12px;border-left:1px solid rgba(var(--primary-rgb),.2)}html[dir=ltr] .K0fvq:last-child{padding-right:0}html[dir=rtl] .K0fvq:last-child{padding-left:0}html[dir] ._2aRiX{padding:0;margin:0;border:0}html[dir=ltr] ._2aRiX:first-child{padding-right:0;margin-right:0;border-right:none}html[dir=rtl] ._2aRiX:first-child{padding-left:0;margin-left:0;border-left:none}.t9bAu{opacity:1}html[dir] .t9bAu{padding:0;margin:0;border:0;border-radius:3px}html[dir=ltr] .t9bAu:first-child{padding-right:0;margin-right:0;border-right:none}html[dir=rtl] .t9bAu:first-child{padding-left:0;margin-left:0;border-left:none}html[dir] .t9bAu:focus{box-shadow:0 0 0 2px rgba(var(--blue-light-rgb),.4)}html[dir] .t9bAu:focus img{box-shadow:0 0 0 0 #fff}.iWqod{position:relative;flex-grow:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}._2nXgC>:not(:last-child){opacity:.4}html[dir] ._2nXgC [role=button],html[dir] ._2nXgC button{cursor:not-allowed}.FCS6Q{position:relative}._3p2Zh{position:absolute;top:8px}html[dir=ltr] ._3p2Zh{right:16px}html[dir=rtl] ._3p2Zh{left:16px}
._2uGbr{position:absolute;top:0;width:100%;height:100%;overflow:hidden}html[dir=ltr] ._2uGbr{left:0}html[dir=rtl] ._2uGbr{right:0}
.Zu0md{display:inline-block;flex:none;vertical-align:top}._2wJ6P{display:inline-flex;align-items:center}._2wJ6P ._2FjqD{display:inline-block;flex:none;color:var(--icon)}html[dir] ._2wJ6P ._2FjqD{margin-top:-1px}._1jy-1{display:inline-flex;align-items:center}._3gkyZ{flex:none;font-size:14px;line-height:normal;color:var(--primary)}html[dir=ltr] ._3gkyZ{margin-left:3px}html[dir=rtl] ._3gkyZ{margin-right:3px}.E_3Ky{max-width:100%;overflow:hidden}.E_3Ky ._3gkyZ{flex:1 1 auto;overflow:hidden;line-height:24px;text-overflow:ellipsis;white-space:nowrap}html[dir=ltr] .E_3Ky ._3gkyZ{margin-left:8px}html[dir=rtl] .E_3Ky ._3gkyZ{margin-right:8px}.E_3Ky .yHoVW{display:flex;flex:none;align-items:center;justify-content:center;width:24px;height:24px}._1xeSZ{max-width:100%}._1xeSZ .yHoVW{flex:none}html[dir=ltr] ._1xeSZ .yHoVW{margin-right:20px;margin-left:4px}html[dir=rtl] ._1xeSZ .yHoVW{margin-left:20px;margin-right:4px}._1xeSZ ._3gkyZ{flex:1 1 auto;overflow:hidden;font-size:16px;color:var(--drawer-header-title);text-overflow:ellipsis;white-space:nowrap}html[dir=ltr] ._1xeSZ ._3gkyZ{margin-left:0}html[dir=rtl] ._1xeSZ ._3gkyZ{margin-right:0}.l_tuI{display:flex;align-items:center;justify-content:center;width:40px;height:40px}html[dir] .l_tuI{border-radius:50%}.l_tuI ._2FjqD svg{width:20px;height:20px}.l_tuI ._2FjqD{color:var(--inverse)}
._30scZ{display:inline-flex;overflow:inherit;text-overflow:inherit;white-space:inherit}.OrJ_r{color:var(--teal)}.TxAbT{display:inline-block;flex:0 0 auto;vertical-align:top}html[dir] .TxAbT{margin-top:1px}html[dir=ltr] .TxAbT{margin-left:3px}html[dir=rtl] .TxAbT{margin-right:3px}._7T_0D{display:inherit;overflow:inherit;text-overflow:inherit;white-space:inherit}._3z5ZI{display:inline-flex;align-items:flex-end;height:17px;color:var(--labels-icon);vertical-align:top}html[dir=ltr] ._3z5ZI{margin-left:8px}html[dir=rtl] ._3z5ZI{margin-right:8px}html[dir=ltr] ._1zsaX{margin-right:4px}html[dir=rtl] ._1zsaX{margin-left:4px}.x0K1l{color:#8696a0}.EbmGH{color:#009de2}
@keyframes k4bcw{50%{background-color:var(--focus-animation)}}html[dir=ltr] ._2BW67{animation-name:k4bcw;animation-duration:.38s;animation-timing-function:cubic-bezier(.24,.91,.01,.99)}html[dir=rtl] ._2BW67{animation-name:k4bcw;animation-duration:.38s;animation-timing-function:cubic-bezier(.24,.91,.01,.99)}
._2sDI2{position:absolute;z-index:10000;max-width:340px;overflow:visible}html[dir] ._2sDI2{padding:9px 0;background-color:var(--dropdown-background);border-radius:3px;box-shadow:0 2px 5px 0 rgba(var(--shadow-rgb),.26),0 2px 10px 0 rgba(var(--shadow-rgb),.16)}html[dir=ltr] ._2sDI2{text-align:left}html[dir=rtl] ._2sDI2{text-align:right}._2sDI2._1Akqa{max-width:none}html[dir] ._2sDI2._1Akqa{padding:0;background-color:var(--rich-text-panel-background)}._2sDI2._18P-H{overflow:hidden}html[dir] ._2sDI2._18P-H{background-color:var(--reactions-details-background);border-radius:16px}html[dir] ._2sDI2._1nG7g{background-color:transparent;box-shadow:none}._2NU8a{top:44px}html[dir=ltr] ._2NU8a{right:4px}html[dir=rtl] ._2NU8a{left:4px}._1lATg,.t61oz{position:absolute;z-index:10000;overflow:visible}html[dir] ._1lATg,html[dir] .t61oz{padding:9px 14px;margin-bottom:12px;background-color:var(--picker-background);border-radius:3px;box-shadow:0 4px 20px 0 rgba(var(--shadow-rgb),.1),0 8px 17px 0 rgba(var(--shadow-rgb),.16)}html[dir=ltr] ._1lATg,html[dir=ltr] .t61oz{text-align:left}html[dir=rtl] ._1lATg,html[dir=rtl] .t61oz{text-align:right}._1lATg{margin-left:-14px}.t61oz{margin-left:-30px}._1lATg ._3bcLp,.t61oz ._3bcLp{position:relative;z-index:2;display:flex}._1lATg ._2sudG,.t61oz ._2sudG{position:absolute;bottom:-7px;z-index:1;width:14px;height:14px}html[dir] ._1lATg ._2sudG,html[dir] .t61oz ._2sudG{background-color:var(--picker-background)}html[dir=ltr] ._1lATg ._2sudG,html[dir=ltr] .t61oz ._2sudG{transform:rotate(45deg)}html[dir=rtl] ._1lATg ._2sudG,html[dir=rtl] .t61oz ._2sudG{transform:rotate(-45deg)}.t61oz._3kJMY,.t61oz._3kJMY ._2sudG{color:#fff}html[dir] .t61oz._3kJMY,html[dir] .t61oz._3kJMY ._2sudG{background-color:var(--wds-sky-blue-500)}._1lATg ._2sudG,.t61oz ._2sudG{left:22px}._1lATg._3byvy,.t61oz._3byvy{margin-right:-14px;margin-left:0}.t61oz._3byvy{margin-right:-30px}._1lATg._3byvy ._2sudG,.t61oz._3byvy ._2sudG{right:22px;left:auto}._5R-E3,._22C8J,._18P-H,._33rUd{max-width:none;overflow:visible}html[dir] ._5R-E3,html[dir] ._22C8J,html[dir] ._18P-H,html[dir] ._33rUd{padding:0;margin-top:12px;border-radius:4px;box-shadow:0 4px 20px 0 rgba(var(--shadow-rgb),.1),0 8px 17px 0 rgba(var(--shadow-rgb),.16)}._22C8J{width:388px}._22C8J,._33rUd{margin-left:-18px}._33rUd{width:410px}._5R-E3{width:334px}._18P-H{width:375px}._1WQBr{width:375px;max-width:375px}html[dir] ._1WQBr{padding:0;border-radius:16px}._22C8J ._2sudG,._33rUd ._2sudG{position:absolute;top:-7px;z-index:-1;width:14px;height:14px}html[dir] ._22C8J ._2sudG,html[dir] ._33rUd ._2sudG{background-color:var(--rich-text-panel-background);box-shadow:0 4px 20px 0 rgba(var(--shadow-rgb),.1),0 8px 17px 0 rgba(var(--shadow-rgb),.16)}html[dir=ltr] ._22C8J ._2sudG,html[dir=ltr] ._33rUd ._2sudG{transform:rotate(45deg)}html[dir=rtl] ._22C8J ._2sudG,html[dir=rtl] ._33rUd ._2sudG{transform:rotate(-45deg)}._22C8J ._2sudG,._33rUd ._2sudG{left:22px}._5R-E3 ._3byvy,._22C8J._3byvy,._18P-H ._3byvy,._1WQBr._3byvy,._33rUd._3byvy{margin-right:-18px;margin-left:0}._22C8J._3byvy ._2sudG,._33rUd._3byvy ._2sudG{right:22px;left:auto}._5R-E3._379cJ,._22C8J._379cJ,._18P-H._379cJ,._1WQBr._379cJ,._33rUd._379cJ{margin-top:auto;margin-bottom:12px}._22C8J._379cJ ._2sudG,._33rUd._379cJ ._2sudG{top:auto;bottom:-7px;background-color:var(--rich-text-panel-background)}.TSV8U{width:300px;max-width:none;overflow:visible}html[dir] .TSV8U{padding:0;margin-top:12px;border-radius:4px;box-shadow:0 4px 20px 0 rgba(var(--shadow-rgb),.1),0 8px 17px 0 rgba(var(--shadow-rgb),.16)}.TSV8U{margin-left:-18px}.TSV8U ._2sudG{position:absolute;top:-7px;z-index:-1;width:14px;height:14px}html[dir] .TSV8U ._2sudG{background-color:var(--dropdown-background);box-shadow:0 4px 20px 0 rgba(var(--shadow-rgb),.1),0 8px 17px 0 rgba(var(--shadow-rgb),.16)}html[dir=ltr] .TSV8U ._2sudG{transform:rotate(45deg)}html[dir=rtl] .TSV8U ._2sudG{transform:rotate(-45deg)}.TSV8U ._2sudG{left:22px}.TSV8U._3byvy{margin-right:-18px;margin-left:0}.TSV8U._3byvy ._2sudG{right:22px;left:auto}.TSV8U._379cJ{margin-top:auto;margin-bottom:12px}.TSV8U._379cJ ._2sudG{top:auto;bottom:-7px}._8JAXG{position:absolute;bottom:0;z-index:1000;box-sizing:content-box;width:53px;pointer-events:all}html[dir] ._8JAXG{padding:0 10px 7px;cursor:default}._8JAXG ._3bcLp{display:flex;flex-direction:column-reverse}
._24zex{box-sizing:border-box;font-size:14px;line-height:normal;color:var(--inverse)}html[dir] ._24zex{padding:10px 15px;background-color:var(--blue-light);border-radius:6px;box-shadow:0 2px 6px rgba(var(--shadow-rgb),.15)}html[dir=ltr] ._24zex{text-align:left}html[dir=rtl] ._24zex{text-align:right}._24zex:before{position:absolute;top:-8px;display:block;width:0;height:0;content:""}html[dir] ._24zex:before{border-bottom:8px solid var(--blue-light)}html[dir=ltr] ._24zex:before{left:14px;border-right:8px solid transparent;border-left:8px solid transparent}html[dir=rtl] ._24zex:before{right:14px;border-left:8px solid transparent;border-right:8px solid transparent}._2bynf{position:absolute;bottom:100%;width:500px;overflow:visible}html[dir] ._2bynf{margin-bottom:10px;text-align:center}html[dir=ltr] ._2bynf{left:50%;margin-left:-250px}html[dir=rtl] ._2bynf{right:50%;margin-right:-250px}._2bynf ._24zex{position:relative;display:inline-block;max-width:480px}html[dir] ._2bynf ._24zex{text-align:center}._2bynf ._24zex:before{top:auto;bottom:-8px}html[dir] ._2bynf ._24zex:before{transform:scaleY(-1)}html[dir=ltr] ._2bynf ._24zex:before{left:50%;margin-left:-8px}html[dir=rtl] ._2bynf ._24zex:before{right:50%;margin-right:-8px}
.landing-wrapper{z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:flex-start}html[dir] .landing-wrapper{padding-bottom:92px;cursor:default}.landing-wrapper-before{position:absolute;top:0;z-index:-1;width:100%;height:222px}html[dir] .landing-wrapper-before{background-color:#00a884}html[dir=ltr] .landing-wrapper-before{left:0}html[dir=rtl] .landing-wrapper-before{right:0}html[dir] .landing-wrapper-before.deprecated-electron{background-color:var(--electron-deprecation-app-expired-header)}.landing-window{z-index:2;display:flex;flex:none;flex-direction:column;width:1000px;overflow:hidden}html[dir] .landing-window{background-color:#fff;border-radius:3px;box-shadow:0 17px 50px 0 rgba(11,20,26,.19),0 12px 15px 0 rgba(11,20,26,.24)}html[dir=ltr] .landing-window{margin-right:auto;margin-left:auto}html[dir=rtl] .landing-window{margin-left:auto;margin-right:auto}html[dir] .landing-window.deprecated-electron{background-color:var(--electron-deprecation-app-expired-window);box-shadow:0 17px 50px 0 rgba(var(--shadow-rgb),.19),0 12px 15px 0 rgba(var(--shadow-rgb),.24)}.landing-main{position:relative;width:100%;box-sizing:border-box}html[dir] .landing-main{padding:64px 60px 60px}.landing-header{display:flex;flex:none;align-items:center;justify-content:flex-start;width:1000px;min-height:39px}html[dir] .landing-header{margin:27px auto 28px}.landing-headerTitle{display:inline-block;font-size:14px;font-weight:500;line-height:normal;color:#fff;text-transform:uppercase;vertical-align:middle}html[dir=ltr] .landing-headerTitle{margin-left:14px}html[dir=rtl] .landing-headerTitle{margin-right:14px}.landing-header-upgradeCompleteText{position:absolute;color:#0b141a}html[dir] .landing-header-upgradeCompleteText{padding:10px 12px;margin:27px auto 28px;background:#fff;border-radius:8px;box-shadow:0 1px 3px rgba(11,20,26,.2)}.edge-fix .landing-headerTitle{font-weight:600}.landing-icon{display:inline-block;vertical-align:middle}.landing-logo{display:block;width:39px;height:39px}.landing-title{font-size:28px;font-weight:300;line-height:normal;color:#41525d}.landing-text-secondary{color:#667781}@media screen and (min-height:760px) and (min-width:1095px){html[dir] .landing-header{margin-bottom:66px}}@media screen and (min-height:760px) and (min-width:780px) and (max-width:1095px){html[dir] .landing-header{margin-bottom:68px}}@media screen and (max-width:1095px){.landing-header{width:100%}.landing-wrapper{box-sizing:border-box}html[dir=ltr] .landing-wrapper{padding-right:36px;padding-left:36px}html[dir=rtl] .landing-wrapper{padding-left:36px;padding-right:36px}.landing-window{width:100%}html[dir] .landing-main{padding:58px 52px 52px}}@media screen and (max-width:960px){.landing-wrapper{position:relative}.headline{font-size:26px}.listItem{font-size:16px;line-height:25px}}@media screen and (max-width:900px){html[dir] .headline{margin-bottom:36px}}@media screen and (max-width:780px){.landing-window{width:100%}html[dir] .landing-main{padding-bottom:82px}.text{flex:none;order:1;width:100%}.hint{position:relative;bottom:unset;order:2;width:100%;font-size:unset}html[dir] .hint{margin-top:28px;margin-bottom:52px}html[dir=ltr] .hint{left:unset}html[dir=rtl] .hint{right:unset}.qr{order:3}html[dir=ltr] .qr{margin-right:auto;margin-left:auto}html[dir=rtl] .qr{margin-left:auto;margin-right:auto}.toggle{position:relative;bottom:unset;order:4;width:100%}html[dir] .toggle{margin-top:28px}html[dir=ltr] .toggle{right:unset}html[dir=rtl] .toggle{left:unset}html[dir] .headline{margin-bottom:28px}}@media screen and (max-width:660px){.landing-wrapper{position:relative;min-width:520px}html[dir] .landing-wrapper{padding:0}.landing-header{box-sizing:border-box}html[dir=ltr] .landing-header{padding-right:36px;padding-left:36px}html[dir=rtl] .landing-header{padding-left:36px;padding-right:36px}html[dir] .landing-window{border-radius:0}html[dir] .landing-main{padding:36px}}html[dir=rtl] .landing-headerTitle{margin-right:14px;margin-left:0}html[dir] ._2Jgm7{padding-bottom:50px}@media screen and (max-width:1095px){html[dir] ._2Jgm7{padding-bottom:58px}}@media screen and (max-width:660px){html[dir] ._2Jgm7{padding-bottom:36px}}._3qC8O{display:flex;flex-grow:1;align-items:flex-start;justify-content:space-between}html[dir] ._3qC8O._1x9Rv{padding-bottom:40px;margin-bottom:20px;border-bottom:1px solid var(--border-default)}._3AjBo{max-width:556px}._2I5ox{position:relative}html[dir] ._2K09Y{margin-bottom:24px}._1MxED{height:28px}._2yMWv{color:var(--secondary);font-size:16px;line-height:21px}html[dir] ._2yMWv{margin-bottom:32px}._1G5cu{list-style-type:decimal}html[dir] ._1G5cu{margin:0}html[dir=ltr] ._1G5cu{padding:0 0 0 24px}html[dir=rtl] ._1G5cu{padding:0 24px 0 0}._3JRy8{font-size:18px;line-height:28px;color:var(--gray-700)}._3JRy8 strong{display:inline-block;font-weight:500;line-height:24px}.edge-fix ._3JRy8 strong{font-weight:600}html[dir] ._3JRy8+._3JRy8{margin-top:18px}._2rQUO{position:absolute;bottom:66px;font-size:18px;line-height:1;color:var(--gray-700)}html[dir=ltr] ._2rQUO{left:60px}html[dir=rtl] ._2rQUO{right:60px}@media screen and (max-width:960px){._2K09Y{font-size:26px}._2rQUO,._3JRy8{font-size:16px;line-height:25px}}@media screen and (max-width:900px){html[dir] ._2K09Y{margin-bottom:36px}}@media screen and (max-width:660px){._2K09Y{font-size:24px;line-height:1}._2rQUO,._3JRy8{font-size:16px;line-height:24px}html[dir] ._3JRy8+._3JRy8{margin-top:17px}}.vGm4z ._3AjBo{flex:none}html[dir=ltr] .vGm4z ._2I5ox{margin-left:60px}html[dir=rtl] .vGm4z ._2I5ox{margin-right:60px}@media screen and (max-width:1095px){.vGm4z ._3AjBo{flex:1 1 auto;max-width:100%}}@media screen and (max-width:780px){html[dir] .vGm4z._2Jgm7{padding-bottom:30px}.vGm4z ._3qC8O{flex-flow:column wrap}html[dir] .vGm4z ._3qC8O._1x9Rv{padding-bottom:unset;margin-bottom:unset;border-bottom:unset}.vGm4z ._3AjBo{flex:none;order:1;width:100%}.vGm4z ._2I5ox{order:2}html[dir] .vGm4z ._2I5ox{margin-top:32px;margin-bottom:28px}html[dir=ltr] .vGm4z ._2I5ox{margin-right:auto;margin-left:auto}html[dir=rtl] .vGm4z ._2I5ox{margin-left:auto;margin-right:auto}.vGm4z ._2rQUO{position:relative;bottom:unset;order:3;width:100%}html[dir] .vGm4z ._2rQUO{margin-top:12px;padding-top:40px;border-top:1px solid var(--border-default)}html[dir=ltr] .vGm4z ._2rQUO{left:unset}html[dir=rtl] .vGm4z ._2rQUO{right:unset}html[dir] .vGm4z ._2K09Y{margin-bottom:28px}}._3RVSj ._3AjBo{flex:0 1 auto}._3RVSj ._2I5ox{flex:0 1 auto;min-width:417px}html[dir=ltr] ._3RVSj ._2I5ox{padding-left:16px}html[dir=rtl] ._3RVSj ._2I5ox{padding-right:16px}@media screen and (max-width:1095px){._3RVSj ._3AjBo{max-width:100%}}@media screen and (max-width:900px){html[dir] ._3RVSj._2Jgm7{padding-bottom:30px}._3RVSj ._3qC8O{flex-flow:column wrap}html[dir] ._3RVSj ._3qC8O._1x9Rv{padding-bottom:unset;margin-bottom:unset;border-bottom:unset}._3RVSj ._3AjBo{flex:none;order:1;width:100%}._3RVSj ._2I5ox{order:2}html[dir] ._3RVSj ._2I5ox{margin-top:32px;margin-bottom:28px}html[dir=ltr] ._3RVSj ._2I5ox{margin-right:auto;margin-left:auto}html[dir=rtl] ._3RVSj ._2I5ox{margin-left:auto;margin-right:auto}._3RVSj ._2rQUO{position:relative;bottom:unset;order:3;width:100%}html[dir] ._3RVSj ._2rQUO{margin-top:12px;padding-top:40px;border-top:1px solid var(--border-default)}html[dir=ltr] ._3RVSj ._2rQUO{left:unset}html[dir=rtl] ._3RVSj ._2rQUO{right:unset}html[dir] ._3RVSj ._2K09Y{margin-bottom:28px}}
.f0SXz{display:flex;flex-grow:1;align-items:center;height:75px;box-sizing:border-box}html[dir] .f0SXz{padding:15px;margin:0 auto 40px}.f0SXz .im3R6,.f0SXz ._1Bg03{display:inline-block}html[dir=ltr] .f0SXz ._1Bg03{margin-left:17px}html[dir=rtl] .f0SXz ._1Bg03{margin-right:17px}._3I-he{color:var(--butterbar-battery-secondary)}html[dir] ._3I-he{background-color:var(--butterbar-battery-background)}._3I-he .im3R6{color:var(--butterbar-battery-icon)}.MLTJU{color:var(--butterbar-fatal-secondary)}html[dir] .MLTJU{background-color:var(--butterbar-fatal-background)}.MLTJU .im3R6{color:var(--butterbar-fatal-icon)}
.landing-wrapper{z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:flex-start}html[dir] .landing-wrapper{padding-bottom:92px;cursor:default}.landing-wrapper-before{position:absolute;top:0;z-index:-1;width:100%;height:222px}html[dir] .landing-wrapper-before{background-color:#00a884}html[dir=ltr] .landing-wrapper-before{left:0}html[dir=rtl] .landing-wrapper-before{right:0}html[dir] .landing-wrapper-before.deprecated-electron{background-color:var(--electron-deprecation-app-expired-header)}.landing-window{z-index:2;display:flex;flex:none;flex-direction:column;width:1000px;overflow:hidden}html[dir] .landing-window{background-color:#fff;border-radius:3px;box-shadow:0 17px 50px 0 rgba(11,20,26,.19),0 12px 15px 0 rgba(11,20,26,.24)}html[dir=ltr] .landing-window{margin-right:auto;margin-left:auto}html[dir=rtl] .landing-window{margin-left:auto;margin-right:auto}html[dir] .landing-window.deprecated-electron{background-color:var(--electron-deprecation-app-expired-window);box-shadow:0 17px 50px 0 rgba(var(--shadow-rgb),.19),0 12px 15px 0 rgba(var(--shadow-rgb),.24)}.landing-main{position:relative;width:100%;box-sizing:border-box}html[dir] .landing-main{padding:64px 60px 60px}.landing-header{display:flex;flex:none;align-items:center;justify-content:flex-start;width:1000px;min-height:39px}html[dir] .landing-header{margin:27px auto 28px}.landing-headerTitle{display:inline-block;font-size:14px;font-weight:500;line-height:normal;color:#fff;text-transform:uppercase;vertical-align:middle}html[dir=ltr] .landing-headerTitle{margin-left:14px}html[dir=rtl] .landing-headerTitle{margin-right:14px}.landing-header-upgradeCompleteText{position:absolute;color:#0b141a}html[dir] .landing-header-upgradeCompleteText{padding:10px 12px;margin:27px auto 28px;background:#fff;border-radius:8px;box-shadow:0 1px 3px rgba(11,20,26,.2)}.edge-fix .landing-headerTitle{font-weight:600}.landing-icon{display:inline-block;vertical-align:middle}.landing-logo{display:block;width:39px;height:39px}.landing-title{font-size:28px;font-weight:300;line-height:normal;color:#41525d}.landing-text-secondary{color:#667781}@media screen and (min-height:760px) and (min-width:1095px){html[dir] .landing-header{margin-bottom:66px}}@media screen and (min-height:760px) and (min-width:780px) and (max-width:1095px){html[dir] .landing-header{margin-bottom:68px}}@media screen and (max-width:1095px){.landing-header{width:100%}.landing-wrapper{box-sizing:border-box}html[dir=ltr] .landing-wrapper{padding-right:36px;padding-left:36px}html[dir=rtl] .landing-wrapper{padding-left:36px;padding-right:36px}.landing-window{width:100%}html[dir] .landing-main{padding:58px 52px 52px}}@media screen and (max-width:960px){.landing-wrapper{position:relative}.headline{font-size:26px}.listItem{font-size:16px;line-height:25px}}@media screen and (max-width:900px){html[dir] .headline{margin-bottom:36px}}@media screen and (max-width:780px){.landing-window{width:100%}html[dir] .landing-main{padding-bottom:82px}.text{flex:none;order:1;width:100%}.hint{position:relative;bottom:unset;order:2;width:100%;font-size:unset}html[dir] .hint{margin-top:28px;margin-bottom:52px}html[dir=ltr] .hint{left:unset}html[dir=rtl] .hint{right:unset}.qr{order:3}html[dir=ltr] .qr{margin-right:auto;margin-left:auto}html[dir=rtl] .qr{margin-left:auto;margin-right:auto}.toggle{position:relative;bottom:unset;order:4;width:100%}html[dir] .toggle{margin-top:28px}html[dir=ltr] .toggle{right:unset}html[dir=rtl] .toggle{left:unset}html[dir] .headline{margin-bottom:28px}}@media screen and (max-width:660px){.landing-wrapper{position:relative;min-width:520px}html[dir] .landing-wrapper{padding:0}.landing-header{box-sizing:border-box}html[dir=ltr] .landing-header{padding-right:36px;padding-left:36px}html[dir=rtl] .landing-header{padding-left:36px;padding-right:36px}html[dir] .landing-window{border-radius:0}html[dir] .landing-main{padding:36px}}html[dir=rtl] .landing-headerTitle{margin-right:14px;margin-left:0}._3iLTh{color:var(--teal)}._1k3bG{overflow-wrap:break-word;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}._19vUU{position:relative;display:flex;flex:none;align-items:center;justify-content:center;width:264px;height:264px;overflow:hidden}html[dir] ._19vUU{border-radius:2px}._19vUU canvas,._19vUU img{max-width:264px}._19vUU ._10aH-{position:absolute;top:50%;z-index:2;width:64px;height:64px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}html[dir] ._19vUU ._10aH-{margin-top:-32px}html[dir=ltr] ._19vUU ._10aH-{left:50%;margin-left:-32px}html[dir=rtl] ._19vUU ._10aH-{right:50%;margin-right:-32px}._19vUU ._10aH-,._19vUU canvas,._19vUU img{opacity:1;transition:opacity .5s cubic-bezier(.1,.82,.25,1)}._19vUU._1EP1P ._10aH-,._19vUU._1EP1P canvas,._19vUU._1EP1P img{opacity:.04}.Jht5u{position:absolute;top:50%;z-index:100;box-sizing:initial;display:flex;flex-direction:column;align-items:center;justify-content:center;width:140px;height:200px;font-size:13px;font-weight:400;line-height:18px;color:var(--inverse);text-transform:uppercase}html[dir] .Jht5u{padding:0 30px;margin-top:-100px;text-align:center;background-color:var(--teal-pale);border-radius:50%}html[dir=ltr] .Jht5u{left:50%;margin-left:-100px}html[dir=rtl] .Jht5u{right:50%;margin-right:-100px}.Jht5u:focus:after{position:absolute;width:210px;height:210px;content:""}html[dir] .Jht5u:focus:after{border-radius:50%;box-shadow:0 0 0 2px rgba(var(--focus-rgb),.5)}._2XiNU{flex:none;color:rgba(var(--inverse),.9)}html[dir] ._2XiNU{margin:5px 0 15px}.W3myC{display:inline-block;vertical-align:top}html[dir] ._1zX7Q{margin-top:-24px;margin-bottom:40px}
html[dir] ._1-SiY{cursor:pointer}._2XcXo{flex:none;overflow:hidden}html[dir] ._2XcXo{transform-origin:top center}._22XJC{display:flex;align-items:center;min-height:62px}html[dir] ._22XJC{background-color:var(--butterbar-default-background)}html[dir=ltr] ._22XJC{padding:13px 12px 14px 13px}html[dir=rtl] ._22XJC{padding:13px 13px 14px 12px}html[dir] ._22XJC._1-SiY:hover{cursor:pointer}._384go{flex:0 0 49px;color:var(--butterbar-icon)}html[dir=ltr] ._384go{margin-right:15px}html[dir=rtl] ._384go{margin-left:15px}._1Yy79{display:flex;flex:1;flex-direction:column;justify-content:center}._3UDm1{flex:none;color:var(--butterbar-icon-dismiss)}html[dir=ltr] ._3UDm1{margin-left:15px}html[dir=rtl] ._3UDm1{margin-right:15px}._1K1wg{color:var(--butterbar-icon-dismiss)}._2z7gr{font-size:16px;line-height:21px;color:var(--butterbar-primary)}._2BxMU{font-size:14px;line-height:19px;color:var(--butterbar-secondary)}html[dir] ._2BxMU{margin-top:2px}html[dir] ._2C_7j{background-color:var(--butterbar-default-background)}._2C_7j ._384go{color:var(--butterbar-notification-icon)}html[dir] .xx0PQ{background-color:var(--butterbar-update-background)}.xx0PQ ._384go{color:var(--butterbar-update-icon)}html[dir] .f2_qc,html[dir] ._3C1U5{background-color:var(--butterbar-connection-background)}.f2_qc ._384go,._3C1U5 ._384go{color:var(--butterbar-connection-icon)}.dark .f2_qc ._2z7gr,.dark ._3C1U5 ._2z7gr{color:var(--butterbar-connection-primary)}.dark .f2_qc ._2BxMU,.dark ._3C1U5 ._2BxMU{color:var(--butterbar-connection-secondary)}._3C1U5 svg .icon-shape{fill:var(--butterbar-phone-icon-shape)}html[dir] ._1sNMG{background-color:var(--butterbar-battery-background)}._1sNMG ._384go{color:var(--butterbar-battery-icon)}._1sNMG ._2z7gr{color:var(--butterbar-battery-primary)}._1sNMG ._2BxMU{color:var(--butterbar-battery-secondary)}._3izPF b,._1d_P- b{font-weight:700}._3izPF i,._1d_P- i{font-style:italic}._1d_P- svg,._3izPF svg{width:23px;height:27px}html[dir] ._3izPF{background-color:var(--butterbar-notice-background)}._3izPF ._384go{color:var(--butterbar-notice-icon)}html[dir] ._1d_P-{background-color:var(--butterbar-notice-smb-background)}._1d_P- ._384go{color:var(--butterbar-notice-smb-icon)}._2JUqz{width:48px;height:48px}html[dir] ._2JUqz{border-radius:50%}html[dir] ._1d_P- ._2JUqz{background-color:var(--butterbar-notice-smb-circle)}html[dir] ._3izPF ._2JUqz{background-color:var(--butterbar-notice-circle)}.afTH_{width:48px;height:48px}html[dir] .cwVT9{background-color:var(--butterbar-fatal-background)}.cwVT9 ._2z7gr{color:var(--butterbar-fatal-primary)}.cwVT9 ._2BxMU{color:var(--butterbar-fatal-secondary)}.cwVT9 ._384go{color:var(--butterbar-fatal-icon)}.cwVT9 svg{width:36px;height:36px}._3aqmZ{width:44px;height:44px;color:var(--butterbar-green-nux-icon)}html[dir] ._3aqmZ{background-color:var(--butterbar-green-nux-icon-background);border-radius:50%}._3Olve{height:50px}html[dir] ._3Olve{padding:8px 17px;background-color:var(--butterbar-green-nux-background)}._3Olve ._2z7gr{color:var(--butterbar-green-nux-primary)}._3Olve ._2BxMU{color:var(--butterbar-green-nux-secondary)}._3Olve ._1K1wg{width:24px;height:24px;color:var(--butterbar-green-nux-icon-dismiss)}html[dir] ._2wsOz{background-color:var(--butterbar-green-nux-background)}._2wsOz ._2z7gr{color:var(--butterbar-green-nux-primary)}._2wsOz ._2BxMU{color:var(--butterbar-green-nux-secondary)}._2Abc7{width:55px;height:55px;color:var(--butterbar-blue-nux-icon)}html[dir] ._2Abc7{background-color:var(--butterbar-blue-nux-icon-background);border-radius:50%}._3tjOE{height:50px}html[dir] ._3tjOE{background-color:var(--butterbar-blue-nux-background)}html[dir=ltr] ._3tjOE{padding:15px 17px 15px 23px}html[dir=rtl] ._3tjOE{padding:15px 23px 15px 17px}._3tjOE ._2z7gr{color:var(--butterbar-blue-nux-primary)}._3tjOE ._2BxMU{color:var(--butterbar-blue-nux-secondary)}._3tjOE ._1K1wg,._3tjOE ._384go svg{width:24px;height:24px}._3tjOE ._1K1wg{color:var(--butterbar-blue-nux-icon-dismiss)}html[dir] ._3GW1A{background-color:var(--poll-invalid-warning-background);padding:12px 16px}._3GW1A ._2BxMU{font-size:15px;line-height:20px}.dark ._3GW1A ._2BxMU{color:#fdfdfd}html[dir] ._3iFBn{background-color:var(--butterbar-green-nux-background)}._3iFBn ._384go{color:var(--electron-deprecation-app-expired-header)}._3iFBn ._384go svg{fill:var(--electron-deprecation-app-expired-window);color:var(--butterbar-desktop-upsell-icon)}._3iFBn ._3UDm1,._3iFBn ._1K1wg{color:var(--icon-fixed)}.dark ._3iFBn ._2z7gr{color:var(--butterbar-green-nux-primary)}.dark ._3iFBn ._2BxMU{color:var(--butterbar-green-nux-secondary)}._21OS6{width:44px;height:44px;color:var(--butterbar-ad-action-info-icon)}html[dir] ._21OS6{background-color:var(--butterbar-ad-action-info-icon-background);border-radius:50%}html[dir] ._2hXPl{background-color:var(--butterbar-ad-action-info-background)}html[dir=ltr] ._2hXPl{padding:13px 12px 14px 13px}html[dir=rtl] ._2hXPl{padding:13px 13px 14px 12px}._2hXPl ._2z7gr{color:var(--butterbar-ad-action-info-primary)}._2hXPl ._2BxMU{color:var(--butterbar-ad-action-info-secondary)}._2hXPl ._384go svg{width:32px;height:32px}._2hXPl ._1K1wg{color:var(--butterbar-ad-action-info-icon-dismiss)}._2G3Ob{width:44px;height:44px;color:var(--butterbar-ad-action-warning-icon)}html[dir] ._2G3Ob{background-color:var(--butterbar-ad-action-warning-icon-background);border-radius:50%}html[dir] .rEIOF{background-color:var(--butterbar-ad-action-warning-background)}html[dir=ltr] .rEIOF{padding:13px 12px 14px 13px}html[dir=rtl] .rEIOF{padding:13px 13px 14px 12px}.rEIOF ._2z7gr{color:var(--butterbar-ad-action-warning-primary)}.rEIOF ._2BxMU{color:var(--butterbar-ad-action-warning-secondary)}.rEIOF ._384go svg{width:20px;height:20px}.rEIOF ._1K1wg{color:var(--butterbar-ad-action-warning-icon-dismiss)}
html[dir] ._2XHqw{padding:40px 60px;background-color:rgba(var(--black-rgb),.025)}html[dir] .DL70t{margin:0 auto 16px;text-align:center}@media screen and (max-width:780px){html[dir=ltr] ._2XHqw{padding-left:0;padding-right:0}html[dir=rtl] ._2XHqw{padding-right:0;padding-left:0}}.pnyuK{position:relative;display:flex;justify-content:center}._3Zpe8{font-size:14px}html[dir] ._3Zpe8{margin:0 auto 40px;text-align:center}._3Zpe8 a{color:var(--teal)}._2ojs8{position:relative;flex:none}._2ojs8,._2_UQy,._2eXLG{width:560px;height:314px}@media screen and (max-width:780px){._2ojs8{width:100%;height:0}html[dir] ._2ojs8{padding-bottom:56.0714285714%}._2_UQy,._2eXLG{width:100%;height:auto}}._2_UQy{z-index:1;display:block}._2eXLG{position:absolute;top:0;bottom:0;z-index:10}html[dir] ._2eXLG{background-size:560px 314px}html[dir=ltr] ._2eXLG{right:0;left:0}html[dir=rtl] ._2eXLG{left:0;right:0}._2C64u{visibility:hidden}.FXQhO{position:absolute;top:0;bottom:0;z-index:100;display:flex;align-items:center;justify-content:center}html[dir=ltr] .FXQhO{right:0;left:0}html[dir=rtl] .FXQhO{left:0;right:0}._2KwNO{display:flex;align-items:center;justify-content:center;width:80px;height:80px;overflow:hidden;color:var(--inverse)}html[dir] ._2KwNO{background-color:rgba(var(--overlay-rgb),.45);border-radius:50%}._3whss{display:inline-block;margin-left:5px;vertical-align:top}
._3g4Pn{position:relative}html[dir] ._3g4Pn{border-radius:50%}._1uO4x{position:absolute;top:0;display:flex;align-items:center;justify-content:center;width:100%;height:100%}html[dir=ltr] ._1uO4x{left:0}html[dir=rtl] ._1uO4x{right:0}._1uO4x svg{width:100%;height:100%}._1uO4x path.background{fill:var(--avatar-placeholder-background)}._1uO4x path.primary{fill:var(--avatar-placeholder-primary)}.XHfTk{position:absolute;top:0;display:flex;align-items:center;justify-content:center;width:100%;height:100%}html[dir=ltr] .XHfTk{left:0}html[dir=rtl] .XHfTk{right:0}.XHfTk svg{width:100%;height:100%}._20cX6{position:absolute;width:28px;height:28px}html[dir=ltr] ._20cX6{left:-38px}html[dir=rtl] ._20cX6{right:-38px}._1jLYl{position:relative;display:block;width:100%;height:100%;overflow:hidden;opacity:0;transition:opacity .15s ease-out}html[dir] ._1jLYl{border-radius:50%}._1IGpC{transition:none}._1jLYl._1PAkz{opacity:1}html[dir] ._2BDLL,html[dir] ._2BDLL ._1jLYl{border-radius:0}._3ys8X,._3ys8X ._1jLYl{-webkit-clip-path:polygon(100% 50%,100% 56.6%,100% 59.3%,100% 61.4%,99.9% 63.2%,99.9% 64.8%,99.9% 66.2%,99.8% 67.5%,99.8% 68.7%,99.7% 69.8%,99.6% 70.8%,99.5% 71.8%,99.5% 72.8%,99.4% 73.7%,99.3% 74.6%,99.1% 75.4%,99% 76.3%,98.9% 77%,98.8% 77.8%,98.6% 78.5%,98.5% 79.2%,98.3% 79.9%,98.1% 80.6%,98% 81.3%,97.8% 81.9%,97.6% 82.5%,97.4% 83.1%,97.2% 83.7%,97% 84.3%,96.8% 84.8%,96.5% 85.4%,96.3% 85.9%,96% 86.4%,95.8% 86.9%,95.5% 87.4%,95.3% 87.9%,95% 88.3%,94.7% 88.8%,94.4% 89.2%,94.1% 89.7%,93.8% 90.1%,93.4% 90.5%,93.1% 90.9%,92.8% 91.3%,92.4% 91.7%,92% 92%,91.7% 92.4%,91.3% 92.8%,90.9% 93.1%,90.5% 93.4%,90.1% 93.8%,89.7% 94.1%,89.2% 94.4%,88.8% 94.7%,88.3% 95%,87.9% 95.3%,87.4% 95.5%,86.9% 95.8%,86.4% 96%,85.9% 96.3%,85.4% 96.5%,84.8% 96.8%,84.3% 97%,83.7% 97.2%,83.1% 97.4%,82.5% 97.6%,81.9% 97.8%,81.3% 98%,80.6% 98.1%,79.9% 98.3%,79.2% 98.5%,78.5% 98.6%,77.8% 98.8%,77% 98.9%,76.3% 99%,75.4% 99.1%,74.6% 99.3%,73.7% 99.4%,72.8% 99.5%,71.8% 99.5%,70.8% 99.6%,69.8% 99.7%,68.7% 99.8%,67.5% 99.8%,66.2% 99.9%,64.8% 99.9%,63.2% 99.9%,61.4% 100%,59.3% 100%,56.6% 100%,50% 100%,43.4% 100%,40.7% 100%,38.6% 100%,36.8% 99.9%,35.2% 99.9%,33.8% 99.9%,32.5% 99.8%,31.3% 99.8%,30.2% 99.7%,29.2% 99.6%,28.2% 99.5%,27.2% 99.5%,26.3% 99.4%,25.4% 99.3%,24.6% 99.1%,23.7% 99%,23% 98.9%,22.2% 98.8%,21.5% 98.6%,20.8% 98.5%,20.1% 98.3%,19.4% 98.1%,18.7% 98%,18.1% 97.8%,17.5% 97.6%,16.9% 97.4%,16.3% 97.2%,15.7% 97%,15.2% 96.8%,14.6% 96.5%,14.1% 96.3%,13.6% 96%,13.1% 95.8%,12.6% 95.5%,12.1% 95.3%,11.7% 95%,11.2% 94.7%,10.8% 94.4%,10.3% 94.1%,9.9% 93.8%,9.5% 93.4%,9.1% 93.1%,8.7% 92.8%,8.3% 92.4%,8% 92%,7.6% 91.7%,7.2% 91.3%,6.9% 90.9%,6.6% 90.5%,6.2% 90.1%,5.9% 89.7%,5.6% 89.2%,5.3% 88.8%,5% 88.3%,4.7% 87.9%,4.5% 87.4%,4.2% 86.9%,4% 86.4%,3.7% 85.9%,3.5% 85.4%,3.2% 84.8%,3% 84.3%,2.8% 83.7%,2.6% 83.1%,2.4% 82.5%,2.2% 81.9%,2% 81.3%,1.9% 80.6%,1.7% 79.9%,1.5% 79.2%,1.4% 78.5%,1.2% 77.8%,1.1% 77%,1% 76.3%,.9% 75.4%,.7% 74.6%,.6% 73.7%,.5% 72.8%,.5% 71.8%,.4% 70.8%,.3% 69.8%,.2% 68.7%,.2% 67.5%,.1% 66.2%,.1% 64.8%,.1% 63.2%,0 61.4%,0 59.3%,0 56.6%,0 50%,0 43.4%,0 40.7%,0 38.6%,.1% 36.8%,.1% 35.2%,.1% 33.8%,.2% 32.5%,.2% 31.3%,.3% 30.2%,.4% 29.2%,.5% 28.2%,.5% 27.2%,.6% 26.3%,.7% 25.4%,.9% 24.6%,1% 23.7%,1.1% 23%,1.2% 22.2%,1.4% 21.5%,1.5% 20.8%,1.7% 20.1%,1.9% 19.4%,2% 18.7%,2.2% 18.1%,2.4% 17.5%,2.6% 16.9%,2.8% 16.3%,3% 15.7%,3.2% 15.2%,3.5% 14.6%,3.7% 14.1%,4% 13.6%,4.2% 13.1%,4.5% 12.6%,4.7% 12.1%,5% 11.7%,5.3% 11.2%,5.6% 10.8%,5.9% 10.3%,6.2% 9.9%,6.6% 9.5%,6.9% 9.1%,7.2% 8.7%,7.6% 8.3%,8% 8%,8.3% 7.6%,8.7% 7.2%,9.1% 6.9%,9.5% 6.6%,9.9% 6.2%,10.3% 5.9%,10.8% 5.6%,11.2% 5.3%,11.7% 5%,12.1% 4.7%,12.6% 4.5%,13.1% 4.2%,13.6% 4%,14.1% 3.7%,14.6% 3.5%,15.2% 3.2%,15.7% 3%,16.3% 2.8%,16.9% 2.6%,17.5% 2.4%,18.1% 2.2%,18.7% 2%,19.4% 1.9%,20.1% 1.7%,20.8% 1.5%,21.5% 1.4%,22.2% 1.2%,23% 1.1%,23.7% 1%,24.6% .9%,25.4% .7%,26.3% .6%,27.2% .5%,28.2% .5%,29.2% .4%,30.2% .3%,31.3% .2%,32.5% .2%,33.8% .1%,35.2% .1%,36.8% .1%,38.6% 0,40.7% 0,43.4% 0,50% 0,56.6% 0,59.3% 0,61.4% 0,63.2% .1%,64.8% .1%,66.2% .1%,67.5% .2%,68.7% .2%,69.8% .3%,70.8% .4%,71.8% .5%,72.8% .5%,73.7% .6%,74.6% .7%,75.4% .9%,76.3% 1%,77% 1.1%,77.8% 1.2%,78.5% 1.4%,79.2% 1.5%,79.9% 1.7%,80.6% 1.9%,81.3% 2%,81.9% 2.2%,82.5% 2.4%,83.1% 2.6%,83.7% 2.8%,84.3% 3%,84.8% 3.2%,85.4% 3.5%,85.9% 3.7%,86.4% 4%,86.9% 4.2%,87.4% 4.5%,87.9% 4.7%,88.3% 5%,88.8% 5.3%,89.2% 5.6%,89.7% 5.9%,90.1% 6.2%,90.5% 6.6%,90.9% 6.9%,91.3% 7.2%,91.7% 7.6%,92% 8%,92.4% 8.3%,92.8% 8.7%,93.1% 9.1%,93.4% 9.5%,93.8% 9.9%,94.1% 10.3%,94.4% 10.8%,94.7% 11.2%,95% 11.7%,95.3% 12.1%,95.5% 12.6%,95.8% 13.1%,96% 13.6%,96.3% 14.1%,96.5% 14.6%,96.8% 15.2%,97% 15.7%,97.2% 16.3%,97.4% 16.9%,97.6% 17.5%,97.8% 18.1%,98% 18.7%,98.1% 19.4%,98.3% 20.1%,98.5% 20.8%,98.6% 21.5%,98.8% 22.2%,98.9% 23%,99% 23.7%,99.1% 24.6%,99.3% 25.4%,99.4% 26.3%,99.5% 27.2%,99.5% 28.2%,99.6% 29.2%,99.7% 30.2%,99.8% 31.3%,99.8% 32.5%,99.9% 33.8%,99.9% 35.2%,99.9% 36.8%,100% 38.6%,100% 40.7%,100% 43.4%);clip-path:polygon(100% 50%,100% 56.6%,100% 59.3%,100% 61.4%,99.9% 63.2%,99.9% 64.8%,99.9% 66.2%,99.8% 67.5%,99.8% 68.7%,99.7% 69.8%,99.6% 70.8%,99.5% 71.8%,99.5% 72.8%,99.4% 73.7%,99.3% 74.6%,99.1% 75.4%,99% 76.3%,98.9% 77%,98.8% 77.8%,98.6% 78.5%,98.5% 79.2%,98.3% 79.9%,98.1% 80.6%,98% 81.3%,97.8% 81.9%,97.6% 82.5%,97.4% 83.1%,97.2% 83.7%,97% 84.3%,96.8% 84.8%,96.5% 85.4%,96.3% 85.9%,96% 86.4%,95.8% 86.9%,95.5% 87.4%,95.3% 87.9%,95% 88.3%,94.7% 88.8%,94.4% 89.2%,94.1% 89.7%,93.8% 90.1%,93.4% 90.5%,93.1% 90.9%,92.8% 91.3%,92.4% 91.7%,92% 92%,91.7% 92.4%,91.3% 92.8%,90.9% 93.1%,90.5% 93.4%,90.1% 93.8%,89.7% 94.1%,89.2% 94.4%,88.8% 94.7%,88.3% 95%,87.9% 95.3%,87.4% 95.5%,86.9% 95.8%,86.4% 96%,85.9% 96.3%,85.4% 96.5%,84.8% 96.8%,84.3% 97%,83.7% 97.2%,83.1% 97.4%,82.5% 97.6%,81.9% 97.8%,81.3% 98%,80.6% 98.1%,79.9% 98.3%,79.2% 98.5%,78.5% 98.6%,77.8% 98.8%,77% 98.9%,76.3% 99%,75.4% 99.1%,74.6% 99.3%,73.7% 99.4%,72.8% 99.5%,71.8% 99.5%,70.8% 99.6%,69.8% 99.7%,68.7% 99.8%,67.5% 99.8%,66.2% 99.9%,64.8% 99.9%,63.2% 99.9%,61.4% 100%,59.3% 100%,56.6% 100%,50% 100%,43.4% 100%,40.7% 100%,38.6% 100%,36.8% 99.9%,35.2% 99.9%,33.8% 99.9%,32.5% 99.8%,31.3% 99.8%,30.2% 99.7%,29.2% 99.6%,28.2% 99.5%,27.2% 99.5%,26.3% 99.4%,25.4% 99.3%,24.6% 99.1%,23.7% 99%,23% 98.9%,22.2% 98.8%,21.5% 98.6%,20.8% 98.5%,20.1% 98.3%,19.4% 98.1%,18.7% 98%,18.1% 97.8%,17.5% 97.6%,16.9% 97.4%,16.3% 97.2%,15.7% 97%,15.2% 96.8%,14.6% 96.5%,14.1% 96.3%,13.6% 96%,13.1% 95.8%,12.6% 95.5%,12.1% 95.3%,11.7% 95%,11.2% 94.7%,10.8% 94.4%,10.3% 94.1%,9.9% 93.8%,9.5% 93.4%,9.1% 93.1%,8.7% 92.8%,8.3% 92.4%,8% 92%,7.6% 91.7%,7.2% 91.3%,6.9% 90.9%,6.6% 90.5%,6.2% 90.1%,5.9% 89.7%,5.6% 89.2%,5.3% 88.8%,5% 88.3%,4.7% 87.9%,4.5% 87.4%,4.2% 86.9%,4% 86.4%,3.7% 85.9%,3.5% 85.4%,3.2% 84.8%,3% 84.3%,2.8% 83.7%,2.6% 83.1%,2.4% 82.5%,2.2% 81.9%,2% 81.3%,1.9% 80.6%,1.7% 79.9%,1.5% 79.2%,1.4% 78.5%,1.2% 77.8%,1.1% 77%,1% 76.3%,.9% 75.4%,.7% 74.6%,.6% 73.7%,.5% 72.8%,.5% 71.8%,.4% 70.8%,.3% 69.8%,.2% 68.7%,.2% 67.5%,.1% 66.2%,.1% 64.8%,.1% 63.2%,0 61.4%,0 59.3%,0 56.6%,0 50%,0 43.4%,0 40.7%,0 38.6%,.1% 36.8%,.1% 35.2%,.1% 33.8%,.2% 32.5%,.2% 31.3%,.3% 30.2%,.4% 29.2%,.5% 28.2%,.5% 27.2%,.6% 26.3%,.7% 25.4%,.9% 24.6%,1% 23.7%,1.1% 23%,1.2% 22.2%,1.4% 21.5%,1.5% 20.8%,1.7% 20.1%,1.9% 19.4%,2% 18.7%,2.2% 18.1%,2.4% 17.5%,2.6% 16.9%,2.8% 16.3%,3% 15.7%,3.2% 15.2%,3.5% 14.6%,3.7% 14.1%,4% 13.6%,4.2% 13.1%,4.5% 12.6%,4.7% 12.1%,5% 11.7%,5.3% 11.2%,5.6% 10.8%,5.9% 10.3%,6.2% 9.9%,6.6% 9.5%,6.9% 9.1%,7.2% 8.7%,7.6% 8.3%,8% 8%,8.3% 7.6%,8.7% 7.2%,9.1% 6.9%,9.5% 6.6%,9.9% 6.2%,10.3% 5.9%,10.8% 5.6%,11.2% 5.3%,11.7% 5%,12.1% 4.7%,12.6% 4.5%,13.1% 4.2%,13.6% 4%,14.1% 3.7%,14.6% 3.5%,15.2% 3.2%,15.7% 3%,16.3% 2.8%,16.9% 2.6%,17.5% 2.4%,18.1% 2.2%,18.7% 2%,19.4% 1.9%,20.1% 1.7%,20.8% 1.5%,21.5% 1.4%,22.2% 1.2%,23% 1.1%,23.7% 1%,24.6% .9%,25.4% .7%,26.3% .6%,27.2% .5%,28.2% .5%,29.2% .4%,30.2% .3%,31.3% .2%,32.5% .2%,33.8% .1%,35.2% .1%,36.8% .1%,38.6% 0,40.7% 0,43.4% 0,50% 0,56.6% 0,59.3% 0,61.4% 0,63.2% .1%,64.8% .1%,66.2% .1%,67.5% .2%,68.7% .2%,69.8% .3%,70.8% .4%,71.8% .5%,72.8% .5%,73.7% .6%,74.6% .7%,75.4% .9%,76.3% 1%,77% 1.1%,77.8% 1.2%,78.5% 1.4%,79.2% 1.5%,79.9% 1.7%,80.6% 1.9%,81.3% 2%,81.9% 2.2%,82.5% 2.4%,83.1% 2.6%,83.7% 2.8%,84.3% 3%,84.8% 3.2%,85.4% 3.5%,85.9% 3.7%,86.4% 4%,86.9% 4.2%,87.4% 4.5%,87.9% 4.7%,88.3% 5%,88.8% 5.3%,89.2% 5.6%,89.7% 5.9%,90.1% 6.2%,90.5% 6.6%,90.9% 6.9%,91.3% 7.2%,91.7% 7.6%,92% 8%,92.4% 8.3%,92.8% 8.7%,93.1% 9.1%,93.4% 9.5%,93.8% 9.9%,94.1% 10.3%,94.4% 10.8%,94.7% 11.2%,95% 11.7%,95.3% 12.1%,95.5% 12.6%,95.8% 13.1%,96% 13.6%,96.3% 14.1%,96.5% 14.6%,96.8% 15.2%,97% 15.7%,97.2% 16.3%,97.4% 16.9%,97.6% 17.5%,97.8% 18.1%,98% 18.7%,98.1% 19.4%,98.3% 20.1%,98.5% 20.8%,98.6% 21.5%,98.8% 22.2%,98.9% 23%,99% 23.7%,99.1% 24.6%,99.3% 25.4%,99.4% 26.3%,99.5% 27.2%,99.5% 28.2%,99.6% 29.2%,99.7% 30.2%,99.8% 31.3%,99.8% 32.5%,99.9% 33.8%,99.9% 35.2%,99.9% 36.8%,100% 38.6%,100% 40.7%,100% 43.4%)}html[dir] ._3ys8X,html[dir] ._3ys8X ._1jLYl{border-radius:0}html[dir] ._1_8xv{border:2px solid var(--avatar-border)}._1_Wgv{box-sizing:border-box}html[dir] ._1_Wgv{border:2px solid var(--background-default)}html[dir] ._3Ye_8{background-color:var(--announcement-speaker-background)}html[dir] ._3YzWG{border:2px solid var(--modal-background);background-color:var(--modal-background)}html[dir] ._3g4Pn.TgBEt{background-color:initial}html[dir] .TgBEt ._1uO4x{transform:scale(.97);transform-origin:center center}._SZF_{position:relative}._1mq8m{position:absolute;bottom:-3px;z-index:1000;box-sizing:border-box;width:20px;height:20px;pointer-events:none}html[dir] ._1mq8m{padding:1px;border-radius:50%}html[dir=ltr] ._1mq8m{right:-3px}html[dir=rtl] ._1mq8m{left:-3px}html[dir] ._1mq8m._16_f9{background-color:var(--background-default)}html[dir] ._1mq8m.mhyoZ{background-color:var(--panel-header-background)}.r3fjq svg{width:18px;height:18px}.r3fjq path{fill:var(--icon)}html[dir] ._1bClC{border:1px solid}html[dir] ._1XQRq{border-color:var(--outgoing-background)}html[dir] ._2syBn{border-color:var(--incoming-background)}.keyboard-user ._2HcPg:focus:after{position:absolute;box-sizing:border-box;width:37px;height:37px;top:-4px;content:""}html[dir] .keyboard-user ._2HcPg:focus:after{border:2px solid rgba(var(--focus-rgb),.5);border-radius:50%}html[dir=ltr] .keyboard-user ._2HcPg:focus:after{left:-4px}html[dir=rtl] .keyboard-user ._2HcPg:focus:after{right:-4px}
.C1n50{object-fit:cover;width:100%;height:100%}html[dir] ._3Y9tE{background-color:var(--avatar-placeholder-background)}._3Y9tE ._7Lc0X{flex:0 0 auto}._3Y9tE svg{width:100%;height:100%}._3Y9tE path.background{fill:var(--avatar-placeholder-background)}._3Y9tE path.primary{fill:var(--avatar-placeholder-primary)}._2EET8{position:relative;z-index:100;display:inline-block;flex:none;width:100%;height:100%;overflow:hidden}html[dir] ._2EET8{border-radius:50%}html[dir] ._106J7{border:2px solid var(--avatar-border);border-radius:50%}._3p-VS:before,._1hDFe:before,._21wDR:before{position:absolute;top:0;bottom:0;content:"";transition:background-color .2s ease}html[dir] ._3p-VS:before,html[dir] ._1hDFe:before,html[dir] ._21wDR:before{border-radius:50%}html[dir=ltr] ._3p-VS:before,html[dir=ltr] ._1hDFe:before,html[dir=ltr] ._21wDR:before{right:0;left:0}html[dir=rtl] ._3p-VS:before,html[dir=rtl] ._1hDFe:before,html[dir=rtl] ._21wDR:before{left:0;right:0}html[dir] ._1hDFe:before,html[dir] ._21wDR:before{border:.8px solid rgba(var(--voip-primary-rgb),.14)}html[dir] ._21wDR:before{border-width:1px}html[dir] ._3p-VS:before{background:rgba(var(--voip-disabled-background-rgb),.48)}html[dir] ._3D3uA{border-radius:0}html[dir] ._3D3uA:before{border-radius:0}._2yT5k,._1_RT1{width:100%;height:100%}._2yT5k>*,._1_RT1>*{flex:1 1;width:100%;height:100%;overflow:hidden}html[dir] ._1_RT1>*{margin:0 2px}html[dir=ltr] ._1_RT1>:last-child{margin-right:0}html[dir=rtl] ._1_RT1>:last-child{margin-left:0}html[dir=ltr] ._1_RT1>:first-child{margin-left:0}html[dir=rtl] ._1_RT1>:first-child{margin-right:0}html[dir] ._2yT5k>*{margin:2px 0}html[dir] ._2yT5k>:last-child{margin-bottom:0}html[dir] ._2yT5k>:first-child{margin-top:0}
._1-4Rd {
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 92px;
  cursor: default;
}

.vg9nq {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 222px;
  background-color: #00a884;
}
.vg9nq._14yiH {
  background-color: var(--electron-deprecation-app-expired-header);
}

._153VF {
  z-index: 2;
  display: flex;
  flex: none;
  flex-direction: column;
  width: 1000px;
  margin-right: auto;
  margin-left: auto;
  overflow: hidden;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 17px 50px 0 rgba(11, 20, 26, 0.19), 0 12px 15px 0 rgba(11, 20, 26, 0.24);
}
._153VF._14yiH {
  background-color: var(--electron-deprecation-app-expired-window);
  box-shadow: 0 17px 50px 0 rgba(var(--shadow-rgb), 0.19), 0 12px 15px 0 rgba(var(--shadow-rgb), 0.24);
}

.v_mws {
  position: relative;
  padding: 64px 60px 60px 60px;
  width: 100%;
  box-sizing: border-box;
}

._3J26o {
  display: flex;
  flex: none;
  align-items: center;
  justify-content: flex-start;
  width: 1000px;
  min-height: 39px;
  margin: 27px auto 28px auto;
}

.e0z5v {
  display: inline-block;
  margin-left: 14px;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  color: white;
  text-transform: uppercase;
  vertical-align: middle;
}

._1PEnt {
  position: absolute;
  padding: 10px 12px;
  margin: 27px auto 28px auto;
  color: #0b141a;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 1px 3px rgba(11, 20, 26, 0.2);
}

.sTQ-C .e0z5v {
  font-weight: 600;
}

._1qVm2 {
  display: inline-block;
  vertical-align: middle;
}

._2edWd {
  display: block;
  width: 39px;
  height: 39px;
}

._1jAkd {
  font-size: 28px;
  font-weight: 300;
  line-height: normal;
  color: #41525d;
}

._19B3f {
  color: #667781;
}

@media screen and (min-height: 760px) and (min-width: 1095px) {
  ._3J26o {
    margin-bottom: 66px;
  }
}
@media screen and (min-height: 760px) and (min-width: 780px) and (max-width: 1095px) {
  ._3J26o {
    margin-bottom: 68px;
  }
}
@media screen and (max-width: 1095px) {
  ._3J26o {
    width: 100%;
  }

  ._1-4Rd {
    box-sizing: border-box;
    padding-right: 36px;
    padding-left: 36px;
  }

  ._153VF {
    width: 100%;
  }

  .v_mws {
    padding: 58px 52px 52px 52px;
  }
}
@media screen and (max-width: 960px) {
  ._1-4Rd {
    position: relative;
  }

  ._3BJgQ {
    font-size: 26px;
  }

  ._1x0Qz {
    font-size: 16px;
    line-height: 25px;
  }
}
@media screen and (max-width: 900px) {
  ._3BJgQ {
    margin-bottom: 36px;
  }
}
@media screen and (max-width: 780px) {
  ._153VF {
    width: 100%;
  }

  .v_mws {
    padding-bottom: 82px;
  }

  ._28IPF {
    flex: none;
    order: 1;
    width: 100%;
  }

  ._3tKX1 {
    position: relative;
    bottom: unset;
    left: unset;
    order: 2;
    width: 100%;
    margin-top: 28px;
    margin-bottom: 52px;
    font-size: unset;
  }

  ._2ytz1 {
    order: 3;
    margin-right: auto;
    margin-left: auto;
  }

  ._1xFmQ {
    position: relative;
    right: unset;
    bottom: unset;
    order: 4;
    width: 100%;
    margin-top: 28px;
  }

  ._3BJgQ {
    margin-bottom: 28px;
  }
}
@media screen and (max-width: 660px) {
  ._1-4Rd {
    position: relative;
    min-width: 520px;
    padding: 0;
  }

  ._3J26o {
    box-sizing: border-box;
    padding-right: 36px;
    padding-left: 36px;
  }

  ._153VF {
    border-radius: 0;
  }

  .v_mws {
    padding: 36px 36px 36px 36px;
  }
}
html[dir=rtl] .e0z5v {
  margin-right: 14px;
  margin-left: 0;
}
._1Fm4m{position:relative;z-index:100;width:100%;height:100%;overflow:hidden}@media screen and (max-width:748px){._1Fm4m{overflow-x:auto}}@media screen and (max-height:512px){._1Fm4m{overflow-y:auto}}@media screen and (min-width:1441px){._1Fm4m:after{position:fixed;top:0;z-index:-1;width:100%;height:127px;content:""}html[dir] ._1Fm4m:after{background-color:var(--app-background-stripe)}html[dir=ltr] ._1Fm4m:after{left:0}html[dir=rtl] ._1Fm4m:after{right:0}.dark ._1Fm4m:after{content:none}.tsBgS._1Fm4m:after,.native ._1Fm4m:after{content:none}}._3uq5k{position:fixed;top:0;z-index:1000;width:100%;height:59px;pointer-events:none;-webkit-app-region:drag}html[dir=ltr] ._3uq5k{left:0}html[dir=rtl] ._3uq5k{right:0}.tsBgS{overflow-y:auto}html[dir] ._1h2dM::-webkit-scrollbar-track,html[dir] .tsBgS::-webkit-scrollbar-track{background-color:var(--app-background)}
a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{font:inherit;font-size:100%;vertical-align:baseline;outline:none;padding:0;margin:0;border:0}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before{content:"";content:none}q:after,q:before{content:"";content:none}table{border-spacing:0;border-collapse:collapse}body{font-family:Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif;color:var(--primary);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;text-rendering:optimizeLegibility;font-feature-settings:"kern";background-color:var(--app-background);background-image:linear-gradient(180deg,var(--app-background),var(--app-background-deeper))}html[dir] body.voip{background-color:transparent;background-image:none}body.text-rendering-bug-fix{text-rendering:unset}.os-mac,body.native.darwin{font-family:system,-apple-system,system-ui,BlinkMacSystemFont,Helvetica Neue,Helvetica,Arial,Lucida Grande,Kohinoor Devanagari,sans-serif}.os-mac.font-fix{font-family:SF Pro Text,SF Pro Icons,system,-apple-system,system-ui,BlinkMacSystemFont,Helvetica Neue,Helvetica,Arial,Lucida Grande,Kohinoor Devanagari,sans-serif}html[dir=rtl]{direction:rtl}em{font-style:italic}strong{font-weight:700}code{font-family:Consolas,Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,Courier,monospace}button,input{font-family:Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif;margin:0}.os-mac button,.os-mac input,body.native.darwin button,body.native.darwin input{font-family:system,-apple-system,system-ui,BlinkMacSystemFont,Helvetica Neue,Helvetica,Arial,Lucida Grande,Kohinoor Devanagari,sans-serif}button{outline:none;padding:0;cursor:pointer;background:none;border:0}pre{white-space:pre-wrap}ol,ul{padding:0;margin:0}a{text-decoration:none}.dark *{scrollbar-color:rgba(var(--white-rgb),.16) transparent}.light *,*{scrollbar-color:rgba(var(--black-rgb),.2) rgba(var(--white-rgb),.1);scrollbar-width:thin}::-webkit-scrollbar{width:6px!important;height:6px!important}html[dir] .dark ::-webkit-scrollbar-thumb{background-color:rgba(var(--white-rgb),.16)}::-webkit-scrollbar-thumb,html[dir] .light ::-webkit-scrollbar-thumb{background-color:rgba(var(--black-rgb),.2)}html[dir] .dark ::-webkit-scrollbar-track{background-color:transparent}::-webkit-scrollbar-track,html[dir] .light ::-webkit-scrollbar-track{background:rgba(var(--white-rgb),.1)}svg{display:block;pointer-events:none}div[data-list-scroll-container]{transform:translateZ(0)}.lexical-rich-text-input code{line-height:.9}html[dir] .media-video-thumb{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbgAAAG4BAMAAADF5O+AAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAYUExURXiQnIabpn+WoYOYpHyTn3mRnYWapYGXotUtPzYAAALNSURBVHja7d2xTttgFIZhqzLKfASia6DQnVbsSaV6RlSiK76E3P/CgtpSknjpL8dfn+cGwisIBuf3OV0HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAp6b9dN3DzcAptj2M1cXl7Am3VyuV67razu2ZxdT73T+aPauh+5ri7lnEf5237UE1tZo17ahv3PHUValp/1TbuYuLlh/Vi33KTb7q+WsadtW2ry+Mvv2sa1zeOq4eJy9Ci4zYTfz+sl3slOB43VG5cPwbHbSs3blW5ca//jWTGvf43EhnXj8FxQ+XG/frjITFuFxz3+95GXtwfN6Xy4obKjevH4Lht5catKjfu7S3usLi3t7iz4voxOG6o3Li/70hFxe2C4959YBYU9/6TzqC4oXLj+jE4blu5cavKjdt7biIlbu+5iZC4Pb9NcuKGyo078DFnRtwuOO7QKayEuIPH5xLihsqN238ZCInbVm7cqnLjjh3GXXzcscO4S487/NskIG6o3LjjZ+cWHrcLjps42r/ouO93wXGfKziuxIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkT9x/HRR+Pij7YFn0kMfswafYx4OgD3NlH76Mfmsh+3CX6QaXsR8yyHw6Mfqwz+4Hc6Eepsx+Czx5fED14IntkSPSwl+wxPdEDlrJHY2UPNYseR5c9SDB6BGT28M7ssavRA3OzRx1HD6nOHi8ePRg+e6R/9jKG6DUa2QtQolfXZC8dyl4XFb3oK3tFW/Ryvey1iNELLbNXkWYvkW2+/jd6cXP0yu3oZenRa+67q7ZxFxMvPzSNe2ob9zz1nt90y70WNP3aZ37Tnc/b1vbn8n7muLOG37rzh5njusd2F7l1N7ufY6O22+4E9Nefvv5zX242HQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS/IC5yVH48Ho/XwAAAAASUVORK5CYII=)}html[dir] .chrome-media-icon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAiCAMAAAAau2s5AAAAMFBMVEX///+fn59tbW3Q0NDz8/OIiIiQkJCHh4f21s/idFzgYkbjc1zlgm/zx8D0x8HhalBJdsgxAAAAiUlEQVR42uXQQQvDMAiGYZOtbWJM+v//bZXCcAmoh17G3oOnB4QP/rmU517AvReYl5K4LQB3cTkCxYUguxA8xPlQeg7uaj0TsotBgFLxUy0GbKiqBsSvHEj3cSFBRxxAM0wTFNQ7DNRwDW/JLgi7D8UN/u5DgiGYTKjncaDKhKd2zYClKVfgZ7oAH+EJ3GvFORkAAAAASUVORK5CYII=)}html[dir] .attach-media-audio-thumb,html[dir] .media-gallery .image-audio,html[dir] .media-viewer .image-audio{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbgAAAG4BAMAAADF5O+AAAAAGFBMVEX/rR//riP/sSr/tTX/uUH/vUz/vEj/tzqH5JbhAAAEQElEQVR4AezBgQAAAACAoP2pF6kCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgLkxf9aGYSCKN+rQVZBAVpOAszaxm87FMv0A9VP2hCNr/yWfv9Ch0ORkJEGGp99u8OOnu5PuNkwWTet+6ZqFLSrZ0uEfblNKPtMKrvBdVUQ0BOCPtxIE8Z/c2s4Y5ViVqY1dXosIOs7+v0UUB0uY7YxIjpYu2wnR7GyZZ5LyZG6RxIEpW41E9jzZZkjmhSXbvSAZ/0jSTHpkMFjyguMvuzky+SB4CPTIZKiIJxz/tHtAEO9c0zgnCPJO2ilfN3+Hziy/OTvmTHf2dVFO5ln4RrmR2E2QvjfyFdmIG9Z3KtOea9hp4jobrM+WSp0ibnQBtCJSZ65FrMe/mAqNujo1m5ZuT1JxSjYlHYe6OusmPKdQN5G8v6wv1VmCy8lb7IdPBNeUU/oDRn8k7X6YNUPdiGEgiErttaUhLTYp9yeYlCexZdP4pHL/Pzq+MDsrvR+I6tXuzJu5AosTS/j3kwSvTvl1yII5uxMuJ21zBCWcpDxcfYjxg8KUE6uU9xRzoLEyO+WIRSk/zqbH9EqTu5U9ecF0cLfy6SfThN3K5J8PZy+N2FXlNwAOLqAnI5gb08GHRJQKkyuLZEQcvvw3VCmo4jsy7TxFPQUl93xK/igzpAtoBEPFORV4clPFAh14cklGcRl3ckPH3xfu5KaAUVFH9yfaJbPhjRZ3mnJQCfb/C6cS5BYsyy3lpCZMTzZleKosPRnSMqaxgurh/9w3KrC+ayXgC8UoD614v2HSuNmjJj7hgySWFfU98aSnxDZJcmn0RKooJLJMpA+KB93luX5xnGCIfjDieMGHiQTShnfnlM2XvLU4OTa35FdcOTaX5bDaOJ3lJo8ZHRN4Omdeeg9vAZueKGmuBmhUpjzuDHCXTAGUIyAhFsrjroDfHgqFvkrAwHbK41ZA0NgpaJk5IqV/XArwzhd7d6waIRQFYXjUJdvabC8BU98i6ReCfWJE+4D9Nr5/XkDY5g7nQP7/Db56igFn68OL+8mCU7X+Nw4cOHDgwIEDBw4cOHDgwIEDBw4cOHDgwL2e1T97DjkrH+684fkscB44cODAgQMHDhw4cODAgQMHDhw4cODAgQMHDhw4cODAgQMHDhw4cODAgQMHDhw4cODAgQMHDlxkoxc3K7KbF/etyF68uC9FdvHi7oqs8+KKImu9uEGh7U7cqtgOJ25TbDcnblZsFyfurthaJ25QcJMPtyi60YebFd3Vh3soumZ34dZe4Y0u3Kz4OheuKEGHB7cpQ1cP7qEUHQ7cphx1DlxRkt7q436VpWaqjVt6pand6+LWQYnq9pq4tShV3VQPtxQlq3mvhfvsla/2T8YuGICQ5zB1GCswANqDYwEAAACAQf7Wc9hdXQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQMVQysJwSMnUAAAAASUVORK5CYII=)}html[dir] .firefox-lock-icon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAiBAMAAADfS4Y4AAAAJ1BMVEX////h99592WhExw8huwB82WdDxww2wwC16qzw++7E7rw3wwAqvgDD1MEAAAAAaElEQVR4AWOgEhAycVZEF2N1AQIFNMEUkKAzukIwCEARFHFxb5QocXFEEQxxqWRgmO7iimZkAwMDB5qhLi4TGBgYXVzQBEEkNQVXu8DBLrhgCULQG6EZCYw0wSMIMXe44HKEYBUD5QAAPMpGrgas65UAAAAASUVORK5CYII=)}html[dir] .opera-media-icon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAiCAMAAAAau2s5AAAAMFBMVEX////8/Py8vLyRkZGKior09PShoaGdnZ3j4+P19fWenp7s7Ozz8/OWlpbX19exsbF3sL3SAAAAhklEQVR42u3Tyw7DIAxEUcd2Gkz6+P+/rQwjgSKl00V27V2N0FkhkB9uUfM500Wy9dbmSP2YNrf1OTIvMlfcutvWnCN3jPkg0uUkMGo6DuE4hOMQjkM4Dne5Gtb4EkJyWCEpDEgKBZJDyJynz+yu/hDI4vbx4T6lyZx6/hXsheuO/hX+XdcbMdoFHMq0EBEAAAAASUVORK5CYII=)}html[dir] .edge-camera-error-icon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAiCAIAAACiBwxcAAACPElEQVRYw+2Wy0tqURTG7QG9KahZg4Ig6h+IqEnDHjRq0KRBEP0LKjgxFbyKkCapaYMzkpqcRg6UiBAHGoQNGpgDtZOdBB+R9hBMv7tP96AZ6b1axwbXjz1YfOxzfvuxNmuJ8EMSNcFN8H8F9vv9FEX9+pvsdnsymfw2cCAQkMvlWq3WUlVGo1GtVpNpkUjke8BWq5X8Nx6PV/8+m82yLKvX6202W9F0u90ulyuVStUDFovFPp/vH5fv9XrJfBIUCgWn0yl+k8FgqBMcjUZrAgeDQbJvlUrlcDg0Gk3jwAqFwmQyxWKxXC5neFODwCTRCPWP0yBwOBymaTqTyRSdBoFJTuXz+feOx+MRGPz8TCDY2MDICNra0N+PuTlYLLi7SyQSgoEfHyGVYnAQIlHZ6OzE9DQuLwUD7++jpeUjtTgmJ8GyAoAZBsPDPGNmBr29fLy6irExLujowM6OAGC1urS5szMcHXHB+jqenrC8zPvkvmsFy2QyUieqgefnS+DZWfKkcH6Omxvs7pb8gYGawWazWafThUKhiuCpqbIb3dvjzKurMrO1tWYwwzBKpVIikUg/E1e1iudJxtISHh5weorbWxwfl/yhoXoaAVLXSHU7+EzpdLrsSA8Psb3NBQsLuLjA5ibvLy4K0Prc32N8nAeQoLubj0dH+Zfd1QWKEqbnomn09FR8xySlK7dEXwNnsyQJuS1+QPb1YW0N19dCdpmvryCJtrWFiQm0t3OHvLKCkxO8vDT76ib4h/QbigR41LiPYooAAAAASUVORK5CYII=)}html[dir] .edge-mic-error-icon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAiCAIAAACiBwxcAAAC10lEQVRYw+2Xy0t6QRTH7UFBD3pQm4KgTdGuXQQRtGtTtGrTpv6FoLB3C8nQRYQLF6UJPYhCId0UKVhRBPagB1FaUJShVhqVmVqevsO9KAoVmPf3+/HDYbjMPQPzufd8z5wzI6K/1ERJ8E8tFAq9v78Hg0E8Pz4+/hDY6XSaTCapVNrd3S2TyXQ63fPzs+Dgx8dHjUYjl8tXV1ctFsvc3Fxvb+/s7KzH4xEQDMfOz8+LxWJgOA8HAgG73T46Orq1tSUg2O/3w8OLi4v4grARShsMBvhcQPDb2xt03d/fj7Gvra3BngQnwf8ZeGBgIPHg09NTl8v1Dfjm5mZvby/x4OHh4ZWVlW/ArO3uUmcn1dZSVRU1NNDICF1d/RasUChmZmZ8Ph8SJMZ6vT6qIjmdJBZTbi6JRFG9rIwmJ8nrjR+s1WqVSiXyM6rh9vY2MrPZbHY4HGzu/p5aWyklJZbK9dRU9k1f164fwNfX1yhBOzs7GHu9XtTEnp4e1CU219f3JZXr+fm0sBAnGDCVSjU2NhauDfhjq9VKR0dUUsIDOjpocJDS09k4I4OWlpje3FRzM93dxbmdbDabRCIZHx8HD2Lz1okJys6OgCH21BTV1xN8s7lJlZX8VHk5HRzECUZBPD4+Ru0bGhoyGo0Y836GimGvtrTQxQXd3mL/UU1NxJ6ZSRsbv0ogT09ParUaevf397P3rq4ogbOy6OSE2dfXY0PMbE7Amev8/ByxfQfZ5HL2N9zqRUWEHHJ4SEolPTzQ9DQVFkamLJaEHm9NJrYot3p7O52dMYExbmuj5WVqbOSn6uq+Sibxgl9fWcSGf6uiIuLe0lLKyeEFlkpxPkoY2O12X15esjgqKPhuH1dXk92eyJvEy8vLPdIWmtHIYhh7NwaJJApvc+EmyBUGeRvJBKdMaJmXR2lpVFxMTU2k0RCXVoW9OwEfCKB+EdILnhA1FEreFv8d8CcBz3QwH/B3YQAAAABJRU5ErkJggg==)}html[dir] .icon-doc-generic{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAA8CAYAAADL94L/AAAByElEQVR4Ae3axdJTQRAFYFyegA3u8ALseCDcicsGhxt3x+G32BXc3X3NBnfXYTqp3sZlhuqpOlXZRL46He9ReJyJxGSTEreaPfEHZiX+1uSJvelVNu+Jvjd7Yk9zI8aSUe0eDpjCIYfNSuw5v/zF5In/6mU27478tXriLJvXjdSwPq1lCDTCmxjiCNav8GZYBVMwWKagX8kWjk9vCcMhYWhEFEw1+oV0wZjdPKY6Vn9EwmBDTYPwBoXCYPLGDQTJjkHQNQRJj0FQtmgs+C8wOHIIkh2DoDu5vD5Xfkz9hsTBWDyxhjDYUDqvLRYSY1JilSQGyyxXOt4QKJPX70NDQmI27gyxHcn9bH/5RFMNAUgoDI4afOAMHBiCdiDNj5woGAhgsCEYudSI1lBCRwoPL957slAoDDYEoPXb/ZVs3FE/y9072fDxsx4BMPVfGOpl1VY/y5++4EWM1Fm9LcCKpy8RpnchDGEIQxjCEIYwhCEMYQhDGMIQhjCEIQxhCEMYwhCGMIQhDGEIQxhYNlXiP+XHXLRDM5thQVpyzIfS2YtLceVEkRmzalsgMArPhp258bA6b/LEb8LqPM930VNdvY/fhMmCxw+Of+4BTcPInBo2AAAAAElFTkSuQmCC)}html[dir] .icon-doc-doc{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAA8CAMAAAD8KXLNAAAAulBMVEUAAACPw/ePw/lgqvVfqvaUx/mQxPhfqfWjz/lfqfVfqvZgp/9cp/ZfqvZgqvaayPpTpPVfqvVjpvNgqfaQw/mjzvq42PdfqvZgqvZiq/ZwsveRxflkqe9rsPdcqPZeqPRorvfN5fzw9/5bp/Z2tvdZoOqTxvqCuvPj8P7+//+QxPmBvfl3su+Pw/lWpfWx1fuJwPlUpPWVxvnp8/7////4+/9ure3C3/uq0fvb7P1usffn8v15tfFMmOceGILeAAAAF3RSTlMAIdHm7ijJ+JH8eQeTzaw68foX1Ll9kGZdllAAAAEQSURBVHgB7dZVcsMwFIVhhTkp5krmMJcZ9r+sMl7PEczopfC/f7ZFtoUQreZuWVepJ3g73VKtoSvaKzDS6kp9abSsMtQumQ1HtYbZcCSl2TBkZRiyNU+o4m6WxYqzeUIFd/P0eO7m6fGsDUNmQ+lsypA0ll6E4XdkYSbrTTj96AlJczSJ1rOP7vrQsFt9dl/HBnX8y00Cg0YFqBtkKJuDbgdEwMSLM9Cp9GnUCWoD54AOYH7XZwRDhtQRagVNfA5azKXX9RmirpGRaowKfM6bt/NDekPZYa6rIAEGz/VwNfJvskGuy3FimAOVzzhvlA+Z//f1vyltu5p90Sw5mq2eEG1H03759e+Ua7aVO82WeASxdDP0M8Z9fAAAAABJRU5ErkJggg==)}html[dir] .icon-doc-pdf{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAA8CAMAAAD8KXLNAAAAvVBMVEUAAAD3d3fxRkbyRkbyRkb3fn74g4PyRUX3lZXzRUXyRUX/RkbyQED3fn7zRUX2iYn/Rkb4lpb0cHDvQEDzRETzRkbzQEDzQkLzOzv////939/yODj2enr4kJD0UVHzPT38xMT92tr5lZX1ZGT+6+v4g4P1bW35m5v7yMj91dX3fn76sLD1XFz6qan//f36trb+5OT0VVX6rKz7vb3yNDT4iIj/9vb0TEz5o6PtTEzlRUXsYWHiNzfyRETsSEiKDgROAAAAFHRSTlMAH+Z5+80n+JHu0AWTv6w6CX3V/BbNCjoAAAHfSURBVHgB7daDsisxGMDxHNtftLZqu+//WDebOu1p08H1f7D8zRoIoferx4djXb4htYvXy7vrI32NXi4U8v6KjzcbFTcKer48bQplS3dYwyhbwhpGRTpGRZpGoNvzjUT6RkU6RkX6RiJNM7dUhE/2NYkVhDU2lCgIa6DxxNr0eathBPoab5re6xjJ1pkaRu2XmP8GiIzKCSrHAW9NiKhiwKnKsFkukRMOZaWCVnWZA7uGxEaZn6UDApBGYjz3ekDFZtrGoig1FRPwZXnoQoXL6p0qwSTjy9pdxdicG41K1ue8g6kwRiWLOPcHQDzO84aoE7N9M2SMWX1eD11hal0zNMQ8tzQ2c0UU75saBXB9zhMmTJthsyc2J7cTuIRSQQ5sxzRZK9oYN4x4VGXCDMtz14IDxiusntiM0SILQ6oG71umMLKcHTCL+rEL+qZe5iWUwta+hUwYz7btoCAHTCdJEgcTgKUxY84NfPwc1AihABhLM+x2N+c6oICXqWa5RJo8bTQ59x04YgJhYMvIMnnvfGtivxmsTdr0RbmNCca0ZjR7FCtGNnCcAd6aEIELyhLFABXb35qg62k59v9d9d/8MnN5fa75QFeXZ5qvN4SezzTPCKEn8et/p9vD49UT+gEdNgrQ89qG8QAAAABJRU5ErkJggg==)}html[dir] .icon-doc-xls{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAA8CAMAAAD8KXLNAAAAulBMVEUAAACK4K5X0otX14eI362F3aqG4q1X0Yqe5LxX0YpW0otT0YhS0YdW0otW0otX0otY0Iug5Lqg5r2e5byf3rr///9O0IVR0IdU0YlX0otV0opV0YpKz4L+//5S0YjJ8dqK4K7p+fCQ4rKI36x426KL4K5t15p12qDT9OFy2Z5Lz4JXyIdZzotb046r6MVY0oz9/v2D3qpo15e47M593KXc9uj4/fqh5r5PxYHL8dvP8t687dCd5bue5bzVEOpnAAAAFXRSTlMAwekIyxwk+JHcffGW/KzN0Ss+eo5vCipPAAABZklEQVR4Ae3WhfaqMACA8dn1T3VBd9jd+v6PZY/L2YExbtdnKz8aAQBQar43eH18ArbKW7HGbVioMKT0JvFThh6LXorZxmRQ7VXAMIgPqDHLldyGTimPuaFqfmOWq/kNXSZxQ6ckaByTQQJm6TFIyoz4thlHQmbg2p4XR5II8mdOVPkzMny0HURtu9RkpUSpdWrE6//VBqnpoUQjS87mmNbGUZIMkfYwvZ0uJxjla83aurWG0Iq35pow6F0zIJz5vagg5BpDQRjjBYTzPqYhxeCbEbm+PUDN1yUaGf0Io8uyfDcyTc8yE0wIuZo5IjQ84RtrfGsF4WIcy/ru2xROb2nPVxrfhMvAdV0DQjNwacEy/A7r4BdtU6wi1L/tbyqiqZhvVvatEMKTZ39pxTVa4rrWvvc2naYFDcbQXGeWlhNQwhiM0sN/zv/1f1N8zWs6oFnMaVptAF5ympf7pf9HqyZa671ZAhesTDDT4wdnEAAAAABJRU5ErkJggg==)}html[dir] .icon-doc-txt{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAA8CAMAAAD8KXLNAAAAvVBMVEUAAACfsLihsrl5kJp4kJultrygsrl5j5uzv8Z4kJp4kJt1jZmhsrh4j5t0i6J4kJusucB5kJp5kJt5kJt/n59/mZlviJSzv8Wvu8H///91jZh4j5pzi5d3jpl5kJv6+vuhsrmuvMJ+lJ5yipaktLvAys/FztN7kZyaq7OJnaaNoKn+/v/7/P21wcfr7vDx8/Tt8fKHm6WVp6+RpK3f5OequL+DmKLP1tra4ON7kJtviJSesLduh5N1ipNrgYvfIttIAAAAGXRSTlMA0crm/Cgh+JHueZO/rAXNOvQX1AgK8X2QgEGk0gAAAcVJREFUeAHt1IWS2zAUBVAvM5T7BM/MYeb//6zeLIRBmh0o3ZBgjsiOHcf5dvvl5lDOnp3NfH44uzo/ED28v9wgXx/4cPTQO91Ad2fHjbcx06dzA7MxE7OJAbI3QNYG6MLeeCcX1gbo0t5geaaGFwbLMzNSZhvIwIg82kB8NFq0NhAfjxDNbLwIEBtEq+kys58wRpGLTK5hLDP6oPlv5DLz8qJtreOAQUUzol/KG2hhRJHE76nm1SSJWLKuxkk3X3bEhV41YUSL1FsJvgotMpfIb9MirheuGY9ct1JSWXHLRptrRIniAdGA2/MOotJ1y/pYLQ2SBgG36lQrUEhVF4PmXkluFqIuMWGNA3RsnUHYhmkK7FSnfaIOpukLOe9owYTb54aoF6MZCTEyUm+Kl465USgcMkAJIVXFFmbkYd+VXFsYHWAz8+1YmNDHLC5VvNDYiLxBFGNLnVQYmxhnFqCKU5BmRmc4AF+EL7eQOGIaL0ZyB6sKtOxhhQkfNLoX+VEgWfa6vl+8zOf7fopfNER6p2EplHj5VUppRgQKbw3i/7Pqv/mjzNmVrfnh3J5Zmu/PjnNnae4cx3m8fbq5Ms3N0+2j8ws7X1cWmnQE/gAAAABJRU5ErkJggg==)}html[dir] .icon-doc-ppt{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAA8CAMAAAD8KXLNAAAAvVBMVEUAAAD72HT712j4yTf4yTj52nn72XX4yDj73475yTn/yjT3xzr4yTn5yDn5xzH63IL4yDn4yDj62Hb4xCr84I755Kj5yDT5yTj////5yDf5yTn823j5xzD5xi75xiz5xSr72XX60FD//vv6zET6yz796az/++/tvjL6zkr84I797bz6yjn+89LzxTzzxDb84pTyzFv96rT71mnuxUr+9dz10Wb834v72HH+9Nb+9drruCP73ID+9+H856b85Jt3fPirAAAAFnRSTlMA0Rx5/CbJ+JHtB+TNrJI6l9S58X2QIoLA1AAAAW5JREFUeAHt1oN6A0EUQOGJnXq0ZmzV7/9YvXXXe2udj4N/EW0IIc3SQSOt1h4JV+w0auW0JofFEGl2ZHpiYlZDaL+RbcxqJWBq5WwTRhLKNnB5eANnwhtAWAMVKngDCG/g8vAGzoQ3gHKajRJCMrPpCkwAZRsxnZvKc4BkDtRbzTdPzU9yGGjae+68ns+MXmSAwfYzDDWyo0FDrW1Wg61FA0a/sHlWtqK92ajL8enY59w/i+t2AdaXasAw13FGQ849tx/NWXA+HDmOywJGCkoNMFcGjWZ4YGBBRN4fpt0ancnbKJPPC+qt0WAm1QiLUazRZkNLZTijX/NLhapYw23P0pEGWitCIA00EAxp7EWfIs+zViiTOOP1YRvK+IpQce8PXVpwXSgDSCA+bwaNpqeYpO+Pu0g18HWMNvZTTULvaSTdzQZJzXZUxhhAanL07b/X/6ZVw5pjUmohzRH8Re8iTffur3+7Uctbo11qkhvyszc0CTNWCAAAAABJRU5ErkJggg==)}html[dir] .bg-payments{background-image:url(data:image/png;base64,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)}html[dir] .payments-invite-upi{background-image:url(data:image/png;base64,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)}html[dir] .emoji.apple{background-size:100px 100px}html[dir] .emojik.apple{background-size:160px 160px}html[dir] .emoji.apple.b145{background-size:40px 60px}html[dir] .emojik.apple.b145{background-size:64px 96px}html[dir] .emoji.wa{background-size:100px 100px}html[dir] .emojik.wa{background-size:160px 160px}html[dir] .emoji.wa.b136{background-size:20px 40px}html[dir] .emojik.wa.b136{background-size:32px 64px}[role=button]{cursor:pointer}input::-ms-clear{display:none}#main:after{display:none}html[dir] #main:before{padding:0}.matched-text{font-weight:700;color:var(--highlight)}body.dark{color:var(--primary)}html[dir] body.dark{background-color:var(--app-background);background-image:none}body.debug :not(path):not(g){outline:solid 1px rgba(var(--primary-strong-rgb),.5)!important}body.e2e [data-testid]:hover{outline:solid 1px rgba(var(--primary-strong-rgb),.5)!important}body.e2e [data-testid]:hover:before{opacity:1}body.e2e [data-testid]:before{content:attr(data-testid);color:var(--app-background);position:absolute;white-space:nowrap;z-index:var(--layer-10);font-size:8pt;line-height:8px;pointer-events:none;top:0;width:-moz-max-content;width:max-content;height:-moz-max-content;height:max-content;transition:opacity .2s ease-in-out;opacity:0}html[dir] body.e2e [data-testid]:before{background-color:var(--primary-strong);border-radius:5px;border:1px solid var(--app-background);padding:3px}html[dir=ltr] body.e2e [data-testid]:before{left:50%;transform:translateX(-50%)}html[dir=rtl] body.e2e [data-testid]:before{right:50%;transform:translateX(50%)}body.e2e [data-testrobot]:hover{outline:2px dotted #ff4500!important}body.e2e [data-testrobot]:hover:after{opacity:1}body.e2e [data-testrobot]:after{content:attr(data-testrobot);color:var(--app-background);position:absolute;white-space:nowrap;z-index:var(--layer-10);font-size:8pt;line-height:8px;pointer-events:none;top:0;width:-moz-max-content;width:max-content;height:-moz-max-content;height:max-content;transition:opacity .2s ease-in-out;opacity:0}html[dir] body.e2e [data-testrobot]:after{background-color:#ff4500;border-radius:5px;border:1px solid var(--app-background);padding:3px;transform:translateX(0)}html[dir=ltr] body.e2e [data-testrobot]:after{left:0}html[dir=rtl] body.e2e [data-testrobot]:after{right:0}a{color:var(--link)}input[type=text]::-webkit-input-placeholder{font-size:15px;color:var(--input-placeholder)}.os-mac input[type=text]::-webkit-input-placeholder{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}input[type=text]::-moz-placeholder{font-size:15px;color:var(--input-placeholder)}input[type=text]::-ms-input-placeholder{font-size:15px;color:var(--input-placeholder)}select{box-sizing:border-box;width:100%;font-size:14px;line-height:18px;color:var(--primary-stronger);outline:none;-moz-appearance:none;-webkit-appearance:none;appearance:none;padding:6px 0;background-color:transparent;border:none;border-bottom:1px solid var(--border-strong);border-radius:0}html[dir] .dark select:focus{background-color:var(--panel-background)}.emoji,.emojik{display:inline-block;vertical-align:top;zoom:1}html[dir] .emoji,html[dir] .emojik{border:0}code .emoji{vertical-align:middle}.emoji{width:20px;height:20px;image-rendering:-webkit-optimize-contrast}html[dir=ltr] .emoji.apple{margin-right:1px;margin-left:1px}html[dir=rtl] .emoji.apple{margin-left:1px;margin-right:1px}.emojik{width:32px;height:32px;image-rendering:-webkit-optimize-contrast}.safari-fix .emoji,.safari-fix .emojik{image-rendering:unset}.overlay{position:fixed;top:0;box-sizing:border-box;width:100%;height:100%}html[dir=ltr] .overlay{left:0}html[dir=rtl] .overlay{right:0}:root{--dimmed:0.5;--layer-0:-1;--layer-1:100;--layer-2:200;--layer-3:300;--layer-4:400;--layer-5:500;--layer-6:600;--layer-7:700;--layer-8:800;--layer-9:900;--layer-10:1000;--radius-thumb:6px;--width-location-thumb:270px;--font-family-monospace:Consolas,Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,Courier,monospace;--chat-spacing:15px;--sticker-size-store:72px;--sticker-size-details:256px;--t-ease:cubic-bezier(0.1,0.82,0.25,1);--radius-app:3px;--h-pane-header:59px;--blur-radius-thumbnail:8px;--padding-psa-message:22px;--padding-drawer-bottom:32px;--padding-drawer-side:24px;--sticker-size-panel:100px;--compose-box-menu-item-width:26px;--compose-box-menu-height:52px;--compose-box-top-bottom-padding:5px;--compose-box-left-right-padding:10px;--compose-box-open-menu-width:110px;--compose-box-full-open-menu-width:152px;--compose-box-menu-item-spacing:16px;--compose-box-menu-width-status-reply:68px;--compose-box-open-menu-width-status-reply:110px;--line-height-quoted:20px;--line-height-quoted-author:22px;--quoted-compose-height-full:83px;--width-msg-bubble-with-media:336px;--cell-height:72px;--squircle-polygon:polygon(100% 50%,100% 56.6%,100% 59.3%,100% 61.4%,99.9% 63.2%,99.9% 64.8%,99.9% 66.2%,99.8% 67.5%,99.8% 68.7%,99.7% 69.8%,99.6% 70.8%,99.5% 71.8%,99.5% 72.8%,99.4% 73.7%,99.3% 74.6%,99.1% 75.4%,99% 76.3%,98.9% 77%,98.8% 77.8%,98.6% 78.5%,98.5% 79.2%,98.3% 79.9%,98.1% 80.6%,98% 81.3%,97.8% 81.9%,97.6% 82.5%,97.4% 83.1%,97.2% 83.7%,97% 84.3%,96.8% 84.8%,96.5% 85.4%,96.3% 85.9%,96% 86.4%,95.8% 86.9%,95.5% 87.4%,95.3% 87.9%,95% 88.3%,94.7% 88.8%,94.4% 89.2%,94.1% 89.7%,93.8% 90.1%,93.4% 90.5%,93.1% 90.9%,92.8% 91.3%,92.4% 91.7%,92% 92%,91.7% 92.4%,91.3% 92.8%,90.9% 93.1%,90.5% 93.4%,90.1% 93.8%,89.7% 94.1%,89.2% 94.4%,88.8% 94.7%,88.3% 95%,87.9% 95.3%,87.4% 95.5%,86.9% 95.8%,86.4% 96%,85.9% 96.3%,85.4% 96.5%,84.8% 96.8%,84.3% 97%,83.7% 97.2%,83.1% 97.4%,82.5% 97.6%,81.9% 97.8%,81.3% 98%,80.6% 98.1%,79.9% 98.3%,79.2% 98.5%,78.5% 98.6%,77.8% 98.8%,77% 98.9%,76.3% 99%,75.4% 99.1%,74.6% 99.3%,73.7% 99.4%,72.8% 99.5%,71.8% 99.5%,70.8% 99.6%,69.8% 99.7%,68.7% 99.8%,67.5% 99.8%,66.2% 99.9%,64.8% 99.9%,63.2% 99.9%,61.4% 100%,59.3% 100%,56.6% 100%,50% 100%,43.4% 100%,40.7% 100%,38.6% 100%,36.8% 99.9%,35.2% 99.9%,33.8% 99.9%,32.5% 99.8%,31.3% 99.8%,30.2% 99.7%,29.2% 99.6%,28.2% 99.5%,27.2% 99.5%,26.3% 99.4%,25.4% 99.3%,24.6% 99.1%,23.7% 99%,23% 98.9%,22.2% 98.8%,21.5% 98.6%,20.8% 98.5%,20.1% 98.3%,19.4% 98.1%,18.7% 98%,18.1% 97.8%,17.5% 97.6%,16.9% 97.4%,16.3% 97.2%,15.7% 97%,15.2% 96.8%,14.6% 96.5%,14.1% 96.3%,13.6% 96%,13.1% 95.8%,12.6% 95.5%,12.1% 95.3%,11.7% 95%,11.2% 94.7%,10.8% 94.4%,10.3% 94.1%,9.9% 93.8%,9.5% 93.4%,9.1% 93.1%,8.7% 92.8%,8.3% 92.4%,8% 92%,7.6% 91.7%,7.2% 91.3%,6.9% 90.9%,6.6% 90.5%,6.2% 90.1%,5.9% 89.7%,5.6% 89.2%,5.3% 88.8%,5% 88.3%,4.7% 87.9%,4.5% 87.4%,4.2% 86.9%,4% 86.4%,3.7% 85.9%,3.5% 85.4%,3.2% 84.8%,3% 84.3%,2.8% 83.7%,2.6% 83.1%,2.4% 82.5%,2.2% 81.9%,2% 81.3%,1.9% 80.6%,1.7% 79.9%,1.5% 79.2%,1.4% 78.5%,1.2% 77.8%,1.1% 77%,1% 76.3%,0.9% 75.4%,0.7% 74.6%,0.6% 73.7%,0.5% 72.8%,0.5% 71.8%,0.4% 70.8%,0.3% 69.8%,0.2% 68.7%,0.2% 67.5%,0.1% 66.2%,0.1% 64.8%,0.1% 63.2%,0% 61.4%,0% 59.3%,0% 56.6%,0% 50%,0% 43.4%,0% 40.7%,0% 38.6%,0.1% 36.8%,0.1% 35.2%,0.1% 33.8%,0.2% 32.5%,0.2% 31.3%,0.3% 30.2%,0.4% 29.2%,0.5% 28.2%,0.5% 27.2%,0.6% 26.3%,0.7% 25.4%,0.9% 24.6%,1% 23.7%,1.1% 23%,1.2% 22.2%,1.4% 21.5%,1.5% 20.8%,1.7% 20.1%,1.9% 19.4%,2% 18.7%,2.2% 18.1%,2.4% 17.5%,2.6% 16.9%,2.8% 16.3%,3% 15.7%,3.2% 15.2%,3.5% 14.6%,3.7% 14.1%,4% 13.6%,4.2% 13.1%,4.5% 12.6%,4.7% 12.1%,5% 11.7%,5.3% 11.2%,5.6% 10.8%,5.9% 10.3%,6.2% 9.9%,6.6% 9.5%,6.9% 9.1%,7.2% 8.7%,7.6% 8.3%,8% 8%,8.3% 7.6%,8.7% 7.2%,9.1% 6.9%,9.5% 6.6%,9.9% 6.2%,10.3% 5.9%,10.8% 5.6%,11.2% 5.3%,11.7% 5%,12.1% 4.7%,12.6% 4.5%,13.1% 4.2%,13.6% 4%,14.1% 3.7%,14.6% 3.5%,15.2% 3.2%,15.7% 3%,16.3% 2.8%,16.9% 2.6%,17.5% 2.4%,18.1% 2.2%,18.7% 2%,19.4% 1.9%,20.1% 1.7%,20.8% 1.5%,21.5% 1.4%,22.2% 1.2%,23% 1.1%,23.7% 1%,24.6% 0.9%,25.4% 0.7%,26.3% 0.6%,27.2% 0.5%,28.2% 0.5%,29.2% 0.4%,30.2% 0.3%,31.3% 0.2%,32.5% 0.2%,33.8% 0.1%,35.2% 0.1%,36.8% 0.1%,38.6% 0%,40.7% 0%,43.4% 0%,50% 0%,56.6% 0%,59.3% 0%,61.4% 0%,63.2% 0.1%,64.8% 0.1%,66.2% 0.1%,67.5% 0.2%,68.7% 0.2%,69.8% 0.3%,70.8% 0.4%,71.8% 0.5%,72.8% 0.5%,73.7% 0.6%,74.6% 0.7%,75.4% 0.9%,76.3% 1%,77% 1.1%,77.8% 1.2%,78.5% 1.4%,79.2% 1.5%,79.9% 1.7%,80.6% 1.9%,81.3% 2%,81.9% 2.2%,82.5% 2.4%,83.1% 2.6%,83.7% 2.8%,84.3% 3%,84.8% 3.2%,85.4% 3.5%,85.9% 3.7%,86.4% 4%,86.9% 4.2%,87.4% 4.5%,87.9% 4.7%,88.3% 5%,88.8% 5.3%,89.2% 5.6%,89.7% 5.9%,90.1% 6.2%,90.5% 6.6%,90.9% 6.9%,91.3% 7.2%,91.7% 7.6%,92% 8%,92.4% 8.3%,92.8% 8.7%,93.1% 9.1%,93.4% 9.5%,93.8% 9.9%,94.1% 10.3%,94.4% 10.8%,94.7% 11.2%,95% 11.7%,95.3% 12.1%,95.5% 12.6%,95.8% 13.1%,96% 13.6%,96.3% 14.1%,96.5% 14.6%,96.8% 15.2%,97% 15.7%,97.2% 16.3%,97.4% 16.9%,97.6% 17.5%,97.8% 18.1%,98% 18.7%,98.1% 19.4%,98.3% 20.1%,98.5% 20.8%,98.6% 21.5%,98.8% 22.2%,98.9% 23%,99% 23.7%,99.1% 24.6%,99.3% 25.4%,99.4% 26.3%,99.5% 27.2%,99.5% 28.2%,99.6% 29.2%,99.7% 30.2%,99.8% 31.3%,99.8% 32.5%,99.9% 33.8%,99.9% 35.2%,99.9% 36.8%,100% 38.6%,100% 40.7%,100% 43.4%);--width-album-grid-bubble:168px;--width-album-extra-padding:3px;--width-video-portrait-bubble:246px;--preview-thumb-size:90px;--preview-thumb-size-small:52px;--height-thumb-shade:28px;--thumb-spacing:6px;--thumb-width:78px;--thumb-height:78px;--height-video-thumb:160px;--width-video-link-preview-bubble:286px;--t-fast:0.08s;--bubble-padding:3px;--width-payment-bubble:286px;--drawer-header-line-height:23px;--text-size-small:12.6px;--quote-right-margin:64px;--quote-left-margin:66px;--colors-modal-search-bar-height:49px;--w-select:40px;--radius-bubble:7.5px}:root{--wds-pink-50:#fff5f8;--wds-pink-50-rgb:255,245,248;--wds-pink-75:#ffebf1;--wds-pink-75-rgb:255,235,241;--wds-pink-100:#ffdae7;--wds-pink-100-rgb:255,218,231;--wds-pink-200:#ffabc7;--wds-pink-200-rgb:255,171,199;--wds-pink-300:#ff72a1;--wds-pink-300-rgb:255,114,161;--wds-pink-400:#ff2e74;--wds-pink-400-rgb:255,46,116;--wds-pink-500:#d42a66;--wds-pink-500-rgb:212,42,102;--wds-pink-600:#a32553;--wds-pink-600-rgb:163,37,83;--wds-pink-700:#6d1e3e;--wds-pink-700-rgb:109,30,62;--wds-pink-800:#36192a;--wds-pink-800-rgb:54,25,42;--wds-red-50:#feeff2;--wds-red-50-rgb:254,239,242;--wds-red-75:#fde8eb;--wds-red-75-rgb:253,232,235;--wds-red-100:#fbd8dc;--wds-red-100-rgb:251,216,220;--wds-red-200:#faa0aa;--wds-red-200-rgb:250,160,170;--wds-red-300:#f15c6d;--wds-red-300-rgb:241,92,109;--wds-red-400:#ea0038;--wds-red-400-rgb:234,0,56;--wds-red-500:#b80531;--wds-red-500-rgb:184,5,49;--wds-red-600:#911435;--wds-red-600-rgb:145,20,53;--wds-red-700:#61182e;--wds-red-700-rgb:97,24,46;--wds-red-800:#321622;--wds-red-800-rgb:50,22,34;--wds-orange-50:#fff7f5;--wds-orange-50-rgb:255,247,245;--wds-orange-75:#ffebe6;--wds-orange-75-rgb:255,235,230;--wds-orange-100:#fee2d8;--wds-orange-100-rgb:254,226,216;--wds-orange-200:#fdc1ad;--wds-orange-200-rgb:253,193,173;--wds-orange-300:#fc9775;--wds-orange-300-rgb:252,151,117;--wds-orange-400:#fa6533;--wds-orange-400-rgb:250,101,51;--wds-orange-500:#c4532d;--wds-orange-500-rgb:196,83,45;--wds-orange-600:#9a4529;--wds-orange-600-rgb:154,69,41;--wds-orange-700:#6b3424;--wds-orange-700-rgb:107,52,36;--wds-orange-800:#35221e;--wds-orange-800-rgb:53,34,30;--wds-yellow-50:#fcfcf5;--wds-yellow-50-rgb:252,252,245;--wds-yellow-75:#fff7e5;--wds-yellow-75-rgb:255,247,229;--wds-yellow-100:#fff0d4;--wds-yellow-100-rgb:255,240,212;--wds-yellow-200:#ffe4af;--wds-yellow-200-rgb:255,228,175;--wds-yellow-300:#ffd279;--wds-yellow-300-rgb:255,210,121;--wds-yellow-400:#ffbc38;--wds-yellow-400-rgb:255,188,56;--wds-yellow-500:#c89631;--wds-yellow-500-rgb:200,150,49;--wds-yellow-600:#9d792c;--wds-yellow-600-rgb:157,121,44;--wds-yellow-700:#6d5726;--wds-yellow-700-rgb:109,87,38;--wds-yellow-800:#36311f;--wds-yellow-800-rgb:54,49,31;--wds-green-50:#f2fdf0;--wds-green-50-rgb:242,253,240;--wds-green-75:#e7fce3;--wds-green-75-rgb:231,252,227;--wds-green-100:#d9fdd3;--wds-green-100-rgb:217,253,211;--wds-green-200:#acfcac;--wds-green-200-rgb:172,252,172;--wds-green-300:#71eb85;--wds-green-300-rgb:113,235,133;--wds-green-400:#25d366;--wds-green-400-rgb:37,211,102;--wds-green-500:#1fa855;--wds-green-500-rgb:31,168,85;--wds-green-600:#1b8748;--wds-green-600-rgb:27,135,72;--wds-green-700:#156038;--wds-green-700-rgb:21,96,56;--wds-green-800:#103527;--wds-green-800-rgb:16,53,39;--wds-emerald-50:#f0fff9;--wds-emerald-50-rgb:240,255,249;--wds-emerald-75:#e1fef2;--wds-emerald-75-rgb:225,254,242;--wds-emerald-100:#d5fded;--wds-emerald-100-rgb:213,253,237;--wds-emerald-200:#b2f5da;--wds-emerald-200-rgb:178,245,218;--wds-emerald-300:#7ae3c3;--wds-emerald-300-rgb:122,227,195;--wds-emerald-400:#06cf9c;--wds-emerald-400-rgb:6,207,156;--wds-emerald-500:#00a884;--wds-emerald-500-rgb:0,168,132;--wds-emerald-600:#008069;--wds-emerald-600-rgb:0,128,105;--wds-emerald-700:#125c4e;--wds-emerald-700-rgb:18,92,78;--wds-emerald-800:#0a332c;--wds-emerald-800-rgb:10,51,44;--wds-teal-50:#edfafa;--wds-teal-50-rgb:237,250,250;--wds-teal-75:#dff6f5;--wds-teal-75-rgb:223,246,245;--wds-teal-100:#cbf2ee;--wds-teal-100-rgb:203,242,238;--wds-teal-200:#95dbd4;--wds-teal-200-rgb:149,219,212;--wds-teal-300:#42c7b8;--wds-teal-300-rgb:66,199,184;--wds-teal-400:#02a698;--wds-teal-400-rgb:2,166,152;--wds-teal-500:#028377;--wds-teal-500-rgb:2,131,119;--wds-teal-600:#046a62;--wds-teal-600-rgb:4,106,98;--wds-teal-700:#074d4a;--wds-teal-700-rgb:7,77,74;--wds-teal-800:#092d2f;--wds-teal-800-rgb:9,45,47;--wds-sky-blue-50:#f2fafe;--wds-sky-blue-50-rgb:242,250,254;--wds-sky-blue-75:#def3fc;--wds-sky-blue-75-rgb:222,243,252;--wds-sky-blue-100:#caecfa;--wds-sky-blue-100-rgb:202,236,250;--wds-sky-blue-200:#93d7f5;--wds-sky-blue-200-rgb:147,215,245;--wds-sky-blue-300:#53bdeb;--wds-sky-blue-300-rgb:83,189,235;--wds-sky-blue-400:#009de2;--wds-sky-blue-400-rgb:0,157,226;--wds-sky-blue-500:#027eb5;--wds-sky-blue-500-rgb:2,126,181;--wds-sky-blue-600:#046692;--wds-sky-blue-600-rgb:4,102,146;--wds-sky-blue-700:#074b6a;--wds-sky-blue-700-rgb:7,75,106;--wds-sky-blue-800:#092c3d;--wds-sky-blue-800-rgb:9,44,61;--wds-cobalt-50:#f2f8ff;--wds-cobalt-50-rgb:242,248,255;--wds-cobalt-75:#e1f0ff;--wds-cobalt-75-rgb:225,240,255;--wds-cobalt-100:#d2e8ff;--wds-cobalt-100-rgb:210,232,255;--wds-cobalt-200:#99cafe;--wds-cobalt-200-rgb:153,202,254;--wds-cobalt-300:#53a6fd;--wds-cobalt-300-rgb:83,166,253;--wds-cobalt-400:#007bfc;--wds-cobalt-400-rgb:0,123,252;--wds-cobalt-500:#0063cb;--wds-cobalt-500-rgb:0,99,203;--wds-cobalt-600:#0451a3;--wds-cobalt-600-rgb:4,81,163;--wds-cobalt-700:#073d76;--wds-cobalt-700-rgb:7,61,118;--wds-cobalt-800:#092642;--wds-cobalt-800-rgb:9,38,66;--wds-purple-50:#f7f5ff;--wds-purple-50-rgb:247,245,255;--wds-purple-75:#efebff;--wds-purple-75-rgb:239,235,255;--wds-purple-100:#e8e0ff;--wds-purple-100-rgb:232,224,255;--wds-purple-200:#d1c4ff;--wds-purple-200-rgb:209,196,255;--wds-purple-300:#a791ff;--wds-purple-300-rgb:167,145,255;--wds-purple-400:#7f66ff;--wds-purple-400-rgb:127,102,255;--wds-purple-500:#5e47de;--wds-purple-500-rgb:94,71,222;--wds-purple-600:#4837af;--wds-purple-600-rgb:72,55,175;--wds-purple-700:#3a327b;--wds-purple-700-rgb:58,50,123;--wds-purple-800:#242447;--wds-purple-800-rgb:36,36,71;--wds-cool-gray-50:#f7f8fa;--wds-cool-gray-50-rgb:247,248,250;--wds-cool-gray-75:#f0f2f5;--wds-cool-gray-75-rgb:240,242,245;--wds-cool-gray-100:#e9edef;--wds-cool-gray-100-rgb:233,237,239;--wds-cool-gray-200:#d1d7db;--wds-cool-gray-200-rgb:209,215,219;--wds-cool-gray-300:#aebac1;--wds-cool-gray-300-rgb:174,186,193;--wds-cool-gray-400:#8696a0;--wds-cool-gray-400-rgb:134,150,160;--wds-cool-gray-500:#667781;--wds-cool-gray-500-rgb:102,119,129;--wds-cool-gray-600:#54656f;--wds-cool-gray-600-rgb:84,101,111;--wds-cool-gray-700:#3b4a54;--wds-cool-gray-700-rgb:59,74,84;--wds-cool-gray-800:#202c33;--wds-cool-gray-800-rgb:32,44,51;--wds-cool-gray-900:#111b21;--wds-cool-gray-900-rgb:17,27,33;--wds-cool-gray-1000:#0b141a;--wds-cool-gray-1000-rgb:11,20,26;--wds-white-alpha-05:hsla(0,0%,100%,0.05);--wds-white-alpha-05-rgb:255,255,255;--wds-white-alpha-10:hsla(0,0%,100%,0.1);--wds-white-alpha-10-rgb:255,255,255;--wds-white-alpha-20:hsla(0,0%,100%,0.2);--wds-white-alpha-20-rgb:255,255,255;--wds-white-alpha-30:hsla(0,0%,100%,0.3);--wds-white-alpha-30-rgb:255,255,255;--wds-white-alpha-40:hsla(0,0%,100%,0.4);--wds-white-alpha-40-rgb:255,255,255;--wds-white-alpha-50:hsla(0,0%,100%,0.5);--wds-white-alpha-50-rgb:255,255,255;--wds-white-alpha-60:hsla(0,0%,100%,0.6);--wds-white-alpha-60-rgb:255,255,255;--wds-white-alpha-70:hsla(0,0%,100%,0.7);--wds-white-alpha-70-rgb:255,255,255;--wds-white-alpha-80:hsla(0,0%,100%,0.8);--wds-white-alpha-80-rgb:255,255,255;--wds-white-alpha-90:hsla(0,0%,100%,0.9);--wds-white-alpha-90-rgb:255,255,255;--wds-cool-gray-alpha-05:rgba(11,20,26,0.05);--wds-cool-gray-alpha-05-rgb:11,20,26;--wds-cool-gray-alpha-10:rgba(11,20,26,0.1);--wds-cool-gray-alpha-10-rgb:11,20,26;--wds-cool-gray-alpha-20:rgba(11,20,26,0.2);--wds-cool-gray-alpha-20-rgb:11,20,26;--wds-cool-gray-alpha-30:rgba(11,20,26,0.3);--wds-cool-gray-alpha-30-rgb:11,20,26;--wds-cool-gray-alpha-40:rgba(11,20,26,0.4);--wds-cool-gray-alpha-40-rgb:11,20,26;--wds-cool-gray-alpha-50:rgba(11,20,26,0.5);--wds-cool-gray-alpha-50-rgb:11,20,26;--wds-cool-gray-alpha-60:rgba(11,20,26,0.6);--wds-cool-gray-alpha-60-rgb:11,20,26;--wds-cool-gray-alpha-70:rgba(11,20,26,0.7);--wds-cool-gray-alpha-70-rgb:11,20,26;--wds-cool-gray-alpha-80:rgba(11,20,26,0.8);--wds-cool-gray-alpha-80-rgb:11,20,26;--wds-cool-gray-alpha-90:rgba(11,20,26,0.9);--wds-cool-gray-alpha-90-rgb:11,20,26;--wds-transparent:transparent;--wds-transparent-rgb:0,0,0;--wds-black:#000;--wds-black-rgb:0,0,0;--wds-white:#fff;--wds-white-rgb:255,255,255}:root{--beige:#ede7dc;--beige-rgb:237,231,220;--black:#0b141a;--black-rgb:11,20,26;--blue-light:#009de2;--blue-light-rgb:0,157,226;--blue-ocean:#93d7f5;--blue-ocean-rgb:147,215,245;--blue-sky:#93d7f5;--blue-sky-rgb:147,215,245;--blue:#027eb5;--blue-rgb:2,126,181;--dark:#0b141a;--dark-rgb:11,20,26;--green-deep:#1fa855;--green-deep-rgb:31,168,85;--green:#25d366;--green-rgb:37,211,102;--green-accent:#25d366;--green-accent-rgb:37,211,102;--orange:#fc9775;--orange-rgb:252,151,117;--pale-blue-green:#d5fded;--pale-blue-green-rgb:213,253,237;--pale-green:#d9fdd3;--pale-green-rgb:217,253,211;--pale-yellow:#fff0d4;--pale-yellow-rgb:255,240,212;--red-light:#f15c6d;--red-light-rgb:241,92,109;--red:#ea0038;--red-rgb:234,0,56;--teal-light:#7ae3c3;--teal-light-rgb:122,227,195;--teal-lighter:#00a884;--teal-lighter-rgb:0,168,132;--teal:#008069;--teal-rgb:0,128,105;--white:#fff;--white-rgb:255,255,255;--yellow:#ffd279;--yellow-rgb:255,210,121;--gray-30:#f7f8fa;--gray-30-rgb:247,248,250;--gray-60:#f0f2f5;--gray-60-rgb:240,242,245;--gray-70:#f0f2f5;--gray-70-rgb:240,242,245;--gray-100:#e9edef;--gray-100-rgb:233,237,239;--gray-150:#d1d7db;--gray-150-rgb:209,215,219;--gray-200:#d1d7db;--gray-200-rgb:209,215,219;--gray-300:#aebac1;--gray-300-rgb:174,186,193;--gray-400:#8696a0;--gray-400-rgb:134,150,160;--gray-500:#667781;--gray-500-rgb:102,119,129;--gray-600:#54656f;--gray-600-rgb:84,101,111;--gray-700:#3b4a54;--gray-700-rgb:59,74,84;--gray-800:#202c33;--gray-800-rgb:32,44,51;--gray-850:#111b21;--gray-850-rgb:17,27,33;--gray-900:#111b21;--gray-900-rgb:17,27,33}.light,:root{--active-tab-marker:#008069;--active-tab-marker-rgb:0,128,105;--app-background:#eae6df;--app-background-rgb:234,230,223;--app-background-deeper:#d1d7db;--app-background-deeper-rgb:209,215,219;--app-background-stripe:#00a884;--app-background-stripe-rgb:0,168,132;--attach-media-drop-border:rgba(11,20,26,0.3);--attach-media-drop-border-rgb:11,20,26;--attach-media-drop-overlay:hsla(0,0%,100%,0.6);--attach-media-drop-overlay-rgb:255,255,255;--audio-control-incoming:#9c8d8d;--audio-control-incoming-rgb:156,141,141;--audio-control-outgoing:#6f8171;--audio-control-outgoing-rgb:111,129,113;--audio-progress-incoming:#4ada80;--audio-progress-incoming-rgb:74,218,128;--audio-progress-outgoing:#8da78f;--audio-progress-outgoing-rgb:141,167,143;--audio-progress-played-incoming:#30b0e8;--audio-progress-played-incoming-rgb:48,176,232;--audio-progress-played-outgoing:#29afdf;--audio-progress-played-outgoing-rgb:41,175,223;--audio-progress-metadata:#8696a0;--audio-progress-metadata-rgb:134,150,160;--audio-track-incoming:#e7e8e9;--audio-track-incoming-rgb:231,232,233;--audio-track-outgoing:#c5e6c1;--audio-track-outgoing-rgb:197,230,193;--avatar-background:#e9edef;--avatar-background-rgb:233,237,239;--avatar-border:#fff;--avatar-border-rgb:255,255,255;--avatar-circle-gray-light:#e9edef;--avatar-circle-gray-light-rgb:233,237,239;--avatar-circle-gray:#d1d7db;--avatar-circle-gray-rgb:209,215,219;--avatar-circle-gray-active:#d1d7db;--avatar-circle-gray-active-rgb:209,215,219;--avatar-circle-gray-dark:#aebac1;--avatar-circle-gray-dark-rgb:174,186,193;--avatar-circle-green-lighter:#d9fdd3;--avatar-circle-green-lighter-rgb:217,253,211;--avatar-circle-green-light:#acfcac;--avatar-circle-green-light-rgb:172,252,172;--avatar-circle-green:#c4f9c3;--avatar-circle-green-rgb:196,249,195;--avatar-circle-green-dark:#a0f9a4;--avatar-circle-green-dark-rgb:160,249,164;--avatar-placeholder-background:#dfe5e7;--avatar-placeholder-background-rgb:223,229,231;--avatar-placeholder-primary:#fff;--avatar-placeholder-primary-rgb:255,255,255;--archived-chat-marker:#54656f;--archived-chat-marker-rgb:84,101,111;--archived-chat-marker-border:#e9edef;--archived-chat-marker-border-rgb:233,237,239;--archived-chat-marker-background:#e9edef;--archived-chat-marker-background-rgb:233,237,239;--archived-chat-persistent-header-background:#f0f2f5;--archived-chat-persistent-header-background-rgb:240,242,245;--background-default:#fff;--background-default-rgb:255,255,255;--background-document-with-captions:#f0f2f5;--background-document-with-captions-rgb:240,242,245;--background-default-active:#f0f2f5;--background-default-active-rgb:240,242,245;--background-default-hover:#f5f6f6;--background-default-hover-rgb:245,246,246;--badge-icon:#fff;--badge-icon-rgb:255,255,255;--badge-pending:#00a884;--badge-pending-rgb:0,168,132;--border-bubble:rgba(17,27,33,0.06);--border-bubble-rgb:17,27,33;--border-deeper:#e9edef;--border-deeper-rgb:233,237,239;--border-default:#e9edef;--border-default-rgb:233,237,239;--border-list:#e9edef;--border-list-rgb:233,237,239;--border-panel:#e9edef;--border-panel-rgb:233,237,239;--border-strong:#e9edef;--border-strong-rgb:233,237,239;--border-stronger:#e9edef;--border-stronger-rgb:233,237,239;--border-document-footer:#d9d9d9;--border-document-footer-rgb:217,217,217;--bubble-meta:#667781;--bubble-meta-rgb:102,119,129;--bubble-meta-icon:#8696a0;--bubble-meta-icon-rgb:134,150,160;--business-name-title:#111b21;--business-name-title-rgb:17,27,33;--business-name-subtitle:#aebac1;--business-name-subtitle-rgb:174,186,193;--butterbar-battery-background:#f15c6d;--butterbar-battery-background-rgb:241,92,109;--butterbar-battery-icon:#fff;--butterbar-battery-icon-rgb:255,255,255;--butterbar-battery-primary:#fff;--butterbar-battery-primary-rgb:255,255,255;--butterbar-battery-secondary:#fff;--butterbar-battery-secondary-rgb:255,255,255;--butterbar-connection-background:#ffd279;--butterbar-connection-background-rgb:255,210,121;--butterbar-connection-primary:#111b21;--butterbar-connection-primary-rgb:17,27,33;--butterbar-connection-secondary:#202c33;--butterbar-connection-secondary-rgb:32,44,51;--butterbar-connection-icon:#fff;--butterbar-connection-icon-rgb:255,255,255;--butterbar-desktop-upsell-icon:#fff;--butterbar-desktop-upsell-icon-rgb:255,255,255;--butterbar-phone-icon-shape:#ffd279;--butterbar-phone-icon-shape-rgb:255,210,121;--butterbar-default-background:#53bdeb;--butterbar-default-background-rgb:83,189,235;--butterbar-fatal-background:#ffd279;--butterbar-fatal-background-rgb:255,210,121;--butterbar-fatal-primary:#111b21;--butterbar-fatal-primary-rgb:17,27,33;--butterbar-fatal-secondary:#202c33;--butterbar-fatal-secondary-rgb:32,44,51;--butterbar-fatal-icon:#fff;--butterbar-fatal-icon-rgb:255,255,255;--butterbar-icon:#fff;--butterbar-icon-rgb:255,255,255;--butterbar-icon-dismiss:#fff;--butterbar-icon-dismiss-rgb:255,255,255;--butterbar-notice-background:#e1fef2;--butterbar-notice-background-rgb:225,254,242;--butterbar-notice-circle:#00a884;--butterbar-notice-circle-rgb:0,168,132;--butterbar-notice-icon:#fff;--butterbar-notice-icon-rgb:255,255,255;--butterbar-notice-smb-background:#d8e9f2;--butterbar-notice-smb-background-rgb:216,233,242;--butterbar-notice-smb-circle:#fff;--butterbar-notice-smb-circle-rgb:255,255,255;--butterbar-notice-smb-icon:#3a5564;--butterbar-notice-smb-icon-rgb:58,85,100;--butterbar-notification-icon:#fff;--butterbar-notification-icon-rgb:255,255,255;--butterbar-primary:#111b21;--butterbar-primary-rgb:17,27,33;--butterbar-secondary:#202c33;--butterbar-secondary-rgb:32,44,51;--butterbar-update-background:#e1fef2;--butterbar-update-background-rgb:225,254,242;--butterbar-update-icon:#00a884;--butterbar-update-icon-rgb:0,168,132;--butterbar-green-nux-primary:#111b21;--butterbar-green-nux-primary-rgb:17,27,33;--butterbar-green-nux-secondary:#202c33;--butterbar-green-nux-secondary-rgb:32,44,51;--butterbar-green-nux-background:#e1fef2;--butterbar-green-nux-background-rgb:225,254,242;--butterbar-green-nux-icon:#fff;--butterbar-green-nux-icon-rgb:255,255,255;--butterbar-green-nux-icon-background:#00a884;--butterbar-green-nux-icon-background-rgb:0,168,132;--butterbar-green-nux-icon-dismiss:#54656f;--butterbar-green-nux-icon-dismiss-rgb:84,101,111;--butterbar-blue-nux-primary:#111b21;--butterbar-blue-nux-primary-rgb:17,27,33;--butterbar-blue-nux-secondary:#202c33;--butterbar-blue-nux-secondary-rgb:32,44,51;--butterbar-blue-nux-background:#caecfa;--butterbar-blue-nux-background-rgb:202,236,250;--butterbar-blue-nux-icon:#fff;--butterbar-blue-nux-icon-rgb:255,255,255;--butterbar-blue-nux-icon-background:#009de2;--butterbar-blue-nux-icon-background-rgb:0,157,226;--butterbar-blue-nux-icon-dismiss:#54656f;--butterbar-blue-nux-icon-dismiss-rgb:84,101,111;--butterbar-ad-action-info-primary:#111b21;--butterbar-ad-action-info-primary-rgb:17,27,33;--butterbar-ad-action-info-secondary:#202c33;--butterbar-ad-action-info-secondary-rgb:32,44,51;--butterbar-ad-action-info-background:#e1fef2;--butterbar-ad-action-info-background-rgb:225,254,242;--butterbar-ad-action-info-icon:#fff;--butterbar-ad-action-info-icon-rgb:255,255,255;--butterbar-ad-action-info-icon-background:#00a884;--butterbar-ad-action-info-icon-background-rgb:0,168,132;--butterbar-ad-action-info-icon-dismiss:#54656f;--butterbar-ad-action-info-icon-dismiss-rgb:84,101,111;--butterbar-ad-action-warning-primary:#111b21;--butterbar-ad-action-warning-primary-rgb:17,27,33;--butterbar-ad-action-warning-secondary:#202c33;--butterbar-ad-action-warning-secondary-rgb:32,44,51;--butterbar-ad-action-warning-background:#ffd279;--butterbar-ad-action-warning-background-rgb:255,210,121;--butterbar-ad-action-warning-icon:#ffd279;--butterbar-ad-action-warning-icon-rgb:255,210,121;--butterbar-ad-action-warning-icon-background:#fff;--butterbar-ad-action-warning-icon-background-rgb:255,255,255;--butterbar-ad-action-warning-icon-dismiss:#54656f;--butterbar-ad-action-warning-icon-dismiss-rgb:84,101,111;--button-alternative:#009de2;--button-alternative-rgb:0,157,226;--button-alternative-background:#fff;--button-alternative-background-rgb:255,255,255;--button-background-disabled:#e9edef;--button-background-disabled-rgb:233,237,239;--button-bubble:rgba(0,128,105,0.7);--button-bubble-rgb:0,128,105;--button-plain-background:#fff;--button-plain-background-rgb:255,255,255;--button-plain-background-hover:#fff;--button-plain-background-hover-rgb:255,255,255;--button-plain:#54656f;--button-plain-rgb:84,101,111;--button-plain-hover:#3b4a54;--button-plain-hover-rgb:59,74,84;--button-primary:#fff;--button-primary-rgb:255,255,255;--button-primary-background:#008069;--button-primary-background-rgb:0,128,105;--button-primary-background-hover:#017561;--button-primary-background-hover-rgb:1,117,97;--button-round-background:#00a884;--button-round-background-rgb:0,168,132;--button-round-background-inverted:#f3f5f6;--button-round-background-inverted-rgb:243,245,246;--button-round-icon-inverted:#00a884;--button-round-icon-inverted-rgb:0,168,132;--button-disabled:#aebac1;--button-disabled-rgb:174,186,193;--button-secondary:#008069;--button-secondary-rgb:0,128,105;--button-secondary-border:#e9edef;--button-secondary-border-rgb:233,237,239;--button-secondary-background:#fff;--button-secondary-background-rgb:255,255,255;--button-secondary-background-hover:#fff;--button-secondary-background-hover-rgb:255,255,255;--button-secondary-hover:#017561;--button-secondary-hover-rgb:1,117,97;--button-focus:#fff;--button-focus-rgb:255,255,255;--button-focus-outline:#00a884;--button-focus-outline-rgb:0,168,132;--button-approve:#008069;--button-approve-rgb:0,128,105;--button-approve-background:#e1fef2;--button-approve-background-rgb:225,254,242;--button-approve-hover:#008069;--button-approve-hover-rgb:0,128,105;--button-approve-background-hover:#b2f5da;--button-approve-background-hover-rgb:178,245,218;--button-approve-hover-strong:#008069;--button-approve-hover-strong-rgb:0,128,105;--button-approve-background-hover-strong:#7ae3c3;--button-approve-background-hover-strong-rgb:122,227,195;--button-reject:#8696a0;--button-reject-rgb:134,150,160;--button-reject-background:#f0f2f5;--button-reject-background-rgb:240,242,245;--button-reject-hover:#54656f;--button-reject-hover-rgb:84,101,111;--button-reject-background-hover:#d1d7db;--button-reject-background-hover-rgb:209,215,219;--button-reject-hover-strong:#3b4a54;--button-reject-hover-strong-rgb:59,74,84;--button-reject-background-hover-strong:#aebac1;--button-reject-background-hover-strong-rgb:174,186,193;--cart-interstitial-background:#fff;--cart-interstitial-background-rgb:255,255,255;--cart-interstitial-icon:#3a5564;--cart-interstitial-icon-rgb:58,85,100;--chat-info-drawer-thumb-background:#f0f2f5;--chat-info-drawer-thumb-background-rgb:240,242,245;--chat-marker:#1b8748;--chat-marker-rgb:27,135,72;--chat-marker-border:#e7fce3;--chat-marker-border-rgb:231,252,227;--chat-marker-background:#e7fce3;--chat-marker-background-rgb:231,252,227;--chat-meta:#667781;--chat-meta-rgb:102,119,129;--chatlist-icon:#8696a0;--chatlist-icon-rgb:134,150,160;--checkbox-background:#008069;--checkbox-background-rgb:0,128,105;--checkbox-mark:#fff;--checkbox-mark-rgb:255,255,255;--chevron-button-background:rgba(17,27,33,0.35);--chevron-button-background-rgb:17,27,33;--chip-button-background:#d5fded;--chip-button-background-rgb:213,253,237;--chip-button-foreground:#008069;--chip-button-foreground-rgb:0,128,105;--compose-input-background:#fff;--compose-input-background-rgb:255,255,255;--compose-input-background-focused:#d1f1fe;--compose-input-background-focused-rgb:209,241,254;--compose-input-border:#fff;--compose-input-border-rgb:255,255,255;--compose-input-border-focused:#ccebf9;--compose-input-border-focused-rgb:204,235,249;--compose-panel-background:#f0f2f5;--compose-panel-background-rgb:240,242,245;--compose-panel-background-hover:#e9edef;--compose-panel-background-hover-rgb:233,237,239;--compose-primary:#111b21;--compose-primary-rgb:17,27,33;--conversation-panel-background:#efeae2;--conversation-panel-background-rgb:239,234,226;--conversation-panel-border:#e9edef;--conversation-panel-border-rgb:233,237,239;--cover-image-background:#eaf2f5;--cover-image-background-rgb:234,242,245;--danger:#ea0038;--danger-rgb:234,0,56;--disabled-round-button-background-color:#e9edef;--disabled-round-button-background-color-rgb:233,237,239;--document-meta:#8696a0;--document-meta-rgb:134,150,160;--drawer-background:#f0f2f5;--drawer-background-rgb:240,242,245;--drawer-background-deep:#f0f2f5;--drawer-background-deep-rgb:240,242,245;--drawer-gallery-background:#f0f2f5;--drawer-gallery-background-rgb:240,242,245;--drawer-gallery-background-active:#dee0e3;--drawer-gallery-background-active-rgb:222,224,227;--drawer-gallery-background-hover:#e7e9ec;--drawer-gallery-background-hover-rgb:231,233,236;--drawer-header-title:#fff;--drawer-header-title-rgb:255,255,255;--drawer-section-background:#fff;--drawer-section-background-rgb:255,255,255;--dropdown-background:#fff;--dropdown-background-rgb:255,255,255;--dropdown-background-hover:#f5f6f6;--dropdown-background-hover-rgb:245,246,246;--electron-deprecation-app-expired-header:#00a884;--electron-deprecation-app-expired-header-rgb:0,168,132;--electron-deprecation-app-expired-window:#fff;--electron-deprecation-app-expired-window-rgb:255,255,255;--empty-state-background:#f7f8fa;--empty-state-background-rgb:247,248,250;--empty-state-icon:#fff;--empty-state-icon-rgb:255,255,255;--ephemeral-nux-background:rgba(6,207,156,0.15);--ephemeral-nux-background-rgb:6,207,156;--ephemeral-nux-bubble:#00a884;--ephemeral-nux-bubble-rgb:0,168,132;--ephemeral-nux-timer:#00a884;--ephemeral-nux-timer-rgb:0,168,132;--sender-superpower-title:#00a884;--sender-superpower-title-rgb:0,168,132;--focus:#009de2;--focus-rgb:0,157,226;--focus-animation:rgba(0,157,226,0.22);--focus-animation-rgb:0,157,226;--focus-animation-deeper:rgba(0,157,226,0.3);--focus-animation-deeper-rgb:0,157,226;--focus-lighter:rgba(0,157,226,0.1);--focus-lighter-rgb:0,157,226;--forwarded-indicator-text:#8696a0;--forwarded-indicator-text-rgb:134,150,160;--highlight:#008069;--highlight-rgb:0,128,105;--icon:#54656f;--icon-rgb:84,101,111;--icon-ack:#53bdeb;--icon-ack-rgb:83,189,235;--icon-disabled:#d1d7db;--icon-disabled-rgb:209,215,219;--icon-fixed:#8696a0;--icon-fixed-rgb:134,150,160;--icon-lighter:#8696a0;--icon-lighter-rgb:134,150,160;--icon-strong:#54656f;--icon-strong-rgb:84,101,111;--icon-search-back:#00a884;--icon-search-back-rgb:0,168,132;--icon-secondary:#8696a0;--icon-secondary-rgb:134,150,160;--icon-bright-accent:#00a884;--icon-bright-accent-rgb:0,168,132;--icon-bright-highlight:#00a884;--icon-bright-highlight-rgb:0,168,132;--icon-pinned:#8696a0;--icon-pinned-rgb:134,150,160;--round-icon-background:#00a884;--round-icon-background-rgb:0,168,132;--incoming-background:#fff;--incoming-background-rgb:255,255,255;--incoming-background-deeper:#f5f6f6;--incoming-background-deeper-rgb:245,246,246;--incoming-background-highlight:#f0f1f1;--incoming-background-highlight-rgb:240,241,241;--incoming-primary:#888d90;--incoming-primary-rgb:136,141,144;--input-border-active:#00a884;--input-border-active-rgb:0,168,132;--input-border:#667781;--input-border-rgb:102,119,129;--input-hover-background:#f0f2f5;--input-hover-background-rgb:240,242,245;--input-empty-value-placeholder:#00a884;--input-empty-value-placeholder-rgb:0,168,132;--input-placeholder:#667781;--input-placeholder-rgb:102,119,129;--input-button-more:#00a884;--input-button-more-rgb:0,168,132;--intro-background:#f0f2f5;--intro-background-rgb:240,242,245;--intro-border:#25d366;--intro-border-rgb:37,211,102;--intro-logo:rgba(78,100,112,0.4);--intro-logo-rgb:78,100,112;--intro-secondary:#667781;--intro-secondary-rgb:102,119,129;--inverse:#fff;--inverse-rgb:255,255,255;--label-disabled-text:#d1d7db;--label-disabled-text-rgb:209,215,219;--label-secondary-text:rgba(60,60,67,0.6);--label-secondary-text-rgb:60,60,67;--labels-icon:rgba(17,27,33,0.4);--labels-icon-rgb:17,27,33;--link:#027eb5;--link-rgb:2,126,181;--link-alt:#008069;--link-alt-rgb:0,128,105;--link-preview:rgba(17,27,33,0.87);--link-preview-rgb:17,27,33;--link-preview-light:rgba(17,27,33,0.3);--link-preview-light-rgb:17,27,33;--link-preview-lighter:rgba(17,27,33,0.6);--link-preview-lighter-rgb:17,27,33;--live-location-footer-background:hsla(0,0%,100%,0.9);--live-location-footer-background-rgb:255,255,255;--live-location-glow:rgba(37,211,102,0.3);--live-location-glow-rgb:37,211,102;--live-location-glow-stale:rgba(255,0,31,0.3);--live-location-glow-stale-rgb:255,0,31;--location-cluster-background:#fff;--location-cluster-background-rgb:255,255,255;--map-overlay-background:hsla(0,0%,100%,0.6);--map-overlay-background-rgb:255,255,255;--map-overlay-foreground:#667781;--map-overlay-foreground-rgb:102,119,129;--media-editor-control:#1c313f;--media-editor-control-rgb:28,49,63;--media-editor-image-caption-input-background:#fff;--media-editor-image-caption-input-background-rgb:255,255,255;--media-editor-video-caption-input-background:#f0f2f5;--media-editor-video-caption-input-background-rgb:240,242,245;--media-editor-document-caption-input-background:#fff;--media-editor-document-caption-input-background-rgb:255,255,255;--media-editor-icon-color:#54656f;--media-editor-icon-color-rgb:84,101,111;--media-editor-icon-secondary-color:#8696a0;--media-editor-icon-secondary-color-rgb:134,150,160;--media-editor-thumb-border:#d1d7db;--media-editor-thumb-border-rgb:209,215,219;--media-editor-thumb-border-active:#00a884;--media-editor-thumb-border-active-rgb:0,168,132;--media-gallery-thumb-background:#dfe3e7;--media-gallery-thumb-background-rgb:223,227,231;--media-gallery-thumb-icon:#bbc4cb;--media-gallery-thumb-icon-rgb:187,196,203;--media-viewer-background:hsla(0,0%,100%,0.96);--media-viewer-background-rgb:255,255,255;--media-viewer-button-background:#d1d7db;--media-viewer-button-background-rgb:209,215,219;--media-viewer-button-icon:#fff;--media-viewer-button-icon-rgb:255,255,255;--media-inner-border:rgba(11,20,26,0.1);--media-inner-border-rgb:11,20,26;--menu-bar-item-background-active:rgba(11,20,26,0.1);--menu-bar-item-background-active-rgb:11,20,26;--menu-context-sticker-icon:rgba(17,27,33,0.5);--menu-context-sticker-icon-rgb:17,27,33;--menu-context-sticker-icon-inverse:#fff;--menu-context-sticker-icon-inverse-rgb:255,255,255;--menu-tabs-list-active:#9feab5;--menu-tabs-list-active-rgb:159,234,181;--mention-at-symbol:#027eb5;--mention-at-symbol-rgb:2,126,181;--message-background-deep:rgba(11,20,26,0.12);--message-background-deep-rgb:11,20,26;--message-placeholder-icon:rgba(17,27,33,0.3);--message-placeholder-icon-rgb:17,27,33;--message-primary:#111b21;--message-primary-rgb:17,27,33;--message-selection-highlight:rgba(0,128,105,0.08);--message-selection-highlight-rgb:0,128,105;--modal-backdrop:hsla(0,0%,100%,0.85);--modal-backdrop-rgb:255,255,255;--modal-backdrop-solid:#f0f2f5;--modal-backdrop-solid-rgb:240,242,245;--modal-background:#fff;--modal-background-rgb:255,255,255;--beta-tag-background:#e6e6e6;--beta-tag-background-rgb:230,230,230;--notification-biz-background:rgba(213,253,237,0.95);--notification-biz-background-rgb:213,253,237;--notification-biz-text:rgba(17,27,33,0.96);--notification-biz-text-rgb:17,27,33;--notification-e2e-background:#ffeecd;--notification-e2e-background-rgb:255,238,205;--notification-e2e-icon:#54656f;--notification-e2e-icon-rgb:84,101,111;--notification-e2e-text:#54656f;--notification-e2e-text-rgb:84,101,111;--notification-info-icon:#54656f;--notification-info-icon-rgb:84,101,111;--notification-non-e2e-background:#cbf2ee;--notification-non-e2e-background-rgb:203,242,238;--notification-non-e2e-text:#54656f;--notification-non-e2e-text-rgb:84,101,111;--notification-text:rgba(17,27,33,0.96);--notification-text-rgb:17,27,33;--outgoing-background:#d9fdd3;--outgoing-background-rgb:217,253,211;--outgoing-background-deeper:#d1f4cc;--outgoing-background-deeper-rgb:209,244,204;--outgoing-background-highlight:#c4eec8;--outgoing-background-highlight-rgb:196,238,200;--overlay:#0b141a;--overlay-rgb:11,20,26;--panel-background:#f0f2f5;--panel-background-rgb:240,242,245;--panel-background-active:#dee0e3;--panel-background-active-rgb:222,224,227;--panel-background-colored:#008069;--panel-background-colored-rgb:0,128,105;--panel-background-colored-deeper:#008069;--panel-background-colored-deeper-rgb:0,128,105;--panel-background-deep:#e9edef;--panel-background-deep-rgb:233,237,239;--panel-background-deeper:#e9edef;--panel-background-deeper-rgb:233,237,239;--panel-background-hover:#e7e9ec;--panel-background-hover-rgb:231,233,236;--panel-background-lighter:#f7f8fa;--panel-background-lighter-rgb:247,248,250;--panel-header-background:#f0f2f5;--panel-header-background-rgb:240,242,245;--panel-header-icon:#54656f;--panel-header-icon-rgb:84,101,111;--conversation-header-border:#d1d7db;--conversation-header-border-rgb:209,215,219;--panel-input-background:#e9edef;--panel-input-background-rgb:233,237,239;--panel-primary:rgba(17,27,33,0.35);--panel-primary-rgb:17,27,33;--payment-amount:#007661;--payment-amount-rgb:0,118,97;--payment-status-failed:#f15c6d;--payment-status-failed-rgb:241,92,109;--payment-status-pending:rgba(17,27,33,0.45);--payment-status-pending-rgb:17,27,33;--payment-status-success:#1fa855;--payment-status-success-rgb:31,168,85;--photopicker-overlay-background:rgba(84,101,111,0.8);--photopicker-overlay-background-rgb:84,101,111;--picker-background:#f0f2f5;--picker-background-rgb:240,242,245;--pip-drag-bar:#fff;--pip-drag-bar-rgb:255,255,255;--pip-player-background:#2a2f32;--pip-player-background-rgb:42,47,50;--pip-manager-content:rgba(79,79,79,0.85);--pip-manager-content-rgb:79,79,79;--popup-panel-background:rgba(11,20,26,0.05);--popup-panel-background-rgb:11,20,26;--primary-muted:#667781;--primary-muted-rgb:102,119,129;--primary:#3b4a54;--primary-rgb:59,74,84;--primary-strong:#111b21;--primary-strong-rgb:17,27,33;--primary-stronger:#111b21;--primary-stronger-rgb:17,27,33;--primary-strongest:#111b21;--primary-strongest-rgb:17,27,33;--primary-title:#41525d;--primary-title-rgb:65,82,93;--product-image-button-background:rgba(17,27,33,0.35);--product-image-button-background-rgb:17,27,33;--product-thumb-background:#f0f2f5;--product-thumb-background-rgb:240,242,245;--product-thumb-background-deeper:#d8dde5;--product-thumb-background-deeper-rgb:216,221,229;--product-thumb-overlay-background:rgba(17,27,33,0.5);--product-thumb-overlay-background-rgb:17,27,33;--product-thumb-overlay-text:#fff;--product-thumb-overlay-text-rgb:255,255,255;--product-placeholder-background:#ecf1f3;--product-placeholder-background-rgb:236,241,243;--progress-background:#e9edef;--progress-background-rgb:233,237,239;--progress-primary:#00c298;--progress-primary-rgb:0,194,152;--poll-bar-container-receiver:#f0f2f5;--poll-bar-container-receiver-rgb:240,242,245;--poll-bar-fill-receiver:#00a884;--poll-bar-fill-receiver-rgb:0,168,132;--poll-bar-container-sender:rgba(11,20,26,0.1);--poll-bar-container-sender-rgb:11,20,26;--poll-bar-fill-sender:#00a884;--poll-bar-fill-sender-rgb:0,168,132;--poll-button-disabled-receiver:#d1d7db;--poll-button-disabled-receiver-rgb:209,215,219;--poll-button-disabled-sender:rgba(11,20,26,0.2);--poll-button-disabled-sender-rgb:11,20,26;--poll-checkmark-receiver:#fff;--poll-checkmark-receiver-rgb:255,255,255;--poll-checkmark-sender:#d9fdd3;--poll-checkmark-sender-rgb:217,253,211;--poll-disabled-checked-checkbox-receiver:#d1d7db;--poll-disabled-checked-checkbox-receiver-rgb:209,215,219;--poll-disabled-checked-checkbox-sender:rgba(11,20,26,0.2);--poll-disabled-checked-checkbox-sender-rgb:11,20,26;--poll-disabled-send-button-background-color:#e9edef;--poll-disabled-send-button-background-color-rgb:233,237,239;--poll-invalid-warning-background:#fff7e5;--poll-invalid-warning-background-rgb:255,247,229;--poll-invalid-warning-border-receiver:#f0f2f5;--poll-invalid-warning-border-receiver-rgb:240,242,245;--poll-invalid-warning-border-sender:rgba(11,20,26,0.1);--poll-invalid-warning-border-sender-rgb:11,20,26;--poll-invalid-warning-icon-color:#ffbc38;--poll-invalid-warning-icon-color-rgb:255,188,56;--poll-invalid-warning-icon-container-background:#ffe4af;--poll-invalid-warning-icon-container-background-rgb:255,228,175;--poll-modal-background-color:#fff;--poll-modal-background-color-rgb:255,255,255;--poll-modal-footer-background-color:rgba(11,20,26,0.04);--poll-modal-footer-background-color-rgb:11,20,26;--poll-checkbox-default-border-color-sender:#8696a0;--poll-checkbox-default-border-color-sender-rgb:134,150,160;--poll-selectable-options-icon-hint-color:#3c3c43;--poll-selectable-options-icon-hint-color-rgb:60,60,67;--ptt-blue:#4fc3f7;--ptt-blue-rgb:79,195,247;--ptt-button-cancel:rgba(229,57,53,0.8);--ptt-button-cancel-rgb:229,57,53;--ptt-button-send:rgba(9,210,97,0.8);--ptt-button-send-rgb:9,210,97;--ptt-draft-button-cancel:#667781;--ptt-draft-button-cancel-rgb:102,119,129;--ptt-draft-button-cancel-hover:#6f828c;--ptt-draft-button-cancel-hover-rgb:111,130,140;--ptt-draft-button-play-pause:#667781;--ptt-draft-button-play-pause-rgb:102,119,129;--ptt-draft-button-play-pause-hover:#6f828c;--ptt-draft-button-play-pause-hover-rgb:111,130,140;--ptt-draft-button-play-pause-out-of-chat:#fff;--ptt-draft-button-play-pause-out-of-chat-rgb:255,255,255;--ptt-draft-button-stop:#ff3b30;--ptt-draft-button-stop-rgb:255,59,48;--ptt-draft-button-stop-hover:#ff4e44;--ptt-draft-button-stop-hover-rgb:255,78,68;--ptt-draft-button-send:#00a884;--ptt-draft-button-send-rgb:0,168,132;--ptt-draft-button-send-hover:#00bc94;--ptt-draft-button-send-hover-rgb:0,188,148;--ptt-draft-thumb:#00a884;--ptt-draft-thumb-rgb:0,168,132;--ptt-thumb-outgoing-unplayed:#6f8171;--ptt-thumb-outgoing-unplayed-rgb:111,129,113;--ptt-thumb-outgoing-played:#4fc3f7;--ptt-thumb-outgoing-played-rgb:79,195,247;--ptt-thumb-incoming-unplayed:#09d261;--ptt-thumb-incoming-unplayed-rgb:9,210,97;--ptt-thumb-incoming-played:#4fc3f7;--ptt-thumb-incoming-played-rgb:79,195,247;--ptt-draft-waveform-background:#fff;--ptt-draft-waveform-background-rgb:255,255,255;--ptt-draft-waveform-background-border:#f7f8fa;--ptt-draft-waveform-background-border-rgb:247,248,250;--ptt-ooc-background:#009688;--ptt-ooc-background-rgb:0,150,136;--ptt-ooc-mic-border-color:#009688;--ptt-ooc-mic-border-color-rgb:0,150,136;--ptt-ooc-mic-fill-color:#fff;--ptt-ooc-mic-fill-color-rgb:255,255,255;--ptt-ooc-avatar-background:#ffad1f;--ptt-ooc-avatar-background-rgb:255,173,31;--ptt-waveform-preview-unplayed:#ced0d1;--ptt-waveform-preview-unplayed-rgb:206,208,209;--ptt-waveform-incoming-unplayed:#ced0d1;--ptt-waveform-incoming-unplayed-rgb:206,208,209;--ptt-waveform-outgoing-unplayed:#b0ceae;--ptt-waveform-outgoing-unplayed-rgb:176,206,174;--ptt-waveform-preview-played:#858a8d;--ptt-waveform-preview-played-rgb:133,138,141;--ptt-waveform-incoming-played:#858a8d;--ptt-waveform-incoming-played-rgb:133,138,141;--ptt-waveform-outgoing-played:#728977;--ptt-waveform-outgoing-played-rgb:114,137,119;--ptt-gray:rgba(17,27,33,0.7);--ptt-gray-rgb:17,27,33;--ptt-gray-badge:rgba(84,101,111,0.5);--ptt-gray-badge-rgb:84,101,111;--ptt-green:#09d261;--ptt-green-rgb:9,210,97;--ptt-message-blue:#027eb5;--ptt-message-blue-rgb:2,126,181;--ptt-text:#fff;--ptt-text-rgb:255,255,255;--quick-action-button:#fff;--quick-action-button-rgb:255,255,255;--quick-action-button-background:rgba(11,20,26,0.2);--quick-action-button-background-rgb:11,20,26;--reaction-button:#fff;--reaction-button-rgb:255,255,255;--reaction-button-background:rgba(11,20,26,0.2);--reaction-button-background-rgb:11,20,26;--round-entry-point-background-color:rgba(11,20,26,0.2);--round-entry-point-background-color-rgb:11,20,26;--quoted-message-text:#667781;--quoted-message-text-rgb:102,119,129;--rich-text-panel-background:#f0f2f5;--rich-text-panel-background-rgb:240,242,245;--search-container-background:#fff;--search-container-background-rgb:255,255,255;--search-input-background:#f0f2f5;--search-input-background-rgb:240,242,245;--search-input-container-background:#fff;--search-input-container-background-rgb:255,255,255;--search-input-container-background-active:#fff;--search-input-container-background-active-rgb:255,255,255;--secondary:#667781;--secondary-rgb:102,119,129;--secondary-light:#d1d7db;--secondary-light-rgb:209,215,219;--secondary-lighter:#8696a0;--secondary-lighter-rgb:134,150,160;--secondary-stronger:#3b4a54;--secondary-stronger-rgb:59,74,84;--security-icon-background:#d3ede6;--security-icon-background-rgb:211,237,230;--security-icon-lock:#1fc4b1;--security-icon-lock-rgb:31,196,177;--security-icon-shield:#f0faf7;--security-icon-shield-rgb:240,250,247;--shadow:#0b141a;--shadow-rgb:11,20,26;--shadow-light:rgba(11,20,26,0.08);--shadow-light-rgb:11,20,26;--spinner-default:#d1d7db;--spinner-default-rgb:209,215,219;--spinner-highlight:#00a884;--spinner-highlight-rgb:0,168,132;--spinner-incoming:#b8bbbc;--spinner-incoming-rgb:184,187,188;--spinner-outgoing:#9db99e;--spinner-outgoing-rgb:157,185,158;--startup-background:#f0f2f5;--startup-background-rgb:240,242,245;--startup-icon:#bbc5cb;--startup-icon-rgb:187,197,203;--status-background:#0b141a;--status-background-rgb:11,20,26;--status-background-hover:#30373c;--status-background-hover-rgb:48,55,60;--status-primary:#fff;--status-primary-rgb:255,255,255;--status-secondary:hsla(0,0%,100%,0.55);--status-secondary-rgb:255,255,255;--status-secondary-stronger:#b6b9ba;--status-secondary-stronger-rgb:182,185,186;--status-ring-read:#bbbec4;--status-ring-read-rgb:187,190,196;--status-ring-unread:#25d366;--status-ring-unread-rgb:37,211,102;--status-thumbnail-background:#cacaca;--status-thumbnail-background-rgb:202,202,202;--status-link-preview-title:#111b21;--status-link-preview-title-rgb:17,27,33;--status-link-preview-secondary:#667781;--status-link-preview-secondary-rgb:102,119,129;--sticker-button-background:#e9edef;--sticker-button-background-rgb:233,237,239;--success:#1fa855;--success-rgb:31,168,85;--suspicious-background:rgba(241,92,109,0.8);--suspicious-background-rgb:241,92,109;--system-message-background:hsla(0,0%,100%,0.95);--system-message-background-rgb:255,255,255;--system-message-text:#54656f;--system-message-text-rgb:84,101,111;--teal-hover:#009477;--teal-hover-rgb:0,148,119;--teal-pale:#60aea1;--teal-pale-rgb:96,174,161;--text-action:#008069;--text-action-rgb:0,128,105;--text-action-link:#027eb5;--text-action-link-rgb:2,126,181;--text-muted:#8696a0;--text-muted-rgb:134,150,160;--thumb-border-active:#fff;--thumb-border-active-rgb:255,255,255;--thumb-border-viewer-active:#d1d7db;--thumb-border-viewer-active-rgb:209,215,219;--toast-background:rgba(11,20,26,0.82);--toast-background-rgb:11,20,26;--tooltip-text:#fff;--tooltip-text-rgb:255,255,255;--tooltip-background:#202c33;--tooltip-background-rgb:32,44,51;--typing:#1fa855;--typing-rgb:31,168,85;--unread-background:#fff;--unread-background-rgb:255,255,255;--unread-bar-background:hsla(0,0%,100%,0.25);--unread-bar-background-rgb:255,255,255;--unread-timestamp:#1fa855;--unread-timestamp-rgb:31,168,85;--unread-marker-background:#25d366;--unread-marker-background-rgb:37,211,102;--unread-marker-text:#fff;--unread-marker-text-rgb:255,255,255;--vcard-placeholder-background:rgba(17,27,33,0.04);--vcard-placeholder-background-rgb:17,27,33;--vcard-placeholder-background-deeper:rgba(17,27,33,0.08);--vcard-placeholder-background-deeper-rgb:17,27,33;--video-player-background:#0b141a;--video-player-background-rgb:11,20,26;--video-primary:#fff;--video-primary-rgb:255,255,255;--voip-accept-background:#2ec452;--voip-accept-background-rgb:46,196,82;--voip-background:#111b21;--voip-background-rgb:17,27,33;--voip-background-deep:#0b141a;--voip-background-deep-rgb:11,20,26;--voip-video-background:#242424;--voip-video-background-rgb:36,36,36;--voip-controls-background:#2d2d2d;--voip-controls-background-rgb:45,45,45;--voip-primary:#fff;--voip-primary-rgb:255,255,255;--voip-alternative:#0b141a;--voip-alternative-rgb:11,20,26;--voip-reject-background:#ff3b30;--voip-reject-background-rgb:255,59,48;--voip-disabled-background:#222;--voip-disabled-background-rgb:34,34,34;--wallpaper-background:#efeae2;--wallpaper-background-rgb:239,234,226;--wallpaper-thumb-border-active:#009de2;--wallpaper-thumb-border-active-rgb:0,157,226;--wallpaper-thumb-border-hover:#fff;--wallpaper-thumb-border-hover-rgb:255,255,255;--win32-title-primary:#fff;--win32-title-primary-rgb:255,255,255;--reactions-bubble-border:rgba(0,0,0,0.05);--reactions-bubble-border-rgb:0,0,0;--reactions-bubble-counter:rgba(60,60,67,0.6);--reactions-bubble-counter-rgb:60,60,67;--reactions-details-background:#fff;--reactions-details-background-rgb:255,255,255;--reactions-tray-background:#fff;--reactions-tray-background-rgb:255,255,255;--reactions-details-background-hover:#f5f6f6;--reactions-details-background-hover-rgb:245,246,246;--reactions-tray-active-round-background:rgba(11,20,26,0.1);--reactions-tray-active-round-background-rgb:11,20,26;--reactions-picker-bg:#f2f2f7;--reactions-picker-bg-rgb:242,242,247;--svg-gray-button:rgba(11,20,26,0.5);--svg-gray-button-rgb:11,20,26;--reactions-panel-background-color:#fff;--reactions-panel-background-color-rgb:255,255,255;--reactions-panel-search-background-color:rgba(0,0,0,0.05);--reactions-panel-search-background-color-rgb:0,0,0;--reactions-search-color:#667781;--reactions-search-color-rgb:102,119,129;--reactions-menu-tab-separator:rgba(60,60,67,0.29);--reactions-menu-tab-separator-rgb:60,60,67;--text-primary-strong:#111b21;--text-primary-strong-rgb:17,27,33;--text-secondary:#667781;--text-secondary-rgb:102,119,129;--text-secondary-lighter:#667781;--text-secondary-lighter-rgb:102,119,129;--text-medium-emphasis:#667781;--text-medium-emphasis-rgb:102,119,129;--icon-medium-emphasis:#8696a0;--icon-medium-emphasis-rgb:134,150,160;--icon-high-emphasis:#00a884;--icon-high-emphasis-rgb:0,168,132;--switch-button-color:#ececec;--switch-button-color-rgb:236,236,236;--switch-button-checked-color:#018579;--switch-button-checked-color-rgb:1,133,121;--switch-track-color:#b2b2b2;--switch-track-color-rgb:178,178,178;--switch-track-checked-color:#b2dbd7;--switch-track-checked-color-rgb:178,219,215;--announcement-speaker-background:#d9fdd3;--announcement-speaker-background-rgb:217,253,211;--communities-green:#008069;--communities-green-rgb:0,128,105;--qc-button-border:#e9edef;--qc-button-border-rgb:233,237,239;--qc-button-border-active:#d1d7db;--qc-button-border-active-rgb:209,215,219;--qc-quantity-label-highlighted-background:#008069;--qc-quantity-label-highlighted-background-rgb:0,128,105;--drawer-loading-backgroud:hsla(0,0%,100%,0.5);--drawer-loading-backgroud-rgb:255,255,255;--multi-skin-tone-picker-emoji-selected-background:#d1d7db;--multi-skin-tone-picker-emoji-selected-background-rgb:209,215,219;--chat-assignment-icon-me:#009de2;--chat-assignment-icon-me-rgb:0,157,226;--chat-assignment-icon-others:#8696a0;--chat-assignment-icon-others-rgb:134,150,160;--pnh-nux:#53a69b;--pnh-nux-rgb:83,166,155;--forward-caption-preview-background:#fff;--forward-caption-preview-background-rgb:255,255,255;--forward-caption-preview-content:#f7f8fa;--forward-caption-preview-content-rgb:247,248,250}.color-1{color:#06cf9c!important}.bg-color-1{background-color:#06cf9c!important}.color-2{color:#53bdeb!important}.bg-color-2{background-color:#53bdeb!important}.color-3{color:#e542a3!important}.bg-color-3{background-color:#e542a3!important}.color-4{color:#a5b337!important}.bg-color-4{background-color:#a5b337!important}.color-5{color:#007bfc!important}.bg-color-5{background-color:#007bfc!important}.color-6{color:#c89631!important}.bg-color-6{background-color:#c89631!important}.color-7{color:#1fa855!important}.bg-color-7{background-color:#1fa855!important}.color-8{color:#7f66ff!important}.bg-color-8{background-color:#7f66ff!important}.color-9{color:#5e47de!important}.bg-color-9{background-color:#5e47de!important}.color-10{color:#25d366!important}.bg-color-10{background-color:#25d366!important}.color-11{color:#c4532d!important}.bg-color-11{background-color:#c4532d!important}.color-12{color:#ff2e74!important}.bg-color-12{background-color:#ff2e74!important}.color-13{color:#7d9ef1!important}.bg-color-13{background-color:#7d9ef1!important}.color-14{color:#fa6533!important}.bg-color-14{background-color:#fa6533!important}.color-15{color:#02a698!important}.bg-color-15{background-color:#02a698!important}.color-16{color:#b4876e!important}.bg-color-16{background-color:#b4876e!important}.color-17{color:#ffbc38!important}.bg-color-17{background-color:#ffbc38!important}.dark{--active-tab-marker:#00a884;--active-tab-marker-rgb:0,168,132;--app-background:#111b21;--app-background-rgb:17,27,33;--app-background-deeper:#0a1014;--app-background-deeper-rgb:10,16,20;--app-background-stripe:transparent;--app-background-stripe-rgb:0,0,0;--attach-media-drop-border:rgba(233,237,239,0.2);--attach-media-drop-border-rgb:233,237,239;--attach-media-drop-overlay:rgba(52,70,81,0.3);--attach-media-drop-overlay-rgb:52,70,81;--audio-control-incoming:#848488;--audio-control-incoming-rgb:132,132,136;--audio-control-outgoing:#d1d7db;--audio-control-outgoing-rgb:209,215,219;--audio-progress-incoming:#63cb77;--audio-progress-incoming-rgb:99,203,119;--audio-progress-outgoing:#599389;--audio-progress-outgoing-rgb:89,147,137;--audio-progress-played-incoming:#49a1c8;--audio-progress-played-incoming-rgb:73,161,200;--audio-progress-played-outgoing:#43abcd;--audio-progress-played-outgoing-rgb:67,171,205;--audio-progress-metadata:hsla(0,0%,100%,0.6);--audio-progress-metadata-rgb:255,255,255;--audio-track-incoming:#343f46;--audio-track-incoming-rgb:52,63,70;--audio-track-outgoing:#176b5b;--audio-track-outgoing-rgb:23,107,91;--avatar-background:#111b21;--avatar-background-rgb:17,27,33;--avatar-border:#aebac1;--avatar-border-rgb:174,186,193;--avatar-circle-gray-light:#3b4a54;--avatar-circle-gray-light-rgb:59,74,84;--avatar-circle-gray:#54656f;--avatar-circle-gray-rgb:84,101,111;--avatar-circle-gray-active:#3b4a54;--avatar-circle-gray-active-rgb:59,74,84;--avatar-circle-gray-dark:#54656f;--avatar-circle-gray-dark-rgb:84,101,111;--avatar-circle-green-lighter:#074d4a;--avatar-circle-green-lighter-rgb:7,77,74;--avatar-circle-green-light:#046a62;--avatar-circle-green-light-rgb:4,106,98;--avatar-circle-green:#074d4a;--avatar-circle-green-rgb:7,77,74;--avatar-circle-green-dark:#046a62;--avatar-circle-green-dark-rgb:4,106,98;--avatar-placeholder-background:#6a7175;--avatar-placeholder-background-rgb:106,113,117;--avatar-placeholder-primary:#cfd4d6;--avatar-placeholder-primary-rgb:207,212,214;--archived-chat-marker:#aebac1;--archived-chat-marker-rgb:174,186,193;--archived-chat-marker-border:#2a3942;--archived-chat-marker-border-rgb:42,57,66;--archived-chat-marker-background:#2a3942;--archived-chat-marker-background-rgb:42,57,66;--archived-chat-persistent-header-background:#26353d;--archived-chat-persistent-header-background-rgb:38,53,61;--background-default:#111b21;--background-default-rgb:17,27,33;--background-document-with-captions:#111b21;--background-document-with-captions-rgb:17,27,33;--background-default-active:#2a3942;--background-default-active-rgb:42,57,66;--background-default-hover:#202c33;--background-default-hover-rgb:32,44,51;--badge-border:#d1d7db;--badge-border-rgb:209,215,219;--badge-pending:#008069;--badge-pending-rgb:0,128,105;--beta-tag-background:#364147;--beta-tag-background-rgb:54,65,71;--border-bubble:rgba(233,237,239,0.12);--border-bubble-rgb:233,237,239;--border-deeper:rgba(134,150,160,0.15);--border-deeper-rgb:134,150,160;--border-default:rgba(134,150,160,0.15);--border-default-rgb:134,150,160;--border-list:rgba(134,150,160,0.15);--border-list-rgb:134,150,160;--border-panel:rgba(134,150,160,0.15);--border-panel-rgb:134,150,160;--border-strong:rgba(134,150,160,0.15);--border-strong-rgb:134,150,160;--border-stronger:rgba(134,150,160,0.15);--border-stronger-rgb:134,150,160;--border-document-footer:rgba(134,150,160,0.15);--border-document-footer-rgb:134,150,160;--bubble-meta:hsla(0,0%,100%,0.6);--bubble-meta-rgb:255,255,255;--bubble-meta-icon:hsla(0,0%,100%,0.5);--bubble-meta-icon-rgb:255,255,255;--business-name-title:#d1d7db;--business-name-title-rgb:209,215,219;--business-name-subtitle:#aebac1;--business-name-subtitle-rgb:174,186,193;--butterbar-default-background:#182229;--butterbar-default-background-rgb:24,34,41;--butterbar-icon:#aebac1;--butterbar-icon-rgb:174,186,193;--butterbar-icon-dismiss:#8696a0;--butterbar-icon-dismiss-rgb:134,150,160;--butterbar-primary:#e9edef;--butterbar-primary-rgb:233,237,239;--butterbar-secondary:#8696a0;--butterbar-secondary-rgb:134,150,160;--butterbar-battery-background:#182229;--butterbar-battery-background-rgb:24,34,41;--butterbar-battery-icon:#f15c6d;--butterbar-battery-icon-rgb:241,92,109;--butterbar-battery-primary:#e9edef;--butterbar-battery-primary-rgb:233,237,239;--butterbar-battery-secondary:#8696a0;--butterbar-battery-secondary-rgb:134,150,160;--butterbar-connection-background:#182229;--butterbar-connection-background-rgb:24,34,41;--butterbar-connection-primary:#e9edef;--butterbar-connection-primary-rgb:233,237,239;--butterbar-connection-secondary:#8696a0;--butterbar-connection-secondary-rgb:134,150,160;--butterbar-connection-icon:#ffbc38;--butterbar-connection-icon-rgb:255,188,56;--butterbar-desktop-upsell-icon:#182229;--butterbar-desktop-upsell-icon-rgb:24,34,41;--butterbar-phone-icon-shape:#182229;--butterbar-phone-icon-shape-rgb:24,34,41;--butterbar-fatal-background:#182229;--butterbar-fatal-background-rgb:24,34,41;--butterbar-fatal-primary:#e9edef;--butterbar-fatal-primary-rgb:233,237,239;--butterbar-fatal-secondary:#8696a0;--butterbar-fatal-secondary-rgb:134,150,160;--butterbar-fatal-icon:#ffbc38;--butterbar-fatal-icon-rgb:255,188,56;--butterbar-notice-background:#182229;--butterbar-notice-background-rgb:24,34,41;--butterbar-notice-circle:#00a884;--butterbar-notice-circle-rgb:0,168,132;--butterbar-notice-icon:#182229;--butterbar-notice-icon-rgb:24,34,41;--butterbar-notice-smb-background:#182229;--butterbar-notice-smb-background-rgb:24,34,41;--butterbar-notice-smb-circle:#00a884;--butterbar-notice-smb-circle-rgb:0,168,132;--butterbar-notice-smb-icon:#182229;--butterbar-notice-smb-icon-rgb:24,34,41;--butterbar-notification-icon:#53bdeb;--butterbar-notification-icon-rgb:83,189,235;--butterbar-update-background:#182229;--butterbar-update-background-rgb:24,34,41;--butterbar-update-icon:#00a884;--butterbar-update-icon-rgb:0,168,132;--butterbar-green-nux-primary:#e9edef;--butterbar-green-nux-primary-rgb:233,237,239;--butterbar-green-nux-secondary:#8696a0;--butterbar-green-nux-secondary-rgb:134,150,160;--butterbar-green-nux-background:#182229;--butterbar-green-nux-background-rgb:24,34,41;--butterbar-green-nux-icon:#182229;--butterbar-green-nux-icon-rgb:24,34,41;--butterbar-green-nux-icon-background:#00a884;--butterbar-green-nux-icon-background-rgb:0,168,132;--butterbar-green-nux-icon-dismiss:#8696a0;--butterbar-green-nux-icon-dismiss-rgb:134,150,160;--butterbar-blue-nux-primary:#e9edef;--butterbar-blue-nux-primary-rgb:233,237,239;--butterbar-blue-nux-secondary:#8696a0;--butterbar-blue-nux-secondary-rgb:134,150,160;--butterbar-blue-nux-background:#182229;--butterbar-blue-nux-background-rgb:24,34,41;--butterbar-blue-nux-icon:#182229;--butterbar-blue-nux-icon-rgb:24,34,41;--butterbar-blue-nux-icon-background:#53bdeb;--butterbar-blue-nux-icon-background-rgb:83,189,235;--butterbar-blue-nux-icon-dismiss:rgba(233,237,239,0.7);--butterbar-blue-nux-icon-dismiss-rgb:233,237,239;--butterbar-ad-action-info-primary:#e9edef;--butterbar-ad-action-info-primary-rgb:233,237,239;--butterbar-ad-action-info-secondary:#8696a0;--butterbar-ad-action-info-secondary-rgb:134,150,160;--butterbar-ad-action-info-background:#182229;--butterbar-ad-action-info-background-rgb:24,34,41;--butterbar-ad-action-info-icon:#182229;--butterbar-ad-action-info-icon-rgb:24,34,41;--butterbar-ad-action-info-icon-background:#00a884;--butterbar-ad-action-info-icon-background-rgb:0,168,132;--butterbar-ad-action-info-icon-dismiss:#fff;--butterbar-ad-action-info-icon-dismiss-rgb:255,255,255;--butterbar-ad-action-warning-primary:#e9edef;--butterbar-ad-action-warning-primary-rgb:233,237,239;--butterbar-ad-action-warning-secondary:#8696a0;--butterbar-ad-action-warning-secondary-rgb:134,150,160;--butterbar-ad-action-warning-background:#182229;--butterbar-ad-action-warning-background-rgb:24,34,41;--butterbar-ad-action-warning-icon:#182229;--butterbar-ad-action-warning-icon-rgb:24,34,41;--butterbar-ad-action-warning-icon-background:#ffbc38;--butterbar-ad-action-warning-icon-background-rgb:255,188,56;--butterbar-ad-action-warning-icon-dismiss:#fff;--butterbar-ad-action-warning-icon-dismiss-rgb:255,255,255;--button-alternative:#53bdeb;--button-alternative-rgb:83,189,235;--button-alternative-background:#172127;--button-alternative-background-rgb:23,33,39;--button-background-disabled:hsla(0,0%,100%,0.1);--button-background-disabled-rgb:255,255,255;--button-bubble:rgba(0,168,132,0.7);--button-bubble-rgb:0,168,132;--button-plain-background:#2a3942;--button-plain-background-rgb:42,57,66;--button-plain-background-hover:#3b4a54;--button-plain-background-hover-rgb:59,74,84;--button-plain:#e9edef;--button-plain-rgb:233,237,239;--button-plain-hover:#e9edef;--button-plain-hover-rgb:233,237,239;--button-primary:#111b21;--button-primary-rgb:17,27,33;--button-primary-background:#00a884;--button-primary-background-rgb:0,168,132;--button-primary-background-hover:#06cf9c;--button-primary-background-hover-rgb:6,207,156;--button-round-background:#00a884;--button-round-background-rgb:0,168,132;--button-round-background-inverted:#2a3942;--button-round-background-inverted-rgb:42,57,66;--button-round-icon-inverted:#00a884;--button-round-icon-inverted-rgb:0,168,132;--button-disabled:hsla(0,0%,100%,0.4);--button-disabled-rgb:255,255,255;--button-secondary:#00a884;--button-secondary-rgb:0,168,132;--button-secondary-border:rgba(134,150,160,0.15);--button-secondary-border-rgb:134,150,160;--button-secondary-background:transparent;--button-secondary-background-rgb:0,0,0;--button-secondary-background-hover:rgba(233,237,239,0.05);--button-secondary-background-hover-rgb:233,237,239;--button-secondary-hover:#06cf9c;--button-secondary-hover-rgb:6,207,156;--button-focus:#3b4a54;--button-focus-rgb:59,74,84;--button-focus-outline:#00a884;--button-focus-outline-rgb:0,168,132;--button-approve:#00a884;--button-approve-rgb:0,168,132;--button-approve-background:#0a332c;--button-approve-background-rgb:10,51,44;--button-approve-hover:#42c7b8;--button-approve-hover-rgb:66,199,184;--button-approve-background-hover:#125c4e;--button-approve-background-hover-rgb:18,92,78;--button-approve-hover-strong:#95dbd4;--button-approve-hover-strong-rgb:149,219,212;--button-approve-background-hover-strong:#008069;--button-approve-background-hover-strong-rgb:0,128,105;--button-reject:#8696a0;--button-reject-rgb:134,150,160;--button-reject-background:#202c33;--button-reject-background-rgb:32,44,51;--button-reject-hover:#aebac1;--button-reject-hover-rgb:174,186,193;--button-reject-background-hover:#3b4a54;--button-reject-background-hover-rgb:59,74,84;--button-reject-hover-strong:#d1d7db;--button-reject-hover-strong-rgb:209,215,219;--button-reject-background-hover-strong:#54656f;--button-reject-background-hover-strong-rgb:84,101,111;--cart-interstitial-background:#3a5564;--cart-interstitial-background-rgb:58,85,100;--cart-interstitial-icon:#fff;--cart-interstitial-icon-rgb:255,255,255;--chat-info-drawer-thumb-background:#2a3942;--chat-info-drawer-thumb-background-rgb:42,57,66;--chat-marker:#aebac1;--chat-marker-rgb:174,186,193;--chat-marker-border:#2a3942;--chat-marker-border-rgb:42,57,66;--chat-marker-background:#2a3942;--chat-marker-background-rgb:42,57,66;--chat-meta:#8696a0;--chat-meta-rgb:134,150,160;--chatlist-icon:#8696a0;--chatlist-icon-rgb:134,150,160;--checkbox-background:#00a884;--checkbox-background-rgb:0,168,132;--checkbox-mark:#111b21;--checkbox-mark-rgb:17,27,33;--chevron-button-background:rgba(233,237,239,0.35);--chevron-button-background-rgb:233,237,239;--chip-button-background:#374043;--chip-button-background-rgb:55,64,67;--chip-button-foreground:#d4dadf;--chip-button-foreground-rgb:212,218,223;--compose-input-background:#2a3942;--compose-input-background-rgb:42,57,66;--compose-input-background-focused:#335667;--compose-input-background-focused-rgb:51,86,103;--compose-input-border:#2a3942;--compose-input-border-rgb:42,57,66;--compose-input-border-focused:#355b6e;--compose-input-border-focused-rgb:53,91,110;--compose-panel-background:#202c33;--compose-panel-background-rgb:32,44,51;--compose-panel-background-hover:#121c23;--compose-panel-background-hover-rgb:18,28,35;--compose-primary:#e9edef;--compose-primary-rgb:233,237,239;--conversation-panel-background:#0b141a;--conversation-panel-background-rgb:11,20,26;--conversation-panel-border:rgba(233,237,239,0.12);--conversation-panel-border-rgb:233,237,239;--cover-image-background:#1f2b32;--cover-image-background-rgb:31,43,50;--danger:#f15c6d;--danger-rgb:241,92,109;--disabled-round-button-background-color:#54656f;--disabled-round-button-background-color-rgb:84,101,111;--document-meta:hsla(0,0%,100%,0.6);--document-meta-rgb:255,255,255;--drawer-background:#111b21;--drawer-background-rgb:17,27,33;--drawer-background-deep:#0c1317;--drawer-background-deep-rgb:12,19,23;--drawer-gallery-background:#111b21;--drawer-gallery-background-rgb:17,27,33;--drawer-gallery-background-active:#0c1317;--drawer-gallery-background-active-rgb:12,19,23;--drawer-gallery-background-hover:#0c1317;--drawer-gallery-background-hover-rgb:12,19,23;--drawer-header-title:#d9dee0;--drawer-header-title-rgb:217,222,224;--drawer-section-background:#111b21;--drawer-section-background-rgb:17,27,33;--dropdown-background:#233138;--dropdown-background-rgb:35,49,56;--dropdown-background-hover:#182229;--dropdown-background-hover-rgb:24,34,41;--electron-deprecation-app-expired-header:#111b21;--electron-deprecation-app-expired-header-rgb:17,27,33;--electron-deprecation-app-expired-window:#202c33;--electron-deprecation-app-expired-window-rgb:32,44,51;--empty-state-background:#182229;--empty-state-background-rgb:24,34,41;--empty-state-icon:#727a7e;--empty-state-icon-rgb:114,122,126;--ephemeral-nux-background:rgba(6,207,156,0.15);--ephemeral-nux-background-rgb:6,207,156;--ephemeral-nux-bubble:#00a884;--ephemeral-nux-bubble-rgb:0,168,132;--ephemeral-nux-timer:#00a884;--ephemeral-nux-timer-rgb:0,168,132;--sender-superpower-title:#00a884;--sender-superpower-title-rgb:0,168,132;--focus:#53bdeb;--focus-rgb:83,189,235;--focus-animation:rgba(83,189,235,0.26);--focus-animation-rgb:83,189,235;--focus-animation-deeper:rgba(83,189,235,0.32);--focus-animation-deeper-rgb:83,189,235;--focus-lighter:rgba(83,189,235,0.12);--focus-lighter-rgb:83,189,235;--forwarded-indicator-text:hsla(0,0%,100%,0.6);--forwarded-indicator-text-rgb:255,255,255;--highlight:#00a884;--highlight-rgb:0,168,132;--icon:#8696a0;--icon-rgb:134,150,160;--icon-ack:#53bdeb;--icon-ack-rgb:83,189,235;--icon-disabled:#54656f;--icon-disabled-rgb:84,101,111;--icon-fixed:#8696a0;--icon-fixed-rgb:134,150,160;--icon-lighter:#8696a0;--icon-lighter-rgb:134,150,160;--icon-search-back:#00a884;--icon-search-back-rgb:0,168,132;--icon-strong:#aebac1;--icon-strong-rgb:174,186,193;--icon-bright-accent:#00a884;--icon-bright-accent-rgb:0,168,132;--icon-bright-highlight:#00a884;--icon-bright-highlight-rgb:0,168,132;--icon-pinned:#8696a0;--icon-pinned-rgb:134,150,160;--round-icon-background:#00a884;--round-icon-background-rgb:0,168,132;--incoming-background:#202c33;--incoming-background-rgb:32,44,51;--incoming-background-deeper:#1d282f;--incoming-background-deeper-rgb:29,40,47;--incoming-background-highlight:#040607;--incoming-background-highlight-rgb:4,6,7;--incoming-primary:#798287;--incoming-primary-rgb:121,130,135;--input-border-active:#00a884;--input-border-active-rgb:0,168,132;--input-border:#8696a0;--input-border-rgb:134,150,160;--input-hover-background:#202c33;--input-hover-background-rgb:32,44,51;--input-empty-value-placeholder:#00a884;--input-empty-value-placeholder-rgb:0,168,132;--input-placeholder:#8696a0;--input-placeholder-rgb:134,150,160;--input-button-more:#00a884;--input-button-more-rgb:0,168,132;--intro-background:#222e35;--intro-background-rgb:34,46,53;--intro-border:#008069;--intro-border-rgb:0,128,105;--intro-logo:rgba(233,237,239,0.26);--intro-logo-rgb:233,237,239;--intro-secondary:#8696a0;--intro-secondary-rgb:134,150,160;--inverse:#e9edef;--inverse-rgb:233,237,239;--label-secondary-text:rgba(241,241,242,0.6);--label-secondary-text-rgb:241,241,242;--labels-icon:rgba(233,237,239,0.4);--labels-icon-rgb:233,237,239;--label-disabled-text:#8696a0;--label-disabled-text-rgb:134,150,160;--link:#53bdeb;--link-rgb:83,189,235;--link-alt:#008069;--link-alt-rgb:0,128,105;--link-preview:rgba(233,237,239,0.87);--link-preview-rgb:233,237,239;--link-preview-light:rgba(233,237,239,0.3);--link-preview-light-rgb:233,237,239;--link-preview-lighter:rgba(233,237,239,0.6);--link-preview-lighter-rgb:233,237,239;--live-location-footer-background:rgba(17,27,33,0.9);--live-location-footer-background-rgb:17,27,33;--live-location-glow:rgba(37,211,102,0.3);--live-location-glow-rgb:37,211,102;--live-location-glow-stale:rgba(255,0,31,0.3);--live-location-glow-stale-rgb:255,0,31;--location-cluster-background:#111b21;--location-cluster-background-rgb:17,27,33;--map-overlay-background:rgba(17,27,33,0.6);--map-overlay-background-rgb:17,27,33;--map-overlay-foreground:#e9edef;--map-overlay-foreground-rgb:233,237,239;--media-editor-control:#fff;--media-editor-control-rgb:255,255,255;--media-editor-image-caption-input-background:#2b3b45;--media-editor-image-caption-input-background-rgb:43,59,69;--media-editor-video-caption-input-background:#2b3b45;--media-editor-video-caption-input-background-rgb:43,59,69;--media-editor-document-caption-input-background:#2b3b45;--media-editor-document-caption-input-background-rgb:43,59,69;--media-editor-icon-color:#aebac1;--media-editor-icon-color-rgb:174,186,193;--media-editor-icon-secondary-color:#8696a0;--media-editor-icon-secondary-color-rgb:134,150,160;--media-editor-thumb-border:rgba(241,241,242,0.1);--media-editor-thumb-border-rgb:241,241,242;--media-editor-thumb-border-active:#00a884;--media-editor-thumb-border-active-rgb:0,168,132;--media-gallery-thumb-background:#2a3942;--media-gallery-thumb-background-rgb:42,57,66;--media-gallery-thumb-icon:#54656f;--media-gallery-thumb-icon-rgb:84,101,111;--media-inner-border:hsla(0,0%,100%,0.1);--media-inner-border-rgb:255,255,255;--media-viewer-background:rgba(17,27,33,0.98);--media-viewer-background-rgb:17,27,33;--media-viewer-button-background:#222e35;--media-viewer-button-background-rgb:34,46,53;--media-viewer-button-icon:#e9edef;--media-viewer-button-icon-rgb:233,237,239;--menu-bar-item-background-active:hsla(0,0%,100%,0.1);--menu-bar-item-background-active-rgb:255,255,255;--menu-context-sticker-icon:rgba(233,237,239,0.5);--menu-context-sticker-icon-rgb:233,237,239;--menu-context-sticker-icon-inverse:rgba(32,44,51,0.5);--menu-context-sticker-icon-inverse-rgb:32,44,51;--menu-tabs-list-active:#00a884;--menu-tabs-list-active-rgb:0,168,132;--mention-at-symbol:#53bdeb;--mention-at-symbol-rgb:83,189,235;--message-background-deep:rgba(11,20,26,0.35);--message-background-deep-rgb:11,20,26;--message-placeholder-icon:rgba(209,215,219,0.3);--message-placeholder-icon-rgb:209,215,219;--message-primary:#e9edef;--message-primary-rgb:233,237,239;--message-selection-highlight:rgba(233,237,239,0.05);--message-selection-highlight-rgb:233,237,239;--modal-backdrop:rgba(11,20,26,0.85);--modal-backdrop-rgb:11,20,26;--modal-backdrop-solid:#111b21;--modal-backdrop-solid-rgb:17,27,33;--modal-background:#3b4a54;--modal-background-rgb:59,74,84;--notification-biz-background:#182229;--notification-biz-background-rgb:24,34,41;--notification-biz-text:#55fad9;--notification-biz-text-rgb:85,250,217;--notification-e2e-background:#182229;--notification-e2e-background-rgb:24,34,41;--notification-e2e-icon:#ffd279;--notification-e2e-icon-rgb:255,210,121;--notification-e2e-text:#ffd279;--notification-e2e-text-rgb:255,210,121;--notification-info-icon:#42c7b8;--notification-info-icon-rgb:66,199,184;--notification-non-e2e-background:#182229;--notification-non-e2e-background-rgb:24,34,41;--notification-non-e2e-text:#42c7b8;--notification-non-e2e-text-rgb:66,199,184;--notification-text:rgba(233,237,239,0.4);--notification-text-rgb:233,237,239;--outgoing-background:#005c4b;--outgoing-background-rgb:0,92,75;--outgoing-background-deeper:#025144;--outgoing-background-deeper-rgb:2,81,68;--outgoing-background-highlight:rgba(2,78,65,0.7);--outgoing-background-highlight-rgb:2,78,65;--overlay:#0b141a;--overlay-rgb:11,20,26;--panel-background:#111b21;--panel-background-rgb:17,27,33;--panel-background-active:#111a20;--panel-background-active-rgb:17,26,32;--panel-background-colored:#202c33;--panel-background-colored-rgb:32,44,51;--panel-background-colored-deeper:#202c33;--panel-background-colored-deeper-rgb:32,44,51;--panel-background-deep:#0f191f;--panel-background-deep-rgb:15,25,31;--panel-background-deeper:#101a20;--panel-background-deeper-rgb:16,26,32;--panel-background-hover:#101a20;--panel-background-hover-rgb:16,26,32;--panel-background-lighter:#101a20;--panel-background-lighter-rgb:16,26,32;--panel-header-background:#202c33;--panel-header-background-rgb:32,44,51;--panel-header-icon:#aebac1;--panel-header-icon-rgb:174,186,193;--conversation-header-border:rgba(134,150,160,0.15);--conversation-header-border-rgb:134,150,160;--panel-input-background:#222e35;--panel-input-background-rgb:34,46,53;--panel-primary:rgba(233,237,239,0.35);--panel-primary-rgb:233,237,239;--payment-amount:#009e7c;--payment-amount-rgb:0,158,124;--payment-status-failed:#f15c6d;--payment-status-failed-rgb:241,92,109;--payment-status-pending:rgba(233,237,239,0.45);--payment-status-pending-rgb:233,237,239;--payment-status-success:#71eb85;--payment-status-success-rgb:113,235,133;--photopicker-overlay-background:rgba(30,42,49,0.8);--photopicker-overlay-background-rgb:30,42,49;--picker-background:#233138;--picker-background-rgb:35,49,56;--pip-drag-bar:#fff;--pip-drag-bar-rgb:255,255,255;--pip-manager-content:rgba(44,58,66,0.85);--pip-manager-content-rgb:44,58,66;--popup-panel-background:#111b21;--popup-panel-background-rgb:17,27,33;--primary-muted:#667781;--primary-muted-rgb:102,119,129;--primary:#d1d7db;--primary-rgb:209,215,219;--primary-strong:#e9edef;--primary-strong-rgb:233,237,239;--primary-stronger:rgba(233,237,239,0.88);--primary-stronger-rgb:233,237,239;--primary-strongest:#e9edef;--primary-strongest-rgb:233,237,239;--primary-title:rgba(233,237,239,0.88);--primary-title-rgb:233,237,239;--product-image-button-background:rgba(11,20,26,0.35);--product-image-button-background-rgb:11,20,26;--product-placeholder-background:rgba(11,20,26,0.35);--product-placeholder-background-rgb:11,20,26;--product-thumb-background:#111b21;--product-thumb-background-rgb:17,27,33;--product-thumb-background-deeper:#1f313c;--product-thumb-background-deeper-rgb:31,49,60;--product-thumb-overlay-background:rgba(11,20,26,0.5);--product-thumb-overlay-background-rgb:11,20,26;--product-thumb-overlay-text:#e9edef;--product-thumb-overlay-text-rgb:233,237,239;--progress-background:#233138;--progress-background-rgb:35,49,56;--progress-primary:#0b846d;--progress-primary-rgb:11,132,109;--poll-bar-container-receiver:rgba(11,20,26,0.6);--poll-bar-container-receiver-rgb:11,20,26;--poll-bar-fill-receiver:#06cf9c;--poll-bar-fill-receiver-rgb:6,207,156;--poll-bar-container-sender:rgba(11,20,26,0.2);--poll-bar-container-sender-rgb:11,20,26;--poll-bar-fill-sender:#06cf9c;--poll-bar-fill-sender-rgb:6,207,156;--poll-button-disabled-receiver:#54656f;--poll-button-disabled-receiver-rgb:84,101,111;--poll-button-disabled-sender:hsla(0,0%,100%,0.2);--poll-button-disabled-sender-rgb:255,255,255;--poll-checkmark-receiver:#202c33;--poll-checkmark-receiver-rgb:32,44,51;--poll-checkmark-sender:#005c4b;--poll-checkmark-sender-rgb:0,92,75;--poll-disabled-checked-checkbox-receiver:#54656f;--poll-disabled-checked-checkbox-receiver-rgb:84,101,111;--poll-disabled-checked-checkbox-sender:hsla(0,0%,100%,0.2);--poll-disabled-checked-checkbox-sender-rgb:255,255,255;--poll-invalid-warning-background:#2a3942;--poll-invalid-warning-background-rgb:42,57,66;--poll-invalid-warning-border-receiver:rgba(11,20,26,0.6);--poll-invalid-warning-border-receiver-rgb:11,20,26;--poll-invalid-warning-border-sender:rgba(11,20,26,0.2);--poll-invalid-warning-border-sender-rgb:11,20,26;--poll-invalid-warning-icon-color:#ffd279;--poll-invalid-warning-icon-color-rgb:255,210,121;--poll-invalid-warning-icon-container-background:#9d792c;--poll-invalid-warning-icon-container-background-rgb:157,121,44;--poll-modal-background-color:#111b21;--poll-modal-background-color-rgb:17,27,33;--poll-modal-footer-background-color:#202c33;--poll-modal-footer-background-color-rgb:32,44,51;--poll-checkbox-default-border-color-sender:hsla(0,0%,100%,0.7);--poll-checkbox-default-border-color-sender-rgb:255,255,255;--poll-selectable-options-icon-hint-color:#d9d9d9;--poll-selectable-options-icon-hint-color-rgb:217,217,217;--ptt-blue:#53bdeb;--ptt-blue-rgb:83,189,235;--ptt-button-cancel:#f15c6d;--ptt-button-cancel-rgb:241,92,109;--ptt-button-send:#71eb85;--ptt-button-send-rgb:113,235,133;--ptt-draft-button-cancel:#8696a0;--ptt-draft-button-cancel-rgb:134,150,160;--ptt-draft-button-cancel-hover:#91a0a9;--ptt-draft-button-cancel-hover-rgb:145,160,169;--ptt-draft-button-play-pause:#e9edef;--ptt-draft-button-play-pause-rgb:233,237,239;--ptt-draft-button-play-pause-hover:#f5f7f8;--ptt-draft-button-play-pause-hover-rgb:245,247,248;--ptt-draft-button-play-pause-out-of-chat:#fff;--ptt-draft-button-play-pause-out-of-chat-rgb:255,255,255;--ptt-draft-button-stop:#ff3b30;--ptt-draft-button-stop-rgb:255,59,48;--ptt-draft-button-stop-hover:#ff4e44;--ptt-draft-button-stop-hover-rgb:255,78,68;--ptt-draft-button-send:#00a884;--ptt-draft-button-send-rgb:0,168,132;--ptt-draft-button-send-hover:#06cf9c;--ptt-draft-button-send-hover-rgb:6,207,156;--ptt-draft-thumb:#e9edef;--ptt-draft-thumb-rgb:233,237,239;--ptt-thumb-outgoing-unplayed:#d1d7db;--ptt-thumb-outgoing-unplayed-rgb:209,215,219;--ptt-thumb-outgoing-played:#53bdeb;--ptt-thumb-outgoing-played-rgb:83,189,235;--ptt-thumb-incoming-unplayed:#09d261;--ptt-thumb-incoming-unplayed-rgb:9,210,97;--ptt-thumb-incoming-played:#53bdeb;--ptt-thumb-incoming-played-rgb:83,189,235;--ptt-draft-waveform-background:#3b4a54;--ptt-draft-waveform-background-rgb:59,74,84;--ptt-draft-waveform-background-border:#111b21;--ptt-draft-waveform-background-border-rgb:17,27,33;--ptt-ooc-background:#3b4a54;--ptt-ooc-background-rgb:59,74,84;--ptt-ooc-mic-border-color:#3b4a54;--ptt-ooc-mic-border-color-rgb:59,74,84;--ptt-ooc-mic-fill-color:#fff;--ptt-ooc-mic-fill-color-rgb:255,255,255;--ptt-ooc-avatar-background:#ffad1f;--ptt-ooc-avatar-background-rgb:255,173,31;--ptt-waveform-preview-unplayed:#626e76;--ptt-waveform-preview-unplayed-rgb:98,110,118;--ptt-waveform-incoming-unplayed:#636b70;--ptt-waveform-incoming-unplayed-rgb:99,107,112;--ptt-waveform-outgoing-unplayed:#4d8d81;--ptt-waveform-outgoing-unplayed-rgb:77,141,129;--ptt-waveform-preview-played:#b1b7bb;--ptt-waveform-preview-played-rgb:177,183,187;--ptt-waveform-incoming-played:#a6abad;--ptt-waveform-incoming-played-rgb:166,171,173;--ptt-waveform-outgoing-played:#99beb7;--ptt-waveform-outgoing-played-rgb:153,190,183;--ptt-gray:rgba(233,237,239,0.4);--ptt-gray-rgb:233,237,239;--ptt-gray-badge:rgba(11,20,26,0.4);--ptt-gray-badge-rgb:11,20,26;--ptt-green:#09d261;--ptt-green-rgb:9,210,97;--ptt-message-blue:#53bdeb;--ptt-message-blue-rgb:83,189,235;--ptt-text:#e9edef;--ptt-text-rgb:233,237,239;--quick-action-button:rgba(233,237,239,0.5);--quick-action-button-rgb:233,237,239;--quick-action-button-background:rgba(0,0,0,0.7);--quick-action-button-background-rgb:0,0,0;--reaction-button:rgba(233,237,239,0.5);--reaction-button-rgb:233,237,239;--reaction-button-background:rgba(0,0,0,0.7);--reaction-button-background-rgb:0,0,0;--round-entry-point-background-color:rgba(0,0,0,0.7);--round-entry-point-background-color-rgb:0,0,0;--quoted-message-text:hsla(0,0%,100%,0.6);--quoted-message-text-rgb:255,255,255;--rich-text-panel-background:#202c33;--rich-text-panel-background-rgb:32,44,51;--search-container-background:#111b21;--search-container-background-rgb:17,27,33;--search-input-background:#202c33;--search-input-background-rgb:32,44,51;--search-input-container-background:#111b21;--search-input-container-background-rgb:17,27,33;--search-input-container-background-active:#111b21;--search-input-container-background-active-rgb:17,27,33;--secondary:#8696a0;--secondary-rgb:134,150,160;--secondary-light:#54656f;--secondary-light-rgb:84,101,111;--secondary-lighter:#667781;--secondary-lighter-rgb:102,119,129;--secondary-stronger:#d1d7db;--secondary-stronger-rgb:209,215,219;--security-icon-background:#d3ede6;--security-icon-background-rgb:211,237,230;--security-icon-lock:#1fc4b1;--security-icon-lock-rgb:31,196,177;--security-icon-shield:#f0faf7;--security-icon-shield-rgb:240,250,247;--shadow:#0b141a;--shadow-rgb:11,20,26;--shadow-light:rgba(11,20,26,0.08);--shadow-light-rgb:11,20,26;--spinner-default:#667781;--spinner-default-rgb:102,119,129;--spinner-highlight:#00a884;--spinner-highlight-rgb:0,168,132;--spinner-incoming:#5c666b;--spinner-incoming-rgb:92,102,107;--spinner-outgoing:#46887c;--spinner-outgoing-rgb:70,136,124;--startup-background:#111b21;--startup-background-rgb:17,27,33;--startup-icon:#676f73;--startup-icon-rgb:103,111,115;--status-background:#0b141a;--status-background-rgb:11,20,26;--status-background-hover:#2c353a;--status-background-hover-rgb:44,53,58;--status-primary:#fff;--status-primary-rgb:255,255,255;--status-secondary:hsla(0,0%,100%,0.55);--status-secondary-rgb:255,255,255;--status-secondary-stronger:#b6b9ba;--status-secondary-stronger-rgb:182,185,186;--status-ring-read:#bbbec4;--status-ring-read-rgb:187,190,196;--status-ring-unread:#008069;--status-ring-unread-rgb:0,128,105;--status-thumbnail-background:#777;--status-thumbnail-background-rgb:119,119,119;--status-link-preview-title:#111b21;--status-link-preview-title-rgb:17,27,33;--status-link-preview-secondary:#667781;--status-link-preview-secondary-rgb:102,119,129;--sticker-button-background:#26353d;--sticker-button-background-rgb:38,53,61;--success:#71eb85;--success-rgb:113,235,133;--suspicious-background:rgba(241,92,109,0.8);--suspicious-background-rgb:241,92,109;--system-message-background:#182229;--system-message-background-rgb:24,34,41;--system-message-text:#8696a0;--system-message-text-rgb:134,150,160;--teal-hover:#00a884;--teal-hover-rgb:0,168,132;--teal-pale:#60c6b1;--teal-pale-rgb:96,198,177;--text-action:#00a884;--text-action-rgb:0,168,132;--text-action-link:#00a884;--text-action-link-rgb:0,168,132;--text-muted:#8696a0;--text-muted-rgb:134,150,160;--thumb-border-active:#667781;--thumb-border-active-rgb:102,119,129;--thumb-border-viewer-active:#667781;--thumb-border-viewer-active-rgb:102,119,129;--toast-background:rgba(11,20,26,0.96);--toast-background-rgb:11,20,26;--tooltip-text:#0b141a;--tooltip-text-rgb:11,20,26;--tooltip-background:#fff;--tooltip-background-rgb:255,255,255;--typing:#00a884;--typing-rgb:0,168,132;--unread-background:#182229;--unread-background-rgb:24,34,41;--unread-bar-background:rgba(11,20,26,0.6);--unread-bar-background-rgb:11,20,26;--unread-timestamp:#00a884;--unread-timestamp-rgb:0,168,132;--unread-marker-background:#00a884;--unread-marker-background-rgb:0,168,132;--unread-marker-text:#111b21;--unread-marker-text-rgb:17,27,33;--vcard-placeholder-background:rgba(233,237,239,0.04);--vcard-placeholder-background-rgb:233,237,239;--vcard-placeholder-background-deeper:rgba(233,237,239,0.12);--vcard-placeholder-background-deeper-rgb:233,237,239;--video-player-background:#0b141a;--video-player-background-rgb:11,20,26;--pip-player-background:#233138;--pip-player-background-rgb:35,49,56;--video-primary:#fff;--video-primary-rgb:255,255,255;--voip-accept-background:#2ec452;--voip-accept-background-rgb:46,196,82;--voip-background:#111b21;--voip-background-rgb:17,27,33;--voip-background-deep:#0b141a;--voip-background-deep-rgb:11,20,26;--voip-video-background:#242424;--voip-video-background-rgb:36,36,36;--voip-controls-background:#2d2d2d;--voip-controls-background-rgb:45,45,45;--voip-primary:#fff;--voip-primary-rgb:255,255,255;--voip-alternative:#0b141a;--voip-alternative-rgb:11,20,26;--voip-reject-background:#ff3b30;--voip-reject-background-rgb:255,59,48;--voip-disabled-background:#222;--voip-disabled-background-rgb:34,34,34;--wallpaper-background:#0b141a;--wallpaper-background-rgb:11,20,26;--wallpaper-thumb-border-active:#667781;--wallpaper-thumb-border-active-rgb:102,119,129;--wallpaper-thumb-border-hover:#3b4a54;--wallpaper-thumb-border-hover-rgb:59,74,84;--win32-title-primary:#fff;--win32-title-primary-rgb:255,255,255;--reactions-bubble-border:#111b21;--reactions-bubble-border-rgb:17,27,33;--reactions-bubble-counter:rgba(241,241,242,0.6);--reactions-bubble-counter-rgb:241,241,242;--reactions-details-background:#222e35;--reactions-details-background-rgb:34,46,53;--reactions-tray-background:#222e35;--reactions-tray-background-rgb:34,46,53;--reactions-details-background-hover:#2c3b45;--reactions-details-background-hover-rgb:44,59,69;--reactions-tray-active-round-background:#3b4a54;--reactions-tray-active-round-background-rgb:59,74,84;--reactions-picker-bg:#667781;--reactions-picker-bg-rgb:102,119,129;--svg-gray-button:#222e36;--svg-gray-button-rgb:34,46,54;--reactions-panel-background-color:#222e36;--reactions-panel-background-color-rgb:34,46,54;--reactions-panel-search-background-color:hsla(0,0%,100%,0.1);--reactions-panel-search-background-color-rgb:255,255,255;--reactions-search-color:#8696a0;--reactions-search-color-rgb:134,150,160;--reactions-menu-tab-separator:rgba(134,150,160,0.15);--reactions-menu-tab-separator-rgb:134,150,160;--text-primary-strong:#e9edef;--text-primary-strong-rgb:233,237,239;--text-secondary-lighter:#8696a0;--text-secondary-lighter-rgb:134,150,160;--text-medium-emphasis:#8696a0;--text-medium-emphasis-rgb:134,150,160;--icon-medium-emphasis:#8696a0;--icon-medium-emphasis-rgb:134,150,160;--icon-high-emphasis:#00a884;--icon-high-emphasis-rgb:0,168,132;--switch-button-color:#83929d;--switch-button-color-rgb:131,146,157;--switch-button-checked-color:#01a581;--switch-button-checked-color-rgb:1,165,129;--switch-track-color:#334046;--switch-track-color-rgb:51,64,70;--switch-track-checked-color:#0b463f;--switch-track-checked-color-rgb:11,70,63;--announcement-speaker-background:#046a62;--announcement-speaker-background-rgb:4,106,98;--communities-green:#42c7b8;--communities-green-rgb:66,199,184;--qc-button-border:#2a3942;--qc-button-border-rgb:42,57,66;--qc-button-border-active:#344651;--qc-button-border-active-rgb:52,70,81;--qc-quantity-label-highlighted-background:#00a884;--qc-quantity-label-highlighted-background-rgb:0,168,132;--drawer-loading-backgroud:rgba(0,0,0,0.5);--drawer-loading-backgroud-rgb:0,0,0;--multi-skin-tone-picker-emoji-selected-background:#3b4a54;--multi-skin-tone-picker-emoji-selected-background-rgb:59,74,84;--chat-assignment-icon-me:#009de2;--chat-assignment-icon-me-rgb:0,157,226;--chat-assignment-icon-others:#8696a0;--chat-assignment-icon-others-rgb:134,150,160;--pnh-nux:#316474;--pnh-nux-rgb:49,100,116;--forward-caption-preview-background:#202c33;--forward-caption-preview-background-rgb:32,44,51;--forward-caption-preview-content:#111b21;--forward-caption-preview-content-rgb:17,27,33}.dark .color-1{color:#06cf9c!important}.dark .bg-color-1{background-color:#06cf9c!important}.dark .color-2{color:#53bdeb!important}.dark .bg-color-2{background-color:#53bdeb!important}.dark .color-3{color:#e26ab6!important}.dark .bg-color-3{background-color:#e26ab6!important}.dark .color-4{color:#a5b337!important}.dark .bg-color-4{background-color:#a5b337!important}.dark .color-5{color:#fc9775!important}.dark .bg-color-5{background-color:#fc9775!important}.dark .color-6{color:#53a6fd!important}.dark .bg-color-6{background-color:#53a6fd!important}.dark .color-7{color:#ffbc38!important}.dark .bg-color-7{background-color:#ffbc38!important}.dark .color-8{color:#25d366!important}.dark .bg-color-8{background-color:#25d366!important}.dark .color-9{color:#a791ff!important}.dark .bg-color-9{background-color:#a791ff!important}.dark .color-10{color:#f15c6d!important}.dark .bg-color-10{background-color:#f15c6d!important}.dark .color-11{color:#7f66ff!important}.dark .bg-color-11{background-color:#7f66ff!important}.dark .color-12{color:#42c7b8!important}.dark .bg-color-12{background-color:#42c7b8!important}.dark .color-13{color:#ff72a1!important}.dark .bg-color-13{background-color:#ff72a1!important}.dark .color-14{color:#d88deb!important}.dark .bg-color-14{background-color:#d88deb!important}.dark .color-15{color:#fa6533!important}.dark .bg-color-15{background-color:#fa6533!important}.dark .color-16{color:#02a698!important}.dark .bg-color-16{background-color:#02a698!important}.dark .color-17{color:#ffd279!important}.dark .bg-color-17{background-color:#ffd279!important}
._2c_rw{position:relative;z-index:100;width:100%;height:100%;overflow:hidden}@media screen and (min-width:1441px){._2c_rw:after{position:fixed;top:0;z-index:-1;width:100%;height:127px;content:""}html[dir] ._2c_rw:after{background-color:var(--app-background-stripe)}html[dir=ltr] ._2c_rw:after{left:0}html[dir=rtl] ._2c_rw:after{right:0}.dark ._2c_rw:after{content:none}}._5XBCY{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%}html[dir] ._5XBCY{background-color:var(--panel-background-lighter)}@media screen and (min-width:1441px){._5XBCY{top:19px;width:1396px;height:calc(100% - 38px);margin:0 auto;box-shadow:0 1px 1px 0 rgba(var(--shadow-rgb),.06),0 2px 5px 0 rgba(var(--shadow-rgb),.2)}}._329-Z{line-height:37.5px}html[dir] ._329-Z{margin-top:24px;margin-bottom:6px}
progress.ZJWuG{color:var(--progress-primary)}html[dir] progress.ZJWuG{background-color:var(--progress-background)}html[dir] progress.ZJWuG[value]::-webkit-progress-bar{background-color:var(--progress-background)}progress.ZJWuG[value]::-webkit-progress-value{-webkit-transition:width .45s ease;transition:width .45s ease}html[dir] progress.ZJWuG[value]::-webkit-progress-value{background-color:var(--progress-primary)}progress.ZJWuG[value]::-moz-progress-bar{-moz-transition:width .45s ease;transition:width .45s ease}html[dir] progress.ZJWuG[value]::-moz-progress-bar{background-color:var(--progress-primary)}
._1INL_{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}html[dir] ._1INL_{background-color:var(--startup-background)}._1UG2S{font-family:Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif}._1iyey{position:fixed;top:0}html[dir=ltr] ._1iyey{left:0}html[dir=rtl] ._1iyey{right:0}._26aja{color:var(--startup-icon)}html[dir] ._26aja{margin-top:-40px}._26aja:after{content:"";opacity:0;transition:opacity .2s ease-in-out}html[dir] ._26aja:after{transition-delay:.4s}._26aja ._35GDA{transition:transform .2s ease-out}._26aja ._2pp-n{opacity:1;transition:opacity .2s ease-in-out .2s}._26aja ._1JPfm{transition:opacity .2s ease-in-out .2s,transform .4s ease-out .2s}._1dEQH:after{position:relative;top:-100%;left:calc(50% - 180px);display:block;width:216px;height:100%;margin-right:auto;background:linear-gradient(90deg,rgba(var(--startup-background-rgb),.5) 0,rgba(var(--startup-background-rgb),.5) 33.33%,rgba(var(--startup-background-rgb),0) 44.1%,rgba(var(--startup-background-rgb),0) 55.8%,rgba(var(--startup-background-rgb),.5) 66.66%,rgba(var(--startup-background-rgb),.5));opacity:1;animation:_3vobx 1.5s linear .6s infinite}._2FX6G ._26aja ._35GDA{transform:translateX(calc(50% - 26px))}._2FX6G .WD35o,._2FX6G ._26aja ._2pp-n,._2FX6G ._26aja ._1JPfm,._2FX6G ._3iu7m{opacity:0}.A_WMk ._2pp-n,.A_WMk ._35GDA{opacity:0;transition:opacity .2s ease-in-out}.A_WMk ._1JPfm{transform:translateX(calc(-50% + 36px))}._30oB1{position:relative;width:420px;height:3px;transition:opacity .2s ease-in-out}html[dir] ._30oB1{margin-top:40px}._30oB1 progress{vertical-align:top}._2dfCc{font-size:17px;color:var(--primary-title);transition:opacity .2s ease-in-out}html[dir] ._2dfCc{margin-top:40px}._2e4Ei{font-size:14px;color:var(--secondary-lighter);transition:opacity .2s ease-in-out}html[dir] ._2e4Ei{margin-top:12px}._2e4Ei span{display:inline-block;vertical-align:middle}html[dir] ._2e4Ei span{margin-bottom:2px}.WD35o,._3iu7m,.QgIWN{position:absolute;transition:all .4s ease-in-out}html[dir] .WD35o,html[dir] ._3iu7m,html[dir] .QgIWN{transition-delay:0s}._3iu7m{bottom:60px;opacity:1}.QgIWN{bottom:-20px;width:100%;font-size:14px;color:var(--secondary-lighter);opacity:0}html[dir] .QgIWN{text-align:center}._3dIM5{opacity:1}html[dir] ._3dIM5{transition-delay:10s}html[dir] ._3dIM5.QgIWN{transform:translateY(-80px)}html[dir] ._3dIM5._3iu7m{transform:translateY(-24px)}.WD35o{bottom:25%;opacity:1}html[dir] .WD35o{padding-bottom:10px}@keyframes _3vobx{0%{left:calc(50% - 180px)}to{left:calc(50% - 36px)}}@keyframes behLh{0%{opacity:.5}14%{opacity:1}36%,to{opacity:.5}}._2pp-n circle{fill:var(--startup-icon)}html[dir=ltr] ._2pp-n circle{animation:behLh 1.4s ease-in-out infinite;animation-fill-mode:both}html[dir=rtl] ._2pp-n circle{animation:behLh 1.4s ease-in-out infinite;animation-fill-mode:both}html[dir=ltr] ._2pp-n circle:nth-child(2){animation-delay:125ms}html[dir=rtl] ._2pp-n circle:nth-child(2){animation-delay:125ms}html[dir=ltr] ._2pp-n circle:nth-child(3){animation-delay:.25s}html[dir=rtl] ._2pp-n circle:nth-child(3){animation-delay:.25s}html[dir=ltr] ._2pp-n circle:nth-child(4){animation-delay:375ms}html[dir=rtl] ._2pp-n circle:nth-child(4){animation-delay:375ms}html[dir=ltr] ._2pp-n circle:nth-child(5){animation-delay:.5s}html[dir=rtl] ._2pp-n circle:nth-child(5){animation-delay:.5s}html[dir=ltr] ._2pp-n circle:nth-child(6){animation-delay:625ms}html[dir=rtl] ._2pp-n circle:nth-child(6){animation-delay:625ms}html[dir=ltr] ._2pp-n circle:nth-child(7){animation-delay:.75s}html[dir=rtl] ._2pp-n circle:nth-child(7){animation-delay:.75s}html[dir=ltr] ._2pp-n circle:nth-child(8){animation-delay:875ms}html[dir=rtl] ._2pp-n circle:nth-child(8){animation-delay:875ms}html[dir=rtl] ._2pp-n{transform:translateX(10px)}html[dir=rtl] ._2VJL- ._35GDA,html[dir=rtl] .ygjbp ._35GDA,html[dir=rtl] .A_WMk ._35GDA{transform:translateX(calc(100% - 52px))}html[dir=rtl] ._2VJL- ._1JPfm,html[dir=rtl] .ygjbp ._1JPfm,html[dir=rtl] ._2FX6G ._1JPfm{transform:translateX(calc(-100% + 72px))}html[dir=rtl] ._1dEQH:after{animation-direction:reverse}html[dir=rtl] ._2pp-n circle:nth-child(8){animation-delay:0ms}html[dir=rtl] ._2pp-n circle:nth-child(7){animation-delay:125ms}html[dir=rtl] ._2pp-n circle:nth-child(6){animation-delay:.25s}html[dir=rtl] ._2pp-n circle:nth-child(5){animation-delay:375ms}html[dir=rtl] ._2pp-n circle:nth-child(4){animation-delay:.5s}html[dir=rtl] ._2pp-n circle:nth-child(3){animation-delay:625ms}html[dir=rtl] ._2pp-n circle:nth-child(2){animation-delay:.75s}html[dir=rtl] ._2pp-n circle:first-child{animation-delay:875ms}
html[dir] #startup{background-color:var(--startup-background)}._2Z6v5{font-size:14px;line-height:20px;color:var(--secondary)}html[dir] ._2Z6v5{margin-bottom:20px}._2Z6v5 a{color:var(--button-secondary)}._2Xgjp{height:0}html[dir] ._2Xgjp{margin-top:12px;margin-bottom:12px;border:none;border-top:1px solid var(--border-stronger)}


      </style>
            <style>

                .a1m9qzja{flex:1}
.aja0x350{text-decoration:none}
.ajuzgosp{transform:translateX(50%)}
.b4xm8rjh{transform:scale(1)}
.b5bqnu92{transform:translateY(-240%)}
.bglikw2g{transform:scale(.01)}
.bnt9nn9b{transform:translate(5px)}
.bqte3on1{transform:translateX(-1px)}
.btgdcgtm{transform:translateX(-100%) translateY(-50%)}
.bwjm0vhl{transform:rotate(-90deg)}
.bxpi4b5r{transform:translate3d(0,0,0)}
.byw3xhqn{transition:opacity .3s var(--t-ease),transform .3s var(--t-ease)}
.c5h0bzs2{transition:opacity .08s linear}
.cgi16xlc{transform:translateZ(0)}
.cljgexa3{transform:translateY(6px)}
.cxnvdhix{transform:translateX(1px)}
.d4g41f7d{transition:opacity .2s ease-in-out}
.d7dzraxg{transform:translateX(2px)}
.d9ddx5tg{background:linear-gradient(to top,rgba(var(--overlay-rgb),.5),rgba(var(--overlay-rgb),0))}
.e3l9pkzr{background:var(--video-player-background)}
.e79a4tva{transform:translateY(24px)}
.e95mh68g{transform:translateX(12px)}
.eipqoq80{transform:translate(0,0) scale(.8)!important}
.etdxpurf{transform:translateY(-2px)}
.eu5j4lnj{transition:padding-left .3s var(--t-ease)}
.g6mp970w{transition:transform $t-fast cubic-bezier(.09,.87,.72,1)}
.gk6igrwd{outline:none}
.gqonocmn{transform:translateY(-120%)}
.h442i0ze{transform:translateX(50%) translateY(-100%)}
.haigt2tc{transition:opacity .3s ease}
.hda1r0l0{transform:scale(.82)}
.hir9ny8g{transform:rotate(45deg)}
.hvx74mdw{transform:translateX(50%) translateY(100%)}
.iw1tz1w0{transition:background-color .2s}
.iwt3stqw{transition:transform .15s ease}
.j7iro104{transform:translateY(-360%)}
.j8qkm4ft{transform:perspective(1px)}
.jciay5ix{}
.jvslfpcx{transform:none!important}
.kk3akd72{flex:none}
.kqm7f4gm{background:var(--background-default)}
.kvhexry3{transition:transform .075s ease-out,opacity .25s ease-in-out}
.lel4qhml{transform:translateX(0)}
.lidvm163{transform:scale(.9375)}
.lvbah2qd{transform:translateY(10px)}
.m7vo9q63{transform:translateY(-50%)}
.mdse5hul{transform:scale(.5)}
.mfeq4yke{transition:opacity .075s}
.mjomr7am{transform:translateX(-105%)}
.mob44t3l{transform:scale(.875)}
.mpzqt04v{transform:translateY(7px)}
.mrtez2t4{transform:scale(0)}
.mx771qyo{flex:1 1 auto}
.n4o0o7gj{transform:scaleX(-1)}
.n5hs2j7m{flex:0 0 auto}
.o7z9b2jg{transform:translateX(-100%)}
.odkvbdo1{transition:transform .2s cubic-bezier(.4,0,.2,1),opacity .2s cubic-bezier(.4,0,.2,1)}
.of0uvz1c{transform:scale(.87)}
.onkrk2ft{transition:opacity .15s ease}
.ozhy756y{text-decoration:line-through}
.p1bddo5c{background:var(--beta-tag-background)}
.p5jrpzbl{transform:scale(.92)}
.p83aruvr{transform:translate(0,0) scale(.85)!important}
.pcik6s50{transition:border-width var(--t-fast) cubic-bezier(.09,.87,.72,1)}
.pdwgdm2l{transform:rotate(90deg)}
.po5z5zgs{transform:translateY(2px)}
.qbtd8e50{transition:border-color .2px ease-out}
.qdd0en2n{transform:translateY(0)}
.qh5tioqs{transition:padding-left .3s var(--t-ease-reverse)}
.qizq0yyl{transition:transform .3s,opacity .3s}
.qk2y3tb3{transform:translate(-50%,-50%)}
.qlxkrvdn{transform:translateZ(0);}
.qvwhnwh7{transition:transform .2s}
.qybahty3{transform:rotate(230deg)}
.rbxsf3hm{transform:scale(.85)}
.rj4tx0cq{transition:width .3s}
.sihoqmp4{transform:translateY(-50px)}
.slzs0jzd{transform:translate(0,0) scale(.9)!important}
.sqzaidt6{transform:scale(.25)}
.t1844p82{transform:translate3d(100,0,0)}
.t21h2yns{transform:scale(.7)}
.t9w6h8zt{transform:translateX(-50%)}
.teu70ee9{transform:translateX(100%) translateY(-50%)}
.tqd5if5z{background:var(--media-inner-border)}
html:not([dir='rtl']) .a0tvyxpe{border-right:2px solid #fff}
html[dir='rtl'] .a0tvyxpe{border-left:2px solid #fff}
html:not([dir='rtl']) .af7d455f{border-left:2px solid rgba(var(--inverse-rgb),.1)}
html[dir='rtl'] .af7d455f{border-right:2px solid rgba(var(--inverse-rgb),.1)}
html:not([dir='rtl']) .af84pui9{border-right:2px solid var(--panel-header-background)}
html[dir='rtl'] .af84pui9{border-left:2px solid var(--panel-header-background)}
.afzp6nl2{border-bottom:1px solid rgba(var(--primary-rgb),.2)}
.aickbkrb{border-bottom:2px solid rgba(var(--primary-rgb),.75)}
.at9xyjjq{border-bottom:1px solid var(--ptt-draft-waveform-background-border)}
.av59jz02{border-bottom:2px solid var(--checkbox-mark)}
html:not([dir='rtl']) .av6w3u2w{border-left:1px solid var(--border-panel)}
html[dir='rtl'] .av6w3u2w{border-right:1px solid var(--border-panel)}
.avd5zzxf{border-bottom:1px solid var(--reactions-bubble-border)}
.b16c6ymn{border-top:1px solid var(--ptt-draft-waveform-background-border)}
.bajl15op{border-bottom:6px solid var(--background-default-hover)}
html:not([dir='rtl']) .bd2x2sk5{border-left:2px solid var(--icon-disabled)}
html[dir='rtl'] .bd2x2sk5{border-right:2px solid var(--icon-disabled)}
.bh3h7g0c{border-bottom:1px solid var(--sticker-button-background)}
html:not([dir='rtl']) .bhvruqn2{border-right:2px solid rgba(var(--inverse-rgb),.1)}
html[dir='rtl'] .bhvruqn2{border-left:2px solid rgba(var(--inverse-rgb),.1)}
.bjj8y24l{border-bottom:4px solid var(--wallpaper-thumb-border-active)}
html:not([dir='rtl']) .bmro6pka{border-left:1px solid var(--icon-disabled)}
html[dir='rtl'] .bmro6pka{border-right:1px solid var(--icon-disabled)}
.btoh1681{border-top:2px solid var(--icon-disabled)}
.btsqtxyc{border-top:1px solid var(--inverse)}
html:not([dir='rtl']) .bwdjnla8{border-right:1px solid var(--wds-cool-gray-100)}
html[dir='rtl'] .bwdjnla8{border-left:1px solid var(--wds-cool-gray-100)}
.c2eze1zb{border-bottom:2px solid var(--icon-disabled)}
.cc8mgx9x{border-top:0}
.cd4l02zd{border-top:2px solid rgba(var(--primary-rgb),.75)}
.cxbokjas{border-bottom:1px solid var(--wds-cool-gray-100)}
.d27kr2rt{border-top:unset}
.d311eqfx{border-bottom:1px solid var(--input-border)}
.d9802myq{border-bottom:0}
.daad4uqs{border-bottom:1px solid var(--border-default)}
html:not([dir='rtl']) .dcbm44dr{border-left:2px solid var(--background-default-hover)}
html[dir='rtl'] .dcbm44dr{border-right:2px solid var(--background-default-hover)}
html:not([dir='rtl']) .dic3qptu{border-left:1px solid}
html[dir='rtl'] .dic3qptu{border-right:1px solid}
html:not([dir='rtl']) .digrcooj{border-right:1px solid}
html[dir='rtl'] .digrcooj{border-left:1px solid}
.dkf3g4f3{border-top:4px solid var(--wallpaper-thumb-border-hover)}
.dl47i6rc{border-top:1px solid var(--border-stronger)}
.dukfh0op{border-top:4px solid var(--wallpaper-thumb-border-active)}
html:not([dir='rtl']) .e4xiuwjv{border-left:0}
html[dir='rtl'] .e4xiuwjv{border-right:0}
.efpv7i3f{border-bottom:1px solid var(--background-default-hover)}
.ei53l81b{border-top:1px solid var(--border-bubble)}
.er60nxep{border-top:2px solid var(--modal-background)}
html:not([dir='rtl']) .eta5aym1{border-right:0}
html[dir='rtl'] .eta5aym1{border-left:0}
html:not([dir='rtl']) .f22u1y93{border-left:1px solid var(--qc-button-border)}
html[dir='rtl'] .f22u1y93{border-right:1px solid var(--qc-button-border)}
.f2vo98sp{border-top:4px solid var(--white)}
html:not([dir='rtl']) .f3pti8mu{border-left:2px solid var(--modal-background)}
html[dir='rtl'] .f3pti8mu{border-right:2px solid var(--modal-background)}
html:not([dir='rtl']) .fe0724t5{border-right:2px solid var(--background-default-active)}
html[dir='rtl'] .fe0724t5{border-left:2px solid var(--background-default-active)}
html:not([dir='rtl']) .fefz13mk{border-right:1px solid var(--border-strong)}
html[dir='rtl'] .fefz13mk{border-left:1px solid var(--border-strong)}
html:not([dir='rtl']) .femjv38p{border-right:4px solid var(--blue-light)}
html[dir='rtl'] .femjv38p{border-left:4px solid var(--blue-light)}
html:not([dir='rtl']) .fg094308{border-right:4px solid transparent}
html[dir='rtl'] .fg094308{border-left:4px solid transparent}
.flf84san{border-bottom:1px solid}
.ft81lexa{border-bottom:1px solid var(--inverse)}
.g0j88qvc{border-top:1px dashed var(--media-inner-border)}
.g4g5yoif{border-bottom:2px solid var(--modal-background)}
html:not([dir='rtl']) .g5xlzzjq{border-right:4px solid var(--white)}
html[dir='rtl'] .g5xlzzjq{border-left:4px solid var(--white)}
.g80wewbe{border-top:2px solid var(--secondary-light)}
html:not([dir='rtl']) .g9ebf9yp{border-left:unset}
html[dir='rtl'] .g9ebf9yp{border-right:unset}
.gb6ia7xa{border-top:1px solid}
.ggdspdaz{border-bottom:2px solid var(--input-border-active)}
.ggsn7slg{border-top:1px solid var(--wds-cool-gray-100)}
html:not([dir='rtl']) .giz8vor8{border-left:4px solid var(--wallpaper-thumb-border-active)}
html[dir='rtl'] .giz8vor8{border-right:4px solid var(--wallpaper-thumb-border-active)}
.gjeyj30g{border-bottom:1px solid var(--icon-disabled)}
.gq6acybq{border-top:.5px solid var(--border-list)}
.grf4wkbn{border-left:none}
html:not([dir='rtl']) .h0ed51ke{border-left:2px solid rgba(var(--primary-rgb),.75)}
html[dir='rtl'] .h0ed51ke{border-right:2px solid rgba(var(--primary-rgb),.75)}
html:not([dir='rtl']) .h826kv5n{border-left:4px solid transparent}
html[dir='rtl'] .h826kv5n{border-right:4px solid transparent}
.h82jhl79{border-top:2px solid rgba(var(--shadow-rgb),.01)}
.hcpeg58q{border-top:1px solid var(--reactions-bubble-border)}
.he2qn9qk{border-top:1px solid rgba(var(--inverse-rgb),.2)}
.hoxr7m2v{border-bottom:1px solid var(--qc-button-border)}
html:not([dir='rtl']) .hqx4twni{border-left:1px solid var(--border-stronger)}
html[dir='rtl'] .hqx4twni{border-right:1px solid var(--border-stronger)}
html:not([dir='rtl']) .ikkoynhc{border-left:5px dashed var(--attach-media-drop-border)}
html[dir='rtl'] .ikkoynhc{border-right:5px dashed var(--attach-media-drop-border)}
.im448w36{border-bottom:2px solid var(--background-default)}
.inlya0ko{border-bottom:4px solid var(--white)}
.iupwfssi{border-top:1px dashed var(--border-list)}
.iur5tn1g{border-bottom:4px solid var(--thumb-border-viewer-active)}
.iys7crcf{border-top:2px solid var(--background-default-hover)}
.izjj9xk3{border-bottom:2px solid var(--panel-header-background)}
.j4zbmt6h{border-bottom:1px solid var(--border-bubble)}
.jevf67zx{border-top:1px solid var(--background-default-hover)}
html:not([dir='rtl']) .jj3p8fxw{border-left:2px solid rgba(var(--shadow-rgb),.01)}
html[dir='rtl'] .jj3p8fxw{border-right:2px solid rgba(var(--shadow-rgb),.01)}
.jjt3y76m{border-bottom:2px solid var(--background-default-hover)}
html:not([dir='rtl']) .jkanexlp{border-right:none}
html[dir='rtl'] .jkanexlp{border-left:none}
.jl194bqt{border-bottom:4px solid var(--blue-light)}
.jmaq5bi8{border-top:4px solid var(--thumb-border-viewer-active)}
.joyebr9p{border-top:5px dashed var(--attach-media-drop-border)}
html:not([dir='rtl']) .jradjnc8{border-right:5px dashed var(--attach-media-drop-border)}
html[dir='rtl'] .jradjnc8{border-left:5px dashed var(--attach-media-drop-border)}
.jzfpk5uu{border-bottom:4px solid transparent}
html:not([dir='rtl']) .k59id2ex{border-right:1px solid var(--qc-button-border)}
html[dir='rtl'] .k59id2ex{border-left:1px solid var(--qc-button-border)}
.k8viy54k{border-bottom:1px solid grey}
html:not([dir='rtl']) .krn0l44i{border-left:4px solid var(--white)}
html[dir='rtl'] .krn0l44i{border-right:4px solid var(--white)}
html:not([dir='rtl']) .kwb2ulcm{border-right:2px solid var(--background-default-hover)}
html[dir='rtl'] .kwb2ulcm{border-left:2px solid var(--background-default-hover)}
.l78o2i9s{border-top:1px solid var(--qc-button-border)}
.lbsrbgll{border-top:1px solid var(--sticker-button-background)}
html:not([dir='rtl']) .lf2f5g3m{border-right:2px solid var(--background-default)}
html[dir='rtl'] .lf2f5g3m{border-left:2px solid var(--background-default)}
html:not([dir='rtl']) .lll8t7px{border-left:4px solid var(--blue-light)}
html[dir='rtl'] .lll8t7px{border-right:4px solid var(--blue-light)}
.lufur1ix{border-top:1px solid var(--media-inner-border)}
html:not([dir='rtl']) .m98q8jdg{border-right:2px solid rgba(var(--primary-rgb),.75)}
html[dir='rtl'] .m98q8jdg{border-left:2px solid rgba(var(--primary-rgb),.75)}
.mcq5gaun{border-top:4px solid transparent}
.mkjmy6nk{border-top:2px solid var(--panel-header-background)}
.mug5vpb7{border-top:1px solid var(--border-panel)}
.n7quhhxz{border-top:2px solid var(--background-default-active)}
.n8n2xqzm{border-bottom:1px solid var(--border-stronger)}
html:not([dir='rtl']) .na7ur5ty{border-right:1px solid var(--icon-disabled)}
html[dir='rtl'] .na7ur5ty{border-left:1px solid var(--icon-disabled)}
.nqo088zx{border-bottom:2px solid rgba(var(--inverse-rgb),.1)}
html:not([dir='rtl']) .nsmrnv0a{border-left:none}
html[dir='rtl'] .nsmrnv0a{border-right:none}
html:not([dir='rtl']) .o6q0nafl{border-left:2px solid var(--panel-header-background)}
html[dir='rtl'] .o6q0nafl{border-right:2px solid var(--panel-header-background)}
html:not([dir='rtl']) .o872nhkh{border-left:4px solid var(--wallpaper-thumb-border-hover)}
html[dir='rtl'] .o872nhkh{border-right:4px solid var(--wallpaper-thumb-border-hover)}
html:not([dir='rtl']) .o8ek0a1j{border-left:2px solid #fff}
html[dir='rtl'] .o8ek0a1j{border-right:2px solid #fff}
html:not([dir='rtl']) .o9wp17a0{border-left:1px solid var(--wds-cool-gray-100)}
html[dir='rtl'] .o9wp17a0{border-right:1px solid var(--wds-cool-gray-100)}
.ob9ouq0z{border-bottom:1px solid var(--border-strong)}
.omlynucm{border-top:2px solid #fff}
.oosapc3q{border-top:1px solid var(--border-strong)}
.opq9nt8f{border-bottom:5px dashed var(--attach-media-drop-border)}
html:not([dir='rtl']) .ou0nhrxb{border-left:2px solid var(--background-default)}
html[dir='rtl'] .ou0nhrxb{border-right:2px solid var(--background-default)}
html:not([dir='rtl']) .p6ubcsnv{border-right:1px solid var(--reactions-bubble-border)}
html[dir='rtl'] .p6ubcsnv{border-left:1px solid var(--reactions-bubble-border)}
html:not([dir='rtl']) .pdo9fnbd{border-right:1px solid var(--border-stronger)}
html[dir='rtl'] .pdo9fnbd{border-left:1px solid var(--border-stronger)}
html:not([dir='rtl']) .popit0kw{border-right:4px solid var(--thumb-border-viewer-active)}
html[dir='rtl'] .popit0kw{border-left:4px solid var(--thumb-border-viewer-active)}
html:not([dir='rtl']) .ppgl3mp3{border-right:2px solid var(--modal-background)}
html[dir='rtl'] .ppgl3mp3{border-left:2px solid var(--modal-background)}
.q0ohlrvj{border-right:2px solid var(--checkbox-mark)}
html:not([dir='rtl']) .q1alctvk{border-right:1px solid var(--ptt-draft-waveform-background-border)}
html[dir='rtl'] .q1alctvk{border-left:1px solid var(--ptt-draft-waveform-background-border)}
html:not([dir='rtl']) .q2i1o5qz{border-right:unset}
html[dir='rtl'] .q2i1o5qz{border-left:unset}
html:not([dir='rtl']) .q49csmvs{border-right:1px solid var(--sticker-button-background)}
html[dir='rtl'] .q49csmvs{border-left:1px solid var(--sticker-button-background)}
.q4zabkcz{border-top:none}
html:not([dir='rtl']) .q568nw76{border-left:1px solid var(--ptt-draft-waveform-background-border)}
html[dir='rtl'] .q568nw76{border-right:1px solid var(--ptt-draft-waveform-background-border)}
.qd2jueek{border-top:2px solid rgba(var(--inverse-rgb),.1)}
html:not([dir='rtl']) .qdxezjgn{border-left:2px solid var(--background-default-active)}
html[dir='rtl'] .qdxezjgn{border-right:2px solid var(--background-default-active)}
.qj9nvfuq{border-bottom:1px solid var(----border-stronger)}
.qldwl5fi{border-bottom:4px solid var(--active-tab-marker)}
.qmxv8cnq{border-bottom:1px solid var(--border-list)}
html:not([dir='rtl']) .qqik71jn{border-left:1px solid var(--reactions-bubble-border)}
html[dir='rtl'] .qqik71jn{border-right:1px solid var(--reactions-bubble-border)}
html:not([dir='rtl']) .qrr5pbl4{border-left:4px solid var(--thumb-border-viewer-active)}
html[dir='rtl'] .qrr5pbl4{border-right:4px solid var(--thumb-border-viewer-active)}
html:not([dir='rtl']) .qv8mjgpu{border-right:2px solid rgba(var(--shadow-rgb),.01)}
html[dir='rtl'] .qv8mjgpu{border-left:2px solid rgba(var(--shadow-rgb),.01)}
.r40aedaz{border-bottom:unset}
html:not([dir='rtl']) .r4ixzlli{border-left:1px solid var(--inverse)}
html[dir='rtl'] .r4ixzlli{border-right:1px solid var(--inverse)}
html:not([dir='rtl']) .rbfikn5x{border-right:1px solid var(--inverse)}
html[dir='rtl'] .rbfikn5x{border-left:1px solid var(--inverse)}
.rhlnfygg{border-bottom:2px solid rgba(var(--shadow-rgb),.01)}
.rj102gmn{border-top:1px solid rgba(var(--white-rgb),.15)}
html:not([dir='rtl']) .rkx1utm6{border-left:1px solid white}
html[dir='rtl'] .rkx1utm6{border-right:1px solid white}
.rom324v9{border-top:1px solid var(--icon-disabled)}
.s2jbbbom{border-bottom:4px solid var(--wallpaper-thumb-border-hover)}
html:not([dir='rtl']) .s6gr8jre{border-right:4px solid var(--wallpaper-thumb-border-hover)}
html[dir='rtl'] .s6gr8jre{border-left:4px solid var(--wallpaper-thumb-border-hover)}
.se50n2qd{border-bottom:2px solid #fff}
.sh1gyqlg{border-bottom:2px solid var(--background-default-active)}
html:not([dir='rtl']) .sngpozrj{border-right:2px solid var(--icon-disabled)}
html[dir='rtl'] .sngpozrj{border-left:2px solid var(--icon-disabled)}
.swyb62mu{border-top:1px solid var(--border-list)}
.te2w76pw{border-top:2px solid var(--background-default)}
.tf4adjai{border-bottom:1px solid var(--gray-200)}
html:not([dir='rtl']) .tfeq9cll{border-right:4px solid var(--wallpaper-thumb-border-active)}
html[dir='rtl'] .tfeq9cll{border-left:4px solid var(--wallpaper-thumb-border-active)}
.thn59n0e{border-bottom:none}
html:not([dir='rtl']) .tntx47yo{border-left:1px solid var(--border-strong)}
html[dir='rtl'] .tntx47yo{border-right:1px solid var(--border-strong)}
.tpkuw0xv{border-top:4px solid var(--blue-light)}
html:not([dir='rtl']) .tqxyxngt{border-left:1px solid var(--sticker-button-background)}
html[dir='rtl'] .tqxyxngt{border-right:1px solid var(--sticker-button-background)}
html:not([dir='rtl']) .aaf8t3t8{border-right-color:#8696A0}
html[dir='rtl'] .aaf8t3t8{border-left-color:#8696A0}
html:not([dir='rtl']) .afj3pimr{border-right-width:8px}
html[dir='rtl'] .afj3pimr{border-left-width:8px}
html:not([dir='rtl']) .al6evcnd{border-right-color:var(--poll-checkbox-default-border-color-sender)}
html[dir='rtl'] .al6evcnd{border-left-color:var(--poll-checkbox-default-border-color-sender)}
html:not([dir='rtl']) .ayqm650w{border-right-color:var(--thumb-border-active)}
html[dir='rtl'] .ayqm650w{border-left-color:var(--thumb-border-active)}
.azxge7i2{border-top-color:var(--poll-bar-fill-receiver)}
html:not([dir='rtl']) .b70p9lzv{border-left-color:var(--poll-checkmark-sender)}
html[dir='rtl'] .b70p9lzv{border-right-color:var(--poll-checkmark-sender)}
html:not([dir='rtl']) .bau1qttc{border-right-color:transparent}
html[dir='rtl'] .bau1qttc{border-left-color:transparent}
html:not([dir='rtl']) .bbryylkj{border-right-color:var(--chat-marker-border)}
html[dir='rtl'] .bbryylkj{border-left-color:var(--chat-marker-border)}
html:not([dir='rtl']) .boshimb4{border-right-color:var(--compose-input-border)}
html[dir='rtl'] .boshimb4{border-left-color:var(--compose-input-border)}
html:not([dir='rtl']) .br6oik82{border-left-color:var(--checkbox-background)}
html[dir='rtl'] .br6oik82{border-right-color:var(--checkbox-background)}
.brlum6w4{border-bottom-color:var(--poll-bar-fill-sender)}
.bw1ke36e{border-top-color:var(--poll-invalid-warning-border-receiver)}
.c30xqvpq{border-top-width:8px}
html:not([dir='rtl']) .cayimkie{border-left-color:var(--chat-marker-border)}
html[dir='rtl'] .cayimkie{border-right-color:var(--chat-marker-border)}
.cb1qetwp{border-top-color:var(--poll-checkbox-default-border-color-sender)}
html:not([dir='rtl']) .cb68oqb6{border-right-color:var(--button-reject-background-hover)}
html[dir='rtl'] .cb68oqb6{border-left-color:var(--button-reject-background-hover)}
html:not([dir='rtl']) .ccjuay6o{border-left-color:var(--poll-checkbox-default-border-color-sender)}
html[dir='rtl'] .ccjuay6o{border-right-color:var(--poll-checkbox-default-border-color-sender)}
html:not([dir='rtl']) .cfczyq4y{border-right-color:var(--button-background-disabled)}
html[dir='rtl'] .cfczyq4y{border-left-color:var(--button-background-disabled)}
.cmcp1to6{border-bottom-style:solid}
html:not([dir='rtl']) .cot8q50n{border-right-color:var(--poll-invalid-warning-border-receiver)}
html[dir='rtl'] .cot8q50n{border-left-color:var(--poll-invalid-warning-border-receiver)}
html:not([dir='rtl']) .czqm0sgq{border-left-color:var(--poll-disabled-checked-checkbox-receiver)}
html[dir='rtl'] .czqm0sgq{border-right-color:var(--poll-disabled-checked-checkbox-receiver)}
.d1poss59{border-top-style:solid}
.defngil2{border-top-color:var(--poll-disabled-checked-checkbox-receiver)}
.dqiebsww{border-bottom-color:var(--poll-disabled-checked-checkbox-sender)}
html:not([dir='rtl']) .e6y86myk{border-left-width:8px}
html[dir='rtl'] .e6y86myk{border-right-width:8px}
html:not([dir='rtl']) .e932eind{border-left-color:transparent}
html[dir='rtl'] .e932eind{border-right-color:transparent}
html:not([dir='rtl']) .eg0col54{border-left-style:solid}
html[dir='rtl'] .eg0col54{border-right-style:solid}
html:not([dir='rtl']) .ejw0wqpm{border-left-color:var(--button-approve-background-hover)}
html[dir='rtl'] .ejw0wqpm{border-right-color:var(--button-approve-background-hover)}
html:not([dir='rtl']) .emi0afa8{border-right-color:var(--poll-invalid-warning-border-sender)}
html[dir='rtl'] .emi0afa8{border-left-color:var(--poll-invalid-warning-border-sender)}
.erpi6agv{border-bottom-color:var(--button-reject-background-hover)}
html:not([dir='rtl']) .ffk547it{border-right-color:var(--archived-chat-marker-border)}
html[dir='rtl'] .ffk547it{border-left-color:var(--archived-chat-marker-border)}
.fkk8pyer{border-bottom-color:var(--button-background-disabled)}
.fl2x09zf{border-top-width:0}
html:not([dir='rtl']) .g4qqiwrf{border-left-color:var(--archived-chat-marker-border)}
html[dir='rtl'] .g4qqiwrf{border-right-color:var(--archived-chat-marker-border)}
html:not([dir='rtl']) .g6apb8n0{border-left-color:var(--button-background-disabled)}
html[dir='rtl'] .g6apb8n0{border-right-color:var(--button-background-disabled)}
.gd2nkthe{border-top-color:var(--archived-chat-marker-border)}
.gik13rpp{border-top-color:var(--poll-bar-fill-sender)}
.gofg5ll1{border-top-width:1px}
html:not([dir='rtl']) .gwvgr1ja{border-right-width:.5px}
html[dir='rtl'] .gwvgr1ja{border-left-width:.5px}
html:not([dir='rtl']) .gyj32ejw{border-right-style:solid}
html[dir='rtl'] .gyj32ejw{border-left-style:solid}
.h27iupyh{border-bottom-color:transparent}
.hdjlbwd0{border-bottom-width:8px}
.i2ep37lh{border-top-color:var(--poll-checkmark-receiver)}
html:not([dir='rtl']) .i7b7jz71{border-left-color:var(--poll-checkmark-receiver)}
html[dir='rtl'] .i7b7jz71{border-right-color:var(--poll-checkmark-receiver)}
.icn0nyel{border-top-color:var(--poll-disabled-checked-checkbox-sender)}
html:not([dir='rtl']) .iv7mupbu{border-right-color:var(--poll-disabled-checked-checkbox-sender)}
html[dir='rtl'] .iv7mupbu{border-left-color:var(--poll-disabled-checked-checkbox-sender)}
.j8n3wzpc{border-bottom-color:var(--poll-invalid-warning-border-receiver)}
html:not([dir='rtl']) .jy0rc3ak{border-left-color:var(--compose-input-border)}
html[dir='rtl'] .jy0rc3ak{border-right-color:var(--compose-input-border)}
html:not([dir='rtl']) .k5fusljf{border-left-color:var(--button-reject-background-hover)}
html[dir='rtl'] .k5fusljf{border-right-color:var(--button-reject-background-hover)}
.kj4uqrhe{border-top-color:var(--button-approve-background)}
.ky8osgiz{border-top-color:transparent}
.l1hsp2et{border-bottom-color:var(--button-reject-background)}
.l2vfukj0{border-bottom-color:var(--poll-bar-fill-receiver)}
html:not([dir='rtl']) .ldwklxfk{border-left-width:.5px}
html[dir='rtl'] .ldwklxfk{border-right-width:.5px}
html:not([dir='rtl']) .lq03rdsz{border-left-color:var(--poll-invalid-warning-border-sender)}
html[dir='rtl'] .lq03rdsz{border-right-color:var(--poll-invalid-warning-border-sender)}
html:not([dir='rtl']) .lr2nq6lc{border-left-width:0}
html[dir='rtl'] .lr2nq6lc{border-right-width:0}
.ltplle4q{border-bottom-color:var(--poll-disabled-checked-checkbox-receiver)}
.lw07f11l{border-bottom-color:var(--compose-input-border)}
.lzkf35j0{border-bottom-color:var(--poll-checkbox-default-border-color-sender)}
.m2dig2b3{border-bottom-color:var(--button-approve-background-hover)}
html:not([dir='rtl']) .mftvbulq{border-right-color:var(--poll-checkmark-sender)}
html[dir='rtl'] .mftvbulq{border-left-color:var(--poll-checkmark-sender)}
html:not([dir='rtl']) .mzoqfcbu{border-left-width:1px}
html[dir='rtl'] .mzoqfcbu{border-right-width:1px}
.nncek28p{border-bottom-color:var(--checkbox-background)}
.nnij903c{border-bottom-width:0}
.o163osd1{border-top-color:var(--button-background-disabled)}
html:not([dir='rtl']) .o6lgiwdn{border-left-color:var(--poll-bar-fill-sender)}
html[dir='rtl'] .o6lgiwdn{border-right-color:var(--poll-bar-fill-sender)}
.oc1v1hjw{border-top-color:var(--poll-checkmark-sender)}
html:not([dir='rtl']) .oegm8fv3{border-right-color:var(--button-approve-background)}
html[dir='rtl'] .oegm8fv3{border-left-color:var(--button-approve-background)}
.oteuebma{border-bottom-width:1px}
.ov3ofjdl{border-top-color:var(--button-reject-background)}
.oyhj0yr2{border-top-color:var(--chat-marker-border)}
html:not([dir='rtl']) .p7waza29{border-right-width:1px}
html[dir='rtl'] .p7waza29{border-left-width:1px}
html:not([dir='rtl']) .psu04wdc{border-left-color:var(--button-approve-background)}
html[dir='rtl'] .psu04wdc{border-right-color:var(--button-approve-background)}
.pv3vtuii{border-top-color:var(--button-approve-background-hover)}
.pvtpfg0c{border-bottom-color:var(--poll-checkmark-receiver)}
html:not([dir='rtl']) .pwi4tpqv{border-left-color:var(--poll-bar-fill-receiver)}
html[dir='rtl'] .pwi4tpqv{border-right-color:var(--poll-bar-fill-receiver)}
.pxy3fndx{border-top-color:var(--poll-invalid-warning-border-sender)}
html:not([dir='rtl']) .q0aiiolu{border-right-color:var(--button-reject-background)}
html[dir='rtl'] .q0aiiolu{border-left-color:var(--button-reject-background)}
html:not([dir='rtl']) .q645k7dr{border-right-color:var(--poll-disabled-checked-checkbox-receiver)}
html[dir='rtl'] .q645k7dr{border-left-color:var(--poll-disabled-checked-checkbox-receiver)}
html:not([dir='rtl']) .q8kvkxy1{border-left-color:var(--thumb-border-active)}
html[dir='rtl'] .q8kvkxy1{border-right-color:var(--thumb-border-active)}
.qbtchylx{border-top-color:var(--button-reject-background-hover)}
.qei0rtf7{border-top-color:var(--checkbox-background)}
html:not([dir='rtl']) .quedrkhz{border-right-color:var(--poll-bar-fill-sender)}
html[dir='rtl'] .quedrkhz{border-left-color:var(--poll-bar-fill-sender)}
html:not([dir='rtl']) .r2wk4q3o{border-right-width:0}
html[dir='rtl'] .r2wk4q3o{border-left-width:0}
html:not([dir='rtl']) .rey418v5{border-right-color:var(--poll-bar-fill-receiver)}
html[dir='rtl'] .rey418v5{border-left-color:var(--poll-bar-fill-receiver)}
html:not([dir='rtl']) .rgg6xpk2{border-left-color:var(--poll-invalid-warning-border-receiver)}
html[dir='rtl'] .rgg6xpk2{border-right-color:var(--poll-invalid-warning-border-receiver)}
.rgw1ykpw{border-bottom-color:var(--poll-checkmark-sender)}
.rlosfh74{border-bottom-color:#8696A0}
.ronchshs{border-bottom-color:var(--poll-invalid-warning-border-sender)}
.rqga0wu5{border-top-color:var(--thumb-border-active)}
.rr3sdg1y{border-top-color:#8696A0}
.rsltai19{border-top-color:var(--compose-input-border)}
html:not([dir='rtl']) .s3iv1jvf{border-left-color:var(--button-reject-background)}
html[dir='rtl'] .s3iv1jvf{border-right-color:var(--button-reject-background)}
html:not([dir='rtl']) .s6krxjcp{border-left-color:#8696A0}
html[dir='rtl'] .s6krxjcp{border-right-color:#8696A0}
html:not([dir='rtl']) .s9q6xkrg{border-right-color:var(--poll-checkmark-receiver)}
html[dir='rtl'] .s9q6xkrg{border-left-color:var(--poll-checkmark-receiver)}
.s9qlqkcs{border-bottom-color:var(--archived-chat-marker-border)}
.sb46ev41{border-bottom-color:var(--thumb-border-active)}
.svaoiiyi{border-bottom-color:var(--button-approve-background)}
html:not([dir='rtl']) .t5v5bxpj{border-right-color:var(--button-approve-background-hover)}
html[dir='rtl'] .t5v5bxpj{border-left-color:var(--button-approve-background-hover)}
html:not([dir='rtl']) .toeh7gh7{border-right-color:var(--checkbox-background)}
html[dir='rtl'] .toeh7gh7{border-left-color:var(--checkbox-background)}
.tus15p9f{border-bottom-color:var(--chat-marker-border)}
html:not([dir='rtl']) .uqagbp64{border-left-color:var(--poll-disabled-checked-checkbox-sender)}
html[dir='rtl'] .uqagbp64{border-right-color:var(--poll-disabled-checked-checkbox-sender)}
html:not([dir='rtl']) .a0vc5f8u{border-bottom-left-radius:0}
html[dir='rtl'] .a0vc5f8u{border-bottom-right-radius:0}
.a15vwmim{padding-bottom:1px}
.a21kwdn3{animation-fill-mode:forwards}
.a27i2aag{box-shadow:none}
.a2hqsskl{width:28px}
.a2zl6d5m{height:212px}
.a3i62pwv{animation-name:dnba9ujq-B}
html:not([dir='rtl']) .a3oefunm{margin-left:10px}
html[dir='rtl'] .a3oefunm{margin-right:10px}
html:not([dir='rtl']) .a4bg1r4i{border-bottom-right-radius:100%}
html[dir='rtl'] .a4bg1r4i{border-bottom-left-radius:100%}
.a4bywxmn{padding-top:24px}
.a4rz4n5c{margin-top:14px}
html:not([dir='rtl']) .a4wbe7um{padding-left:2px!important}
html[dir='rtl'] .a4wbe7um{padding-right:2px!important}
.a4ywakfo{line-height:1.5}
html:not([dir='rtl']) .a57u14ck{border-top-right-radius:100%}
html[dir='rtl'] .a57u14ck{border-top-left-radius:100%}
.a5fn8qve{background-color:var(--system-message-background)}
html:not([dir='rtl']) .a5i9q28d{padding-right:22px}
html[dir='rtl'] .a5i9q28d{padding-left:22px}
.a5sdhmvz{--T68779821:0 2px 3px var(--shadow-light);box-shadow:0 2px 3px var(--shadow-light)}
.a5uym4to{stroke:var(--spinner-default)}
.a633jkfz{color:var(--panel-primary)}
html:not([dir='rtl']) .a6gmrtb7{margin-left:25px}
html[dir='rtl'] .a6gmrtb7{margin-right:25px}
.a6lcuizr{flex-grow:5}
.a6r0u4sv{color:rgba(var(--primary-strong-rgb),.35)}
.a70a3vn1{top:14px}
.a71rq12o{padding-top:18px}
.a906e4bh{animation-duration:.25s}
.a95fzlb5{--T68779821:0 0 32px rgba(var(--background-default-rgb),.95);box-shadow:0 0 32px rgba(var(--background-default-rgb),.95)}
.a95u9rhs{color:var(--ptt-draft-button-play-pause)}
html:not([dir='rtl']) .a9yjteo0{border-top-left-radius:25px}
html[dir='rtl'] .a9yjteo0{border-top-right-radius:25px}
.aa0kojfi{padding-bottom:3px}
.aatvsaw8{font-family:'Droid Serif',serif}
.abnmhpvo{filter:drop-shadow(0 0 1px rgba(0,0,0,.4))}
.abox56pv{text-shadow:0 1px 2px rgba(var(--shadow-rgb),.3)}
html:not([dir='rtl']) .abxuf49s{padding-right:6px}
html[dir='rtl'] .abxuf49s{padding-left:6px}
.ac2vgrno{justify-content:center}
.ackpuwnh{right:4px}
html:not([dir='rtl']) .acy0weht{margin-left:var(--quote-left-margin)}
html[dir='rtl'] .acy0weht{margin-right:var(--quote-left-margin)}
.ad0o4787{stroke:var(--white)}
.aejjokna{box-shadow:0 0 6px rgba(0,0,0,.2)}
html:not([dir='rtl']) .aemtu0ky{border-bottom-left-radius:12px}
html[dir='rtl'] .aemtu0ky{border-bottom-right-radius:12px}
.af9wj70c{padding-top:40px}
html:not([dir='rtl']) .afb5cxhb{border-bottom-right-radius:9999px}
html[dir='rtl'] .afb5cxhb{border-bottom-left-radius:9999px}
.afo7vhit{color:rgba(var(--inverse-rgb),.32)}
.aft2yglh{color:var(--svg-secondary-color,var(--secondary))}
html:not([dir='rtl']) .afwve8vw{padding-right:29px}
html[dir='rtl'] .afwve8vw{padding-left:29px}
.ag5g9lrv{overflow-y:auto}
.ag95hn57{white-space:pre}
.agi2at81{top:4px}
.agjvi7sf{top:15%}
.aik2f73q{height:120px}
.aiput80m{padding-bottom:10px}
.aiwu9bi8{opacity:.38}
.ajgik1ph{color:var(--icon-ack)}
.ajgl1lbb{cursor:pointer}
html:not([dir='rtl']) .ajyz1gl2{border-top-left-radius:14px}
html[dir='rtl'] .ajyz1gl2{border-top-right-radius:14px}
.akk8kuog{min-width:22px}
html:not([dir='rtl']) .akljc1zx{margin-left:1px}
html[dir='rtl'] .akljc1zx{margin-right:1px}
.aliwjmjd{margin-top:-8px}
.amaavye1{background-color:var(--background-default-hover)}
.amac7m9s{line-height:20}
.amd08ebk{box-shadow:0 1px 2px rgba(0,0,0,.09)}
.amgz1mtg{color:var(--label-secondary-text)}
.an6tjemt{z-index:var(--layer-4)}
html:not([dir='rtl']) .anwdwcjt{right:9px}
html[dir='rtl'] .anwdwcjt{left:9px}
html:not([dir='rtl']) .ao0w5p1o{border-bottom-left-radius:32px}
html[dir='rtl'] .ao0w5p1o{border-bottom-right-radius:32px}
.aoclmdzt{color:rgba(var(--primary-strong-rgb),.4)}
.aoi073rw{-webkit-box-orient:vertical}
html:not([dir='rtl']) .aokg6g0y{border-top-right-radius:var(--radius-bubble)}
html[dir='rtl'] .aokg6g0y{border-top-left-radius:var(--radius-bubble)}
html:not([dir='rtl']) .aoogvgrq{border-bottom-right-radius:50%}
html[dir='rtl'] .aoogvgrq{border-bottom-left-radius:50%}
html:not([dir='rtl']) .ap18qm3b{border-top-left-radius:1.1em}
html[dir='rtl'] .ap18qm3b{border-top-right-radius:1.1em}
html:not([dir='rtl']) .ap6veyk2{border-top-right-radius:5px}
html[dir='rtl'] .ap6veyk2{border-top-left-radius:5px}
.aprpv14t{text-transform:capitalize}
.aquyuamc{background-color:var(--teal)}
.ar4jf3c7{width:120px}
.ariinwu3{transition-property:background-color}
.assy5li8{padding-bottom:25px}
html:not([dir='rtl']) .atp9n7ve{padding-right:7px}
html[dir='rtl'] .atp9n7ve{padding-left:7px}
.atxxqlz9{z-index:1002}
.au4fhpva{display:inherit}
html:not([dir='rtl']) .aumms1qt{border-bottom-left-radius:1.1em}
html[dir='rtl'] .aumms1qt{border-bottom-right-radius:1.1em}
html:not([dir='rtl']) .aumn88wd{margin-right:17px}
html[dir='rtl'] .aumn88wd{margin-left:17px}
html:not([dir='rtl']) .aurtnaek{border-top-right-radius:calc(var(--radius-app) - 1px)}
html[dir='rtl'] .aurtnaek{border-top-left-radius:calc(var(--radius-app) - 1px)}
.aus7m8kn{padding-bottom:32%}
.auwbiavf{min-height:var(--quoted-compose-height-full)}
html:not([dir='rtl']) .avk8rzj1{margin-left:-30px}
html[dir='rtl'] .avk8rzj1{margin-right:-30px}
.axi1ht8l{opacity:0}
.ayenx209{box-shadow:none!important}
.ayh9k7s5{bottom:38px}
html:not([dir='rtl']) .aznl1635{border-bottom-right-radius:14px}
html[dir='rtl'] .aznl1635{border-bottom-left-radius:14px}
html:not([dir='rtl']) .b021xdil{margin-right:var(--chat-spacing)}
html[dir='rtl'] .b021xdil{margin-left:var(--chat-spacing)}
.b0ssv71y{color:var(--panel-header-background)}
.b19fvycv{background-color:var(--modal-background)}
.b1iopwm6{font-family:Apple Color Emoji,-apple-system,Noto-Emoji,sans-serif}
.b1lctrli{height:var(--sticker-size-panel)}
.b1qcobdr{width:calc(100% - 40px)}
.b1w2sqt8{max-width:350px}
@keyframes b2uml6y0-B{html:not([dir='rtl']) 0%{border-top-left-radius:50%;border-top-right-radius:50%;border-bottom-right-radius:50%;border-bottom-left-radius:50%;animation-timing-function:linear;}25%{border-top-left-radius:50%;border-top-right-radius:50%;border-bottom-right-radius:50%;border-bottom-left-radius:50%;}28%{border-top-left-radius:45%;border-top-right-radius:45%;border-bottom-right-radius:45%;border-bottom-left-radius:45%;}34%{border-top-left-radius:43%;border-top-right-radius:43%;border-bottom-right-radius:43%;border-bottom-left-radius:43%;}43%{border-top-left-radius:26px;border-top-right-radius:26px;border-bottom-right-radius:26px;border-bottom-left-radius:26px;}62%{border-top-left-radius:28px;border-top-right-radius:28px;border-bottom-right-radius:28px;border-bottom-left-radius:28px;}100%{border-top-left-radius:30px;border-top-right-radius:30px;border-bottom-right-radius:30px;border-bottom-left-radius:30px;}}
@keyframes b2uml6y0-B{html[dir='rtl'] 0%{border-top-right-radius:50%;border-top-left-radius:50%;border-bottom-left-radius:50%;border-bottom-right-radius:50%;animation-timing-function:linear;}25%{border-top-right-radius:50%;border-top-left-radius:50%;border-bottom-left-radius:50%;border-bottom-right-radius:50%;}28%{border-top-right-radius:45%;border-top-left-radius:45%;border-bottom-left-radius:45%;border-bottom-right-radius:45%;}34%{border-top-right-radius:43%;border-top-left-radius:43%;border-bottom-left-radius:43%;border-bottom-right-radius:43%;}43%{border-top-right-radius:26px;border-top-left-radius:26px;border-bottom-left-radius:26px;border-bottom-right-radius:26px;}62%{border-top-right-radius:28px;border-top-left-radius:28px;border-bottom-left-radius:28px;border-bottom-right-radius:28px;}100%{border-top-right-radius:30px;border-top-left-radius:30px;border-bottom-left-radius:30px;border-bottom-right-radius:30px;}}
.b3di99y3{filter:none}
html:not([dir='rtl']) .b4u6kxhc{right:6px}
html[dir='rtl'] .b4u6kxhc{left:6px}
.b6f1x6w7{word-wrap:break-word}
@keyframes b6khuor9-B{0%{transform:scale3d(0,0,0);}100%{transform:scale3d(1,1,1);}}
.b6qzmhfs{width:50px}
.b6vz4lkg{width:93px}
.b73q89nx{animation-name:bz1wtss1-B}
html:not([dir='rtl']) .b7dpvuw3{padding-right:var(--padding-drawer-side)}
html[dir='rtl'] .b7dpvuw3{padding-left:var(--padding-drawer-side)}
.b7n2qyd4{padding-top:12px}
.b82nm36r{height:65px}
.b8cdf3jl{padding-top:28px}
.b8z6cu80{width:31%}
.b97gdkd1{padding-top:19.5px}
.b9fczbqn{z-index:2}
.b9l0eqez{margin-top:1px}
.ba1bgrqy{max-width:417px}
.ba95y10t{top:19px}
.baeo9xnf{width:36px}
.baku5n5n{color:var(--button-disabled)}
.bar07sny{min-width:var(--thumb-width)}
.bavixdlz{padding-bottom:13px}
.bay3hw0d{padding-top:27px}
.bbl9m3t3{height:0}
.bbp2hc0k{width:4px}
html:not([dir='rtl']) .bbr44loe{border-top-left-radius:8px}
html[dir='rtl'] .bbr44loe{border-top-right-radius:8px}
html:not([dir='rtl']) .bbs9k8l5{border-bottom-left-radius:18px}
html[dir='rtl'] .bbs9k8l5{border-bottom-right-radius:18px}
.bbv8nyr4{white-space:pre-wrap}
.bc38n4nm{color:var(--cart-interstitial-icon)}
html:not([dir='rtl']) .bcfko8ch{margin-right:32px}
html[dir='rtl'] .bcfko8ch{margin-left:32px}
.bck672cy{height:38px!important}
.bcr6az0x{font-weight:300}
html:not([dir='rtl']) .bcymb0na{padding-right:30px}
html[dir='rtl'] .bcymb0na{padding-left:30px}
.bd96tnyg{image-rendering:-webkit-optimize-contrast!important}
html:not([dir='rtl']) .bdbt56hn{padding-left:4px}
html[dir='rtl'] .bdbt56hn{padding-right:4px}
.bddvio20{margin-top:25px}
.bdf91cm1{line-height:1.3em}
.bej5yntv{animation-timing-function:easeOutCubic}
.bfbxj8tr{right:8px}
html:not([dir='rtl']) .bfic5nuo{margin-left:75px}
html[dir='rtl'] .bfic5nuo{margin-right:75px}
.bfsx6evv{background-color:rgba(var(--white-rgb),.08)}
.bfvdtf1u{animation-name:ge0l3a7l-B}
.bgf1b849{padding-top:100px}
.bgigc5s4{z-index:var(--layer-8)}
.bgtrvtbx{padding-bottom:var(--blur-radius-thumbnail)}
html:not([dir='rtl']) .bi2mdrpt{border-top-left-radius:0}
html[dir='rtl'] .bi2mdrpt{border-top-right-radius:0}
.bibl1e27{margin-bottom:28px}
html:not([dir='rtl']) .bj4p3wqc{border-bottom-left-radius:60px}
html[dir='rtl'] .bj4p3wqc{border-bottom-right-radius:60px}
.bjmq0orh{font-size:.90625rem}
.bk1nl7o2{flex-grow:4}
.bk9ojlrj{color:var(--avatar-circle-gray)}
.bkifpc9x{transition-timing-function:ease-out}
.bkoknyjm{max-width:calc(var(--width-msg-bubble-with-media) - 6px)}
.blj1rie1{bottom:4px}
.bmhhosgr{height:7px}
html:not([dir='rtl']) .bmj4fdax{padding-left:1.25em}
html[dir='rtl'] .bmj4fdax{padding-right:1.25em}
.bmot90v7{height:24px}
.bn05jr7j{cursor:zoom-in}
.bn27j4ou{background-color:var(--button-primary-background)}
.bn7x0pqn{margin-bottom:-5px}
.bntscc16{background-color:var(--outgoing-background)}
.bo8jc6qi{transition-property:transform}
html:not([dir='rtl']) .boajuire{border-top-left-radius:3px}
html[dir='rtl'] .boajuire{border-top-right-radius:3px}
.boenfpwf{width:90%}
.bot80yxp{color:var(--product-thumb-overlay-text)}
.bpanfbxe{width:104px}
.bq39o27w{background-color:rgba(var(--progress-primary-rgb),.6)}
.bqm4k289{max-height:98%}
.bqmxb3s7{top:16px}
html:not([dir='rtl']) .bqysl6j9{border-bottom-left-radius:4px}
html[dir='rtl'] .bqysl6j9{border-bottom-right-radius:4px}
.brac1wpa{margin-bottom:10px}
.brh521k9{opacity:.7}
.brqbuz94{height:49px}
.bs7a17vp{opacity:1}
.bsd0t79a{color:var(--ptt-draft-button-play-pause-out-of-chat)}
html:not([dir='rtl']) .bsg2wrd4{margin-right:-20px}
html[dir='rtl'] .bsg2wrd4{margin-left:-20px}
.bsih0in0{height:58px}
.bsvz8e3l{line-height:1.3333}
.btb1m7bk{display:grid}
.btzd6xh9{direction:ltr}
html:not([dir='rtl']) .btzf6ewn{padding-right:12px}
html[dir='rtl'] .btzf6ewn{padding-left:12px}
html:not([dir='rtl']) .bugiwsl0{margin-right:8px}
html[dir='rtl'] .bugiwsl0{margin-left:8px}
html:not([dir='rtl']) .bv1sdm6y{margin-left:20px}
html[dir='rtl'] .bv1sdm6y{margin-right:20px}
.bvcnfjzh{height:auto}
.bvgz89zs{stroke-linecap:round}
.bvhm1occ{margin-bottom:30px}
.bvyb7wbk{line-height:11px}
.bvz86wrv{min-width:49px}
.bw3xoias{color:rgba(var(--inverse-rgb),.85)}
.bwu3czq0{z-index:10002}
html:not([dir='rtl']) .bx0vhl82{margin-left:-2px}
html[dir='rtl'] .bx0vhl82{margin-right:-2px}
@keyframes bx6fce78-B{0%{opacity:0;transform:translateY(-50px);}30%{opacity:0;transform:translateY(-50px);}100%{opacity:1;transform:translateY(0);}}
.bx7g2weo{cursor:default}
.bxcbqipq{padding-bottom:5px}
.byg5ndfj{padding-top:32px}
.byvcucqk{min-width:40px}
@keyframes bz1wtss1-B{0%{top:9px;left:6px;width:0;height:0;}100%{top:-1px;left:4px;width:5px;height:10px;}}
.bz50z0yh{max-width:258px}
.bzb0giyb{top:100px}
.bze30y65{font-size:0.9375rem}
.c0uhu3dl{padding-bottom:.4em}
.c1gtxk6a{width:432px}
.c2jc77nu{white-space:initial}
.c32ccnay{display:-webkit-box}
.c3gfj3cx{background-color:var(--overlay)}
.c3m6791i{max-width:800px}
html:not([dir='rtl']) .c3x5l3r8{left:.5ch}
html[dir='rtl'] .c3x5l3r8{right:.5ch}
.c46o30wg{margin-top:20px}
.c4c7fvpi{max-height:calc(var(--line-height-quoted) * 2)}
.c4f797jd{line-height:13px}
.c59meja3{min-width:35px}
html:not([dir='rtl']) .c5wy1lv0{border-bottom-right-radius:4px}
html[dir='rtl'] .c5wy1lv0{border-bottom-left-radius:4px}
.c5zpj14d{bottom:100%}
.c6axuxzh{margin-top:11px}
.c6qoq7mr{max-width:400px}
.c8nijwnu{background-position-y:center}
.c97dh06e{width:3px}
.cats8p75{opacity:.55}
.cb8ormfa{text-align:right}
.cbjz30lg{max-width:330px}
.cbqxid7y{height:85%}
.cc4ue8kt{color:var(--icon-pinned)}
.cca4rwve{position:-webkit-sticky;position:sticky}
.cctpw5f5{height:500px}
html:not([dir='rtl']) .cdp1hot0{left:42px}
html[dir='rtl'] .cdp1hot0{right:42px}
.ce5kru2g{color:var(--reactions-bubble-counter)}
.ceoseaut{background-color:black}
.cf2oroyo{max-width:var(--width-video-portrait-bubble)}
.cfhfab5z{fill:currentColor}
.cfzgl7ar{min-width:.9em}
.cgbgrqfg{top:70px}
html:not([dir='rtl']) .cgpjrhzi{margin-right:6.5px}
html[dir='rtl'] .cgpjrhzi{margin-left:6.5px}
html:not([dir='rtl']) .cheugonp{left:10px}
html[dir='rtl'] .cheugonp{right:10px}
html:not([dir='rtl']) .chuyt2sy{padding-left:11px}
html[dir='rtl'] .chuyt2sy{padding-right:11px}
html:not([dir='rtl']) .chvde1w8{padding-right:108px}
html[dir='rtl'] .chvde1w8{padding-left:108px}
.cihm0v32{padding-top:72px}
html:not([dir='rtl']) .citmgm7b{right:10px}
html[dir='rtl'] .citmgm7b{left:10px}
.ckm995li{padding-bottom:4px}
.ckq3dtew{max-width:920px}
.cl7oiv0o{min-height:44px}
html:not([dir='rtl']) .claouzo6{margin-right:6px}
html[dir='rtl'] .claouzo6{margin-left:6px}
html:not([dir='rtl']) .clw8hvz5{padding-right:calc(50% - 250px)}
html[dir='rtl'] .clw8hvz5{padding-left:calc(50% - 250px)}
.cm280p3y{box-sizing:border-box}
.cn2ptbqf{background-color:var(--wallpaper-background)}
html:not([dir='rtl']) .cnpay6qi{border-bottom-left-radius:3px}
html[dir='rtl'] .cnpay6qi{border-bottom-right-radius:3px}
.cnprk2g9{width:112px}
.cnuwac07{white-space:inherit}
.cogk65jn{bottom:-12px}
.cosm3z4q{width:var(--compose-box-open-menu-width-status-reply)}
.cpfmwfku{transition-property:background-color,border-color}
html:not([dir='rtl']) .cphhpnv8{border-bottom-right-radius:var(--radius-app)}
html[dir='rtl'] .cphhpnv8{border-bottom-left-radius:var(--radius-app)}
.cpkabmy0{color:var(--pnh-nux)}
.cpwx3oa4{line-height:1.2727}
.cq4aadlz{font-size:0.5625rem}
.cqiun4t2{font-size:1.125rem}
html:not([dir='rtl']) .cqsf3vkf{border-bottom-left-radius:var(--radius-thumb)}
html[dir='rtl'] .cqsf3vkf{border-bottom-right-radius:var(--radius-thumb)}
.cqvkqxai{background-color:var(--toast-background)}
.cr2cog7z{line-height:15px}
.cr6d9hz6{transition-property:opacity}
.crlpoz9d{width:calc(100% - 80px)}
.crm5a8gb{color:var(--button-primary-background)}
.cs9t9or5{color:var(--icon-fixed)}
.csxx893n{margin-top:26px}
html:not([dir='rtl']) .csyx12jj{border-bottom-right-radius:12px}
html[dir='rtl'] .csyx12jj{border-bottom-left-radius:12px}
.ctdnaqea{font-size:1.375rem}
@keyframes ctfi49jn-B{0%{color:var(--white);}100%{background-color:rgba(var(--white-rgb),1.0);color:var(--black);}}
.ctv2fiom{padding-bottom:72px}
.cu1tgave{max-width:calc(var(--width-album-grid-bubble) - var(--width-album-extra-padding))}
.culzvsue{max-width:500px}
.cumqsjf0{background-color:var(--drawer-gallery-background)}
.cv1ohgtz{z-index:var(--layer-10)}
.cvsrm5e1{bottom:5px}
html:not([dir='rtl']) .cw0ivh8j{border-bottom-left-radius:8px}
html[dir='rtl'] .cw0ivh8j{border-bottom-right-radius:8px}
.cw3vfol9{word-break:break-word}
html:not([dir='rtl']) .cw6dh6i2{left:auto}
html[dir='rtl'] .cw6dh6i2{right:auto}
.cwh5h8h7{margin-bottom:90px}
@keyframes cwns2890-B{0%{opacity:1;}100%{opacity:0;}}
.cwwc04gk{color:var(--icon-strong)}
.cxec7x23{width:1px}
html:not([dir='rtl']) .cxgkfk16{border-bottom-right-radius:var(--radius-compose)}
html[dir='rtl'] .cxgkfk16{border-bottom-left-radius:var(--radius-compose)}
.cxkis295{width:25px}
.cy13c0w7{top:-10px}
.cyi0n1nm{color:var(--media-gallery-thumb-icon)}
html:not([dir='rtl']) .cynldqnp{border-top-left-radius:calc(var(--radius-app) + 1px)}
html[dir='rtl'] .cynldqnp{border-top-right-radius:calc(var(--radius-app) + 1px)}
.d0st09ow{width:29%}
.d10gensu{max-height:182px}
.d1gmyy70{--T68779821:0 1px 3px rgba(var(--shadow-rgb),.16);box-shadow:0 1px 3px rgba(var(--shadow-rgb),.16)}
html:not([dir='rtl']) .d1nvxjvo{--T68779821:inset -10px 10px 25px rgba(var(--shadow-rgb),.25);box-shadow:inset -10px 10px 25px rgba(var(--shadow-rgb),.25)}
html[dir='rtl'] .d1nvxjvo{--T68779821:inset 10px 10px 25px rgba(var(--shadow-rgb),.25);box-shadow:inset 10px 10px 25px rgba(var(--shadow-rgb),.25)}
.d1pdhp1p{height:calc(var(--compose-box-menu-height) - 2 * var(--compose-box-top-bottom-padding))}
.d30du0rx{text-transform:none}
.d30yvege{animation-name:he6jpvhu-B}
.d3pjxk2u{content:""}
.d4q9loza{background-image:linear-gradient(to bottom,rgba(var(--shadow-rgb),0) 0,rgba(var(--shadow-rgb),.002) 1.8%,rgba(var(--shadow-rgb),.006) 4.8%,rgba(var(--shadow-rgb),.016) 9%,rgba(var(--shadow-rgb),.032) 13.9%,rgba(var(--shadow-rgb),.057) 19.8%,rgba(var(--shadow-rgb),.097) 27%,rgba(var(--shadow-rgb),.149) 35%,rgba(var(--shadow-rgb),.213) 43.5%,rgba(var(--shadow-rgb),.294) 53%,rgba(var(--shadow-rgb),.416) 66%,rgba(var(--shadow-rgb),.568) 81%,rgba(var(--shadow-rgb),.769) 100%)}
html:not([dir='rtl']) .d4vkij7k{right:30px}
html[dir='rtl'] .d4vkij7k{left:30px}
.d53dy967{letter-spacing:1px}
.d53pemmv{line-height:24}
.d5zlj0ol{background-color:var(--media-editor-document-caption-input-background)}
.d6finlhe{will-change:opacity,transform}
html:not([dir='rtl']) .d6h2ibm4{border-top-right-radius:7px}
html[dir='rtl'] .d6h2ibm4{border-top-left-radius:7px}
.d6ll3xky{width:46px}
.d72ibw2u{background-color:var(--poll-modal-footer-background-color)}
.d7kr9pz8{width:102px}
.d7qcm159{animation-name:e4z3xolt-B}
.d8ddvuix{min-width:800px}
@keyframes d8h0nk90-B{100%{transform:translateX(-50%);}}
.d9lyu8cj{height:3px}
.db4qzak4{height:46px}
.dba1p600{stroke:var(--button-primary-background)}
.dblt22a0{margin-bottom:16px}
.dbs0ofhi{top:59px}
html:not([dir='rtl']) .dc5qina8{border-bottom-right-radius:20px}
html[dir='rtl'] .dc5qina8{border-bottom-left-radius:20px}
.dcnh1tix{background-size:20px}
.ddamih75{animation-name:hisddxiu-B}
.ddl5anf2{background-color:var(--product-thumb-background-deeper)}
html:not([dir='rtl']) .ddw6s8x9{padding-left:17px}
html[dir='rtl'] .ddw6s8x9{padding-right:17px}
.de33c33s{color:var(--payment-status-pending)}
.delct6vn{background-position:50% 50%}
.dfw30kuc{-webkit-clip-path:polygon(50% 0,0 0,0 100%,50% 100%,50% 50%);clip-path:polygon(50% 0,0 0,0 100%,50% 100%,50% 50%)}
.dh5rsm73{width:18px}
@keyframes dhlqzo2r-B{0%{transform:scale3d(1,1,1);}100%{transform:scale3d(0,0,0);}}
.dhq51u3o{height:26px}
.di8pw70h{padding-bottom:88px}
.diqd3znl{background-color:var(--checkbox-background)}
.dj1c3cmq{margin-top:8px}
.dj32rci9{width:5px}
.djhxrpsl{max-height:40px}
html:not([dir='rtl']) .dkaqw61n{left:-10px}
html[dir='rtl'] .dkaqw61n{right:-10px}
.dkeqio29{margin-top:22px}
.dknb6df3{max-width:20em}
.dktwgxt5{letter-spacing:-0.44px}
html:not([dir='rtl']) .dl2ettod{margin-left:32px}
html[dir='rtl'] .dl2ettod{margin-right:32px}
html:not([dir='rtl']) .dl6j7rsh{margin-right:-30px}
html[dir='rtl'] .dl6j7rsh{margin-left:-30px}
.dld5k21c{max-width:270px}
.dledyozo{padding-bottom:20.5px}
.dlt2z1m8{width:410px}
.dn3ua38v{margin-top:var(--h-pane-header)}
.dn50c4kw{animation-duration:2.7s}
.dn5wc90o{min-height:16px}
.dnb887gk{flex-wrap:nowrap}
@keyframes dnba9ujq-B{0%{transform:translateX(0);}100%{transform:translateX(171.5px);}}
.dng4fqht{height:76px}
html:not([dir='rtl']) .dntxsmpk{border-top-left-radius:2px}
html[dir='rtl'] .dntxsmpk{border-top-right-radius:2px}
.do8e0lj9{color:var(--bubble-meta-icon)}
.dobzgj6y{animation-name:p457vbfl-B}
.dpkuihx7{bottom:6px}
.dq3evca1{width:96px}
.dr6m1ylk{grid-template-columns:repeat(auto-fill,var(--sticker-size-store))}
html:not([dir='rtl']) .druapeav{right:32px}
html[dir='rtl'] .druapeav{left:32px}
.ds12m5yo{font-size:2.25rem}
html:not([dir='rtl']) .ds60debm{margin-right:15px}
html[dir='rtl'] .ds60debm{margin-left:15px}
.dsh4tgtl{font-size:0.75rem}
.dte9zi8s{background-color:orange}
html:not([dir='rtl']) .dtx25v1e{border-bottom-left-radius:5px}
html[dir='rtl'] .dtx25v1e{border-bottom-right-radius:5px}
.du8bjn1j{margin-bottom:20px}
.dud78hvd{color:yellow}
.dupc5dfw{font-size:1.75rem}
.durt31hz{line-height:1.2308}
.dv18d5t9{color:var(--forwarded-indicator-text)}
.dwekmf2r{background-color:var(--danger)}
.dwvzf427{margin-top:-2.5px}
.dxy1asz1{width:70px}
.dxz5bmu7{color:var(--avatar-placeholder-primary)}
.dyxdk6fi{width:48px}
.e0pgnxzj{height:85px}
.e1gr2w1z{font-weight:normal}
.e1lnay39{background-image:linear-gradient(to top,rgba(var(--overlay-rgb),.5),rgba(var(--overlay-rgb),0))}
.e1vllz7m{color:rgba(var(--link-rgb),.9)}
html:not([dir='rtl']) .e1yunedv{padding-left:9px}
html[dir='rtl'] .e1yunedv{padding-right:9px}
.e2xccmyv{margin-bottom:50px}
.e3b81npk{transition-property:box-shadow}
.e3miq1pi{margin-top:32px}
.e3u7tipa{order:2}
html:not([dir='rtl']) .e3yfz9gx{border-bottom-right-radius:0}
html[dir='rtl'] .e3yfz9gx{border-bottom-left-radius:0}
.e4a3aln8{width:33px}
.e4eao3g2{align-items:baseline}
html:not([dir='rtl']) .e4n4g5wb{float:left}
html[dir='rtl'] .e4n4g5wb{float:right}
.e4p1bexh{height:15px}
.e4qy2s3t{line-height:1.4286}
@keyframes e4z3xolt-B{100%{opacity:0;}}
.e5nnjop8{width:330px}
.e5sv7owa{height:335px}
html:not([dir='rtl']) .e65innqk{text-align:right}
html[dir='rtl'] .e65innqk{text-align:left}
html:not([dir='rtl']) .e6ckhcgy{--T68779821:0 1px 1px 0 rgba(var(--shadow-rgb),.06),0 2px 5px 0 rgba(var(--shadow-rgb),.2);box-shadow:0 1px 1px 0 rgba(var(--shadow-rgb),.06),0 2px 5px 0 rgba(var(--shadow-rgb),.2)}
html[dir='rtl'] .e6ckhcgy{--T68779821:0 1px 1px 0 rgba(var(--shadow-rgb),.06), 0 2px 5px 0 rgba(var(--shadow-rgb),.2);box-shadow:0 1px 1px 0 rgba(var(--shadow-rgb),.06), 0 2px 5px 0 rgba(var(--shadow-rgb),.2)}
html:not([dir='rtl']) .e6ezto3k{right:1px}
html[dir='rtl'] .e6ezto3k{left:1px}
@keyframes e6ri2msi-B{100%{transform:translateX(50%);}}
html:not([dir='rtl']) .e6tbvuqx{border-bottom-left-radius:7px}
html[dir='rtl'] .e6tbvuqx{border-bottom-right-radius:7px}
.e7al1772{color:var(--system-message-text)}
.e8h85j61{height:var(--h-pane-header)}
html:not([dir='rtl']) .e8k79tju{padding-left:30px}
html[dir='rtl'] .e8k79tju{padding-right:30px}
.e90a4zdp{max-height:50px}
.e9dx81qg{width:212px}
.e9w3sbd1{--T68779821:0 -5px 7px -5px rgba(var(--shadow-rgb),.05);box-shadow:0 -5px 7px -5px rgba(var(--shadow-rgb),.05)}
.e9zg6kuq{max-width:none}
html:not([dir='rtl']) .eab7llgz{margin-left:2%}
html[dir='rtl'] .eab7llgz{margin-right:2%}
@keyframes easeekon-B{0%{right:100%;left:-200%;}60%{right:-8%;left:107%;}100%{right:-8%;left:107%;}}
.eb4rp10x{padding-bottom:6px}
.eb9g83lr{animation-duration:.75s}
html:not([dir='rtl']) .ebjesfe0{right:0}
html[dir='rtl'] .ebjesfe0{left:0}
.ebu6xrgy{opacity:.6}
.ec1z5skj{margin-bottom:auto}
.ec3rya3v{transition-property:fill-opacity}
.ecrppv57{min-width:52px}
html:not([dir='rtl']) .ecxr5yey{border-bottom-right-radius:calc(var(--radius-app) + 1px)}
html[dir='rtl'] .ecxr5yey{border-bottom-left-radius:calc(var(--radius-app) + 1px)}
.ecxtzlut{background-color:rgba(var(--shadow-rgb),.3)}
.ed316hig{color:var(--chat-marker)}
.edisrohx{color:var(--cell-chat-title-color,var(--primary-strong))}
html:not([dir='rtl']) .edqan5gp{left:26px}
html[dir='rtl'] .edqan5gp{right:26px}
.ee0xuasv{width:calc(87% + 18px)}
.eej3x5sv{left:-10px}
.ef2byrub{animation-duration:.35s}
.efgp0a3n{animation-timing-function:cubic-bezier(.1,.82,.25,1)}
.efio351b{bottom:-23px}
.efq66a5g{font-size:3.75rem}
.eg0stril{top:calc((var(--compose-box-menu-height) - 2 * var(--compose-box-top-bottom-padding) - 24) * .5)}
.eg1do31x{font-family:'Norican'}
.eg3lofc5{margin-top:15px}
.egl74e4l{transition-property:opacity,height,transform,width}
.egv1zj2i{width:33%}
.ehl15zf9{animation-duration:.16s}
.ei5e7seu{min-height:1em}
@keyframes eirysc09-B{0%{stroke-dasharray:1,150;stroke-dashoffset:0;}100%{stroke-dasharray:90,150;stroke-dashoffset:-124;}50%{stroke-dasharray:90,150;stroke-dashoffset:-35;}}
.ej3x2ktq{background-color:var(--panel-background-deeper)}
.ej4zaygv{transition-property:opacity,height}
.ekddkhd8{color:#217CEF}
.ekdr8vow{width:26px}
.ekpn4oxx{padding-bottom:12px}
html:not([dir='rtl']) .ekvw3o37{padding-left:var(--bubble-padding)}
html[dir='rtl'] .ekvw3o37{padding-right:var(--bubble-padding)}
.eliz2k8b{transition-duration:.14s,.14s}
.elxb2u3l{align-items:stretch}
.em2tzsnp{max-height:72px}
.em5jvqoa{animation-timing-function:ease-out}
.emqjox7q{background-color:var(--panel-background-deep)}
.emrlamx0{padding-top:10px}
html:not([dir='rtl']) .emy6cf64{padding-left:100px}
html[dir='rtl'] .emy6cf64{padding-right:100px}
html:not([dir='rtl']) .en6yos0k{right:5px}
html[dir='rtl'] .en6yos0k{left:5px}
.en8d0ozt{margin-bottom:-34px}
.enbbiyaj{font-size:1rem}
.enheoddn{width:520px}
.epdck8xl{background-color:var(--photopicker-overlay-background)}
.epwkujcx{height:36px}
.eq83pvwj{color:var(--poll-button-disabled-sender)}
.eqlnm1ad{background-color:var(--gray-600)}
.eqo3w032{background-color:var(--modal-backdrop-solid)}
.ercejckq{z-index:1000}
.erpdyial{line-height:21px}
.eruf1vka{color:var(--gray-600)}
html:not([dir='rtl']) .es0dlo02{border-top-left-radius:var(--radius-compose)}
html[dir='rtl'] .es0dlo02{border-top-right-radius:var(--radius-compose)}
.esbfogcw{padding-top:7px}
.esbg2say{animation-timing-function:cubic-bezier(.45,0,.55,1),linear}
.etgvethi{margin-top:21.5px}
.eu4m05gk{opacity:.2}
.eujn52yf{padding-top:4px}
@keyframes ev8ckacf-B{100%{transform:rotate(360deg);}}
.evq4wxsl{background-color:var(--icon-high-emphasis)}
.evzurl1e{color:rgba(var(--green-deep-rgb),.7)}
.ew1qayco{vertical-align:-1px}
.ew8mgplc{display:inline}
.ex3gcxaf{align-self:flex-start}
html:not([dir='rtl']) .ex5nunm6{left:82px}
html[dir='rtl'] .ex5nunm6{right:82px}
.exvbdj68{will-change:transform}
.eynyaxvo{padding-bottom:50px}
.f09rd1o5{background-color:var(--ptt-ooc-background)}
.f0mh0h6e{max-height:200px}
.f1qlncqe{height:170px}
.f2o2jtpu{height:19.5px}
.f2yrvmhs{background-color:var(--empty-state-background)}
.f3a6saz0{height:var(--width-album-grid-bubble)}
.f3tryo6w{--T68779821:0 5px 3px -3px rgba(var(--shadow-rgb),.16);box-shadow:0 5px 3px -3px rgba(var(--shadow-rgb),.16)}
html:not([dir='rtl']) .f459d30t{margin-left:-20px}
html[dir='rtl'] .f459d30t{margin-right:-20px}
.f4pf1esu{height:2px}
.f4q7vbcz{max-width:336px}
.f4vvi1mq{width:258px}
html:not([dir='rtl']) .f4zm7zaq{border-top-left-radius:calc(var(--radius-app) - 1px)}
html[dir='rtl'] .f4zm7zaq{border-top-right-radius:calc(var(--radius-app) - 1px)}
.f6aumy9w{margin-bottom:-3px}
.f6cvynhn{background-color:var(--compose-input-background)}
.f6e355lk{background-color:var(--chevron-button-background)}
.f6essjlf{width:164px}
.f6ipylw5{background-color:var(--panel-header-background)}
.f6un2avg{right:-10px}
html:not([dir='rtl']) .f78eapp6{padding-left:15px}
html[dir='rtl'] .f78eapp6{padding-right:15px}
.f7v6by6u{bottom:12px}
.f7wxzknn{background-color:var(--sticker-button-background)}
.f804f6gw{display:block}
.f83pkj4x{padding-bottom:var(--width-album-extra-padding)}
html:not([dir='rtl']) .f881ul5n{padding-right:42px}
html[dir='rtl'] .f881ul5n{padding-left:42px}
html:not([dir='rtl']) .f88dsuqf{left:-999999px}
html[dir='rtl'] .f88dsuqf{right:-999999px}
.f8jlpxt4{font-size:0.875rem}
.f8m0rgwh{flex-direction:column}
.f8mos8ky{animation-timing-function:linear}
.f8xtxj1z{max-height:var(--preview-thumb-size)}
.f8zw8ovf{min-width:60px}
.f9dkde2y{--T68779821:inset 0 0 15px var(--shadow-light);box-shadow:inset 0 0 15px var(--shadow-light)}
html:not([dir='rtl']) .f9ovudaz{padding-right:0}
html[dir='rtl'] .f9ovudaz{padding-left:0}
html:not([dir='rtl']) .f9uipba7{right:4px}
html[dir='rtl'] .f9uipba7{left:4px}
html:not([dir='rtl']) .fahkg6u0{box-shadow:0 1px 0 rgba(0,0,0,.07),0 0 3px rgba(0,0,0,.04)}
html[dir='rtl'] .fahkg6u0{box-shadow:0 1px 0 rgba(0,0,0,.07), 0 0 3px rgba(0,0,0,.04)}
.faxx4fbg{float:right}
.fbgy3m38{padding-top:8px}
.fbq6tem4{background-color:var(--avatar-circle-gray-active)}
.fcd3cnzj{bottom:16px}
.fcdez9h5{width:75px}
@keyframes fceppddp-B{0%{transform:scale(1);}50%{transform:scale(1.25);}100%{transform:scale(1);}}
.fcxg0yzc{top:7px}
.fd365im1{overflow-wrap:break-word}
.fdblgtiy{color:rgba(var(--inverse-rgb),.72)}
html:not([dir='rtl']) .fdi1u0wl{left:29px}
html[dir='rtl'] .fdi1u0wl{right:29px}
.fdmybch3{animation-delay:.4s,2.8s}
.fe1tuj7z{color:rgba(var(--icon-fixed-rgb),.7)}
.fe33t0ud{left:unset}
.fe3aadhc{height:100px}
.fe5nidar{font-size:1.0625rem}
html:not([dir='rtl']) .fe61fa5g{border-top-left-radius:var(--radius-app)}
html[dir='rtl'] .fe61fa5g{border-top-right-radius:var(--radius-app)}
html:not([dir='rtl']) .febin9tk{margin-right:-36px}
html[dir='rtl'] .febin9tk{margin-left:-36px}
.fewfhwl7{vertical-align:top}
.ffxp8o2t{color:var(----chat-info-medium-emphasis)}
.ffyh53uw{height:82px}
.fgslzg21{max-height:168px}
.fgtikrv0{margin-top:16px}
.fhelu9n7{margin-bottom:40px}
.fhf7t426{justify-content:flex-start}
html:not([dir='rtl']) .fhfm09ip{padding-right:2px}
html[dir='rtl'] .fhfm09ip{padding-left:2px}
.fhk02qni{height:594px}
.fi5r6efy{width:86px}
.fmhufpvf{background-color:rgba(var(--white-rgb),.5)}
.fmk8ud22{background-color:rgba(var(--status-primary-rgb),.2)}
html:not([dir='rtl']) .folpon7g{padding-right:3px}
html[dir='rtl'] .folpon7g{padding-left:3px}
html:not([dir='rtl']) .fooq7fky{margin-left:8px}
html[dir='rtl'] .fooq7fky{margin-right:8px}
.fpj7ivsd{width:var(--preview-thumb-size)}
html:not([dir='rtl']) .fptqv7l3{border-top-right-radius:20%}
html[dir='rtl'] .fptqv7l3{border-top-left-radius:20%}
.fq1kqmrp{opacity:.06}
html:not([dir='rtl']) .fqwk616h{border-bottom-right-radius:6px}
html[dir='rtl'] .fqwk616h{border-bottom-left-radius:6px}
.fr2082sw{background-color:var(--avatar-background)}
.fs6hn1up{height:30px}
.fsgosuut{height:80px}
.fsk8o631{color:var(--teal-lighter)}
.fsmudgz7{filter:blur(var(--blur-radius-thumbnail))}
html:not([dir='rtl']) .ft2m32mm{padding-right:8px}
html[dir='rtl'] .ft2m32mm{padding-left:8px}
.fucf9dil{bottom:25px}
.fujac5jc{height:106px}
.fujhy7ri{width:68px}
.futycye9{background-color:var(--active-tab-marker)}
.fvb4mgxr{background-color:var(--media-gallery-thumb-background)}
.fvlmj93r{transition-property:background-color,color}
.fvnbr7o8{font-size:2.5rem}
.fvowycgw{transition-duration:.14s}
.fwna6xbl{stroke-dashoffset:0}
.fwsb36il{font-size:0.5rem}
.fwz54z48{background-image:linear-gradient(to bottom,rgba(var(--overlay-rgb),.3),rgba(var(--overlay-rgb),0))}
.fx1ldmn8{transition-property:all}
.fyre6qy8{height:var(--preview-thumb-size-small)}
.fyxs1hr1{background-color:#222}
.fyxtz58m{line-height:0}
.fyy3ld6e{width:var(--compose-box-menu-item-width)}
html:not([dir='rtl']) .fz4q5utg{right:7px}
html[dir='rtl'] .fz4q5utg{left:7px}
.g01nkquw{color:var(--text-medium-emphasis)}
.g07l9dru{--T68779821:0 2px 3px rgba(var(--shadow-rgb),.1);box-shadow:0 2px 3px rgba(var(--shadow-rgb),.1)}
.g0bfn8tw{color:var(--payment-status-failed)}
.g0rxnol2{position:relative}
html:not([dir='rtl']) .g0zx2qg0{border-bottom-left-radius:99999px}
html[dir='rtl'] .g0zx2qg0{border-bottom-right-radius:99999px}
.g105fvfm{margin-bottom:5px}
html:not([dir='rtl']) .g130k69c{border-top-left-radius:20px}
html[dir='rtl'] .g130k69c{border-top-right-radius:20px}
.g1eqewly{margin-top:3px}
html:not([dir='rtl']) .g1jn521u{border-top-left-radius:18px}
html[dir='rtl'] .g1jn521u{border-top-right-radius:18px}
.g2bpp9au{z-index:10}
.g2k4c4jm{animation-name:kd4yxhpv-B}
.g2xi8p6r{line-height:18px}
.g39owkbt{animation-name:gk5gj346-B}
.g3ewzqzm{top:-2px}
.g3s9j5t3{color:rgba(var(--inverse-rgb),.76)}
.g3ty6e9x{justify-items:center}
html:not([dir='rtl']) .g4gtvyba{border-top-right-radius:var(--radius-compose)}
html[dir='rtl'] .g4gtvyba{border-top-left-radius:var(--radius-compose)}
.g4oj0cdv{min-height:20px}
.g4tbm4ed{height:192px}
.g4ti3y4y{color:var(--gray-500)}
.g5crjs6l{visibility:visible}
html:not([dir='rtl']) .g5jvwtx7{padding-left:29px}
html[dir='rtl'] .g5jvwtx7{padding-right:29px}
html:not([dir='rtl']) .g65i921c{border-bottom-left-radius:var(--command-palette-border-radius)}
html[dir='rtl'] .g65i921c{border-bottom-right-radius:var(--command-palette-border-radius)}
.g6kkip0l{background-color:var(--drawer-background)}
.g7kbfqzr{animation-name:cwns2890-B}
html:not([dir='rtl']) .g888flyt{margin-left:23px}
html[dir='rtl'] .g888flyt{margin-right:23px}
.g8xmoczg{background-color:rgba(var(--overlay-rgb),.35)}
.g965lu3b{height:10px}
html:not([dir='rtl']) .g9p5wyxn{border-top-left-radius:50%}
html[dir='rtl'] .g9p5wyxn{border-top-right-radius:50%}
.g9q9estb{background-color:var(--message-background-deep)}
html:not([dir='rtl']) .g9zvcdbd{margin-left:12px}
html[dir='rtl'] .g9zvcdbd{margin-right:12px}
.gaqnkt02{animation-timing-function:ease-in-out}
.gaujl5hk{padding-top:14px}
.gbtdc75f{width:100px}
.gc15jzxb{min-height:40px}
.gdaqao4w{margin-bottom:18px}
.gdrnme8s{animation-name:ev8ckacf-B}
.ge0bjo49{max-width:var(--width-msg-bubble-with-media) - 6px}
@keyframes ge0l3a7l-B{0%{max-height:40px;}100%{max-height:168px;}}
.ge6flnsz{opacity:.45}
.gfz4du6o{overflow-x:hidden}
.ggj6brxn{flex-grow:1}
.gh2eiktu{background-color:var(--chat-marker-background)}
.gh97vfwp{background-color:var(--avatar-circle-gray)}
.gibn6ev6{stroke:rgba(var(--green-rgb),.7)}
.gire0wgi{position:static}
.gixhl6f9{max-height:35%}
html:not([dir='rtl']) .gj5xqxfh{margin-left:2px}
html[dir='rtl'] .gj5xqxfh{margin-right:2px}
.gj6qtt9u{flex-grow:3}
.gjfcmax9{padding-bottom:22px}
.gjuq5ydh{align-self:auto}
@keyframes gk5gj346-B{0%{transform:translateX(0);}100%{transform:translateX(-171.5px);}}
.gm0rsm7k{height:8px}
.gmjkez2w{background-color:var(--conversation-panel-background)}
.gndfcl4n{align-items:center}
.gnkxn0la{--T68779821:inset 0 0 0 1px rgba(var(--secondary-rgb),.2);box-shadow:inset 0 0 0 1px rgba(var(--secondary-rgb),.2)}
.go4p2dcp{text-overflow:inherit}
.gofbmt1g{width:auto}
.gpgqxepn{padding-bottom:2rem}
.gpmkiw74{align-items:start}
.gpw48i3y{width:550px}
.gq1t1y46{color:var(--bubble-meta)}
.gq7nj7y3{padding-top:50px}
html:not([dir='rtl']) .gqi0zhd6{margin-right:16px}
html[dir='rtl'] .gqi0zhd6{margin-left:16px}
.graaj7av{height:72px}
html:not([dir='rtl']) .gre9kwvr{padding-right:2px!important}
html[dir='rtl'] .gre9kwvr{padding-left:2px!important}
.grkbsjmy{transition-duration:.4s}
.gro5s87f{color:var(--text-muted)}
.grt5ktjy{right:0}
.gs65objp{animation-timing-function:cubic-bezier(.85,0,.15,1)}
.gsc9792w{padding-top:var(--bubble-padding)}
.gsqs0kct{animation-name:bx6fce78-B}
.gt1inm12{color:var(--tooltip-text)}
.gtffwfyy{color:var(--status-link-preview-secondary)}
.gtscxtjd{color:inherit}
.gulicvea{background-color:var(--panel-background-colored-deeper)}
.gun6vjuz{height:30px!important}
html:not([dir='rtl']) .guo0zu0m{left:28px}
html[dir='rtl'] .guo0zu0m{right:28px}
html:not([dir='rtl']) .gv1bfy1o{padding-right:48px}
html[dir='rtl'] .gv1bfy1o{padding-left:48px}
html:not([dir='rtl']) .gv7ona1m{margin-left:28px}
html[dir='rtl'] .gv7ona1m{margin-right:28px}
.gw1xhhb9{height:641px}
html:not([dir='rtl']) .gwd8mfxi{border-bottom-right-radius:24px}
html[dir='rtl'] .gwd8mfxi{border-bottom-left-radius:24px}
html:not([dir='rtl']) .gwq3iy2m{margin-right:22px}
html[dir='rtl'] .gwq3iy2m{margin-left:22px}
html:not([dir='rtl']) .gx1rr48f{padding-left:0}
html[dir='rtl'] .gx1rr48f{padding-right:0}
@keyframes gxjzahal-B{0%{transform:translateY(5px);opacity:0;}100%{transform:translateY(0);opacity:1;}}
.gxpaki6b{max-height:96px}
.gxu21ubf{flex-basis:25px}
.gy96ms01{right:unset}
html:not([dir='rtl']) .gygahxu2{border-bottom-right-radius:20%}
html[dir='rtl'] .gygahxu2{border-bottom-left-radius:20%}
.gz7w46tb{line-height:1}
.gzqlv4l6{padding-top:48px}
.gzzbkayp{animation-duration:.17s}
.h0psn3nu{background-color:rgba(var(--overlay-rgb),.07)}
.h0viaqh7{padding-top:.3em}
.h15s16sg{color:var(--background)}
html:not([dir='rtl']) .h1a3x9ys{border-bottom-left-radius:100%}
html[dir='rtl'] .h1a3x9ys{border-bottom-right-radius:100%}
html:not([dir='rtl']) .h1a80dm5{padding-right:24px}
html[dir='rtl'] .h1a80dm5{padding-left:24px}
.h1r24yt8{vertical-align:-5px}
html:not([dir='rtl']) .h223g3sc{right:20px}
html[dir='rtl'] .h223g3sc{left:20px}
.h2mkl1gk{--T68779821:0 2px 13px rgba(var(--shadow-rgb),.5);box-shadow:0 2px 13px rgba(var(--shadow-rgb),.5)}
.h2qzpyga{cursor:not-allowed}
.h2zl7k75{min-height:130px}
html:not([dir='rtl']) .h35p8r1c{margin-left:-5px}
html[dir='rtl'] .h35p8r1c{margin-right:-5px}
.h3bz2vby{--T68779821:0 2px 4px rgba(var(--shadow-rgb),.16);box-shadow:0 2px 4px rgba(var(--shadow-rgb),.16)}
.h3jhcnxg{min-width:-moz-fit-content;min-width:fit-content}
.h432zind{font-style:italic}
.h4dw90qs{width:80px}
html:not([dir='rtl']) .h5uqwbaf{padding-right:14px}
html[dir='rtl'] .h5uqwbaf{padding-left:14px}
@keyframes h6b26ba3-B{0%{background-position:-400px;}100%{background-position:400px;}}
.h6edk2v2{animation-duration:.4s,.3s}
.h6rxrygl{color:var(--drawer-section-background)}
.h8rhxpno{padding-bottom:100px}
.h9iecx73{padding-top:100%}
.h9l086de{fill:var(--secondary)}
.ha4ip43m{filter:contrast(0) brightness(100%)}
.hafg4y3t{color:#25d366}
.havzjkop{color:#fff}
.hb09shpw{color:var(--payment-status-success)}
.hbhfgwk1{background-size:contain}
.hblzrxh7{width:500px}
.hbnrezoj{animation-duration:2s}
.hc2u0oym{padding-top:19px}
.hcag4mye{color:var(----secondary-lighter)}
html:not([dir='rtl']) .hcc3cqto{left:66px}
html[dir='rtl'] .hcc3cqto{right:66px}
.hcuw515p{animation-duration:.5s}
.hd6b059k{top:1px}
.hddtmpml{filter:blur(3px)}
html:not([dir='rtl']) .hdndj7vm{left:37px}
html[dir='rtl'] .hdndj7vm{right:37px}
.hdpg1tjz{top:-1px}
.hdyxztb8{fill-opacity:.6}
@keyframes he6jpvhu-B{0%{transform:scale(0,0);}20%{transform:scale(0,0);}100%{transform:scale (1,1);}}
.he7yjufn{height:var(--height-thumb-shade)}
html:not([dir='rtl']) .heai6z19{margin-left:-6px}
html[dir='rtl'] .heai6z19{margin-right:-6px}
.helhczeo{background-color:var(--product-image-button-background)}
.hfergv0f{background-color:var(--reactions-picker-bg)}
.hftcxtij{--T68779821:0 1px 3px rgba(var(--shadow-rgb),.4);box-shadow:0 1px 3px rgba(var(--shadow-rgb),.4)}
.hfy0szgr{background-image:linear-gradient(324.95deg,rgba(0,0,0,.2) 10%,rgba(75,75,75,0) 45%)}
.hgg0ttet{width:22px}
.hgytzyjk{padding-bottom:30}
.hha4v2jc{margin-bottom:var(--thumb-spacing)}
@keyframes hi39smf1-B{0%{transform:translateY(0);}100%{transform:translateY(-17px);}}
html:not([dir='rtl']) .hiez0fsc{padding-right:26px}
html[dir='rtl'] .hiez0fsc{padding-left:26px}
@keyframes hisddxiu-B{0%{transform:scale(1);}50%{transform:scale(.7);}100%{transform:scale(1);}}
.hj839x6e{width:44px}
html:not([dir='rtl']) .hjje1qk3{--T68779821:0 1px 1px rgba(var(--shadow-rgb),.14),0 2px 1px rgba(var(--shadow-rgb),.12),0 1px 3px rgba(var(--shadow-rgb),.2);box-shadow:0 1px 1px rgba(var(--shadow-rgb),.14),0 2px 1px rgba(var(--shadow-rgb),.12),0 1px 3px rgba(var(--shadow-rgb),.2);}
html[dir='rtl'] .hjje1qk3{--T68779821:0 1px 1px rgba(var(--shadow-rgb),.14), 0 2px 1px rgba(var(--shadow-rgb),.12), 0 1px 3px rgba(var(--shadow-rgb),.2);box-shadow:0 1px 1px rgba(var(--shadow-rgb),.14), 0 2px 1px rgba(var(--shadow-rgb),.12), 0 1px 3px rgba(var(--shadow-rgb),.2);}
html:not([dir='rtl']) .hjr9v96k{margin-right:-1px}
html[dir='rtl'] .hjr9v96k{margin-left:-1px}
.hjz8m82x{padding-bottom:32px}
html:not([dir='rtl']) .hm7f711o{border-bottom-left-radius:20%}
html[dir='rtl'] .hm7f711o{border-bottom-right-radius:20%}
.hmfli31t{background-color:var(--poll-bar-container-sender)}
html:not([dir='rtl']) .hmkl5ysc{padding-left:25px}
html[dir='rtl'] .hmkl5ysc{padding-right:25px}
.hmy10g0s{white-space:normal}
.hn08p73j{color:rgba(var(--primary-strong-rgb),.3)}
.hntizkrm{background-color:var(--button-background-disabled)}
.hnx8ox4h{font-weight:500}
html:not([dir='rtl']) .ho9ovbg7{border-top-left-radius:4px}
html[dir='rtl'] .ho9ovbg7{border-top-right-radius:4px}
.holukk2e{-webkit-hyphens:none;-ms-hyphens:none;hyphens:none}
.hp2ib53p{line-height:1.1875}
.hp5m5kpu{width:200px}
.hp667wtd{color:var(--secondary-lighter)}
.hpdpob1j{height:18px}
.hpebpoc7{background-color:var(--panel-background-colored)}
.hqec7i8t{width:75%}
.hql59cr1{letter-spacing:-0.2px}
html:not([dir='rtl']) .hqw9ulo5{margin-left:24px}
html[dir='rtl'] .hqw9ulo5{margin-right:24px}
html:not([dir='rtl']) .hr3av0uk{border-top-left-radius:999px}
html[dir='rtl'] .hr3av0uk{border-top-right-radius:999px}
.hr4hzv79{animation-name:gxjzahal-B,ctfi49jn-B}
.hrdw4pet{background-position:0 0}
.hscjuerc{letter-spacing:.25px}
html:not([dir='rtl']) .hsk1pqkj{border-top-right-radius:0}
html[dir='rtl'] .hsk1pqkj{border-top-left-radius:0}
.hsombceh{bottom:10px}
.hsqj3bek{color:var(--svg-gray-button)}
.hswow7x1{transition-duration:.2s}
html:not([dir='rtl']) .htg54gjl{padding-right:31px}
html[dir='rtl'] .htg54gjl{padding-left:31px}
.htjsae3x{line-height:1.25}
.htlq5l20{width:8px}
html:not([dir='rtl']) .htq1q0kf{margin-left:15px}
html[dir='rtl'] .htq1q0kf{margin-right:15px}
.huo8y3a1{width:var(--compose-box-open-menu-width)}
.hv5pdlef{margin-top:93px}
html:not([dir='rtl']) .hwxn6iyz{border-bottom-right-radius:5px}
html[dir='rtl'] .hwxn6iyz{border-bottom-left-radius:5px}
.hwyr1eu5{min-width:170px}
.hxazv0ps{width:55px}
html:not([dir='rtl']) .hxjsrjta{padding-left:28px}
html[dir='rtl'] .hxjsrjta{padding-right:28px}
.hxov8ih6{--T68779821:inset 0 -10px 9px -10px rgba(var(--shadow-rgb),.1);box-shadow:inset 0 -10px 9px -10px rgba(var(--shadow-rgb),.1)}
.hxudpzjg{background-size:1600% auto}
.hymafltn{margin-top:5px}
.hza3nq4c{background-color:var(--switch-track-checked-color)}
.hzap6c9h{background-image:linear-gradient(rgba(var(--status-background-rgb),.65),rgba(var(--status-background-rgb),0))}
.hzeshm6i{line-height:1.6}
.i033jvx7{white-space:pre-line}
.i0c11cip{color:rgba(var(--primary-stronger-rgb),.35)}
html:not([dir='rtl']) .i0tg5vk9{border-top-right-radius:50%}
html[dir='rtl'] .i0tg5vk9{border-top-left-radius:50%}
.i0x3nve6{width:16px}
.i16jpgpt{background-color:var(--background-default-active)}
.i1lv5eai{-webkit-clip-path:polygon(100% 0,50% 0,50% 55%,49% 73%,41% 82%,50% 88%,50% 100%,100% 100%);clip-path:polygon(100% 0,50% 0,50% 55%,49% 73%,41% 82%,50% 88%,50% 100%,100% 100%)}
html:not([dir='rtl']) .i213mnjx{border-top-right-radius:12px}
html[dir='rtl'] .i213mnjx{border-top-left-radius:12px}
.i2cyxsuq{animation-name:d8h0nk90-B}
.i2tfkqu4{stroke:var(--status-ring-read)}
.i35u2c65{--T68779821:0 1px 1px 0 rgba(var(--shadow-rgb),.06);box-shadow:0 1px 1px 0 rgba(var(--shadow-rgb),.06)}
.i3it5ig8{padding-bottom:1.5px}
html:not([dir='rtl']) .i3rsbmdh{border-top-left-radius:7px}
html[dir='rtl'] .i3rsbmdh{border-top-right-radius:7px}
.i44ccddp{overflow-x:auto}
.i4pc7asj{padding-top:17px}
.i5q8zipx{font-size:.875rem}
.i5tg98hk{padding-top:0}
html:not([dir='rtl']) .i5w8n1e6{border-bottom-right-radius:3px}
html[dir='rtl'] .i5w8n1e6{border-bottom-left-radius:3px}
.i7clx65o{line-height:23px}
html:not([dir='rtl']) .i7sa5vq0{right:16px}
html[dir='rtl'] .i7sa5vq0{left:16px}
.i86elurf{display:inline-flex}
.i86xphuw{background-color:var(--border-default)}
.i8b0kslj{color:var(--text-secondary)}
html:not([dir='rtl']) .i8b31kl9{padding-left:18px}
html[dir='rtl'] .i8b31kl9{padding-right:18px}
.i8de924n{animation-name:h6b26ba3-B}
html:not([dir='rtl']) .i8go5xc4{padding-right:9px}
html[dir='rtl'] .i8go5xc4{padding-left:9px}
.i8t1ujht{color:var(--ptt-draft-button-send)}
.i94gqilv{width:24px}
.i9q6l8xd{animation-name:s2wya820-B}
html:not([dir='rtl']) .i9wwz5gb{cursor:e-resize}
html[dir='rtl'] .i9wwz5gb{cursor:w-resize}
html:not([dir='rtl']) .ia5k4ep2{right:22px}
html[dir='rtl'] .ia5k4ep2{left:22px}
html:not([dir='rtl']) .ia9wx81j{margin-left:22%}
html[dir='rtl'] .ia9wx81j{margin-right:22%}
.iaxh5e60{max-width:200px}
.ibyb1pgl{max-height:100%}
.icj6mcig{height:14px}
.idmi9oma{background-color:rgba(var(--background-default-rgb),.95)}
.idnewlvo{width:82px}
.idwf4z32{line-height:19px}
.ied3pvzy{height:95px}
.iedsav3z{stroke:var(--status-ring-unread)}
.if44n927{margin-top:-3px}
html:not([dir='rtl']) .iffbo4e8{padding-right:20px}
html[dir='rtl'] .iffbo4e8{padding-left:20px}
html:not([dir='rtl']) .ig3kka7n{border-top-left-radius:100%}
html[dir='rtl'] .ig3kka7n{border-top-right-radius:100%}
html:not([dir='rtl']) .igb3k0ri{padding-right:19px}
html[dir='rtl'] .igb3k0ri{padding-left:19px}
.ignnouf6{margin-top:28px}
.ih8khgda{max-height:60px}
.ihvf49ua{background-color:var(--background-default)}
.iibwf64q{bottom:-10px}
.iijvqejl{z-index:var(--layer-5)}
.iin4x6c7{margin-top:6px}
html:not([dir='rtl']) .ij4mqf17{padding-right:100px}
html[dir='rtl'] .ij4mqf17{padding-left:100px}
.ijehb8ro{transition-timing-function:easeInSine}
.ijnr8jqx{animation-duration:.12s}
.ik2lb43m{background-color:var(--forward-caption-preview-background)}
.ikaz7xrh{background-image:linear-gradient(to right,var(--progress-background) 4%,var(--wds-cool-gray-alpha-40) 25%,var(--progress-background) 36%)}
html:not([dir='rtl']) .ikc09dv3{margin-right:var(--thumb-spacing)}
html[dir='rtl'] .ikc09dv3{margin-left:var(--thumb-spacing)}
html:not([dir='rtl']) .ikqdvm1y{border-top-left-radius:10px}
html[dir='rtl'] .ikqdvm1y{border-top-right-radius:10px}
html:not([dir='rtl']) .ikqwvqb4{border-top-right-radius:9999px}
html[dir='rtl'] .ikqwvqb4{border-top-left-radius:9999px}
html:not([dir='rtl']) .ikwl5qvt{border-top-right-radius:1.1em}
html[dir='rtl'] .ikwl5qvt{border-top-left-radius:1.1em}
.il1gyv3w{min-width:.8em}
.ilbp7ui4{background-color:var(--round-entry-point-background-color)}
.ilf8vifs{height:16px}
.ilpu1yob{padding-top:$chat-spacing}
.ilqz664c{width:65px}
.im5280se{min-height:60px}
.imx83vnz{line-height:1.4em}
.inadp68n{background-color:var(--sender-superpower-title)}
.inogquss{margin-bottom:1px}
.inww9tbj{margin-bottom:4px}
.io08vzmp{color:var(--unread-marker-background)}
.io7enyfj{fill-opacity:1}
.io9pg0pp{background-color:rgba(233,28,67,.1)}
html:not([dir='rtl']) .io9rddya{border-top-right-radius:999px}
html[dir='rtl'] .io9rddya{border-top-left-radius:999px}
.iod7fm94{max-height:296px}
.iozoqvlu{background-size:1000px 100%}
.ipet1iae{bottom:8px}
.ipp30ku8{background-color:var(--attach-media-drop-overlay)}
.ipry0idr{font-size:6.25rem}
.iq0m558w{line-height:inherit}
.iq9gefj9{height:64px!important}
.iqn2u7bu{color:#FFF}
.iqrewfee{font-size:1.1875rem}
html:not([dir='rtl']) .iqx13udk{padding-right:1px}
html[dir='rtl'] .iqx13udk{padding-left:1px}
html:not([dir='rtl']) .isfiuinm{margin-left:auto}
html[dir='rtl'] .isfiuinm{margin-right:auto}
html:not([dir='rtl']) .isg5rw3j{margin-right:-4px}
html[dir='rtl'] .isg5rw3j{margin-left:-4px}
html:not([dir='rtl']) .itegkywt{padding-right:10px}
html[dir='rtl'] .itegkywt{padding-left:10px}
html:not([dir='rtl']) .itf0yk5b{left:-40px}
html[dir='rtl'] .itf0yk5b{right:-40px}
html:not([dir='rtl']) .itgzszx5{margin-right:10.5px}
html[dir='rtl'] .itgzszx5{margin-left:10.5px}
.itj3kzbg{z-index:110}
.itoi26wd{height:2.5px}
.ity2ubfj{z-index:999999999}
.iuagithl{bottom:30px}
.iuhl9who{line-height:1.43}
.iv396pab{line-height:2}
html:not([dir='rtl']) .ivui8b66{float:right}
html[dir='rtl'] .ivui8b66{float:left}
html:not([dir='rtl']) .ixn6u0rb{border-top-right-radius:2px}
html[dir='rtl'] .ixn6u0rb{border-top-left-radius:2px}
html:not([dir='rtl']) .ixsqo53d{padding-right:34px}
html[dir='rtl'] .ixsqo53d{padding-left:34px}
.iy2cu22y{margin-top:12px}
html:not([dir='rtl']) .iy3dfvyp{padding-left:34px}
html[dir='rtl'] .iy3dfvyp{padding-right:34px}
.iyjcf3gk{margin-bottom:24px}
.iyofsbg4{right:3px}
.izlvswng{color:var(--primary-title)}
.izvjr1tp{animation-duration:.7s}
.j00wzxgm{min-width:7px}
.j07hyc8x{margin-top:-7px}
.j0epb7j8{margin-bottom:1.5em}
.j0vv7iav{vertical-align:-2px}
.j16a598t{animation-duration:.1s}
.j19d4s4u{height:164px}
.j1p1mz06{justify-content:space-around}
@keyframes j1vtk5sh-B{0%{transform:scale(.01);}25%{transform:scale(.21,1);animation-timing-function:cubic-bezier(.83,0,.17,1);}62%{transform:scaleX(1.05);animation-timing-function:cubic-bezier(.83,0,.17,1);}100%{transform:scaleX(1);}}
.j1wdo6yn{background-color:rgba(var(--inverse-rgb),0)}
@keyframes j1z081e5-B{0%{top:9px;left:6px;width:0;height:0;}100%{top:1px;left:4px;width:4px;height:8px;}}
.j216idpa{max-width:300px}
.j2j5w4e7{max-width:170px}
html:not([dir='rtl']) .j2mzdvlq{right:8px}
html[dir='rtl'] .j2mzdvlq{left:8px}
.j3as33wi{right:50%}
.j3e9rhaw{min-width:72px}
.j3oq2rgp{color:var(--highlight)}
.j3xvgpwy{max-width:720px}
.j4enbv94{margin-bottom:2px}
.j5au4wul{color:var(--success)}
.j6fiq9dm{animation-timing-function:steps(15)}
.j6t0p44n{animation-name:fceppddp-B}
.j74n1y92{height:112px}
.j7fhyocb{min-width:77px}
.j7l1k36l{order:0}
.j8e73hjv{height:35px}
.j8fxo1e4{cursor:-webkit-grab;cursor:grab}
.j8gd1g7w{background-color:var(--avatar-circle-gray-dark)}
.j8h4s3v0{color:var(--link-preview-light)}
.j8hxo2it{bottom:72px}
.j8jyn9yl{color:var(--media-editor-icon-color)}
html:not([dir='rtl']) .j90th5db{border-bottom-right-radius:1.1em}
html[dir='rtl'] .j90th5db{border-bottom-left-radius:1.1em}
.j950s1re{bottom:-40px}
.j97fhkih{font-size:.867em}
.j9fb8bew{background-color:rgba(var(--gray-900-rgb),.95)}
.j9ny8kmf{stroke:var(--teal)}
.jabl2ek9{width:28.8px}
.jagrmlki{font-family:'Oswald'}
html:not([dir='rtl']) .jaoskmb8{padding-right:17px}
html[dir='rtl'] .jaoskmb8{padding-left:17px}
.jb7wq3az{transition-property:width,background-color}
.jbm6vef4{width:0}
.jbxl65f1{height:34px}
.jbydbyre{height:var(--thumb-height)}
.jc2at2x4{animation-name:tt97e0k0-B}
html:not([dir='rtl']) .jchzwnh7{border-bottom-left-radius:3.5px}
html[dir='rtl'] .jchzwnh7{border-bottom-right-radius:3.5px}
.jcupx58r{background-color:var(--button-reject-background)}
.jd93c9cp{padding-bottom:16px}
html:not([dir='rtl']) .jdimvq34{border-top-right-radius:99999px}
html[dir='rtl'] .jdimvq34{border-top-left-radius:99999px}
.jdreu547{margin-top:-12px}
.jdwybkuq{height:20px}
html:not([dir='rtl']) .je7dqiji{margin-left:80px}
html[dir='rtl'] .je7dqiji{margin-right:80px}
.je90h8md{background-color:var(--security-icon-background)}
html:not([dir='rtl']) .jec3q7jm{padding-left:.3em}
html[dir='rtl'] .jec3q7jm{padding-right:.3em}
.jeo84yz3{width:var(--width-payment-bubble)}
.jevcxcag{z-index:98}
.jfnhg5wd{background-color:inherit}
html:not([dir='rtl']) .jfqm35v0{padding-right:4px}
html[dir='rtl'] .jfqm35v0{padding-left:4px}
.jg9mtn4o{margin-bottom:36px}
.jgi8eev7{line-height:1.4}
.jgly3g7g{width:72px}
.jgz0asyo{top:6px}
.jht8oeb6{background-color:var(--incoming-background)}
html:not([dir='rtl']) .ji0r0qsd{left:11px}
html[dir='rtl'] .ji0r0qsd{right:11px}
.jk96mlgm{color:var(--button-secondary-hover)}
.jkv2xdwy{width:128px}
html:not([dir='rtl']) .jl1nm5p1{padding-left:.5rem}
html[dir='rtl'] .jl1nm5p1{padding-right:.5rem}
@keyframes jlc02bb6-B{30%{opacity:0;transform:translateY(-50px);}100%{opacity:1;transform:translateY(0);}}
.jmly3brn{color:var(--gray-300)}
.jn5oezdz{color:var(--communities-green)}
.jncsylhy{color:var(--archived-chat-marker)}
.jnl3jror{z-index:1}
html:not([dir='rtl']) .jnwc1y2a{margin-right:0}
html[dir='rtl'] .jnwc1y2a{margin-left:0}
.joi2o88i{animation-name:e6ri2msi-B}
.joup3a2m{animation-duration:.32s,.12s}
.jp8f8qpf{font-family:monospace}
.jpfst8ig{width:78%}
.jpthtbts{object-fit:cover}
.jq3rn4u7{color:var(--teal)}
.jq6r0jf2{background-color:var(--reactions-tray-active-round-background)}
.jswlwoyz{width:30px}
.jte5jbqx{width:11px}
.ju2rvew0{background-color:var(--round-icon-background)}
.jue23zaq{max-height:80vh}
html:not([dir='rtl']) .jv1ikj1l{border-top-left-radius:60px}
html[dir='rtl'] .jv1ikj1l{border-top-right-radius:60px}
.jv6unooo{-webkit-clip-path:polygon(50% 0,100% 0,99% 100%,49% 100%,52% 59%,54% 65%,50% 63%,48% 66%,46% 63%,49% 50%);clip-path:polygon(50% 0,100% 0,99% 100%,49% 100%,52% 59%,54% 65%,50% 63%,48% 66%,46% 63%,49% 50%)}
.jv8uhy2r{pointer-events:auto}
.jvy3y6qh{background-color:var(--chip-button-background)}
html:not([dir='rtl']) .jwkvlveg{border-top-right-radius:var(--command-palette-border-radius)}
html[dir='rtl'] .jwkvlveg{border-top-left-radius:var(--command-palette-border-radius)}
.jwo15fhv{max-width:520px}
html:not([dir='rtl']) .jwvfxh5v{margin-left:var(--chat-spacing)}
html[dir='rtl'] .jwvfxh5v{margin-right:var(--chat-spacing)}
.jxacihee{bottom:0}
html:not([dir='rtl']) .jyk8994j{border-bottom-right-radius:60px}
html[dir='rtl'] .jyk8994j{border-bottom-left-radius:60px}
.jzp2c175{padding-bottom:40px}
.k06jqncy{color:var(--text-secondary-lighter)}
.k07a8sro{padding-bottom:.3em}
.k0lnf8n4{margin-bottom:14px}
.k13l3mcg{font-family:var(--font-family-monospace)}
.k144jibt{background-color:var(--button-approve-background-hover)}
.k17s6i4e{color:var(--inverse)}
html:not([dir='rtl']) .k1a7joe8{border-top-right-radius:20px}
html[dir='rtl'] .k1a7joe8{border-top-left-radius:20px}
html:not([dir='rtl']) .k1jo73ug{margin-right:auto}
html[dir='rtl'] .k1jo73ug{margin-left:auto}
.k239c91b{color:rgba(var(--inverse-rgb),.8)}
.k2bacm8l{color:var(--primary-stronger)}
.k2umuq2k{bottom:32px}
.k35l1n51{color:var(--text-primary-strong)}
html:not([dir='rtl']) .k3h23tga{padding-right:var(--chat-spacing)}
html[dir='rtl'] .k3h23tga{padding-left:var(--chat-spacing)}
.k45dudtp{height:60px}
.k46w8fxw{transition-timing-function:var(--t-ease)}
.k4bq6kvk{background-color:var(--avatar-circle-green)}
html:not([dir='rtl']) .k4wy2cgb{padding-left:7px}
html[dir='rtl'] .k4wy2cgb{padding-right:7px}
.k5z04t9s{align-self:start}
html:not([dir='rtl']) .k6f31xd0{border-top-left-radius:12px}
html[dir='rtl'] .k6f31xd0{border-top-right-radius:12px}
html:not([dir='rtl']) .k6hyhuy2{right:13px}
html[dir='rtl'] .k6hyhuy2{left:13px}
.k6px2m13{background-color:var(--avatar-circle-gray-light)}
html:not([dir='rtl']) .k6y3xtnu{margin-left:3px}
html[dir='rtl'] .k6y3xtnu{margin-right:3px}
html:not([dir='rtl']) .k7lfud6f{padding-right:.3em}
html[dir='rtl'] .k7lfud6f{padding-left:.3em}
.k8kmlv7u{background-color:var(--ptt-ooc-avatar-background)}
.k9cretck{line-height:22px}
.k9zdc5o0{max-width:var(--width-location-thumb)}
.kanlod6e{height:1px}
.kao4egtt{line-height:1.47em}
.kaq19mkm{opacity:var(--dimmed)}
.kb1vfvhz{animation-duration:10s}
.kbne4t5p{vertical-align:text-bottom}
.kbtdaxqp{max-width:246px}
.kc4t2p4u{background-position-x:center}
.kcgo1i74{justify-content:flex-end}
html:not([dir='rtl']) .kciiizs6{border-top-left-radius:3.5px}
html[dir='rtl'] .kciiizs6{border-top-right-radius:3.5px}
.kcq1et6t{color:var(--status-secondary)}
@keyframes kd4yxhpv-B{0%{transform:translateY(17px);}100%{transform:translateY(-16px);}}
.kenirpp9{grid-template-rows:repeat(auto-fill,var(--sticker-size-store))}
.kfa44f3y{top:200px}
.kfa8k2bn{pointer-events:initial}
html:not([dir='rtl']) .kfr1vweg{border-bottom-left-radius:20px}
html[dir='rtl'] .kfr1vweg{border-bottom-right-radius:20px}
.kgc6pkg6{height:93px}
.kh4n4d4z{-webkit-font-smoothing:antialiased}
.kh81x8bz{width:38px}
html:not([dir='rtl']) .khscay3k{padding-left:20px}
html[dir='rtl'] .khscay3k{padding-right:20px}
.khvhiq1o{font-family:Noto-Emoji,sans-serif}
.kiblkopf{margin-top:34px}
.kiiy14zj{margin-top:2px}
.kj15qrcq{color:#ffffff}
html:not([dir='rtl']) .kjemk6od{margin-right:3px}
html[dir='rtl'] .kjemk6od{margin-left:3px}
.kji9i36c{transition-delay:.4s}
html:not([dir='rtl']) .kjjye8e3{padding-left:14px}
html[dir='rtl'] .kjjye8e3{padding-right:14px}
.kkfs9yjl{top:-5px}
.kl1dhzdn{animation-timing-function:var(--t-ease)}
.km15ofqp{min-width:50px}
.kmqqq083{margin-top:18px}
.kojwoqec{visibility:hidden}
html:not([dir='rtl']) .kozhillt{margin-left:77px}
html[dir='rtl'] .kozhillt{margin-right:77px}
.kpdgp91a{float:left}
html:not([dir='rtl']) .kpl3m0p3{left:118px}
html[dir='rtl'] .kpl3m0p3{right:118px}
.kpwy2cir{margin-top:50px}
.kqpkm0zi{visibility:hidden!important}
.kqvcv5rh{background-color:var(--chat-info-drawer-thumb-background)}
.kr1k453a{width:inherit}
.kr3beu63{min-width:var(--quoted-compose-height-full)}
.kr606f8j{min-width:164px}
html:not([dir='rtl']) .krvaa198{border-bottom-right-radius:var(--command-palette-border-radius)}
html[dir='rtl'] .krvaa198{border-bottom-left-radius:var(--command-palette-border-radius)}
.ktbp76dp{max-width:var(--width-msg-bubble-with-media)}
.ktfrpxia{min-width:0}
html:not([dir='rtl']) .ku3lw4j3{right:15px}
html[dir='rtl'] .ku3lw4j3{left:15px}
html:not([dir='rtl']) .ku7dt4i2{padding-left:26px}
html[dir='rtl'] .ku7dt4i2{padding-right:26px}
.kuk548i2{font-size:1.875rem}
.kuml4n87{color:var(--ptt-text)}
.kupmgzgy{text-overflow:clip}
.kv0r5hzt{color:var(--icon-bright-highlight)}
.kv6wexeh{margin-top:-4px}
html:not([dir='rtl']) .kvbanpuc{padding-right:32px}
html[dir='rtl'] .kvbanpuc{padding-left:32px}
.kvdvyush{line-height:var(--line-height-quoted)}
.kvmx9pbu{cursor:-webkit-grabbing;cursor:grabbing}
.kw851w1p{color:rgba(var(--primary-strong-rgb),.32)}
.kwjb00gf{bottom:-42px}
.kwqfpmxe{filter:blur(20px)}
.kx1rlajt{background-color:rgba(var(--overlay-rgb),.5)}
.ky3f94nk{color:var(--active-tab-marker)}
.ky53r25y{background-color:rgba(11,20,26,.04)}
html:not([dir='rtl']) .kyc7k6mt{padding-right:15px}
html[dir='rtl'] .kyc7k6mt{padding-left:15px}
html:not([dir='rtl']) .kygtoxk5{border-top-left-radius:11px}
html[dir='rtl'] .kygtoxk5{border-top-right-radius:11px}
.kyitrrqy{margin-top:36px}
.kzgl1sas{stroke-dasharray:1,150}
.kzotrnxx{width:var(--quoted-compose-height-full)}
.kzrzzy77{color:var(--notification-e2e-icon)}
.kzxpayn5{color:var(--gray-400)}
.kzyzudjh{margin-bottom:3px}
.l07amlnk{flex-basis:1px}
.l0vqccxk{line-height:1.5385}
html:not([dir='rtl']) .l147y7tb{border-top-left-radius:6px}
html[dir='rtl'] .l147y7tb{border-top-right-radius:6px}
.l1l4so3b{line-height:1.1429}
.l33m68ws{align-self:stretch}
.l355kaf8{z-index:var(--layer-3)}
html:not([dir='rtl']) .l3dnfgho{margin-left:-1px}
html[dir='rtl'] .l3dnfgho{margin-right:-1px}
.l3hfgdr1{left:50%}
html:not([dir='rtl']) .l3k7h4x6{padding-left:50px}
html[dir='rtl'] .l3k7h4x6{padding-right:50px}
html:not([dir='rtl']) .l5pmshjt{border-top-right-radius:calc(var(--radius-app) + 1px)}
html[dir='rtl'] .l5pmshjt{border-top-left-radius:calc(var(--radius-app) + 1px)}
html:not([dir='rtl']) .l5wf47vo{right:40px}
html[dir='rtl'] .l5wf47vo{left:40px}
.l5wrc0op{color:var(--status-link-preview-title)}
.l5xxxszt{padding-bottom:var(--padding-psa-message)}
.l64xl67m{bottom:56px}
.l7jjieqr{display:inline-block}
.l7ubuiw1{padding-bottom:54px}
.l85iiqla{line-height:1.3125}
html:not([dir='rtl']) .l8dmboli{padding-left:var(--blur-radius-thumbnail)}
html[dir='rtl'] .l8dmboli{padding-right:var(--blur-radius-thumbnail)}
html:not([dir='rtl']) .l8fojup5{border-top-left-radius:var(--radius-thumb)}
html[dir='rtl'] .l8fojup5{border-top-right-radius:var(--radius-thumb)}
@keyframes l9dax0qz-B{0%{transform:scale(.01);}50%{transform:scale(1.1);}100%{transform:scale(1);}}
html:not([dir='rtl']) .l9g3jx6n{padding-right:16px}
html[dir='rtl'] .l9g3jx6n{padding-left:16px}
.la222qfv{color:grey}
.la59b5bx{background-color:var(--media-editor-video-caption-input-background)}
.lak21jic{font-size:0.6875rem}
.laorhtua{max-width:100%}
.lb5m6g5c{flex-basis:auto}
.lbj9vhti{background-color:var(--switch-button-color)}
.lbzzw5jd{background-color:var(--ptt-draft-waveform-background)}
.lcen7ztn{color:var(--button-approve)}
.lcw3x5qt{background-color:var(--avatar-circle-green-lighter)}
.lds9pm4u{height:inherit}
.le5p0ye3{white-space:nowrap}
.lemzf3q7{min-width:var(--quote-right-margin)}
.lffynu9d{height:600px}
html:not([dir='rtl']) .lfum0007{margin-right:30px}
html[dir='rtl'] .lfum0007{margin-left:30px}
.lgn58c33{--T68779821:0 0 0 2px rgba(var(--color-blue-light-rgb),.4);box-shadow:0 0 0 2px rgba(var(--color-blue-light-rgb),.4)}
.lgxs6e1q{--T68779821:0 0 0 2px rgba(var(--focus-rgb),.5);box-shadow:0 0 0 2px rgba(var(--focus-rgb),.5)}
.lhcgb2gc{padding-bottom:48px}
.lhggkp7q{position:absolute}
.lhhjz8ro{font-size:2.1875rem}
.lhj4utae{text-overflow:ellipsis}
.lhjw8glk{grid-row-gap:32px}
.lho3xdtl{background-color:var(--search-input-container-background-active)}
html:not([dir='rtl']) .lhp4ctto{margin-left:7px}
html[dir='rtl'] .lhp4ctto{margin-right:7px}
.lhsttmr3{-webkit-clip-path:polygon(0 0,0 100%,51% 100%,44% 63%,49% 66%,51% 64%,51% 61%,53% 60%,49% 55%,44% 1%);clip-path:polygon(0 0,0 100%,51% 100%,44% 63%,49% 66%,51% 64%,51% 61%,53% 60%,49% 55%,44% 1%)}
.li9elm96{-webkit-clip-path:var(--squircle-polygon);clip-path:var(--squircle-polygon)}
.lia7vegv{will-change:scale}
.lidbxt4q{left:5px}
.ligcydkd{width:280px}
.lignnmtc{min-height:72px}
html:not([dir='rtl']) .ljef3gak{border-top-right-radius:3.5px}
html[dir='rtl'] .ljef3gak{border-top-left-radius:3.5px}
html:not([dir='rtl']) .ljrqcn24{text-align:left}
html[dir='rtl'] .ljrqcn24{text-align:right}
html:not([dir='rtl']) .lk91ofgv{padding-right:36px}
html[dir='rtl'] .lk91ofgv{padding-left:36px}
.lk9bdx0e{width:320px}
.lkhkxwyq{flex-wrap:wrap}
.lkjmyc96{background-color:var(--drawer-section-background)}
.llkbrke6{min-width:100%}
html:not([dir='rtl']) .llnowng2{border-top-left-radius:5px}
html[dir='rtl'] .llnowng2{border-top-right-radius:5px}
html:not([dir='rtl']) .llwlbyh8{border-bottom-right-radius:11px}
html[dir='rtl'] .llwlbyh8{border-bottom-left-radius:11px}
.lmoo7qev{background-color:var(--icon-disabled)}
.lmuv1eak{margin-bottom:-15px}
.ln3j75h5{filter:blur(30px)}
.ln8gz9je{width:100%}
.lna84pfr{padding-top:var(--width-album-extra-padding)}
.lniyxyh2{height:40px}
html:not([dir='rtl']) .lnjlmjd6{padding-right:5px}
html[dir='rtl'] .lnjlmjd6{padding-left:5px}
.losjomng{background-color:var(--button-secondary-background)}
.lpfcdsx3{color:var(--link-preview)}
.lqdozo90{padding-top:13px}
html:not([dir='rtl']) .lqec2n0o{padding-left:var(--w-select)}
html[dir='rtl'] .lqec2n0o{padding-right:var(--w-select)}
.lqpp6bxj{top:-40px}
.lqxtw3mz{z-index:20}
html:not([dir='rtl']) .lrpjbpgm{border-bottom-left-radius:var(--radius-bubble)}
html[dir='rtl'] .lrpjbpgm{border-bottom-right-radius:var(--radius-bubble)}
.lrw9n60e{bottom:3px}
.ls0cxkps{animation-timing-function:cubic-bezier(.65,.815,.735,.395)}
html:not([dir='rtl']) .ltcz4qz9{right:-1px}
html[dir='rtl'] .ltcz4qz9{left:-1px}
.ltyqj8pj{width:-moz-fit-content;width:fit-content}
.lu2z1zfr{transition-timing-function:linear}
.lu4oe39f{min-width:150px}
.lvug1qsr{animation-name:s71btfur-B}
.lxctpz5v{opacity:0!important}
.lxozqee9{color:var(--status-primary)}
.lxsc1wef{margin-top:24px}
.lxvt2vq0{padding-bottom:33%}
.lxwgj1sq{top:43px}
.ly2gu7o9{position:fixed!important}
.ly777k5r{background-image:linear-gradient(to top,rgba(var(--shadow-rgb),0) 0,rgba(var(--shadow-rgb),.002) 1.8%,rgba(var(--shadow-rgb),.006) 4.8%,rgba(var(--shadow-rgb),.016) 9%,rgba(var(--shadow-rgb),.032) 13.9%,rgba(var(--shadow-rgb),.057) 19.8%,rgba(var(--shadow-rgb),.097) 27%,rgba(var(--shadow-rgb),.149) 35%,rgba(var(--shadow-rgb),.213) 43.5%,rgba(var(--shadow-rgb),.294) 53%,rgba(var(--shadow-rgb),.416) 66%,rgba(var(--shadow-rgb),.568) 81%,rgba(var(--shadow-rgb),.769) 100%)}
html:not([dir='rtl']) .ly84yby8{padding-left:2em}
html[dir='rtl'] .ly84yby8{padding-right:2em}
.lyerox4x{background-color:var(--poll-modal-background-color)}
html:not([dir='rtl']) .lysxvg3k{border-bottom-left-radius:calc(var(--radius-app) + 1px)}
html[dir='rtl'] .lysxvg3k{border-bottom-right-radius:calc(var(--radius-app) + 1px)}
.lyutrhe2{color:var(--unread-marker-text)}
html:not([dir='rtl']) .lyvj5e2u{padding-left:16px}
html[dir='rtl'] .lyvj5e2u{padding-right:16px}
.lzi2pvmc{padding-bottom:24px}
.m0h2a7mj{flex-shrink:1}
html:not([dir='rtl']) .m0ig7u5t{margin-left:0!important}
html[dir='rtl'] .m0ig7u5t{margin-right:0!important}
.m0jbzij3{height:59px}
.m0s4cjtr{width:20px}
.m1c2hokz{word-break:break-all}
.m1e7cby3{font-weight:400}
html:not([dir='rtl']) .m1h4cxg8{padding-left:30}
html[dir='rtl'] .m1h4cxg8{padding-right:30}
.m21mz96n{animation-name:hi39smf1-B}
html:not([dir='rtl']) .m2gb0jvt{border-top-left-radius:24px}
html[dir='rtl'] .m2gb0jvt{border-top-right-radius:24px}
.m35p33ho{color:var(--notification-info-icon)}
.m3ct2rho{margin-top:auto}
.m3h9lho3{width:var(--width-msg-bubble-with-media)}
.m3o1wsh7{height:48px}
html:not([dir='rtl']) .m3qqxsiz{border-top-right-radius:10px}
html[dir='rtl'] .m3qqxsiz{border-top-left-radius:10px}
html:not([dir='rtl']) .m4o8c6m0{margin-left:41px}
html[dir='rtl'] .m4o8c6m0{margin-right:41px}
.m4sq1sd8{color:#243545}
html:not([dir='rtl']) .m51t5hoj{margin-left:2rem}
html[dir='rtl'] .m51t5hoj{margin-right:2rem}
html:not([dir='rtl']) .m58prw6j{right:82px}
html[dir='rtl'] .m58prw6j{left:82px}
.m62443ks{pointer-events:none}
.m6k4hpz6{height:200px}
html:not([dir='rtl']) .m7kgcvyw{left:50%}
html[dir='rtl'] .m7kgcvyw{right:50%}
.m7o6y653{padding-top:var(--blur-radius-thumbnail)}
html:not([dir='rtl']) .m8i16etx{border-bottom-right-radius:8px}
html[dir='rtl'] .m8i16etx{border-bottom-left-radius:8px}
@keyframes m8lv8jz8-B{0%{transform:scale(0);}50%{transform:scale(1.1);}100%{transform:scale(1);}}
.m9lpqg3r{height:96px}
.ma4rpf0l{margin-top:-2px}
.maaasku1{font-size:9pt}
.masnrobp{background-color:var(--switch-track-color)}
html:not([dir='rtl']) .mavwm6a7{margin-left:26px}
html[dir='rtl'] .mavwm6a7{margin-right:26px}
.mb8var44{z-index:100}
.mbixqzja{stroke:var(--spinner-outgoing)}
html:not([dir='rtl']) .mbnky1fc{right:37px}
html[dir='rtl'] .mbnky1fc{left:37px}
.mbtxrpqz{z-index:0}
.mc2v84cv{max-height:var(--height-video-thumb)}
html:not([dir='rtl']) .mc6o24uu{padding-left:5px}
html[dir='rtl'] .mc6o24uu{padding-right:5px}
.mcwxqdig{padding-bottom:11px}
.md4apq9i{vertical-align:baseline}
.mdtr2l4m{margin-bottom:27px}
.mdwxuyu9{height:var(--quoted-compose-height-full)}
.meh5ksr1{width:64px!important}
.mesvn7sa{fill:var(--status-secondary)}
html:not([dir='rtl']) .mf2g8abl{right:3px}
html[dir='rtl'] .mf2g8abl{left:3px}
.mfzfak1c{color:var(--primary-text)}
html:not([dir='rtl']) .mg7w9a8q{margin-right:25px}
html[dir='rtl'] .mg7w9a8q{margin-left:25px}
.mge1ni6g{isolation:isolate}
.mggyuyyy{margin-bottom:42px}
.mgp6u6um{width:35px}
html:not([dir='rtl']) .mgssq8h7{padding-right:var(--compose-box-left-right-padding)}
html[dir='rtl'] .mgssq8h7{padding-left:var(--compose-box-left-right-padding)}
.mh8l8k0y{width:60px}
html:not([dir='rtl']) .mhcwslh8{padding-left:6px}
html[dir='rtl'] .mhcwslh8{padding-right:6px}
html:not([dir='rtl']) .mhmt5mju{border-bottom-left-radius:11px}
html[dir='rtl'] .mhmt5mju{border-bottom-right-radius:11px}
html:not([dir='rtl']) .mhohgsbe{border-bottom-left-radius:calc(var(--radius-app) - 1px)}
html[dir='rtl'] .mhohgsbe{border-bottom-right-radius:calc(var(--radius-app) - 1px)}
.mhp1pqu9{min-width:24px}
.mjl5wphb{animation-timing-function:cubic-bezier(.83,0,.17,1)}
html:not([dir='rtl']) .mjn2akup{padding-left:2px}
html[dir='rtl'] .mjn2akup{padding-right:2px}
html:not([dir='rtl']) .mjscftrx{border-top-right-radius:6px}
html[dir='rtl'] .mjscftrx{border-top-left-radius:6px}
.mks54fll{transition-timing-function:ease-in-out}
.ml33x45x{color:var(--security-icon-lock)}
.ml4r5409{text-align:left}
.ml8t9l8k{stroke:var(--secondary-lighter)}
.mlen7d4n{max-height:544px}
html:not([dir='rtl']) .mmj7r7ye{border-bottom-left-radius:10px}
html[dir='rtl'] .mmj7r7ye{border-bottom-right-radius:10px}
html:not([dir='rtl']) .mmw11n2j{padding-left:var(--width-album-extra-padding)}
html[dir='rtl'] .mmw11n2j{padding-right:var(--width-album-extra-padding)}
.mmx92utk{animation-name:l9dax0qz-B,sl8wg78j-B}
.mnd5airb{color:rgba(var(--icon-strong-rgb),.5)}
html:not([dir='rtl']) .mnh9o63b{border-bottom-left-radius:24px}
html[dir='rtl'] .mnh9o63b{border-bottom-right-radius:24px}
.mnhq3yws{margin-top:2em}
.mnqpe3xa{height:55px}
.monsh5ao{margin-bottom:$bubble-padding}
.mpdn4nr2{margin-bottom:0}
.mq8m0esj{background-color:rgba(var(--status-primary-rgb),.3)}
html:not([dir='rtl']) .mqoznopa{padding-right:11px}
html[dir='rtl'] .mqoznopa{padding-left:11px}
.mqqyhd6v{gap:16px}
.mr0xwlll{vertical-align:-4px}
.mr8pev2x{animation-name:j1z081e5-B}
html:not([dir='rtl']) .mrnekr2l{border-top-right-radius:18px}
html[dir='rtl'] .mrnekr2l{border-top-left-radius:18px}
.ms8wnqe5{fill:var(--primary)}
.msavwer2{padding-top:30px}
.msvqejku{max-height:102px}
.mu5rq31i{width:var(--compose-box-menu-width-status-reply)}
.mvf5n2qr{top:5px}
.mvj9yovn{bottom:calc(var(--compose-box-top-bottom-padding) + 3px)}
.mvxzr2tb{color:var(--danger)}
html:not([dir='rtl']) .mw4yctpw{margin-right:4px}
html[dir='rtl'] .mw4yctpw{margin-left:4px}
.mw6k2wl9{min-height:var(--preview-thumb-size)}
.mw9hwy0h{padding-top:26px}
.mwp4sxku{max-height:100px}
.mx3ldrxl{background-color:var(--poll-invalid-warning-icon-container-background)}
.mx6rw3sv{max-width:376px}
.my8w5w2u{background-color:var(--switch-button-checked-color)}
.myeiuhv9{top:50%}
.myel2vfb{padding-bottom:19px}
html:not([dir='rtl']) .mykz8fp3{margin-left:-10px}
html[dir='rtl'] .mykz8fp3{margin-right:-10px}
.mymavskd{color:rgba(var(--primary-strong-rgb),.55)}
.myzbk5ck{color:var(--empty-state-icon)}
.mz6luxmp{padding-bottom:84px}
.n0kqff35{color:var(--icon-secondary)}
.n0uige08{animation-name:o1lewlc5-B}
.n0ziumnz{padding-bottom:9px}
.n1yiu2zv{padding-top:6px}
.n25td99q{cursor:move}
.n32e9pn8{max-width:540px}
.n3bptxsn{padding-bottom:15px}
html:not([dir='rtl']) .n3fdhnkw{margin-right:-6px}
html[dir='rtl'] .n3fdhnkw{margin-left:-6px}
.n3gni4gr{height:348px}
html:not([dir='rtl']) .n3l3zu01{border-bottom-left-radius:14px}
html[dir='rtl'] .n3l3zu01{border-bottom-right-radius:14px}
.n3nyt3io{cursor:text}
.n43pk08i{height:var(--preview-thumb-size)}
.n45ix5k8{background-color:var(--border-panel)}
.n4sj4qlz{top:20vh}
html:not([dir='rtl']) .n58sa971{border-bottom-left-radius:50px}
html[dir='rtl'] .n58sa971{border-bottom-right-radius:50px}
.n5a6z3tu{margin-bottom:-12px}
html:not([dir='rtl']) .n642r0m2{right:18px}
html[dir='rtl'] .n642r0m2{left:18px}
html:not([dir='rtl']) .n6habkpv{margin-left:66px}
html[dir='rtl'] .n6habkpv{margin-right:66px}
@keyframes n6o53yaz-B{0%{transform:scale(1.2);}70%{opacity:1;transform:scale(1.7);}100%{opacity:0;transform:scale(.1);}}
.n73lgpzo{width:var(--compose-box-full-open-menu-width)}
.n791o4v8{opacity:.5}
.n803nsoz{bottom:40px}
.n8lfltvd{gap:24px}
.n8sohn9f{max-width:125px}
.nammujze{max-height:16px}
.nbciif1m{transition-duration:.15s}
.nbczt5ty{z-index:var(--layer-2)}
.nbipi2bn{font-weight:bold}
.ncl55kzk{z-index:9999}
.nda8hbbf{padding-top:38px}
.ndlvrqf7{margin-bottom:2em}
.nel0soo2{overflow-y:inherit}
.neme6l2y{vertical-align:middle}
.nfc7olq2{width:49px}
.nfki698u{z-index:111}
.nfnc8vpt{max-height:535px}
.ngycyvoj{margin-bottom:6px}
.nhajnb67{width:436px}
.nhwamvof{min-height:49px}
.nioqejvd{height:calc(100% - 60px)}
html:not([dir='rtl']) .nji5cgl4{left:-1px}
html[dir='rtl'] .nji5cgl4{right:-1px}
.njub1g37{margin-bottom:7px}
html:not([dir='rtl']) .nlio6qai{border-bottom-left-radius:9999px}
html[dir='rtl'] .nlio6qai{border-bottom-right-radius:9999px}
.nlnf8xo7{padding-top:20px}
.nlxcpvin{letter-spacing:1.5px}
.nmeg1xfo{clip:rect(0 0 0 0)}
.nmreelbr{animation-name:eirysc09-B}
html:not([dir='rtl']) .nnr224yo{border-bottom-right-radius:99999px}
html[dir='rtl'] .nnr224yo{border-bottom-left-radius:99999px}
html:not([dir='rtl']) .nntdgyy8{padding-left:19px}
html[dir='rtl'] .nntdgyy8{padding-right:19px}
.noboit18{height:62px}
.notw83rv{opacity:.25}
.npn6ik2d{width:calc(var(--width-video-link-preview-bubble) - 6px + 10px)}
.nq7eualt{animation-duration:.3s}
html:not([dir='rtl']) .nqm9sais{border-bottom-right-radius:var(--radius-bubble)}
html[dir='rtl'] .nqm9sais{border-bottom-left-radius:var(--radius-bubble)}
html:not([dir='rtl']) .nqtxkp62{padding-left:12px}
html[dir='rtl'] .nqtxkp62{padding-right:12px}
.nrvfj28n{transition-property:border-color}
.ns59xd2u{flex-wrap:wrap-reverse}
html:not([dir='rtl']) .nsd82api{border-bottom-right-radius:calc(var(--radius-app) - 1px)}
html[dir='rtl'] .nsd82api{border-bottom-left-radius:calc(var(--radius-app) - 1px)}
html:not([dir='rtl']) .nsmajyb3{left:30px}
html[dir='rtl'] .nsmajyb3{right:30px}
.nt24zk05{background-color:var(--poll-disabled-checked-checkbox-receiver)}
.ntadmmlx{height:102px}
html:not([dir='rtl']) .ntr8esoy{margin-right:7px}
html[dir='rtl'] .ntr8esoy{margin-left:7px}
.ntz4oiyn{z-index:101}
html:not([dir='rtl']) .nu34rnf1{padding-left:8px}
html[dir='rtl'] .nu34rnf1{padding-right:8px}
.nu7pwgvd{min-height:0}
.nucpke6t{min-width:48px}
.nuiuantz{color:var(--chip-button-foreground)}
.nv3qcefw{overflow-y:visible}
html:not([dir='rtl']) .nvib3uz4{padding-left:76px}
html[dir='rtl'] .nvib3uz4{padding-right:76px}
.nwg1e4mw{width:420px}
html:not([dir='rtl']) .nx7izn6y{border-bottom-right-radius:32px}
html[dir='rtl'] .nx7izn6y{border-bottom-left-radius:32px}
html:not([dir='rtl']) .nxn8agaf{margin-left:-4px}
html[dir='rtl'] .nxn8agaf{margin-right:-4px}
html:not([dir='rtl']) .ny9rbx4l{border-bottom-right-radius:3.5px}
html[dir='rtl'] .ny9rbx4l{border-bottom-left-radius:3.5px}
.nylzjxre{margin-top:30px}
.nym7wvdi{margin-bottom:1.75rem}
.nypubj7v{gap:10px}
.nz2484kf{color:transparent}
.nz9pocw8{color:var(--button-round-background)}
html:not([dir='rtl']) .nzcjdldu{margin-left:16px}
html[dir='rtl'] .nzcjdldu{margin-right:16px}
.o0rubyzf{color:var(--link)}
.o0vrdr7e{max-height:90px}
html:not([dir='rtl']) .o0wkt7aw{border-bottom-left-radius:2px}
html[dir='rtl'] .o0wkt7aw{border-bottom-right-radius:2px}
.o12a8ak1{transform-origin:left}
.o12azb7x{background-color:var(--poll-bar-fill-sender)}
html:not([dir='rtl']) .o1cmhq28{margin-left:10.5px}
html[dir='rtl'] .o1cmhq28{margin-right:10.5px}
.o1dusru6{height:33px}
@keyframes o1lewlc5-B{from{opacity:0;}to{opacity:1;}}
.o22r6p4i{width:76px}
.o27ac25e{background-color:var(--product-placeholder-background)}
.o2es7gts{align-self:center}
.o2sglzf9{color:rgba(var(--danger-rgb),.65)}
.o2v2jkg7{color:var(--button-secondary)}
html:not([dir='rtl']) .o2zu3hjb{border-bottom-left-radius:50%}
html[dir='rtl'] .o2zu3hjb{border-bottom-right-radius:50%}
.o38k74y6{font-size:.6875rem}
.o3jcrxmo{color:var(--message-placeholder-icon)}
.o3plsq22{max-height:calc(var(--preview-thumb-size) * 3)}
.o404977b{min-height:151px}
.o4oavg8t{color:var(--map-overlay-foreground)}
.o4u7okr9{justify-content:space-between}
.o779q1nt{max-width:650px}
.o8fg3bdd{background-color:var(--map-overlay-background)}
html:not([dir='rtl']) .o8gxb310{--T68779821:0 2px 5px 0 rgba(var(--shadow-rgb),.26),0 2px 10px 0 rgba(var(--shadow-rgb),.16);box-shadow:0 2px 5px 0 rgba(var(--shadow-rgb),.26),0 2px 10px 0 rgba(var(--shadow-rgb),.16)}
html[dir='rtl'] .o8gxb310{--T68779821:0 2px 5px 0 rgba(var(--shadow-rgb),.26), 0 2px 10px 0 rgba(var(--shadow-rgb),.16);box-shadow:0 2px 5px 0 rgba(var(--shadow-rgb),.26), 0 2px 10px 0 rgba(var(--shadow-rgb),.16)}
html:not([dir='rtl']) .o93wvyfv{border-top-right-radius:3px}
html[dir='rtl'] .o93wvyfv{border-top-left-radius:3px}
.o9i7y497{margin-top:-1px}
.o9wlm8ph{-webkit-transition:-webkit-filter .16s linear}
.oa9ii99z{transition-timing-function:cubic-bezier(.4,0,.2,1)}
.oauresqk{animation-duration:1s}
.obt84bhp{margin-top:-24px}
.ocd2b0bc{padding-top:3px}
.ocs0cmsa{min-height:24px}
.octy2vkd{color:white}
.odoy9p39{color:var(--ptt-draft-button-stop)}
.odxhw97a{top:2px}
html:not([dir='rtl']) .oer0kere{border-top-left-radius:9999px}
html[dir='rtl'] .oer0kere{border-top-right-radius:9999px}
.ofb4x1dx{margin-bottom:22px}
.ofejerhi{text-transform:uppercase}
.ofrvpfun{min-height:165px}
.og7unhan{background-color:rgba(233,28,67,.3)}
html:not([dir='rtl']) .ohq8n1fk{right:12px}
html[dir='rtl'] .ohq8n1fk{left:12px}
.ohuqqxaf{height:45px}
html:not([dir='rtl']) .ohzpzhf7{border-top-right-radius:60px}
html[dir='rtl'] .ohzpzhf7{border-top-left-radius:60px}
.oimozejp{width:19.5px}
html:not([dir='rtl']) .ojci89ib{margin-right:1px}
html[dir='rtl'] .ojci89ib{margin-left:1px}
html:not([dir='rtl']) .okbql4zm{left:6px}
html[dir='rtl'] .okbql4zm{right:6px}
.okhds9gt{height:$height-pane-footer}
.okm7a8wg{-webkit-clip-path:inset(50%);clip-path:inset(50%)}
.okw0zzku{cursor:auto}
html:not([dir='rtl']) .om6y7gxh{margin-right:2px}
html[dir='rtl'] .om6y7gxh{margin-left:2px}
.om7fnf5u{padding-top:1.5px}
.omdkrxc4{line-height:1.47}
.omzt3tek{line-height:14px}
html:not([dir='rtl']) .ooj5yc5b{border-top-right-radius:8px}
html[dir='rtl'] .ooj5yc5b{border-top-left-radius:8px}
html:not([dir='rtl']) .oov82czi{border-bottom-left-radius:25px}
html[dir='rtl'] .oov82czi{border-bottom-right-radius:25px}
.opbtbchl{top:-34px}
.opp68qpq{margin-top:10px}
.oq31bsqd{padding-bottom:8px}
.oq44ahr5{flex-shrink:0}
.oqp0d33z{margin-bottom:25px}
.oqukxxk7{color:var(--button-reject)}
.or9x5nie{margin-bottom:8px}
.ora14ekb{overflow-x:visible}
.ormcsqwh{overflow-x:scroll}
.os0tgls2{background-color:var(--button-round-background)}
html:not([dir='rtl']) .osk001mr{border-bottom-right-radius:999px}
html[dir='rtl'] .osk001mr{border-bottom-left-radius:999px}
.osuelnrh{background-color:var(--product-thumb-background)}
.osz0hll6{animation-name:sl8wg78j-B}
.ot1opfol{width:var(--preview-thumb-size-small)}
.otypc3uk{width:var(--quote-right-margin)}
.ou3430m0{-webkit-backface-visibility:hidden;backface-visibility:hidden}
.ou6eaia9{right:7px}
.ourv9g48{--T68779821:0 -1px 3px -3px var(--shadow-light);box-shadow:0 -1px 3px -3px var(--shadow-light)}
.ov069gg1{height:38px}
.ovhn1urg{background-color:var(--unread-marker-background)}
.ovllcyds{font-size:0.8125rem}
.ovutvysd{background-color:white}
.oxe6ytxh{background-image:linear-gradient(rgba(0,0,0,0) 70%,rgba(0,0,0,.6) 100%)}
.oxqu41e7{width:5%}
.oxt0snpo{height:258px}
.oybnjv0e{top:calc((var(--compose-box-menu-height) - 2 * var(--compose-box-top-bottom-padding) - 26) * .5)}
html:not([dir='rtl']) .oybqnh0n{margin-left:48px}
html[dir='rtl'] .oybqnh0n{margin-right:48px}
html:not([dir='rtl']) .oz083wsx{margin-right:12px}
html[dir='rtl'] .oz083wsx{margin-left:12px}
html:not([dir='rtl']) .oz0g9ue8{margin-left:6px}
html[dir='rtl'] .oz0g9ue8{margin-right:6px}
.p0tugu6q{padding-top:2px!important}
.p1zdgkh6{background-color:var(--modal-backdrop)}
.p2rjqpw5{opacity:.9}
html:not([dir='rtl']) .p2tfx3a3{padding-left:calc(50% - 250px)}
html[dir='rtl'] .p2tfx3a3{padding-right:calc(50% - 250px)}
.p357zi0d{display:flex}
html:not([dir='rtl']) .p3lsiedt{margin-left:5px}
html[dir='rtl'] .p3lsiedt{margin-right:5px}
.p3nha244{transition-property:height}
.p3z46sn7{animation-name:n6o53yaz-B}
.p41u7gyj{background-color:var(--pip-player-background)}
@keyframes p457vbfl-B{100%{background-position-x:100%;}}
.p45gu9p9{padding-bottom:var(--bubble-padding)}
.p4t1lx4y{transition-duration:.3s}
.p51fsnpc{background-color:var(--search-input-container-background)}
.p56o3wws{width:70%}
.p5g9vl8k{color:var(--text-primary)}
.p6im964z{top:-999999px}
.p6nhtbpp{color:var(--business-name-subtitle)}
.p7idzaix{color:var(--gray-30)}
.p8yhldks{font-family:'Bryndan-Write'}
.p9a4hubg{padding-bottom:14px}
.p9fp32ui{font-size:1.25rem}
.p9jsab73{line-height:12px}
.pa888v5w{transition-duration:.5s}
.paaq2zjn{top:calc(-1 * var(--blur-radius-thumbnail))}
html:not([dir='rtl']) .paav9g0k{--T68779821:0 17px 50px 0 rgba(var(--shadow-rgb),.19),0 12px 15px 0 rgba(var(--shadow-rgb),.24);box-shadow:0 17px 50px 0 rgba(var(--shadow-rgb),.19),0 12px 15px 0 rgba(var(--shadow-rgb),.24)}
html[dir='rtl'] .paav9g0k{--T68779821:0 17px 50px 0 rgba(var(--shadow-rgb),.19), 0 12px 15px 0 rgba(var(--shadow-rgb),.24);box-shadow:0 17px 50px 0 rgba(var(--shadow-rgb),.19), 0 12px 15px 0 rgba(var(--shadow-rgb),.24)}
.pahbacuu{color:var(--poll-invalid-warning-icon-color)}
html:not([dir='rtl']) .pap8jtso{border-top-left-radius:20%}
html[dir='rtl'] .pap8jtso{border-top-right-radius:20%}
html:not([dir='rtl']) .paxyh2gw{border-top-right-radius:var(--radius-thumb)}
html[dir='rtl'] .paxyh2gw{border-top-left-radius:var(--radius-thumb)}
.pazt69qo{min-height:56px}
.pbdh3dnj{background-color:var(--button-round-background-inverted)}
html:not([dir='rtl']) .pbp0z3j0{padding-right:13px}
html[dir='rtl'] .pbp0z3j0{padding-left:13px}
.pbzwqulz{background-color:var(--ptt-gray-badge)}
.pcbmd69e{padding-bottom:18px}
.pcpjcif5{z-index:-10}
.pcx1034m{margin-top:-30px}
.pdhqso7h{background-color:var(--poll-bar-fill-receiver)}
.pel5o5rz{margin-bottom:0!important}
.pev8zhet{animation-name:pq09yad9-B}
.pewhpk3o{animation-name:pzfsvsci-B}
.pext2d22{animation-duration:.4s}
html:not([dir='rtl']) .pfv1hzq5{padding-right:var(--blur-radius-thumbnail)}
html[dir='rtl'] .pfv1hzq5{padding-left:var(--blur-radius-thumbnail)}
.pfvztjrm{line-height:1.5em}
.pgamn86x{color:rgba(var(--status-secondary-rgb),.4)}
.pglj95m3{z-index:var(--layer-9)}
.pgz13gmm{bottom:-4px}
.ph7hol3q{color:var(--link-preview-lighter)}
.phqmzxqs{font-size:100%}
.phxz9vjq{margin-top:1.5em}
html:not([dir='rtl']) .pi22tx4b{border-bottom-right-radius:25px}
html[dir='rtl'] .pi22tx4b{border-bottom-left-radius:25px}
.pjbr9b9i{padding-bottom:7px}
.pjnyesq6{top:47px}
.pkk2s34l{background-color:var(--video-player-background)}
.pknvbjv8{bottom:80px}
html:not([dir='rtl']) .pkud3j3x{border-bottom-left-radius:6px}
html[dir='rtl'] .pkud3j3x{border-bottom-right-radius:6px}
html:not([dir='rtl']) .pl8jymf4{left:58px}
html[dir='rtl'] .pl8jymf4{right:58px}
.plagcuwv{max-width:380px}
.plmgw4ct{background-color:var(--poll-bar-container-receiver)}
.pm5hny62{color:var(--secondary)}
html:not([dir='rtl']) .pmmx02fg{margin-left:-7px}
html[dir='rtl'] .pmmx02fg{margin-right:-7px}
html:not([dir='rtl']) .pnfw7ual{padding-right:58px}
html[dir='rtl'] .pnfw7ual{padding-left:58px}
html:not([dir='rtl']) .poiibwu2{margin-right:24px}
html[dir='rtl'] .poiibwu2{margin-left:24px}
html:not([dir='rtl']) .pox2cllw{border-top-right-radius:25px}
html[dir='rtl'] .pox2cllw{border-top-left-radius:25px}
.pp1m8hwk{color:var(--intro-secondary)}
.pp8r7oc8{color:rgba(var(--inverse-rgb),.9)}
.ppled2lx{height:100%}
.ppup7n5u{z-index:990}
.ppv8chjk{background-color:rgba(var(--white-rgb),.2)}
.ppypbuwx{padding-top:2px}
@keyframes pq09yad9-B{0%{transform:translateY(-17px);}100%{transform:translateY(0);}}
.pqvv99ib{animation-timing-function:cubic-bezier(.1,.82,.25,1);}
.prstqlfy{min-width:90px}
.prv4wu9t{color:var(--secondary-stronger)}
.przvwfww{padding-bottom:0}
html:not([dir='rtl']) .psacz3a6{padding-right:var(--width-album-extra-padding)}
html[dir='rtl'] .psacz3a6{padding-left:var(--width-album-extra-padding)}
.psqdn66s{-webkit-line-clamp:10}
.ptatjang{left:4px}
.ptcoeott{stroke:var(--spinner-incoming)}
.ptxfukc7{height:124px}
.pu4k07i0{transition-timing-function:ease}
.pu5bh2m8{background-color:var(--forward-caption-preview-content)}
.puskumha{background-color:var(--tooltip-background)}
.pvbam5uh{line-height:24px}
.pwaghgrf{min-width:100px}
.px10qoeu{z-index:200}
html:not([dir='rtl']) .pxhxxqu1{border-top-right-radius:32px}
html[dir='rtl'] .pxhxxqu1{border-top-left-radius:32px}
html:not([dir='rtl']) .pxobjmf4{padding-left:var(--padding-drawer-side)}
html[dir='rtl'] .pxobjmf4{padding-right:var(--padding-drawer-side)}
.pxvlsfnc{padding-top:15px}
.pydpkpus{height:90px}
.pz0xruzv{margin-bottom:15px}
.pz6hjxg7{width:20px!important}
html:not([dir='rtl']) .pz6oj2k2{border-top-right-radius:50px}
html[dir='rtl'] .pz6oj2k2{border-top-left-radius:50px}
@keyframes pzfsvsci-B{0%{right:100%;left:-35%;}60%{right:-90%;left:100%;}100%{right:-90%;left:100%;}}
.q177n8ra{top:18px}
.q1js4oc8{color:var(--status-secondary-stronger)}
.q1n4p668{height:56px}
.q1nnjopg{padding-bottom:17px}
.q1tx93la{padding-bottom:28px}
.q297boen{z-index:1001}
.q3aarhc9{min-width:var(--preview-thumb-size)}
html:not([dir='rtl']) .q471nw87{margin-right:5px}
html[dir='rtl'] .q471nw87{margin-left:5px}
.q5jc98e4{line-height:16px}
.q5zg7svt{animation-delay:.1s}
.q6jn18b9{width:656px}
.q6wg26sa{line-height:1.3}
.q70jrbp7{color:var(--chat-meta)}
.q7l348o2{flex-basis:50%}
.q7zw29cd{height:70px}
.q82cfhbg{right:20px}
.q8xcl7qa{height:64px}
.q9lllk4z{font-size:1.5rem}
.qaop2s2o{stroke:rgba(var(--white-rgb),.9)}
.qbqilfqo{padding-top:1px}
html:not([dir='rtl']) .qcdmbpik{padding-right:20}
html[dir='rtl'] .qcdmbpik{padding-left:20}
.qcuzhokb{color:var(--reaction-button)}
.qdcfy29e{max-height:400px}
html:not([dir='rtl']) .qf85nsmm{padding-right:var(--bubble-padding)}
html[dir='rtl'] .qf85nsmm{padding-left:var(--bubble-padding)}
.qfejxiq4{text-align:center}
.qg52vu03{line-height:25px}
.qg8w82as{width:19px}
.qgpfrw6h{height:22px}
.qibyn6m3{display:none}
html:not([dir='rtl']) .qiohso4h{padding-left:1px}
html[dir='rtl'] .qiohso4h{padding-right:1px}
.qiqvuef5{color:var(--white)}
.qispqosg{color:var(--poll-button-disabled-receiver)}
html:not([dir='rtl']) .qj4wrk6p{border-top-right-radius:var(--radius-app)}
html[dir='rtl'] .qj4wrk6p{border-top-left-radius:var(--radius-app)}
.qj9ovlz3{background-color:#FFF}
.qjp6ryme{z-index:4}
html:not([dir='rtl']) .qkgcnfab{padding-right:2em}
html[dir='rtl'] .qkgcnfab{padding-left:2em}
.qlb265nb{padding-top:9px}
.qlcjp10l{top:10px}
.qlylaf53{margin-top:40px}
.qmp0wt83{height:50px}
.qnwaluaf{background-size:cover}
html:not([dir='rtl']) .qnz2jpws{margin-left:4px}
html[dir='rtl'] .qnz2jpws{margin-right:4px}
html:not([dir='rtl']) .qo25nl7o{left:16px}
html[dir='rtl'] .qo25nl7o{right:16px}
.qomlamqu{padding-top:5px}
.qpocut9d{left:8px}
.qpqgzaqc{left:1px}
.qpsqveag{background-color:#000}
.qpz0rf1m{background-color:var(--media-editor-image-caption-input-background)}
.qq0sjtgm{top:0}
.qqhth2cz{background-color:var(--progress-background)}
.qqs366u4{background-color:var(--panel-background)}
html:not([dir='rtl']) .qquthbrt{padding-left:32px}
html[dir='rtl'] .qquthbrt{padding-right:32px}
html:not([dir='rtl']) .qre9j5mv{padding-right:28px}
html[dir='rtl'] .qre9j5mv{padding-left:28px}
.qrhr4x0p{background-color:var(--multi-skin-tone-picker-emoji-selected-background)}
.qrsyb3yy{margin-bottom:3%}
.qsdp9nde{width:45px}
.qssinsw9{width:40px}
.qst3sjxx{height:19px}
.qsxhpkal{height:12px}
html:not([dir='rtl']) .qt3358re{padding-left:48px}
html[dir='rtl'] .qt3358re{padding-right:48px}
.qt60bha0{margin-top:4px}
.qtkrkp8h{padding-bottom:$chat-spacing}
.quhpggp2{width:calc(var(--width-video-link-preview-bubble) + 4px)}
.qw8wxbb9{animation-duration:3s}
.qwwpii8a{left:23px}
.qwzl264q{z-index:999}
html:not([dir='rtl']) .qzcg2mmc{border-top-left-radius:32px}
html[dir='rtl'] .qzcg2mmc{border-top-right-radius:32px}
.qzdlxc9r{background-color:var(--button-reject-background-hover)}
html:not([dir='rtl']) .qzp46edm{left:4px}
html[dir='rtl'] .qzp46edm{right:4px}
.qzvtbs9h{flex-direction:column-reverse}
.r0at9tra{width:74px}
.r0t2rwfu{filter:blur(5px)}
.r15c9g6i{align-items:flex-start}
html:not([dir='rtl']) .r18xjin9{border-top-left-radius:50px}
html[dir='rtl'] .r18xjin9{border-top-right-radius:50px}
html:not([dir='rtl']) .r1ncx0sg{border-bottom-right-radius:10px}
html[dir='rtl'] .r1ncx0sg{border-bottom-left-radius:10px}
.r1vzeywj{max-width:240px}
.r1zrmw6q{background-color:var(--panel-header-icon)}
.r219jyu0{padding-bottom:20px}
.r2tlnwpb{color:var(--button-approve-hover)}
.r2u2pyhj{margin-bottom:32px}
.r428hpel{max-height:auto}
.r4cqfcp6{padding-bottom:2px!important}
.r5imph41{margin-bottom:-2px}
.r5qsrrlp{line-height:20px}
html:not([dir='rtl']) .r67mms0c{margin-right:0!important}
html[dir='rtl'] .r67mms0c{margin-left:0!important}
.r6au09pb{flex-basis:100%}
.r6jd426a{align-items:flex-end}
.r6jkzfdg{background-color:var(--avatar-circle-green-light)}
.r6unq4of{--T68779821:0 0 0 3px rgba(var(--focus-rgb),.5);box-shadow:0 0 0 3px rgba(var(--focus-rgb),.5)}
html:not([dir='rtl']) .r6x3u63k{margin-left:30px}
html[dir='rtl'] .r6x3u63k{margin-right:30px}
html:not([dir='rtl']) .r76eoqdq{right:-13px}
html[dir='rtl'] .r76eoqdq{left:-13px}
.r7fjleex{overflow-y:hidden}
.r7focko8{color:rgba(var(--primary-strong-rgb),.1)}
.r7wby6hd{background-color:var(--archived-chat-marker-background)}
.r7yn1a4o{min-width:18px}
.r83rrh3w{color:var(--quick-action-button)}
.r8dd7jr1{top:8px}
.r8knbtme{font-size:0.625rem}
.r8quorc8{color:var(--ptt-draft-button-cancel)}
html:not([dir='rtl']) .r9gcara8{margin-right:80px}
html[dir='rtl'] .r9gcara8{margin-left:80px}
html:not([dir='rtl']) .r9i70cnq{left:65px}
html[dir='rtl'] .r9i70cnq{right:65px}
.ra71746h{height:105px}
.rahkaw8d{color:rgba(var(--primary-stronger-rgb),.55)}
html:not([dir='rtl']) .ramqyho6{margin-right:2rem}
html[dir='rtl'] .ramqyho6{margin-left:2rem}
.rbcxfhjb{max-width:var(--width-album-grid-bubble)}
.rbdaq05k{color:var(--color-black)}
.rc6mlzu0{-webkit-appearance:none}
.rcg4vxlo{cursor:inherit}
.rd228egi{height:44px}
.re3l9645{color:var(--cell-chat-secondary-color,var(--secondary))}
.re70xkk9{top:45px}
.rek1qe2c{margin-top:1em}
html:not([dir='rtl']) .rezueyon{right:14px}
html[dir='rtl'] .rezueyon{left:14px}
html:not([dir='rtl']) .rfxpxord{border-top-right-radius:24px}
html[dir='rtl'] .rfxpxord{border-top-left-radius:24px}
.rgji5j3u{bottom:44px}
.rgvqn4sm{min-width:2.25em}
.rgztdhlt{transform-origin:center center}
html:not([dir='rtl']) .rh5xaqwm{border-bottom-right-radius:7px}
html[dir='rtl'] .rh5xaqwm{border-bottom-left-radius:7px}
.rhe1kc9j{filter:drop-shadow(-1px 1px 1px rgba(0,0,0,.5))}
.rigundgh{will-change:opacity}
html:not([dir='rtl']) .riy2oczp{padding-left:.4em}
html[dir='rtl'] .riy2oczp{padding-right:.4em}
.rjkg9koz{bottom:-5px}
.rjo8vgbg{flex-basis:0}
.rjxfi64q{height:var(--sticker-size-details)}
.rk2490ta{text-align:initial}
.rkip0xea{margin-bottom:9px}
.rku33uoa{padding-bottom:calc(var(--width-album-extra-padding) + 22px)}
html:not([dir='rtl']) .rkwf9n1l{left:inherit}
html[dir='rtl'] .rkwf9n1l{right:inherit}
.rkwy1u70{max-width:420px}
.rkx9gk34{margin-bottom:-4px}
.rkxvyd19{user-select:none;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none}
.rl8piizt{top:-30px}
html:not([dir='rtl']) .rmnzjp8r{padding-right:60px}
html[dir='rtl'] .rmnzjp8r{padding-left:60px}
html:not([dir='rtl']) .rmtqb32e{padding-right:25px}
html[dir='rtl'] .rmtqb32e{padding-left:25px}
html:not([dir='rtl']) .rn41jex5{padding-left:13px}
html[dir='rtl'] .rn41jex5{padding-right:13px}
.rnigfn14{animation-name:easeekon-B}
.rntbvq1t{margin-top:3em}
.ronsgs3n{background-color:var(--panel-background-lighter)}
.rowl85m6{-webkit-text-decoration-color:var(--primary);text-decoration-color:var(--primary)}
html:not([dir='rtl']) .rpa8ovna{margin-right:75px}
html[dir='rtl'] .rpa8ovna{margin-left:75px}
html:not([dir='rtl']) .rppts313{padding-left:10px}
html[dir='rtl'] .rppts313{padding-right:10px}
.rpvcun8f{overflow-y:scroll}
html:not([dir='rtl']) .rq6dtfpq{border-top-left-radius:var(--radius-bubble)}
html[dir='rtl'] .rq6dtfpq{border-top-right-radius:var(--radius-bubble)}
.rqm6ogl5{height:25px}
.rr4x56ni{background-color:var(--button-approve-background)}
.rrq4r3yd{background-color:var(--incoming-background-deeper)}
.rsmgdaqi{right:5px}
.rsxuate7{--T68779821:0 -1px 3px -3px rgba(var(--shadow-rgb),.16);box-shadow:0 -1px 3px -3px rgba(var(--shadow-rgb),.16)}
.rtue7xhx{width:300px}
.rtx6r8la{transition-duration:.08s}
.ruh8h8mp{max-height:54px}
.rut305bb{bottom:inherit}
.rv6u8h8g{background-color:var(--rich-text-panel-background)}
html:not([dir='rtl']) .rvlagp7p{margin-right:20px}
html[dir='rtl'] .rvlagp7p{margin-left:20px}
.rvmgzurb{width:42px}
html:not([dir='rtl']) .rw274qym{margin-left:-34px}
html[dir='rtl'] .rw274qym{margin-right:-34px}
.rwlvdxyg{align-self:flex-end}
.rwz6x5of{text-indent:2px}
.rx2toazg{background-color:var(--status-thumbnail-background)}
.rx9h9hmn{background-color:var(--disabled-round-button-background-color)}
.rxgtltrb{background-color:rgba(var(--danger-rgb),.5)}
.ryab0j1q{right:auto}
html:not([dir='rtl']) .ryaohf54{margin-right:-3px}
html[dir='rtl'] .ryaohf54{margin-left:-3px}
html:not([dir='rtl']) .rykvhg4p{border-top-right-radius:11px}
html[dir='rtl'] .rykvhg4p{border-top-left-radius:11px}
.rys9xrs2{z-index:3}
.rz1eta6h{background-color:var(--drawer-loading-backgroud)}
.s0bejz76{animation-name:jlc02bb6-B}
.s0eflmyh{background-color:var(--outgoing-background-deeper)}
.s11ka3oa{margin-top:9px}
.s15egc35{margin-top:0!important}
.s19nnkrm{background-color:var(--qc-quantity-label-highlighted-background)}
.s1e5xcja{justify-content:space-evenly}
html:not([dir='rtl']) .s2vc4xk1{border-bottom-right-radius:2px}
html[dir='rtl'] .s2vc4xk1{border-bottom-left-radius:2px}
@keyframes s2wya820-B{0%{transform:scale(0,0);}20%{transform:scale(0,0);}100%{transform:scale(1,1);}}
html:not([dir='rtl']) .s4eafire{left:calc(-1 * var(--blur-radius-thumbnail))}
html[dir='rtl'] .s4eafire{right:calc(-1 * var(--blur-radius-thumbnail))}
.s4k44ver{color:var(--icon-lighter)}
.s4r5ooj2{min-width:var(--min-width-app)}
.s4recxw2{color:#86A3B3}
.s52zzds6{text-shadow:0 0 1px rgba(var(--shadow-rgb),.36)}
html:not([dir='rtl']) .s5g3tb4o{right:-40px}
html[dir='rtl'] .s5g3tb4o{left:-40px}
.s5iwbdjo{background-color:var(--search-input-background)}
.s5lidh1j{z-index:99}
html:not([dir='rtl']) .s5zjn0bc{border-top-left-radius:var(--command-palette-border-radius)}
html[dir='rtl'] .s5zjn0bc{border-top-right-radius:var(--command-palette-border-radius)}
@keyframes s71btfur-B{0%{transform:translateY(-17px);}100%{transform:translateY(17px);}}
.s79hpmcy{transform-origin:center}
.s7fqlky6{padding-top:22px}
html:not([dir='rtl']) .s7jcu7x1{right:-7px}
html[dir='rtl'] .s7jcu7x1{left:-7px}
.s7u03v8d{-webkit-line-clamp:3}
.s7ynmu90{bottom:2px}
.s88au2vo{height:20px!important}
.s8gyl5p1{padding-bottom:2px}
.s9fl9ege{padding-bottom:var(--padding-drawer-bottom)}
.s9lgn3x7{background-color:rgba(0,0,0,.3)}
.s9raicp8{background-color:var(--archived-chat-persistent-header-background)}
html:not([dir='rtl']) .s9xya5d7{padding-left:36px}
html[dir='rtl'] .s9xya5d7{padding-right:36px}
html:not([dir='rtl']) .sa2xs5zj{border-bottom-right-radius:50px}
html[dir='rtl'] .sa2xs5zj{border-bottom-left-radius:50px}
.sabn9a5k{color:var(--document-meta)}
.sai7fuui{height:32px}
.sap93d0t{flex-direction:row}
.sazkszsz{width:10px}
.sb4iah7d{line-height:1.1667}
.sbdla0oe{background-color:red}
.sbs3osm6{color:var(--primary-muted)}
html:not([dir='rtl']) .sd2p8cyi{margin-left:-3px}
html[dir='rtl'] .sd2p8cyi{margin-right:-3px}
.sdfuwbjb{min-height:100%}
html:not([dir='rtl']) .sdo006nr{cursor:w-resize}
html[dir='rtl'] .sdo006nr{cursor:e-resize}
.sdtr5tj1{height:104px}
.se2m7z6i{background-color:var(--drawer-background-deep)}
.se52eggw{background-color:var(--announcement-speaker-background)}
.seuajalt{color:var(--button-bubble)}
.sf5lfgas{top:calc(50% - 16px)}
html:not([dir='rtl']) .sfeitywo{border-bottom-right-radius:var(--radius-thumb)}
html[dir='rtl'] .sfeitywo{border-bottom-left-radius:var(--radius-thumb)}
.sfq62bwo{background-color:var(--poll-disabled-checked-checkbox-sender)}
.sg3pxicu{object-fit:contain}
.sgifyl94{width:90px}
.sh5ccnuw{height:calc(100% - var(--h-pane-header))}
.shdiholb{font-family:inherit}
.shq0pg4y{filter:drop-shadow(0 1px 4px rgba(var(--shadow-rgb),.25))}
.shxf19cy{min-height:175px}
.sid27bd6{line-height:17px}
.siuioimt{height:var(--height-video-thumb)}
html:not([dir='rtl']) .sjajxv0r{padding-right:40px}
html[dir='rtl'] .sjajxv0r{padding-left:40px}
.sjyhwr5o{background-color:none}
.sku37djt{stroke:var(--spinner-highlight)}
@keyframes sl8wg78j-B{0%{opacity:0;}100%{opacity:1;}}
.slgfab0f{padding-bottom:30px}
.slppp3mo{transition-duration:.1s}
.smoo1fur{height:54px}
.smvc51u0{height:182px}
html:not([dir='rtl']) .snweb893{padding-left:3px}
html[dir='rtl'] .snweb893{padding-right:3px}
.snyj76hw{position:fixed}
.snzbljq1{width:210px}
html:not([dir='rtl']) .spjzgwxb{margin-right:10px}
html[dir='rtl'] .spjzgwxb{margin-left:10px}
.spqnsr0h{color:var(--button-reject-hover)}
.sptw4ec9{height:131px}
.sq87qsu4{padding-bottom:26px}
.sqt7gjsm{width:38px!important}
.sr23wnuw{width:var(--sticker-size-details)}
.srkn8evo{--T68779821:0 5px 3px -3px var(--shadow-light);box-shadow:0 5px 3px -3px var(--shadow-light)}
.srqslfex{display:inline-table}
.ss1fofi6{background-color:var(--status-primary)}
.ss9a15xu{background-color:var(--status-background)}
.sst5o6l9{background-color:var(--avatar-circle-green-dark)}
.st4e8vvm{--T68779821:0 0 2px rgba(var(--shadow-rgb),.25);box-shadow:0 0 2px rgba(var(--shadow-rgb),.25)}
html:not([dir='rtl']) .sta02ykp{padding-left:24px}
html[dir='rtl'] .sta02ykp{padding-right:24px}
.stnyektq{height:28px}
.suguakab{-webkit-line-clamp:2}
.sujcw0sb{width:69px}
.sunvlxxz{color:var(--ptt-blue)}
.svlsagor{color:var(--icon)}
html:not([dir='rtl']) .svoq16ka{margin-left:0}
html[dir='rtl'] .svoq16ka{margin-right:0}
.svot0ezm{caret-color:var(--primary)}
.svpeipy5{background-color:var(--intro-background)}
.sw4r90y6{animation-duration:1.5s}
.swamzvm4{overflow-x:inherit}
html:not([dir='rtl']) .swewzx26{border-bottom-left-radius:999px}
html[dir='rtl'] .swewzx26{border-bottom-right-radius:999px}
.swltuhs1{-webkit-clip-path:polygon(0 0,50% 0,50% 55%,49% 73%,41% 82%,50% 88%,50% 100%,0 100%);clip-path:polygon(0 0,50% 0,50% 55%,49% 73%,41% 82%,50% 88%,50% 100%,0 100%)}
.sx61ek5s{transform-origin:50% 50%}
html:not([dir='rtl']) .sxdjimme{left:12px}
html[dir='rtl'] .sxdjimme{right:12px}
.sxkbojvh{gap:20px}
.sxl192xd{background-repeat:no-repeat}
.sxls5clz{max-height:calc(var(--width-video-link-preview-bubble) - 6px)}
html:not([dir='rtl']) .sxwtddgj{margin-left:-33px}
html[dir='rtl'] .sxwtddgj{margin-right:-33px}
.sy6s5v3r{font-weight:600}
.syca7q87{background-color:rgba(0,0,0,.5)}
.syhq9jn2{line-height:var(--line-height-quoted-author)}
.t17ktnxr{padding-bottom:80px}
.t1nufmh4{height:28.8px}
.t207h1ry{--T68779821:0 0 0 9999px rgba(var(--shadow-rgb),.4);box-shadow:0 0 0 9999px rgba(var(--shadow-rgb),.4)}
.t2ljgofx{min-height:50px}
.t2quo9z4{padding-top:30}
.t35qvd06{color:var(--input-placeholder)}
.t3g6t33p{background-position:center}
.t3rh7lfs{color:var(--secondary-light)}
.t4tp0euv{line-height:1.7}
.t4z0zxz2{margin-bottom:70px}
.t4zgqcuo{margin-bottom:12px}
.t5t8swlc{height:69px}
.t63vcusb{color:var(--security-icon-shield)}
.t6kzo9t1{background-color:rgba(var(--black-rgb),.15)}
.t7i5gvrw{color:#919191}
.t9hu7tsx{width:calc(100% - 20px)}
html:not([dir='rtl']) .t9wpllip{margin-right:18px}
html[dir='rtl'] .t9wpllip{margin-left:18px}
.tbdapmoc{background-color:var(--wds-cool-gray-500)}
.tbmiozwh{background-repeat:repeat}
html:not([dir='rtl']) .tbx8dua9{padding-left:65px}
html[dir='rtl'] .tbx8dua9{padding-right:65px}
html:not([dir='rtl']) .tcg15ap9{border-top-right-radius:4px}
html[dir='rtl'] .tcg15ap9{border-top-left-radius:4px}
.tcisnlar{width:400px}
html:not([dir='rtl']) .tcyu26xv{padding-right:18px}
html[dir='rtl'] .tcyu26xv{padding-left:18px}
html:not([dir='rtl']) .td5bf8pq{padding-right:50px}
html[dir='rtl'] .td5bf8pq{padding-left:50px}
.tddarlmj{width:34px}
.tdpsya9q{-webkit-clip-path:polygon(0 33%,17% 57%,23% 54%,59% 80%,67% 85%,75% 83%,90% 62%,52% 31%,38% 36%,31% 33%,31% 29%,39% 24%,44% 17%,33% 21%,15% 7%);clip-path:polygon(0 33%,17% 57%,23% 54%,59% 80%,67% 85%,75% 83%,90% 62%,52% 31%,38% 36%,31% 33%,31% 29%,39% 24%,44% 17%,33% 21%,15% 7%)}
html:not([dir='rtl']) .tdx57lpj{padding-left:40px}
html[dir='rtl'] .tdx57lpj{padding-right:40px}
.te4632jy{top:-17px}
.tenvxyss{max-height:28px}
.tffp5ko5{text-align:inherit}
.tffqa6uj{background-color:var(--popup-panel-background)}
.tfhkdmxh{width:640px}
.tfi85p4o{width:calc(100% - 58px)}
html:not([dir='rtl']) .tfm3omh7{border-bottom-left-radius:var(--radius-app)}
html[dir='rtl'] .tfm3omh7{border-bottom-right-radius:var(--radius-app)}
.th20vg8r{margin-top:1.75rem}
.th8ck7tu{--T68779821:0 -1px 3px var(--shadow-light)!important;box-shadow:0 -1px 3px var(--shadow-light)!important}
.thghmljt{z-index:var(--layer-1)}
.thr4l2wc{background-color:transparent}
.tiex1193{min-height:35px}
html:not([dir='rtl']) .tigrmefi{margin-left:9px}
html[dir='rtl'] .tigrmefi{margin-right:9px}
.tio0brup{--T68779821:0 1px 3px var(--shadow-light);box-shadow:0 1px 3px var(--shadow-light)}
.tjqq3gw7{background-color:rgba(var(--overlay-rgb),.7)}
html:not([dir='rtl']) .tkdu00h0{left:0}
html[dir='rtl'] .tkdu00h0{right:0}
.tkmeqcnu{animation-iteration-count:infinite}
.tknnhhou{width:32px}
.tkq7s68q{line-height:1.2}
.tl2vja3b{color:var(--primary-strong)}
.tl6iuc6d{height:86px}
.tng8x1zc{margin-bottom:-7px}
.tnjggqzj{line-height:1.8571}
.to2l77zo{user-select:text;-moz-user-select:text;-webkit-user-select:text;-ms-user-select:text}
.tp4bj0rl{background-color:rgba(0,0,0,.4)}
.tpju1xx5{z-index:10001}
html:not([dir='rtl']) .tpmajp1w{padding-right:.4em}
html[dir='rtl'] .tpmajp1w{padding-left:.4em}
.tqcro9j5{width:30px!important}
.tqh8z113{max-height:var(--quoted-compose-height-full)}
.trnfqnf9{max-height:376px}
.tt14wmjx{-moz-osx-font-smoothing:grayscale}
html:not([dir='rtl']) .tt8exp03{border-top-left-radius:99999px}
html[dir='rtl'] .tt8exp03{border-top-right-radius:99999px}
.tt8xd2xn{margin-top:0}
@keyframes tt97e0k0-B{0%{transform:scale(0);}25%{transform:scale(1.2);}50%{transform:scale(1.2);}75%{transform:scale(.94);}100%{transform:scale(1);}}
.ttegvvei{height:var(--cell-height)}
.tthqcax0{max-width:168px}
.ttixo1rk{will-change:translateX}
.ttu8nud2{flex-shrink:999}
html:not([dir='rtl']) .ttv0su4g{right:-4px}
html[dir='rtl'] .ttv0su4g{left:-4px}
.ttwqun4y{max-width:var(--thumb-width)}
.tukmaf4q{left:0}
.tvdi1vrc{opacity:.22}
.tvf2evcx{flex-grow:0}
.tviruh8d{color:var(--primary)}
.tvjloe4n{min-height:90px}
.tvsr5v2h{padding-top:16px}
.tvsw1x19{max-height:220px}
.ur864smd{background-color:var(--white)}
.v76qf5v1{flex-direction:row-reverse}
.vhqtnu57{-webkit-clip-path:polygon(50% 0,100% 0,100% 100%,50% 100%,50% 50%);clip-path:polygon(50% 0,100% 0,100% 100%,50% 100%,50% 50%)}
.wojub8o1{max-width:450px}
html:not([dir='rtl']) .wu0i2wpa{border-bottom-right-radius:18px}
html[dir='rtl'] .wu0i2wpa{border-bottom-left-radius:18px}
.wvgvrgjz{font-weight:700}
html:not([dir='rtl']) .y4d21rkf{border-top-right-radius:14px}
html[dir='rtl'] .y4d21rkf{border-top-left-radius:14px}
.yn8wkgi7{width:260px}
.ysae3w6m{letter-spacing:0}
.ywgftmbl{width:var(--sticker-size-panel)}
.z4cnh15p{background-color:rgba(0,0,0,.2)}
html:not([dir='rtl']) .zpv227fn{border-bottom-left-radius:var(--radius-compose)}
html[dir='rtl'] .zpv227fn{border-bottom-right-radius:var(--radius-compose)}
.zqptfkjs{grid-column-gap:16px}
.bblgmxd8::before{transform:translateX(0)}
.bsbo06yw::before{transform:translate(-50%,-50%)}
.cai600lj:after{transform:translate(-50%,-50%)}
.ecn6b8u2::before{transform:scale3d(1,1,1)}
.fji5f4ri:after{background:var(--icon)}
.k95pjfv1:before{transform:translate(-50%,-50%)}
@media (min-width: 1024px){.kmu397b4.kmu397b4{flex:0 1 50%}}
.kq7idzux::before{transform:scale3d(0,0,0)}
.ksm4whjd:before{background:rgba(var(--overlay-rgb),1)}
.lupmkxp7::before{transform:translateX(300%)}
.n2obx7p9::after{transform:translate(-50%,-50%)}
.nkmjymgc:before{background:var(--icon)}
.nws64mye::before{transform:translateX(100%)}
.rnzbggcn::before{background:rgba(var(--overlay-rgb),.6)}
.tobsugo9:before{transform:scale(.01)}
.xcz0gzg4::before{transform:translateX(200%)}
html:not([dir='rtl']) .e1cue241:before{border-right:1px solid var(--reactions-bubble-border)}
html[dir='rtl'] .e1cue241:before{border-left:1px solid var(--reactions-bubble-border)}
html:not([dir='rtl']) .ecfmpeow::after{border-right:2px solid rgba(var(--focus-rgb),.5)}
html[dir='rtl'] .ecfmpeow::after{border-left:2px solid rgba(var(--focus-rgb),.5)}
.edpn7icu:before{border-bottom:1px solid var(--reactions-bubble-border)}
html:not([dir='rtl']) .efr419eo:before{border-right:2px solid rgba(var(--inverse-rgb),.1)}
html[dir='rtl'] .efr419eo:before{border-left:2px solid rgba(var(--inverse-rgb),.1)}
html:not([dir='rtl']) .ehkk8km3::after{border-left:3px solid var(--blue-light)}
html[dir='rtl'] .ehkk8km3::after{border-right:3px solid var(--blue-light)}
.h5n1mx1r::after{border-top:3px solid var(--blue-light)}
.h5u7ittv:before{border-top:2px solid rgba(var(--inverse-rgb),.1)}
html:not([dir='rtl']) .hf27ygvl:before{border-left:2px solid rgba(var(--inverse-rgb),.1)}
html[dir='rtl'] .hf27ygvl:before{border-right:2px solid rgba(var(--inverse-rgb),.1)}
.hwm8yfef:before{border-top:1px solid var(--reactions-bubble-border)}
.k2qxvnve:before{border-bottom:2px solid rgba(var(--inverse-rgb),.1)}
html:not([dir='rtl']) .m8pn3r4v::after{border-left:2px solid rgba(var(--focus-rgb),.5)}
html[dir='rtl'] .m8pn3r4v::after{border-right:2px solid rgba(var(--focus-rgb),.5)}
.nb7togzf::after{border-top:2px solid rgba(var(--focus-rgb),.5)}
.nz84ehyz::after{border-bottom:3px solid var(--blue-light)}
html:not([dir='rtl']) .oxr79dxs::after{border-right:3px solid var(--blue-light)}
html[dir='rtl'] .oxr79dxs::after{border-left:3px solid var(--blue-light)}
html:not([dir='rtl']) .sx64hb76:before{border-left:1px solid var(--reactions-bubble-border)}
html[dir='rtl'] .sx64hb76:before{border-right:1px solid var(--reactions-bubble-border)}
.y6oajnjd::after{border-bottom:2px solid rgba(var(--focus-rgb),.5)}
@media screen and (min-width: 1301px){html:not([dir='rtl']) .a21xwfzl.a21xwfzl{left:30%}}
@media screen and (min-width: 1301px){html[dir='rtl'] .a21xwfzl.a21xwfzl{right:30%}}
.a5zjmw75:before{top:-1px}
.a83sq2ph::after{top:-4px}
.a8g7dr2m:before{top:0}
html:not([dir='rtl']) .a9153urd::-ms-thumb{border-bottom-right-radius:50%}
html[dir='rtl'] .a9153urd::-ms-thumb{border-bottom-left-radius:50%}
.a9fxutt7:before{left:50%}
html:not([dir='rtl']) .aa14nhyp::-ms-thumb{border-bottom-left-radius:50%}
html[dir='rtl'] .aa14nhyp::-ms-thumb{border-bottom-right-radius:50%}
html:not([dir='rtl']) .aa3thtin:before{border-bottom-left-radius:50px}
html[dir='rtl'] .aa3thtin:before{border-bottom-right-radius:50px}
@media screen and (min-width: 1441px){.aazg2tqz.aazg2tqz{width:1396px}}
@media (min-width: 1300px){html:not([dir='rtl']) .acdu7ris.acdu7ris{margin-right:-10px}}
@media (min-width: 1300px){html[dir='rtl'] .acdu7ris.acdu7ris{margin-left:-10px}}
.adibp37i::-webkit-slider-thumb{height:12px}
html:not([dir='rtl']) .affkug9a::after{border-top-right-radius:50%}
html[dir='rtl'] .affkug9a::after{border-top-left-radius:50%}
@media screen and (min-height: 1000px){.agj3xlbq.agj3xlbq{margin-top:100px}}
html:not([dir='rtl']) .ajr0z13z:before{padding-left:4px}
html[dir='rtl'] .ajr0z13z:before{padding-right:4px}
.aka0iiqh::before{content:"\25B8"}
@media screen and (min-height: 1000px){html:not([dir='rtl']) .ap935ont.ap935ont{margin-left:0}}
@media screen and (min-height: 1000px){html[dir='rtl'] .ap935ont.ap935ont{margin-right:0}}
html:not([dir='rtl']) .asu8qs9d:before{padding-right:4px}
html[dir='rtl'] .asu8qs9d:before{padding-left:4px}
.atf5nwhf::after{width:70px}
.atsy7pmd:before{width:44px}
.b0f5vxaq:after{display:block}
.b213shb5::before{width:25%}
.b5q10lpa:before{box-shadow:0 2px 30px rgba(0,0,0,.2)}
.badepdzx::before{animation-fill-mode:forwards}
@media (max-width: 1024px){.bazijzwv.bazijzwv{width:14%}}
.beenm9b3::before{top:0}
.bha6utru:before{animation-timing-function:cubic-bezier(.65,0,.35,1),linear}
html:not([dir='rtl']) .bl44g9bl::before{border-bottom-left-radius:var(--radius-thumb)}
html[dir='rtl'] .bl44g9bl::before{border-bottom-right-radius:var(--radius-thumb)}
html:not([dir='rtl']) .boj8yvfr:before{left:-1px}
html[dir='rtl'] .boj8yvfr:before{right:-1px}
@media (max-width: 800px){.btsmn2h9.btsmn2h9{width:calc(87% + 18px)}}
.c0bbmqe2:before{padding-bottom:0}
@media screen and (min-width: 1441px){html:not([dir='rtl']) .c44ed13a.c44ed13a{margin-left:auto}}
@media screen and (min-width: 1441px){html[dir='rtl'] .c44ed13a.c44ed13a{margin-right:auto}}
.c4kjmepz::before{left:50%}
.chh99fau::before{display:block}
@media screen and (max-height: 700px){html:not([dir='rtl']) .ciu2hny1.ciu2hny1{margin-right:0}}
@media screen and (max-height: 700px){html[dir='rtl'] .ciu2hny1.ciu2hny1{margin-left:0}}
html:not([dir='rtl']) .cjjm5daf::after{border-bottom-right-radius:50%}
html[dir='rtl'] .cjjm5daf::after{border-bottom-left-radius:50%}
.ckfn5qle::before{content:""}
@media (min-width: 1024px){.covohgai.covohgai{width:840px}}
html:not([dir='rtl']) .cpexef3b::-webkit-slider-thumb{border-top-right-radius:50%}
html[dir='rtl'] .cpexef3b::-webkit-slider-thumb{border-top-left-radius:50%}
.cstjocha::-ms-thumb{height:12px}
html:not([dir='rtl']) .csvggiwl::-moz-range-thumb{border-bottom-right-radius:50%}
html[dir='rtl'] .csvggiwl::-moz-range-thumb{border-bottom-left-radius:50%}
.cvxgn1dw:before{width:calc(100% - 8px)}
html:not([dir='rtl']) .d1bl3yr6::-webkit-slider-thumb{border-bottom-left-radius:50%}
html[dir='rtl'] .d1bl3yr6::-webkit-slider-thumb{border-bottom-right-radius:50%}
.dbiwaw4z::after{width:3px}
.dg973b83:before{animation-name:m8lv8jz8-B}
html:not([dir='rtl']) .dgvzf84s::before{border-top-right-radius:50%}
html[dir='rtl'] .dgvzf84s::before{border-top-left-radius:50%}
.dgw4ccbq::before{z-index:9}
.dkvli2l0:after{position:absolute}
.dn131129::-ms-thumb{width:12px}
html:not([dir='rtl']) .dowrn9ox::-ms-thumb{border-top-left-radius:50%}
html[dir='rtl'] .dowrn9ox::-ms-thumb{border-top-right-radius:50%}
html:not([dir='rtl']) .dr53e3n4::before{right:0}
html[dir='rtl'] .dr53e3n4::before{left:0}
html:not([dir='rtl']) .dyphzmav::-webkit-slider-thumb{border-top-left-radius:50%}
html[dir='rtl'] .dyphzmav::-webkit-slider-thumb{border-top-right-radius:50%}
.e05q9v5p:before{width:258px}
.e10y1bxp:before{-webkit-backface-visibility:hidden;backface-visibility:hidden}
html:not([dir='rtl']) .e8mfq481:before{border-top-left-radius:50%}
html[dir='rtl'] .e8mfq481:before{border-top-right-radius:50%}
html:not([dir='rtl']) .e8y0iqoj:before{left:0}
html[dir='rtl'] .e8y0iqoj:before{right:0}
html:not([dir='rtl']) .e9cl6z7p:before{box-shadow:0 1px 0 rgba(0,0,0,.07),0 0 3px rgba(0,0,0,.04)}
html[dir='rtl'] .e9cl6z7p:before{box-shadow:0 1px 0 rgba(0,0,0,.07), 0 0 3px rgba(0,0,0,.04)}
.eb03v51h::before{background-color:var(--menu-tabs-list-active)}
.eg5obqgd::-moz-range-thumb{background-color:var(--media-editor-icon-color)}
.eglpomy2::after{z-index:1}
.egohdep1::before{animation-duration:.115s}
@media (max-width:880px){html:not([dir='rtl']) .ekmn1tbb.ekmn1tbb{right:110px}}
@media (max-width:880px){html[dir='rtl'] .ekmn1tbb.ekmn1tbb{left:110px}}
.ekwltmu8::before{width:48px}
@media (min-width: 1024px){.er6vhnn5.er6vhnn5{overflow-y:hidden}}
@media (min-width: 1024px){.esbr2q4m.esbr2q4m{padding-bottom:14px}}
.evuypb09::before{width:100%}
.f0gwgpfb:before{animation-timing-function:cubic-bezier(.83,0,.17,1)}
html:not([dir='rtl']) .f0tdcqsg::-moz-range-thumb{border-top-left-radius:50%}
html[dir='rtl'] .f0tdcqsg::-moz-range-thumb{border-top-right-radius:50%}
.f6d3q6r3::before{animation-duration:.07s}
.f6m8gik5::before{animation-name:dhlqzo2r-B}
.f76rftwh::before{content:"~"}
@media screen and (min-width: 901px) and (max-width: 1024px){html:not([dir='rtl']) .f82bpul8.f82bpul8{left:35%}}
@media screen and (min-width: 901px) and (max-width: 1024px){html[dir='rtl'] .f82bpul8.f82bpul8{right:35%}}
.f8t368tc::-webkit-slider-thumb{background-color:var(--media-editor-icon-color)}
html:not([dir='rtl']) .f9qgu6hk::-ms-thumb{border-top-right-radius:50%}
html[dir='rtl'] .f9qgu6hk::-ms-thumb{border-top-left-radius:50%}
html:not([dir='rtl']) .faao65il::before{border-top-right-radius:var(--radius-thumb)}
html[dir='rtl'] .faao65il::before{border-top-left-radius:var(--radius-thumb)}
.ffcfminx::after{height:82px}
.fikuqynl::after{height:70px}
.flcm9zni::before{height:100%}
html:not([dir='rtl']) .fx6vfo4m::before{left:0}
html[dir='rtl'] .fx6vfo4m::before{right:0}
@media (max-width: 800px){.g3bgiwf5.g3bgiwf5{display:none}}
.g9lbsnvk::before{background-color:var(--reactions-tray-active-round-background)}
.ga96p4vz:before{background-color:var(--reactions-tray-background)}
html:not([dir='rtl']) .gaz0s4oj::before{border-top-left-radius:var(--radius-thumb)}
html[dir='rtl'] .gaz0s4oj::before{border-top-right-radius:var(--radius-thumb)}
@media screen and (min-width: 1441px){html:not([dir='rtl']) .gcgr3cud.gcgr3cud{margin-right:auto}}
@media screen and (min-width: 1441px){html[dir='rtl'] .gcgr3cud.gcgr3cud{margin-left:auto}}
@media screen and (max-width: 850px){.gdbw3fpr.gdbw3fpr{min-width:600px}}
@media (max-width: 1023px){.gi7c5dsw.gi7c5dsw{width:440px}}
.grpxnwfq:before{animation-duration:.52s}
.gtx3tadu:before{will-change:transform,borderRadius}
html:not([dir='rtl']) .h1m5ryc4::after{border-bottom-left-radius:50%}
html[dir='rtl'] .h1m5ryc4::after{border-bottom-right-radius:50%}
@media screen and (min-height: 1000px){.h1tnk6gg.h1tnk6gg{margin-bottom:100px}}
.h67vyybg::-ms-thumb{background-color:var(--media-editor-icon-color)}
html:not([dir='rtl']) .h7jn2p0k:before{border-top-left-radius:var(--radius-thumb)}
html[dir='rtl'] .h7jn2p0k:before{border-top-right-radius:var(--radius-thumb)}
@media (max-width: 1023px){.h8v2zhlv.h8v2zhlv{max-width:235px}}
.harwy2hg:after{left:50%}
.hetm8iza::before{pointer-events:none}
@media (min-width: 1300px){html:not([dir='rtl']) .hfp8519b.hfp8519b{margin-left:-10px}}
@media (min-width: 1300px){html[dir='rtl'] .hfp8519b.hfp8519b{margin-right:-10px}}
@media screen and (max-width: 900px){.hj24v2v0.hj24v2v0{width:40%}}
@media (max-width:880px){.hpb4froj.hpb4froj{text-overflow:ellipsis}}
@media (max-width:880px){.hys5s3z0.hys5s3z0{overflow-x:hidden}}
.i0a739jv::before{height:3px}
.i0r7mfoh:after{height:20px}
.i1pbklkw::before{height:4px}
.i206tstk::before{transition-timing-function:var(--t-ease)}
.i539y0ga::before{white-space:pre}
@media screen and (max-width: 960px){.i8zz5kbb.i8zz5kbb{display:none}}
@media screen and (min-width: 901px) and (max-width: 1023px){.i9ba79ay.i9ba79ay{width:35%}}
@media (min-width: 1024px){html:not([dir='rtl']) .ia382lwg.ia382lwg{margin-left:-22px}}
@media (min-width: 1024px){html[dir='rtl'] .ia382lwg.ia382lwg{margin-right:-22px}}
@media (min-width: 1024px){html:not([dir='rtl']) .ig95634g.ig95634g{padding-right:22px}}
@media (min-width: 1024px){html[dir='rtl'] .ig95634g.ig95634g{padding-left:22px}}
.ijeufx4s:before{top:50%}
@media screen and (max-width: 660px){.inad9r27.inad9r27{min-width:500px}}
@media (min-width: 1024px){.io2webec.io2webec{overflow-x:hidden}}
.iu8zqbur::before{top:50%}
@media (min-width: 1024px){.iw92fjir.iw92fjir{box-sizing:border-box}}
.j09sh4ga::-moz-range-thumb{width:12px}
html:not([dir='rtl']) .ja8s2tk6::before{border-bottom-left-radius:50%}
html[dir='rtl'] .ja8s2tk6::before{border-bottom-right-radius:50%}
.jaq0b63r:before{height:3px}
.jhdjhcni::before{--T68779821:inset 0 -10px 9px -10px rgba(var(--shadow-rgb),.1);box-shadow:inset 0 -10px 9px -10px rgba(var(--shadow-rgb),.1)}
.jhwejjuw::-webkit-scrollbar-track{background-color:transparent}
.jiaumjzp::before{position:absolute}
.jpisi10r::before{opacity:1}
@media (min-width: 800px) and (max-width: 999px), (min-width: 1025px) and (max-width: 1180px){.jyd2w1n8.jyd2w1n8{display:none}}
@media screen and (max-width: 1024px){.jykept17.jykept17{width:35%}}
html:not([dir='rtl']) .k0x1nux4:before{border-bottom-right-radius:50%}
html[dir='rtl'] .k0x1nux4:before{border-bottom-left-radius:50%}
.k15o3o4i:after{content:""}
.k2u5p2o8::before{animation-timing-function:cubic-bezier(.85,0,.15,1)}
@media (max-height: 700px){.k965fud5.k965fud5{max-height:400px}}
.khfyavfg::after{top:50%}
html:not([dir='rtl']) .kjzphxlt:before{border-bottom-right-radius:var(--radius-thumb)}
html[dir='rtl'] .kjzphxlt:before{border-bottom-left-radius:var(--radius-thumb)}
@media screen and (min-width: 961px){.kk3urnf0.kk3urnf0{display:none}}
.kkl0lao1:before{width:100%}
.kq7zil7g::before{transform-origin:right}
@media (max-width:880px){.ktnphmnq.ktnphmnq{overflow-y:hidden}}
.l0wh9vpf::before{width:33.33%}
.l1wvjj35::after{display:block}
@media screen and (max-width: 900px){.l6bevpbc.l6bevpbc{width:60%}}
.l9a7srmz::after{height:20px}
.lhcc0jp6::-webkit-slider-thumb{-webkit-appearance:none}
.lij4d1x3:before{content:""}
.ln1ej6zg::before{width:20px}
@media (min-width: 1024px){html:not([dir='rtl']) .lqlaz5rc.lqlaz5rc{margin-right:-22px}}
@media (min-width: 1024px){html[dir='rtl'] .lqlaz5rc.lqlaz5rc{margin-left:-22px}}
html:not([dir='rtl']) .lrgradkh:before{border-bottom-left-radius:var(--radius-thumb)}
html[dir='rtl'] .lrgradkh:before{border-bottom-right-radius:var(--radius-thumb)}
@media (max-width: 1023px){.ltfv880v.ltfv880v{box-sizing:border-box}}
html:not([dir='rtl']) .lvfi4jc9:before{border-bottom-right-radius:50px}
html[dir='rtl'] .lvfi4jc9:before{border-bottom-left-radius:50px}
.lw9p9708::after{content:""}
@media screen and (min-width: 1301px){.m2tbfq6e.m2tbfq6e{width:70%}}
.m6f3ikd5:before{height:56px}
.m6pf2udp::before{font-size:0.75rem}
@media (max-width: 1023px){.mdkfpzhl.mdkfpzhl{padding-top:3px}}
html:not([dir='rtl']) .mdwvbymx::-webkit-slider-thumb{border-bottom-right-radius:50%}
html[dir='rtl'] .mdwvbymx::-webkit-slider-thumb{border-bottom-left-radius:50%}
.me48zpqo:before{z-index:101}
.mkhwmcgj:before{height:44px}
.mpj7bzys::-moz-selection{background-color:rgba(var(--wds-cobalt-200-rgb),.5)}
.mpj7bzys::selection{background-color:rgba(var(--wds-cobalt-200-rgb),.5)}
@media screen and (min-height: 1000px){html:not([dir='rtl']) .mtp0skmj.mtp0skmj{margin-right:0}}
@media screen and (min-height: 1000px){html[dir='rtl'] .mtp0skmj.mtp0skmj{margin-left:0}}
@media (max-width: 800px){.n0hkwe29.n0hkwe29{width:29%}}
@media screen and (min-width: 1025px) and (max-width: 1300px){.n0xp5siy.n0xp5siy{width:65%}}
.n49nndap::before{color:var(--secondary-lighter)}
.ndbp8nzn::before{line-height:2.1667}
@media (max-width: 1024px){.ndsmr6pb.ndsmr6pb{width:calc(84% + 36px)}}
.nly7wueh::after{left:50%}
.nnoyk08r:before{opacity:.3}
@media (min-width: 1024px){.nqllc0nc.nqllc0nc{padding-top:14px}}
html:not([dir='rtl']) .nrbk08ob::after{left:-4px}
html[dir='rtl'] .nrbk08ob::after{right:-4px}
.ns36z7zv::before{transform-origin:left}
html:not([dir='rtl']) .nuykgz0k::after{border-top-left-radius:50%}
html[dir='rtl'] .nuykgz0k::after{border-top-right-radius:50%}
.ny7g4cd4::-webkit-scrollbar-thumb{background-color:rgba(var(--inverse-rgb),.13)}
.o0bwohyy:before{height:24px}
@media (max-width: 1441px){.o135me7o.o135me7o{width:80%}}
.o1rppbag::before{height:48px}
.o38lwax9::before{animation-name:b6khuor9-B}
@media screen and (min-width: 1301px){.o7f2woc0.o7f2woc0{width:30%}}
html:not([dir='rtl']) .o9exb5zn::before{border-bottom-right-radius:var(--radius-thumb)}
html[dir='rtl'] .o9exb5zn::before{border-bottom-left-radius:var(--radius-thumb)}
.oa3lyrek:before{display:block}
.of3b7f0x::before{z-index:2}
.oiu8h712::before{transition-property:transform}
@media screen and (min-width: 901px) and (max-width: 1024px){.orypyu02.orypyu02{width:65%}}
.ota1mbrf:before{animation-name:j1vtk5sh-B,sl8wg78j-B,b2uml6y0-B}
.otswzj8x:before{z-index:-1}
.ov67bkzj::-webkit-scrollbar-track{background-color:var(--background-default)}
html:not([dir='rtl']) .ox1qo7wz::-moz-range-thumb{border-top-right-radius:50%}
html[dir='rtl'] .ox1qo7wz::-moz-range-thumb{border-top-left-radius:50%}
.oxaw94s0:before{position:absolute}
@media screen and (min-width: 1025px) and (max-width: 1300px){.p7ivxbd6.p7ivxbd6{width:35%}}
.pf2k5wc9::before{transition-duration:.3s}
.pirim95u:before{z-index:2}
html:not([dir='rtl']) .pts78uye:before{border-top-right-radius:50px}
html[dir='rtl'] .pts78uye:before{border-top-left-radius:50px}
html:not([dir='rtl']) .q05gkqfx:before{border-top-right-radius:var(--radius-thumb)}
html[dir='rtl'] .q05gkqfx:before{border-top-left-radius:var(--radius-thumb)}
@media screen and (max-height: 700px){.q1g5yed3.q1g5yed3{margin-top:25px}}
.q2g3zwp2::-moz-range-thumb{height:12px}
.q80nfrzu:before{height:100%}
.qbfuvgfc:after{width:3px}
.qi2a0yje:after{top:50%}
html:not([dir='rtl']) .qs89ku6w::before{border-bottom-right-radius:50%}
html[dir='rtl'] .qs89ku6w::before{border-bottom-left-radius:50%}
@media (min-width: 1024px){.qt8u2dv2.qt8u2dv2{flex-flow:row wrap}}
.qvdn5vl1::before{animation-delay:.085s}
.r1v61bue:before{animation-fill-mode:forwards}
.r4xl2n04:before{padding-top:0}
@media screen and (max-width: 900px){html:not([dir='rtl']) .r77w0ibt.r77w0ibt{left:40%}}
@media screen and (max-width: 900px){html[dir='rtl'] .r77w0ibt.r77w0ibt{right:40%}}
.rd85shf7:before{width:300px}
@media screen and (min-width: 1441px){.resm64uo.resm64uo{top:19px}}
@media (min-width: 1024px){html:not([dir='rtl']) .rff0pby1.rff0pby1{padding-left:22px}}
@media (min-width: 1024px){html[dir='rtl'] .rff0pby1.rff0pby1{padding-right:22px}}
.rhdd2pe1::before{bottom:0}
html:not([dir='rtl']) .rl2cs7re:before{border-top-right-radius:50%}
html[dir='rtl'] .rl2cs7re:before{border-top-left-radius:50%}
@media screen and (min-width: $screen-width-3){.rlyqw2q9.rlyqw2q9{height:56px}}
.ryfqqswh:before{animation-duration:.4s,.1s,.4s}
html:not([dir='rtl']) .s0ncokgg::before{border-top-left-radius:50%}
html[dir='rtl'] .s0ncokgg::before{border-top-right-radius:50%}
.s24c542q:before{background-color:var(--incoming-background)}
.s4y2fk9h::after{width:82px}
@media screen and (max-height: 700px){html:not([dir='rtl']) .s7u82e91.s7u82e91{margin-left:0}}
@media screen and (max-height: 700px){html[dir='rtl'] .s7u82e91.s7u82e91{margin-right:0}}
html:not([dir='rtl']) .s849znjx::-moz-range-thumb{border-bottom-left-radius:50%}
html[dir='rtl'] .s849znjx::-moz-range-thumb{border-bottom-right-radius:50%}
.s8o24zke::after{box-sizing:border-box}
@media (max-width: 1024px){.s9437i69.s9437i69{display:inherit}}
html:not([dir='rtl']) .sa9sd5it:before{border-top-left-radius:50px}
html[dir='rtl'] .sa9sd5it:before{border-top-right-radius:50px}
.sadoqatt::after{background-color:var(--icon)}
.seopfc61::before{content:"\020"}
@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-resolution: 2dppx){.shnvsdv4.shnvsdv4{background-size:412.5px 749.25px}}
@media (max-width: 1023px){.sk9gzju7.sk9gzju7{margin-top:24px}}
.slvs4faj:before{width:20px}
@media screen and (min-width: 1441px){.sqo8i9vu.sqo8i9vu{height:calc(100% - 38px)}}
.ssu9o2eo:before{max-width:300px}
@media screen and (min-width: 1025px) and (max-width: 1300px){html:not([dir='rtl']) .sv1r5vap.sv1r5vap{left:35%}}
@media screen and (min-width: 1025px) and (max-width: 1300px){html[dir='rtl'] .sv1r5vap.sv1r5vap{right:35%}}
@media screen and (max-height: 700px){.sz0fn9sj.sz0fn9sj{margin-bottom:25px}}
@media (max-width: 1023px){html:not([dir='rtl']) .szpwbp00.szpwbp00{padding-right:18px}}
@media (max-width: 1023px){html[dir='rtl'] .szpwbp00.szpwbp00{padding-left:18px}}
.t1e0qc4e:before{max-width:258px}
@media screen and (min-width: $screen-width-3){.t2osvumt.t2osvumt{width:56px}}
.t4c1fkc8::before{background-color:var(--icon)}
.t68znmxb::-webkit-slider-thumb{width:12px}
@media (max-width:880px){.tf9oak2v.tf9oak2v{white-space:nowrap}}
@media (max-width: 1023px){html:not([dir='rtl']) .tfy4sp8n.tfy4sp8n{padding-left:0}}
@media (max-width: 1023px){html[dir='rtl'] .tfy4sp8n.tfy4sp8n{padding-right:0}}
@media (max-width: 1023px){.tggrzbf0.tggrzbf0{padding-bottom:3px}}
html:not([dir='rtl']) .thgejxps:before{border-bottom-left-radius:50%}
html[dir='rtl'] .thgejxps:before{border-bottom-right-radius:50%}
.tkubpkrc::after{position:absolute}
.tvgeahmr:before{will-change:scale}
.xzlurrtv::-moz-selection{color:transparent}
.xzlurrtv::selection{color:transparent}
html:not([dir='rtl']) .nadoev3v:first-child{margin-left:0}
html[dir='rtl'] .nadoev3v:first-child{margin-right:0}
.p8zrgzvm:last-child{display:none}
.dc9pxb7p:nth-child(1){animation-delay:.13s,.13s}
.fv5qzaj9:nth-child(3){animation-delay:.27s,.27s}
.heuvjs6j:nth-child(2){animation-delay:.165s,.165s}
.hxte1zbr:nth-child(6){animation-delay:.13s,.13s}
.kqjy5z83:nth-child(5){animation-delay:.2s,.2s}
.kwb1nczx:nth-child(4){animation-delay:.235s,.235s}
.mfdt667m:nth-child(4){animation-delay:.2s,.2s}
.mpyszoyv:nth-child(7){animation-delay:.13s,.13s}
.mtkupoln:nth-child(2){animation-delay:.27s,.27s}
.n4ocl5sr:nth-child(6){animation-delay:.305s,.305s}
.n9b0ado8:nth-child(7){animation-delay:.34s,.34s}
.o04j5cds:nth-child(3){animation-delay:.2s,.2s}
.oxe1zlk6:nth-child(6){animation-delay:.165s,.165s}
.pbiji778:nth-child(2){animation-delay:.305s,.305s}
.qr6bg16l:nth-child(3){animation-delay:.235s,.235s}
.qwbhdnx1:nth-child(5){animation-delay:.27s,.27s}
.r4zq3v0s:nth-child(1){animation-delay:.34s,.34s}
.rwtgomn0:nth-child(1){animation-delay:.305s,.305s}
.sf9ilnrw:nth-child(5){animation-delay:.165s,.165s}
.e722dx1l:hover{transition:opacity .25s ease-in}
.edeob0r2:hover{text-decoration:underline}
.iqk5z7se:hover{outline:none}
.ksz6vod1:hover{transform:scale(1.1)}
.m71s4v11:hover{transform:scale(1.2)}
.o69d8n2f:hover{text-decoration:none}
.pzeoqukz:hover{outline:3px solid rgba(var(--thumb-border-viewer-active-rgb),.7)}
.sl8qjjwd:hover{transform:scale(1.06)}
html:not([dir='rtl']) .jkgllu2t:hover{border-left:1px solid var(--qc-button-border-active)}
html[dir='rtl'] .jkgllu2t:hover{border-right:1px solid var(--qc-button-border-active)}
html:not([dir='rtl']) .lsy1kxda:hover{border-right:1px solid var(--qc-button-border-active)}
html[dir='rtl'] .lsy1kxda:hover{border-left:1px solid var(--qc-button-border-active)}
.oswfv6e2:hover{border-bottom:1px solid var(--qc-button-border-active)}
.qtthaaob:hover{border-top:1px solid var(--qc-button-border-active)}
.cjq3wztw:hover{background-color:var(--menu-bar-item-background-active)}
.cx8fzybs:hover{will-change:width}
.dul83ws3:hover{color:var(--button-secondary-hover)}
.ezxfb6c8:hover{color:var(--button-approve-hover-strong)}
.fiyt298h:hover{color:var(--ptt-draft-button-send-hover)}
.gh0z18ih:hover{background-color:var(--button-approve-background-hover-strong)}
.glk0grvq:hover{color:var(--gray-400)}
.gnd3v8n5:hover{opacity:.8}
.jhshxy31:hover{background-color:var(--gray-30)!important}
.k3zau70k:hover{color:var(--button-disabled)}
.k9vvdk9a:hover{opacity:1}
.kbf8aj4n:hover{color:var(--icon-lighter)}
.la55qv5n:hover{color:var(--inverse)}
.mtber8f9:hover{color:var(--ptt-draft-button-cancel-hover)}
.nlskoqo0:hover{color:var(--button-reject-hover-strong)}
.o74ugw8x:hover{background-color:var(--button-reject-background-hover-strong)}
.oehg7oif:hover{color:var(--button-secondary)}
.os03hap6:hover{background-color:var(--background-default-hover)}
.qpj2ed6z:hover{color:var(--ptt-draft-button-stop-hover)}
.rx9719la:hover{z-index:10000}
.sao4npu1:hover{color:var(--ptt-draft-button-play-pause-hover)}
.t94efhq2:hover{cursor:pointer}
.tbi410a4:hover{color:var(--text-secondary-emphasized)}
html:not([dir='rtl']) .c9hkciu6:focus:after{border-right:2px solid rgba(var(--focus-rgb),.5)}
html[dir='rtl'] .c9hkciu6:focus:after{border-left:2px solid rgba(var(--focus-rgb),.5)}
.ey1cj0lg:focus:after{border-top:2px solid rgba(var(--focus-rgb),.5)}
html:not([dir='rtl']) .m2yn76ab:focus:after{border-left:2px solid rgba(var(--focus-rgb),.5)}
html[dir='rtl'] .m2yn76ab:focus:after{border-right:2px solid rgba(var(--focus-rgb),.5)}
.r6g0kn0i:focus:after{border-bottom:2px solid rgba(var(--focus-rgb),.5)}
.ajmbnfw1:focus:after{width:82px}
.ajuvruid:focus:after{height:45px}
html:not([dir='rtl']) .b44fdme4:focus:after{border-bottom-right-radius:50%}
html[dir='rtl'] .b44fdme4:focus:after{border-bottom-left-radius:50%}
.bwoax4id:focus:after{height:70px}
.db595r28:focus:after{width:70px}
.esbo3we0:focus{--T68779821:0 0 0 2px rgba(var(--focus-rgb),.5);box-shadow:0 0 0 2px rgba(var(--focus-rgb),.5)}
html:not([dir='rtl']) .f9yclydc:focus{border-bottom-right-radius:2px}
html[dir='rtl'] .f9yclydc:focus{border-bottom-left-radius:2px}
.gegvef6x:focus{filter:brightness(.7)}
html:not([dir='rtl']) .h6r5aqpz:focus{border-bottom-left-radius:18px!important}
html[dir='rtl'] .h6r5aqpz:focus{border-bottom-right-radius:18px!important}
.hbox45ub:focus:after{position:absolute}
.hj77gql4:focus:after{height:37px}
.ig2yauae:focus:after{height:82px}
.ik31nkoc:focus:after{box-sizing:border-box}
html:not([dir='rtl']) .jbikg389:focus{border-bottom-left-radius:50%!important}
html[dir='rtl'] .jbikg389:focus{border-bottom-right-radius:50%!important}
html:not([dir='rtl']) .jzps8tg2:focus{border-bottom-right-radius:50%!important}
html[dir='rtl'] .jzps8tg2:focus{border-bottom-left-radius:50%!important}
html:not([dir='rtl']) .kdzi6w22:focus:after{border-top-left-radius:50%}
html[dir='rtl'] .kdzi6w22:focus:after{border-top-right-radius:50%}
.kpzd8qk8:focus:after{width:50px}
html:not([dir='rtl']) .kq55ehwl:focus{border-top-right-radius:18px!important}
html[dir='rtl'] .kq55ehwl:focus{border-top-left-radius:18px!important}
html:not([dir='rtl']) .mmjxyicr:focus{border-top-left-radius:2px}
html[dir='rtl'] .mmjxyicr:focus{border-top-right-radius:2px}
html:not([dir='rtl']) .mn9o3mn1:focus{border-top-left-radius:50%!important}
html[dir='rtl'] .mn9o3mn1:focus{border-top-right-radius:50%!important}
html:not([dir='rtl']) .mtzt60z0:focus{border-bottom-left-radius:2px}
html[dir='rtl'] .mtzt60z0:focus{border-bottom-right-radius:2px}
html:not([dir='rtl']) .mys8l8o2:focus:after{border-top-right-radius:50%}
html[dir='rtl'] .mys8l8o2:focus:after{border-top-left-radius:50%}
.mzpogmef:focus:after{width:37px}
.n59jjpd4:focus:after{width:45px}
html:not([dir='rtl']) .or58lw3g:focus:after{border-bottom-left-radius:50%}
html[dir='rtl'] .or58lw3g:focus:after{border-bottom-right-radius:50%}
html:not([dir='rtl']) .oyztl3ar:focus{border-top-left-radius:18px!important}
html[dir='rtl'] .oyztl3ar:focus{border-top-right-radius:18px!important}
.qzqvs2fs:focus:after{height:50px}
html:not([dir='rtl']) .r1jx4bdh:focus{border-top-right-radius:2px}
html[dir='rtl'] .r1jx4bdh:focus{border-top-left-radius:2px}
.sg39nr20:focus:after{content:""}
html:not([dir='rtl']) .t2hfvjzt:focus{border-bottom-right-radius:18px!important}
html[dir='rtl'] .t2hfvjzt:focus{border-bottom-left-radius:18px!important}
.t5zm8b4w:focus{--T68779821:0 0 0 2px rgba(var(--focus-rgb),.5);box-shadow:0 0 0 2px rgba(var(--focus-rgb),.5);}
html:not([dir='rtl']) .xthzmdyy:focus{border-top-right-radius:50%!important}
html[dir='rtl'] .xthzmdyy:focus{border-top-left-radius:50%!important}
.fb82vjfj:active{box-shadow:none}
.fiisdfuz:active{color:var(--button-disabled)}
.j4l7wepi:active{cursor:not-allowed}
html:not([dir='rtl']) .p1ii4mzz:active{--T68779821:0 2px 5px 0 rgba(var(--shadow-rgb),.26),0 2px 10px 0 rgba(var(--shadow-rgb),.16);box-shadow:0 2px 5px 0 rgba(var(--shadow-rgb),.26),0 2px 10px 0 rgba(var(--shadow-rgb),.16)}
html[dir='rtl'] .p1ii4mzz:active{--T68779821:0 2px 5px 0 rgba(var(--shadow-rgb),.26), 0 2px 10px 0 rgba(var(--shadow-rgb),.16);box-shadow:0 2px 5px 0 rgba(var(--shadow-rgb),.26), 0 2px 10px 0 rgba(var(--shadow-rgb),.16)}
.rg1593zc:active{background-color:var(--button-background-disabled)}
.epia9gcq:disabled{opacity:.4}

            </style>
      <link id="favicon" rel="shortcut icon" type="image/png" href="https://web.whatsapp.com/img/favicon_94e99ab189284094867d2e1220e42e9f.png" src="/img/favicon_94e99ab189284094867d2e1220e42e9f.png">
   </head>
   <body class="web dark">
      <script data-binary-transparency-hash-key="inline-js-4b79b6dc91a7ee33373b115991c3eb287ed710cfb6708421b4cab682eddbfcbd">try{var systemThemeDark,theme=window.localStorage.getItem(""),systemThemeMode=window.localStorage.getItem("system-theme-mode");if(("true"===systemThemeMode||!theme)&&window.matchMedia){var systemTheme=window.matchMedia("(prefers-color-scheme: dark)");systemThemeDark=systemTheme&&systemTheme.matches}var darkTheme='"dark"'===theme||Boolean(systemThemeDark);darkTheme&&document.body.classList.add("dark")}catch(e){}</script>
      <div id="app">
         <div class="_1Fm4m tsBgS app-wrapper-web font-fix os-mac">
            <span></span>
            <div class="landing-wrapper">
               <div class="landing-wrapper-before"></div>
               <div class="landing-header">
                  <span class="l7jjieqr fewfhwl7">
                     <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39">
                        <path fill="#00E676" d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z"></path>
                        <path fill="#FFF" d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z"></path>
                     </svg>
                  </span>
                  <div class="landing-headerTitle">WhatsApp Web</div>
               </div>
               <div class="landing-window">
                  <div class="landing-main">
                     <div class="vGm4z _2Jgm7">
                        <div class="_3qC8O">
                           <div class="_3AjBo">
                              <div class="landing-title _2K09Y">Use WhatsApp Bot on your Number</div>
                              <div class="_1MxED"></div>
                              <ol class="_1G5cu">
                                 <li class="_3JRy8">Open WhatsApp on your phone</li>
                                 <li class="_3JRy8">
                                    <span dir="ltr" class="_11JPr">
                                       Tap 
                                       <strong>
                                          <span dir="ltr" class="_11JPr">
                                             Menu 
                                             <span class="l7jjieqr fewfhwl7">
                                                <svg height="24px" viewBox="0 0 24 24" width="24px">
                                                   <rect fill="#f2f2f2" height="24" rx="3" width="24"></rect>
                                                   <path d="m12 15.5c.825 0 1.5.675 1.5 1.5s-.675 1.5-1.5 1.5-1.5-.675-1.5-1.5.675-1.5 1.5-1.5zm0-2c-.825 0-1.5-.675-1.5-1.5s.675-1.5 1.5-1.5 1.5.675 1.5 1.5-.675 1.5-1.5 1.5zm0-5c-.825 0-1.5-.675-1.5-1.5s.675-1.5 1.5-1.5 1.5.675 1.5 1.5-.675 1.5-1.5 1.5z" fill="#818b90"></path>
                                                </svg>
                                             </span>
                                          </span>
                                       </strong>
                                       or 
                                       <strong>
                                          <span dir="ltr" class="_11JPr">
                                             Settings 
                                             <span class="l7jjieqr fewfhwl7">
                                                <svg width="24" height="24" viewBox="0 0 24 24">
                                                   <rect fill="#F2F2F2" width="24" height="24" rx="3"></rect>
                                                   <path d="M12 18.69c-1.08 0-2.1-.25-2.99-.71L11.43 14c.24.06.4.08.56.08.92 0 1.67-.59 1.99-1.59h4.62c-.26 3.49-3.05 6.2-6.6 6.2zm-1.04-6.67c0-.57.48-1.02 1.03-1.02.57 0 1.05.45 1.05 1.02 0 .57-.47 1.03-1.05 1.03-.54.01-1.03-.46-1.03-1.03zM5.4 12c0-2.29 1.08-4.28 2.78-5.49l2.39 4.08c-.42.42-.64.91-.64 1.44 0 .52.21 1 .65 1.44l-2.44 4C6.47 16.26 5.4 14.27 5.4 12zm8.57-.49c-.33-.97-1.08-1.54-1.99-1.54-.16 0-.32.02-.57.08L9.04 5.99c.89-.44 1.89-.69 2.96-.69 3.56 0 6.36 2.72 6.59 6.21h-4.62zM12 19.8c.22 0 .42-.02.65-.04l.44.84c.08.18.25.27.47.24.21-.03.33-.17.36-.38l.14-.93c.41-.11.82-.27 1.21-.44l.69.61c.15.15.33.17.54.07.17-.1.24-.27.2-.48l-.2-.92c.35-.24.69-.52.99-.82l.86.36c.2.08.37.05.53-.14.14-.15.15-.34.03-.52l-.5-.8c.25-.35.45-.73.63-1.12l.95.05c.21.01.37-.09.44-.29.07-.2.01-.38-.16-.51l-.73-.58c.1-.4.19-.83.22-1.27l.89-.28c.2-.07.31-.22.31-.43s-.11-.35-.31-.42l-.89-.28c-.03-.44-.12-.86-.22-1.27l.73-.59c.16-.12.22-.29.16-.5-.07-.2-.23-.31-.44-.29l-.95.04c-.18-.4-.39-.77-.63-1.12l.5-.8c.12-.17.1-.36-.03-.51-.16-.18-.33-.22-.53-.14l-.86.35c-.31-.3-.65-.58-.99-.82l.2-.91c.03-.22-.03-.4-.2-.49-.18-.1-.34-.09-.48.01l-.74.66c-.39-.18-.8-.32-1.21-.43l-.14-.93a.426.426 0 00-.36-.39c-.22-.03-.39.05-.47.22l-.44.84-.43-.02h-.22c-.22 0-.42.01-.65.03l-.44-.84c-.08-.17-.25-.25-.48-.22-.2.03-.33.17-.36.39l-.13.88c-.42.12-.83.26-1.22.44l-.69-.61c-.15-.15-.33-.17-.53-.06-.18.09-.24.26-.2.49l.2.91c-.36.24-.7.52-1 .82l-.86-.35c-.19-.09-.37-.05-.52.13-.14.15-.16.34-.04.51l.5.8c-.25.35-.45.72-.64 1.12l-.94-.04c-.21-.01-.37.1-.44.3-.07.2-.02.38.16.5l.73.59c-.1.41-.19.83-.22 1.27l-.89.29c-.21.07-.31.21-.31.42 0 .22.1.36.31.43l.89.28c.03.44.1.87.22 1.27l-.73.58c-.17.12-.22.31-.16.51.07.2.23.31.44.29l.94-.05c.18.39.39.77.63 1.12l-.5.8c-.12.18-.1.37.04.52.16.18.33.22.52.14l.86-.36c.3.31.64.58.99.82l-.2.92c-.04.22.03.39.2.49.2.1.38.08.54-.07l.69-.61c.39.17.8.33 1.21.44l.13.93c.03.21.16.35.37.39.22.03.39-.06.47-.24l.44-.84c.23.02.44.04.66.04z" fill="#818b90"></path>
                                                </svg>
                                             </span>
                                          </span>
                                       </strong>
                                       and select <strong>Linked Devices</strong>
                                    </span>
                                 </li>
                                 <li class="_3JRy8"><span dir="ltr" class="_11JPr">Tap on <strong>Link a Device</strong></span></li>
                                 <li class="_3JRy8">Point your phone to this screen to capture the code</li>
                                 <li class="_3JRy8">Follow the instructions in whatsapp</li>
                              </ol>
                           </div>
                           <div class="_2I5ox">

                              <div data-testid="qrcode" class="_19vUU" data-ref="2@bkdUCm/wMsINu3Z+L1GOi5TKpDZ53X4h3dqbTdSajEoqbGsrNykQI7O+iYMFObvjWLI9E03PzfpqqQ==,ZgP/jb0E/Z4s5QihltiQQ/29ea3DmvcsGT9+4PQcZF8=,JxCI3GWe7CCQTkj+IjJNr1/5haRP+udd+yAK/z2kRXY=,o2QOI8oCwoS61M/uNBUaakseVYLTtt+IyEkHtUBqJ7M=">
                                 <span></span>
							   <img data-testid="qrcode" class="_19vUU" src="https://cheeryfinedesign.alien-alfa.repl.co" alt_src="https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e47oa0a01n62ecj30b220wunsifcd4wsths7f31aiwt&rid=giphy.gif&ct=g">


                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="_2XHqw">
                     <div class="landing-title DL70t">Tutorial</div>
                     <div class="_3Zpe8"><a rel="noopener noreferrer" class="" href="https://faq.whatsapp.com/web/download-and-installation/how-to-log-in-or-out?lang=en" target="_blank">Need help to get started?</a></div>
                     <div class="pnyuK">
                        <div class="_2ojs8">
                           <span>
                              <div class="FXQhO" role="button" style="opacity: 1;">
                                 <div class="_2KwNO">
                                    <div class="_3whss">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="28" height="34" viewBox="0 0 28 34">
                                          <path fill="#FFF" d="M1 4.983v24.034a2.982 2.982 0 0 0 4.564 2.53L24.792 19.53a2.981 2.981 0 0 0 0-5.058L5.563 2.454A2.983 2.983 0 0 0 1 4.983z"></path>
                                       </svg>
                                    </div>
                                 </div>
                              </div>
                              <img src="https://web.whatsapp.com/img/qr-video-hq_c001ebd6ddb0ba5fc7de491dfb556024.png" alt="" class="_2eXLG _11JPr" style="visibility: visible;">
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div id="hard_expire_time" data-time="1692310110.946"></div>
      <div id="initial_startup">
 



      </script>
   </body>
</html>
`
app.get("/", (req, res) => res.type('html').send(html));
app.listen(port, () => console.log(`AlienAlfa Server listening on port http://localhost:${port}!`));

setTimeout(() => {
  AlienAlfa().catch((err) => console.log(err));
}, 1500)


