const makeBigger = () => {
   hfont = document.getElementById('h').style.fontSize;
   hfont = parseFloat(hfont);
   hfont = (hfont + 2) + 'px';

   pfont = document.getElementById('p').style.fontSize;
   pfont = parseFloat(pfont);
   pfont = (pfont + 2) + 'px';

   document.querySelector("#h").style.fontSize = hfont;
   document.querySelector("#p").style.fontSize = pfont;
};

const makeSmaller = () => {
   hfont = document.getElementById('h').style.fontSize;
   hfont = parseFloat(hfont);
   hfont = (hfont - 2) + 'px';

   pfont = document.getElementById('p').style.fontSize;
   pfont = parseFloat(pfont);
   pfont = (pfont - 2) + 'px';

   document.querySelector("#h").style.fontSize = hfont;
   document.querySelector("#p").style.fontSize = pfont;
};


document.querySelector("button#a1").addEventListener('click', makeBigger);
document.querySelector("button#a2").addEventListener('click', makeSmaller);
