
const fs = require("fs")
const { writeFile, readFile } = require("fs");

const chalk = require("chalk")
const { exec, spawn, execSync } = require("child_process")
const axios = require("axios");
const { isAdmin, parsedJid, isUrl } = require("../lib");

const events = require("../lib/event");
const { command, isPrivate, tiny, serif_B, clockString, styletext, listall, } = require("../lib");
const { ALIVE, GOODBYE_MSG, WELCOME_MSG, HANDLERS, WORK_TYPE, BOT_NAME, OWNER_NAME, SUDO, AUTHOR, PACKNAME, RMBG_KEY, LANG, ANTILINK_ACTION, ANTILINK, FOOTER, THEME, FONT_STYLE, LANGUAGE, INTERNAL_MENU, MODE} = require("../config");

const { hostname, uptime, totalmem, freemem } = require("os");
const { configz } = require("dotenv");
const maker = require("mumaker")
const fetch = require('node-fetch')
const {cloudspace} = require("../lib/alfabase");



command(
    {
      pattern: "candy",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/candy/.test(message.text)) link = "https://textpro.me/create-christmas-candy-cane-text-effect-1056.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "christmas",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/christmas/.test(message.text)) link = "https://textpro.me/christmas-tree-text-effect-online-free-1057.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "3dchristmas",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/3dchristmas/.test(message.text)) link = "https://textpro.me/3d-christmas-text-effect-by-name-1055.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "sparklechristmas",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/sparklechristmas/.test(message.text)) link = "https://textpro.me/sparkles-merry-christmas-text-effect-1054.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "deepsea",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/deepsea/.test(message.text)) link = "https://textpro.me/create-3d-deep-sea-metal-text-effect-online-1053.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "scifi",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/scifi/.test(message.text)) link = "https://textpro.me/create-3d-sci-fi-text-effect-online-1050.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "rainbow",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/rainbow/.test(message.text)) link = "https://textpro.me/3d-rainbow-color-calligraphy-text-effect-1049.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "waterpipe",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/waterpipe/.test(message.text)) link = "https://textpro.me/create-3d-water-pipe-text-effects-online-1048.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "spooky",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/spooky/.test(message.text)) link = "https://textpro.me/create-halloween-skeleton-text-effect-online-1047.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "circuit",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/circuit/.test(message.text)) link = "https://textpro.me/create-blue-circuit-style-text-effect-online-1043.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "pencil",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/pencil/.test(message.text)) link = "https://textpro.me/create-a-sketch-text-effect-online-1044.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "discovery",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/discovery/.test(message.text)) link = "https://textpro.me/create-space-text-effects-online-free-1042.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "discovery",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/discovery/.test(message.text)) link = "https://textpro.me/create-space-text-effects-online-free-1042.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "metalic",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/metalic/.test(message.text)) link = "https://textpro.me/creat-glossy-metalic-text-effect-free-online-1040.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "fiction",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/fiction/.test(message.text)) link = "https://textpro.me/create-science-fiction-text-effect-online-free-1038.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "demon",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/demon/.test(message.text)) link = "https://textpro.me/create-green-horror-style-text-effect-online-1036.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "transformer",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/transformer/.test(message.text)) link = "https://textpro.me/create-a-transformer-text-effect-online-1035.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "berry",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/berry/.test(message.text)) link = "https://textpro.me/create-berry-text-effect-online-free-1033.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "thunder",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/thunder/.test(message.text)) link = "https://textpro.me/online-thunder-text-effect-generator-1031.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "magma",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/magma/.test(message.text)) link = "https://textpro.me/create-a-magma-hot-text-effect-online-1030.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "neondevil",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/neondevil/.test(message.text)) link = "https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "multicolor",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/multicolor/.test(message.text)) link = "https://textpro.me/online-multicolor-3d-paper-cut-text-effect-1016.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "underwater",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/underwater/.test(message.text)) link = "https://textpro.me/3d-underwater-text-effect-generator-online-1013.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "graffitibike",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/graffitibike/.test(message.text)) link = "https://textpro.me/create-wonderful-graffiti-art-text-effect-1011.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "snow",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/snow/.test(message.text)) link = "https://textpro.me/create-snow-text-effects-for-winter-holidays-1005.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "brokenglass",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/brokenglass/.test(message.text)) link = "https://textpro.me/broken-glass-text-effect-free-online-1023.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "glitch",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/glitch/.test(message.text)) link = "https://textpro.me/create-impressive-glitch-text-effects-online-1027.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "papercut",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/papercut/.test(message.text)) link = "https://textpro.me/create-art-paper-cut-text-effect-online-1022.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "cloud",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/cloud/.test(message.text)) link = "https://textpro.me/create-a-cloud-text-effect-on-the-sky-online-1004.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "honey",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/honey/.test(message.text)) link = "https://textpro.me/honey-text-effect-868.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "ice",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/ice/.test(message.text)) link = "https://textpro.me/ice-cold-text-effect-862.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "neonlight",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/neonlight/.test(message.text)) link = "https://textpro.me/create-3d-neon-light-text-effect-online-1028.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "3dstone2",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/3dstone2/.test(message.text)) link = "https://textpro.me/create-a-3d-stone-text-effect-online-for-free-1073.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "harrypotter",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/harrypotter/.test(message.text)) link = "https://textpro.me/create-harry-potter-text-effect-online-1025.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "fruitjuice",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/fruitjuice/.test(message.text)) link = "https://textpro.me/fruit-juice-text-effect-861.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "biscuit",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/biscuit/.test(message.text)) link = "https://textpro.me/biscuit-text-effect-858.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "wood",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/wood/.test(message.text)) link = "https://textpro.me/wood-text-effect-856.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "watercolor",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/watercolor/.test(message.text)) link = "https://textpro.me/create-a-free-online-watercolor-text-effect-1017.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "chocolate",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/chocolate/.test(message.text)) link = "https://textpro.me/chocolate-cake-text-effect-890.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "strawberry",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/strawberry/.test(message.text)) link = "https://textpro.me/strawberry-text-effect-online-889.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "matrix",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/matrix/.test(message.text)) link = "https://textpro.me/matrix-style-text-effect-online-884.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "blood",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/blood/.test(message.text)) link = "https://textpro.me/horror-blood-text-effect-online-883.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "bloodglas",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/bloodglas/.test(message.text)) link = "https://textpro.me/blood-text-on-the-frosted-glass-941.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "halloween",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/halloween/.test(message.text)) link = "https://textpro.me/halloween-fire-text-effect-940.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "darkgold",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/darkgold/.test(message.text)) link = "https://textpro.me/metal-dark-gold-text-effect-online-939.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "joker",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/joker/.test(message.text)) link = "https://textpro.me/create-logo-joker-online-934.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "wicker",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/wicker/.test(message.text)) link = "https://textpro.me/wicker-text-effect-online-932.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "firework",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/firework/.test(message.text)) link = "https://textpro.me/firework-sparkle-text-effect-930.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "skeleton",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/skeleton/.test(message.text)) link = "https://textpro.me/skeleton-text-effect-online-929.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "blackpinkart",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/blackpinkart/.test(message.text)) link = "https://textpro.me/create-blackpink-logo-style-online-1001.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "rockart",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/rockart/.test(message.text)) link = "https://textpro.me/rock-text-effect-online-915.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "leaves",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/leaves/.test(message.text)) link = "https://textpro.me/natural-leaves-text-effect-931.html" 
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "lava",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/lava/.test(message.text)) link = "https://textpro.me/lava-text-effect-online-914.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "toxic",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/toxic/.test(message.text)) link = "https://textpro.me/toxic-text-effect-online-901.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "dropwater",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/dropwater/.test(message.text)) link = "https://textpro.me/dropwater-text-effect-872.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "1917",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/1917/.test(message.text)) link = "https://textpro.me/1917-style-text-effect-online-980.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "glue",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/glue/.test(message.text)) link = "https://textpro.me/create-3d-glue-text-effect-with-realistic-style-986.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command(
    {
      pattern: "sand",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {
 if (!match) return await message.reply("_Please Type Your message_");
message.sendMessage("_please wait..._")
let link
if (/sand/.test(message.text)) link = "https://textpro.me/write-in-sand-summer-beach-free-online-991.html"
let anutexpro = await maker.textpro(link, match)
return await message.sendMessage(anutexpro, {}, "image");
});



