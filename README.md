## About

Test task for the position of backend developer. It was necessary to implement an API to perform CRUD operations on user and tag entities.

By condition, you can not use ORM. It was necessary to configure Docker, create documentation in Swagger, use DTOs, validate data, create database migrations, and set up JWT authorization.

A demo is available at [this link](http://176.113.82.233:3000/api/docs).

## Usage

1. Clone the repository
2. Install dependencies:
```bash
$ npm install
```
3. Copy the .env file, change the environment variables and rename the file to ".env.development".
4. Install Docker (docker-compose)
5. Run commands:
```bash
$ docker-compose build
$ docker-compose up
```
