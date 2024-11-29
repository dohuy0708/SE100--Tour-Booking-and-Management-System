import React from "react";

export default function HeaderComponent() {
  return (
    <div className="h-[72px] flex-1 items-center bg-main">
      <div className="max-w-7xl h-full mx-auto ">
        <div className="flex justify-between h-full items-center">
          <div>
            <img className="h-16 text-white" src="./logo.png" />
          </div>
          <div> Đăng nhập</div>
        </div>
      </div>
    </div>
  );
}
