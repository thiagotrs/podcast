
exports.up = knex => knex.schema.createTable('episodes_playlists', table => {
    table.integer('playlist_id').notNullable()
    table.integer('episode_id').notNullable()
    
    table.primary(['playlist_id','episode_id'])
    
    table.foreign('playlist_id').references('playlists.id').onDelete('CASCADE')
    table.foreign('episode_id').references('episodes.id').onDelete('CASCADE')
})

exports.down = knex => knex.schema.dropTable('episodes_playlists')
