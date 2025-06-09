import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router";
export default function Layout({ children }) {
  return (
    <div className="container mx-auto">
      <div>
        <Header />
        <main className="min-h-[50vh] m-4">{children}</main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
