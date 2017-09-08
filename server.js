// requires
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// this exports the result of the route, which 
// is the same as the app.get call
var indexRouter = require('./routes/index');
var inventoryRouter = require('./routes/inventory');

// globals
var app = express();
var port = 3000;

//use
app.use(bodyParser.urlencoded({ extended: true })); // middleware
app.use(express.static( 'public' )); // sets source folder for client side

// routes
app.use('/', indexRouter);
app.use('/inventory', inventoryRouter);

//listen
app.listen(port, function() {
    console.log('listening on', port); 
}); // end listen


