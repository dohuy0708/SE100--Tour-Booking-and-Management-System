import React from "react";
import HeaderComponent from "./HeaderComponent";
import Nav from "./Nav";
import Footer from "./Footer";

export default function DefaultComponent({ children }) {
  return (
    <div>
      <HeaderComponent />
      <div className="sticky top-0 z-10">
        <Nav />
      </div>
      {children}
      <Footer />
    </div>
  );
}
