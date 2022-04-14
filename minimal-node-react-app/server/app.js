const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const express = require('express');

// connect to mongoDB
dbConnect()
async function dbConnect() {
    const dbUrl = 'mongodb://localhost:27017/testdb'
    await mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
        .then((db) => {
            console.log('Database connection is successful')
        }, (err) => console.log(err))
}

var app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//define a schema
var Schema = mongoose.Schema;

//define User Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Compile model from schema
const User = mongoose.model("User", userSchema)

// base endpoint
app.get('/', function (req, res) {
    res.send('<html><body><h1>Server is running..</h1><body></html>')
})

// Sign-Up API
app.post("/register", (req, res) => {
    console.log("req")
    console.log(req)
    console.log(req.body)
    console.log(req.body.username)
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500)
        } else {
            if (user) {
                console.log("User with given email is already registered. Please LogIn")
                res.status(400).send("User is already registered")
            } else {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                })
                newUser.save((err) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send("Failed to add user")
                    }
                    else {
                        console.log("successfully added to db");
                        res.status(200).send()
                    }
                })
            }
        }
    })

})

//Login API
app.post("/login", (req, res) => {
    const mail = req.body.email;
    const password = req.body.password;
    User.findOne({ email: mail }, (err, founduser) => {
        if (err) {
            console.log(err);
            res.status(500)
        } else {
            if (founduser) {
                if (founduser.password === password) {
                    console.log("user login success");
                    res.status(200).send(founduser.username)
                } else {
                    console.log("invalid password");
                    res.status(400).send("Invalid credentials")
                }
            }
            else {
                console.log("please register user");
                res.status(404).send("User is not registered yet")
            }
        }
    })
})

// server start
var server = app.listen(5000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(host + ":" + port);
})