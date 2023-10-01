import { useParams } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import { detail } from "../providers/api";

const urlImg = import.meta.env.VITE_IMG_URL_MEDIUM;
const backdrop = import.meta.env.VITE_BACKDROP;

export default function Detail() {
  const { mediaType, id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await detail(mediaType, id);
      console.log(res);
      setData(res);
    };

    fetchData().catch(console.error);
  }, []);

  const backdropImg = () => `${urlImg}${data?.backdrop_path}`;

  const getYear = () => {
    const date = new Date(data?.release_date);
    return date.getFullYear();
  };

  return (
    <>
      <Header />
      <div
        style={{
          backgroundImage: `url(${backdropImg()})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <section className="flex p-8 max-w-[1280px] mx-auto">
          <div className="w-1/4">
            <img
              className="rounded-md m-auto"
              src={`${urlImg}${data?.poster_path}`}
              alt={data?.original_title}
            />
          </div>
          <div className="w-3/4 p-8 text-white">
            <h1 className="text-4xl font-bold tracking-wider ">
              {data?.title}
              <span className="font-light text-3xl">({getYear()})</span>
            </h1>
            <p className="italic py-3 opacity-70 text-xl">{data?.tagline}</p>
            <p className="font-medium text-xl">
              Resumen
              <span className="font-normal block text-base">{data?.overview}</span>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
