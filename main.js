const Discord = require('discord.js');
const database = require('./database');
const fs = require('fs');

const bot = new Discord.Client();

const commands = {};

fs.readFile('./token.txt', (err, data) => {
	if (err) {
		return console.error(`Error on reading token.txt: ${err}`);
	}
	let token = data.toString();
	bot.login(token);
});

bot.on('ready', () => {
	console.log('successfully logged in discord!');
	database.load('./database.json');
	loadCommands('./commands');
});

process.on("SIGINT", () => {
	console.log('closing...');
	bot.destroy();
	database.save('./database.json');
});

bot.on('message', msg => {
	if (msg.author.bot || msg.channel.type != "text") return;
	database.getAccount(msg.member).xp++;

	let prefix = database.getGuildData(msg.guild).prefix;
	if (msg.content.toLowerCase().startsWith(prefix)) {
		let m = msg.content.slice(prefix.length);
		for (let cname in commands) {
			if (m.startsWith(cname)) {
				let args = m.slice(cname.length).split(' ').filter(Boolean);
				commands[cname].run(bot, msg, args, database);
			}
		}
	}
});

function loadCommands(path) {
	console.log('loading commands...');
	const files = fs.readdirSync(path).filter(f => f.endsWith('.js'));
	files.forEach(file => {
		const cname = file.toLowerCase().substring(0, file.length-3);
		const command = require(path + '/' + file);
		commands[cname] = command;
		console.log(`* ${file} loaded`);
	});
	console.log('commands successfully loaded');
}
