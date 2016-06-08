var express = require('express');
var router = express.Router();
var userData = require('../models/userSchema');

/* GET users listing. */
router.use(function(req, res, next) {
    // do logging
    console.log('Initiating...');
    next(); // make sure we go to the next routes and don't stop here
});

/* GET users listing. */
router
    .get("/users/", function(request, response) {
        console.log("getting users");
        // response.json(users);
        userData.find(function(err, userData) {
            if (err)
                response.send(err);

            response.json(userData);
        });
    })
    .get('/users/:id', function(request, response) {
        console.log("getting user by id");
        console.log(request.params.id);
        userData.findById(request.params.id, function(err, userData) {
            if (err)
                response.send(err);

            response.json(userData);
        });
    })
    .put("/users/:id", function(request, response) {
        console.log("input");
        console.log(request.body);
        console.log(request.params.id);
        console.log(request.params.id.length);

        if(request.params.id.length == 9) {
            console.log("in creating new user...");
            userData.create(request.body, function(res) {
                response.json(res);
            });
        }
        else {
            console.log("in updating existing user...");
            userData.findByIdAndUpdate(request.params.id, request.body, function(res) {
                response.json(res);
            });
        }
    })
    .delete("/users/:id", function(request, response) {
        console.log("in delete");
        console.log("request url" + request.url);
        console.log("request id" + request.params.id);

        userData.findByIdAndRemove(request.params.id, function(res) {
            response.json(res);
        });
    });

module.exports = router;
