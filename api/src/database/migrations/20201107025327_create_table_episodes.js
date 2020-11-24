
exports.up = knex => knex.schema.createTable('episodes', table => {
    table.increments('id').primary()
    table.string('title').notNullable().unique()
    table.text('description')
    table.string('link').notNullable()
    table.string('media').notNullable()
    table.string('duration')
    table.string('image')
})

exports.down = knex => knex.schema.dropTable('episodes')