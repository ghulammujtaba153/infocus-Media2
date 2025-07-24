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
      <div className="max-w-6xl mx-auto w-full px-4 pt-32 pb-8">
        <h2 className="text-center text-lg font-bold tracking-widest mb-2 mt-8">CASE STUDY</h2>
        <h1 className="text-center text-4xl md:text-6xl font-bold mb-8">{selected.title.toUpperCase()}</h1>
        <Image
          src={selected.image}
          alt={selected.title}
          width={1800}
          height={780}
          className="object-cover rounded mb-8 mx-auto w-full max-w-6xl lg:h-[780px]"
        />
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-1/2">
            <h3 className="text-xl md:text-2xl font-bold mb-2">{selected.detailTitle}</h3>
            
          </div>
          <div className="md:w-1/2 flex flex-col justify-center">
            <p className="text-lg md:text-xl font-medium mb-2">{selected.detailDescription}</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-8 text-center">OTHER CASE STUDIES</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {others.map((item, idx) => (
            <div key={idx} className="flex flex-col bg-gray-0 rounded shadow p-0">
              <Image src={item.image} alt={item.title} width={568} height={402} className="w-full h-[402px] object-cover rounded mb-6" />
              <h3 className="text-xl font-semibold mb-1">{item.title.toUpperCase()}</h3>
              <p className="text-gray-700 mb-2">{item.description}</p>
              
            </div>
          ))}
        </div>
        <div className="text-center mb-8">
          <button
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-500 hover:text-black hover:scale-105 transition-transform duration-300 font-medium text-lg"
            onClick={() => router.push("/case-studies")}
          >
            See All
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CaseStudyDetail; 