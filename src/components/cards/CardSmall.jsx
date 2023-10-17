/* eslint-disable react/prop-types */
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Link } from "react-router-dom";
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'

const urlImg = import.meta.env.VITE_IMAGE_BASE_URL;

export default function CardSmall({ data }) {
  return (
    <div className="relative w-[150px]">
       <button className="absolute right-2 top-2 bg-gray-100 hover:bg-amber-900 text-blue-700 font-semibold hover:text-white rounded-full ">
          <EllipsisHorizontalIcon className="h-5 text-black"/>
        </button>
      <div>
        <Link to={`./detail/${data.media_type}/${data.id}`}>
          <img
            src={`${urlImg}w154/${data.poster_path}`}
            alt={data.title}
            className="rounded shadow"
          />
        </Link>
      </div>
      <div className="relative w-full flex content-start pt-6 px-2">
       
        <div className="w-[42px] absolute -top-5 h-10">
          <CircularProgressbar
            value={Math.round(data.vote_average * 10)}
            background
            backgroundPadding={5}
            strokeWidth={6}
            minValue={0}
            maxValue={100}
            text={`${Math.round(data.vote_average * 10)}%`}
            styles={buildStyles({
              pathColor: `#92400e`,
              textSize: "27px",
              textColor: "black",
              backgroundColor: "#E1E3E5",
            })}
          />
        </div>
        <div>
          <span className="font-semibold block card-title">
            {data.title ?? data.name}
          </span>
          <span className="font-light text-sm">{data.release_date}</span>
        </div>
      </div>
    </div>
  );
}
