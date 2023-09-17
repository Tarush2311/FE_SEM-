document.addEventListener('DOMContentLoaded', function () {
    const movieList = document.getElementById('movie-list');
    let currentPage = 1;

    function fetchPopularMovies(page) {
        const apiKey = '3fd2be6f0c70a2a598f084ddfb75487c';
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=${page}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayMovies(data.results);
                currentPage++;
                if (currentPage <= 20) {
                    fetchPopularMovies(currentPage);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function fetchSearchResults(query) {
        const apiKey = '3fd2be6f0c70a2a598f084ddfb75487c';
        const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayMovies(data.results))
            .catch(error => console.error('Error fetching search results:', error));
    }

    function displayMovies(movies) {
        if (movies.length === 0) {
            movieList.innerHTML = '<p>No movies found</p>';
            return;
        }

        movies.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.classList.add('movie-item');
            
            const movieImage = document.createElement('img');
            movieImage.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
            movieImage.alt = `${movie.title} Poster`;

            const movieTitle = document.createElement('h2');
            movieTitle.textContent = movie.title;

            const movieDescription = document.createElement('div');
            movieDescription.classList.add('movie-description');
            movieDescription.textContent = movie.overview;

            movieItem.appendChild(movieImage);
            movieItem.appendChild(movieTitle);
            movieItem.appendChild(movieDescription);

            movieList.appendChild(movieItem);
        });
    }

    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const searchQuery = searchInput.value.trim();
        if (searchQuery === '') {
            return;
        }

        movieList.innerHTML = '';
        fetchSearchResults(searchQuery);
    });

    const resetButton = document.getElementById('reset-button');

    resetButton.addEventListener('click', function () {
        movieList.innerHTML = '';
        currentPage = 1;
        fetchPopularMovies(currentPage);
    });

    fetchPopularMovies(currentPage);
});
