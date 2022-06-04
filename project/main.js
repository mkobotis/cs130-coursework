let searchValue = 'synonym';
let theDefault = 'true';
let nothing = 'false';
let flipside = 'front';
let newword = 'blank';
let getword = 'false';
let currentword = 'null';

var sidebarwords = [];

var side1 = document.querySelector('#side-1');
var side2 = document.querySelector('#side-2');

side1.classList.add("synonyms");

let box = document.getElementById('searchresult');

document.getElementById('side-1').addEventListener('click', function(event) {

    if (nothing == 'true') {
        event.preventDefault();
    } else {
        event.preventDefault();
        document.getElementById( 'side-2' ).className = 'flip flip-side-1 slideup';
        document.getElementById( 'side-1' ).className = 'flip flip-side-2 slideup';
        flipside = 'back';
        console.log(newword);
    }
}, false);

document.getElementById('side-2').addEventListener( 'click', function( event ) {
    event.preventDefault();
    document.getElementById( 'side-2' ).className = 'flip slideup';
    document.getElementById( 'side-1' ).className = 'flip slideup';
    flipside = 'front';

    if (searchValue == 'synonym') {
        side1.classList.add("synonyms");
    } else if (searchValue == 'antonym') {
        side1.classList.add("antonyms");
    } else if (searchValue == 'definition') {
        side1.classList.add("definitions");
    }
    
}, false );

const flipOver = () => {
    document.getElementById( 'side-2' ).className = 'flip slideup';
    document.getElementById( 'side-1' ).className = 'flip slideup';

    if (nothing == 'true') {
        side1.classList.add("noresult");
    } else {
        if (searchValue == 'synonym') {
            side1.classList.add("synonyms");
        } else if (searchValue == 'antonym') {
            side1.classList.add("antonyms");
        } else if (searchValue == 'definition') {
            side1.classList.add("definitions");
        }
    }

    setTimeout(() => {
        side1.classList.add("bottom");
        side2.classList.add("bottom");
        moveDown();
      }, "1000")

}

const start = () => {
    console.log('down');
    let home = document.querySelector('#homepage');
    home.classList.add("startdown");
    setTimeout(emptyBox, 1000);``
}

const moveDown = () => {
    console.log('down');
    side1.classList.add("slidedown");
    side2.classList.add("slidedown");
    setTimeout(resetDiv, 1000);
}

const resetDiv = () => {
    nothing = 'false';
    console.log('reset');
    side1.classList.remove("slidedown");
    side2.classList.remove("slidedown");
    side1.classList.remove("bottom");
    side2.classList.remove("bottom");
    side1.classList.add("top");
    side2.classList.add("top");

    let list = side1.classList;

    console.log(list);

    if (searchValue == 'synonym') {
        side1.classList.add("synonyms");
        side1.classList.remove("antonyms");
        side1.classList.remove("definitions");
        side1.classList.remove("noresult");
    } else if (searchValue == 'antonym') {
        side1.classList.add("antonyms");
        side1.classList.remove("synonyms");
        side1.classList.remove("definitions");
        side1.classList.remove("noresult");
    } else {
        side1.classList.add("definitions");
        side1.classList.remove("synonyms");
        side1.classList.remove("antonyms");
        side1.classList.remove("noresult");
    }

    emptyBox();
}

const emptyBox = () => {  /// MAYBE SIMPLIFY THIS CODE AND TAKE OUT THE FIRST IF STATEMENT

    if (box.innerHTML === "") {
        document.getElementById('result').innerHTML = "";
        document.getElementById('partofspeech').innerHTML = "";
        console.log('empty');
    } else {
        document.getElementById('searchresult').innerHTML = "";
        document.getElementById('click').innerHTML = "";
        document.getElementById('result').innerHTML = "";
        document.getElementById('definition').innerHTML = "";
        document.getElementById('partofspeech').innerHTML = "";   
    }

    if (getword == 'true') {
        setTimeout(getWord1, 100, newword);
    } else {
        setTimeout(doSearch, 100);
    }
}


// THIS FUNCTION CHANGES THE CSS OF BUTTONS WHEN YOU NAVIGATE

const init = () => {
    const startScreen = document.querySelector('#modal');
    console.log(startScreen);
    startScreen.remove();
}

