// requires
var express = require('express');
var path = require('path');

// globals
var app = express();
var port = 3000;

//use
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
