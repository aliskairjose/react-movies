import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SimpleMovieCard from "../components/cards/SimpleMovieCard";

const urlImg = import.meta.env.VITE_IMAGE_BASE_URL;
import { person } from '../providers/api';

const GENDER = {
  0: "No especificado",
  1: "Femenino",
  2: "Masculino",
  3: "No binario",
};

export default function Person() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
     const data = await person(id)
      setDetail(data);

    };

    fetchData().catch(console.error);
  }, []);

  return (
    <div className="flex md:flex-row flex-col max-w-7xl mx-auto py-8 md:px-0 px-2">
      <div className="md:w-3/12 w-full">
        <img
          className="rounded-xl mb-6 h-72 md:mx-0 mx-auto"
          src={`${urlImg}original${detail?.profile_path}`}
          alt={detail?.name}
        />
        <div className="">
          <p className="font-medium text-lg">Información detailal</p>
          <p className="font-medium mt-3">Conocido por</p>
          <p>{detail?.known_for_department}</p>
          <p className="font-medium mt-3">Género</p>
          <p>{GENDER[detail?.gender]}</p>
          <p className="font-medium mt-3">Fecha de nacimiento</p>
          <p>{detail?.birthday}</p>
          <p className="font-medium mt-3">Lugar de nacimiento</p>
          <p>{detail?.place_of_birth}</p>
          <p className="font-medium mt-3">También conocido como</p>
          {detail?.also_known_as.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </div>
      <div className="w-9/12 pl-6 ">
        <h1 className="font-semibold text-3xl mt-1 mb-10">{detail?.name}</h1>
        <h3 className="text-xl font-medium mb-2">Biografía</h3>
        {detail?.biography ? (
          <p className="mb-6">{detail?.biography}</p>
        ) : (
          <p className="mb-6">No tenemos una biografía de {detail?.name}.</p>
        )}
        <h3 className="text-xl font-medium mb-2">{detail?.gender===1 ? 'Conocida' : 'Conocido'} por</h3>
        <div className="gap-3 overflow-x-auto trending-display ">
          {detail?.movie_credits.cast.length > 0 
          ?(
            detail?.movie_credits?.cast
            ?.map((c, i) => <SimpleMovieCard movie={c} key={i} />)
            .slice(0, 10)
          )
          :(
            detail?.movie_credits?.crew
            ?.map((c, i) => <SimpleMovieCard movie={c} key={i} />)
            .slice(0, 10)
          )
        }
        </div>
        {/* <h3 className="text-xl font-medium mb-2">{detail?.gender===1 ? 'Conocida' : 'Conocido'} por</h3>
        <div className="gap-3 overflow-x-auto trending-display ">
          {detail?.tv_credits.cast.length > 0 
          ?(
            detail?.tv_credits?.cast
            ?.map((c, i) => <SimpleMovieCard movie={c} key={i} />)
            .slice(0, 10)
          )
          :(
            detail?.movie_credits?.crew
            ?.map((c, i) => <SimpleMovieCard movie={c} key={i} />)
            .slice(0, 10)
          )
        }
        </div> */}
      </div>
    </div>
  );
}
