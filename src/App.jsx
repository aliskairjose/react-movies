import "./App.css";
import { useEffect } from "react";
import { auth } from "./providers/api";
function App() {
  useEffect(() => {
    const fetchData = async () => {
      const res = await auth();
      console.log(res);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <p>Movie Web</p>
    </>
  );
}

export default App;
