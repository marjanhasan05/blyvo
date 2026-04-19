import CommonWrapper from "@/common/CommonWrapper";
import { useState } from "react";

const CheckIcon = ({ active }: { active?: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 mt-0.5"
  >
    <circle cx="9" cy="9" r="8.5" stroke={active ? "#06B6D4" : "#4B5563"} />
    <path
      d="M5.5 9.5L8 12L12.5 6"
      stroke={active ? "#06B6D4" : "#4B5563"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  return (
    <div className="w-full text-white   font-sans h-full min-h-screen">
      <CommonWrapper>
        <div data-aos="fade-up" className="px-6 py-12 md:py-16">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
            <div className="max-w-2xl">
              <h1 className="text-[32px] font-medium tracking-tight mb-3">
                Change Your Plan
              </h1>
              <p className="text-[#9CA3AF] text-[15px] leading-relaxed max-w-xl">
                Select a new plan to switch to. You'll be redirected to Stripe
                to confirm the change.
              </p>
            </div>

            <div className="flex items-center p-1 bg-[#1A1A1A] rounded-full border border-white/5">
              <button
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${billingCycle === "monthly" ? "bg-[#2A2A2A] text-white shadow-sm" : "text-[#858585] hover:text-white"}`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </button>
              <button
                className={`px-5 py-2.5 rounded-full flex items-center gap-2 cursor-pointer text-sm font-medium transition-all ${billingCycle === "yearly" ? "bg-[#2A2A2A] text-white shadow-sm" : "text-[#858585] hover:text-white"}`}
                onClick={() => setBillingCycle("yearly")}
              >
                Yearly
                <span className="bg-white text-black text-[11px] font-bold px-2 py-0.5 rounded-full">
                  Save 10%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">
            {/* Card 1: Starter */}
            <div
              className="bg-[#111111] border border-white/5 rounded-3xl p-8 flex flex-col h-full hover:border-white/10 transition-colors"
              style={{
                background: "rgba(157, 157, 157, .25)",

                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              <h3 className="text-[28px] font-medium tracking-tight mb-2">
                Change Your Plan
              </h3>
              <p className="text-[#9E9E9E] text-[15px] leading-snug mb-8 h-10">
                Perfect for small businesses just getting started
              </p>

              <div className="mb-2">
                <div className="flex items-end gap-1">
                  <span className="text-[40px] font-semibold leading-none tracking-tight">
                    $79
                  </span>
                  <span className="text-[#858585] text-base font-medium mb-1">
                    /mo
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-white text-[15px] font-medium mb-1">
                  70 calls included
                </p>
                <p className="text-[#858585] text-sm">$1.50/call overage</p>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {[
                  "AI voice answering",
                  "Basic intake",
                  "Booking / lead creation",
                  "Call logs & transcripts",
                  "Calendar integration",
                  "SMS confirmations",
                  "Limited call volume",
                ].map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[#D1D5DB] text-[15px]"
                  >
                    <CheckIcon active={false} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full bg-white hover:bg-[#E5E5E5] text-black font-semibold text-[15px] py-3.5 rounded-[14px] transition-colors mt-auto">
                Switch to Plan
              </button>
            </div>

            {/* Card 2: Pro (Highlighted) */}
            <div className="rounded-[25px] p-px bg-linear-to-br from-[#06b6d4]/40 via-[#3b82f6]/20 to-transparent flex flex-col h-full relative z-0">
              <div
                className="bg-[#111111] rounded-3xl p-8 flex flex-col h-full relative overflow-hidden"
                style={{
                  background: "rgba(157, 157, 157, .25)",

                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                {/* Background Blurs provided by user */}
                <div className="absolute inset-0 pointer-events-none z-0">
                  <div
                    style={{
                      width: "233px",
                      height: "241px",
                      position: "absolute",
                      left: "-60px",
                      top: "-58px",
                      backgroundColor: "#00144A",
                      filter: "blur(90px)",
                      borderRadius: "50%",
                    }}
                  />
                  <div
                    style={{
                      width: "219px",
                      height: "226px",
                      position: "absolute",
                      right: "-63px",
                      top: "-86px",
                      backgroundColor: "#00312C",
                      filter: "blur(90px)",
                      borderRadius: "50%",
                    }}
                  />
                  <div
                    style={{
                      width: "359px",
                      height: "372px",
                      position: "absolute",
                      left: "-85px",
                      bottom: "-51px",
                      backgroundColor: "#091A35",
                      filter: "blur(90px)",
                      borderRadius: "372px",
                    }}
                  />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="text-[22px] font-medium tracking-tight mb-2">
                    Pro
                  </h3>
                  <p className="text-[#9CA3AF] text-[15px] leading-snug mb-8 h-10">
                    Best for growing businesses that need more capacity
                  </p>

                  <div className="mb-2">
                    <div className="flex items-end gap-1">
                      <span className="text-[40px] font-semibold leading-none tracking-tight">
                        $119
                      </span>
                      <span className="text-[#9CA3AF] text-base font-medium mb-1">
                        /mo
                      </span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="text-white text-[15px] font-medium mb-1">
                      200 calls included
                    </p>
                    <p className="text-[#9CA3AF] text-sm">$1.30/call overage</p>
                  </div>

                  <ul className="space-y-4 mb-10 flex-1">
                    {[
                      "Everything in Starter",
                      "Advanced intake logic",
                      "Conditional routing",
                      "Industry-specific workflows",
                      "Webhook / API integrations",
                      "Advanced analytics",
                    ].map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-white text-[15px]"
                      >
                        <CheckIcon active={true} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="w-full bg-[#3F3F46]/60 hover:bg-[#3F3F46] border border-white/5 text-[#E4E4E7] font-semibold text-[15px] py-3.5 rounded-[14px] transition-colors mt-auto shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                    Current Plan
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Enterprise */}
            <div
              className="bg-[#111111] border border-white/5 rounded-3xl p-8 flex flex-col h-full hover:border-white/10 transition-colors"
              style={{
                background: "rgba(157, 157, 157, .25)",

                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              <h3 className="text-[22px] font-medium tracking-tight mb-2">
                Enterprise
              </h3>
              <p className="text-[#858585] text-[15px] leading-snug mb-8 h-10">
                For businesses needing unlimited access and custom solutions
              </p>

              <div className="mb-2 flex items-end">
                <span className="text-[40px] font-semibold leading-none tracking-tight h-10 flex items-center">
                  Custom
                </span>
              </div>

              <div className="mb-8">
                <p className="text-white text-[15px] font-medium mb-1 pt-1 opacity-0 select-none">
                  Spacer
                </p>
                <p className="text-[#858585] text-sm opacity-0 select-none">
                  Spacer
                </p>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {[
                  "Multi-location",
                  "Multiple agents",
                  "Role-based access",
                  "Native integrations",
                  "Custom workflows",
                  "Priority infrastructure",
                ].map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[#D1D5DB] text-[15px]"
                  >
                    <CheckIcon active={false} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full bg-white hover:bg-[#E5E5E5] text-black font-semibold text-[15px] py-3.5 rounded-[14px] transition-colors mt-auto">
                Speak with Sales
              </button>
            </div>
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Pricing;
