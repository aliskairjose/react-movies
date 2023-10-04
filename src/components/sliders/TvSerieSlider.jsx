import { useEffect, useState } from "react";
import CardSmall from "../cards/CardSmall";
import { tvSeries } from "../../providers/api";
import { Tab } from "@headlessui/react";

const SLUG = {
  0: "airing_today",
  1: "on_the_air",
  2: "top_rated",
  3: "popular",
};

export default function TvSerieSlider() {
  const [data, setData] = useState(null);
  const [slug, setSlug] = useState('airing_today');

  useEffect(() => {
    const fetchData = async () => {
      const res = await tvSeries(slug);
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
        <p className="home-subtitle">
          Series de TV
        </p>
        <Tab.Group
          className="w-[500px]"
          onChange={(index) => {
            setSlug(SLUG[index]);
          }}
        >
          <Tab.List className="flex space-x-1 rounded-xl bg-amber-900 p-[0.2rem]">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-0.5 text-sm font-medium leading-5 text-amber-600",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-amber-300 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-amber-500 hover:bg-amber-400/[0.12] hover:text-amber-400"
                )
              }
            >
               Trasmitiendo hoy
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-0.5 text-sm font-medium leading-5 text-amber-600",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-amber-300 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-amber-500 hover:bg-amber-400/[0.12] hover:text-amber-400"
                )
              }
            >
             En televisión
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-0.5 text-sm font-medium leading-5 text-amber-600",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-amber-300 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-amber-500 hover:bg-amber-400/[0.12] hover:text-amber-400"
                )
              }
            >
              Lo mas votado
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-0.5 text-sm font-medium leading-5 text-amber-600",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-amber-300 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-amber-500 hover:bg-amber-400/[0.12] hover:text-amber-400"
                )
              }
            >
              Popular
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
