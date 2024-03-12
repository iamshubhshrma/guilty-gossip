const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type : String,
        required : true
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

const gossip = mongoose.model('gossip',postSchema);
module.exports = {user,gossip};