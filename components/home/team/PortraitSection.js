"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CaseStudies from "../CaseStudies";
import ExpertiseSection from "../ExpertiseSection";

const SheikhCaseStudiesContainer = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const words = ["design", "imagine"];

  // Typing effect
  useEffect(() => {
    const currentWordText = words[currentWord];

    if (!isDeleting) {
      if (displayText.length < currentWordText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentWordText.slice(0, displayText.length + 1));
        }, 150);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setCurrentWord((prev) => (prev + 1) % words.length);
      }
    }
  }, [displayText, isDeleting, currentWord, words]);

  return (
    <section className="relative w-full ">
      {/* Expertise section covers portrait first */}
      <div className="min-h-screen w-full">
        <ExpertiseSection />
      </div>

      {/* Sticky Portrait Section */}
      <div className="sticky sm:top-0 sm:min-h-[400vh] lg:min-h-[60vh] w-full z-10  min-h-[20vh]  ">
        <div className="w-full h-full flex flex-col-reverse lg:flex-row lg:items-center  gap-10 bg-white">
          <div className="w-full md:w-1/2 md:h-full h-auto flex items-left justify-start">
            <img
              src="/assets/portrait.png"
              alt="Portrait"
              className="w-full md:h-full h-auto object-contain"
            />
          </div>

          <div className="w-full lg:w-1/2 text-black font-bandeins-strange px-2 text-center lg:text-left text-[40px] md:text-[64px] lg:text-[100px] leading-[.95]">
            <h1 className="text-green-500 font-bold leading-[.99]">“</h1>
            <h1 className="font-bold">The future</h1>
            <h1 className="font-bold">belongs to those</h1>
            <h1 className="font-bold">
              who can <span className="text-green-500">{displayText}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-green-500"
              >
                |
              </motion.span>
            </h1>
            <p className="font-bold text-[22px] leading-3 uppercase mt-6">
              H.H. Sheikh Mohammed bin Rashid Al Maktoum
            </p>
          </div>
        </div>
      </div>

      {/* <div className=" sm:hidden flex flex-col items-end justify-end  min-h-[240vh] w-full -z-10 ">
        <div className="w-full h-full flex flex-col-reverse  gap-10 bg-white">
          <div className="w-full h-auto md:h-screen flex items-left justify-start">
            <img
              src="/assets/portrait.png"
              alt="Portrait"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="w-full text-black font-bandeins-strange px-2 text-center lg:text-left text-[40px] md:text-[64px] lg:text-[100px] leading-[.95]">
            <h1 className="text-green-500 font-bold leading-[.99]">“</h1>
            <h1 className="font-bold">The future</h1>
            <h1 className="font-bold">belongs to those</h1>
            <h1 className="font-bold">
              who can <span className="text-green-500">{displayText}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-green-500"
              >
                |
              </motion.span>
            </h1>
            <p className="font-bold text-[22px] leading-6 uppercase mt-6">
              H.H. Sheikh Mohammed bin Rashid Al Maktoum
            </p>
          </div>
        </div>
      </div> */}

      {/* Foreground Sections */}
      <div className="relative z-10">
        {/* Then portrait is revealed and CaseStudies scrolls over */}
        <div className="min-h-screen bg-white">
          <CaseStudies />
        </div>
      </div>

      
    </section>
  );
};

export default SheikhCaseStudiesContainer;
