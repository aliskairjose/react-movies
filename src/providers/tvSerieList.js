import axios from "axios";

export const airingToday = async () => {
  return await axios
    .get("tv/airing_today")
    .then((res) => res.data)
    .catch(console.error);
};
export const onTheAir = async () => {
  return await axios
    .get("tv/on_the_air")
    .then((res) => res.data)
    .catch(console.error);
};
export const popular = async () => {
  return await axios
    .get("tv/popular")
    .then((res) => res.data)
    .catch(console.error);
};

export const topRated = async () => {
  return await axios
    .get("tv/top_rated")
    .then((res) => res.data)
    .catch(console.error);
};
