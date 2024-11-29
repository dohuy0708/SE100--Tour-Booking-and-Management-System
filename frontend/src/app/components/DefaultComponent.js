import React from "react";
import HeaderComponent from "./HeaderComponent";
import Nav from "./Nav";
import Footer from "./Footer";

export default function DefaultComponent({ children }) {
  return (
    <div>
      <HeaderComponent />
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
