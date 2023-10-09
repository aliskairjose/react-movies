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
import Company from "../pages/Company";

const rutas = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/react-movies" element={<App />}>
        <Route exact path="/react-movies" element={<Home />} />
        <Route exact path="/react-movies/results" element={<Result />} />
        <Route exact path="/react-movies/detail/:mediaType/:id" element={<Detail />} />
        <Route exact path="/react-movies/detail/:mediaType/:id/credits" element={<CRedits />} />
        <Route exact path="/react-movies/person/:id" element={<Person />} />
        <Route exact path="/react-movies/company/:id/movie" element={<Company />} />
      </Route>
      {/* 
      <Route exact path="*" element={<ErrorPage />}></Route> */}
    </>
  )
);

export default rutas;
