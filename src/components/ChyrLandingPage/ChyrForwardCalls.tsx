import { useState } from "react";
import CommonWrapper from "@/common/CommonWrapper";
import {
  // ArrowRight,
  Check,
  Copy,
  // MoveRight,
  Phone,
  PhoneCall,
} from "lucide-react";
import { useLandingConfig } from "@/contexts/LandingConfigContext";
// import bgImage from "@/assets/images/chyrImage/bgImage.png";

const StaticSwitch = ({
  defaultChecked = true,
}: {
  defaultChecked?: boolean;
}) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <>
      {/* Desktop (md and up) */}
      <div
        onClick={() => setChecked(!checked)}
        className={`hidden h-[20px] md:h-[26px] w-[40px] md:w-[48px] px-[2px] rounded-[20px] transition-all cursor-pointer md:flex items-center ${
          checked ? "justify-end" : "bg-[#9E9E9E] justify-start"
        }`}
        style={
          checked
            ? {
                background:
                  "linear-gradient(94deg, #66F9E6 7.78%, #305BC9 100%)",
              }
            : {}
        }
      >
        <div className="h-[16px] md:h-[22px] w-[16px] md:w-[22px] rounded-full bg-white transition-all shadow-sm" />
      </div>

      {/* Mobile */}
      <div
        onClick={() => setChecked(!checked)}
        className={`flex h-[20px] md:h-[26px] w-[40px] md:w-[48px] px-[2px] rounded-[20px] transition-all cursor-pointer md:hidden items-center ${
          checked ? "justify-end" : "bg-[#9E9E9E] justify-start"
        }`}
        style={
          checked
            ? {
                background:
                  "linear-gradient(275deg, #0005FF 40.61%, #393CF2 96.6%)",
              }
            : {}
        }
      >
        <div className="h-[16px] md:h-[22px] w-[16px] md:w-[22px] rounded-full bg-white transition-all shadow-sm" />
      </div>
    </>
  );
};

