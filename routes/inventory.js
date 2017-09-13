var router = require('express').Router();
var pool = require('../modules/pool');

// query DB and send back data
router.get('/', function (reg, res) {
    console.log('in get inventory route');
    pool.connect(function(connectionError, client, done) {// called once a connection happens
        // connectionError - if error occurs connect to the DB
        if (connectionError) {
            console.log('connection error ->', connectionError);
            res.sendStatus(500);
            done();
        } else {
             // client is our worker to run query
            // ask the client to run query
            // param 1 - query itself
            // param 2 - callBack func
            client.query('SELECT * FROM inventory;', function(queryError, resultObj){
                // done - function called to release client/worker
                done();
                // queryError - any error from executing query
                // resultObj response Object from pg
                if (queryError) {
                    console.log('query error ->', queryError);
                    res.sendStatus(500);
                } else{
                    console.log('result object.rows ->', resultObj.rows);
                    // .rows is the data in our table rows
                    res.send(resultObj.rows);
                } // end client if else
            }); // end client query
        } // end connect else
    }); // end pool connect
}); // end router

router.post('/', function (req, res) {
    console.log('in post inventory route', req.body);
    var item = req.body.item;
    pool.connect(function (error, client, done) {
        if (error) {
            console.log('connection error ->', error);
            res.sendStatus(500);
            done();
        } else {
            // query string
            // values to insert into the query string
            // callback func that will run when query is complete
            var queryString = 'INSERT INTO inventory (item) VALUES ($1)';
            // $1 is the first item in the values array $2, would be the 2nd item of the array
            var values = [item];
            client.query(queryString, values, function (queryError, resultObj) {
                done();
                if (queryError) {
                    console.log('query error ->', queryError);
                    res.sendStatus(500);
                } else {
                    console.log('result object ->', resultObj);
                    res.sendStatus(201);
                } // end client if else
            }); // end client query
        } // end connect else
    }); // end pool connect
});

module.exports = router;