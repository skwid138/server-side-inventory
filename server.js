// requires
var express = require('express');

// globals
var app = express()
var port = 3000;

//listen
app.listen(port, function() {
    console.log('listening on', port);
    
});

// global inventory variable
var inventory = ['apples', 'trousers', 'buttons', 'hairy feet'];

app.get('/inventory', function(reg, res) {
    console.log('in get inventory route');
    
    res.send(inventory);
});
