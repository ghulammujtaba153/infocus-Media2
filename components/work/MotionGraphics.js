import React, { useState } from "react";

const data = [
  { title: "dc children day", image: "/assets/motion3.png" },
  { title: "salik eid greeting ", image: "/assets/motion1.png" },
  { title: "salik animation post", image: "/assets/motion2.png" },
  { title: "dc zayed humanitarian day", image: "/assets/motion7.png" },
  { title: "mohisruae", image: "/assets/motion5.png" },
  { title: "infocus media eid greetings", image: "/assets/motion6.png" },
  { title: "salik earth day", image: "/assets/motion4.png" },
  { title: "mohisruae", image: "/assets/motion4.png" },
];

const MotionGraphics = () => {
  const [visibleCount, setVisibleCount] = useState(6); 

  const handleToggle = () => {
    if (visibleCount >= data.length) {
      setVisibleCount(2); // Collapse
    } else {
      setVisibleCount(data.length); // Expand
    }
  };

  return (
    <div className="flex flex-col w-full px-6 my-8">
      {/* Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-b border-gray-200">
        {data.slice(0, visibleCount).map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={`flex md:flex-row flex-col-reverse gap-4 p-4 border-gray-100 border-t border-b 
                ${isEven ? '' : 'md:border-l'} 
                ${index < 2 ? 'border-t' : ''}`}
            >
              {/* Text */}
              <div className="md:w-1/2 w-full flex md:justify-end">
                <div className="flex gap-10 md:gap-0 md:flex-col md:text-right text-left">
                  <p className="text-sm text-gray-500 text-[16px] md:text-[18px] lg:text-[22px] uppercase">PROJECT</p>
                  <h1 className="text-[40px] lg:text-[64px] font-semibold leading-[.99] capitalize">{item.title}</h1>
                </div>
              </div>

              {/* Image */}
              <img
                src={item.image}
                alt={item.title || "Case Study"}
                className="w-full md:w-[370px] h-[620px] md:h-[750px] object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* Button */}
      <div className="flex justify-center items-center mt-10">
        <button
          onClick={handleToggle}
          className="bg-black text-white px-6 py-3 cursor-pointer hover:bg-gray-200 hover:text-black hover:scale-105 transition-transform duration-300 rounded-md font-medium text-[16px] md:text-[18px] lg:text-[22px]"
        >
          {visibleCount >= data.length ? "See Less" : "See More!"}
        </button>
      </div>
    </div>
  );
};

export default MotionGraphics;
