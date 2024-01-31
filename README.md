# How to start

## 1. Create database

First you need to create a PostgreSQL database.
Queries to create tables for the database are stored in `src/sql/db.sql`.

## 2. Install dependencies

For npm:
`npm install`;

For yarn:
`yarn install`.

## 3. Create .env file

Example `.env` file:

```
SECRET=secret_key_for_jwt
USER=db_user
PASSWORD=db_password
HOST=db_host
PORT=db_port
DATABASE=db_name
```

## 4. Let's launch the project

Write a command `npm run dev` or `yarn run dev` to run the project in development mode.

Other comands:

1. `npm run build` - сreates a dist folder with js files;
2. `npm run start` - launches the project from the dist folder.
