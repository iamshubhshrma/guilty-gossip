const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb+srv://shubham21:Seenusharma21@cluster0.7dthsdi.mongodb.net/gossip?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('server connected with mongoose');
})
.catch(err=>{
    console.log('encounterred some error');
    console.log(err);
})

const passportLocalMongoose = require('passport-local-mongoose');

// const bcrypt = require('bcrypt');
// const hashpassword = async (pw)=>{
//     const salt = await bcrypt.genSalt(12);
//     console.log(salt);
//     const hashp = await bcrypt.hash(pw,salt);
//     console.log(hashp);
//     return hashp;
// }

// const hashpassword2 = async(pw)=>{
//     const hashp = await bcrypt.hash(pw,12);
//     console.log(hashp);
//     return hashp;
// }




const postSchema = new Schema({
    user: {
        type : Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },   
    post:{
        type : String,
        required: false,
        default : 'user did not added any text'

    },
    tags:{
        type: Array,
        required: false
    },
    likes :  {
        type: Number,
        required: false
    }
})



const userSchema = new Schema({
    cnum: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: false,
        unique : true
    },
    bio: {
        type: String,
        required: true
    }
})
//this plugin gives us passwords plus some more functionalities and methods
userSchema.plugin(passportLocalMongoose);

const user = mongoose.model('user',userSchema);

const alluser = await user.find();
console.log(alluser);

// const alluserdetails =  [
// {
//   username: 'shubham',
//   cnum: 7982031221,
//   email: 'chaoticshubh@gmail.com',
//   bio : 'this is my website'
// },
// {
//   username: 'ruia',
//   cnum: 6290846943,
//   email: 'yashvruia@gmail.com',
//   bio : "I'm a user of this website. I love it!!"
// },
// {
//   username: 'sourav',
//   cnum: 9060611980,
//   email: 'souravshandilya3@gmail.com',
//   bio : "I'm a user of this website. I love it!!"
// },
// {
//   username: 'kushu',
//   cnum: 8090765747,
//   email: 'kushagrashrivastava5544@gmail.com',
//   bio : "I'm a user of this website. I love it!!"
// },
// {
//   username: 'arunim',
//   cnum: 7638035111,
//   email: 'alexgroove691@gmail.com',
//   bio : "I'm a user of this website. I love it!!"
// },
// {
//   username: 'ekansh',
//   cnum: 7017126024,
//   email: 'ekansh.singh20105@gmail.com',
//   bio : "I'm a user of this website. I love it!!"
// },
// {
//   username: 'priyansh',
//   cnum: 8602574613,
//   email: 'priyanshchaudhary8602@gmail.com',
//   bio : "I'm a user of this website. I love it!!"
// },
// {
//   username: 'yuvraj',
//   cnum: 6267610111,
//   bio : "I'm a user of this website. I love it!!",
//   email : "yuvisingh@gmail.com"
// }];

// for(let userobject of alluserdetails){
//     const userinstance = new user(userobject);
//     await user.register(userinstance,`${userobject.username}`);

// }

// await user.insertMany([
//     {
//       name: 'shubham',
//       cnum: 7982031221,
//       email: 'chaoticshubh@gmail.com',
//       bio : 'this is my website'
//     },
//     {
//       name: 'ruia',
//       cnum: 6290846943,
//       email: 'yashvruia@gmail.com',
//       bio : "I'm a user of this website. I love it!!"
//     },
//     {
//       name: 'sourav',
//       cnum: 9060611980,
//       email: 'souravshandilya3@gmail.com',
//       bio : "I'm a user of this website. I love it!!"
//     },
//     {
//       name: 'kushu',
//       cnum: 8090765747,
//       email: 'kushagrashrivastava5544@gmail.com',
//       bio : "I'm a user of this website. I love it!!"
//     },
//     {
//       name: 'arunim',
//       cnum: 7638035111,
//       email: 'alexgroove691@gmail.com',
//       bio : "I'm a user of this website. I love it!!"
//     },
//     {
//       name: 'ekansh',
//       cnum: 7017126024,
//       email: 'ekansh.singh20105@gmail.com',
//       bio : "I'm a user of this website. I love it!!"
//     },
//     {
//       name: 'priyansh',
//       cnum: 8602574613,
//       email: 'priyanshchaudhary8602@gmail.com',
//       bio : "I'm a user of this website. I love it!!"
//     },
//     {
//       name: 'yuvraj',
//       cnum: 6267610111,
//       bio : "I'm a user of this website. I love it!!"
//     }
//   ])
// const shubham = new user({
//     name : 'shubham',
//     cnum : 7982031221,
//     email : 'chaoticshubh@gmail.com',
//     bio : 'this is my website'
// })
// await shubham.save();


