## Description

A project using nest + typescript + prisma + postgres + jest (with unit and e2e tests).

This project is basically a template with crud operations for the users model. Feel free to create your project from this one.

This project is based on [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Requiriments
- nest
- prisma
- postgres
- typescript
- nodejs > 14

## Installation

```bash
$ npm install
```
## Configuration
You need to create a .env file with DATABASE_URL with the postgres url connection, similar to this one:

```
DATABASE_URL="postgresql://username:password@localhost:5432/user_crud?schema=public"
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
