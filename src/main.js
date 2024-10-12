async function getTrendingMoviesPreview() {
    const res = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY
    );
    const data = await res.json();
    const movies = data.results;

    const trendingPreviewMoviesContainer = document.querySelector(".poster_div");

    movies.forEach((movie, index) => {
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("poster_item");

        const movieImg = document.createElement("img");
        movieImg.classList.add("movie-img");
        movieImg.setAttribute("alt", movie.title);
        movieImg.setAttribute(
            "src",
            "https://image.tmdb.org/t/p/w300" + movie.poster_path
        );

        movieImg.addEventListener('click', function () {
            updateBannerInfo(movie); // Usar función para actualizar la info
        });

        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer);

        // Si es el primer elemento, mostrarlo por defecto
        if (index === 0) {
            updateBannerInfo(movie); // Mostrar información del primer poster
        }
    });
}

function updateBannerInfo(movie) {
    const background = document.querySelector('body');
    const titulo = document.querySelector('.banner_title');
    const rates = document.querySelector('.ratings');
    const year = document.querySelector('.year');
    const description = document.querySelector('.banner_description');

    // Precargar la imagen de fondo
    const img = new Image();
    img.src = "https://image.tmdb.org/t/p/w1280" + movie.backdrop_path;
    img.onload = () => {
        background.style.backgroundImage = `url(${img.src})`;
    };

    titulo.innerText = movie.title;
    rates.innerHTML = `<p class="ratings">` + Number(movie.vote_average).toFixed(2) + ` <i class="fa-solid fa-star"></i></p>`;
    
    const releaseYear = movie.release_date.split('-')[0];
    year.innerText = releaseYear;

    // Limitar la descripción a 20 palabras
    const fullDescription = movie.overview;
    const wordLimit = 20;
    const words = fullDescription.split(' ');

    if (words.length > wordLimit) {
        const limitedDescription = words.slice(0, wordLimit).join(' ') + '...';
        description.innerHTML = limitedDescription;

        // Crear botón de "Ver más"
        const moreButton = document.createElement('button');
        moreButton.innerText = "Ver más";
        moreButton.classList.add('more-button');
        description.appendChild(moreButton); // Asegúrate de agregar el botón dentro de la descripción

        // Evento para mostrar la descripción completa
        moreButton.addEventListener('click', function () {
            description.innerHTML = fullDescription;
        });
    } else {
        description.innerText = fullDescription; // Mostrar la descripción completa si no es tan larga
    }
}

const posterDiv = document.querySelector('.poster_div');
let scrollAmount = 220;
document.querySelector('.scroll-left').addEventListener('click', () => {
    console.log('Scroll left button clicked');
    posterDiv.scrollLeft -= scrollAmount;
});

document.querySelector('.scroll-right').addEventListener('click', () => {
    console.log('Scroll right button clicked');
    posterDiv.scrollLeft += scrollAmount;
});

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
});

getTrendingMoviesPreview();
