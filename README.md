``` 
Pre-requisites:
1. Nodejs/NPM (v18)
2. Postgres (you can run it locally or use a docker container)
3. Docker (optional)

About the project:
This is a simple Nodejs/TypeScript/NestJS/Postgres project that uses TypeORM. It's a simple API that allows you to add restaurants to a city and get a list of all restaurants for a given city. The project is dockerized and can be run using docker-compose up. The project is also configured to run locally using npm run start:dev

There are two ways to run this project:
1. Run the project in the terminal using the command: npm run start:dev
2. Run docker-compose up if you have docker installed on your machine

The two main routes that we're interested in are:
1. GET http://localhost:5000/restaurant/:cityId - that will return a list of restaurants for a given city
2. GET http://localhost:5000/city/all-restaurants - that will return a list of all cities that have restaurants in them

There are other complimentary routes that you can use to add a restaurant to a city, delete a restaurant from a city, etc.

NOTE: The .env.dev is intentionally committed to the repo for the sake of simplicity. In a real world scenario, this file would be ignored by git

Happy hacking! :) 👾🤖
```