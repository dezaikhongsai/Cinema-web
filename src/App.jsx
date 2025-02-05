import { useState , useEffect } from "react";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";
const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const API_KEY = import.meta.env.VITE_TDMB_API_KEY

const API_OPTIONS = {
   method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzY2NjZWM4OTI4YjdkYjE0ZjMxNDQ0OTc5OTliYTQ5NCIsIm5iZiI6MTczODU3MDQ5MS45MjIsInN1YiI6IjY3YTA3YWZiN2ViYjA2MTRmZjI2NmE3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VxR-jexPK7OAZ3-BYaZAyKt_iPk9QohSo8wwQGKGwhI'
  }
}

function App() {  
  let [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const endpoint = `${API_BASE_URL}`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      if (data.response === 'False') {
        setErrorMessage(data.Error)
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
      console.log(data);
    }
    catch (error) {
      console.error('Erro while fetching data ' + error);
      setErrorMessage('fetching movies failed, please try it latter');
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchMovies();
  }, []); 
  return (
    <main>
      <div className="pattern"></div>
      <div className="wrapper">
        <header>
          <img src="./hero-img.svg" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You&apos;ll Enjoy Without the Hassle</h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <section className="all-movies">
          <h2>All movies</h2>
          {isLoading ? (
            <p className="text-white">Loading...</p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie = {movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
export default App;
