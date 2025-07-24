"use client";

import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const FooterGlobe = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!video || !section) return;

    const handleLoadedData = () => {
      const duration = video.duration || 1;
      video.currentTime = 0;
      gsap.set(video, { currentTime: 0 });

      gsap.to(video, {
        currentTime: duration,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 50%",   // Start when section is 30% in viewport
          end: "top 10%",     // End quickly for a snappy effect
          scrub: 0.5,
          // pin: true,       // Uncomment if you want to pin the section
          id: "footer-globe-video",
          // markers: true,   // Uncomment for debugging
        },
      });
    };

    video.addEventListener("loadeddata", handleLoadedData);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-white py-20 overflow-hidden"
    >
      {/* Video background */}
      <video
        ref={videoRef}
        src="/Blob2.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        play
        playsInline
        preload="auto"
        
        style={{ willChange: 'transform' }}
      />

      {/* Text on top of video */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
        <p className="text-[16px] md:text-[18px] lg:text-[22px] font-bold uppercase tracking-widest mb-1">
          HAVE PROJECT IN MIND?
        </p>
        <div className="flex flex-col items-center justify-center leading-[.95]">
          <h1 className="text-[60px] md:text-[100px] font-bold">let's create</h1>
          <h1 className="text-[60px] md:text-[100px] font-bold">something great</h1>
          <h1 className="text-[60px] md:text-[100px] font-bold mb-2">together!</h1>
        </div>
        <div className="text-center mt-4">
          <Link href="/contacts" className="bg-black text-[16px] md:text-[18px] lg:text-[22px] text-white px-4 py-2 cursor-pointer hover:bg-gray-200 hover:text-black hover:scale-105 transition-transform duration-300 rounded-md font-medium inline-block">
            let's Go
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FooterGlobe;
