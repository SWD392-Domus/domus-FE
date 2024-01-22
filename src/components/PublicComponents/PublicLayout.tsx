import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";



const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <div className="h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
