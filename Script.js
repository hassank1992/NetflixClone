window.onload = () => {
 
get_Original(); 
get_Trending();
get_TopMovies();
};
function get_Original(){
 var url='https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213'; 
fetch_Movies(url,".original__Movies","poster_path");
}
function get_Trending(){
  var url='https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'; 
 fetch_Movies(url,"#trend","backdrop_path");
 }
 function get_TopMovies(){
  var url='https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'; 
 fetch_Movies(url,"#top","backdrop_path");
 }
function fetch_Movies(url,element_Selector,poster_path){
  
    fetch(url).then((response)=>{
      if(response.ok)
        {
          return response.json();
        }
      else{
          throw new Error(response.statusText);
    }}).then((data)=>{
    // console.log(data);
      
      show_Movies(data,element_Selector,poster_path);
    }).catch((error)=>{
    console.log(error);
    })
  
}
function show_Movies(movies,element_Selector,poster_path) {
  
  var moviesEl = document.querySelector(element_Selector);

  for (var movie of movies.results) {
    var image=`<img src="https://image.tmdb.org/t/p/original/${movie[poster_path]} "/>`;

    moviesEl.innerHTML +=image;
    }
    console.log(moviesEl);
}