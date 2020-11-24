
exports.up = knex => knex.schema.createTable('playlists', table => {
    table.increments('id').primary()
    table.string('title').notNullable().unique()
    table.text('description')
    table.integer('user_id').references('users.id').notNullable().onDelete('CASCADE')
})

exports.down = knex => knex.schema.dropTable('playlists')
