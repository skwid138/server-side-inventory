var router = require('express').Router();

// global inventory variable
var inventory = ['the ring', 'trousers', 'buttons', 'hairy feet'];

router.get('/', function (reg, res) {
    console.log('in get inventory route');
    res.send(inventory);
});

router.post('/', function (req, res) {
    console.log('in post inventory route', req.body);
    var item = req.body.item;
    inventory.push(item);
    res.sendStatus(201); // 202 means accepted 201 means created
});

module.exports = router;