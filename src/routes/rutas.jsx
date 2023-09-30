import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Detail from '../components/Detail';
import Result from "../components/Result";

const rutas = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/movies" element={<App />}>
        <Route exact path="/movies" element={<Home />} />
        <Route exact path="/movies/results" element={<Result />} />
        <Route exact path="/movies/detail/:mediaType/:id" element={<Detail />} />
      </Route>
      {/* 
      <Route exact path="*" element={<ErrorPage />}></Route> */}
    </>
  )
);

export default rutas;
