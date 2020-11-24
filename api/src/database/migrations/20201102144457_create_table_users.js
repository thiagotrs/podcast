
exports.up = knex => knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('email').unique().notNullable()
    table.string('pass')
    table.string('social_id')
    table.string('role').notNullable()
})

exports.down = knex => knex.schema.dropTable('users')