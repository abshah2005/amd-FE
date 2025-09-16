import React, { useState } from "react";
import Banner from "../components/Banner";
import Professionals from "../components/Professionals";
import { useAuth } from "../contextProvider/AuthContextProvider";

const Test = () => {
  const { user } = useAuth();
  return (
    <div>
      <Banner />
      
      <div className="flex flex-col m-auto items-center justify-center py-4 w-[90%]">
        <div className="w-full">
          <Professionals isAuthenticated={!!user} />
        </div>
      </div>
    </div>
  );
};

export default Test;
