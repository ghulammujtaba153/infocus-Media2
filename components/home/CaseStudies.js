"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import Loader from "../Loader"


const data = [
  {
    title: "EXPO",
    description: "Expo 2020 Dubai with the Federal Youth Authority",
    image: "/assets/Case studies/EXPO.jpg",
  },
  {
    title: "COVID-19",
    description: "Educating the World about COVID-19 with the Ministry of Health and Prevention",
    image: "/assets/Case studies/COVID-19.jpg",
  },
  {
    title: "MAESTRO 7x",
    description: "The rebranding campaign for 7X.",
    image: "/assets/Case studies/MAESTRO.jpg",
  },
];

const CaseStudies = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  // const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  // const fetchData = async () => {
  //   try {
  //     const res = await axios.get("/api/get-cases");
  //     setData(res.data.caseStudies || []);
  //   } catch (error) {
  //     console.error("Error fetching case studies:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  if(loading) return <div className='flex flex-col h-screen justify-center items-center'><Loader /></div>

  return (
    <section className="min-h-screen pb-0">
      <div className="px-4 lg:px-6 py-20">
        <div className="text-center mb-16">
          <motion.h1 
            className="ext-[40px] md:text-[64px] font-bold font-bandeins-strange text-black text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Case Studies
          </motion.h1>
        </div>
   

        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-10">
          {data.slice(0, 3).map((item, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col w-full lg:w-[568px]  md:w-[688px] sm:w-[342]" // Set fixed width
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Image Wrapper with Hover Group */}
              <div className="relative group overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[242px] md:h-[487px] lg:h-[480px]  object-cover transition-all duration-300 group-hover:blur-sm"
                />
                {/* Hover Button */}
                <Link
                  href={`/case-studies/${item._id}`}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer"
                >
                  <span className="bg-white text-[22px] text-black px-4 py-2 text-sm font-medium rounded shadow-md">
                    Read
                  </span>
                </Link>
              </div>

              {/* Title and Description */}
              <div className="mt-2 px-1">
                <h3 className="text-[44px] font-semibold text-black">
                  {item.title.toUpperCase()}
                </h3>
                <p className="text-black/50 text-[16px] md:text-[18px] lg:text-[22px] line-clamp-2">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-10 font-bandeins-strange"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link href={"/case-studies"} className="bg-black text-white px-6 py-3 cursor-pointer hover:bg-gray-200 hover:text-black hover:scale-105 transition-transform duration-300 rounded-md font-medium text-[16px] md:text-[18px] lg:text-[22px]">
            See All
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CaseStudies

// "use client"

// import Link from "next/link"
// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import axios from "axios"
// import Loader from "../Loader"

// // const data = [
// //   {
// //     title: "EXPO",
// //     description: "Expo 2020 Dubai with the Federal Youth Authority",
// //     image: "/assets/Case studies/EXPO.jpg",
// //   },
// //   {
// //     title: "COVID-19",
// //     description: "Educating the World about COVID-19 with the Ministry of Health and Prevention",
// //     image: "/assets/Case studies/COVID-19.jpg",
// //   },
// //   {
// //     title: "MAESTRO 7x",
// //     description: "The rebranding campaign for 7X.",
// //     image: "/assets/Case studies/MAESTRO.jpg",
// //   },
// // ]

// const CaseStudies = () => {
//   const [hoveredIndex, setHoveredIndex] = useState(null)
//   const [data, setData] = useState([])
//   const [loading, setLoading] = useState(true)


//   const fetchData = async () => {
//     try {
//       const res = await axios.get("/api/get-cases");
//       setData(res.data.caseStudies || []);
//     } catch (error) {
//       console.error("Error fetching case studies:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   if(loading) return <div className='flex flex-col h-screen justify-center items-center'><Loader /></div>

//   return (
//     <section className="min-h-screen">
//       <div className="px-4 lg:px-6 py-20">
//         <div className="text-center mb-16">
//           <motion.h1 
//             className="text-5xl font-bold font-bandeins-strange text-black text-center mb-12"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//           >
//             Case Studies
//           </motion.h1>
//         </div>

//         <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6">
//           {data.slice(0, 3).map((item, index) => (
//             <motion.div 
//               key={index} 
//               className="flex flex-col w-full lg:w-[500px] " // Set fixed width
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               {/* Image Wrapper with Hover Group */}
//               <div className="relative group overflow-hidden">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-[242px] md:h-[487px] lg:h-[402px] object-cover transition-all duration-300 group-hover:blur-sm"
//                 />
//                 {/* Hover Button */}
//                 <Link
//                   href={`/case-studies/${item._id}`}
//                   className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer"
//                 >
//                   <span className="bg-white text-[22px] text-black px-4 py-2 text-sm font-medium rounded shadow-md">
//                     Read
//                   </span>
//                 </Link>
//               </div>

//               {/* Title and Description */}
//               <div className="mt-2 px-1">
//                 <h3 className="text-[44px] font-semibold text-black">
//                   {item.title.toUpperCase()}
//                 </h3>
//                 <p className="text-black/50 text-[16px] md:text-[18px] lg:text-[22px] line-clamp-2">
//                   {item.description}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         <motion.div 
//           className="text-center mt-10 font-bandeins-strange"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           viewport={{ once: true }}
//         >
//           <Link href={"/case-studies"} className="bg-black text-white px-6 py-3 cursor-pointer hover:scale-105 transition-transform duration-300 rounded-md font-medium text-[16px] md:text-[18px] lg:text-[22px]">
//             See All
//           </Link>
//         </motion.div>
//       </div>
//     </section>
//   )
// }

// export default CaseStudies