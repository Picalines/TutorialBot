export default {
    name: 'xp',

    description: 'Пишет ваш xp',

    run: async ({ message, database }) => {
        await message.channel.send(`Твой xp: ${(database.getAccount(message.member)).xp}`);
    },
};
