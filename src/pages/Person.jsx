import { useEffect, useState } from "react";
import { detail } from "../providers/people";
import { useParams } from "react-router-dom";

const urlImg = import.meta.env.VITE_IMAGE_BASE_URL;

const GENDER = {
  0: 'No especificado',
  1: 'Femenino',
  2: 'Masculino',
  3: 'No binario'
}

export default function Person() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await detail(id);
      setPerson(res);
    };

    fetchData().catch(console.error);
  },[]);

  return (
    <div className="flex max-w-7xl mx-auto py-8">
      <div className="w-3/12">
        <img
          className="rounded-xl mb-6"
          src={`${urlImg}original/${person?.profile_path}`}
          alt={person?.name}
        />
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
        {person?.also_known_as.map((item, index)=>(
        <p key={index}>{item}</p>
        ))}
      </div>
      <div className="w-9/12 pl-6 ">
        <h1 className="font-semibold text-3xl mt-1 mb-10">{person?.name}</h1>
        <h3 className="text-xl font-medium mb-2">Biografia</h3>
        <p>{person?.biography}</p>
      </div>
    </div>
  );
}
