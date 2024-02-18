console.log('javascript connected!');
    
const carousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 5000,
    pause: false
})

const carouselButton = document.getElementById('carouselButton');
const faIcon = document.getElementById('faButton');

carouselButton.addEventListener('click', function () {
    if (faIcon.classList.contains('fa-pause')) {
        faIcon.classList.remove('fa-pause');
        faIcon.classList.add('fa-play');
        carousel.pause();
    } else {
        faIcon.classList.remove('fa-play');
        faIcon.classList.add('fa-pause');
        carousel.cycle();
    }
})

async function fetchWeather() {
    try {
        const apiKey = process.env.OPEN_WEATHER_API_KEY
        const city = 'Lacey';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

        const response = await fetch(url);
        const data = await response.json();

        console.log(data);
        displayWeather(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayWeather(data) {
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const img = document.createElement('img');
    img.src = `https://openweathermap.org/img/w/${icon}.png`;

    const container = document.getElementById('weather');
    container.appendChild(img);

    const tempElement = document.createElement('p');
    tempElement.textContent = `${temp}\u00B0 F`;
    container.appendChild(tempElement);

    const descElement = document.createElement('p');
    descElement.textContent = description;
    container.appendChild(descElement);
}

fetchWeather();