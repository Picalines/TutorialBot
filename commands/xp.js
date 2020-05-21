module.exports.run = (bot, msg, args, database) => {
    msg.channel.send(`Твой xp: ${(database.getAccount(msg.member)).xp}`);
}