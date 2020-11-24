
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('episodes_playlists').del()
    .then(function () {
      // Inserts seed entries
      return knex('episodes_playlists').insert([
        { episode_id: 1, playlist_id: 1 },
        { episode_id: 1, playlist_id: 2 }
      ]);
    });
};
