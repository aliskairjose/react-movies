import axios from "axios";

const instance = axios.create({
  params: {
    language: "es-ES",
    page: 1
  },
});

export const searchCollection = async (query,page) => {
  return await instance
    .get("search/collection", { params: { query, page } })
    .then((res) => res.data)
    .catch(console.error);
};

export const searchCompany = async (query, page) => {
  return await axios
    .get("search/company", { params: { query, page } })
    .then((res) => res.data)
    .catch(console.error);
};

export const searchKeyword = async (query, page) => {
  return await axios
    .get("search/keyword", { params: { query, page } })
    .then((res) => res.data)
    .catch(console.error);
};

export const searchMovie = async (query, page) => {
  return await instance
    .get("search/keyword", { params: { query, page } })
    .then((res) => res.data)
    .catch(console.error);
};
export const searchMulti = async (query, page) => {
  return await instance
    .get("search/multi", { params: { query, page } })
    .then((res) => res.data)
    .catch(console.error);
};
export const searchPerson = async (query, page) => {
  return await instance
    .get("search/person", { params: { query, page } })
    .then((res) => res.data)
    .catch(console.error);
};

export const searchTV = async (query, page) => {
  return await instance
    .get("search/tv", { params: { query, page } })
    .then((res) => res.data)
    .catch(console.error);
};
