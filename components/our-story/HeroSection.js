"use client";
import React from "react";
import CountUp from "react-countup";

const HeroSection = () => {
  return (
    <div
      data-bg="dark"
      className="relative w-full h-[1400px] min-h-screen bg-black text-white overflow-hidden flex flex-col justify-between"
    >
      {/* Center Content */}
      <div
        data-bg="dark"
        className="flex flex-col h-[700px] items-center justify-center text-center z-10 px-2"
      >
        <div
          data-bg="dark"
          className="flex flex-col items-center justify-center leading-[1] mt-4"
        >
          <h1
            data-bg="dark"
            className="text-[29px] md:text-[50px] lg:text-[60px] font-bold"
          >
            At Infocus Media, we believe
          </h1>
          <h1
            data-bg="dark"
            className="text-[29px] md:text-[50px] lg:text-[60px] font-bold"
          >
            that organizations flourish when
          </h1>
          <h1
            data-bg="dark"
            className="text-[29px] md:text-[50px] lg:text-[60px] font-bold"
          >
            their teams are proactive and
          </h1>
          <h1
            data-bg="dark"
            className="text-[29px] md:text-[50px] lg:text-[60px] font-bold"
          >
            fueled by initiative.
          </h1>
        </div>

        <div className="flex flex-col items-center leading-[14px] sub-heading mt-2">
          <p
            data-bg="dark"
            className="mt-4 max-w-3xl text-[18px] md:text-[20px] lg:text-[22px]"
          >
            This commitment inspires us to unite with a vibrant,
            
          </p>
          <p
            data-bg="dark"
            className="mt-4 max-w-3xl text-[18px] md:text-[20px] lg:text-[22px]"
          >
            forward-thinking spirit, ensuring our meaningful
          </p>
          <p
            data-bg="dark"
            className="mt-4 max-w-3xl text-[18px] md:text-[20px] lg:text-[22px]"
          >
            contributions to sustainable development.
          </p>
        </div>
      </div>

      {/* Bottom Section with Stats + Image */}
      <div className="relative w-full flex-grow px-4">
        {/* Background Image */}
        <img
          src="/story-img1.png"
          alt="Green Blob"
          className="absolute bottom-0 left-0 w-full h-1/2 md:h-full object-cover z-0"
        />

        {/* Left Stats */}
        <div className="absolute top-[-10px] left-0 z-10 w-full md:w-1/3 pl-10 sm:pl-[60px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col ">
            <h1 data-bg="dark" className="text-[54px] md:text-[84px] lg:text-[100px] font-bold">
              <CountUp end={10} duration={3} />+
            </h1>
            <h2
              data-bg="dark"
              className="text-[16px] md:text-[18px] lg:text-[22px] text-center uppercase sub-heading"
            >
              Years of Experience
            </h2>
          </div>
          <div
            data-bg="dark"
            className="flex flex-col"
          >
            <h1 data-bg="dark" className="text-[54px] md:text-[84px] lg:text-[100px] font-bold">
              <CountUp end={75} duration={3} />+
            </h1>
            <h2
              data-bg="dark"
              className="text-[16px] md:text-[18px] lg:text-[22px] text-left uppercase sub-heading"
            >
              Clients
            </h2>
          </div>
        </div>

        {/* Right Stats */}
        <div className="absolute top-[-10px] md:right-6 z-10 w-full md:w-1/3 pr-[60px] flex flex-col md:flex-row items-end md:items-center justify-between gap-6">
          <div
            data-bg="dark"
            className="flex flex-col items-right"
          >
            <h1 data-bg="dark" className="text-[54px] md:text-[84px] lg:text-[100px] font-bold">
              <CountUp end={80} duration={3} />+
            </h1>
            <h2
              data-bg="dark"
              className="text-[16px] md:text-[18px] lg:text-[22px] text-right uppercase sub-heading"
            >
              Employees
            </h2>
          </div>
          <div
            data-bg="dark"
            className="flex flex-col items-right "
          >
            <h1 data-bg="dark" className="text-[54px] md:text-[84px] lg:text-[100px] font-bold">
              <CountUp end={3000} duration={3} separator="" />+
            </h1>
            <h2
              data-bg="dark"
              className="text-[16px] md:text-[18px] lg:text-[22px] uppercase text-right sub-heading"
            >
              Projects
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
