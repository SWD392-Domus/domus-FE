import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import PublicRoute from "@/router/PublicRoute";

interface Props {}

const PublicLayout: React.FC<Props> = () => {
  return (
    <>
      <Header />
      <div className="h-screen">
        <PublicRoute />
      </div>
      <Footer />
    </>
  );
};

export default PublicLayout;