//============================================================================================================================================
command({
  pattern: "tr",
  fromMe: true,
  desc: "Chat Gpt Chat feture",
  dontAddCommandList: true,
  type: "misc",

},
async (message, match, m) => {

 // if (!match || !m.quoted.text) return await message.sendMessage(`📌 *Example:*\n\n*tr* <lang> [text]\n*tr* ar Hello World`)

let args = match.split(' ')
  let lang = args[0]
  let text = args.slice(1).join(' ')
  if ((args[0] || '').length !== 2) {
      lang = defaultLang
      text = args.join(' ')
  }
  if (!text && m.quoted && m.quoted.text) text = m.quoted.text

 
     let result = await translate(text, { to: lang, autoCorrect: true }).catch(_ => null) 
     message.sendMessage(result.text)


})


  
//============================================================================================================================================



command(
    {
      pattern: "bass",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {

//case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'squirrel':
if (!(message.reply_message.audio)) return message.sendMessage("_please reply to an audio..._")

let media = await message.quoted.download();

try {
    let set
    if (/bass/.test(message.text)) set = '-af equalizer=f=54:width_type=o:width=2:g=20'
    if (/blown/.test(message.text)) set = '-af acrusher=.1:1:64:0:log'
    if (/deep/.test(message.text)) set = '-af atempo=4/4,asetrate=44500*2/3'
    if (/earrape/.test(message.text)) set = '-af volume=12'
    if (/fast/.test(message.text)) set = '-filter:a "atempo=1.63,asetrate=44100"'
    if (/fat/.test(message.text)) set = '-filter:a "atempo=1.6,asetrate=22100"'
    if (/nightcore/.test(message.text)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
    if (/reverse/.test(message.text)) set = '-filter_complex "areverse"'
    if (/robot/.test(message.text)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
    if (/slow/.test(message.text)) set = '-filter:a "atempo=0.7,asetrate=44100"'
    if (/smooth/.test(message.text)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
    if (/tupai/.test(message.text)) set = '-filter:a "atempo=0.5,asetrate=65100"'

    if (message.reply_message.audio) {
        message.sendMessage("_please wait..._")


    let ran = `${Math.floor(Math.random() * 10000)}`+'.mp3'

    exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
    fs.unlinkSync(media)
    if (err) return message.sendMessage(err)
    let buff = fs.readFileSync(ran)
    message.sendMessage(buff, {caption: "_Media message.jid Alien-Alfa"}, "audio");
    fs.unlinkSync(ran)
    })
    } 
    
    else message.sendMessage(media.mime)
    } catch (e) {
    message.sendMessage(`${e}`)
}
});





//============================================================================================================================================
command(
    {
      pattern: "imdb",
      fromMe:isPrivate,
      desc:"Text Pro Image Maker",
      type:"textmaker",
    },
    async (message, match, m) => {



if (!match) return message.sendMessage(`_Name a Series or movie_`)
            let fids = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${match}&plot=full`)
            let imdbt = ""
            console.log(fids.data)
            imdbt += "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n" + " ``` IMDB SEARCH```\n" + "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n"
            imdbt += "🎬Title      : " + fids.data.Title + "\n"
            imdbt += "📅Year       : " + fids.data.Year + "\n"
            imdbt += "⭐Rated      : " + fids.data.Rated + "\n"
            imdbt += "📆Released   : " + fids.data.Released + "\n"
            imdbt += "⏳Runtime    : " + fids.data.Runtime + "\n"
            imdbt += "🌀Genre      : " + fids.data.Genre + "\n"
            imdbt += "👨🏻‍💻Director   : " + fids.data.Director + "\n"
            imdbt += "✍Writer     : " + fids.data.Writer + "\n"
            imdbt += "👨Actors     : " + fids.data.Actors + "\n"
            imdbt += "📃Plot       : " + fids.data.Plot + "\n"
            imdbt += "🌐Language   : " + fids.data.Language + "\n"
            imdbt += "🌍Country    : " + fids.data.Country + "\n"
            imdbt += "🎖️Awards     : " + fids.data.Awards + "\n"
            imdbt += "📦BoxOffice  : " + fids.data.BoxOffice + "\n"
            imdbt += "🏙️Production : " + fids.data.Production + "\n"
            imdbt += "🌟imdbRating : " + fids.data.imdbRating + "\n"
            imdbt += "✅imdbVotes  : " + fids.data.imdbVotes + ""


            const buttonMessage = {
                image: {url: fids.data.Poster},
                caption: imdbt,
                footer: 'AlienAlfa',
                headerType: 4
            }

            return await message.client.sendMessage(message.jid, buttonMessage)

    });




//============================================================================================================================================

command({ on: "text", fromMe: false }, async (message, match, m) => {
  switch(message.text){

case 'sound1': case 'sound2': case 'sound3': case 'sound4': case 'sound5': case 'sound6': 
case 'sound7': case 'sound8': case 'sound9': case 'sound10': case 'sound11': case 'sound12': 
case 'sound13': case 'sound14': case 'sound15': case 'sound16': case 'sound17': case 'sound18': 
case 'sound19': case 'sound20': case 'sound21': case 'sound22': case 'sound23': case 'sound24': 
case 'sound25': case 'sound26': case 'sound27': case 'sound28': case 'sound29': case 'sound30': 
case 'sound31': case 'sound32': case 'sound33': case 'sound34': case 'sound35': case 'sound36': 
case 'sound37': case 'sound38': case 'sound39': case 'sound40': case 'sound41': case 'sound42': 
case 'sound43': case 'sound44': case 'sound45': case 'sound46': case 'sound47': case 'sound48': 
case 'sound49': case 'sound50': case 'sound51': case 'sound52': case 'sound53': case 'sound54': 
case 'sound55': case 'sound56': case 'sound57': case 'sound58': case 'sound59': case 'sound60': 
case 'sound61': case 'sound62': case 'sound63': case 'sound64': case 'sound65': case 'sound66': 
case 'sound67': case 'sound68': case 'sound69': case 'sound70': case 'sound71': case 'sound72': 
case 'sound73': case 'sound74': case 'sound75': case 'sound76': case 'sound77': case 'sound78': 
case 'sound79': case 'sound80': case 'sound81': case 'sound82': case 'sound83': case 'sound84': 
case 'sound85': case 'sound86': case 'sound87': case 'sound88': case 'sound89': case 'sound90': 
case 'sound91': case 'sound92': case 'sound93': case 'sound94': case 'sound95': case 'sound96': 
case 'sound97': case 'sound98': case 'sound99': case 'sound100': case 'sound101': case 'sound102': 
case 'sound103': case 'sound104': case 'sound105': case 'sound106': case 'sound107': case 'sound108': 
case 'sound109': case 'sound110': case 'sound111': case 'sound112': case 'sound113': case 'sound114': 
case 'sound115': case 'sound116': case 'sound117': case 'sound118': case 'sound119': case 'sound120': 
case 'sound121': case 'sound122': case 'sound123': case 'sound124': case 'sound125': case 'sound126': 
case 'sound127': case 'sound128': case 'sound129': case 'sound130': case 'sound131': case 'sound132': 
case 'sound133': case 'sound134': case 'sound135': case 'sound136': case 'sound137': case 'sound138': 
case 'sound139': case 'sound140': case 'sound141': case 'sound142': case 'sound143': case 'sound144': 
case 'sound145': case 'sound146': case 'sound147': case 'sound148': case 'sound149': case 'sound150': 
case 'sound151': case 'sound152': case 'sound153': case 'sound154': case 'sound155': case 'sound156': 
case 'sound157': case 'sound158': case 'sound159': case 'sound160': case 'sound161':{
  if(isPrivate) return;
XeonBotInc_dev = await fetch(`https://github.com/DGXeon/Tiktokmusic-API/raw/master/tiktokmusic/${message.text}.mp3`)
await message.client.sendMessage(message.jid, { audio: XeonBotInc_dev, mimetype: 'audio/mpeg', ptt: true })     
} break

}

});



