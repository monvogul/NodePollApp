var express = require("express") ;
var router = express.Router();
var path = require('path');
var jsonfile = require('jsonfile') ;


var cmtsFile = 'server/comments.json';

//TODO: Later on find a way to cache comments in the server
router.get("/api/comments", function (req, res, next){

    jsonfile.readFile(cmtsFile, function(err, obj) {
      res.json(obj);
    });

});

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
