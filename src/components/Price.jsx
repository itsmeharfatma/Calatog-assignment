import React from "react";

const Price = () => {
  return (
    <div className="my-4 flex flex-col justify-start gap-6">
      <div className="flex flex-row items-start gap-1">
        <h1 className="text-6xl text-[#1A243A] font-semibold">63,179.71</h1>
        <p className="text-[#BDBEBF] text-xl font-semibold">USD</p>
      </div>
      <p className="text-green-500 text-lg">+2,161.42 (3.54%)</p>
    </div>
  );
};

export default Price;
