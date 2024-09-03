const { fetchEpisodeNames, fetchpopularShows, fetchGenreMovies } = require('./api');

const resolvers = {

  Query: {
    seasonInfo: async (_, {showId,seasonId}) => {

      try {
        const seasonInfo = await fetchEpisodeNames(showId,seasonId)

        return seasonInfo

      } catch (err) {
        console.log(err.message)
      }
    },

    popularShows: async (_, {page}) => {

      try {

        const popularShows = await fetchpopularShows(page)

        return popularShows

      } catch (err) {
        console.log(err.message)
      }
    },

    categoryMovies: async(_, {page,category}) => {

      try {

        const categoryMovies = await fetchGenreMovies(page,category)
        
        return categoryMovies

      } catch(err) {
        console.log(err.message)
      }
    }
  }

}

module.exports = resolvers