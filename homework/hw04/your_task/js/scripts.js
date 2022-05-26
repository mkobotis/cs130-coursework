const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    clearTracks();
    clearAlbums();
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const clearTracks = () => {
    document.querySelector('#tracks').innerHTML = "";
}

const clearAlbums = () => {
    document.querySelector('#albums').innerHTML = "";
}


let i = 5;

// make it work for less than 5 tracks

const getTracks = (term) => {
    fetch(`https://www.apitutor.org/spotify/simple/v1/search?type=track&q=${term}`)
    .then(response => response.json())
    .then(data => {
        if (data.length == 0) {
            console.log('No results found');
            document.querySelector('#tracks').innerHTML = `
            <h2>No tracks found matching "${term}"</h2>`;
        } else {

            for (let i = 0; i < 5; i++) {
                const result = data[i];
                const preview = result.preview_url;
                const track = result.name;
                const artist = result.artist.name;
                const img = result.album.image_url;
                const albumname = result.album.name;

                if (preview == null) {
                    const button = `
                    <button class="track-item preview" data-preview-track="${preview}" onclick="handleTrackClick(event);">
                        <img src=${img} alt="Album cover for ${albumname}">
                        <i class="fas play-track fa-play" aria-hidden="true"></i>
                        <div class="label">
                            <h2>${track}</h2>
                            <p>
                                ${artist} - <i><span style="color:#686868">no preview available</span></i>
                            </p>
                        </div>
                    </button>`;

                    document.querySelector('#tracks').insertAdjacentHTML('beforeend', button);
                } else {
                    const button = `
                    <button class="track-item preview" data-preview-track="${preview}" onclick="handleTrackClick(event);">
                        <img src=${img}>
                        <i class="fas play-track fa-play" aria-hidden="true"></i>
                        <div class="label">
                            <h2>${track}</h2>
                            <p>
                                ${artist}
                            </p>
                        </div>
                    </button>`;

                    document.querySelector('#tracks').insertAdjacentHTML('beforeend', button);
                }
        
            }
            }
        })
    .catch((error) => {
        console.error('Error:', error);
    })
};

const getAlbums = (term) => {
    fetch(`https://www.apitutor.org/spotify/simple/v1/search?type=album&q=${term}`)
    .then(response => response.json())
    .then(data => {
        if (data.length == 0) {
            console.log('No results found');
            document.querySelector('#albums').innerHTML = `
            <h2>No albums found matching "${term}"</h2>`;
        } else {

            for (const albums of data) {
                const id = albums.id;
                const name = albums.name;
                const img = albums.image_url;
                const url = albums.spotify_url;

                const album = `
                <section class="album-card" id="${id}">
                <div>
                    <img src=${img} alt="Album cover for ${name}">
                    <h2>${name}</h2>
                    <div class="footer">
                        <a href=${url} target="_blank">
                            Spotify
                        </a>
                    </div>
                </div>
                </section>`;

                document.querySelector('#albums').insertAdjacentHTML('beforeend', album);
            }
            }
        })
    .catch((error) => {
        console.error('Error:', error);
    })
};

const getArtist = (term) => {
    fetch(`https://www.apitutor.org/spotify/simple/v1/search?type=artist&q=${term}`)
    .then(response => response.json())
    .then(data => {
        if (data.length == 0) {
            console.log('No results found');
            document.querySelector('#artist').innerHTML = `
            <section class="noresults">
            <div>
                <h2>No artists found matching "${term}"</h2>
            </div>
        </section>`;
            
        } else {
        const result = data[0];
        const id = result.id;
        const artist = result.name;
        const img = result.image_url;
        const url = result.spotify_url;

        document.querySelector('#artist').innerHTML = `
        <section class="artist-card" id=${id}>
            <div>
                <img src=${img} alt="Image of ${artist}">
                <h2>${artist}</h2>
                <div class="footer">
                    <a href=${url}>Spotify</a>
                </div>
            </div>
        </section>`;
        console.log(result);
        }
        })
    .catch((error) => {
        console.error('Error:', error);
    })
}

const handleTrackClick = (ev) => {
    console.log(ev.currentTarget);
    const previewUrl = ev.currentTarget.getAttribute('data-preview-track');
    const img = ev.currentTarget.childNodes[1].getAttribute('src');
    const title = ev.currentTarget.childNodes[5].childNodes[1].innerHTML;
    const artist = ev.currentTarget.childNodes[5].childNodes[3].innerHTML;
    document.getElementById('current-track').setAttribute('data-preview-track', previewUrl);
    document.querySelector('#current-track').innerHTML = `
        <img src=${img}>
        <i class="fas play-track fa-pause" aria-hidden="true"></i>
        <div class="label">
            <h2>${title}</h2>
            <p>${artist}</p>
        </div>`
    audioPlayer.setAudioFile(previewUrl);
    audioPlayer.play();
}

document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    //console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};
