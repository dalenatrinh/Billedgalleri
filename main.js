// Array for alle billeder
const images = [
    './images/flower-sun.jpg',
    './images/hands-up.jpg',
    './images/ice-berg.jpg',
    './images/man-in-sand.jpg',
    './images/more-sand.jpg',
    './images/walking-on-rock.jpg',
];


// Function for at vise billeder og ikon
function displayImages() {
    // Får fat i id fra index
    const gallery = document.getElementById('image-gallery');


    images.forEach((imageSrc, index) => {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        // Billede
        const img = document.createElement('img');
        // Navn på billede
        img.src = imageSrc;
        img.alt = 'Description';
        img.className = 'gallery-image no-select';

        // Icon
        const icon = document.createElement('div');
        icon.src = './images/heart.svg';
        icon.className = 'image-icon no-select';
        icon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35">
                <path fill="white" d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z"/>
            </svg>
        `;


        // variable for dbclick på ikon
        let isIconToggled = false;

        // Sender data via dbclick til mongoDB
        async function sendImg(imagePath, isActive) {
            // Brug reggex til at finde billednavnet uden sti og filtype
            const imageNameRegex = /\/images\/([^.]+).jpg/;
            const match = imagePath.match(imageNameRegex);
            const imageName = match ? match[1] : null;

            // Hvis billednavnet blev fundet korrekt, send det til serveren
            if (imageName) {
                let imgData = {
                    reqImageName: imageName,
                    reqIsActivated: isActive
                }
                // Hvis succes
                const response = await axios.put("http://localhost:3000/api/updateHeart", imgData);
                if (response.status === 200) {
                    console.log("updated")
                }
            } else {
                console.error('Could not extract image name from path:', imagePath);
            }
        }


        // dbclick funktionen
        img.addEventListener('dblclick', function (event) {
            // prevent selected img
            event.preventDefault();
            console.log(img.id);

            // Toggle rød og hvid hjertefarve
            isIconToggled = !isIconToggled;
            const fillColor = isIconToggled ? 'red' : 'white';


            // Send navnet og boolean-værdi på det dobbeltklikkede billede til MongoDB
            sendImg(imageSrc, isIconToggled);

            // Skifte farve på hjerte
            icon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35">
            <path fill="${fillColor}" d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z"/>
            </svg>
            `;

        });


        // append galleri, billeder og sidst ikon
        gallery.appendChild(imageContainer);
        imageContainer.appendChild(img);
        imageContainer.appendChild(icon);

    });
}

// Kør funktionen
displayImages();

// registrering af serviceworker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
};
