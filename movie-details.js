const apiKey = "3262bec9"; // Replace with your OMDB API Key
const movieDetailsContainer = document.getElementById("movieDetails");

// Get Movie ID from URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

async function fetchMovieDetails() {
    if (!movieId) {
        movieDetailsContainer.innerHTML = "<p>Movie not found.</p>";
        return;
    }

    const response = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`);
    const movie = await response.json();

    if (movie.Response === "True") {
        displayMovieDetails(movie);
    } else {
        movieDetailsContainer.innerHTML = "<p>Movie details not available.</p>";
    }
}

function displayMovieDetails(movie) {
    movieDetailsContainer.innerHTML = `
        <div class="movie-card details">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <div class="movie-info">
                <h2>${movie.Title} (${movie.Year})</h2>
                <p><strong>Genre:</strong> ${movie.Genre}</p>
                <p><strong>Director:</strong> ${movie.Director}</p>
                <p><strong>Actors:</strong> ${movie.Actors}</p>
                <p><strong>IMDb Rating:</strong> ⭐ ${movie.imdbRating}</p>
                <p><strong>Plot:</strong> ${movie.Plot}</p>
                <button class="trailer-btn" onclick="fetchTrailer('${movie.Title}')">🎥 Watch Trailer</button>
            </div>
        </div>
    `;
}

// Back Button Function
function goBack() {
    window.history.back();
}

// Call the function when page loads
fetchMovieDetails();

// Open movie details page
function viewMovieDetails(id) {
    window.location.href = `movie-details.html?id=${id}`;
}

// Function to fetch movie ratings
async function fetchMovieRatings(title) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`);
    const data = await response.json();

    if (data.Response === "True") {
      displayRatings(data);
    } else {
      console.log('Movie not found:', data.Error);
    }
  } catch (error) {
    console.error('Error fetching movie ratings:', error);
  }
}

// Function to display ratings on the movie details page
function displayRatings(data) {
  const ratingsContainer = document.getElementById('ratings');

  ratingsContainer.innerHTML = `
    <h3>🎯 IMDb Ratings & Reviews</h3>
    <p><span>IMDb Rating:</span> ${data.imdbRating}/10</p>
    <p><span>Metascore:</span> ${data.Metascore}</p>
    <p><span>Rotten Tomatoes:</span> ${getRottenTomatoesRating(data.Ratings)}</p>
  `;
}

// Extract Rotten Tomatoes rating from the ratings array
function getRottenTomatoesRating(ratings) {
  const rtRating = ratings.find(rating => rating.Source === "Rotten Tomatoes");
  return rtRating ? rtRating.Value : "N/A";
}

// Call this function dynamically with the movie title
fetchMovieRatings('Inception'); // Replace with dynamic movie title


document.querySelectorAll('.stars span').forEach(star => {
    star.addEventListener('click', function () {
      const rating = this.getAttribute('data-value');
      const movieId = 'yourMovieID'; // Replace with dynamic movie ID
      saveRating(movieId, rating);
      displayAverageRating(movieId);
    });
  });
  
  function saveRating(movieId, rating) {
    let ratings = JSON.parse(localStorage.getItem('movieRatings')) || {};
    if (!ratings[movieId]) ratings[movieId] = [];
    ratings[movieId].push(Number(rating));
    localStorage.setItem('movieRatings', JSON.stringify(ratings));
  }
  
  function displayAverageRating(movieId) {
    const ratings = JSON.parse(localStorage.getItem('movieRatings')) || {};
    if (ratings[movieId]) {
      const sum = ratings[movieId].reduce((a, b) => a + b, 0);
      const avg = (sum / ratings[movieId].length).toFixed(1);
      document.getElementById('averageRating').innerText = `Average Rating: ${avg}`;
    }
  }
  
  // Initialize on page load
  displayAverageRating('yourMovieID');
  