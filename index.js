const express = require('express');
const app     = express();
const cors    = require('cors');
const dal     = require('./dal.js');

app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {
    // else create user
    dal.create(
        req.params.name,
        req.params.email,
        req.params.password
    )
        .then((user) => {
            console.log(user);
            res.send(user);
        });
});

// all accounts
app.get('/account/all', function (req, res) {
    dal.all()
        .then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});

// login account
app.get('/account/login/:email/:password', function (req, res) {
    dal.login(req.params.email, req.params.password).
        then((user) => {
            console.log(user);
            res.send(user);   
    })
    .catch(err => {
        console.log('error')
        res.send(err)
    })
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {
    dal.findOne(req.params.email)
        .then((user) => {
            console.log(user);
            res.send(user);
    });
});

// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {
    var amount = Number(req.params.amount);
    dal.update(req.params.email, amount)
        .then((response) => {
            console.log(response);
            res.send(response);
    });    
});

let port = 3000;
app.listen(port);
console.log('Running on port: ' + port);