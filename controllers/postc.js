const {user,gossip} = require('../models/gposts.js');
const flash = require('connect-flash');
const Joi = require('joi');
module.exports.viewpostfunc = async(req,res,next)=>{
    try{
        const { id } = req.params;
        const foundpost = await gossip.findById(id).populate('user');
        
        console.log(foundpost);
        const currentuser = req.user;
        res.render('viewpost',{foundpost , currentuser});
    }catch(err){
        res.render('notfound.ejs',{ thing:'post',action:'find',message:'you  are looking for',err});
        next(err);
    }
    

    
}

module.exports.editgetfunc = async(req,res)=>{
    const {id } = req.params;
    const foundpost = await gossip.findById(id);
    const editedpost = await gossip.findByIdAndUpdate(id,req.body);
    
    console.log(editedpost);
    res.render('editpost',{editedpost,foundpost});
}

module.exports.editputfunc = async(req,res,next)=>{
    try{
    const {id } = req.params;
    const {post}= req.body;
    const user = `${req.user._id}`;
    const editedpost = await gossip.findByIdAndUpdate(id,{user,post});
    
    console.log(editedpost);
    res.redirect(`/post/${id}`);
    }catch(err){
        res.render('notfound.ejs',{ thing:'post',action:'save',message:'please add valid credentials',err});

    }
}

module.exports.likeputfunc = async(req,res)=>{
    const {id } = req.params;
    await gossip.findByIdAndUpdate(id,{$inc:{likes:1}});const requirelogin = (req,res,next)=>{
        if(!req.session.user_id){
            req.flash('failure','you need to login first');
            res.redirect('/',)
        }
    }
    res.redirect(`/`);
}

module.exports.deletepfunc = async(req,res)=>{
    if(!req.session.passport.user){
        req.flash('failure','you need to login first');
        res.redirect('/');
    }else{
        const {id } = req.params;
        await gossip.findByIdAndDelete(id);
        req.flash('failure','one post has been deleted!');
        res.redirect(`/`);

    }
}

module.exports.getnpostfunc = async(req,res)=>{
    console.log(req.session);
    res.render('newpost.ejs');
}

module.exports.postnpostfunc = async(req,res) => {
    const postSchema = Joi.object({
        user: Joi.string().required().alphanum().min(5),
        post: Joi.string().required(),
        tags:Joi.array(),
        image:Joi.object()
    })
    const { post , tagsstring}  = req.body;
    const image = {};
    if(req.file){
        const {path,filename} = req.file;
        const image = {url:path,filename};
    }
    
    
    const tags = tagsstring.split(',');
    const user = `${req.user._id}`;
    const {error} = postSchema.validate({ user , post,tags,image});
    if(error){
        const err = error.details.map(el=>el.message).join(',');
        res.render('notfound.ejs',{ thing:'post',action:'save',message:'please add valid credentials',err});
        
    }else{
        const npost = new gossip({ user , post,tags,image});
        await npost.save();
        console.log(npost);
        req.flash('posted','you successfully added a new post');
        res.redirect('/');

    }
}
