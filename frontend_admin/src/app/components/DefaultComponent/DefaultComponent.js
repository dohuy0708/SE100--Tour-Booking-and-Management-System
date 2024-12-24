import React, { useState } from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import SideBarComponent from "../SideBarComponent/SideBarComponent";

export default function DefaultComponent({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className=" ">
      {/* Page Wrapper */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <SideBarComponent
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Content Area */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* Sticky Header */}
          <HeaderComponent
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          {/* Main Content */}
          <main>
            {" "}
            {/* Add padding-top to account for sticky header */}
            <div className="bg-customBG mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 min-h-screen">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
