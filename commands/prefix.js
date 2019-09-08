module.exports.run = async (bot, msg, args, database) => {
	database.getGuildData(msg.guild).prefix = args[0];
	await msg.channel.send(`Новый префикс для команд: '${args[0]}'`);
}
