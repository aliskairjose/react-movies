import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Result from "../pages/Result";
import Cast from '../pages/Cast'

const rutas = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/movies" element={<App />}>
        <Route exact path="/movies" element={<Home />} />
        <Route exact path="/movies/results" element={<Result />} />
      </Route>
      <Route exact path="/movies/detail/:mediaType/:id" element={<Detail />} />
      <Route exact path="/movies/detail/:mediaType/:id/cast" element={<Cast />} />
      {/* 
      <Route exact path="*" element={<ErrorPage />}></Route> */}
    </>
  )
);

export default rutas;