//============================================================================================================================================
command({
  pattern: "spotify",
      fromMe: true,
      desc: "Download music from Spotify",
      dontAddCommandList: true,
      type: "download",
  
   },
   async (message, match, m) => {


      if (!match) return await message.reply(`_Where is the link?_`);
      const Spotify = require('../lib/spotify')
      const spotify = new Spotify(match)
      const info = await spotify.getInfo()
      if ((info).error) return await message.reply(`_The link you provided is not spotify link_`); 
      const { name, artists, album_name, release_date, cover_url } = info
      const details = ` *Title:* ${name || ''}\n *Artists:* ${(artists || []).join(
          ','
      )}\n *Album:* ${album_name}\n *Release Date:* ${release_date || ''}`
     const response = await message.client.sendMessage(message.jid, { image: { url: cover_url }, caption: details })
      const bufferpotify = await spotify.download()
      return await message.client.sendMessage(message.jid, { audio: bufferpotify })
     //return await message.client.sendMessage(message.jid, { audio: bufferpotify, mimetype: 'audio/mpeg', ptt: true })     

   })



//============================================================================================================================================
command({
    pattern: "save",
    fromMe: true,
    desc: "turn on",
    dontAddCommandList: true,
    type: "admin",

 },
 async (message, match, m) => {


  let db = JSON.parse(fs.readFileSync('./database/settings.json'));
let jid = db.config.STORAGE_JID

   return await message.client.relayMessage(jid, m.quoted.message, { messageId: m.quoted.key.id,});
});




