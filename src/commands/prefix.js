export default {
    name: 'prefix',

    description: 'Меняет префикс команд на сервере',

    run: async ({ message, database, args }) => {
        if (!args[0]) return;

        const guildData = database.getGuildData(message.guild);
        guildData.prefix = args[0];

        message.channel.send(`Новый префикс для команд: '${args[0]}'`);
    },
};
