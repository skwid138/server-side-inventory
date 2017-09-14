var router = require('express').Router();
var pool = require('../modules/pool');

// query DB and send back data
router.get('/', function (req, res) {
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
    var clientItem = req.body.item;
    var clientId = req.body.id; // id to send to client for use with delete
    pool.connect(function (error, client, done) {
        if (error) {
            console.log('connection error ->', error);
            res.sendStatus(500);
            done();
        } else {
            // added id and $2
            var queryString = 'INSERT INTO inventory (id, item) VALUES ($1 $2)';
            // $1 is the first item in the values array $2, would be the 2nd item of the array
            var values = [clientId, clientItem];
            // could also be var values = [req.body.item] followed by any additional parameters in the object
            client.query(queryString, values, function (queryError, resultObj) {
                done();
                if (queryError) {
                    console.log('query error ->', queryError);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                } // end client if else
            }); // end client query
        } // end connect else
    }); // end pool connect
});

router.delete('/:id', function( req, res) {
    console.log('in inventory delete route');
    var itemId = req.params.id;
    pool.connect(function (error, client, done) {
        if (error) {
            console.log('connection error ->', error);
            res.sendStatus(500);
            done();
        } else {
            var queryString = 'DELETE FROM inventory WHERE id=$1';
            var values = [itemId];
            client.query(queryString, values, function (queryError, resultObj) {
                done();
                if (queryError) {
                    console.log('query error ->', queryError);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                } // end client if else
            }); // end client query
        } // end connect else
    }); // end pool connect
}); // end delete

module.exports = router;