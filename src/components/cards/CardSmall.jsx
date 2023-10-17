/* eslint-disable react/prop-types */
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Link } from "react-router-dom";
import {
  EllipsisHorizontalIcon,
  BookmarkIcon,
  HeartIcon,
  StarIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const urlImg = import.meta.env.VITE_IMAGE_BASE_URL;

export default function CardSmall({ data }) {
  return (
    <>
      <div className="relative w-[150px]">
        <div className="absolute right-3 top-3 text-right">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex bg-gray-100/50 hover:bg-amber-700 font-semibold hover:text-white rounded-full">
                <EllipsisHorizontalIcon className="h-5 text-black" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute -right-16  w-48 origin-top-right rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-amber-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <Bars3Icon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        Añadir a lista
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-amber-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <HeartIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        Favorito
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-amber-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <BookmarkIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        Lista de seguimiento
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-amber-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <StarIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                        Tu puntuación
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        {/* <button className="absolute right-3 top-3 bg-gray-100/50 hover:bg-amber-700 font-semibold hover:text-white rounded-full" >
          <EllipsisHorizontalIcon className="h-5 text-black" />
        </button> */}
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
    </>
  );
}