const gossip = mongoose.model('gossip',postSchema);
const allposts = await gossip.find();
console.log(allposts);
// await gossip.insertMany([
//     {
//       user:'662a9865e6fd9cf210a158a3',
//       post: 'chhoti randi\r\n',
//       likes: 33,
//       tags: [ 'bitch', 'please' ]
//     },
//     {
//       user: '662a9864e6fd9cf210a1589a',
//       post: 'lode pe jhul ja \r\nsorry lekin mera loda itta bada nahi hehe..',
//       likes: 12,
//       tags: [ 'bitch', 'please' ]
//     },
//     {
//       user: '662a9865e6fd9cf210a158a6',
//       post: 'Gandhi ka Chooda pappu Chood !',
//       likes: 15,
//       tags: [ 'bitch', 'please' ]
//     },
//     {
//       user: '662a9864e6fd9cf210a15891',
//       post: 'hello this is my website bitches',
//       likes: 11,
//       tags: [ 'bitch', 'please' ]
//     },
//     {
//       user: '662a9866e6fd9cf210a158a9',
//       post: 'guardians of the galaxy is a cool game tere lund a cool game bsdk din bhar khelta rehta hai madarchood\r\n',
//       likes: 11,
//       tags: [ 'bitch', 'please' ]
//     },
//     {
//       user:'662a9865e6fd9cf210a158a0',
//       post: 'Gaudie Keila Meri Gaand me Patakha phoot gya',
//       likes: 11,
//       tags: [ 'bitch', 'please' ]
//     },
//     {
//       user: '662a9864e6fd9cf210a15891',
//       post: 'today is a very nice day or....is it?',
//       tags: [],
//       likes: 2
//     },
//     { 
//       user: '662a9864e6fd9cf210a15891',
//       post: 'today seems to be a nice day kushagra ki suppli hai aaj',
//       tags: [],
//       likes: 4
//     },
//     {
//       user:'662a9864e6fd9cf210a15891',
//       post: 'kushagra randi ne kuchh nhi padha poori raat series dekh rha tha',
//       tags: [],
//       likes: 2
//     },
//     {
//       user:'662a9864e6fd9cf210a15891',
//       post: 'flash thing succeeded....yay!!',
//       tags: [],
//       likes: 8
//     }
//   ])


// const allposts = gossip.find({});
// await allposts.updateMany({},{tags:['bitch','please'],likes:10});

// const p1 = new gossip({
    
//     user: '66201b6c3e9e157722869feb',
//     post: 'chhoti randi\r\n',
//     likes: 33,
//     tags: [ 'bitch', 'please' ]
    
// })

// p1.save().then((res) =>{
//     console.log('post saved');
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })


// const allposts = await gossip.find({}).populate('user');
// console.log(allposts);


// for(let post in allposts){
//     console.log(post.user.name);
// }

// const founduser = await user.find({name:'shubham'});
// founduser.password = hashpassword2('shubham');

// const allusers = await user.find({});
// for(let auser of allusers){
//     console.log(auser.name);
//     const mypw = await hashpassword2(`${auser.name}`);
//     await user.updateOne({name:`${auser.name}`},{password:mypw});
// }

// const mypw = await hashpassword2('shubham');
// await user.updateOne({name:'shubham'},{password:`${mypw}`});