const ChyrForwardCalls = () => {
  const { config } = useLandingConfig();

  return (
    <section
      className="relative overflow-hidden bg-[#060D10]"
      // style={{
      //   backgroundImage: `url(${bgImage})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      <CommonWrapper>
        <div
          data-aos="zoom-in"
          className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16 p-2 sm:p-10 bg-[rgba(16,16,16,0.80)] rounded-[20px] shadow-[0_0_14px_0_rgba(0,0,0,0.06)] max-w-6xl mx-auto"
        >
          {/* Left Section - Interactive UI (Mockup LEFT) */}
          <div
            data-aos="fade-right"
            data-aos-delay="300"
            className="w-full max-w-[480px] mx-auto pointer-events-none order-2 lg:order-1 bg-[rgba(16,16,16,0.80)] rounded-[20px] p-6 sm:p-8 flex flex-col gap-5 border border-white/5"
          >
            {/* Your Hyln Number Card */}
            <div
              className="flex flex-col gap-2 p-[10px_20px] justify-between items-center rounded-[20px] self-stretch"
              style={{
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.19)",
                background:
                  "linear-gradient(95deg, rgba(0, 153, 232, 0.10) 19.51%, rgba(108, 211, 245, 0.10) 101.95%)",
              }}
            >
              <span className="text-[#9E9E9E] font-geist text-sm font-normal leading-normal">
                {config.texts.forwardCalls.numberTitle}
              </span>
              <div className="flex items-center gap-3">
                <span className="hidden md:block font-dm-sans text-[24px] md:text-[28px] font-medium leading-normal bg-[linear-gradient(95deg,#61EFDE_29.54%,#0099E8_69.88%)] bg-clip-text text-transparent">
                  (555) 123-4567
                </span>
                <span
                  className={`${config.colors.primaryStyle} md:hidden font-dm-sans text-[24px] md:text-[28px] font-medium leading-normal `}
                >
                  (555) 123-4567
                </span>

                <Copy className="w-5 h-5 text-white cursor-pointer" />
              </div>
              <span className="text-white font-geist text-sm md:text-[16px] font-normal leading-normal text-center">
                Forward your calls to this number
              </span>
            </div>

            {/* Forward calls from business line */}
            <div className="flex flex-col gap-2">
              <span className="text-[#555] font-geist text-sm md:text-base font-normal leading-normal ">
                Forward calls from your business line
              </span>
              <div className="flex flex-row items-center justify-center gap-3 sm:gap-5 py-3 px-4 rounded-[20px] bg-[#161616] self-stretch text-center sm:text-left">
                <div className="flex flex-col items-center sm:items-start">
                  <span className="text-[#9E9E9E] font-geist text-xs md:text-sm">
                    {config.texts.forwardCalls.businessLabel}
                  </span>
                  <span className="text-white font-dm-sans text-base md:text-xl font-medium">
                    (650) 250-0287
                  </span>
                </div>
                {/* <MoveRight
                  className={`${config.colors.primaryHost} w-6 h-6 hidden sm:block rotate-90 sm:rotate-0`}
                /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M18.5 12H5"
                    stroke="#53C5F2"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                    stroke="#53C5F2"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div className="flex flex-col items-center sm:items-start">
                  <span className="text-[#9E9E9E] font-geist text-xs md:text-sm">
                    {config.texts.forwardCalls.numberTitle}
                  </span>
                  <span className="hidden md:block font-dm-sans text-base md:text-xl font-medium bg-[linear-gradient(95deg,#61EFDE_29.54%,#0099E8_69.88%)] bg-clip-text text-transparent">
                    (555) 123-4567
                  </span>
                  <span
                    className={`${config.colors.primaryStyle} md:hidden font-dm-sans text-base md:text-xl font-medium `}
                  >
                    (555) 123-4567
                  </span>
                </div>
              </div>
            </div>

            {/* Incoming call section */}
            <div className="flex flex-col gap-3">
              <span className="text-[#555] font-geist text-sm md:text-base font-normal leading-normal">
                Incoming call
              </span>

              {/* Call row 1 */}
              <div className="flex px-4 py-3 justify-between items-center rounded-[16px] bg-[rgba(31,131,0,0.10)] self-stretch border border-green-900/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1FB300] rounded-full flex items-center justify-center shrink-0 animate-pulse">
                    <PhoneCall className="text-white w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-dm-sans text-base font-medium">
                      {config.texts.forwardCalls.activity1}
                    </span>
                    <span className="text-[#1FB300] font-geist text-xs md:text-sm ">
                      {config.texts.forwardCalls.activity1Sub}
                    </span>
                  </div>
                </div>
                <span className="text-[#555] font-geist text-sm">0:23</span>
              </div>

              {/* Call row 2 */}
              <div className="flex px-4 py-3 justify-between items-center rounded-[16px] bg-[#1a1a1a] self-stretch shadow-sm border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#333] rounded-full flex items-center justify-center shrink-0">
                    <Phone className="text-white w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-dm-sans text-base font-medium">
                      {config.texts.forwardCalls.activity2}
                    </span>
                    <span className="text-[#9E9E9E] font-geist text-xs md:text-sm">
                      Completed successfully
                    </span>
                  </div>
                </div>
                <span className="text-[#9E9E9E] font-geist text-sm">
                  2m ago
                </span>
              </div>
            </div>

            {/* Transfer urgent row */}
            <div className="flex items-center justify-between px-5 py-3 rounded-[16px] border border-white/10 bg-[#121212]">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-white" />
                <span className="text-white font-geist text-sm md:text-base">
                  {config.texts.forwardCalls.alertText}
                </span>
              </div>
              <StaticSwitch />
            </div>
          </div>

          {/* Right Section - Content (Text RIGHT) */}
          <div
            data-aos="fade-left"
            data-aos-delay="600"
            className="w-full max-w-[480px] mx-auto order-1 lg:order-2"
          >
            <span
              className={`text-[#43C8FB] text-sm md:text-lg font-medium mb-4 block font-geist`}
            >
              Step 3
            </span>
            <h2 className="font-dm-sans font-medium text-[28px] md:text-[36px] leading-tight text-white mb-6">
              {config.texts.forwardCalls.title}
            </h2>
            <p className="text-[#9E9E9E] font-dm-sans text-base md:text-lg mb-10 leading-relaxed">
              {config.texts.forwardCalls.desc}
            </p>

            <div className="space-y-6">
              {config.texts.forwardCalls.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div
                      className={`w-5 h-5 rounded-full border border-[#43C8FB] flex items-center justify-center`}
                      // style={{ borderColor: config.colors.secondaryHex }}
                    >
                      <Check
                        className={`text-[#43C8FB]`}
                        size={12}
                        strokeWidth={3}
                      />
                    </div>
                  </div>
                  <p className="font-dm-sans text-base md:text-lg leading-snug">
                    <span className="text-white font-medium">{step.title}</span>
                    <span className="text-[#9E9E9E]">{step.content}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CommonWrapper>
    </section>
  );
};

export default ChyrForwardCalls;
