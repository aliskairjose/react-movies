import axios from 'axios'

const instance = axios.create({
  params:{
    language: "es-ES"
  }
});
/**
 * 
 * @param {string} slug all | movie | people | tv
 * @param {string} timeWindow day | week
 * @returns 
 */
export const trending = async (slug, timeWindow='day') => {
  return instance
    .get(`trending/${slug}/${timeWindow}`)
    .then((res) => res.data)
    .catch(console.error);
};

