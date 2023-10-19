
import axios from "axios";
const accountId = import.meta.env.VITE_ACCOUNT_ID;

const instance = axios.create({});

export const favoriteList = async(mediaType) => {
    return instance.get(`account/${accountId}/favorite/${mediaType}`)
    .then(res => res.data)
    .catch(console.error)
}

/**
 * @description Lista de favoritos
 * @returns 
 */
export const addFavorite = async() => {
    return await instance.post(`account/${accountId}/favorite`)
  }
  
  /**
   * @description Lista de seguimiento
   * @returns 
   */
  export const addWatchList = async() => {
    return await instance.post(`account/${accountId}/watchlist`)
  }
  