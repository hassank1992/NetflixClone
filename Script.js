window.onload = () => {

  get_Original();
  get_Trending();
  get_TopMovies();

  getGenre();
};
function get_Original() {
  var url = 'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213';
  fetch_Movies(url, ".original__Movies", "poster_path");
}
function get_Trending() {
  var url = 'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045';
  fetch_Movies(url, "#trend", "backdrop_path");
}
function get_TopMovies() {
  var url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1';
  fetch_Movies(url, "#top", "backdrop_path");
}











fetchMoviesBasedOnGenre = (id) => {
  var url = "https://api.themoviedb.org/3/discover/movie?";
  url += "api_key=19f84e11932abbc79e6d83f82d6d1045";
  url += `&with_genres=${id}`;

  return fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }
    else {
      throw new Error(response.statusText);
    }
  })

}


showMoviesBasedOnGenre = (genreName, movies) =>{
  var allMovies = document.querySelector('.movies');
  console.log(genreName);
  console.log(movies);
  var genreEl = document.createElement('div');
  genreEl.classList.add('movies__header');
  genreEl.innerHTML = `<h2>${genreName}</h2>`;
  var moviesEl = document.createElement('div');
  moviesEl.setAttribute('id', genreName);
  moviesEl.classList.add('movies__Container');
  // <div class="movies__header"><h2>Trendings Now</h2></div>
  //       <div class="movies__Container " id="trend">

  for (var movie of movies.results) {
    var imageEl = document.createElement('img');
    imageEl.setAttribute('data-id', movie.id);
    imageEl.src = `https://image.tmdb.org/t/p/original/${movie["backdrop_path"]}`;
    imageEl.addEventListener('click', (e) => {
      handleMovieSelection(e);
    })
    moviesEl.appendChild(imageEl);
  }
  allMovies.appendChild(genreEl);
  allMovies.appendChild(moviesEl);

}



 showMoviesGenre =(genres)=> {
  genres.genres.forEach(function (genre) {
    var movies = fetchMoviesBasedOnGenre(genre.id);
    movies.then((movie) => {


      showMoviesBasedOnGenre(genre.name, movie);
    }).catch((error) => {
      console.log(error);
    })

  })

}



 getGenre =()=> {
  var url = "https://api.themoviedb.org/3/genre/movie/list?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US";

  fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }
    else {
      throw new Error(response.statusText);
    }
  }).then((data) => {


    showMoviesGenre(data);
  }).catch((error) => {
    console.log(error);
  })

}




fetch_Movies = (url, element_Selector, poster_path)=> {

  fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }
    else {
      throw new Error(response.statusText);
    }
  }).then((data) => {
    // console.log(data);

    show_Movies(data, element_Selector, poster_path);
  }).catch((error) => {
    console.log(error);
  })

}
async function getMovieTrailer(id) {
  var url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`;
  return await fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }
    else {

      setTrailers("");
    }
  })
}

const setTrailers = (trailers) => {
  const iframe = document.getElementById("movieTrailer");
  const MovieNotFound = document.querySelector(".trailerNotFound");
  if (trailers.length > 0) {

    MovieNotFound.classList.add('d-none');
    iframe.classList.remove('d-none');
    iframe.src = `https://www.youtube.com/embed/${trailers[0].key}`
  }
  else {
    MovieNotFound.classList.remove('d-none');

    iframe.classList.add('d-none');
  }
}



const handleMovieSelection = (e) => {
  const id = e.target.getAttribute('data-id');
  getMovieTrailer(id).then((data) => {
    const results = data.results;

    const youtubeTrailers = results.filter((result) => {
      if (result.site == "YouTube" && result.type == "Trailer") {
        return true;
      }
      else {
        return false;
      }
    })
    setTrailers(youtubeTrailers);
    //  show_Movies(data,element_Selector,poster_path);
  });
  $('#trailerModal').modal('show');
}

show_Movies = (movies, element_Selector, poster_path) =>{

  var moviesEl = document.querySelector(element_Selector);

  for (var movie of movies.results) {
    var imageEl = document.createElement('img');
    imageEl.setAttribute('data-id', movie.id);
    imageEl.src = `https://image.tmdb.org/t/p/original/${movie[poster_path]}`;
    imageEl.addEventListener('click', (e) => {
      handleMovieSelection(e);
    })
    moviesEl.appendChild(imageEl);
  }

}
$("#trailerModal").on('hide.bs.modal', function () {
  $('#movieTrailer').attr('src', '');

});
//https://api.themoviedb.org/3/genre/movie/list?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US
//   https://api.themoviedb.org/3/discover/movie?api_key=19f84e11932abbc79e6d83f82d6d1045&with_genres=28
