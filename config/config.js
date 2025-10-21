require("dotenv").config(); // this is important!
module.exports = {
  development: {
    username: "root",
    password: null,
    database: "nodejs2024",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "nodejs2024",
    host: "192.168.0.8",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "nodejs2024",
    host: "database-test1.123456789012.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
  },
};
