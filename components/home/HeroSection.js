"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const iframeRef = useRef(null);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  // Handle iframe loading
  useEffect(() => {
    const iframe = iframeRef.current;
    
    if (iframe) {
      const handleIframeLoad = () => {
        // Add delay to ensure video is ready
        setTimeout(() => {
          setIsHeroLoaded(true);
        }, 1500);
      };

      iframe.addEventListener('load', handleIframeLoad);
      
      return () => {
        iframe.removeEventListener('load', handleIframeLoad);
      };
    }
  }, []);

  // GSAP animations (separate useEffect to avoid interference)
  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;

    if (!section || !text) return;

    // Only run GSAP on large screens
    if (window.innerWidth < 1024) return;

    requestAnimationFrame(() => {
      const textWidth = text.getComputedTextLength();
      const viewportWidth = window.innerWidth;

      const startX = 0;
      const endX = -textWidth + viewportWidth * 0.9;

      gsap.set(text, { attr: { x: startX } });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=4000",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        })
        .to(text, {
          attr: { x: endX },
          ease: "power1.out"
        });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden"
    >
      
      {/* Background Video (Large Screens Only) */}
      {/* <video
        className="absolute inset-0 z-0 w-full h-full object-cover hidden lg:block"
        src="/media15.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      /> */}

      <div className="absolute  inset-0 w-full h-full hidden lg:block z-0">
        <iframe
          ref={iframeRef}
          src="https://player.vimeo.com/video/1104379953?autoplay=1&loop=1&muted=1&background=1"
          className="w-full h-full"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            border: 'none',
            objectFit: 'cover',
            minWidth: '100%',
            minHeight: '100%',
            transform: 'scale(1.02)' // Slight scale to ensure full coverage
          }}
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          title="Background Video"
        ></iframe>
      </div>

      {/* Large Screens: Animated Text Mask */}
      <div className="absolute inset-0 z-10 hidden lg:block">
        <div className="sticky top-0 h-screen">
          <svg
            className="absolute inset-0 pointer-events-none"
            width="100%"
            height="100%"
          >
            <defs>
              <mask
                id="text-mask"
                x="0"
                y="0"
                width="100%"
                height="100%"
                maskUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <text
                  ref={textRef}
                  x="0"
                  y="60%"
                  dominantBaseline="middle"
                  fontSize="54vw"
                  textAnchor="start"
                  fontWeight="bold"
                  fontFamily="inherit"
                  fill="black"
                  className="whitespace-nowrap"
                >
                  Infocus Media
                  <tspan fontSize="20vw" dy="-0.65em">
                    ®
                  </tspan>
                </text>
              </mask>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="white"
              mask="url(#text-mask)"
            />
          </svg>
        </div>
      </div>

      {/* md Screens */}
      <div className="hidden md:flex lg:hidden min-h-[160vh] h-screen bg-white flex-col justify-center items-center">
        <div className="mt-[-20vh] flex justify-center">
          <h1 className="text-[55vw] font-bold text-black rotate-90 leading-none">
            Infocus Media <span className="text-[3vw] align-super">®</span>
          </h1>
        </div>
      </div>

      {/* sm Screens */}
      <div className="md:hidden min-h-[330vh] h-screen bg-white flex flex-col justify-center items-center">
        <div className="flex mt-[-5vh] justify-center">
          <div className="transform rotate-90 origin-center">
            <h1 className="text-[100vw] font-bold text-black whitespace-nowrap">
              Infocus Media <span className="text-[15vw] align-super">®</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Loader - Only shows on large screens when video is loading */}
      {!isHeroLoaded && (
        <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center hidden lg:flex">
          {/* Logo */}
          <img
            src="/logo.png"
            alt="Infocus Media"
            className="w-80 max-w-[60vw] mb-8 object-contain"
          />
          
          {/* Loading Text */}
          <div className="text-center mb-8">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
              Loading Experience
            </h2>
            <p className="text-gray-300 text-sm md:text-base">
              Preparing your visual journey...
            </p>
          </div>

          {/* Loading Animation */}
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      )}

    </div>
  );
}