const visitLink = (kind) => {
    if (kind == 'syn') {
        synClass = document.getElementById('synonyms').className
        if (synClass == 'selected') {
            console.log('is selected');
            searchValue = 'synonym';
        } else {
            console.log('is unselected');
            document.getElementById('synonyms').className = 'selected';
            document.getElementById('antonyms').className = 'unselected';
            document.getElementById('definitions').className = 'unselected';
            document.querySelector('.searchquery').innerHTML = 'What\'s another word for';
            searchValue = 'synonym';

            if (theDefault == 'true') {
                // NOTHING
            } else if (getword == 'true') {
                getWord(newword);
            } else {
                checkBox();
            }
        }
    } else if (kind == 'ant') {
        antClass = document.getElementById('antonyms').className
        if (antClass == 'selected') {
            console.log('is selected');
            searchValue = 'antonym';
        } else {
            console.log('is unselected');
            document.getElementById('antonyms').className = 'selected';
            document.getElementById('synonyms').className = 'unselected';
            document.getElementById('definitions').className = 'unselected';
            document.querySelector('.searchquery').innerHTML = 'What\'s the opposite of';
            searchValue = 'antonym';

            if (theDefault == 'true') {
                side1.classList.add("antonyms");
            } else if (getword == 'true') {
                getWord(newword);
            } else {
                checkBox();
            }
        }
    } else {
        defClass = document.getElementById('definitions').className
        if (defClass == 'selected') {
            console.log('is selected');
            searchValue = 'definition';
        } else {
            console.log('is unselected');
            document.getElementById('definitions').className = 'selected';
            document.getElementById('antonyms').className = 'unselected';
            document.getElementById('synonyms').className = 'unselected';
            document.querySelector('.searchquery').innerHTML = 'What\'s the meaning of';
            searchValue = 'definition';
            
            if (theDefault == 'true') {
                side1.classList.add("definitions");
            } else if (getword == 'true'){
                getWord(newword);
            } else {
                checkBox();
            }
           
        }
    }

}


// THIS FUNCTION CHECKS THE HTML TO MAKE SURE IT'S EMPTY BEFORE ADDING NEW INFORMATION
// it is triggered by clicking the search button

const checkBox = () => {

    getword = 'false';
    nothing = 'false';

    if (theDefault == 'true') {  // if we're default?
        start();

    } else {  // if we're not default?
        if (flipside == 'back') {
            flipOver();
        } else {
            console.log('moving down');
            side1.classList.add("bottom");
            side2.classList.add("bottom");
            moveDown();
        }
    }

}

const getWord = (something) => {
    newword = something;
    currentword = something;
    getword = 'true';
    console.log(newword);
    
    if (flipside == 'back') {
        flipOver();
    } else {
        console.log('moving down');
        side1.classList.add("bottom");
        side2.classList.add("bottom");
        moveDown();
    }
}

// THIS FUNCTION LETS YOU CLICK A WORD LINK TO PERFORM A NEW SEARCH FROM THAT LINK

