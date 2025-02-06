/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const MovieCard = ({ movie: { title, poster_path , release_date , original_language , vote_average} }) => {
    return (
        <>
            <div className="movie-card">
                <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie-image'} alt="Movie img" />
                <div className="mt-4">
                    <h3>{title}</h3>
                </div>
                <div className="content">
                    <div className="rating">
                            <img src="/Rating.svg" alt="no-image" />
                    </div>
                    <p className="text-white">{vote_average.toFixed(1) }</p>
                    <span>•</span>
                    <p className="lang">{original_language}</p>
                    <p className="year">
                        {
                            release_date ? release_date.split('-')[0] : 'N/A'
                        }
                    </p>
                    
                </div>
            </div>
            
        </>
    ) 
}

export default MovieCard