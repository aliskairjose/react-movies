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
      <section className="mb-3 border border-amber-900 bg-transparent py-1">
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
      <div className="flex gap-5 max-w-7xl mx-auto">
        <aside className="min-w-[260px] w-[260px] min-h-[200px] border border-amber-600 rounded-lg m-0 p-0">
          <div className="p-5 h-24 bg-amber-600 border rounded-t-lg text-lg text-white font-semibold">
            {"Resultados de la búsqueda"}
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
        <main className="w-full border border-amber-600 rounded">Main</main>
      </div>
    </>
  );
}
