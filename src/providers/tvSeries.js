import axios from "axios";

/**
 * 
 * @param {number} movieID Id de la pelicula
 * @returns 
 */
export const movieDetail = async (movieID) => {
  return await axios
    .get(`tv/${movieID}`)
    .then((res) => res.data)
    .catch(console.error);
};

