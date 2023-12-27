# How to start

To start, you need to create a Mongodb cloud storage, since at the moment the solution has been created using it.

### 1. Install dependencies

For npm:
`npm install`;

For yarn:
`yarn install`.

### 2. Create config file

Create file `config.ts` in folder `src` with next information:

1. Link to connect to MongoDB cloud storage;
2. Secret for jwt.

Example config file:

```
export const DB_URL = "mongodb+srv://qwe:123456@cluster0.l9skhwe.mongodb.net/qwe?retryWrites=true&w=majority";
export const SECRET = "secret123";
```

The dependencies in the remaining files are specified for these names specifically for this path.

### 3. Let's launch the project

Write a command `npm run dev` or `yarn run dev` to run the project in development mode.

Other comands:

1. `npm run build` - сreates a dist folder with js files;
2. `npm run start` - launches the project from the dist folder.
