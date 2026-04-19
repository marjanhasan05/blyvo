import CommonWrapper from "@/common/CommonWrapper";
import tellLogo from "@/assets/images/chyrImage/golla.svg";
import { Check, Globe } from "lucide-react";
import { useLandingConfig } from "@/contexts/LandingConfigContext";

const ChyrHylnSteps = () => {
  const { config } = useLandingConfig();

  return (
    <section className="relative overflow-hidden py-12 md:py-20 lg:py-24 bg-[#060D10]">
      <CommonWrapper>
        {/* Heading Section */}
        <div
          className="text-center mb-10 md:mb-16 lg:mb-20 px-4 md:px-6"
          data-aos="fade-up"
        >
          <h2 className="font-dm-sans font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[48px] leading-tight text-white">
            {config.brandName}’s ready to answer your
            <br className="hidden md:block" />
            <span className={config.colors.primaryHost}>
              {" "}
              {config.texts.hylnSteps.titlePart1}{" "}
              <span className="text-white">
                {config.texts.hylnSteps.titlePart2}
              </span>{" "}
              3 simple steps:
            </span>
          </h2>
        </div>

        {/* Main Content: Card + Steps Info */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Interactive Card */}
          <div
            data-aos="fade-right"
            data-aos-delay="300"
            className="w-full lg:w-1/2"
          >
            {/* Gradient border wrapper */}
            <div className="w-full rounded-2xl p-[2px] bg-gradient-to-r from-[#61EFDE] via-[#0099E8] to-[#61EFDE]">
              {/* Inner card content */}
              <div className="w-full h-full rounded-2xl overflow-hidden bg-[#060D10]">
                <div className="p-5 sm:p-6 md:p-8 flex flex-col">
                  {/* Import from website */}
                  <div className="mb-8">
                    <label className="block font-geist text-base md:text-lg text-white mb-4">
                      {config.texts.hylnSteps.importLabel}
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                      {/* Input container */}
                      <div className="flex-grow flex items-center gap-3 px-4 md:px-5 bg-[#121214] rounded-[20px]">
                        <Globe
                          className="text-[#9E9E9E] flex-shrink-0"
                          size={20}
                        />
                        <input
                          type="text"
                          placeholder={config.texts.hylnSteps.importPlaceholder}
                          className="bg-transparent border-none outline-none text-base md:text-lg text-[#9E9E9E] w-full py-2.5 md:py-4 placeholder:text-[#9E9E9E]/70"
                        />
                      </div>

                      {/* Import Button */}
                      <button className="bg-white text-black px-6 md:px-8 py-2.5 md:py-4 rounded-[20px] text-sm md:text-base font-medium hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center w-full sm:w-auto">
                        Import
                      </button>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-[1px] flex-grow bg-[#9E9E9E]/30"></div>
                    <span className="text-[#9E9E9E] text-sm md:text-base uppercase font-medium">
                      or
                    </span>
                    <div className="h-[1px] flex-grow bg-[#9E9E9E]/30"></div>
                  </div>

                  {/* Tell me about business */}
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-6">
                      {/* Desktop Logo */}
                      <img
                        src={tellLogo}
                        alt={`${config.brandName} Logo`}
                        className="hidden md:block w-[60px] h-[60px] md:w-[80px] md:h-[80px] object-contain"
                      />
                      {/* Mobile Logo Badge */}
                      <div
                        className={`block md:hidden w-[60px] h-[60px] md:w-[80px] md:h-[80px] bg-transparent rounded-full p-1.5`}
                        style={{
                          border: `1px solid ${config.colors.brandColorHex}`,
                        }}
                      >
                        <div
                          className={`h-full w-full ${config.colors.brandColor} rounded-full`}
                        ></div>
                      </div>
                    </div>
                    <h3 className="hidden md:block text-xl md:text-2xl lg:text-[24px] font-medium mb-3 bg-[linear-gradient(95deg,#61EFDE_29.54%,#0099E8_69.88%)] bg-clip-text text-transparent">
                      {config.texts.hylnSteps.tellMeAbout}
                    </h3>
                    <h3
                      className={`${config.colors.primaryHost} md:hidden text-xl md:text-2xl font-medium mb-3 inline-block`}
                    >
                      {config.texts.hylnSteps.tellMeAbout}
                    </h3>
                    <p className="text-[#9E9E9E] text-sm md:text-base mb-8 max-w-md mx-auto">
                      {config.texts.hylnSteps.tellMeSub}
                    </p>
                    <button
                      className="px-6 md:px-8 py-3 rounded-[20px] text-white font-medium hover:opacity-90 transition-opacity cursor-pointer text-sm md:text-base w-full sm:w-auto"
                      style={{
                        borderRadius: "20px",
                        border:
                          config.brandName === "BLYVO"
                            ? "none"
                            : "1px solid rgba(255, 255, 255, 0.19)",
                        background:
                          config.brandName === "BLYVO"
                            ? config.colors.brandColorHex
                            : config.colors.buttonGradientBorder,
                        boxShadow: config.colors.buttonShadow,
                      }}
                    >
                      Start Conversation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Steps Information */}
          <div
            data-aos="fade-left"
            data-aos-delay="600"
            className="w-full lg:w-1/2 flex items-center"
          >
            <div className="w-full">
              <span className="text-[#43C8FB] text-sm md:text-base lg:text-lg font-medium mb-2 inline-block">
                Step 1
              </span>
              <h3 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-medium mb-4 leading-tight">
                {config.texts.hylnSteps.step1Title}
              </h3>
              <p className="text-[#9E9E9E] font-dm-sans text-base md:text-lg mb-8 leading-relaxed">
                {config.texts.hylnSteps.step1Desc}
              </p>

              <div className="space-y-6">
                {config.texts.hylnSteps.step1List.map((step, idx) => (
                  <div key={idx} className="flex gap-3 md:gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-5 h-5 rounded-full border border-[#43C8FB] flex items-center justify-center">
                        <Check
                          size={12}
                          strokeWidth={3}
                          className="text-[#43C8FB]"
                        />
                      </div>
                    </div>
                    <p className="font-dm-sans text-sm sm:text-base md:text-lg leading-snug">
                      <span className="text-white font-medium">
                        {step.title}
                      </span>
                      <span className="text-[#9E9E9E]">{step.content}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CommonWrapper>
    </section>
  );
};

export default ChyrHylnSteps;
