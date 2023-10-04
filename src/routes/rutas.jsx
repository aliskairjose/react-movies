import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Result from "../pages/Result";
import Person from '../pages/Person';
import CRedits from "../pages/Credits";

const rutas = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/movies" element={<App />}>
        <Route exact path="/movies" element={<Home />} />
        <Route exact path="/movies/results" element={<Result />} />
        <Route exact path="/movies/detail/:mediaType/:id" element={<Detail />} />
        <Route exact path="/movies/detail/:mediaType/:id/credits" element={<CRedits />} />
        <Route exact path="/movies/person/:id" element={<Person />} />
      </Route>
      {/* 
      <Route exact path="*" element={<ErrorPage />}></Route> */}
    </>
  )
);

export default rutas;
