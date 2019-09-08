module.exports.run = async (bot, msg, args, database) => {
    await msg.channel.send(`Твой xp: ${(await database.getAccount(msg.guild, msg.author)).xp}`);
}