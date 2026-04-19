// import CommonWrapper from "@/common/CommonWrapper";
// import { useLandingConfig } from "@/contexts/LandingConfigContext";

// const ChyrReliableEmployee = () => {
//   const { config } = useLandingConfig();
//   const features = config.texts.reliableEmployee.features;

//   return (
//     <section className="py-6 md:py-20 bg-[#0a0a0a]">
//       <CommonWrapper>
//         {/* Header */}
//         <div className="text-center mb-16 lg:mb-20" data-aos="fade-up">
//           <h2 className="font-dm-sans font-medium text-[32px] md:text-[48px] leading-tight text-center mb-6">
//             <span className="text-white text-center">{config.texts.reliableEmployee.titlePrefix}</span>
//             <span className={`text-[${config.colors.secondaryHex}]`} style={{ color: config.colors.secondaryHex }}>
//               most <br /> reliable employee.
//             </span>
//           </h2>
//           <p className="text-[#9E9E9E] font-dm-sans text-sm md:text-2xl font-normal text-center max-w-[900px] mx-auto leading-normal px-4">
//             Always on. Never tired. Perfectly trained. Never calls in sick.
//           </p>
//         </div>

//         {/* Grid */}
//         <div
//           data-aos="fade-up"
//           data-aos-delay="200"
//           className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[${config.colors.secondaryHex}] border-dashed rounded-[16px] overflow-hidden`}
//           style={{ borderColor: config.colors.secondaryHex }}
//         >
//           {features.map((feature, idx) => (
//             <div
//               key={idx}
//               className={`p-5 lg:p-6 min-h-fit md:min-h-76 border-[${config.colors.secondaryHex}] border-dashed transition-all hover:bg-[#FAFBFB]/50
//                                 /* Mobile borders */
//                                 border-b last:border-b-0
//                                 /* Tablet borders (2 cols) */
//                                 md:[&:nth-child(2n)]:border-l md:[&:nth-child(2n+1)]:border-r-0
//                                 md:[&:nth-child(-n+4)]:border-b md:[&:nth-child(n+5)]:border-b-0
//                                 /* Desktop borders (3 cols) */
//                                 lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n-1)]:border-r lg:[&:nth-child(3n-2)]:border-r
//                                 lg:[&:nth-child(-n+3)]:border-b lg:[&:nth-child(n+4)]:border-b-0
//                             `}
//               style={{ borderColor: config.colors.secondaryHex }}
//             >
//               <div className="mb-6">
//                 <feature.Icon
//                   className={config.colors.primaryStyle}
//                   size={34}
//                   strokeWidth={1.5}
//                 />
//               </div>
//               <h3 className="font-dm-sans font-medium text-lg md:text-[28px] text-white mb-4">
//                 {feature.title}
//               </h3>
//               <p className="font-geist text-base md:text-lg text-[#9E9E9E] leading-relaxed hover:text-white">
//                 {feature.content}
//               </p>
//             </div>
//           ))}
//         </div>
//       </CommonWrapper>
//     </section>
//   );
// };

// export default ChyrReliableEmployee;

import CommonWrapper from "@/common/CommonWrapper";
import { useLandingConfig } from "@/contexts/LandingConfigContext";
// import bgImage from "@/assets/images/chyrImage/bgImage.png";

const ChyrReliableEmployee = () => {
  const { config } = useLandingConfig();
  const features = config.texts.reliableEmployee.features;

  return (
    <section
      className="relative overflow-hidden py-6 md:py-20 bg-[#060D10]"
      // style={{
      //   backgroundImage: `url(${bgImage})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      <CommonWrapper>
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20" data-aos="fade-up">
          <h2 className="font-dm-sans font-medium text-[32px] md:text-[48px] leading-tight text-center mb-6 bg-[linear-gradient(95deg,#61EFDE_29.54%,#0099E8_69.88%)] bg-clip-text text-transparent">
            Your restaurant's most <br /> reliable employee.
          </h2>

          <p className="text-[#9E9E9E] font-dm-sans text-sm md:text-2xl font-normal text-center max-w-[900px] mx-auto leading-normal px-4">
            Always on. Never tired. Perfectly trained. Never calls in sick.
          </p>
        </div>

        {/* Grid */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className={`
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            gap-4
            md:gap-0
            md:border md:border-dashed md:rounded-[16px] md:overflow-hidden
          `}
          style={{ borderColor: "#43C8FB" }}
        >
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`
                p-5 lg:p-6 min-h-fit md:min-h-76 
                transition-all hover:bg-[#FAFBFB]/10
                
                /* MOBILE: individual boxes */
                border rounded-[16px]
                
                /* REMOVE mobile border when md starts */
                md:rounded-none md:border-0
                
                /* DESKTOP GRID BORDERS (unchanged logic) */
                md:border-dashed md:border-[#43C8FB]
                
                /* Tablet (2 cols) */
                md:[&:nth-child(2n)]:border-l 
                md:[&:nth-child(2n+1)]:border-r-0
                md:[&:nth-child(-n+4)]:border-b 
                md:[&:nth-child(n+5)]:border-b-0

                /* Desktop (3 cols) */
                lg:[&:nth-child(3n)]:border-r-0 
                lg:[&:nth-child(3n-1)]:border-r 
                lg:[&:nth-child(3n-2)]:border-r
                lg:[&:nth-child(-n+3)]:border-b 
                lg:[&:nth-child(n+4)]:border-b-0
              `}
              style={{ borderColor: `#43C8FB` }}
            >
              <div className="mb-6">
                <feature.Icon
                  size={34}
                  strokeWidth={1.5}
                  style={{ color: `#43C8FB` }}
                />
              </div>

              <h3 className="font-dm-sans font-medium text-lg md:text-[28px] text-white mb-4">
                {feature.title}
              </h3>

              <p className="font-geist text-base md:text-lg text-[#9E9E9E] leading-relaxed ">
                {feature.content}
              </p>
            </div>
          ))}
        </div>
      </CommonWrapper>
    </section>
  );
};

export default ChyrReliableEmployee;
