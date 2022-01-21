import { readdir } from "fs/promises";
import { database } from "./database.js";

const COMMANDS_PATH = "./commands";

/** @type {import('./command').Command[]} */
let commands = [];

/**
 * @private
 * @param {string} modulePath
 * @returns {import('./command').Command}
 */
async function loadCommand(modulePath) {
    const { default: command } = await import(modulePath);

    if (typeof command != 'object') {
        throw new Error(`${modulePath}: missing default export`);
    }

    commands.push(command);
    return command;
}

async function loadCommands() {
    console.log('loading commands...');

    commands = [];

    const files = (await readdir('./src/' + COMMANDS_PATH)).filter(f => f.endsWith('.js'));
    const loadPromises = files.map(f => loadCommand(COMMANDS_PATH + '/' + f));

    for await (const command of loadPromises) {
        console.log(`- ${command.name}`);
    }

    console.log('commands successfully loaded!');
}

/**
 * @param {import('discord.js').Message} message
 */
async function handleMessage(message) {
    if (!message.guild || message.channel.type != "text") {
        throw new Error('invalid message');
    }

    const { prefix } = database.getGuildData(message.guild);

    if (!message.content.toLowerCase().startsWith(prefix)) {
        return;
    }

    const userInput = message.content.slice(prefix.length);

    const usedCommand = commands.find(({ name }) => userInput.startsWith(name));

    if (!usedCommand) {
        return;
    }

    const args = userInput.slice(usedCommand.name.length).split(' ').filter(Boolean);

    await usedCommand.run({ client: message.client, message, database, args });
}

export const commandHandler = {
    loadCommands,
    handleMessage,
};
