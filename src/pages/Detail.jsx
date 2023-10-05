import { useParams } from "react-router-dom";
import noPoster from "../assets/images/no-poster.jpeg";
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
import PersonCard from "../components/cards/PersonCard";
import { LinkIcon } from "@heroicons/react/20/solid";

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

  return (
    <>
      <div
        className="bg-black h-[500px] relative fondo"
        style={{
          backgroundImage: `url(${backdropImg()})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex max-w-7xl m-auto absolute top-4 left-[5%]">
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
              <span className="font-light text-3xl ms-2">({getYear()})</span>
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
      </div>
      <div className="flex max-w-7xl mx-auto py-2 ">
        <div className="w-9/12 py-7">
          <section className="border-b pb-4 my-4">
            <p className="font-medium text-xl">Actores principales</p>
            <div className="gap-3 py-2 overflow-x-auto trending-display ">
              {creditos?.cast
                .map((c, i) => <PersonCard person={c} key={i} />)
                .slice(0, 9)}
              <div className="flex items-center me-12 ms-2">
                <Link className="font-medium" to={"./credits"}>
                  Ver más →
                </Link>
              </div>
            </div>
            <Link to={"./cast"}>
              <h4 className="font-medium mt-4">Reparto y equipo completo</h4>
            </Link>
          </section>

          <section className="border-b pb-4 mt-6">
            <p className="font-medium text-xl">Productoras</p>
            <div className="gap-3 py-2 overflow-x-auto trending-display ">
              {detalle?.production_companies.map((c, i) => (
                <div className="rounded-md w-[130px]" key={i}>
                  <img
                    src={
                      c.logo_path ? `${urlImg}w300/${c.logo_path}` : noPoster
                    }
                    alt={c?.name}
                    className="rounded-md h-[154px] w-full object-contain"
                  />
                  <p className="text-sm font-medium">{c?.name}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="w-full py-7 px-4">
          <div className="mb-5">
            <Link
              to={detalle?.homepage}
              style={{ visibility: detalle?.homepage ? "visible" : "hidden" }}
            >
              <LinkIcon className="h-6" />
            </Link>
          </div>
          <p className="font-medium">Estado</p>
          <p className="mb-4">{detalle?.status}</p>
          <p className="font-medium">Idioma original</p>
          <p className="mb-4">{getLanguage()}</p>
          <p className="font-medium">Palabras claves</p>
          <p className="mb-4 flex-wrap flex">
            {claves?.keywords
              ? claves?.keywords.map((k, i) => (
                  <span
                    className=" border me-1 mb-1 px-3 py-1 rounded-md bg-amber-900 text-amber-400 font-thin shadow"
                    key={i}
                  >
                    {k.name}
                  </span>
                ))
              : claves?.results.map((k, i) => (
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
