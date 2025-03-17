import React from "react";
import Sidebar from "./components/Sidebar";
import HomeContent from "./components/HomeContent";

const Home = () => {
  return (
    <>
      <div className="flex h-[96vh]">
        <Sidebar />
        <HomeContent />
      </div>
      ;
    </>
  );
};

export default Home;
