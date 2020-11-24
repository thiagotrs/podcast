
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('channels_users').del()
    .then(function () {
      // Inserts seed entries
      return knex('channels_users').insert([
        { channel_id: 1, user_id: 1 },
        { channel_id: 2, user_id: 1 },
        { channel_id: 1, user_id: 2 }
      ]);
    });
};
