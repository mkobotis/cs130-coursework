const makeBigger = () => {
   text = document.querySelector("#p").style.fontSize;
   console.log(text);
   alert('Makes text bigger!');
};

const makeSmaller = () => {
   header = document.querySelector("#h");
   var fontSize = document.querySelector("h1").style.fontSize;
   fontSize = parseFloat(fontSize);
   document.querySelector("h1").style.fontSize = (fontSize + 5) + "px";
   document.querySelector("#p").style.fontSize = "100px";
   alert('make smaller!');
};


document.querySelector("button#a1").addEventListener('click', makeBigger);
document.querySelector("button#a2").addEventListener('click', makeSmaller);