const getWord1 = (something) => {  // HAD TO RENAME GETWORD

    /////// THE WHOLE DEFAULT SITUATION

    if (theDefault == 'true') {  // THIS CASE OCCURS IF THE USER ADDS A WORD TO THE SIDEBAR + CLICKS IT BEFORE PERFORMING A SEARCH
        theDefault = 'false';
        document.querySelector('#side-1').style.display = "block";
        document.querySelector('#side-2').style.display = "block";
        document.querySelector('#homepage').style.display = "none";
    }

    //////////

    if (searchValue == 'synonym') {

        fetch(`https://api.datamuse.com/words?ml=${something}&md=d`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
    
            for (const item of data) {
                const para = `
                    <div onclick="getWord('${item.word}');">${item.word}</div>
                `
                document.querySelector('#result').insertAdjacentHTML('beforeend', para);
    
            }
    
        })
    
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
                'X-RapidAPI-Key': '3bb73c8557msh88d92af04babb95p171588jsnf32548f6fa1c'
            }
        };
        
        fetch(`https://wordsapiv1.p.rapidapi.com/words/${something}/definitions`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
    
                let definition = response.definitions[0].definition;
    
                console.log(definition);
    
                document.querySelector('#definition').insertAdjacentHTML('beforeend', definition);
    
                let partofspeech = response.definitions[0].partOfSpeech;
    
                console.log(partofspeech);
    
                document.querySelector('#partofspeech').insertAdjacentHTML('beforeend', partofspeech);
        })

            document.querySelector('#searchresult').insertAdjacentHTML('beforeend', `<h1>${something}</h1><p>SYNONYMS</p>`);
            document.querySelector('#click').insertAdjacentHTML('beforeend', `<p class="small">CLICK TO FLIP</p>`);
    } else if (searchValue == 'antonym') {
        console.log('finding antonyms...');

        fetch(`https://api.datamuse.com/words?rel_ant=${something}&md=d`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            for (const item of data) {
                const para = `
                    <div onclick="getWord('${item.word}');">${item.word}</div>
                `
                document.querySelector('#result').insertAdjacentHTML('beforeend', para);

            }

        })

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
                'X-RapidAPI-Key': '3bb73c8557msh88d92af04babb95p171588jsnf32548f6fa1c'
            }
        };
        
        fetch(`https://wordsapiv1.p.rapidapi.com/words/${something}/definitions`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response);

                let definition = response.definitions[0].definition;

                console.log(definition);

                document.querySelector('#definition').insertAdjacentHTML('beforeend', definition);

                let partofspeech = response.definitions[0].partOfSpeech;

                console.log(partofspeech);

                document.querySelector('#partofspeech').insertAdjacentHTML('beforeend', partofspeech);
        })

        document.querySelector('#searchresult').insertAdjacentHTML('beforeend', `<h1>${something}</h1><p>ANTONYMS</p>`);
        document.querySelector('#click').insertAdjacentHTML('beforeend', `<p class="small">CLICK TO FLIP</p>`);
    } else if (searchValue == 'definition') {
        console.log('finding definitions...');

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
                'X-RapidAPI-Key': '3bb73c8557msh88d92af04babb95p171588jsnf32548f6fa1c'
            }
        };
        
        fetch(`https://wordsapiv1.p.rapidapi.com/words/${something}/definitions`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response);

                let definition = response.definitions[0].definition;

                console.log(definition);

                document.querySelector('#definition').insertAdjacentHTML('beforeend', definition);

                let partofspeech = response.definitions[0].partOfSpeech;

                console.log(partofspeech);

                document.querySelector('#partofspeech').insertAdjacentHTML('beforeend', partofspeech);
        })

        document.querySelector('#searchresult').insertAdjacentHTML('beforeend', `<h1>${something}</h1><p>DEFINITION</p>`);
        document.querySelector('#click').insertAdjacentHTML('beforeend', `<p class="small">CLICK TO FLIP</p>`);

    }

    side1.classList.add("slideup");
    side2.classList.add("slideup");

    // getword = 'false';

}

// FINE UP TO HERE


     function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

