
exports.up = knex => knex.schema.createTable('channels_users', table => {
    table.integer('channel_id').notNullable()
    table.integer('user_id').notNullable()
    
    table.primary(['channel_id','user_id'])
    
    table.foreign('channel_id').references('channels.id').onDelete('CASCADE')
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
});

exports.down = knex => knex.schema.dropTable('channels_users')