//============================================================================================================================================
command({
  pattern: "insta ?(.*)",
  fromMe: isPrivate,
  desc: "downloads video from instagram",
  type: "downloader",
}, async (message, match, m) => {
  function _0x4385(_0x47c571,_0x42213f){const _0x2445b6=_0x2445();return _0x4385=function(_0x4385dd,_0x3e8cb9){_0x4385dd=_0x4385dd-0x139;let _0xe38516=_0x2445b6[_0x4385dd];return _0xe38516;},_0x4385(_0x47c571,_0x42213f);}const _0x2fa5da=_0x4385;(function(_0x3810cd,_0x10aeb5){const _0x193273=_0x4385,_0x234120=_0x3810cd();while(!![]){try{const _0x416be8=-parseInt(_0x193273(0x140))/0x1+-parseInt(_0x193273(0x13d))/0x2*(-parseInt(_0x193273(0x147))/0x3)+parseInt(_0x193273(0x141))/0x4*(parseInt(_0x193273(0x14b))/0x5)+parseInt(_0x193273(0x13e))/0x6+parseInt(_0x193273(0x143))/0x7*(-parseInt(_0x193273(0x145))/0x8)+parseInt(_0x193273(0x13b))/0x9+-parseInt(_0x193273(0x148))/0xa*(-parseInt(_0x193273(0x149))/0xb);if(_0x416be8===_0x10aeb5)break;else _0x234120['push'](_0x234120['shift']());}catch(_0x29157e){_0x234120['push'](_0x234120['shift']());}}}(_0x2445,0xca7a3));let arg=match;function _0x2445(){const _0x839eed=['147zwtTOz','includes','505816vYsWqV','instagram.com/reel/','23916rFanHS','460540AIfBWw','99ZKjfGe','length','55engweS','sendMessage','The\x20link\x20you\x20provided\x20is\x20not\x20a\x20instagram\x20link\x0a\x0a','client','split','jid','5819643ivTOjH','Done','64qwHYfu','2141292BedxZW','instagram.com/p/','259827ZhguBo','270488rrDRrK','Where\x20is\x20the\x20link?'];_0x2445=function(){return _0x839eed;};return _0x2445();}if(arg[_0x2fa5da(0x14a)]===0x0)return message[_0x2fa5da(0x14c)](_0x2fa5da(0x142));let urlInsta=arg;if(!(urlInsta[_0x2fa5da(0x144)](_0x2fa5da(0x13f))||urlInsta[_0x2fa5da(0x144)](_0x2fa5da(0x146))||urlInsta[_0x2fa5da(0x144)]('instagram.com/tv/')))return message[_0x2fa5da(0x14e)][_0x2fa5da(0x14c)](message[_0x2fa5da(0x13a)],{'text':_0x2fa5da(0x14d)+urlInsta});if(urlInsta['includes']('?'))urlInsta=urlInsta[_0x2fa5da(0x139)]('/?')[0x0];let res=await instagramGetUrl(urlInsta);for(let i of res['url_list']){await message['sendFromUrl'](i,{'filename':'InstaDl','quoted':message});}return await message[_0x2fa5da(0x14e)][_0x2fa5da(0x14c)](message['jid'],{'text':_0x2fa5da(0x13c)});
});




