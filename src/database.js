import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';

const DATABSE_PATH = './database.json';

const DEFAULT_GUILD_DATA = {
    prefix: '!',
    accounts: {},
};

const DEFAULT_ACCOUNT = {
    xp: 0,
};

let guilds = {};

async function load() {
    console.log('attempt to load database...');

    guilds = {};
    if (existsSync(DATABSE_PATH)) {
        const dbJson = (await readFile(DATABSE_PATH)).toString();
        const db = JSON.parse(dbJson);
        guilds = db.guilds;
    }

    console.log('database successfully loaded!');
}

async function save() {
    console.log('attempt to save database...');

    const db = { guilds };
    const dbJson = JSON.stringify(db, null, 2);
    await writeFile(DATABSE_PATH, dbJson);

    console.log('database successfully saved!');
}

/**
 * @param {import('discord.js').Guild} guild
 */
function getGuildData(guild) {
    if (!guilds[guild.id]) {
        guilds[guild.id] = { ...DEFAULT_GUILD_DATA };
    }

    return guilds[guild.id];
}

/**
 * @param {import('discord.js').GuildMember} member
 */
function getAccount(member) {
    const { accounts } = getGuildData(member.guild);

    if (!accounts[member.id]) {
        accounts[member.id] = { ...DEFAULT_ACCOUNT };
    }

    return accounts[member.id];
}

export const database = {
    load,
    save,
    getGuildData,
    getAccount,
};
