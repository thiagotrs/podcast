const bcrypt = require('bcrypt')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(async function () {
      // Inserts seed entries
      const hashedPass1 = await bcrypt.hash('12345', 10);
      const hashedPass2 = await bcrypt.hash('12345', 10);
      const hashedPass3 = await bcrypt.hash('12345', 10);
      return knex('users').insert([
        {id: 1, name: 'superuser', email: 'admin@admin.com', pass: hashedPass1, role: 'ADMIN'},
        {id: 2, name: 'simple-user1', email: 'user1@user.com', pass: hashedPass2, role: 'STANDARD'},
        {id: 3, name: 'simple-user2', email: 'user2@user.com', pass: hashedPass3, role: 'STANDARD'}
      ]);
    });
};
