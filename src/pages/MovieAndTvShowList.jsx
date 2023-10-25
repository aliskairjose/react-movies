import { useEffect, useState } from "react";
import { movies, tvSeries } from "../providers/api";
import { useParams } from "react-router-dom";
import CardSmall from "../components/cards/CardSmall";

const TITLE = {
  movies: {
    popular: "Películas populares",
    now_playing: "Películas en cartelera",
    upcoming: "Próximas películas",
    top_rated: "Películas mejor calificadas",
  },
};

export default function MovieAndTvShowList() {
  const { slug, mediaType } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res =
        mediaType === "tv" ? await tvSeries(slug) : await movies(slug);
      setData(res);
    };

    fetchData().catch(console.error);
  }, [mediaType, slug]);

  return (
    <>
      <div className="max-w-7xl mx-auto my-0 pt-8 pb-6">
        <h1 className="text-2xl font-medium p-0 m-0">{TITLE[mediaType][slug]}</h1>
      </div>
      <div className="flex max-w-7xl mx-auto divide-x">
        <div className="w-[250px]"></div>
        <div className="w-[1030px]">
          <div className="flex flex-wrap gap-3 px-3">
            {data?.results.map((t, i) => (
              <div key={i} className="border rounded-md shadow">
                <CardSmall data={t} mediaType="movie" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
