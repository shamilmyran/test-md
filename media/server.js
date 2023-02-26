

const chalk = require("chalk")
let fs = require('fs')
const {
	writeFile
} = require('fs/promises')
const fetch = require('node-fetch')
const server = require('../server')
const { MakeSession } = require("../lib/session");
const SESSION_ID = process.env.SESSION_ID



async function Singmulti() {

    if (!fs.existsSync('./session.json')) {

	if (!fs.existsSync('./session.json'))
	if (!SESSION_ID === false){
		console.log('Generating Session')
	await MakeSession(SESSION_ID,'./session.json')
	}
	setTimeout(() => {
        dbsearch()
	}, 3000)
} else {
    dbsearch()
}
  }




async function dbsearch(){
    if (!fs.existsSync('./database/temp.json')) {

	try{
	await fetch("https://gist.github.com/Alien-Alfa/47e35761830a7b1e43087aa7f3ceeaa1/raw")
		  .then(response => response.json())
		  .then((data) => {
	  
			   writeFile(`./database/temp.json`, JSON.stringify(data))
			})
		  console.log('Server Start!') 

setTimeout(() => {
	checkolduser()
}, 1000)

	}catch(err){
		if(err.toString().includes('ENOTFOUND')){ return 	console.log(chalk.redBright("Bro You Are Offline")) }
		else { return console.log(err)}
	}
} else { checkolduser() }

}



async function checkolduser() {

	if (!fs.existsSync("./database/settings.json")) {
			if (!fs.existsSync("./session.json")) {
return Singmulti()
		
}
	if (!fs.existsSync("./database/temp.json")) { dbsearch()} //return to mahe temp.js if not found

	if (fs.existsSync("./database/temp.json")) {
		 //if temp.js is present
		let session = require("../session.json");
		let ibm1 = await (session.creds.me.id).split(":")[0]
		let ibm2 = await (session.creds.me.id).split("@")[1]
		let ibm = ibm1+'@'+ibm2
		let updata = JSON.stringify(fs.readFileSync('./database/temp.json'));
		let diedata  = require('../database/temp.json');

		let cause = diedata.toString().includes(ibm)
		if(cause){
		console.log('⭕ User Fount')
			existconf(ibm)
		}if(!cause){
			console.log('⭕ User Not Fount')
			newconf()
		}
}} else { server() }

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
		server()
	}catch(err){
		if(err.toString().includes('ENOTFOUND')){ return 	console.log(chalk.redBright("Bro You Are Offline")) }
		else { return console.log(err)}
	}

}


async function existconf(ibm){


		let updata  = require('../database/temp.json');
		try{
		for(let i of updata){
			if(i.includes(ibm)){

		let trig = await i.toString().split(':')[1]

		let bhai = "https://gist.github.com/Alien-Alfa/"+trig+"/raw"

		await fetch(bhai)
			  .then(response => response.json())
			  .then((data) => {
		  
				   writeFile(`./database/settings.json`, JSON.stringify(data, null, 2))
				})
			  console.log('Previous Database Generated!') 
			  server()
			}}
	
	}catch(err){
		if(err.toString().includes('ENOTFOUND')){ return 	console.log(chalk.redBright("Bro You Are Offline")) }
		else { return console.log(err)}
	}

}

Singmulti()
