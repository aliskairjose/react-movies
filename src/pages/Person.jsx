import { useEffect, useState } from "react";
import { combinedCredits, detail } from "../providers/people";
import { useParams } from "react-router-dom";
import SimpleMovieCard from "../components/cards/SimpleMovieCard";

const urlImg = import.meta.env.VITE_IMAGE_BASE_URL;

const GENDER = {
  0: "No especificado",
  1: "Femenino",
  2: "Masculino",
  3: "No binario",
};

export default function Person() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [combined, setCombined] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [detalleRes, combinedRes] = await Promise.allSettled([
        detail(id),
        combinedCredits(id),
      ]);
      setPerson(detalleRes.value);
      setCombined(combinedRes.value);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <div className="flex md:flex-row flex-col max-w-7xl mx-auto py-8">
      <div className="md:w-3/12 w-full">
        <img
          className="rounded-xl mb-6 h-72 md:mx-0 mx-auto"
          src={`${urlImg}original/${person?.profile_path}`}
          alt={person?.name}
        />
        <div className="">
          <p className="font-medium text-lg">Información personal</p>
          <p className="font-medium mt-3">Conocido por</p>
          <p>{person?.known_for_department}</p>
          <p className="font-medium mt-3">Género</p>
          <p>{GENDER[person?.gender]}</p>
          <p className="font-medium mt-3">Fecha de nacimiento</p>
          <p>{person?.birthday}</p>
          <p className="font-medium mt-3">Lugar de nacimiento</p>
          <p>{person?.place_of_birth}</p>
          <p className="font-medium mt-3">También conocido como</p>
          {person?.also_known_as.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </div>
      <div className="w-9/12 pl-6 ">
        <h1 className="font-semibold text-3xl mt-1 mb-10">{person?.name}</h1>
        <h3 className="text-xl font-medium mb-2">Biografia</h3>
        {person?.biography ? (
          <p className="mb-6">{person?.biography}</p>
        ) : (
          <p className="mb-6">No tenemos una biografía de {person?.name}.</p>
        )}
        <h3 className="text-xl font-medium mb-2">Conocido por</h3>
        <div className="gap-3 overflow-x-auto trending-display ">
          {combined?.cast
            ?.map((c, i) => <SimpleMovieCard movie={c} key={i} />)
            .slice(0, 10)}
        </div>
      </div>
    </div>
  );
}
