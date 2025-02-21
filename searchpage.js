const apiKey = "3262bec9"; // Get from https://www.omdbapi.com/
const searchInput = document.getElementById("searchInput");
const moviesContainer = document.getElementById("moviesContainer");

async function searchMovies() {
    const query = searchInput.value.trim();
    if (!query) return;
    
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
    const data = await response.json();

    if (data.Search) {
        displayMovies(data.Search);
    } else {
        moviesContainer.innerHTML = "<p>No results found</p>";
    }
}

function displayMovies(movies) {
    moviesContainer.innerHTML = ""; 
    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
            <button class="view-details" onclick="viewDetails('${movie.imdbID}')">Details</button>
        `;
        moviesContainer.appendChild(movieCard);
    });
}

function viewDetails(id) {
    window.location.href = `movie-details.html?id=${id}`;
}

document.getElementById("searchButton").addEventListener("click", searchMovies);
searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchMovies();
    }
});

// scrpit for all time best movies
const API_KEY = '3262bec9';  // Replace with your OMDB API Key
const trendingContainer = document.querySelector('.trending-container');
const moviesTitle = document.querySelector('.movies-title');

// General movie keywords for popular/trending movies
const movieKeywords = ["Avengers", "Batman", "Inception", "Interstellar", "Joker", "Titanic", "Gladiator", "The Matrix", "John Wick", "Dune", "Mission Impossible", "Harry Potter",'action', 'drama', 'horror', 'comedy', 'thriller', 'sci-fi', 'romance', 'mystery'];

// Pick a random keyword on each refresh
const randomKeyword = movieKeywords[Math.floor(Math.random() * movieKeywords.length)];

async function fetchTrendingMovies() {
    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${randomKeyword}&type=movie&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Search) {
            moviesTitle.textContent = "🎞️ Cinematic Hits"; // Set new title dynamically
            trendingContainer.innerHTML = ''; // Clear previous content

            data.Search.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');

                movieCard.innerHTML = `
                    <img src="${movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
                    <h3>${movie.Title}</h3>
                    <p>Year: ${movie.Year}</p>
                    <button class="view-details" onclick="viewMovieDetails('${movie.imdbID}')">🎬 View Details</button>
                `;

                trendingContainer.appendChild(movieCard);
            });
        } else {
            moviesTitle.textContent = "No Movies Found";
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

// Function to View Movie Details
function viewMovieDetails(imdbID) {
    window.location.href = `movie-details.html?id=${imdbID}`;
}

// Fetch Movies on Page Load (with a random keyword)
fetchTrendingMovies();
