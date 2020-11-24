
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('channels').del()
    .then(function () {
      // Inserts seed entries
      return knex('channels').insert([
        {id: 1, title: 'Hipsters Ponto Tech', link: 'https://hipsters.tech', description: 'Discussões sobre tecnologia, programação, design, startups e as últimas tendências.', image: 'https://hipsters.tech/wp-content/uploads/2016/07/hipsters-logo.png', feed: 'https://hipsters.tech/feed/podcast/'},
        {id: 2, title: '30:MIN - Literatura', link: 'https://audiocosmo.com/30min', description: 'Falamos de literatura, mas não nos levem a sério.', image: 'https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_nologo/1015807/1015807-1602734827982-126333cd0cd36.jpg', feed: 'https://anchor.fm/s/6a6961c/podcast/rss'},
        {id: 3, title: 'Ilustríssima Conversa', link: 'https://www.omnycontent.com/d/playlist/2f6a79aa-d181-48a4-92e0-ac5d00c8eb1d/ec318888-d896-417d-ad48-ac61001abdf2/0076bab0-fc8d-4f81-b535-ac61001abe00/podcast.rss', description: 'Notícias sobre política, economia, cultura, esporte, entretenimento e mais.', image: 'https://www.omnycontent.com/d/playlist/2f6a79aa-d181-48a4-92e0-ac5d00c8eb1d/ec318888-d896-417d-ad48-ac61001abdf2/0076bab0-fc8d-4f81-b535-ac61001abe00/image.jpg?t=1603762644&amp;size=Large', feed: 'https://www.omnycontent.com/d/playlist/2f6a79aa-d181-48a4-92e0-ac5d00c8eb1d/ec318888-d896-417d-ad48-ac61001abdf2/0076bab0-fc8d-4f81-b535-ac61001abe00/podcast.rss'},
      ]);
    });
};
