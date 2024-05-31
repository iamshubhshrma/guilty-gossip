const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const hashpassword = async (pw)=>{
    const salt = await bcrypt.genSalt(12);
    console.log(salt);
    const hash = await bcrypt.hash(pw,salt);
    console.log(hash);
}

const hashpassword2 = async(pw)=>{
    const hash = await bcrypt.hash(pw,12);
    console.log(hash);
}

await hashpassword2('shubham');
await hashpassword2('shubham');

//always await while executing async functions
const mypass = await hashpassword('shubham');
const mypass2 =await hashpassword2('shubham');

const login = async(inputp,pb)=>{
    const result = await bcrypt.compare(inputp,pb);
    if(result){
        console.log('logged in successfully');
    }else{
        console.log('try again');
    }
}

await login('shubhams','$2b$12$TBbGBxsk/Q7Tq4ld3ew0/Og/W106fp1qL/wGgv.3KmMjc3KBuseoq');
await login('shubham','$2b$12$TNwJupuut0uMwRfiX4Fk4ODJ1oDPDWt7EOt.7Lw03SlSMqIO/Nabu');