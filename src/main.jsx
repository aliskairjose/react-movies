import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import rutas from "./routes/rutas.jsx";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={rutas} />
  </React.StrictMode>
);
