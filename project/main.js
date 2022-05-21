
const checkBox = () => {
    let box = document.getElementById('result');

    if (box.innerHTML === "") {
        console.log('empty');
        doSearch();
    } else {
        box.innerHTML = "";
        document.getElementById('searchresult').innerHTML = "";
        document.getElementById('definition').innerHTML = "";
        document.getElementById('partofspeech').innerHTML = "";
        doSearch();
    }
}


const getWord = (something) => {
    console.log(something);

    let box = document.getElementById('result');

    if (box.innerHTML === "") {
        console.log('empty');
    } else {
        box.innerHTML = "";
        document.getElementById('searchresult').innerHTML = "";
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

        document.querySelector('#searchresult').insertAdjacentHTML('beforeend', `Synonyms for <span style="color: #ba5473">${something}</span>:`);

}

// FINE UP TO HERE


     function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

const doSearch = () => {

    // document.getElementById('#result').innerHTML = "";

    let search = document.querySelector('#searchbar').value;

    fetch(`https://api.datamuse.com/words?ml=${search}&md=d`)
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

    document.querySelector('#searchresult').insertAdjacentHTML('beforeend', `Synonyms for <span style="color: #ba5473">${search}</span>:`);

}

// wordnik api key: f2vlglfn5omv8b7pseacobdjf1g6mhtnt2xws329xp67xski7
