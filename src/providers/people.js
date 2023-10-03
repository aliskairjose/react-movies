import axios from 'axios'

export const detail = async(id) => {
    return axios.get(`person/${id}?language=es-ES`)
    .then(res => res.data)
    .catch(console.error)
}