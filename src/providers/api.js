import axios from "axios";

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
  return await axios
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

export const detail = async (mediaType, id) => {
  return await axios
    .get(`${mediaType}/${id}?language=es-ES`)
    .then((res) => res.data)
    .catch(console.error);
};
