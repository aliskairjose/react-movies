/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import profileImg from "../../assets/images/no-profile.webp"

const urlImg = import.meta.env.VITE_IMAGE_BASE_URL;

export default function SimpleMovieCard({ movie }) {
  const getProfileImage = (c) =>
    c?.poster_path ? `${urlImg}original/${movie?.poster_path}` : profileImg;
  return (
    <div className="rounded">
      <Link to={`../detail/movie/${movie?.id}`}>
        <img
          src={getProfileImage(movie)}
          alt={movie?.title}
          className="rounded-md h-[200px]"
        />
      </Link>
      <div className="m-2">
        <p className="m-0 p-0 text-sm w-[120px]">{movie?.title || movie?.original_name}</p>
        <p className="m-0 p-0 text-xs w-[120px]">{movie?.character}</p>
      </div>
    </div>
  );
}
