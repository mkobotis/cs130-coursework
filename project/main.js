let searchValue = 'synonym';
let theDefault = 'true';

var side1 = document.querySelector('#side-1');
var side2 = document.querySelector('#side-2');

side1.classList.add("synonyms");

let box = document.getElementById('searchresult');

document.getElementById('side-1').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById( 'side-2' ).className = 'flip flip-side-1 slideup';
    document.getElementById( 'side-1' ).className = 'flip flip-side-2 slideup';
}, false);

document.getElementById('side-2').addEventListener( 'click', function( event ) {
    event.preventDefault();
    document.getElementById( 'side-2' ).className = 'flip slideup';
    document.getElementById( 'side-1' ).className = 'flip slideup';
    
    if (searchValue == 'synonym') {
        side1.classList.add("synonyms");
    } else if (searchValue == 'antonym') {
        side1.classList.add("antonyms");
    } else {
        side1.classList.add("definitions");
    }
}, false );

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
    console.log('reset');
    side1.classList.remove("slidedown");
    side2.classList.remove("slidedown");
    side1.classList.remove("bottom");
    side2.classList.remove("bottom");
    side1.classList.add("top");
    side2.classList.add("top");

    if (searchValue == 'synonym') {
        side1.classList.add("synonyms");
        side1.classList.remove("antonyms");
        side1.classList.remove("definitions");
    } else if (searchValue == 'antonym') {
        side1.classList.add("antonyms");
        side1.classList.remove("synonyms");
        side1.classList.remove("definitions");
    } else {
        side1.classList.add("definitions");
        side1.classList.remove("synonyms");
        side1.classList.remove("antonyms");
    }

    emptyBox();
}

const emptyBox = () => {
    if (box.innerHTML === "") {
        document.getElementById('result').innerHTML = "";
        document.getElementById('partofspeech').innerHTML = "";
        console.log('empty');
        doSearch();
    } else {
        document.getElementById('searchresult').innerHTML = "";
        document.getElementById('result').innerHTML = "";
        document.getElementById('definition').innerHTML = "";
        document.getElementById('partofspeech').innerHTML = "";
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
            } else {
                checkBox();
            }
           
        }
    }

}


// THIS FUNCTION CHECKS THE HTML TO MAKE SURE IT'S EMPTY BEFORE ADDING NEW INFORMATION
// it is triggered by clicking the search button

const checkBox = () => {

    if (theDefault == 'true') {  // if we're default?
        start();

    } else {  // if we're not default?
        console.log('moving down');
        side1.classList.add("bottom");
        side2.classList.add("bottom");
        moveDown();
    }

}

// THIS FUNCTION LETS YOU CLICK A WORD LINK TO PERFORM A NEW SEARCH FROM THAT LINK

const getWord = (something) => {

    let box = document.getElementById('searchresult');

    if (theDefault == 'true') {  // THIS CASE OCCURS IF THE USER ADDS A WORD TO THE SIDEBAR + CLICKS IT BEFORE PERFORMING A SEARCH
        theDefault = 'false';
        document.querySelector('#side-1').style.display = "block";
        document.querySelector('#side-2').style.display = "block";
        document.querySelector('#homepage').style.display = "none";
    }

    if (box.innerHTML === "") {
        console.log('empty');
        document.getElementById('searchresult').innerHTML = "";
        document.getElementById('result').innerHTML = "";
        document.getElementById('definition').innerHTML = "";
        document.getElementById('partofspeech').innerHTML = "";
    } else {
        document.getElementById('searchresult').innerHTML = "";
        document.getElementById('result').innerHTML = "";
        document.getElementById('definition').innerHTML = "";
        document.getElementById('partofspeech').innerHTML = "";
    }

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

        document.querySelector('#searchresult').insertAdjacentHTML('beforeend', `<h1>${search}</h1><p>SYNONYMS</p>`);

}

// FINE UP TO HERE


     function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

const doSearch = () => {

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
                document.querySelector('#searchresult').insertAdjacentHTML('beforeend', `<h1>NO RESULTS FOUND.</h1><p>Try searching for something else.</p>`);
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
            }

        })

        


    } else if (searchValue == 'antonym') {
        console.log('finding antonyms...');

        fetch(`https://api.datamuse.com/words?rel_ant=${search}&md=d`)
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
        })

        document.querySelector('#searchresult').insertAdjacentHTML('beforeend', `<h1>${search}</h1><p>DEFINITION</p>`);


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



    const newDiv = `<div class="keep">
        <div onclick="getWord('${word}');">${word}</div>
        <svg onclick="del(evt);">
            <line x1="0" y1="0" x2="15" y2="15"></line>
            <line x1="0" y1="15" x2="15" y2="0"></line>
        </svg></div>`

    document.querySelector('#wordlist').insertAdjacentHTML('beforeend', newDiv);

}


const del = (evt) => {
    const currentword = evt.target;
    const ourdiv = currentword.closest('div');
    ourdiv.remove();
    console.log(ourdiv);
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
