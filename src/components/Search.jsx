import { useRef } from "react";
import { Form, useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const query = useRef(null)
  
  const onInputHandler = ({ target: { value } }) => query.current = value;

  const onClickHandler = () => processSearch();   

  const submitHandler = e => {
    e.preventDefault();
    processSearch();
  }

  const processSearch = () =>  navigate(`./results?search=${query.current}`)

  return (
    <section className="max-w-7xl mx-auto py-3">
      <div className="flex">
        <Form className="flex flex-1" action="" onSubmit={submitHandler}>
          <input
            onChange={onInputHandler}
            type="search"
            name="search"
            id="search"
            autoComplete="search"
            className="w-full block flex-1 border border-amber-900 rounded-md bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Buscar película, serie de TV o persona..."
          />
        </Form>
        <button
          type="button"
          className="bg-gray-100 border border-amber-900 rounded-md px-6 text-amber-900 ms-4"
          onClick={onClickHandler}
        >
          Buscar
        </button>
      </div>
    </section>
  );
}