const doSearch = () => {

    nothing = 'false';

    theDefault = 'false';

    document.querySelector('#side-1').style.display = "block";
    document.querySelector('#side-2').style.display = "block";
    //document.querySelector('#homepage').style.display = "none";

    let search = document.querySelector('#searchbar').value;

    if (searchValue == 'synonym') {
        console.log('finding synonyms...');

        fetch(`https://api.datamuse.com/words?ml=${search}&md=d`)
        .then(response => response.json())
        .then(data => {

            if (data.length === 0) {
                // document.querySelector('#side-1').style.display = "none";
                // document.querySelector('#side-2').style.display = "none";
                // document.querySelector('#side-1').style.backgroundColor = '#E08989';
                document.querySelector('#side-1').classList.add('noresults');
                document.querySelector('#searchresult').insertAdjacentHTML('beforeend', `<h1>NO RESULTS FOUND.</h1><p>Try searching for something else.</p>`);
                nothing = 'true';
            } else {
                for (const item of data) {
                    const para = `
                        <div onclick="getWord('${item.word}');">${item.word}</div>
                    `
                    document.querySelector('#result').insertAdjacentHTML('beforeend', para);
    
                }

                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
                        'X-RapidAPI-Key': '3bb73c8557msh88d92af04babb95p171588jsnf32548f6fa1c'
                    }
                };
                
                fetch(`https://wordsapiv1.p.rapidapi.com/words/${search}/definitions`, options)
                    .then(response => response.json())
                    .then(response => {
                        console.log(response);
        
                        let definition = response.definitions[0].definition;
        
                        console.log(definition);
        
                        document.querySelector('#definition').insertAdjacentHTML('beforeend', definition);
        
                        let partofspeech = response.definitions[0].partOfSpeech;
        
                        console.log(partofspeech);
        
                        document.querySelector('#partofspeech').insertAdjacentHTML('beforeend', partofspeech);
                })
        
                document.querySelector('#searchresult').insertAdjacentHTML('beforeend', `<h1>${search}</h1><p>SYNONYMS</p>`);
                document.querySelector('#click').insertAdjacentHTML('beforeend', `<p class="small">CLICK TO FLIP</p>`);
                currentword = search;
                console.log(currentword);
            }

        })

        
    } else if (searchValue == 'antonym') {
        console.log('finding antonyms...');

        fetch(`https://api.datamuse.com/words?rel_ant=${search}&md=d`)
        .then(response => response.json())
        .then(data => {

            if (data.length === 0) {
                // document.querySelector('#side-1').style.display = "none";
                // document.querySelector('#side-2').style.display = "none";
                // document.querySelector('#side-1').style.backgroundColor = '#E08989';
                document.querySelector('#side-1').classList.add('noresults');
                document.querySelector('#searchresult').insertAdjacentHTML('beforeend', `<h1>NO RESULTS FOUND.</h1><p>Try searching for something else.</p>`);
                nothing = 'true';
            } else {

                for (const item of data) {
                    const para = `
                        <div onclick="getWord('${item.word}');">${item.word}</div>
                    `
                    document.querySelector('#result').insertAdjacentHTML('beforeend', para);

                }

                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
                        'X-RapidAPI-Key': '3bb73c8557msh88d92af04babb95p171588jsnf32548f6fa1c'
                    }
                };
                
                fetch(`https://wordsapiv1.p.rapidapi.com/words/${search}/definitions`, options)
                    .then(response => response.json())
                    .then(response => {
                        console.log(response);
        
                        let definition = response.definitions[0].definition;
        
                        console.log(definition);
        
                        document.querySelector('#definition').insertAdjacentHTML('beforeend', definition);
        
                        let partofspeech = response.definitions[0].partOfSpeech;
        
                        console.log(partofspeech);
        
                        document.querySelector('#partofspeech').insertAdjacentHTML('beforeend', partofspeech);
                })

                document.querySelector('#searchresult').insertAdjacentHTML('beforeend', `<h1>${search}</h1><p>ANTONYMS</p>`);
                document.querySelector('#click').insertAdjacentHTML('beforeend', `<p class="small">CLICK TO FLIP</p>`);
                currentword = search;
                console.log(currentword);

            }
        })


    } else if (searchValue == 'definition') {
        console.log('finding definitions...');

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
                'X-RapidAPI-Key': '3bb73c8557msh88d92af04babb95p171588jsnf32548f6fa1c'
            }
        };
        
        fetch(`https://wordsapiv1.p.rapidapi.com/words/${search}/definitions`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response);

                let definition = response.definitions[0].definition;

                console.log(definition);

                document.querySelector('#definition').insertAdjacentHTML('beforeend', definition);

                let partofspeech = response.definitions[0].partOfSpeech;

                console.log(partofspeech);

                document.querySelector('#partofspeech').insertAdjacentHTML('beforeend', partofspeech);

                document.querySelector('#searchresult').insertAdjacentHTML('beforeend', `<h1>${search}</h1><p>DEFINITION</p>`);
                document.querySelector('#click').insertAdjacentHTML('beforeend', `<p class="small">CLICK TO FLIP</p>`);
        
                currentword = search;
                console.log(currentword);
            })
            .catch((error) => {
            console.log(error);
            console.log('uh oh');
            document.querySelector('#side-1').classList.add('noresults');
            document.querySelector('#searchresult').insertAdjacentHTML('beforeend', `<h1>NO RESULTS FOUND.</h1><p>Try searching for something else.</p>`);
            nothing = 'true';
          });

    }

    side1.classList.add("slideup");
    side2.classList.add("slideup");

}


const synonyms = () => {
    console.log('Searching for synonyms');
    visitLink('syn');
}

const antonyms = () => {
    console.log('Searching for antonyms');
    visitLink('ant');
}

const definitions = () => {
    console.log('Searching for definitions');
    visitLink('def');
}

var addWords = document.getElementById('add');

