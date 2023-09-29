import { useEffect, useState } from "react";
import CardSmall from "./cards/CardSmall";
import { movies } from "../providers/api";

export default function Movies() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await movies('now_playing')
      setData(res);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <p className="ms-6 font-semibold tracking-wider text-2xl">Peliculas</p>
      <div className="gap-5 py-4 px-6 overflow-x-auto trending-display">
        {data?.results.map((t, i) => (
          <CardSmall data={t} key={i} />
        ))}
      </div>
    </>
  );
}
