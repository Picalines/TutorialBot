const fs = require('fs');

let guilds = {};

const load = (path) => {
	console.log('attempt to load database...');
	let data = { guilds: {} };
	if (fs.existsSync(path)) {
		data = JSON.parse(fs.readFileSync(path).toString());
	}
	guilds = data.guilds;
	console.log('database successfully loaded!');
}

const save = (path) => {
	console.log('attempt to save database...');
	fs.writeFileSync(path, JSON.stringify({ guilds }, null, 4));
	console.log('database successfully saved!');
}

const getGuildData = (guild) => {
	if (!guilds[guild.id]) {
		guilds[guild.id] = {
			prefix: '!',
			accounts: {},
		}
	}
	return guilds[guild.id];
}

const getAccount = (member) => {
	const g = getGuildData(member.guild);
	if (!g.accounts[member.id]) {
		g.accounts[member.id] = {
			xp: 0,
		}
	}
	return g.accounts[member.id];
}

module.exports = {
	load,
	save,
	getGuildData,
	getAccount,
}
