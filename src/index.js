import { Client } from "discord.js";
import { commandHandler } from "./commandHandler.js";
import { database } from "./database.js";
import { tokenLoader } from "./token.js";

const client = new Client();

async function main() {
    console.log('starting bot...');
    await database.load();
    await commandHandler.loadCommands();
    await tokenLoader.login(client);
}

client.on('ready', () => {
    console.log('successfully logged in discord!');
    console.log('(press Ctrl+C in the terminal to exit)');
});

process.on("SIGINT", () => {
    console.log('closing...');
    client.destroy();
    database.save();
});

client.on('message', message => {
    if (message.author.bot || message.channel.type != "text" || !message.member) {
        return;
    }

    database.getAccount(message.member).xp++;

    commandHandler.handleMessage(message);
});

main();
