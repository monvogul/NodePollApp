var express = require("express") ;
var router = express.Router();
var path = require('path');

 router.get("/test", function (req, res, next) {
        var Person = {
            "name": "Mansi",
            "age": "34",
            "greeting": "Hello"
        }
        res.json(Person);
    });

    router.get("/userCount", function (req, res, next) {
        res.json(totalUsers);
    });

    router.get("/", function (req, res) {
             res.sendFile(path.resolve('index.html'));
    });



module.exports = router;
