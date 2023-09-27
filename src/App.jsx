import "./App.css";
import { useEffect } from "react";
import { auth } from "./providers/auth";
import Button from "@mui/material/Button";
// import { collectionList } from "./providers/search";
import { trending } from "./providers/trending";

function App() {
  useEffect(() => {
    const fetchData = async () => await auth();
    fetchData().catch(console.error);
  }, []);

  const fetchData = async () => {
    // const res = await collectionList();
    await trending("movie", "week");
  };

  return (
    <>
      <p>Movie Web</p>
      <Button variant="outlined" onClick={fetchData}>
        Fetch data
      </Button>
    </>
  );
}

export default App;
