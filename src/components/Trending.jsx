import { useEffect, useState } from "react";
import { trending } from "../providers/trending";
import CardSmall from "./cards/CardSmall";
import { Tab } from "@headlessui/react";

export default function Trending() {
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
        <p className=" font-semibold tracking-wider text-2xl me-4">Tendecias</p>
        <Tab.Group
          className="w-52"
          onChange={(index) => setTimeWindow(index?'week':'day')}
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
              Hoy
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
              Esta semana
            </Tab>
          </Tab.List>
          {/* <Tab.Panels className="mt-2">
            <Tab.Panel>1</Tab.Panel>
            <Tab.Panel>2</Tab.Panel>
          </Tab.Panels> */}
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
