export default {
	name: 'hi',

	description: 'Приветствует вас!',

	run: async ({ message }) => {
		await message.channel.send('Здравствуй!');
	},
};
