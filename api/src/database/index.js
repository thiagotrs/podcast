const knexConfig = require('../../knexfile')
const knex = require('knex')(knexConfig['development'])

// SQLite Enabling Foreign Key Support
async function EnableForeignKey(knex) {
    await knex.raw('PRAGMA foreign_keys = ON');
}
EnableForeignKey(knex)

module.exports = knex