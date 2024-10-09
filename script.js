const apiKey = 'a92382dc';

document.addEventListener('DOMContentLoaded', () => {
    showRecommendedMovies();
});

function searchMovie() {
    const query = document.getElementById('searchInput').value;
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.Search) {
                fetchMovieDetails(data.Search);
            } else {
                document.getElementById('movieResults').innerHTML = '<p>Ingen filmer funnet.</p>';
            }
        })
        .catch(error => console.error('Error:', error));
}

function fetchMovieDetails(movies) {
    const movieDetailsPromises = movies.map(movie => 
        fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`)
            .then(response => response.json())
    );

    Promise.all(movieDetailsPromises)
        .then(movieDetails => {
            movieDetails.sort((a, b) => a.Year - b.Year);
            displayMovies(movieDetails);
            showRecommendedMovies();
        })
        .catch(error => console.error('Error:', error));
}

function displayMovies(movies) {
    const movieResults = document.getElementById('movieResults');
    movieResults.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h2>${movie.Title}</h2>
            <p><strong>År:</strong> ${movie.Year}</p>
            <p><strong>Regissør:</strong> ${movie.Director}</p>
            <p><strong>Sjanger:</strong> ${movie.Genre}</p>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
        `;
        movieResults.appendChild(movieElement);
    });
}

function showRecommendedMovies() {
    const recommendedMovies = document.getElementById('recommendedMovies');
    recommendedMovies.innerHTML = '<h2 id=anbefalt>Anbefalte filmer</h2>';
    const popularMovies = ['The Shawshank Redemption', 'The Godfather', 'The Dark Knight', 'Pulp Fiction', 'Forrest Gump', 'Inception', 'Fight Club', 'The Matrix', 'Goodfellas', 'The Lord of the Rings: The Return of the King'];
    const recommendations = getRandomMovies(popularMovies, 3);

    recommendations.forEach(title => {
        fetch(`https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`)
            .then(response => response.json())
            .then(movie => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');
                movieElement.innerHTML = `
                    <img src="${movie.Poster}" alt="${movie.Title}">
                    <h2>${movie.Title}</h2>
                    <p><strong>År:</strong> ${movie.Year}</p>
                    <p><strong>Regissør:</strong> ${movie.Director}</p>
                    <p><strong>Sjanger:</strong> ${movie.Genre}</p>
                    <p><strong>Plot:</strong> ${movie.Plot}</p>
                `;
                recommendedMovies.appendChild(movieElement);
            })
            .catch(error => console.error('Error:', error));
    });
}

function getRandomMovies(movieList, num) {
    const shuffled = movieList.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}
