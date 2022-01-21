import { command } from '../command.js';

export default command({
    name: 'typed',

    description: 'command даёт подсказки в редакторе!',

    run: async ({ message }) => {
        await message.reply('vscode видит свойства у message!');

        // command помогает писать код в редакторе.
        // Используй его, чтобы не опечататься!
    }
});
