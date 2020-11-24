
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('episodes').del()
    .then(function () {
      // Inserts seed entries
      return knex('episodes').insert([
        {
          id: 1,
          title: 'Tabela de Hash – Hipsters Ponto Tech #222',
          link: 'https://hipsters.tech/tabela-de-hash-hipsters-ponto-tech-222/',
          description: 'Hoje vamos falar sobre tudo o que você precisa saber a respeito de hash tables, hashing ou tabela de espalhamento, essa estrutura de dados tão usada.',
          image: 'https://hipsters.tech/wp-content/uploads/2016/07/hipsters-logo.png',
          media: 'https://media.blubrry.com/hipsterstech/content.blubrry.com/hipsterstech/hipsters_222_hashtable.mp3',
          duration: '50:17'
        }
      ]);
    });
};