const addWord = () => {

    const word = addWords.value;

    fetch(`https://api.datamuse.com/words?ml=${word}&md=d`)
        .then(response => response.json())
        .then(data => {

            if (data.length === 0) {
                console.log('invalid');
                document.querySelector('#valid').insertAdjacentHTML('beforeend', 'Invalid word.');
                document.querySelector('#add').value = '';
                return
            } else {
                if (sidebarwords.includes(word)) {
                    console.log('duplicate');
                    document.querySelector('#valid').insertAdjacentHTML('beforeend', 'Duplicate word.');
                    document.querySelector('#add').value = '';
                } else {
            
                let element = document.getElementById('valid');
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
            
                var colors = ['#FFD0E5', '#FFD7B2', '#FFF6A3', '#D4F3FF', '#D3F6EA'];
            
                let newcolor = colors[Math.floor(Math.random() * colors.length)];
            
                const newDiv = `<button type="button" class="collapsible" style="background-color:${newcolor};" value="${word}">${word}</button>
                                    <div class="content">
                                        <div class="buttons">
                                        <button class="syn" onclick="syn('${word}');">SYN</button>
                                        <button class="ant" onclick="ant('${word}');">ANT</button>
                                        <button class="def" onclick="def('${word}');">DEF</button>
                                        </div>
                                        <button class="x" onclick="del(event)">
                                            <i class="fa-regular fa-trash"></i>
                                        </button>
                                    </div>`
            
                document.querySelector('#wordlist').insertAdjacentHTML('beforeend', newDiv);
                document.querySelector('#add').value = "";
            
                sidebarwords.push(word);
                console.log(sidebarwords);
                }
            
                let coll = document.getElementsByClassName('collapsible');
                let len = coll.length;
                let end = coll[len-1];
            
                console.log(coll);
                
                end.addEventListener("click", function() {
                    this.classList.toggle("active");
                    var content = this.nextElementSibling;
                    if (content.style.maxHeight){
                      content.style.maxHeight = null;
                    } else {
                      content.style.maxHeight = content.scrollHeight + "px";
                    } 
                  })
            }
        })

}

const syn = (word) => {
    console.log(word);
    searchValue = 'synonym';
    getWord(word);
}

const ant = (word) => {
    console.log(word);
    searchValue = 'antonym';
    getWord(word);
}

const def = (word) => {
    console.log(word);
    searchValue = 'definition';
    getWord(word);
}


const del = (event) => {
    const currentword = event.target;
    const ourcontent = currentword.closest('.content');
    const ourdiv = ourcontent.previousElementSibling;
    let theword = ourdiv.value;
    ourdiv.remove();
    ourcontent.remove();
    sidebarwords = sidebarwords.filter(item => item !== theword)
    console.log(sidebarwords);
}



const bookmark = () => {

    const word = currentword;

                if (sidebarwords.includes(word)) {
                    console.log('duplicate');
                    document.querySelector('#valid').insertAdjacentHTML('beforeend', 'Already favorited.');
                    document.querySelector('#add').value = '';
                } else {
            
                let element = document.getElementById('valid');
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
            
                var colors = ['#f1a5c7cc', '#f7c18ecc', '#f6e977cc', '#a4d3e6cc', '#85cbb3cc'];
            
                let newcolor = colors[Math.floor(Math.random() * colors.length)];
            
                const newDiv = `<button type="button" class="collapsible" style="background-color:${newcolor};" value="${word}">${word}</button>
                                    <div class="content">
                                        <div class="buttons">
                                        <button class="syn" onclick="syn('${word}');">SYN</button>
                                        <button class="ant" onclick="ant('${word}');">ANT</button>
                                        <button class="def" onclick="def('${word}');">DEF</button>
                                        </div>
                                        <button class="x" onclick="del(event)">
                                            <i class="fa-regular fa-trash"></i>
                                        </button>
                                    </div>`
            
                document.querySelector('#wordlist').insertAdjacentHTML('beforeend', newDiv);
                document.querySelector('#add').value = "";
            
                sidebarwords.push(word);
                console.log(sidebarwords);
                }
            
                let coll = document.getElementsByClassName('collapsible');
                let len = coll.length;
                let end = coll[len-1];
            
                console.log(coll);
                
                end.addEventListener("click", function() {
                    this.classList.toggle("active");
                    var content = this.nextElementSibling;
                    if (content.style.maxHeight){
                      content.style.maxHeight = null;
                    } else {
                      content.style.maxHeight = content.scrollHeight + "px";
                    } 
                  })
        }



var input = document.getElementById("searchbar");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keydown", function(e) {
  // If the user presses the "Enter" key on the keyboard
  if (e.key === "Enter") {
    // Cancel the default action, if needed
    e.preventDefault();
    // Trigger the button element with a click
    checkBox();
  }
});

addWords.addEventListener("keydown", function(e) {
    // If the user presses the "Enter" key on the keyboard
    if (e.key === "Enter") {
      // Cancel the default action, if needed
      e.preventDefault();
      // Trigger the button element with a click
      addWord();
    }
  });


// wordnik api key: f2vlglfn5omv8b7pseacobdjf1g6mhtnt2xws329xp67xski7

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("logo");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
