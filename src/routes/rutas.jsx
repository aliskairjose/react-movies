import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";

const rutas = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/movies" element={<App />} />
      {/* 
      <Route exact path="/recipes/detail/:id" element={<RecipeDetail />} />
      <Route exact path="*" element={<ErrorPage />}></Route> */}
    </>
  )
);

export default rutas;
