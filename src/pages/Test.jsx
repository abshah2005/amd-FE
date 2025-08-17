import React, { useState } from "react";
import Banner from "../components/Banner";
import Professionals from "../components/Professionals";

const Test = () => {
  return (
    <div>
      <Banner />
      <div className="flex flex-col m-auto items-center justify-center py-4 w-[90%]">
        <div className="w-full">
          <Professionals />
        </div>
      </div>
    </div>
  );
};

export default Test;
