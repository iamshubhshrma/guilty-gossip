const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const {user,gossip} = require('./models/gposts.js');
const ejsMate = require('ejs-mate');
const morgan = require('morgan');
const Joi = require('joi');

const verifypassword = (req,res,next)=>{
    const { password }= req.query;
    if(password==='gaandmara'){
        next();
    }else{
        res.send('<h1>you are not allowed to do this<br> please enter password first</h1>')
    }
}

const validateSchema = (req,res,next)=>{
    h

}


// morgan('tiny');
app.engine('ejs',ejsMate);
app.use(morgan('tiny'));
app.use((req,res,next)=>{
    console.log(req.method,req.path);
    req.requesttime = Date.now();
//this is our own middleware
    next();
})
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

mongoose.connect('mongodb://127.0.0.1:27017/gossip').then(()=>{
    console.log('server connected with mongoose');
}).catch(err=>{
    console.log('encounterred some error');
    console.log(err);
})

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.static('sitestuff'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(2111,()=>{
    console.log('hello this is shubham from my website');
})

app.get('/',async(req,res)=>{
    const allposts = await gossip.find({});
    console.log(req.requesttime);
    res.render('gp.ejs',{allposts});
})

app.get('/newpost',async(req,res)=>{
    res.render('newpost.ejs');
})

app.use('/post/:id',(req,res,next)=>{
    console.log('<----------someone just accessed this post------------->');
    next();
})
app.get('/post/:id',async(req,res,next)=>{
    try{
        const { id } = req.params;
        const foundpost = await gossip.findById(id);
        
        console.log(foundpost);
        res.render('viewpost',{foundpost});
    }catch(err){
        res.render('notfound.ejs',{ thing:'post',action:'find',message:'you  are looking for',err});
        next(err);
    }
    

    
})

// app.get('/error',(req,res)=>{
//     throw new Error('this page is for errors')
// })

app.get('/post/:id/edit',async(req,res)=>{
    const {id } = req.params;
    const foundpost = await gossip.findById(id);
    const editedpost = await gossip.findByIdAndUpdate(id,req.body);
    
    console.log(editedpost);
    res.render('editpost',{editedpost,foundpost});
})

app.put('/post/:id/edit',async(req,res,next)=>{
    try{
    const {id } = req.params;
    const foundpost = await gossip.findById(id);
    const editedpost = await gossip.findByIdAndUpdate(id,req.body);
    
    console.log(editedpost);
    res.redirect(`/post/${id}`);
    }catch(err){
        res.render('notfound.ejs',{ thing:'post',action:'save',message:'please add valid credentials',err});

    }
})
app.put('/post/:id/like',async(req,res)=>{
    const {id } = req.params;
    await gossip.findByIdAndUpdate(id,{$inc:{likes:1}});
    res.redirect(`/`);
})

app.delete('/post/:id/delete',async(req,res)=>{
    const {id } = req.params;
    await gossip.findByIdAndDelete(id);
    res.redirect(`/`);
})

app.post('/newpost',async(req,res) => {
    const postSchema = Joi.object({
        user: Joi.string().required().alphanum().min(5).max(20),
        post: Joi.string().required()
    })
    const {error} = postSchema.validate(req.body);
    if(error){
        const err = error.details.map(el=>el.message).join(',');
        //res.send(err);
        res.render('notfound.ejs',{ thing:'post',action:'save',message:'please add valid credentials',err});
        
    }else{
        const npost = new gossip(req.body);
        await npost.save();
        console.log(npost);
        res.redirect('/');

    }
    
    //try{
        
    //}catch(err){
    //    res.render('notfound.ejs',{ thing:'post',action:'save',message:'please add valid credentials',err});
    //}
    
})

app.get('/newuser',(req,res)=>{
    res.render('newuser.ejs');
})

app.post('/newuser',async(req,res)=>{
    const nuser = new user(req.body);
    await nuser.save();
    console.log(nuser);
    res.redirect('/');

    // res.send(req.body);
})

app.use((req,res,next)=>{
    
    //throw new Error('page not found',404);
    res.render('notfound.ejs',{ thing:'page',action:'find',message:'',err:''});
    next();
    // res.status(404).send('<h1>page not found!<h1>');
})


// app.get('/posts', async(req,res)=>{
    
    
// })
