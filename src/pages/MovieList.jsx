import React, { useEffect, useState } from "react";
import { movies } from "../providers/api";
import { useParams } from "react-router-dom";
import CardSmall from "../components/cards/CardSmall";

export default function MoviList() {
  const { slug } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log(slug);
    const fetchData = async () => {
      const res = await movies(slug);
      setData(res);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <div className="flex px-10 pt-12">
      <div className="w-3/12 bg-cyan-300">
        <h1 className="text-2xl font-medium">Películas Populares</h1>
      </div>
      <div className="w-9/12">
        <div className="flex flex-wrap gap-3 px-6">
          {data?.results.map((t, i) => (
            <CardSmall data={t} key={i} mediaType="movie" />
          ))}
        </div>
      </div>
    </div>
  );
}
