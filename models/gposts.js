const { object } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

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
    },
    image:{
        type: Object,
        required: false,
        url:String,
        filename:String
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
userSchema.plugin(passportLocalMongoose);

const user = mongoose.model('user',userSchema);

const gossip = mongoose.model('gossip',postSchema);
module.exports = {user,gossip};