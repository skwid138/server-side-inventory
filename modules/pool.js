var Pool = require('pg').Pool; // this sets Pool equal to a constructor, the method must be caps

var config = {
    host: 'localhost', // ip of server
    port: 5432, // port db is listening on
    database: 'inventory', // name of db
    max: 20 // how many clients/connections we want in pool (default is 10)
};

var pool = new Pool(config);

module.exports = pool;