const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/gossip')
.then(()=>{
    console.log('server connected with mongoose');
})
.catch(err=>{
    console.log('encounterred some error');
    console.log(err);
})



// const postSchema = new mongoose.Schema({
//     user: {
//         type : String,
//         required : true
//     },   
//     post:{
//         type : String,
//         required: false,
//         default : 'user did not added any text'

//     } 
    
// })
// postSchema.add({
//     tags:{
//         type: Array,
//         required: false
//     },
//     likes :  {
//         type: Number,
//         required: false
//     }
// })

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required: true
    },
    cnum: {
        type: Number,
        required: true,

    },
    email: {
        type: String,
        required: false,
        
    }
})

const user = mongoose.model('user',userSchema);
// const shubham = new user({
//     name : 'shubham',
//     cnum : 7982031221,
//     email : 'chaoticshubh@gmail.com'
// })

// await shubham.save();

await user.insertMany([
    {
        name : 'ruia',
        cnum : 6290846943,
        email : 'yashvruia@gmail.com'
    },
    {
        name : 'sourav',
        cnum : 9060611980,
        email : 'souravshandilya3@gmail.com'
    },{
        name : 'kushu',
        cnum : 8090765747,
        email : 'kushagrashrivastava5544@gmail.com'
    },{
        name : 'arunim',
        cnum : 7638035111,
        email : 'alexgroove691@gmail.com'
    },{
        name : 'ekansh',
        cnum : 7017126024,
        email : 'ekansh.singh20105@gmail.com'
    },
    {
        name : 'priyansh',
        cnum : 8602574613,
        email : 'priyanshchaudhary8602@gmail.com'
    },
    {
        name : 'yuvraj',
        cnum : 6267610111,
    }
])

// const gossip = mongoose.model('gossip',postSchema);

// const allposts = gossip.find({});
// await allposts.updateMany({},{tags:['bitch','please'],likes:10});

// const p1 = new gossip({
//     user : 'shubham'
// })

// p1.save().then((res) =>{
//     console.log('post saved');
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })

// gossip.insertMany([
    
//     {
//         user:'priyansh',
//         post: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, vel labore! Magni inventore numquam fuga est non minus, quia, eligendi hic ea explicabo, eaque mollitia. Sunt exercitationem odio ipsam iste!'
//     },
//     {
//         user:'kushagra',
//         post: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, vel labore! Magni inventore numquam fuga est non minus, quia, eligendi hic ea explicabo, eaque mollitia. Sunt exercitationem odio ipsam iste!'
//     },
//     {
//         user:'yuvraj',
//         post: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, vel labore! Magni inventore numquam fuga est non minus, quia, eligendi hic ea explicabo, eaque mollitia. Sunt exercitationem odio ipsam iste!'
//     },
//     {
//         user:'arunim',
//         post: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, vel labore! Magni inventore numquam fuga est non minus, quia, eligendi hic ea explicabo, eaque mollitia. Sunt exercitationem odio ipsam iste!'
//     },
//     {
//         user:'ekansh',
//         post: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, vel labore! Magni inventore numquam fuga est non minus, quia, eligendi hic ea explicabo, eaque mollitia. Sunt exercitationem odio ipsam iste!'
//     },
//     {
//         user:'ruhia',
//         post: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, vel labore! Magni inventore numquam fuga est non minus, quia, eligendi hic ea explicabo, eaque mollitia. Sunt exercitationem odio ipsam iste!'
//     }

// ])
