# city-api

### The idea of this project is to create a RESTful API for retrieving information about cities such as name, country, population, continent, latitude, and longitude founded, landmarks etc.

### Tech Stack:
-  Backend: Node.js using TypeScript
-  Framework: NestJS
-  Cache: NesJS Caching
-  Infrastructure: Docker
-  Documentation: Swagger
-  Testing: Jest

### Features
-  Get all cities saved in the cities.json file
-  Get city by name matching

### Required ENV's
-  PORT=3000
-  CACHE_DEFAULT_TIME: 600000 // 10 minutes

### Run Project using Docker
-  clone the project

### To run project in production mode
-  `npm run docker:prod`

### Run tests
-  `npm i`
-  `npm run test`

### To run project in development mode
-  `npm run docker:dev`
-  It will start the server on port 3000 & api is available to consume
   -  API Docs - http://localhost:3000/api-docs
   -  Health check: GET - http://localhost:3000/api/v1/health
   -  Get all cities: GET - http://localhost:3000/api/v1/city
   -  Search city by name match: GET - http://localhost:3000/api/v1/search?name='cityName' (doesn’t have to be the complete name) (Not exposed to frontend but could be tested in Postman)

### Project Structure
-  src/
   -  main.ts - entry point of the project
   -  modules/
      -  city/ - city module
   -  types/ - has all types/interfaces used through out the project
   -  utils/ - has common functionality used through out the project (messages, enums, error handler etc..)
   -  data/ - has data files (cities.json)
-  Dockerfile - docker file
-  docker-compose.dev.yml - yml file with all configurations for development
-  docker-compose.prod.yml - yml file with all configurations for production