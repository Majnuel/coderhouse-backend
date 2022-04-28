const options = {
  client: "mysql",
  connection: {
    host: "192.168.64.2",
    user: "root",
    password: "",
    database: "test_database",
  },
  pool: { min: 0, max: 7 },
};

module.exports = { options };
