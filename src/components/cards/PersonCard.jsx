/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import profileImg from "../../assets/images/profile.png"

const urlImg = import.meta.env.VITE_IMAGE_BASE_URL;

export default function PersonCard({ person }) {
  const getProfileImage = (c) =>
    c?.profile_path ? `${urlImg}w300/${person?.profile_path}` : profileImg;
  return (
    <div className="border rounded-md shadow w-[130px]">
      <Link to={`../person/${person?.id}`}>
        <img
          src={getProfileImage(person)}
          alt={person?.name}
          className="rounded-t-md h-[150px] w-full"
        />
      </Link>
      <div className="m-2 text-sm">
        <p className="m-0 p-0 font-medium">{person?.name}</p>
        <p className="m-0 p-0 font-light" >{person?.character}</p>
      </div>
    </div>
  );
}
