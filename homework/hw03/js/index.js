/**
 * 
 * -------------------------------------
 * DOM Manipulation / Traversal Activity
 * -------------------------------------
 * 
 * 1. Create and attach an event handler (function) to each ".image" 
 * element so that when the ".image" element is clicked, the corresponding 
 * image loads in the .featured image element.
 * 
 * 2. Create event handlers for the next and previous buttons. The next button should
 *    show the next image in the thumbnail list. The previous should show the previous.
 * 
 * 3. If you get to the end, start at the beginning. 
 * 
 * 4. If you get to the beginning, loop around to the end.
 * 
 * 
 */

const images = [
    'images/succulents.jpg',
    'images/purple.jpg',
    'images/jar.jpg',
    'images/green.jpg',
    'images/green1.jpg',
    'images/purple1.jpg',
    'images/magnolias.jpg',
    'images/daisy1.jpg'
];

const initScreen = () => {
    images.forEach((image, idx) => {
        document.querySelector('.cards').innerHTML += `
        <li class="card">
            <button class="image" 
                style="background-image:url('${image}')"
                data-index=${idx}"
                aria-label="Displays image ${idx} in the main panel."></button>
        </li>`;
    });
};

initScreen();

let currentIndex = 0;

const featureImage = (ev) => {
    const image = ev.currentTarget;
    currentIndex = parseInt(image.dataset.index);
    const newImage = image.style.backgroundImage;
    document.querySelector('.featured_image').style.backgroundImage = newImage;
}

const imageElements = document.querySelectorAll('.image');

for (const elem of imageElements) {
    elem.onclick = featureImage;
}

const prevImage = () => {
    if (currentIndex === 0) {
        currentIndex = 7;
        const newImage = `url('${images[7]}')`;
        document.querySelector('.featured_image').style.backgroundImage = newImage;
    } else {
        currentIndex = currentIndex - 1;
        const newImage = `url('${images[currentIndex]}')`;
        document.querySelector('.featured_image').style.backgroundImage = newImage;
    }  
}

const nextImage = () => {
    if (currentIndex === 7) {
        currentIndex = 0;
        const newImage = `url('${images[0]}')`;
        document.querySelector('.featured_image').style.backgroundImage = newImage;
    } else {
        currentIndex = currentIndex + 1;
        const newImage = `url('${images[currentIndex]}')`;
        document.querySelector('.featured_image').style.backgroundImage = newImage;
    }  
}

document.querySelector('.prev').onclick = prevImage;
document.querySelector('.next').onclick = nextImage;
document.querySelector('.featured_image').onclick = nextImage;
