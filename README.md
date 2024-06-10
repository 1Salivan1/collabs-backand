# About project

Collabs - is a platform for finding people for non-profit projects. It is ideal for gaining experience in collaborative work, as well as startups without funding.

This project is the backend for the collabs service.

[Front-end of project](https://github.com/1Salivan1/collabs)

# How to start

## 1. Install dependencies

For npm:
`npm install`;

For yarn:
`yarn install`.

## 2. Create .env file

Example `.env` file:

```
SECRET=secret_key_for_jwt
POSTGRES_URL=url_for_connection_to_db
```

To configure the connection differently, please refer to the `node-postgres` documentation

## 3. Let's launch the project

Write a command `npm run dev` or `yarn run dev` to run the project in development mode.

Other comands:

1. `npm run build` - сreates a dist folder with js files;
2. `npm run start` - launches the project from the dist folder.

## Extra - create database

If you want create your own db, еhe files for creating tables are located in the following path:
`src/sql/db.sql`