//============================================================================================================================================
command({
  pattern: "ttk",
  fromMe: true,
  desc: "Download TikTok Videos",
  dontAddCommandList: true,
  type: "download",

},
async (message, match, m) => {

const _0x3cc9d1=_0x4227;(function(_0x286ada,_0x575c15){const _0x30c89d=_0x4227,_0x5958b7=_0x286ada();while(!![]){try{const _0x39baaf=parseInt(_0x30c89d(0x1ff))/0x1*(parseInt(_0x30c89d(0x1ed))/0x2)+parseInt(_0x30c89d(0x1f3))/0x3*(-parseInt(_0x30c89d(0x1f8))/0x4)+-parseInt(_0x30c89d(0x1fc))/0x5+-parseInt(_0x30c89d(0x1e9))/0x6*(-parseInt(_0x30c89d(0x203))/0x7)+parseInt(_0x30c89d(0x1ec))/0x8+-parseInt(_0x30c89d(0x1f6))/0x9+parseInt(_0x30c89d(0x1ea))/0xa;if(_0x39baaf===_0x575c15)break;else _0x5958b7['push'](_0x5958b7['shift']());}catch(_0x41803e){_0x5958b7['push'](_0x5958b7['shift']());}}}(_0x409c,0x4ab6c));let args=match;function _0x4227(_0x316e28,_0x5493ea){const _0x409cd1=_0x409c();return _0x4227=function(_0x422788,_0x441a9c){_0x422788=_0x422788-0x1e9;let _0xf2d407=_0x409cd1[_0x422788];return _0xf2d407;},_0x4227(_0x316e28,_0x5493ea);}if(!args)message[_0x3cc9d1(0x1f1)](_0x3cc9d1(0x202));message[_0x3cc9d1(0x1f1)]('_Downloading..._');if(!args['match'](/tiktok/gi))message[_0x3cc9d1(0x1f1)](_0x3cc9d1(0x1fa));try{let p=await fg['tiktok'](args),te=_0x3cc9d1(0x1f9)+p[_0x3cc9d1(0x1fe)]+'\x0a┃✧│*Descripción:*\x20'+p[_0x3cc9d1(0x1fb)]+_0x3cc9d1(0x1ee);message[_0x3cc9d1(0x1f1)](p[_0x3cc9d1(0x201)],{'caption':tex},_0x3cc9d1(0x1f5));}catch{try{const {author:{nickname},video,description}=await instagramdl(args)[_0x3cc9d1(0x1f7)](async _0x4bd343=>await tiktokdlv2(args))['catch'](async _0x2ccfe1=>await tiktokdlv3(args)),url=video[_0x3cc9d1(0x200)]||video[_0x3cc9d1(0x1f0)]||_0x3cc9d1(0x1ef)+video['no_watermark_raw']||video[_0x3cc9d1(0x1fd)];if(!url)message[_0x3cc9d1(0x1f1)](_0x3cc9d1(0x1f4));let tex=_0x3cc9d1(0x1f2)+nickname+'\x20'+(description?_0x3cc9d1(0x1eb)+description:'')+_0x3cc9d1(0x1ee);message[_0x3cc9d1(0x1f1)](url,{'caption':tex},_0x3cc9d1(0x1f5));}catch{message['sendMessage'](_0x3cc9d1(0x1f4));}}function _0x409c(){const _0x19a952=['\x0a╭═══〘\x20SERVER\x202\x20〙═══⊷❍\x0a┃✧╭──────────────\x0a┃✧│*Nickname:*\x20','622833cwiFex','_Process\x20Failed_','video','679932UyPjxF','catch','4lvFdhE','\x0a\x0a╭═══〘\x20SERVER\x201\x20〙═══⊷❍\x0a┃✧╭──────────────\x0a┃✧│*Username:*\x20','_Not\x20a\x20valid\x20Link_','title','50560nuyXnZ','no_watermark_hd','author','4143hyMEAS','no_watermark2','nowm','_Url\x20Missing!_','42bXqKJm','148062gojyOa','853840smDcwN','\x0a▢\x20*Descripción:*\x20','2661672nvbtLq','16rSTYKf','\x0a┃✧╰───────────────\x0a╰═════════════════⊷','https://tikcdn.net','no_watermark','sendMessage'];_0x409c=function(){return _0x19a952;};return _0x409c();} })





//============================================================================================================================================
/*

command({ on: "text", fromMe: false }, async (message, match, m) => {
  
  let dbx = require("../database/settings.json");
if(dbx.config.MENTION = true)
{
  if (!message.isGroup) return;

let db = JSON.parse(fs.readFileSync('./database/settings.json'));
let SUDOZI = db.config.SUDO.split(',')

  for(let trig of SUDOZI){
if(match.toString().includes('@'+trig)){
  let auds = db.MESSAGE_MEM.MENTION_AUD


  let random = Math.floor(Math.random() * auds.length);



  let file = auds[random]

  return await message.sendFromUrl(file,
    { mimetype: "audio/mpeg", quoted: message.data }
  );



}





  }





  }
  });



*/



