/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import profileImg from "../../assets/images/profile.png"

const urlImg = import.meta.env.VITE_IMAGE_BASE_URL;

export default function SimpleMovieCard({ movie }) {
  const getProfileImage = (c) =>
    c?.poster_path ? `${urlImg}original/${movie?.poster_path}` : profileImg;
  return (
    <div className="rounded w-[135px]">
      <Link to={`../movie/${movie?.id}`}>
        <img
          src={getProfileImage(movie)}
          alt={movie?.title}
          className="rounded-md h-[200px]"
        />
      </Link>
      <div className="m-2">
        <p className="m-0 p-0 text-sm ">{movie?.title}</p>
      </div>
    </div>
  );
}