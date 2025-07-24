"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TopSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!video || !section) return;

    // Load video metadata before measuring duration
    const handleLoadedData = () => {
      setIsVideoLoaded(true);

      requestAnimationFrame(() => {
        const videoDuration = video.duration || 6;

        video.pause();
        video.currentTime = 0;

        gsap.set(video, { currentTime: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=3000",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            id: "top-globe",
            // markers: true, // uncomment for debugging
          },
        });

        tl.to(video, {
          currentTime: videoDuration,
          ease: "none"
        });
      });
    };

    video.addEventListener("loadeddata", handleLoadedData);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative w-full ">
      <section
        ref={sectionRef}
        className="relative h-screen bg-white overflow-hidden"
        style={{ zIndex: 1 }}
      >
        {/* Scroll-controlled video */}
        <video
          ref={videoRef}
          src="/final2.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        />

        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-3/4 max-w-[580px] max-h-[68px] mb-6 object-contain"
          />
          <p className="uppercase text-white text-[16px] md:text-[18px] lg:text-[22px]">
            Born from Emirati soil, our roots run deep
          </p>
          <p className="uppercase text-white text-[16px] md:text-[18px] lg:text-[22px]">
            and our vision soars high
          </p>
        </div>
      </section>

      
    </div>
  );
};

export default TopSection;