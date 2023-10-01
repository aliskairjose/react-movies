import { useEffect, useRef, useState } from "react";
import { Form, useLocation, useNavigate } from "react-router-dom";
import { searchMovie } from "../providers/search";

export default function Search() {
  const navigate = useNavigate();
  const query = useRef(null)
  const [search, setSearch] = useState(null);

  useEffect(() => {
    if (!search) { return;}
    const fecthData = async () => {
      const res = await searchMovie(search);
      console.log(res.results[0]);
    };

    fecthData().catch(console.errror);
  }, [search]);
  
  const onInputHandler = ({ target: { value } }) => query.current = value;

  const onClickHandler = () => processSearch();   

  const submitHandler = e => {
    e.preventDefault();
    processSearch();
  }

  const processSearch = () => {
    navigate(`./results?search=${query.current}`)
    setSearch(query.current)
  }

  return (
    <header className="py-6">
      <div className="flex px-4">
        <Form className="flex flex-1" action="" onSubmit={submitHandler}>
          <input
            onChange={onInputHandler}
            type="text"
            name="search"
            id="search"
            autoComplete="search"
            className="w-full block flex-1 border rounded-xl bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Buscar película, serie de TV o persona..."
          />
        </Form>
        <button
          type="button"
          className="bg-amber-600 rounded-xl px-6 text-amber-900 ms-4"
          onClick={onClickHandler}
        >
          Buscar
        </button>
      </div>
    </header>
  );
}
