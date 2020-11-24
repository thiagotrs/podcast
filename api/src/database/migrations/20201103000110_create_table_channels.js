
exports.up = knex => knex.schema.createTable('channels', table => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.string('link').notNullable()
    table.text('description')
    table.string('feed').unique().notNullable()
    table.string('image')
})

exports.down = knex => knex.schema.dropTable('channels')
