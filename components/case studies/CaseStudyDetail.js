"use client"
import React from "react";
import Footer from "../home/Footer";
import { useRouter, useSearchParams } from "next/navigation";
import data from "./caseStudyData";
import Image from "next/image";

const CaseStudyDetail = ({ caseStudy }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const selected = data.find((item) => item.title === title) || data[0];
  const others = data.filter((item) => item.title !== selected.title).slice(0, 3);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* The Navbar will always remain at the top. No logic to hide or pop up. */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-32 pb-8">
        <h2 className="text-center text-sm sm:text-base lg:text-lg font-bold tracking-widest mb-2 mt-4 sm:mt-8">CASE STUDY</h2>
        <h1 className="text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 px-2">{selected.title.toUpperCase()}</h1>
        <div className="w-full mb-6 sm:mb-8">
          <Image
            src={selected.image}
            alt={selected.title}
            width={1920}
            height={800}
            className="rounded w-full h-auto"
          />
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
            <div className="lg:w-1/2">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">{selected.detailTitle}</h3>
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-relaxed">{selected.detailDescription}</p>
            </div>
          </div>
          
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 text-center">OTHER CASE STUDIES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            {others.map((item, idx) => (
              <div key={idx} className="flex flex-col bg-gray-0 rounded shadow p-0">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  width={568} 
                  height={402} 
                  className="w-full h-[250px] sm:h-[300px] lg:h-[402px] object-cover rounded mb-4 sm:mb-6" 
                />
                <div className="px-2 sm:px-4 pb-4">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-1 sm:mb-2">{item.title.toUpperCase()}</h3>
                  <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mb-8">
            <button
              className="bg-black text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded hover:bg-gray-500 hover:text-black hover:scale-105 transition-transform duration-300 font-medium text-base sm:text-lg lg:text-xl"
              onClick={() => router.push("/case-studies")}
            >
              See All
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CaseStudyDetail;