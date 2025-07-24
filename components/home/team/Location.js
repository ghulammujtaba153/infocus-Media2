import React from "react";

const Location = () => {
  return (
    <section className="bg-black py-4 px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-6">
      {/* Text Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between bg-white text-black p-4 md:p-12 h-[492px] md:h-[928px] lg:h-[950px]">
        <div className="mb-6">
          <h1 className=" pt-10 text-[30px] md:text-[100px] lg:text-[100px] font-bold leading-tight">Join</h1>
          <h1 className=" text-[30px] md:text-[100px] lg:text-[100px] font-bold leading-tight">OUR TEAM</h1>
        </div>

        <div className="text-[18px] md:text-[22px] leading-relaxed mb-8">
          <p
            className="max-w-full md:max-w-[728px]"
            style={{
              fontFamily: 'Almarai, sans-serif',
              fontWeight: 700,
              fontStyle: "bold",
              fontSize: "clamp(16px, 2vw, 22px)",
              lineHeight: "100%",
              letterSpacing: "3%",
              textTransform: "uppercase",
            }}
          >
            We're always on the lookout for brilliant minds and bold ideas. Check out our vacancies and apply for the one that suits you best!
          </p>
          <div>
            <a href="/careers">
              <button className="bg-black text-[18px] md:text-[22px] text-white px-4 md:px-6 py-3 hover:bg-white hover:text-black cursor-pointer transition-transform duration-300 rounded-md font-medium mt-4">
                Join the Team
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Map or Illustration Section */}
      <div className="w-full lg:w-1/2 relative cursor-pointer overflow-hidden h-[492px] md:h-[928px] lg:h-[950px]">
        <a href="https://maps.app.goo.gl/cWRBwXFomTUYaeYs9" target="_blank" rel="noopener noreferrer">
          <img src="/maps/map-pointer.png" className="w-full h-full object-cover" alt="map" />
          <img 
            src="/maps/map-address.png" 
            className="w-auto h-[80px] md:h-[100px] object-contain absolute top-2 left-2 md:left-4" 
            alt="map address" 
          />
        </a>
      </div>
    </section>
  );
};

export default Location;
