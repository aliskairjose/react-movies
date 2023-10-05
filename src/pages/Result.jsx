import { useEffect, useRef, useState } from "react";
import {
  searchCollection,
  searchCompany,
  searchKeyword,
  searchMovie,
  searchPerson,
  searchTV,
} from "../providers/search";
import { Form, useLocation, useSearchParams } from "react-router-dom";
const urlImg = import.meta.env.VITE_IMAGE_BASE_URL;

export default function Result() {
  let [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef(null);
  const search = useRef("");
  const location = useLocation();
  search.current = location.search.split("=")[1];
  const [movies, setMovies] = useState({});
  const [series, setSeries] = useState({});
  const [person, setPerson] = useState({});
  const [keyword, setKeyword] = useState({});
  const [company, setCompany] = useState({});
  const [collection, setCollection] = useState({});
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const [
        movieRes,
        serieRes,
        personRes,
        keywordRes,
        companyRes,
        collectionRes,
      ] = await Promise.allSettled([
        searchMovie(search.current, 1),
        searchTV(search.current, 1),
        searchPerson(search.current, 1),
        searchKeyword(search.current, 1),
        searchCompany(search.current, 1),
        searchCollection(search.current, 1),
      ]);
      setMovies(movieRes.value);
      setSeries(serieRes.value);
      setPerson(personRes.value);
      setCollection(collectionRes.value);
      setKeyword(keywordRes.value);
      setCompany(companyRes.value);
    };

    fetchData().catch(console.error);
  }, [searchParams]);

  const submitHandler = (e) => {
    e.preventDefault();
    setSearchParams(`search=${inputRef.current.value}`);
  };

  const isSelected = (i) => setIndex(i);

  return (
    <>
      <section className="mb-8 border border-amber-900 bg-transparent py-1">
        <div className="flex max-w-7xl mx-auto">
          <Form className="flex flex-1" action="" onSubmit={submitHandler}>
            <input
              ref={inputRef}
              type="search"
              name="search"
              id="search"
              autoComplete="search"
              className="w-full block flex-1 py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Buscar película, serie de TV o persona..."
            />
          </Form>
        </div>
      </section>
      <section className="flex gap-5 max-w-7xl mx-auto">
        <aside className="min-w-[260px] w-[260px] h-fit border border-amber-900 rounded-lg m-0 p-0">
          <div className="p-5 h-24 bg-amber-900 border rounded-t-lg text-lg text-white font-semibold">
            {"Resultados de la búsqueda"} {index}
          </div>
          <div className="mt-2">
            <ul>
              <li
                className="flex justify-between px-4 py-3 hover:bg-gray-200 cursor-pointer"
                onClick={() => isSelected(0)}
                style={{ backgroundColor: index === 0 ? "#e5e7eb" : "" }}
              >
                <p>Peliculas</p>
                <p className="border rounded-lg bg-gray-100 px-2 font-thin text-sm">
                  {movies?.total_results}
                </p>
              </li>
              <li
                className="flex justify-between px-4 py-3 hover:bg-gray-200 cursor-pointer"
                onClick={() => isSelected(1)}
                style={{ backgroundColor: index === 1 ? "#e5e7eb" : "" }}
              >
                <p>Series de TV </p>
                <p className="border rounded-lg bg-gray-100 px-2 font-thin text-sm">
                  {series?.total_results}
                </p>
              </li>
              <li
                className="flex justify-between px-4 py-3 hover:bg-gray-200 cursor-pointer"
                onClick={() => isSelected(2)}
                style={{ backgroundColor: index === 2 ? "#e5e7eb" : "" }}
              >
                <p>Personas</p>
                <p className="border rounded-lg bg-gray-100 px-2 font-thin text-sm">
                  {person?.total_results}
                </p>
              </li>
              <li
                className="flex justify-between px-4 py-3 hover:bg-gray-200 cursor-pointer"
                onClick={() => isSelected(3)}
                style={{ backgroundColor: index === 3 ? "#e5e7eb" : "" }}
              >
                <p>Colecciones</p>
                <p className="border rounded-lg bg-gray-100 px-2 font-thin text-sm">
                  {collection?.total_results}
                </p>
              </li>
              <li
                className="flex justify-between px-4 py-3 hover:bg-gray-200 cursor-pointer"
                onClick={() => isSelected(4)}
                style={{ backgroundColor: index === 4 ? "#e5e7eb" : "" }}
              >
                <p>Palabras clave</p>
                <p className="border rounded-lg bg-gray-100 px-2 font-thin text-sm">
                  {keyword?.total_results}
                </p>
              </li>
              <li
                className="flex justify-between px-4 py-3 hover:bg-gray-200 cursor-pointer"
                onClick={() => isSelected(5)}
                style={{ backgroundColor: index === 5 ? "#e5e7eb" : "" }}
              >
                <p>Compañías</p>
                <p className="border rounded-lg bg-gray-100 px-2 font-thin text-sm">
                  {company?.total_results}
                </p>
              </li>
            </ul>
          </div>
        </aside>
        <main className="min-w-[1000px] w-[1000px]rounded">
          <section
            className="px-4"
            style={{ display: index === 0 ? "block" : "none" }}
          >
            {movies?.results?.map((m, i) => (
              <div key={i} className="flex w-full border rounded-md mb-4">
                <img
                  src={`${urlImg}w92${m?.poster_path}`}
                  alt={m?.title}
                  className="rounded-l-lg h-[142px] w-[94px]"
                />
                <div className="px-4 flex flex-col justify-around">
                  <div>
                    <p className="font-medium text-lg">{m?.title}</p>
                    <p className="text-gray-400">{m?.release_date}</p>
                  </div>
                  <p className="line-clamp-2 text-sm">{m?.overview}</p>
                </div>
              </div>
            ))}
          </section>
          <section
            className="px-4"
            style={{ display: index === 1 ? "block" : "none" }}
          >
            {series?.results?.map((m, i) => (
              <div key={i} className="flex w-full border rounded-md mb-4">
                <img
                  src={`${urlImg}w92${m?.poster_path}`}
                  alt={m?.title}
                  className="rounded-l-lg h-[142px] w-[94px]"
                />
                <div className="px-4 flex flex-col justify-around">
                  <div>
                    <p className="font-medium text-lg">{m?.name}</p>
                    <p className="text-gray-400">{m?.first_air_date}</p>
                  </div>
                  <p className="line-clamp-2 text-sm">{m?.overview}</p>
                </div>
              </div>
            ))}
          </section>
          <section
            className="px-4"
            style={{ display: index === 3 ? "block" : "none" }}
          >
            {collection?.results?.map((m, i) => (
              <div key={i} className="flex w-full border rounded-md mb-4">
                <img
                  src={`${urlImg}w92${m?.poster_path}`}
                  alt={m?.title}
                  className="rounded-l-lg h-[142px] w-[94px]"
                />
                <div className="px-4 flex flex-col justify-around">
                  <div>
                    <p className="font-medium text-lg">{m?.name}</p>
                  </div>
                  <p className="line-clamp-2 text-sm">{m?.overview}</p>
                </div>
              </div>
            ))}
          </section>
        </main>
      </section>
    </>
  );
}
