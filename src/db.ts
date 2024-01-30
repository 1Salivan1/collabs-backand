const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "636569",
  host: "localhost",
  port: 5432,
  database: "collabs",
});

export default pool;
