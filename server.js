// requires
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// globals
var app = express();
var port = 3000;

//use
app.use(bodyParser.urlencoded({ extended: true })); // middleware
app.use(express.static( 'public' )); // sets source folder for client side

//listen
app.listen(port, function() {
    console.log('listening on', port);
    
}); // end listen

//base url
app.get('/', function(req, res) {
    res.sendFile(path.resolve('public/views/index.html') );
}); // end base

// global inventory variable
var inventory = ['the ring', 'trousers', 'buttons', 'hairy feet'];

app.get('/inventory', function(reg, res) {
    console.log('in get inventory route');
    
    res.send(inventory);
});

app.post('/inventory', function (req, res) {
    console.log('in post inventory route', req.body);
    var item = req.body.item;
    inventory.push(item);
    res.sendStatus(201); // 202 means accepted 201 means created
});
