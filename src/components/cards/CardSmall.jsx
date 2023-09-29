/* eslint-disable react/prop-types */
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
const urlImg = import.meta.env.VITE_IMG_URL;

export default function CardSmall({ data }) {
  return (
    <div className="relative w-[150px] min-w-[150px]">
      <div>
        <img
          src={`${urlImg}${data.poster_path}`}
          alt={data.title}
          className="rounded shadow"
        />
      </div>
      <div className="relative w-full flex content-start pt-6 px-2">
        <div className="w-[42px] absolute -top-5 h-10">
          <CircularProgressbar
            background
            backgroundPadding={5}
            strokeWidth={10}
            minValue={0}
            maxValue={100}
            text={`${Math.round(data.vote_average * 10)}%`}
            styles={buildStyles({
              pathColor: `green`,
              textSize: "27px",
              textColor: "white",
              backgroundColor: "red",
            })}
          />
        </div>
        <div>
          <span className="font-semibold block">
            {data.title ?? data.name}
          </span>
          <span className="font-light text-sm">{data.release_date}</span>
        </div>
      </div>
    </div>
  );
}
