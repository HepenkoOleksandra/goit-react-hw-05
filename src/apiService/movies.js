import axios from 'axios';

// const MOVIES_KEY = '8b2ca6d9e92ec2687ace5b9f21f5f314';
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjJjYTZkOWU5MmVjMjY4N2FjZTViOWYyMWY1ZjMxNCIsInN1YiI6IjY2MWI3ZWE5OWE2NDM1MDE2M2UwMWQwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KsX29MA1Kkpp8xOr9ms9pXohKDwpCZxdnsv58Q6J5rs",
  },
    params: {
    language: 'en-US',
  }
});


export const getTrendingMovies = async () => {
    const {data} = await instance.get("/trending/movie/day")
console.log(data.results);
  return data.results;
};

// export const getSearchMovie = async (query) => {
//     const {data} = await instance.get("/search/movie", {
//     params: {
//     query,
//     page: 1,
//     }
//   })
// console.log(data.results);
//   return data.results;
// };

// export const getMovieDetails = async (movieId) => {
//     const {data} = await instance.get(`/movie/${movieId}`);
// console.log(data);
//   return data;
// };

// export const getMovieCredits = async (movieId) => {
//     const {data} = await instance.get(`/movie/${movieId}/credits`);
// console.log(data);
//   return data;
// };

// export const getMovieReviews = async () => {
//     const {data} = await instance.get(`/movie/${1011985}/reviews`);
// console.log(data.results);
//   return data.results;
// };

