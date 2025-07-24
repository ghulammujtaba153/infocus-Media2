"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

const WhatWeDo = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [columns, setColumns] = useState(2);
  const gridRef = useRef(null);

  const services = [
    {
      title: "SOCIAL MEDIA MANAGEMENT",
      description: "We build communities, not just content",
      icon: "/what-we-do/social.png",
    },
    {
      title: "DIGITAL MARKETING & WEB DEVELOPMENT",
      description: "We build campaigns and drive results",
      icon: "/what-we-do/digital.png",
    },
    {
      title: "EVENT MEDIA COVERAGE",
      description: "We bring your event to life",
      icon: "/what-we-do/event.png",
    },
    {
      title: "COMERCIAL VIDEO MARKETING",
      description: "We tell your story with cinematic impact",
      icon: "/what-we-do/commercial.png",
    },
    {
      title: "MARKETING STRATEGY",
      description:
        "We plan your growth with clear with clear data-driven strategies",
      icon: "/what-we-do/marketing.png",
    },

    {
      title: "BRANDING",
      description: "We build plans with purpose, personality, and power",
      icon: "/what-we-do/branding.png",
    },
    {
      title: "",
      description: "",
      icon: "",
    },
    {
      title: "ANIMATION & MOTION GRAPHICS",
      description: "We turn ideas into powerfull motion content ",
      icon: "/what-we-do/animation.png",
    },
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateColumnCount = () => {
      const grid = gridRef.current;
      if (grid) {
        const items = Array.from(grid.children);
        const top = items[0]?.getBoundingClientRect().top;
        const count = items.filter(
          (el) => el.getBoundingClientRect().top === top
        ).length;
        setColumns(count);
      }
    };

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);
    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

  return (
    <section className="relative bg-black text-white py-20">
      <div className="w-full px-6">
        <div className="text-center mb-16">
          <h2 className="text-[40px] md:text-[64px] lg:text-[64px] font-bold mb-6">
            What We Do
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-3 w-full"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {services.map((service, index) => {
            const isFirstRow = index < columns;
            const isFirstCol = index % columns === 0;
            const isLastCol = (index +1) % columns === 0;
            const isLastItem = index === services.length - 3;
            const isAloneInRow = services.length % columns !== 0 && isLastItem;
            const isSecondLastItem = index === services.length - 2;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                className={`
        flex lg:flex-row flex-col gap-3 lg:gap-8 p-6  items-start transition duration-300 sub-heading cursor-default
        ${
          hoveredIndex !== null && hoveredIndex !== index
            ? "opacity-30"
            : "opacity-100"
        }
        ${!isFirstRow ? "border-t" : ""}
        ${!isFirstCol ? "border-l" : ""}
        ${!isLastCol ? "border-r" : ""}
        ${isAloneInRow ? "border-" : ""}
        ${isSecondLastItem ? "border-t" : ""}
        ${isLastItem? "border-t" : ""}
        border-gray-50/20
      `}
              >
                <div className="flex lg:flex-col justify-between h-full ">
                  {service.icon && <Image
                    src={service.icon}
                    alt={service.title}
                    width={116}
                    height={116}
                    className="w-[80px] h-[80px] md:w-[96px] md:h-[96px] lg:w-[116px] lg:h-[116px] hover:scale-110 transition-transform duration-300"
                  />}
                </div>
                <div className="flex lg:flex-col  h-full">
                  <h3 className="font-bold mb-2 mt-1 text-[16px] md:text-[18px] lg:text-[22px] px-1">
                    {service.title}
                  </h3>
                  <p className="text-[18px] md:text-[20px] lg:text-[22px] px-1 lg:block hidden leading-[1.2] text-white/50">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
