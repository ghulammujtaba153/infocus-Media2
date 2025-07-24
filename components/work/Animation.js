"use client";

import React, { useState } from "react";
import { animationData } from "@/utils/data";
import { useRouter } from "next/navigation";

const Animation = () => {
  const ITEMS_PER_PAGE = 4; // Show 2 items initially
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const router = useRouter();

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleImageClick = (item, image) => {
    const title = item.title.toLowerCase();
    const imageName = image.toLowerCase();
    if (title.includes("social media") || imageName.includes("social")) {
      router.push("/socialmedia");
    } else if (
      title.includes("event") ||
      title.includes("event media coverage") ||
      imageName.includes("event")
    ) {
      router.push("/eventcoverage");
    } else if (
      title.includes("comercial video marketing") ||
      title.includes("commercial video marketing") ||
      imageName.includes("commercial")
    ) {
      router.push("/videoproduction");
    }
  };

  const isAllDataVisible = visibleCount >= animationData.length;

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full gap-8">
        {animationData.slice(0, visibleCount).map((item, index) => (
          <React.Fragment key={index}>
            <div className="w-full h-[1px] bg-gray-200 my-6"></div>

            <div className="flex flex-col-reverse md:flex-row gap-6 w-full">
              {/* Text */}
              <div className="md:w-1/3 w-full flex md:justify-end">
                <div className="flex gap-10 md:gap-0 md:flex-col md:text-right text-left">
                  <p className="text-sm text-gray-500 text-[16px] md:text-[18px] lg:text-[22px] uppercase">CLIENT</p>
                  <div className="flex flex-col">
                    <h1 className="text-xl font-semibold text-[40px] md:text-[40px] lg:text-[64px] cursor-pointer" onClick={() => handleImageClick(item, item.image[0])}>{item.title}</h1>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {item.image.map((image, i) => (
                  <img
                    key={i}
                    src={image}
                    alt={item.title || "Case Study"}
                    className="object-cover cursor-pointer"
                    style={{ width: '750px', height: '750px', position: 'relative', top: '10px', left: '10px' }}
                    onClick={() => handleImageClick(item, image)}
                  />
                ))}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {!isAllDataVisible && (
        <div className="flex justify-center items-center mt-10">
          <button
            onClick={handleSeeMore}
            className="bg-black text-white px-6 py-3 cursor-pointer hover:bg-gray-200 hover:text-black hover:scale-105 transition-transform duration-300 rounded-md font-medium"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default Animation;
