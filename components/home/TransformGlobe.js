"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TransformGlobe = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [showInsightContent, setShowInsightContent] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    video.pause();

    let lastScrollY = window.scrollY;
    let lastTimestamp = performance.now();
    let ticking = false;
    let scrollTimeout;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame((timestamp) => {
          const rect = section.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          if (rect.top < windowHeight && rect.bottom > 0) {
            // Calculate scroll speed and playback rate
            const scrollDelta = Math.abs(window.scrollY - lastScrollY);
            const timeDelta = timestamp - lastTimestamp;
            lastScrollY = window.scrollY;
            lastTimestamp = timestamp;

            const playbackRate = Math.min(2, Math.max(0.5, scrollDelta / (timeDelta / 16)));
            video.playbackRate = playbackRate;
            video.play();

            // Pause if no scroll
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              video.pause();
            }, 150);

            // Check video progress and switch content
            const progress = video.currentTime / video.duration;
            if (progress >= 0.6) {
              setShowInsightContent(true);
            } else {
              setShowInsightContent(false);
            }
          } else {
            video.pause();
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="TransformGlobe relative h-screen bg-white overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        src="/Blob2.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
        autoPlay
        loop
        style={{ willChange: "transform" }}
      />

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 transition-opacity duration-500">
        {!showInsightContent ? (
          <>
            {/* TransformGlobe content */}
            <p className="md:text-[18px] text-[16px] lg:text-[22px] font-bold uppercase text-black text-center mb-4">
              WE don’t see brands, we see possibilities
            </p>
            <div className="flex flex-col leading-[.95]">
              <h1 className="text-[40px] md:text-[65px] lg:text-[100px] font-bold text-black text-center mb-2">
                We transform ideas
              </h1>
              <h1 className="text-[40px] md:text-[65px] lg:text-[100px] font-bold text-black text-center">
                into visual stories
              </h1>
            </div>
            <p className="md:text-[18px] text-[16px] lg:text-[22px] font-bold uppercase text-black text-center mt-4">
              and we know what your brand needs
            </p>
          </>
        ) : (
          <>
            {/* InsightGlobe content */}
            <p className="md:text-[18px] text-[16px] lg:text-[22px] font-bold uppercase text-black text-center mb-4">
              we make your audience feel, think, and act
            </p>
            <div className="flex flex-col leading-[.95]">
              <h1 className="text-[40px] md:text-[65px] lg:text-[100px] font-bold text-black text-center mb-2">
                We turn insights
              </h1>
              <h1 className="text-[40px] md:text-[65px] lg:text-[100px] font-bold text-black text-center">
                into impact
              </h1>
            </div>
            <Link
              href="/contacts"
              className="mt-5 bg-black rounded-md text-white px-8 py-4 font-bold cursor-pointer hover:bg-gray-200 hover:text-black hover:scale-105 transition-transform text-center"
            >
              Let's Get Started
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default TransformGlobe;