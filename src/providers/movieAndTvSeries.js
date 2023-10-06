import axios from "axios";

/**
 *
 * @param {string} mediaType movie | tv
 * @param {*} id
 * @returns
 */
export const detail = async (mediaType, id) => {
  return await axios
    .get(`${mediaType}/${id}?language=es-ES`)
    .then((res) => res.data)
    .catch(console.error);
};

/**
 *
 * @param {string} mediaType movie | tv
 * @param {*} id id de pelicula o serie de tv
 * @returns
 */
export const credits = async (mediaType, id) => {
  return await axios
    .get(`${mediaType}/${id}/credits`)
    .then((res) => res.data)
    .catch(console.error);
};
/**
 *
 * @param {string} mediaType movie | tv
 * @param {*} id id de pelicula o serie de tv
 * @returns
 */
export const keywords = async (mediaType, id) => {
  return await axios
    .get(`${mediaType}/${id}/keywords`)
    .then((res) => res.data)
    .catch(console.error);
};

/**
 *
 * @param {string} mediaType movie | tv
 * @param {*} id id de pelicula o serie de tv
 * @returns
 */
export const watchProviders = async (mediaType, id) => {
  return await axios
    .get(`${mediaType}/${id}/watch/providers`)
    .then((res) => res.data)
    .catch(console.error);
};

/**
 *
 * @param {string} mediaType movie | tv
 * @param {*} id id de pelicula o serie de tv
 * @returns
 */
export const externalIds = async (mediaType, id) => {
  return await axios
    .get(`${mediaType}/${id}/external_ids`)
    .then((res) => res.data)
    .catch(console.error);
};
/**
 *
 * @param {string} mediaType movie | tv
 * @param {*} id id de pelicula o serie de tv
 * @returns
 */
export const recommendations = async (mediaType, id) => {
  return await axios
    .get(`${mediaType}/${id}/recommendations`)
    .then((res) => res.data)
    .catch(console.error);
};
