const {user,gossip} = require('../models/gposts.js');
const person = 'none';
const flash = require('connect-flash');
const { qarray } = require('../quotes.js');
const MongoStore = require('connect-mongo');
const dbUrl = process.env.db_url;
module.exports.homefunction = async(req,res)=>{
    const allposts = await gossip.find({}).populate('user');
  
    const allusers = await user.find({});
    console.log(req.session);


    
    const qindex = Math.floor(Math.random() * 172);
    const thoughtd = qarray[qindex];
   


    console.log(req.requesttime);
    const { lastaccess } = req.cookies;
    console.log(lastaccess);
    res.cookie('lastaccess',Date());

 
    if(req.session.username){
        console.log(req.session.username);
        
    }


    if(req.session.count){
        req.session.count+=1;
    }else{
        req.session.count = 1;
    }
    const username = 'none';
    const currentuser = req.user;
    if(currentuser){console.log(currentuser._id);}

    res.render('gp.ejs',{allposts,allusers,person,lastaccess,currentuser,thoughtd});
    
}

module.exports.localsfunc = async(req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.failure = req.flash('failure');
    res.locals.username = 'none';
    if(req.session.passport){
        res.locals.username = req.session.passport.user;
        res.locals.currentuser= req.user;
    }
    res.locals.count = req.session.count;
    next();
}

module.exports.testfunc = async(req,res)=>{
    const posts = await gossip.find({}).populate('user');
    console.log(posts);
    res.send(posts);
}

module.exports.notfoundfunc = (req,res,next)=>{
    res.render('notfound.ejs',{ thing:'page',action:'find',message:'',err:''});
    next();
}

module.exports.sessionOptions = {
    name:'_ggs',
    secret:'thisismywebsite',
    resave:false,
    saveUninitialized :false,
    cookie:{
        httpOnly : true,
        expires: Date.now() + 1000*60*60*24*7
    },
    secret : 'thisisasecret',
    store : MongoStore.create({mongoUrl:`${dbUrl}`})

}

module.exports.loginfunc = (req,res)=>{
    res.render('login.ejs');
}

module.exports.sessionfunc = (req,res)=>{res.send(req.session)};
