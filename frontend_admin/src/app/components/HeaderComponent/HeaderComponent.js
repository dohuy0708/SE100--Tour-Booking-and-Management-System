import React from "react";
import Image from "../../../mocks/img/UserImage.png";

export default function HeaderComponent() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow dark:bg-boxdark">
      <div className="flex items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        {/* Sidebar toggle button */}
        <button
          aria-controls="sidebar"
          className="z-50 block rounded border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
        >
          <span className="block h-5.5 w-5.5">
            {/* Add toggle icon code here */}
          </span>
        </button>
        {/* 
        Search bar (optional) */}
        <div className="hidden sm:block">
          <form>
            <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2 pl-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Search"
                className="block w-full rounded-lg border-gray-300 py-1.5 pl-8 pr-20 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm"
              />
            </div>
          </form>
        </div>

        {/* User profile */}
        <div className="flex items-center gap-4">
          <div className="hidden text-right lg:block">
            <span className="block text-sm font-medium text-black dark:text-white">
              Thomas Anree
            </span>
            <span className="block text-xs text-gray-500">UX Designer</span>
          </div>
          <div className="h-12 w-12 rounded-full">
            <img src={Image} alt="User Profile" />
          </div>
        </div>
      </div>
    </header>
  );
}
