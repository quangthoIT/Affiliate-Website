import React from "react";

const Title = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center space-y-1 mb-8">
      <div className="inline-flex gap-2 items-center mx-auto">
        <p className="w-8 h-0.5 bg-gray-900"></p>
        <h1 className="uppercase text-2xl font-semibold">{title}</h1>
        <p className="w-8 h-0.5 bg-gray-700"></p>
      </div>
      <div className="max-w-4xl">
        <p className="text-gray-600 text-sm md:text-base italic">{description}</p>
      </div>
    </div>
  );
};

export default Title;
