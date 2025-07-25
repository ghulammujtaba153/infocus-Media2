"use client";

import React, { useState, useEffect } from "react";


const ExpertiseSection = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const words = ["design", "imagine"];

  useEffect(() => {
    const currentWordText = words[currentWord];

    if (!isDeleting) {
      // Typing effect
      if (displayText.length < currentWordText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentWordText.slice(0, displayText.length + 1));
        }, 150);
        return () => clearTimeout(timeout);
      } else {
        // Wait before starting to delete
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1000);
        return () => clearTimeout(timeout);
      }
    } else {
      // Deleting effect
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        // Move to next word
        setIsDeleting(false);
        setCurrentWord((prev) => (prev + 1) % words.length);
      }
    }
  }, [displayText, isDeleting, currentWord, words]);

  return (
    <section className="relative top-0 w-full bg-white pt-20 mb-20">
      <div className=" w-full overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-[40px] md:text-[64px] font-bold mb-6">
            CORE EXPERTISE
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row   items-center justify-center w-full overflow-hidden">
          <div className="w-full lg:w-1/3 h-screen">
            <video
              src="/expertise-animations/Visuals.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          <div className="w-full lg:w-1/3 h-screen">
            <video
              src="/expertise-animations/Animation2.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          <div className="w-full lg:w-1/3 h-screen">
            <video
              src="/expertise-animations/Production_3.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>

        {/* <div className="w-full  relative flex flex-col lg:flex-row items-center gap-10 pt-[-100px] bg-white">
          
          <div className="sticky top-0 w-full lg:w-1/2 ">
            <img
              src="/assets/portrait.png"
              alt="Portrait"
              className="max-w-xl w-full  object-contain pt-[-58px]"
            />
          </div>

          
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <p className="text-green-500 text-5xl">"</p>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              The future
            </h1>
            <h1 className="text-3xl md:text-5xl font-bold  leading-tight mb-4">
              belongs to those
            </h1>
            <h1 className="text-3xl md:text-5xl font-bold  leading-tight mb-4">
              who can <span className="text-green-500">{displayText}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-green-500"
              >
                |
              </motion.span>
            </h1>

            <p className="font-bold text-base">
              – H.H. Sheikh Mohammed bin Rashid Al Maktoum
            </p>
          </div>
        </div> */}

        
      </div>
    </section>
  );
};

export default ExpertiseSection;
