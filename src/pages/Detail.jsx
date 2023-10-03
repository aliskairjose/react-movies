import { useParams } from "react-router-dom";
import profileImg from "../assets/images/profile.png";
import { useEffect, useState } from "react";
import {
  credits,
  detail,
  keywords,
  watchProviders,
} from "../providers/movieAndTvSeries";
import "../assets/styles/Detail.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Link } from "react-router-dom";

const urlImg = import.meta.env.VITE_IMAGE_BASE_URL;

export default function Detail() {
  const { mediaType, id } = useParams();
  const [detalle, setDetalle] = useState(null);
  const [creditos, setCreditos] = useState(null);
  const [claves, setClaves] = useState(null);
  const [proveedor, setProveedor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [detailRes, creditsRes, keywordsRes, providersRes] =
        await Promise.allSettled([
          detail(mediaType, id),
          credits(mediaType, id),
          keywords(mediaType, id),
          watchProviders(mediaType, id),
        ]);
      setDetalle(detailRes.value);
      setCreditos(creditsRes.value);
      setClaves(keywordsRes.value);
      setProveedor(providersRes.value);
    };

    fetchData().catch(console.error);
  }, []);

  const backdropImg = () => `${urlImg}/original/${detalle?.backdrop_path}`;

  const getYear = () => {
    const date = new Date(detalle?.release_date);
    return date.getFullYear();
  };

  // const getProviderLogo = () => proveedor?.results.VE?.flatrate[0].logo_path;

  const getLanguage = () => {
    return detalle?.spoken_languages.map((l) => {
      if (l.iso_639_1 === detalle.original_language) {
        return l.name;
      }
    });
  };

  const getProfileImage = (c) =>
    c?.profile_path ? `${urlImg}original/${c?.profile_path}` : profileImg;

  return (
    <> 
      <div
        className="bg-black h-[calc(100vh-180px)] relative fondo"
        style={{
          backgroundImage: `url(${backdropImg()})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="flex max-w-7xl m-auto absolute top-[12%] left-[10%]">
        <div className="w-1/4 p-2">
          <img
            className="rounded-md"
            src={`${urlImg}original/${detalle?.poster_path}`}
            alt={detalle?.original_title}
          />
        </div>
        <div className="w-3/4 pt-4 px-4 text-white">
          <h1 className="text-4xl font-bold tracking-wider ">
            {detalle?.title}
            <span className="font-light text-3xl">({getYear()})</span>
            {/* <img
              src={`${urlImg}w45/${getProviderLogo()}`}
              alt="providerLogo"
              className="inline ms-3 rounded"
            /> */}
          </h1>
          <p>
            {detalle?.release_date}{" "}
            <span className="uppercase font-thin">
              ({detalle?.original_language})
            </span>
            {detalle?.genres.map((g, i) => (
              <span key={i} className="px-1 before:content-['_●']">
                {g.name}
              </span>
            ))}
          </p>
          <div className="flex gap-3 items-center mt-4">
            <div className="w-16 inline-block">
              <CircularProgressbar
                value={Math.round(detalle?.vote_average * 10)}
                background
                backgroundPadding={5}
                strokeWidth={6}
                minValue={0}
                maxValue={100}
                text={`${Math.round(detalle?.vote_average * 10)}%`}
                styles={buildStyles({
                  pathColor: `#92400e`,
                  textSize: "27px",
                  textColor: "black",
                  backgroundColor: "#E1E3E5",
                })}
              />
            </div>
            <span>Puntuación de usuario</span>
          </div>
          <p className="italic py-3 opacity-70">{detalle?.tagline}</p>
          <p className="font-medium text-xl">
            Resumen
            <span className="font-normal block text-sm">
              {detalle?.overview}
            </span>
          </p>
          <div className="grid gap-2 grid-cols-3 w-full mt-4">
            {creditos?.crew
              .map((c, i) => (
                <p key={i} className="text-center text-sm">
                  <span className="font-medium block">{c.name}</span>
                  <span className="font-thin">{c.job}</span>
                </p>
              ))
              .slice(0, 6)}
          </div>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto py-6 ">
        <div className="w-9/12 py-7">
          <section className="border-b pb-4 ">
            <p className="font-medium text-xl">Actores principales</p>
            <div className="gap-3 py-2 overflow-x-auto trending-display ">
              {creditos?.cast.map((c, i) => (
                <div key={i} className="border rounded w-[138px]">
                  <Link to={`../person/${c?.id}`}>
                  <img
                    src={getProfileImage(c)}
                    alt={c?.name}
                    className="rounded-t h-[175px] w-[138px]"
                  />
                  </Link>
                  <div className="m-2">
                    <p className="m-0 p-0 font-medium">{c?.name}</p>
                    <p className="m-0 p-0 font-light">{c?.character}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to={"./cast"}>
            <h4 className="font-medium mt-4">Reparto y equipo completo</h4>
              </Link>
          </section>

          <section className="py-7 border-b h-40"></section>
        </div>
        <div className="w-full py-7 px-4">
          <p className="font-medium">Estado</p>
          <p className="mb-4">{detalle?.status}</p>
          <p className="font-medium">Idioma original</p>
          <p className="mb-4">{getLanguage()}</p>
          <p className="font-medium">Palabras claves</p>
          <p className="mb-4 flex-wrap flex">
            {claves?.keywords.map((k, i) => (
              <span
                className=" border me-1 mb-1 px-3 py-1 rounded-md bg-amber-900 text-amber-400 font-thin shadow"
                key={i}
              >
                {k.name}
              </span>
            ))}
          </p>
        </div>
      </div>
    </>
  );
}
