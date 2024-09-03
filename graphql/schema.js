const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Season {
    episodes: [Episode!]!
  }

  type Episode {
    name: String
  }

  type PopularShows {
    page: Int
    results: [ShowData]
  }

  type ShowData {
    original_language: String
    id: ID
    name: String
    first_air_date: String
    vote_average: Float
    poster_path: String
  }

  type genreMovies {
    page: Int
    results: [MovieData]
  }

  type MovieData {
    id: ID	
    original_language: String
    backdrop_path: String
    release_date: String
    vote_average: Float
    poster_path: String
    title: String
  }


type Query {
  seasonInfo(showId: Int!, seasonId: ID!): Season
  popularShows(page: Int!) : PopularShows
  categoryMovies(page: Int!, category: String!): genreMovies  
}

`;

module.exports = typeDefs;
