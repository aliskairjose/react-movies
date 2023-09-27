import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;

// Valores globales predeterminados de axios
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;


//? Valores predeterminados de instancias personalizadas
/* const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Accept: "application/json",
    Authorization: AUTH_TOKEN,
  },
}); */

export const auth = async () => {
  return await axios.get("authentication")
    .then((res) => res.data)
    .catch(console.error);
};
