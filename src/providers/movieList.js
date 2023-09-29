import axios from "axios";

export const nowPlaying = async () => {
  return await axios
    .get("movie/now_playing")
    .then((res) => res.data)
    .catch(console.error);
};
export const popular = async () => {
  return await axios
    .get("movie/popular")
    .then((res) => res.data)
    .catch(console.error);
};
export const topRated = async () => {
  return await axios
    .get("movie/top_rated")
    .then((res) => res.data)
    .catch(console.error);
};

export const upcoming = async () => {
  return await axios
    .get("movie/upcoming")
    .then((res) => res.data)
    .catch(console.error);
};
