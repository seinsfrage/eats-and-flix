var express = require('express');
var router = express.Router();


//ROUTES
router.get('/', function (req, res) {
    res.sendFile(__dirname + "../public/index.html");
});



module.exports = router;