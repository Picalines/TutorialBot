import { readFile } from "fs/promises";

const TOKEN_FILENAME = 'token.txt';
const TOKEN_PATH = './' + TOKEN_FILENAME;

async function load() {
    let fileBuffer;

    try {
        fileBuffer = await readFile(TOKEN_PATH);
    }
    catch {
        throw new Error(`please create the file ${TOKEN_FILENAME} in the same folder where package is located.json and insert your discord token there`);
    }

    return fileBuffer.toString();
}

/**
 * @param {import('discord.js').Client} client
 */
async function login(client) {
    return client.login(await load());
}

export const tokenLoader = {
    load,
    login,
};
