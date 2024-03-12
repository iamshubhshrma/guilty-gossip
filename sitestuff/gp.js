const delforms = document.querySelectorAll('.delform');
for(let b of delforms){
    console.log(b);
    console.log(b.firstChild);
    b.firstChild.addEventListener('onclick',()=>{
        b.submit();
    })
    
}

