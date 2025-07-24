import React from "react";

const data = [
  {
    image: "/assets/Team/image-4.png",
    occupation: "Founder & CEO",
    name: "Hassan Mohammad Al Najjar",
  },
  {
    image: "/assets/Team/image-1.png",
    occupation: "Accountant",
    name: "Sami Ayyoub",
  },
  {
    image: "/assets/Team/image-5.png",
    occupation: "Art Director",
    name: "Harry Hussin",
  },
  {
    image: "/assets/Team/image-2.png",
    occupation: "Project Manager",
    name: "Reem Ramzi",
  },
  {
    image: "/assets/Team/image-6.png",
    occupation: "Human Resources Manager",
    name: "Omnia Hassan",
  },
  {
    image: "/assets/Team/image-9.png",
    occupation: "Content Manager",
    name: "Aysar Nourdine",
  },
  {
    image: "/assets/Team/image-7.png",
    occupation: "Animation Team Lead",
    name: "Sohib Hesham",
  },
  {
    image: "/assets/Team/image-8.png",
    occupation: "Social Media Manager",
    name: "Ahmed Aljazzar",
  },
  {
    image: "/assets/Team/image-10.png",
    occupation: "Social Media Manager",
    name: "Haroorn Waheed",
  },
];

const MembersSection = () => {
  return (
    <div className="flex flex-col w-full px-2 py-20">
      <div className="flex flex-col items-center justify-center w-full relative">
        {/* Shadow wrapper */}
       <div
  className="absolute w-[400px] h-[400px] rounded-full z-0 pointer-events-none"
  style={{
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    boxShadow: `
      20px 0 40px -5px rgba(0, 128, 0, 0.6),     /* Green shadow on right */
      25px 0 40px -10px rgba(255, 255, 0, 0.5),  /* Yellow shadow on right */
      0 -15px 25px -10px rgba(255, 255, 0, 0.4), /* Top yellow glow */
      0 15px 25px -10px rgba(0, 128, 0, 0.4)     /* Bottom green glow */
    `,
  }}
/>



        {/* Image */}
        <div className="relative w-[400px] h-[400px] rounded-full overflow-hidden z-10">
          <img
            src={data[0].image}
            alt="/"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center justify-center w-full mt-4 z-10 leading-[.95]">
          <p className="text-[16px] md:text-[28px] lg:text-[22px] text-black/50 font-semibold">
            {data[0].occupation}
          </p>
          <h1 className="font-bold text-[29px] md:text-[64px] max-w-[620px] items-center text-center break-words whitespace-normal leading-tight">
            {data[0].name}
          </h1>
        </div>
      </div>

      {/* Other members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-2 mt-20">
        {data.slice(1).map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-full"
          >
            <img
              src={item.image}
              alt="/"
              className="w-[300px] h-[300px] md:w-[350px] md:h-[350px] lg:max-w-[400px] lg:max-h-[400px] rounded-full"
            />
            <p className="text-[16px] md:text-[28px] lg:text-[22px] text-black/50 font-semibold mt-4">
              {item.occupation}
            </p>
            <h1 className="font-bold text-[29px] md:text-[39px]">
              {item.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersSection;
