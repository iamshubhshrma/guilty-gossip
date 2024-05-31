const requirelogin = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.returnto = req.originalUrl;
        req.flash('failure','you need to login first');
        res.redirect('/login');
    }else{
        next();
    }
}
const storeReturnto = (req,res,next)=>{
    if(req.session.returnto){
        res.locals.returnto = req.session.returnto;
    }
    next();
}
module.exports = { requirelogin , storeReturnto };