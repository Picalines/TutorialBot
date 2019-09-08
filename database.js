const utils = require('./utils');

let guilds = {};

const load = async (path) => {
	console.log('attempt to load database...');
	if (!await utils.existsAsync(path)) {
		await utils.writeFileAsync(path, JSON.stringify({ guilds: {} }));
	}
	let data = JSON.parse(await utils.readFileAsync(path));
	guilds = data.guilds;
	console.log('database successfully loaded!');
}

const save = async (path) => {
	console.log('attempt to save database...');
	let data = {
		guilds: guilds
	}
	await utils.writeFileAsync(path, JSON.stringify(data, null, 4));
	console.log('database successfully saved!');
}

const getGuildData = (guild) => {
	if (!guilds[guild.id]) {
		guilds[guild.id] = {
			prefix: '!',
			accounts: {}
		}
	}
	return guilds[guild.id];
}

const getAccount = (guild, user) => {
	let g = getGuildData(guild);
	if (!g.accounts[user.id]) {
		g.accounts[user.id] = {
			xp: 0
		}
	}
	return g.accounts[user.id];
}

module.exports = {
	load: load,
	save: save,
	getGuildData: getGuildData,
	getAccount: getAccount
}
