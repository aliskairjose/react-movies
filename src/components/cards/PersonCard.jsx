/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import profileImg from "../../assets/images/no-profile.webp"

const urlImg = import.meta.env.VITE_IMAGE_BASE_URL;

export default function PersonCard({ person }) {
  const getProfileImage = (c) =>
    c?.profile_path ? `${urlImg}w300${person?.profile_path}` : profileImg;
  return (
    <div className="border rounded-md shadow w-[134px]">
      <Link to={`../person/${person?.id}`}>
        <img
          src={getProfileImage(person)}
          alt={person?.name}
          className="rounded-t-md h-[160px] w-full object-cover object-top"
        />
      </Link>
      <div className="m-2 text-sm">
        <p className="m-0 p-0 font-medium">{person?.name}</p>
        <p className="m-0 p-0 text-xs" >{person?.character}</p>
      </div>
    </div>
  );
}
