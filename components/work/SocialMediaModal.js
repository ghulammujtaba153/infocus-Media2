import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SocialMediaModal = ({ images, currentIndex, onClose }) => {
  const [index, setIndex] = useState(currentIndex);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="flex md:flex-row flex-col-reverse gap-2 px-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center md:flex-row flex-col-reverse justify-center gap-6 mt-4 ">
            <img
              src={images[index]}
              alt="Case Study"
              className="max-w-[340px] max-h-[340px] md:max-w-[500px] md:max-h-[500px] lg:max-w-[700px] lg:max-h-[650px] object-cover"
            />
          </div>

          <div className="mt-4 text-black flex items-center justify-between gap-20 text-sm px-4">
            {/* Prev Button */}
            <button
              onClick={prevImage}
              className="text-white cursor-pointer rounded-md px-2 py-2 bg-black hover:scale-110 transition-transform"
            >
              <FaChevronLeft className="text-white text-xl" />
            </button>

            {/* Counter */}
            <span className="text-black text-lg font-medium">
              {index + 1} / {images.length}
            </span>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="text-white cursor-pointer rounded-md px-2 py-2 bg-black hover:scale-110 transition-transform"
            >
              <FaChevronRight className="text-white text-xl" />
            </button>
          </div>
        </div>

        <div className="mt-[-40px] flex flex-col items-end  md:mt-4">
          <button
            onClick={onClose}
            className="text-black cursor-pointer bg-gray-200 px-4 rounded-sm text-3xl hover:scale-110 transition-transform"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaModal;