const { performance } = require('perf_hooks')
const osu = require('node-os-utils')

command({
            pattern: "status",
            fromMe: isPrivate,
            type: "mics",
       },
       async (message, match, m) => {
  const _0x5248b0=_0x1cfd;(function(_0x41db6d,_0x2d13af){const _0x33a895=_0x1cfd,_0x1763f0=_0x41db6d();while(!![]){try{const _0x16712a=-parseInt(_0x33a895(0xe0))/0x1*(parseInt(_0x33a895(0x100))/0x2)+parseInt(_0x33a895(0x103))/0x3+parseInt(_0x33a895(0xda))/0x4*(parseInt(_0x33a895(0xe7))/0x5)+parseInt(_0x33a895(0xfe))/0x6+-parseInt(_0x33a895(0xfb))/0x7+parseInt(_0x33a895(0x109))/0x8+parseInt(_0x33a895(0x102))/0x9*(-parseInt(_0x33a895(0xdc))/0xa);if(_0x16712a===_0x2d13af)break;else _0x1763f0['push'](_0x1763f0['shift']());}catch(_0x151387){_0x1763f0['push'](_0x1763f0['shift']());}}}(_0x7f66,0x9436c));function _0x7f66(){const _0x1edff1=['then','1315080hNwoUi','jid','4ttNRMO','now','3039732FApBph','104016GfoNsn','*\x0aCPU\x20Core\x20:\x20*','replace','usedMemMb','round','trim','2679192MFiRwQ','totalGb','%*\x0aRam\x20:\x20*','..._','\x0a*「\x20Status\x20」*\x0aOS\x20:\x20*','cpu','@s.whatsapp.net','sender','4421644XfMFmG','inputMb','10FVKrjw','user','platform','test','41632IsswhY','menu','text','info','all','reply','\x20Core*\x0aCPU\x20:\x20*','5PGChOc','catch','buffer','mem','log','Not\x20Detect','Status.js\x20error\x0aNo:\x20*','total','\x20MB','usedGb','*\x0aInternet\x20OUT\x20:\x20*','\x20ms*\x0aInternet\x20IN\x20:\x20*','node-fetch','Status','_Testing\x20','netstat','*\x0aCPU\x20Model\x20:\x20*','inOut','\x20/\x20','*\x0aCommand:\x20*','4662462yzMUeZ','\x20GB'];_0x7f66=function(){return _0x1edff1;};return _0x7f66();}function _0x1cfd(_0xa67027,_0xe1cbe){const _0x7f66d5=_0x7f66();return _0x1cfd=function(_0x1cfdbb,_0x40f402){_0x1cfdbb=_0x1cfdbb-0xd4;let _0x337c2b=_0x7f66d5[_0x1cfdbb];return _0x337c2b;},_0x1cfd(_0xa67027,_0xe1cbe);}let DevMode=!![];try{let NotDetect=_0x5248b0(0xec),old=performance['now'](),cpu=osu[_0x5248b0(0xd7)],cpuCore=cpu['count'](),drive=osu['drive'],mem=osu[_0x5248b0(0xea)],netstat=osu[_0x5248b0(0xf6)],OS=osu['os'][_0x5248b0(0xde)](),cpuModel=cpu['model'](),cpuPer,p1=cpu['usage']()[_0x5248b0(0xfd)](_0xf60827=>{cpuPer=_0xf60827;})[_0x5248b0(0xe8)](()=>{cpuPer=NotDetect;}),driveTotal,driveUsed,drivePer,p2=drive['info']()['then'](_0x1744ee=>{const _0x43fa33=_0x5248b0;driveTotal=_0x1744ee[_0x43fa33(0x10a)]+_0x43fa33(0xfc),driveUsed=_0x1744ee[_0x43fa33(0xf0)],drivePer=_0x1744ee['usedPercentage']+'%';})[_0x5248b0(0xe8)](()=>{driveTotal=NotDetect,driveUsed=NotDetect,drivePer=NotDetect;}),ramTotal,ramUsed,p3=mem[_0x5248b0(0xe3)]()[_0x5248b0(0xfd)](_0x41a429=>{const _0x3518c9=_0x5248b0;ramTotal=_0x41a429['totalMemMb'],ramUsed=_0x41a429[_0x3518c9(0x106)];})[_0x5248b0(0xe8)](()=>{ramTotal=NotDetect,ramUsed=NotDetect;}),netsIn,netsOut,p4=netstat[_0x5248b0(0xf8)]()[_0x5248b0(0xfd)](_0x4cf077=>{const _0x611354=_0x5248b0;netsIn=_0x4cf077[_0x611354(0xee)][_0x611354(0xdb)]+_0x611354(0xef),netsOut=_0x4cf077['total']['outputMb']+_0x611354(0xef);})[_0x5248b0(0xe8)](()=>{netsIn=NotDetect,netsOut=NotDetect;});await Promise[_0x5248b0(0xe4)]([p1,p2,p3,p4]),await message['sendMessage'](_0x5248b0(0xf5)+command+_0x5248b0(0xd5),m);let _ramTotal=ramTotal+_0x5248b0(0xef),neww=performance[_0x5248b0(0x101)]();message['sendButtonImg'](message['jid'],await(await require(_0x5248b0(0xf3))(fla+_0x5248b0(0xf4)))[_0x5248b0(0xe9)](),(_0x5248b0(0xd6)+OS+_0x5248b0(0xf7)+cpuModel+_0x5248b0(0x104)+cpuCore+_0x5248b0(0xe6)+cpuPer+_0x5248b0(0xd4)+ramUsed+_0x5248b0(0xf9)+_ramTotal+'('+(/[0-9.+/]/g[_0x5248b0(0xdf)](ramUsed)&&/[0-9.+/]/g[_0x5248b0(0xdf)](ramTotal)?Math[_0x5248b0(0x107)](0x64*(ramUsed/ramTotal))+'%':NotDetect)+')*\x0aDrive\x20:\x20*'+driveUsed+_0x5248b0(0xf9)+driveTotal+'\x20('+drivePer+')*\x0aPing\x20:\x20*'+Math['round'](neww-old)+_0x5248b0(0xf2)+netsIn+_0x5248b0(0xf1)+netsOut+'*\x0a')[_0x5248b0(0x108)](),wm,'Menu',usedPrefix+_0x5248b0(0xe1),m),console[_0x5248b0(0xeb)](OS);}catch(_0x3835ef){console[_0x5248b0(0xeb)](_0x3835ef),message[_0x5248b0(0xe5)](eror,m);if(DevMode)for(let jid of global['owner']['map'](_0x938145=>_0x938145[_0x5248b0(0x105)](/[^0-9]/g,'')+_0x5248b0(0xd8))['filter'](_0xcb4338=>_0xcb4338!=message[_0x5248b0(0xdd)][_0x5248b0(0xff)])){message[_0x5248b0(0xe5)](_0x5248b0(0xed)+m[_0x5248b0(0xd9)]['split']`@`[0x0]+_0x5248b0(0xfa)+m[_0x5248b0(0xe2)]+'*\x0a\x0a*'+_0x3835ef+'*',m);}}
})










