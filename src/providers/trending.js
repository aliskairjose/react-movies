import axios from "axios";

const instance = axios.create({
  params:{
    language: "es-ES"
  }
});

/**
 * 
 * @param {string} type all | movie | people | tv
 * @param {string} timeWindow day | week
 * @returns 
 */
export const trending = async (type, timeWindow='day') => {
  return instance
    .get(`trending/${type}/${timeWindow}`)
    .then((res) => res.data)
    .catch(console.error);
};
/* 
export const trendingAll = async (timeWindow='day') => {
  return instance
    .get(`trending/all/${timeWindow}`)
    .then((res) => res.data)
    .catch(console.error);
};
export const trendingMovies = async () => {
  return instance
    .get('trending/movie')
    .then((res) => res.data)
    .catch(console.error);
};
export const trendingPeople = async () => {
  return instance
    .get('trending/people')
    .then((res) => res.data)
    .catch(console.error);
};
export const trendingTV = async () => {
  return instance
    .get('trending/tv')
    .then((res) => res.data)
    .catch(console.error);
}; */
