const md5 = require('blueimp-md5');

const qgen = ()=>{
    const ts = Date.now();
    const apikey = 'ed1363e70d6a40bf3ff331ff04872f19';
    const prkey = '4b3a52c15bae0d8204736602b6eb168fc0392ca8';
    const genhash = md5(`${ts}${prkey}${apikey}`);
    const apiq = `ts=${ts}&apikey=${apikey}&hash=${genhash}`;
    return apiq;
}
console.log(qgen());
