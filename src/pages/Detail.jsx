import { useParams } from "react-router-dom";
import noPoster from "../assets/images/no-poster.jpeg";
import { useEffect, useState } from "react";
import "../assets/styles/Detail.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Link } from "react-router-dom";
import PersonCard from "../components/cards/PersonCard";
import { LinkIcon } from "@heroicons/react/20/solid";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { movieAndTvSeriesDetail } from "../providers/api";
import YoutubeEmbed from "../components/YoutubeEmbed";

const urlImg = import.meta.env.VITE_IMAGE_BASE_URL;

export default function Detail() {
  const { mediaType, id } = useParams();
  const [detalle, setDetalle] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const data = await movieAndTvSeriesDetail(mediaType, id)
      setDetalle(data)
    }
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
        className="bg-black md:h-[500px] h-screen relative fondo bg-fixed bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${backdropImg()})`,
        }}
      >
        <div className="flex md:flex-row flex-col max-w-7xl m-auto absolute md:top-6 top-2 md:left-[7%]">
          <div className="hidden md:block">
            <img
              className="rounded-md md:w-[400px] w-[120px] md:mx-0 mx-auto"
              src={`${urlImg}original${detalle?.poster_path}`}
              alt={detalle?.original_title}
            />
          </div>
          <div className="w-full pt-4 px-4 text-white">
            <h1 className="text-4xl font-bold tracking-wider md:text-left text-center">
              {detalle?.title || detalle?.name}
              <span className="font-light text-3xl ms-2">({getYear()})</span>
            </h1>
            <p className="md:text-left text-center">
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
                {detalle?.credits?.cast
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
                {detalle?.credits?.crew
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
      <div className="flex md:flex-row flex-col max-w-7xl mx-auto py-2 ">
        <div className="md:w-9/12 w-full py-7 md:px-0 px-2">
          <section className="border-b pb-4 my-4">
            <p className="font-medium text-xl">Actores principales</p>
            <div className="gap-4 py-2 overflow-x-auto trending-display ">
              {detalle?.credits?.cast
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

          {/* VIDEOS */}
          <section className="border-b pb-4 mt-6">
            <p className="font-medium text-xl">Videos</p>
            <div className="gap-4 py-2 overflow-x-auto trending-display ">
              {detalle?.videos.results.map((c, i) => (
                  <YoutubeEmbed embedId={c.key} key={i}/>
              ))}
            </div>
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
          <section className="border-b pb-4 mt-6 px-4 md:px-1">
            <p className="font-medium text-xl">Recomendaciones</p>
            <div className="gap-4 py-2 overflow-x-auto trending-display ">
              {detalle?.recommendations.results.length > 0 ? (
                detalle?.recommendations.results.map((r, i) => (
                  <div key={i}>
                    <img
                      src={`${urlImg}/original${r?.backdrop_path}`}
                      alt={r?.name}
                      className="rounded-md w-[250px]"
                    />
                    <div className="flex justify-between mt-2 px-1">
                      <span className="text-sm">{r?.name || r?.title}</span>
                      <span className="text-sm">{`${Math.round(
                        r?.vote_average * 10
                      )}%`}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm mt-3">
                  No tenemos suficiente información para recomendarte películas
                  basadas en <span className="font-medium">{detalle?.title || detalle?.name}</span>. Puedes ayudarnos valorando las
                  películas que has visto.
                </p>
              )}
            </div>
          </section>
        </div>
        <div className="md:w-3/12 w-full md:py-7 py-2 md:px-6 px-4">
          <div className="mb-5">
            <ul className="inline-flex divide-x">
              {detalle?.externainstagram_id ? (
                <li className="px-2">
                  <Link
                    to={`https://instagram.com/${detalle?.externainstagram_id}`}
                  >
                    <BsInstagram className="h-[1.5rem] w-[1.5rem]" />
                  </Link>
                </li>
              ) : (
                <></>
              )}
              {detalle?.externafacebook_id ? (
                <li className="px-2">
                  <Link to={`https://facebook.com/${detalle?.externafacebook_id}`}>
                    <BsFacebook className="h-[1.5rem] w-[1.5rem]" />
                  </Link>
                </li>
              ) : (
                <></>
              )}
              {detalle?.externatwitter_id ? (
                <li className="px-2">
                  <Link to={`https://twitter.com/${detalle?.externatwitter_id}`}>
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
            {detalle?.keywords.keywords
              ? detalle?.keywords.keywords.map((k, i) => (
                  <span
                    className="border me-1 mb-2 px-3 py-1 rounded-md bg-gray-200 text-amber-900 shadow text-xs"
                    key={i}
                  >
                    {k.name}
                  </span>
                ))
              : detalle?.keywords?.results.map((k, i) => (
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