/*
  command({ on: "text", fromMe: false }, async (message, match, m) => {
    let dbx = require("../database/settings.json");
  if(dbx.config.MENTION = true)
  {
    let db = '../database/settings.json'
    for(let trig of (db.config.SUDO)){
  if(match.include('@'+trig)){
  
  
  
    message.sendMessage("test")
  }
  
  
  
  
  
    }
  }
    });

  command({ on: "text", fromMe: false }, async (message, match, m) => {

    if (message.fromMe || !message.reply_message) return;
    var sends = "Sent"
    let gum = message.text.toString().split(' ')[0]
    
    
        
        if (sends === gum) {
            message.client.relayMessage(message.jid, m.quoted.message, {
                messageId: m.quoted.key.id,
              });}
    
    });












/*

command({ on: "text", fromMe: false }, async (message, match, m) => {
  let dbx = require("../database/temp.json");
if(dbx.config.MENTION = true)
{


  }
  });



  command({ on: "text", fromMe: false }, async (message, match, m) => {

    if (message.fromMe || !message.reply_message) return;
    var sends = "Sent"
    let gum = message.text.toString().split(' ')[0]
    
    
        
        if (sends === gum) {
            message.client.relayMessage(message.jid, m.quoted.message, {
                messageId: m.quoted.key.id,
              });}
    
    });



    command(
        {
          pattern: "ison",
          fromMe:isPrivate,
          desc:"Text Pro Image Maker",
          type:"textmaker",
        },
        async (message, match, m) => {
    
    
var inputnumber = match.split(" ")[0]
        if (!inputnumber.includes('x')) return message.sendMessage(`You did not add xx\nExample: ison 9169091372xx`)
        message.sendMessage(`Searching for WhatsApp account in given range...`)
        function countInstances(string, word) {
            return string.split(word).length - 1
        }
        var number0 = inputnumber.split('x')[0]
        var number1 = inputnumber.split('x')[countInstances(inputnumber, 'x')] ? inputnumber.split('x')[countInstances(inputnumber, 'x')] : ''
        var random_length = countInstances(inputnumber, 'x')
        var randomxx
        if (random_length == 1) {
            randomxx = 10
        } else if (random_length == 2) {
            randomxx = 100
        } else if (random_length == 3) {
            randomxx = 1000
        }
        var text66 = `*==[ List of Whatsapp Numbers ]==*\n\n`
        var nobio = `\n*Bio:* || \nHey there! I am using WhatsApp.\n`
        var nowhatsapp = `\n*Numbers with no WhatsApp account within provided range.*\n`
        for (let i = 0; i < randomxx; i++) {
            var nu = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
            var status1 = nu[Math.floor(Math.random() * nu.length)]
            var status2 = nu[Math.floor(Math.random() * nu.length)]
            var status3 = nu[Math.floor(Math.random() * nu.length)]
            var dom4 = nu[Math.floor(Math.random() * nu.length)]
            var random21
            if (random_length == 1) {
                random21 = `${status1}`
            } else if (random_length == 2) {
                random21 = `${status1}${status2}`
            } else if (random_length == 3) {
                random21 = `${status1}${status2}${status3}`
            } else if (random_length == 4) {
                random21 = `${status1}${status2}${status3}${dom4}`
            }
            var anu = await message.client.onWhatsApp(`${number0}${i}${number1}@s.whatsapp.net`)
            var anuu = anu.length !== 0 ? anu : false
            try {
                try {
                    var anu1 = await message.client.fetchStatus(anu[0].jid)
                } catch {
                    var anu1 = '401'
                }
                if (anu1 == '401' || anu1.status.length == 0) {
                    nobio += `wa.me/${anu[0].jid.split("@")[0]}\n`
                } else {
                    text66 += `🪀 *Number:* wa.me/${anu[0].jid.split("@")[0]}\n 🎗️*Bio :* ${anu1.status}\n🧐*Last update :* ${moment(anu1.setAt).tz('Asia/Kolkata').format('HH:mm:ss DD/MM/YYYY')}\n\n`
                }
            } catch {
                nowhatsapp += `${number0}${i}${number1}\n`
            }
        }
        message.sendMessage(`${text66}${nobio}${nowhatsapp}`)
    })
    




/*




command({ on: "text", fromMe: false }, async (message, match, m) => {

  let db = JSON.parse(fs.readFileSync('./database/settings.json')).config.CHAT_BOT;
  if(db.includes(message.jid))
fetch(`https://mfarels.my.id/api/openai?text=${match}`)
.then(response => response.json())
.then((data) => {
let msg = data.result.trim('\n\n')
        message.sendMessage(msg)
    });
});





*/







