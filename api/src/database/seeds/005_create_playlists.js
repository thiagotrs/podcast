
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('playlists').del()
    .then(function () {
      // Inserts seed entries
      return knex('playlists').insert([
        {
          id: 1,
          title: 'Mais Tarde',
          description: 'Lista para escutar mais tarde.',
          user_id: 1
        },
        {
          id: 2,
          title: 'Ciência',
          description: 'Lista para escutar mais tarde.',
          user_id: 1
        },
        {
          id: 3,
          title: 'Top 10',
          description: 'Lista para escutar mais tarde.',
          user_id: 2
        }
      ]);
    });
};
