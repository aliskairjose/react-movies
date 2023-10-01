import TrendingSlider from "../components/sliders/TrendingSlider";
import MovieSlider from "../components/sliders/MovieSlider";
import TvSerieSlider from "../components/sliders/TvSerieSlider";
import Search from "../components/Search";

export default function Home() {
  return (

      <div className="flex flex-col gap-y-8 p-4">
        <section>
          <TrendingSlider />
        </section>
        <section>
          <MovieSlider />
        </section>
        <section>
          <TvSerieSlider />
        </section>
      </div>
  );
}
