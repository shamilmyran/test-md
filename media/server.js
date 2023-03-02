

const chalk = require("chalk")
let fs = require('fs')
const {
	writeFile,
    readFile
} = require('fs/promises')
const fetch = require('node-fetch')
const server = require('../server')
const { MakeSession } = require("../lib/session");
let conf = require('../config')
const SESSION_ID = conf.SESSION_ID
const got = require("got");





async function Singmulti() {

    if (!fs.existsSync('./session.json')) {

	if (!fs.existsSync('./session.json'))
	if (!SESSION_ID === false){
		console.log('Generating Session')
	await MakeSession(SESSION_ID,'./session.json')
	}
	setTimeout(() => {
        checkolduser()
	}, 3000)
} else {
    checkolduser()
}
  }





async function checkolduser() {

	if (!fs.existsSync("./database/settings.json")) {
			if (!fs.existsSync("./session.json")) {
return Singmulti()
		
}

let session = require("../session.json");
let ibm1 = await (session.creds.me.id).split(":")[0]
let ibm2 = await (session.creds.me.id).split("@")[1]
let ibm = ibm1+'@'+ibm2      
let filenamzi = ibm + ".json"
try{
var { statusCode } = await got("https://gist.github.com/Alien-Alfa/a216db893ba4f4a18d4f1476bfc1bb4d/raw/"+filenamzi);
if (statusCode == 200) {
		console.log('⭕ User Found')
			existconf(filenamzi)
		}

	}catch(err) 
		{
			console.log('⭕ User Not Found')
			newconf()
		}
	

} else { server() }

}



async function newconf(){
	try{
				let session = require("../session.json");
		let ibm1 = await (session.creds.me.id).split(":")[0]
				await fetch("https://gist.github.com/Alien-Alfa/0feba1fa2cc26c182a6e56a59ecd84f9/raw")
		.then(response => response.json())
		.then((data) => {
	data.config.SUDO = ibm1
			 writeFile(`./database/settings.json`, JSON.stringify(data, null, 2))
		  })
		console.log('New Database Created!') 
		setTimeout(() => {
			server()
		}, 3000)
		}catch(err){
		if(err.toString().includes('ENOTFOUND')){ return 	console.log(chalk.redBright("Bro You Are Offline")) }
		else { return console.log(err)}
	}

}


async function existconf(filenamzi){


try{
	let bhai = await "https://gist.github.com/Alien-Alfa/a216db893ba4f4a18d4f1476bfc1bb4d/raw/"+filenamzi

	await fetch(bhai)
		  .then(response => response.json())
		  .then((data) => {
	  
			   writeFile(`./database/settings.json`, JSON.stringify(data, null, 2))
			})
		  console.log('Previous Database Generated!') 
		

			setTimeout(() => {
				server()
			}, 3000)	
	
	}catch(err){
		if(err.toString().includes('ENOTFOUND')){ return 	console.log(chalk.redBright("Bro You Are Offline")) }
		else { return console.log(err)}
	}

}

Singmulti()