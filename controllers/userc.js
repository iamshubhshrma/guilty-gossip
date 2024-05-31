const {user,gossip} = require('../models/gposts.js');

module.exports.getsignupfunc = (req,res)=>{
    console.log(req.originalUrl);
    res.render('newuser.ejs');
}

module.exports.getloginfunc = (req,res)=>{
    if(req.session.messages){
        req.flash('failure',req.session.messages[0]);
        res.redirect('/login');
        delete req.session.messages;
    }else{
        res.render('login.ejs');
    }
    
}

module.exports.getlogoutfunc = (req,res,next)=>{
    req.logout(function(err){
        if(err){
            return next(err);
        }
        req.flash('failure','logged out!, please come back soon...')
        res.redirect('/');
    });
}

module.exports.postloginfunc =  (req,res)=>{
    req.flash('success', 'You successfully logged in. Welcome back!');
    console.log(req.user);
    const redirecturl = res.locals.returnto || '/';
    res.redirect(redirecturl);
}

module.exports.postsignupfunc = async(req,res)=>{
    try{
        const { username , cnum , email, password, bio } = req.body;
        const nuser = new user({ username, cnum, email, bio  });
        await user.register(nuser,password);
        req.login(nuser,err=>{
            if(err){
                return next(err);
            }
            console.log(nuser);
            req.flash('success','you have successfully signed up!')
            res.redirect('/');
        })
        
    }catch(e){
        req.flash('failure',e.message);
        res.redirect('/user/sign-up');
    }

}

module.exports.viewfunc = async(req,res,next)=>{
    try{
        const { id } = req.params;
        const founduser = await user.findById(id);
        
        console.log(founduser);
        res.render('viewuser',{founduser});
    }catch(err){
        res.render('notfound.ejs',{ thing:'user',action:'find',message:'you  are looking for',err});
        next(err);
    }
    

    
}
