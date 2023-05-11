const API_KEY = 'a099b72c-35a3-412e-a93c-f2a2217d8cca'
const API_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1'
const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='

getMovies(API_URL)

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    showMovies(respData);
}

function chechMovieRating(rating) {
    if (rating) {
        if (rating.includes('%')) {
            return rating.slice(0, -3) / 10
        } else if (rating == 'null'){
            return 0
        } else {
            return rating
        }
    } else {
        return 0
    }
}

function getClassByRate(vote) {
    if (vote >= 7) {
        return 'green'
    } else if (vote > 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

function showMovies(data) {
    const moviesEl = document.querySelector('.movies')

    // Очищение предущего запроса
    document.querySelector('.movies').innerHTML = ''

    data.films.forEach((movie) => {
        const movieEl = document.createElement('div');
        const movieRating = chechMovieRating(movie.rating)
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
        <div class="movie_cover_inner">
            <img class="movie_cover" src="${movie.posterUrlPreview}" alt="${movie.nameRu}"/>
            <div class="movie_cover_darkened"></div>
        </div>
        <div class="movie_info">
            <div class="movie_title">${movie.nameRu}</div>
            <div class="movie_categories">${movie.genres.map(genre => ` ${genre.genre}`)}</div>
            <div class="movie_average movie_average_${getClassByRate(movieRating)}">${movieRating}</div>
        </div>
        `;
        moviesEl.appendChild(movieEl);
    });
}

const form = document.querySelector('form');
const search = document.querySelector('.header_search');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`
    if (search.value) {
        getMovies(apiSearchUrl);
        
        search.value ='';
    }
})