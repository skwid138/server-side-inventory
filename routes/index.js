// Requires
var express = require('express');
var path = require('path');

// Makes this a router
var router = express.Router();

// could also skip declaring express and combine the express and router declaration
// var router = require('express').Router();

//app.get here
//base url
router.get('/', function (req, res) { // change this to router
    res.sendFile(path.resolve('public/views/index.html'));
}); // end base

// export
module.exports = router;