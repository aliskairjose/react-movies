import { useEffect, useState } from "react";
import { credits, detail } from "../providers/movieAndTvSeries";
import { Link, useNavigate, useParams } from "react-router-dom";
import profileImg from "../assets/images/profile.png";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const urlImg = import.meta.env.VITE_IMAGE_BASE_URL;

export default function CRedits() {
  const { id, mediaType } = useParams();
  const [cast, setCast] = useState(null);
  const [crew, setCrew] = useState(null);
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const [creditsRes, movieRes] = await Promise.allSettled([
        credits(mediaType, id),
        detail(mediaType, id),
      ]);
      setCast(creditsRes.value.cast);
      setCrew(creditsRes.value.crew);
      setMovie(movieRes.value);
    };
    fetchData().catch(console.error);
  }, []);

  const getProfileImage = (c) =>
    c?.profile_path ? `${urlImg}w154/${c?.profile_path}` : profileImg;

  return (
    <>
      <section className="bg-amber-950 py-4 mt-2 mb-6 text-white">
        <div className="flex items-center max-w-7xl mx-auto ">
          <img
            src={`${urlImg}w154/${movie.poster_path}`}
            alt={movie.title}
            className=" h-[85px] rounded-md shadow-md"
          />
          <div className="flex flex-col ms-4">
            <h1 className="text-4xl font-medium ">{movie.title}</h1>
            <Link
              to={".."}
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
              className="text-gray-500 font-medium"
            >
              <ArrowLeftIcon className="h-5 inline-block me-1" />
              Volver al principal
            </Link>
          </div>
        </div>
      </section>
      <section className="flex max-w-7xl mx-auto">
        <div className="w-1/2">
          <h1 className="text-xl font-bold tracking-wider mb-4">
            {"Reparto "}
            <span className="text-gray-500 font-normal">{cast?.length}</span>
          </h1>
          {cast?.map((c, i) => (
            <div key={i} className="flex mb-2">
              <Link to={`../person/${c.id}`}>
                <img
                  src={getProfileImage(c)}
                  alt={c.original_name}
                  className="w-[70px] h-[85px] rounded-md object-cover object-top shadow-md"
                />
              </Link>
              <div className="ps-6 my-auto">
                <p className="font-medium">{c?.original_name}</p>
                <p>{c?.character}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/3">
          <h1 className="text-xl font-bold tracking-wider mb-4">
            {"Equipo "}
            <span className="text-gray-500 font-normal">{crew?.length}</span>
          </h1>
          {crew?.map((c, i) => (
            <div key={i} className="flex mb-2">
              <Link to={`../person/${c.id}`}>
                <img
                  src={getProfileImage(c)}
                  alt={c.original_name}
                  className="w-[70px] h-[85px] rounded-md object-cover object-top shadow-md"
                />
              </Link>
              <div className="ps-6 my-auto">
                <p className="font-medium">{c?.original_name}</p>
                <p>{c?.known_for_department}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
