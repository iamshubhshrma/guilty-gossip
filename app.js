//setting up .env so that secret info is not available on website
if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}
console.log(process.env.SECRET);




//setting up express app and listening on the port
const express = require('express');
const app = express();
app.listen(2111,()=>{
    console.log('hello this is shubham from my website');
})


//importing functions and variables from controller
const home = require('./controllers/home.js');

//express.static is used to load all the files in a folder on server which can be accessed by name on the server
app.use(express.static('sitestuff'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//path module to perform path operations like joining
const path = require('path');


//mongoose setup for database...connnecting with local mongoose and accessing models
const dbUrl = process.env.db_url;
const {user,gossip} = require('./models/gposts.js');
const mongoose = require('mongoose');
//'mongodb://127.0.0.1:27017/gossip'
const MongoStore = require('connect-mongo');
mongoose.connect(`${dbUrl}`).then(()=>{
    console.log('server connected with mongoose');
}).catch(err=>{
    console.log('encounterred some error');
    console.log(err);
})

//setting up ejs as viewengine to use ejs files as template
const ejsMate = require('ejs-mate');
app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'/views'));

//helmet for security
const helmet = require('helmet');
app.use(helmet({contentSecurityPolicy:false}));

//morgan is used to log every request
const morgan = require('morgan');
app.use(morgan('tiny'));

//joi is for server side validation
const Joi = require('joi');

//method overrride to use post request as update , delete or put request
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.use((req,res,next)=>{
    console.log(req.method,req.path);
    req.requesttime = Date.now();
    next();
})

//session is the current info abt what user is doing on website that is stored on server and not in actual database that can be accessed using session key
const session = require('express-session');
app.use(session(home.sessionOptions));

//flash to show messages for some action done on website which disappers after refresh
const flash = require('connect-flash');
app.use(flash());


//cookie parser to send and parse cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//passport for user and authentication
const passport = require('passport');
const localStrategy = require('passport-local');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

//mongo sanitise doesn't allow functions in query strings like $gt for greater etc for security purpose
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize());

//res.locals is used to create varibles that can be accessed in every rendered file
app.use(home.localsfunc);

const {requirelogin , storeReturnto }= require('./middleware.js');
app.get('/',home.homefunction);

const post = require('./routes/posts');
app.use('/post',post);


const routeuser = require('./routes/newuser');
app.use('/user',routeuser);


app.get('/login',home.loginfunc);


app.get('/testpage',home.testfunc);

app.get('/session',home.sessionfunc);

app.use(home.notfoundfunc);

