const Discord = require('discord.js');
const database = require('./database');
const fs = require('fs');
const utils = require('./utils');

const bot = new Discord.Client();

const commands = {};

fs.readFile('./token.txt', async (err, data) => {
	if (err) {
		console.error(`Error on reading token.txt: ${err}`);
		return;
	}
	let token = data.toString();
	await bot.login(token);
});

bot.on('ready', async () => {
	console.log('Successfully logged in Discord!');
	await database.load('./database.json');
	await loadCommands('./commands');
});

process.on("SIGINT", async () => {
	console.log('Closing...');
	await bot.destroy();
	await database.save('./database.json');
});

bot.on('message', async msg => {
	if (msg.author.bot) return;
	let acc = database.getAccount(msg.member);
	acc.xp++;
	let prefix = database.getGuildData(msg.guild).prefix;
	if (msg.content.toLowerCase().startsWith(prefix)) {
		let m = msg.content.slice(prefix.length);
		for (let cname in commands) {
			if (m.startsWith(cname)) {
				let args = m.slice(cname.length).split(' ').filter(el => el != '');
				await commands[cname].run(bot, msg, args, database);
			}
		}
	}
});

async function loadCommands(path) {
	console.log('loading commands...');
	let files = await utils.readDirAsync(path);
	files.forEach(file => {
		if (file.endsWith('.js')) {
			let cname = file.toLowerCase().substring(0, file.length-3);
			let command = require(`${path}/${file}`);
			commands[cname] = command;
		}
	});
}
