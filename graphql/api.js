// Export fetchEpisodeNames function
const fetchEpisodeNames = async (showId, season_number) => {

  try {
  const response = await fetch(`https://api.themoviedb.org/3/tv/${showId}/season/${season_number}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_KEY}`,
    },
  });

  const data = await response.json();

  return data;

} catch (err) {
  console.log(err.message)
}
};


const fetchpopularShows = async(page) => {

  try {

    const response= await fetch(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`, {
        headers : {
          accept : "application/json",
          Authorization : `Bearer ${process.env.TMDB_KEY}`
        }
      })

      const data = await response.json()

      return data

  } catch (err) {
    console.log(err.message)
  }

}

const fetchGenreMovies = async(page,category) => {

  try {

    const response= await fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`, {
        headers : { 
          accept : "application/json",
          Authorization : `Bearer ${process.env.TMDB_KEY}`
        }
      })

      const data = await response.json()

      return data

  } catch (err) {
    console.log(err.message)
  }

}




module.exports = { fetchEpisodeNames,fetchpopularShows,fetchGenreMovies } 
