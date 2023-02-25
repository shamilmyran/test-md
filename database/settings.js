/* Copyright (C) 2022 Alien-Alfa.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

Alien-Alfa Alien-Alfa
*/
const fs = require("fs");
let req = JSON.parse(fs.readFileSync('./database/settings.json'));

const { Sequelize } = require("sequelize");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

const toBool = (x) => x == "true";

DATABASE_URL = process.env.DATABASE_URL || "./lib/database.db";
let HANDLER = "false";

module.exports = {
  DATABASE_URL: DATABASE_URL,
  DATABASE:DATABASE_URL === "./lib/database.db"? new Sequelize({dialect: "sqlite",storage: DATABASE_URL,logging: false,}): new Sequelize(DATABASE_URL, {dialect: "postgres",ssl: true,protocol: "postgres",dialectOptions: {native: true,ssl: { require: true, rejectUnauthorized: false },},logging: false,}),
    
  LOGS: req.config.LOGS || true,
  ANTILINK_ACTION: req.config.ANTILINK_ACTION || "ban",
  SESSION_ID: req.config.SESSION_ID || process.env.SESSION_ID,
  LANG: req.config.LANG || "EN",
  HANDLERS: req.config.HANDLERS === "false" ? "^" : req.config.HANDLERS,
  RMBG_KEY: req.config.RMBG_KEY || false,
  BRANCH: req.config.BRANCH || "Latest",
  PACKNAME: req.config.PACKNAME || "Aurora" ,
  WELCOME_MSG: req.MESSAGE_MEM.WELCOME_MSG || "Hi @user Welcome to @gname",
  GOODBYE_MSG: req.MESSAGE_MEM.GOODBYE_MSG || "Hi @user It was Nice Seeing you",
  AUTHOR: req.config.AUTHOR || "Alien-Alfa",
  SUDO: req.config.SUDO || "",
  HEROKU_APP_NAME: req.config.HEROKU_APP_NAME || process.env.HEROKU_APP_NAME,
  HEROKU_API_KEY: req.config.HEROKU_API_KEY ||process.env.HEROKU_API_KEY,
  OWNER_NAME: req.config.OWNER_NAME || "Alien-Alfa",
  BOT_NAME: req.config.BOT_NAME || "Aurora",
  WORK_TYPE: req.config.WORK_TYPE || "private",
  MODE: req.config.MODE || "private",
  ALIVE: req.MESSAGE_MEM.ALIVE || "```I am active```",


  FOOTER:  req.config.FOOTER || "Alien-Alfa",
  THEME: req.config.THEME || "alfa",
  FONT_STYLE: req.config.FONT_STYLE || "1", //57
  LANGUAGE: req.config.LANGUAGE || "EN", 
  INTERNAL_MENU: req.config.INTERNAL_MENU || "active",
  STORAGE_JID: req.config.STORAGE_JID || "",

  B1:'╭════〘 ',
  B2:' 〙════⊷❍',
  B3:'┃✧╭─────────────────',
  B4:'┃✧│',
  B5:'┃✧╰─────────────────\n╰══════════════════⊷❍',

  KOYEB_APP_NAME: process.env.KOYEB_APP_NAME || "",
  KOYEB_API_KEY:process.env.KOYEB_API_KEY || "",



};