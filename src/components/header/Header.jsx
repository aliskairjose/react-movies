import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState(null);

  const onClickHandler = () => navigate(`./results?search=${query}`);

  const onInputHandler = ({ target: { value } }) => setQuery(value);


  return (
    <header className="py-6">
      <div className="flex px-4">
        <Form className="flex flex-1" action="./results">
          <input
            onChange={onInputHandler}
            type="text"
            name="search"
            id="search"
            autoComplete="search"
            className="w-full block flex-1 border rounded-xl bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Buscar película, serie de TV o persona"
          />
        </Form>
        <button
          type="button"
          className="bg-amber-600 rounded-xl px-4 py-1 text-amber-300 ms-4"
          onClick={onClickHandler}
        >
          Buscar
        </button>
      </div>
    </header>
  );
}
