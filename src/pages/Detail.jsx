import { useParams } from "react-router-dom";
import noPoster from "../assets/images/no-poster.jpeg";
import { useEffect, useState } from "react";
import {
  credits,
  detail,
  externalIds,
  keywords,
  recommendations,
  watchProviders,
} from "../providers/movieAndTvSeries";
import "../assets/styles/Detail.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Link } from "react-router-dom";
import PersonCard from "../components/cards/PersonCard";
import { LinkIcon } from "@heroicons/react/20/solid";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const urlImg = import.meta.env.VITE_IMAGE_BASE_URL;

export default function Detail() {
  const { mediaType, id } = useParams();
  const [detalle, setDetalle] = useState(null);
  const [creditos, setCreditos] = useState(null);
  const [claves, setClaves] = useState(null);
  const [proveedor, setProveedor] = useState(null);
  const [externalID, setExternalID] = useState(null);
  const [recomendaciones, setRecomendaciones] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [
        detailRes,
        creditsRes,
        keywordsRes,
        providersRes,
        externalIDRes,
        recommendationsRes,
      ] = await Promise.allSettled([
        detail(mediaType, id),
        credits(mediaType, id),
        keywords(mediaType, id),
        watchProviders(mediaType, id),
        externalIds(mediaType, id),
        recommendations(mediaType, id),
      ]);
      setDetalle(detailRes.value);
      setCreditos(creditsRes.value);
      setClaves(keywordsRes.value);
      setProveedor(providersRes.value);
      setExternalID(externalIDRes.value);
      setExternalID(externalIDRes.value);
      setRecomendaciones(recommendationsRes.value);
    };

    fetchData().catch(console.error);
  }, []);

  const backdropImg = () => `${urlImg}/original/${detalle?.backdrop_path}`;

  const getYear = () => {
    const date = new Date(detalle?.release_date || detalle?.first_air_date);
    return date.getFullYear();
  };

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
          backgroundPosition: 300,
        }}
      >
        <div className="flex max-w-7xl m-auto absolute top-6 left-[7%]">
          <div className="">
            <img
              className="rounded-md w-[400px]"
              src={`${urlImg}original/${detalle?.poster_path}`}
              alt={detalle?.original_title}
            />
          </div>
          <div className="w-full pt-4 px-4 text-white">
            <h1 className="text-4xl font-bold tracking-wider ">
              {detalle?.title || detalle?.name}
              <span className="font-light text-3xl ms-2">({getYear()})</span>
            </h1>
            <p>
              {detalle?.release_date}
              <span className="uppercase font-thin ml-1">
                ({detalle?.original_language})
              </span>
              {detalle?.genres.map((g, i) => (
                <span key={i} className="px-1 after:content-['_,']">
                  {g.name}
                </span>
              ))}
            </p>
            <div className="flex gap-3 items-center mt-4">
              <ul>
                <li>
                  <div className="flex items-center gap-2">
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
                    <div>
                      <span>Puntuación de usuario</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <p className="italic py-3 opacity-70">{detalle?.tagline}</p>
            <p className="font-medium text-xl">
              Resumen
              <span className="font-normal block text-sm">
                {detalle?.overview}
              </span>
            </p>
            {mediaType === "tv" ? (
              <div className="grid gap-2 grid-cols-3 w-full mt-4">
                {creditos?.cast
                  .map((c, i) => (
                    <p key={i} className="text-center text-sm">
                      <span className="font-medium block">{c.name}</span>
                      <span className="font-thin">
                        {c.known_for_department}
                      </span>
                    </p>
                  ))
                  .slice(0, 6)}
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
      <div className="flex max-w-7xl mx-auto py-2 ">
        <div className="w-9/12 py-7">
          <section className="border-b pb-4 my-4">
            <p className="font-medium text-xl">Actores principales</p>
            <div className="gap-4 py-2 overflow-x-auto trending-display ">
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

          {/* PRODUCTORAS */}
          <section className="border-b pb-4 mt-6">
            <p className="font-medium text-xl">Productoras</p>
            <div className="gap-4 py-2 overflow-x-auto trending-display ">
              {detalle?.production_companies.map((c, i) => (
                <div className="rounded-md w-[130px] shadow" key={i}>
                  <img  
                    src={
                      c.logo_path ? `${urlImg}w300/${c.logo_path}` : noPoster
                    }
                    alt={c?.name}
                    className="rounded-md h-[120px] w-full object-contain px-1"
                  />
                  <p className="text-sm font-medium m-2">{c?.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* RECOMENDACIONES */}
          <section className="border-b pb-4 mt-6">
            <p className="font-medium text-xl">Recomendaciones</p>
            <div className="gap-4 py-2 overflow-x-auto trending-display ">
              {recomendaciones?.results.length > 0 ? (
                recomendaciones?.results.map((r, i) => (
                  <div key={i}>
                    <img
                      src={`${urlImg}/original${r?.backdrop_path}`}
                      alt={r?.name}
                      className="rounded-md w-[250px]"
                    />
                    <div className="flex justify-between mt-2 px-1">
                      <span className="text-sm">{r?.name}</span>
                      <span className="text-sm">{`${Math.round(
                        r?.vote_average * 10
                      )}%`}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm mt-3">
                  No tenemos suficiente información para recomendarte películas
                  basadas en {detalle?.title || detalle?.name}. Puedes ayudarnos valorando las
                  películas que has visto.
                </p>
              )}
            </div>
          </section>
        </div>
        <div className="w-3/12 py-7 px-4">
          <div className="mb-5">
            <ul className="inline-flex divide-x">
              {externalID?.instagram_id ? (
                <li className="px-2">
                  <Link
                    to={`https://instagram.com/${externalID?.instagram_id}`}
                  >
                    <BsInstagram className="h-[1.5rem] w-[1.5rem]" />
                  </Link>
                </li>
              ) : (
                <></>
              )}
              {externalID?.facebook_id ? (
                <li className="px-2">
                  <Link to={`https://facebook.com/${externalID?.facebook_id}`}>
                    <BsFacebook className="h-[1.5rem] w-[1.5rem]" />
                  </Link>
                </li>
              ) : (
                <></>
              )}
              {externalID?.twitter_id ? (
                <li className="px-2">
                  <Link to={`https://twitter.com/${externalID?.twitter_id}`}>
                    <BsTwitter className="h-[1.5rem] w-[1.5rem]" />
                  </Link>
                </li>
              ) : (
                <></>
              )}
              {detalle?.homepage ? (
                <li className="px-2">
                  <Link to={detalle?.homepage}>
                    <LinkIcon className="h-6" />
                  </Link>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>
          <p className="font-medium">Estado</p>
          <p className="mb-4">{detalle?.status}</p>

          {mediaType === "tv" ? (
            <>
              <p className="font-medium">Canal</p>
              <img
                className="h-12"
                src={`${urlImg}/w154${detalle?.networks[0]?.logo_path}`}
                alt={detalle?.networks[0]?.name}
              />
            </>
          ) : (
            <></>
          )}

          <p className="font-medium mt-4">Idioma original</p>
          <p className="mb-4">{getLanguage()}</p>

          <p className="font-medium">Palabras claves</p>
          <p className="mb-4 flex-wrap flex">
            {claves?.keywords
              ? claves?.keywords.map((k, i) => (
                  <span
                    className="border me-1 mb-2 px-3 py-1 rounded-md bg-gray-200 text-amber-900 shadow text-xs"
                    key={i}
                  >
                    {k.name}
                  </span>
                ))
              : claves?.results.map((k, i) => (
                  <span
                    className="border me-1 mb-2 px-3 py-1 rounded-md bg-gray-200 text-amber-950 shadow text-xs"
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
