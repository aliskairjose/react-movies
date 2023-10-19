import axios from 'axios'

/**
 * 
 * @param {number} id Id de la persona
 * @returns 
 */
export const detail = async(id) => {
    return axios.get(`person/${id}`)
    .then(res => res.data)
    .catch(console.error)
}

/**
 * 
 * @param {number} id id de la persona 
 * @returns 
 */
export const combinedCredits = async(id) => {
    return axios.get(`person/${id}/combined_credits?language=es-ES`)
    .then(res => res.data)
    .catch(console.error)
}
/**
 * 
 * @param {number} id id de la persona 
 * @returns 
 */
export const movieCredits = async(id) => {
    return axios.get(`person/${id}/movie_credits`)
    .then(res => res.data)
    .catch(console.error)
}