const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "inventory",
  password: "pawpaw",
  port: 5432,
});

client.connect();

export default client;
