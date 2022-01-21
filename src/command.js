/**
 * @typedef Command
 * @property {string} name
 * @property {string} description
 * @property {(context: CommandContext) => any} run
 */

/**
 * @typedef CommandContext
 * @property {import('discord.js').Client} client
 * @property {import('discord.js').Message} message
 * @property {import('./database')} database
 * @property {string[]} args
 */

/**
 * type hint for command information
 * @param {Command} info
 */
 export function command(info) {
    return info;
}
