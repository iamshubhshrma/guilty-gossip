const delforms = document.querySelectorAll('.delform');
const userbutton = document.querySelector('#userbutton');
const nav_ul = document.querySelector('#nav_ul');
const usernames = document.querySelectorAll('.username');
const userdropdown = document.querySelector('#userdropdown');

const {user,gossip} = require('../models/gposts.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/gossip').then(()=>{
    console.log('server connected with mongoose');
}).catch(err=>{
    console.log('encounterred some error');
    console.log(err);
})
const allposts = await gossip.find({});
const allusers = await user.find({});


function displayblock(){ this.style.display='block';}
function displaynone(){this.style.display='none';}

for(let b of delforms){
    b.firstChild.addEventListener('onclick',()=>{
        b.submit();
    })
}

for(let username of usernames){
    username.addEventListener('mouseover',()=>{
        console.log(username.innerText);
    })
    username.addEventListener('mouseout',()=>{
        person = username;
        username.style.backgroundColor = 'red';
    })
}



userbutton.addEventListener('mouseover',()=>{
    // event.stopPropagation();
    userdropdown.style.display = 'block';
})
userbutton.addEventListener('mouseout',()=>{
    userdropdown.style.display = 'none';
})
