var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');

// used to serve static files
app.use(express.static('public'));
app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password', function(req, res) {
        // check if account exists
        dal.find(req.params.email).
        then((users) => {
            console.log('users:', JSON.stringify(users));

            // if user exists, return error message
            if(users.length > 0){
                console.log('User already exists. Please login.');
                res.send({message: "User already exists. Please login."});    
            }
            else{
             // else create user
            dal.create(req.params.name,req.params.email,req.params.password)
                .then((user) => {
                    console.log(user);
                    res.send(user);            
                });            
            }
        });     
});

// login user
app.get('/account/login/:email/:password', function (req, res) {
    dal.login(req.params.email, req.params.password).then(user => {
        dal.find(req.params.email).
        then((user) => {
            // if user exists, check password
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    res.send(user[0]);
                }
                else{
                    res.send('Login failed: password does not match');
                }
            }
            else{
                res.send('Login failed: user not found');
            }
    });
    
        
        
        console.log(user);
        res.send(user);
    })
});

// find user account
app.get('/account/find/:email', function (req, res) {
    dal.find(req.params.email).then(user => {
        console.log(user);
        res.send(user);
    })
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {
    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find all accounts
app.get('/account/all', function (req, res) {
    dal.all().then(docs => {
        console.log(docs);
        res.send(docs);
    });
});

// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {
    let amount = Number(req.params.amount);

    dal.update(req.params.email, amount)
        .then((response) => {
            console.log(response);
            res.send(response);
    });    
}); 

// get balance
app.get('/account/balance/:name/:email/:amount', function(req, res) {
    dal.deposit(req.params.name, req.params.email, req.params.amount)
        .then((user) => {
        console.log(user);
        res.send(user);
        });
});

// update balance
app.get('/account/balance/update/:email', function(req, res) {
    dal.update(req.params.email).then(user => {
        console.log(user);
        res.send(user);
    })
});

var port = 3000;
app.listen(port);
console.log('Running on port:' + port);