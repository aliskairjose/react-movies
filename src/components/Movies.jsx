import { useEffect, useState } from "react";
import CardSmall from "./cards/CardSmall";
import { movies } from "../providers/api";
import { Tab } from "@headlessui/react";

const MOVIE_SLUG = {
  0: 'top_rated',
  1: 'now_playing',
  2: 'popular',
  3: 'upcoming'
}

export default function Movies() {
  const [data, setData] = useState(null);
  const [slug, setSlug] = useState('top_rated')

  useEffect(() => {
    const fetchData = async () => {
      const res = await movies(slug)
      setData(res);
    };

    fetchData().catch(console.error);
  }, [slug]);

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };
  return (
    <>
      <div className="ms-6 flex">
        <p className=" font-semibold tracking-wider text-2xl me-4">Peliculas</p>
        <Tab.Group
          className="w-[450px]"
          onChange={(index) =>{setSlug(MOVIE_SLUG[index])}}
        >
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-0.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Lo más votados
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-0.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              En cines
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-0.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Popular
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-0.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Proximamente
            </Tab>
          </Tab.List>
        </Tab.Group>
      </div>
      <div className="gap-5 py-4 px-6 overflow-x-auto trending-display">
        {data?.results.map((t, i) => (
          <CardSmall data={t} key={i} />
        ))}
      </div>
    </>
  );
}
