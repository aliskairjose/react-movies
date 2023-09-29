import { useEffect, useState } from "react";
import CardSmall from "./cards/CardSmall";
import { tvSeries } from "../providers/api";

export default function TvSeries() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await tvSeries('airing_today')
      setData(res);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <p className="ms-6 font-semibold tracking-wider text-2xl">Series de TV</p>
      <div className="gap-5 py-4 px-6 overflow-x-auto trending-display">
        {data?.results.map((t, i) => (
          <CardSmall data={t} key={i} />
        ))}
      </div>
    </>
  );
}
