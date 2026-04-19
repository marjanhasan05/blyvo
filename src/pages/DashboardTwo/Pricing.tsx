import CommonWrapper from "@/common/CommonWrapper";
import { useGetSubscriptionPlansQuery, useGetEligibleFeaturesQuery } from "@/store/features/subscription/subscription.api";
import { SubscriptionPlan } from "@/store/features/subscription/subscription.types";
import { useState } from "react";
import { X } from "lucide-react";

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
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [isTrialEnabled, setIsTrialEnabled] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);


  const { data: plans, isLoading, isError } = useGetSubscriptionPlansQuery();
  const { data: eligibleFeaturesRes, isLoading: isEligibleLoading } = useGetEligibleFeaturesQuery({
    planId: selectedPlanId as number,
  },{
    skip: !selectedPlanId
  });
  
  console.log("eligibleFeaturesRes", eligibleFeaturesRes);
  const eligibleData = eligibleFeaturesRes?.data;

  const filteredPlans = plans?.filter((plan) => {
    if (billingCycle === "monthly") return plan.interval === "month";
    if (billingCycle === "yearly") return plan.interval === "year";
    return true;
  });

  const renderFeatures = (plan: SubscriptionPlan, isActive: boolean) => {
    // Combine marketing features and details names for display
    const features = [
      // ...plan.marketing_features,
      ...plan.features_details.map((f) => f.name),
    ];
 

    if (features.length === 0) {
      // Fallback features if none provided by API (to match UI design placeholders)
      return (
        <ul className="space-y-4 mb-10 flex-1">
          {["AI voice answering", "Basic intake", "Booking / lead creation"].map(
            (feature, i) => (
              <li
                key={i}
                className={`flex items-start gap-3 text-[15px] ${isActive ? "text-white" : "text-[#D1D5DB]"}`}
              >
                <CheckIcon active={isActive} />
                <span>{feature}</span>
              </li>
            ),
          )}
        </ul>
      );
    }

    return (
      <ul className="space-y-4 mb-10 flex-1">
        {features.map((feature, i) => (
          <li
            key={i}
            className={`flex items-start gap-3 text-[15px] ${isActive ? "text-white" : "text-[#D1D5DB]"}`}
          >
            <CheckIcon active={isActive} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full text-white font-sans h-full min-h-screen flex items-center justify-center">
        <div className="text-xl animate-pulse">Loading plans...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full text-white font-sans h-full min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">
          Failed to load pricing plans. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full text-white font-sans h-full min-h-screen">
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
              {/* <button
                className={`px-5 py-2.5 rounded-full flex items-center gap-2 cursor-pointer text-sm font-medium transition-all ${billingCycle === "yearly" ? "bg-[#2A2A2A] text-white shadow-sm" : "text-[#858585] hover:text-white"}`}
                onClick={() => setBillingCycle("yearly")}
              >
                Yearly
                <span className="bg-white text-black text-[11px] font-bold px-2 py-0.5 rounded-full">
                  Save 10%
                </span>
              </button> */}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">
            {filteredPlans?.map((plan) => {
              const isPro = plan.name.toLowerCase() === "pro";

              if (isPro) {
                return (
                  <div
                    key={plan.id}
                    className="rounded-[25px] p-px bg-linear-to-br from-[#06b6d4]/40 via-[#3b82f6]/20 to-transparent flex flex-col h-full relative z-0"
                  >
                    <div
                      className="bg-[#111111] rounded-3xl p-8 flex flex-col h-full relative overflow-hidden"
                      style={{
                        background: "rgba(157, 157, 157, .25)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                      }}
                    >
                      {/* Background Blurs */}
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
                        <h3 className="text-[22px] font-medium tracking-tight mb-2 capitalize">
                          {plan.name}
                        </h3>
                        <p className="text-[#9CA3AF] text-[15px] leading-snug mb-8 h-10">
                          {plan.description ||
                            "Best for growing businesses that need more capacity"}
                        </p>

                        <div className="mb-2">
                          <div className="flex items-end gap-1">
                            <span className="text-[40px] font-semibold leading-none tracking-tight">
                              ${parseFloat(plan.price).toFixed(0)}
                            </span>
                            <span className="text-[#9CA3AF] text-base font-medium mb-1">
                              /{plan.interval === "month" ? "mo" : "yr"}
                            </span>
                          </div>
                        </div>

                        <div className="mb-8">
                          {plan.features_details[0] && (
                            <>
                              <p className="text-white text-[15px] font-medium mb-1">
                                {plan.features_details[0].value} Calls included
                                {/* {plan.features_details[0].name.toLowerCase()} */}
                              </p>
                              <p className="text-[#9CA3AF] text-sm">
                                ${plan.features_details[0].overage_price}/call
                                overage
                              </p>
                            </>
                          )}
                        </div>

                        {renderFeatures(plan, true)}

                        {/* <button className="w-full bg-[#3F3F46]/60 hover:bg-[#3F3F46] border border-white/5 text-[#E4E4E7] font-semibold text-[15px] py-3.5 rounded-[14px] transition-colors mt-auto shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                          Current Plan
                        </button> */}
                        <button 
                          onClick={() => {
                            setSelectedPlanId(plan.id);
                            setIsModalOpen(true);
                          }}
                          className="w-full cursor-pointer bg-white hover:bg-[#E5E5E5] text-black font-semibold text-[15px] py-3.5 rounded-[14px] transition-colors mt-auto"
                        >
                          Switch to Plan
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={plan.id}
                  className="bg-[#111111] border border-white/5 rounded-3xl p-8 flex flex-col h-full hover:border-white/10 transition-colors"
                  style={{
                    background: "rgba(157, 157, 157, .25)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                  }}
                >
                  <h3 className="text-[28px] font-medium tracking-tight mb-2 capitalize">
                    {plan.name}
                  </h3>
                  <p className="text-[#9E9E9E] text-[15px] leading-snug mb-8 h-10">
                    {plan.description ||
                      "Perfect for small businesses just getting started"}
                  </p>

                  <div className="mb-2">
                    <div className="flex items-end gap-1">
                      <span className="text-[40px] font-semibold leading-none tracking-tight">
                        ${parseFloat(plan.price).toFixed(0)}
                      </span>
                      <span className="text-[#858585] text-base font-medium mb-1">
                        /{plan.interval === "month" ? "mo" : "yr"}
                      </span>
                    </div>
                  </div>

                  <div className="mb-8">
                    {plan.features_details[0] && (
                      <>
                        <p className="text-white text-[15px] font-medium mb-1">
                          {plan.features_details[0].value} Calls included
                          {/* {plan.features_details[0].name.toLowerCase()} */}
                        </p>
                        <p className="text-[#858585] text-sm">
                          ${plan.features_details[0].overage_price}/call overage
                        </p>
                      </>
                    )}
                  </div>

                  {renderFeatures(plan, false)}

                  <button 
                    onClick={() => {
                      setSelectedPlanId(plan.id);
                      setIsModalOpen(true);
                    }}
                    className="w-full cursor-pointer bg-white hover:bg-[#E5E5E5] text-black font-semibold text-[15px] py-3.5 rounded-[14px] transition-colors mt-auto"
                  >
                    Switch to Plan
                  </button>
                </div>
              );
            })}

            {/* If there's an Enterprise plan or if we want to keep the custom one */}
            {/* {!filteredPlans?.some(
              (p) => p.name.toLowerCase() === "enterprise",
            ) && (
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
            )} */}
          </div>
        </div>
      </CommonWrapper>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 w-full max-w-md relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-semibold mb-6">Customize Plan</h2>

            {isEligibleLoading ? (
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-white/10 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-white/10 rounded col-span-2"></div>
                      <div className="h-2 bg-white/10 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-white/10 rounded"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {eligibleData?.is_eligible_for_trial && (
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="font-medium text-[15px]">Try free trial</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={isTrialEnabled}
                        onChange={(e) => setIsTrialEnabled(e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#06B6D4]"></div>
                    </label>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-medium mb-4">Additional Features</h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {eligibleData?.features?.map((feature) => (
                      <label key={feature.id} className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-white/5">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-[#06B6D4] focus:ring-[#06B6D4] focus:ring-offset-gray-800 cursor-pointer"
                            checked={selectedFeatures.includes(feature.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedFeatures([...selectedFeatures, feature.id]);
                              } else {
                                setSelectedFeatures(selectedFeatures.filter(id => id !== feature.id));
                              }
                            }}
                          />
                        </div>
                        <span className="text-[15px] select-none">{feature.name}</span>
                      </label>
                    ))}
                    {(!eligibleData?.features || eligibleData.features.length === 0) && (
                      <p className="text-gray-400 text-sm">No additional features available.</p>
                    )}
                  </div>
                </div>

                <button className="w-full cursor-pointer bg-[#06B6D4] hover:bg-[#0891b2] text-white font-semibold text-[15px] py-3.5 rounded-[14px] transition-colors mt-6 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  Confirm Selection
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;
