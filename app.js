require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
const storage = require('node-persist');
var app = express();

var app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));


var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
con.connect();
var port = 8000
console.log(`Application is running on number ${port}`);

app.listen(port);


// for first time render home page
app.get('/', function (req, res) {
    res.render('index');
})
// for render home page
app.get('/index.ejs', function (req, res) {
    res.render('index');
})

// for render login page
app.get('/login.ejs', function(req,res){
    res.render('login');
})
// for select data from database and cheack that with login form data
app.post('/login.ejs', function (req, res) {

    var email = req.body.email;
    var password = req.body.password;
    var query = "select * from user where email='" + email + "' and password='" + password + "'";

    con.query(query, async function (error, results, field) {
        if (error) throw error;
        if (results.length == 1) {
            // res.send("you are logged in")
            // await storage.init( /* options ... */);
            // await storage.setItem('user_id', results[0].id);
            
            res.redirect('/index.ejs');
        } else {
            // res.redirect('no');
            res.redirect('/login.ejs')
                                  
        }
    })
})



// for render registration page
app.get('/register.ejs', function(req,res){
    res.render('register');
})
// for move data from registration form to database.
app.post('/register.ejs', function (req, res) {

    var f_name = req.body.f_name;
    var l_name = req.body.l_name;
    var email = req.body.email;
    var password = req.body.password;
    var query = "insert into user(f_name,l_name,email,password)values('" + f_name + "','" + l_name + "','" + email + "','" + password + "')";


    con.query(query, function (error, results, field) {
        if (error) throw error;
        res.redirect('/login.ejs');
    })
})


// for render forgot_pass page
app.get('/forgot_pass.ejs', function(req,res){
    res.render('forgot_pass');
})

// for render mens page
app.get('/mens.ejs', function(req,res){
    res.render('mens');
})

// for render womens page
app.get('/womens.ejs', function(req,res){
    res.render('womens');
})

// for render aboutus page
app.get('/aboutus.ejs', function(req,res){
    res.render('aboutus');
})

// for render titen page
app.get('/titen.ejs', function(req,res){
    res.render('titen');
})

// for render rado page
app.get('/rado.ejs', function(req,res){
    res.render('rado');
})

// for render sylvi page
app.get('/sylvi.ejs', function(req,res){
    res.render('sylvi');
})