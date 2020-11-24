<h1 align="center">Podcast APP</h1>
<p align="center">
  <a href="https://nodejs.org/en/">
    <img src="https://img.shields.io/static/v1?label=Node&message=JS&color=blue?style=plastic&logo=Node.js" alt="NodeJS" />
  </a>
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/static/v1?label=React&message=JS&color=blue?style=plastic&logo=React" alt="ReactJS" />
  </a>
</p>

---

## About

Podcast APP is an application to listen and manage podcasts.

This project includes: API / Web App

### Technologies

<ul>
    <li>React</li>
    <li>NodeJs</li>
</ul>

## Run Project

### Clone Project

```git
git clone https://github.com/thiagotrs/podcast.git
```

### Docker Compose (optional step)

```ssh
docker-compose up -d
docker-compose exec node-dev bash
```

### Configuration

Create an .env file in the api root directory with these variables:

```
GOOGLE_CLIENT_ID = ''
GOOGLE_CLIENT_SECRET = ''

JWT_SECRET = ''

PORT = 4000
BASE_URL = 'http://localhost:4000'

APP_URL = 'http://localhost:3000'
```

Update index.js file in the web/src/config directory with these variables:

```javascript
export const API_URL = 'http://localhost:4000'
```

### API

```ssh
cd api
yarn install
yarn knex migrate:latest
yarn knex seed:run
yarn start
```

### Web

```ssh
cd web
yarn install
yarn start
```

## Author

Thiago Rotondo Sampaio - [GitHub](https://github.com/thiagotrs) / [Linkedin](https://www.linkedin.com/in/thiago-rotondo-sampaio) / [Email](mailto:thiagorot@gmail.com)

---

<p align="center">Develop by <a href="https://github.com/thiagotrs">Thiago Rotondo Sampaio</a></p>