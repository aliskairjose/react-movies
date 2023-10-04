import { useEffect, useRef, useState } from "react";
import { searchCollection, searchCompany, searchKeyword, searchMovie, searchPerson, searchTV } from "../providers/search";
import { useLocation, useSearchParams } from "react-router-dom";

export default function Result() {
  // let [searchParams, setSearchParams] = useSearchParams()
  const search = useRef('');
  const location = useLocation()
  search.current = location.search.split('=')[1]
  const [movies, setMovies] = useState({})
  const [series, setSeries] = useState({})
  const [person, setPerson] = useState({})
  const [keyword, setKeyword] = useState({})
  const [company, setCompany] = useState({})
  const [collection, setCollection] = useState({})
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
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <div className="flex gap-5 max-w-7xl mx-auto">
        <aside className="w-[320px] h-[400px] border border-amber-600 rounded-lg m-0 p-0">
          <div className="p-4 h-24 bg-amber-600 border rounded-t-lg text-lg text-white font-semibold">
            {"Resultados de la búsqueda"}
          </div>
        </aside>
        <main className="w-full border border-amber-600 rounded">Main</main>
      </div>
    </>
  );
}
