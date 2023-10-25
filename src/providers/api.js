import axios from "axios";
const accountId = import.meta.env.VITE_ACCOUNT_ID;

const instance = axios.create({
  params: {
    language: "es-ES",
  },
});
/**
 *
 * @param {string} slug all | movie | people | tv
 * @param {string} timeWindow day | week
 * @returns
 */
export const trending = async (slug, timeWindow = "day") => {
  return instance
    .get(`trending/${slug}/${timeWindow}`)
    .then((res) => res.data)
    .catch(console.error);
};

/**
 *
 * @param {string} slug now_playing | popular | upcoming | top_rated
 * @returns
 */
export const movies = async (slug) => {
  return await instance
    .get(`movie/${slug}`)
    .then((res) => res.data)
    .catch(console.error);
};

/**
 *
 * @param {string} slug airing_today | on_the_air | popular | top_rated
 * @returns
 */
export const tvSeries = async (slug) => {
  return await axios
    .get(`tv/${slug}`)
    .then((res) => res.data)
    .catch(console.error);
};

/**
 *
 * @param {string} mediaType movie | tv
 * @param {*} id
 * @returns
 */
export const movieAndTvSeriesDetail = async (mediaType, id) => {
  return await axios
    .get(`${mediaType}/${id}`, {params:{
      append_to_response: 'external_ids,credits,keywords,recommendations,watch/providers,videos'
    }})
    .then((res) => res.data)
    .catch(console.error);
};

/**
 * 
 * @param {number} id Id de la persona
 * @returns 
 */
export const person = async(id) => {
  return axios.get(`person/${id}`, {
    params:{
      append_to_response:'movie_credits,tv_credits'
    }
  })
  .then(res => res.data)
  .catch(console.error)
}