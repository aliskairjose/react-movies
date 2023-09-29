import "./App.css";
import { useEffect } from "react";
import { auth } from "./providers/auth";
import Layout from "./layout/Layout";
import { Outlet } from "react-router-dom";

function App() {
  useEffect(() => {
    const fetchData = async () => await auth();
    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}

export default App;
