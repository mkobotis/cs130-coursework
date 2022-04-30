const makeBigger = () => {
   document.querySelector("#h").style.fontSize = "45px";
   document.querySelector("#p").style.fontSize = "25px";
   alert('Makes text bigger!');
};

const makeSmaller = () => {
   document.querySelector("#h").style.fontSize = "25px";
   document.querySelector("#p").style.fontSize = "10px";
   alert('make smaller!');
};


document.querySelector("button#a1").addEventListener('click', makeBigger);
document.querySelector("button#a2").addEventListener('click', makeSmaller);

