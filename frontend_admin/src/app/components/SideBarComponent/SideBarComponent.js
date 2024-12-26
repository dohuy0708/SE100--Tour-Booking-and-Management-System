import React from "react";
import Logo from "../../assets/img/Logo.png";
import LogoName from "../../assets/img/Logo_name.png";
import { NavLink } from "react-router-dom";
export default function SideBarComponent() {
  return (
    <div class="  ">
      {" "}
      <aside class=" border-r-2 border-gray absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden  bg-white duration-300 ease-linear   lg:static lg:translate-x-0 translate-x-0">
        <div class="flex items-center justify-between gap-2 mx-auto py-5.5 lg:py-6.5">
          <NavLink to="/">
            <img src={Logo} alt="Logo" className="w-28 h-auto" />
            <img src={LogoName} alt="LogoName" className="w-36 h-auto" />
          </NavLink>
          <button
            aria-controls="sidebar"
            aria-expanded="true"
            class="block lg:hidden"
          ></button>
        </div>
        <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav class="mt-5 py-4   lg:mt-2     ">
            <div>
              <ul class="mb-6 flex flex-col gap-2">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm px-8  py-2 font-medium duration-100 ease-in-out 
                      ${
                        isActive
                          ? "bg-blue-400 text-white"
                          : "hover:bg-slate-300 hover:text-white"
                      }`
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M6 19h3v-5q0-.425.288-.712T10 13h4q.425 0 .713.288T15 14v5h3v-9l-6-4.5L6 10zm-2 0v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-4q-.425 0-.712-.288T13 20v-5h-2v5q0 .425-.288.713T10 21H6q-.825 0-1.412-.587T4 19m8-6.75"
                      />
                    </svg>
                    TRANG CHỦ
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Booking"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm px-8 py-2 font-medium duration-100 ease-in-out 
                      ${
                        isActive
                          ? "bg-blue-400 text-white"
                          : "hover:bg-slate-300 hover:text-white"
                      }`
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32px"
                      height="32px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m8.85 15.65l8.9-2.35q.375-.1.563-.462t.087-.738t-.437-.562t-.713-.088l-2.45.65l-4-3.75l-1.4.35l2.4 4.2l-2.4.6l-1.25-.95l-.95.25zM20 20H4q-.825 0-1.412-.587T2 18v-4q.825 0 1.413-.587T4 12t-.587-1.412T2 10V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20m0-2V6H4v2.55q.925.55 1.463 1.463T6 12t-.537 1.988T4 15.45V18zm-8-6"
                      />
                    </svg>
                    ĐƠN ĐẶT
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm  px-8 py-2 font-medium duration-100 ease-in-out 
  ${
    isActive ? "bg-blue-400 text-white" : "hover:bg-slate-300 hover:text-white"
  }`
                    }
                    to="/Schedule"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32px"
                      height="32px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5zM5 8h14V6H5zm0 0V6zm7 6q-.425 0-.712-.288T11 13t.288-.712T12 12t.713.288T13 13t-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13t.288-.712T8 12t.713.288T9 13t-.288.713T8 14m8 0q-.425 0-.712-.288T15 13t.288-.712T16 12t.713.288T17 13t-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17t.288-.712T8 16t.713.288T9 17t-.288.713T8 18m8 0q-.425 0-.712-.288T15 17t.288-.712T16 16t.713.288T17 17t-.288.713T16 18"
                      />
                    </svg>
                    CHUYẾN ĐI
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm  px-8 py-2 font-medium duration-100 ease-in-out 
  ${
    isActive ? "bg-blue-400 text-white" : "hover:bg-slate-300 hover:text-white"
  }`
                    }
                    to="/Customer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32px"
                      height="32px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12 5a3.5 3.5 0 0 0-3.5 3.5A3.5 3.5 0 0 0 12 12a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 12 5m0 2a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 12 10a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 12 7M5.5 8A2.5 2.5 0 0 0 3 10.5c0 .94.53 1.75 1.29 2.18c.36.2.77.32 1.21.32s.85-.12 1.21-.32c.37-.21.68-.51.91-.87A5.42 5.42 0 0 1 6.5 8.5v-.28c-.3-.14-.64-.22-1-.22m13 0c-.36 0-.7.08-1 .22v.28c0 1.2-.39 2.36-1.12 3.31c.12.19.25.34.4.49a2.48 2.48 0 0 0 1.72.7c.44 0 .85-.12 1.21-.32c.76-.43 1.29-1.24 1.29-2.18A2.5 2.5 0 0 0 18.5 8M12 14c-2.34 0-7 1.17-7 3.5V19h14v-1.5c0-2.33-4.66-3.5-7-3.5m-7.29.55C2.78 14.78 0 15.76 0 17.5V19h3v-1.93c0-1.01.69-1.85 1.71-2.52m14.58 0c1.02.67 1.71 1.51 1.71 2.52V19h3v-1.5c0-1.74-2.78-2.72-4.71-2.95M12 16c1.53 0 3.24.5 4.23 1H7.77c.99-.5 2.7-1 4.23-1"
                      />
                    </svg>
                    KHÁCH HÀNG
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm  px-8 py-2 font-medium duration-100 ease-in-out 
  ${
    isActive ? "bg-blue-400 text-white" : "hover:bg-slate-300 hover:text-white"
  }`
                    }
                    to="/Tour"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32px"
                      height="32px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m18.25 22l-2.75-3l1.16-1.18l1.59 1.59l3.59-3.59L23 17.23zM20.5 3a.5.5 0 0 1 .5.5v9.84c-.63-.22-1.3-.34-2-.34V5.7l-3 1.16v6.94c-.8.47-1.5 1.11-2 1.88V6.87l-4-1.4v11.66l3.05 1.07l-.05.8c0 .46.05.92.15 1.35L9 18.9l-5.34 2.07l-.16.03a.5.5 0 0 1-.5-.5V5.38c0-.23.15-.41.36-.48L9 3l6 2.1l5.34-2.07zM5 6.46v11.85l3-1.16V5.45z"
                      />
                    </svg>
                    TOUR
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm  px-8 py-2 font-medium duration-100 ease-in-out 
  ${
    isActive ? "bg-blue-400 text-white" : "hover:bg-slate-300 hover:text-white"
  }`
                    }
                    to="/Staff"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32px"
                      height="32px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M18.72 14.76c.35-.85.54-1.76.54-2.76c0-.72-.11-1.41-.3-2.05c-.65.15-1.33.23-2.04.23A9.07 9.07 0 0 1 9.5 6.34a9.2 9.2 0 0 1-4.73 4.88c-.04.25-.04.52-.04.78A7.27 7.27 0 0 0 12 19.27c1.05 0 2.06-.23 2.97-.64c.57 1.09.83 1.63.81 1.63c-1.64.55-2.91.82-3.78.82c-2.42 0-4.73-.95-6.43-2.66a9 9 0 0 1-2.24-3.69H2v-4.55h1.09a9.09 9.09 0 0 1 15.33-4.6a9 9 0 0 1 2.47 4.6H22v4.55h-.06L18.38 18l-5.3-.6v-1.67h4.83zm-9.45-2.99c.3 0 .59.12.8.34a1.136 1.136 0 0 1 0 1.6c-.21.21-.5.33-.8.33c-.63 0-1.14-.5-1.14-1.13s.51-1.14 1.14-1.14m5.45 0c.63 0 1.13.51 1.13 1.14s-.5 1.13-1.13 1.13s-1.14-.5-1.14-1.13a1.14 1.14 0 0 1 1.14-1.14"
                      />
                    </svg>
                    NHÂN VIÊN
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    aria-current="page"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm  px-8 py-2 font-medium duration-100 ease-in-out 
                      ${
                        isActive
                          ? "bg-blue-400 text-white"
                          : "hover:bg-slate-300 hover:text-white"
                      }`
                    }
                    to="/History"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32px"
                      height="32px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M5 19V5zv-.112zm0 2q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v7q0 .425-.288.713T20 13t-.712-.288T19 12V5H5v14h6q.425 0 .713.288T12 20t-.288.713T11 21zm12.35-1.825l3.525-3.55q.3-.3.713-.3t.712.3t.3.713t-.3.712l-4.25 4.25q-.3.3-.712.3t-.713-.3L14.5 19.175q-.275-.3-.275-.712t.3-.713t.7-.3t.7.3zM8 13q.425 0 .713-.288T9 12t-.288-.712T8 11t-.712.288T7 12t.288.713T8 13m0-4q.425 0 .713-.288T9 8t-.288-.712T8 7t-.712.288T7 8t.288.713T8 9m8 4q.425 0 .713-.288T17 12t-.288-.712T16 11h-4q-.425 0-.712.288T11 12t.288.713T12 13zm0-4q.425 0 .713-.288T17 8t-.288-.712T16 7h-4q-.425 0-.712.288T11 8t.288.713T12 9z"
                      />
                    </svg>
                    TOUR ĐÃ ĐI
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>
    </div>
  );
}
