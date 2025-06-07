import React from "react";
import Footer from "./Footer";
import Header from "./Header";
export default function Layout({ children }) {
  return (
    <div className="flex">
      <div className="w-[10%] h-screen">
        <Header />
      </div>
      <main className="w-[90%] h-screen bg-gray-100">{children}</main>
    </div>
  );
}
