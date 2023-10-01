import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { trending } from "../../providers/api";
import CardSmall from "../cards/CardSmall";

export default function TrendingSlider() {
  const [data, setData] = useState(null);
  const [timeWindow, setTimeWindow] = useState('day')

  useEffect(() => {
    const fetchData = async () => {
      const res = await trending("all", timeWindow);
      setData(res);
    };

    fetchData().catch(console.error);
  }, [timeWindow]);

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <>
      <div className="ms-6 flex">
        <p className="home-subtitle">Tendecias</p>
        <Tab.Group
          className="w-52"
          onChange={(index) => setTimeWindow(index?'week':'day')}
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
              Hoy
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
              Esta semana
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