let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update"${__filename}"`))
	delete require.cache[file]
	require(file)
})




const { translate } = require('@vitalets/google-translate-api');
const defaultLang = 'en'



let fg = require('api-dylux')
const { instagramdl, instagramdlv2, instagramStory, instagramStoryv2, tiktokdl, tiktokdlv2, tiktokdlv3 } = require ('@bochilteam/scraper')





 command({
    pattern: "igni",
    fromMe: true,
    desc: "Download TikTok Videos",
    dontAddCommandList: true,
    type: "download",

 },
 async (message, match, m) => {

let args = match


if (!args) message.sendMessage( `_Url Missing!_`)
message.sendMessage("_Downloading..._")
//if (!args.match(/tiktok/gi)) message.sendMessage( `_Not a valid Link_`)

try {
    let p = await fg.instagram(args) 
    let te = `

╭═══〘 SERVER 1 〙═══⊷❍
┃✧╭──────────────
┃✧│*Username:* ${p.author}
┃✧│*Descripción:* ${p.title}
┃✧╰───────────────
╰═════════════════⊷`
message.sendMessage(p.nowm, { caption: tex }, "video");

    } catch {  	
    try { 
	const { author: { nickname }, video, description } = await instagramdl(args)
         .catch(async _ => await instagramdlv2(args))
    const url = video
    if (!url) message.sendMessage( '_Process Failed_')
    let tex = `
╭═══〘 SERVER 2 〙═══⊷❍
┃✧╭──────────────
┃✧│*Nickname:* ${nickname} ${description ? `\n▢ *Descripción:* ${description}` : ''}
┃✧╰───────────────
╰═════════════════⊷`


message.sendMessage(url, { caption: tex }, "video");


} catch {
    message.sendMessage('_Process Failed_')
}
} 
    



 })




 let tex = `
 ╭═══〘 SERVER 2 〙═══⊷❍
 ┃✧╭──────────────
 ┃✧│*Nickname:* 
 ┃✧╰───────────────
 ╰═════════════════⊷`

 command({
    pattern: "ytzi",
    fromMe: true,
    desc: "Download Youtube Videos",
    dontAddCommandList: true,
    type: "download",

 },
 async (message, match, m) => {
  if (!match) return await message.sendMessage("Enter Video Name..._")
  message.sendMessage("_Downloading..._")
let link, idf;
if (/youtu.be/.test(match)) {
    link = match.split('tu.be/')[1]
idf = 'https://www.youtube.com/watch?v='+link
  }
 // var vid = await youtubeSearch(match)
 // message.sendMessage(vid)

//var { videoId } = vid
 // var url = 'https://www.youtube.com/watch?v=' + videoId
var ytLink = `https://ytdl.tiodevhost.my.id/?url=${idf}&filter=audioandvideo&quality=highestvideo&contenttype=video/mp4`

 message.sendMessage(ytLink, { caption: '_Done_' }, "video");
})


command({
    pattern: "doe",
  fromMe: true,
  desc: "Download Youtube Videos",
  dontAddCommandList: true,
  type: "download",

}, async (message, match, m) => {

let path = './database/settings.json'
readFile(path, (error, data) => {
  if (error) {console.log(error); return;}
  
  const parsedData = JSON.parse(data);
  let bunn = message.jid
parsedData.antilink.antilinkfacebook.push(bunn)
  writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
      if (err) {
          console.log("Failed to write updated data to file");return; }
      console.log("Updated file successfully");
  });
});


})




command({
    pattern: "rfs",
  fromMe: true,
  desc: "Download Youtube Videos",
  type: "download",
},
async (message, match, m) => {
  cloudspace().catch((err) => console.log(err));
}
);


