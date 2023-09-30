import React from "react";
import Trending from "../components/Trending";
import Movies from "../components/Movies";
import TvSeries from "../components/TvSeries";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-8 border rounded p-4 shadow-md">
      <section>
        <Trending />
      </section>
      <section>
        <Movies />
      </section>
      <section>
        <TvSeries />
      </section>
    </div>
  );
}
