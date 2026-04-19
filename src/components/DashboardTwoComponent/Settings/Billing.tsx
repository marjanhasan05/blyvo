import React, { useState } from "react";
import { CheckCircle, ExternalLink } from "lucide-react";
import BillingDialog from "@/components/dashboard/settings/BillingDialog";

const Billing: React.FC = () => {
  const [isBillingDialogOpen, setIsBillingDialogOpen] = useState(false);

  return (
    <>
      <div
        className="w-full mt-8 bg-[#111216] md:bg-[#13141a] rounded-3xl p-6 md:p-8 flex flex-col gap-6 md:gap-8 border border-white/5 font-sans"
        style={{
          background: "rgba(157, 157, 157, .25)",

          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-medium text-white">Billing</h2>
        <div className="flex items-center gap-2 bg-[#22242b] border border-white/5 py-1.5 px-3 md:px-4 rounded-full">
          <CheckCircle size={16} className="text-gray-300" />
          <span className="text-gray-200 text-[13px] md:text-sm font-medium">
            Trialing
          </span>
        </div>
      </div>

      {/* Main Billing Card */}
      <div
        className="bg-[#181a20] rounded-3xl md:rounded-4xl p-6 md:p-8 border border-white/5"
        style={{
          background: "rgba(100, 100, 100, .10)",

          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Current Plan Section */}
        <div className="flex justify-between items-start mb-6 md:mb-8">
          <div>
            <p className="text-gray-400 text-sm md:text-[15px] font-medium mb-1.5">
              Current Plan
            </p>
            <div className="flex items-center gap-3">
              <h3 className="text-white text-xl md:text-[28px] leading-none font-medium">
                Pro
              </h3>
              <span className="text-gray-400 text-xl md:text-2xl font-light">
                —
              </span>
              <h3 className="text-white text-xl md:text-[28px] leading-none font-medium">
                $199/mo
              </h3>
            </div>
            <p className="text-gray-400 text-[13px] md:text-sm mt-3 font-medium">
              <span className="text-gray-200">200</span> calls Included
              <span className="mx-2">•</span>
              <span className="text-gray-200">$1.30</span>/call after
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsBillingDialogOpen(true)}
            className="bg-[#262831] hover:bg-[#32343e] transition-colors text-white text-sm font-medium py-2.5 px-5 rounded-xl md:rounded-2xl"
          >
            Manage
          </button>
        </div>

        {/* Trial ends Progress Bar */}
        <div className="w-full bg-linear-to-r from-[#62f2e5] via-[#4db1f4] to-[#4068ef] py-3.5 md:py-4 rounded-[14px] md:rounded-[18px] flex items-center justify-center mb-6 md:mb-8">
          <span className="text-white text-sm md:text-[15px] font-medium">
            Trial ends Feb 1
          </span>
        </div>

        {/* Plan Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <div
            className="bg-[#1f2127] rounded-2xl md:rounded-3xl p-6 border border-white/5 hover:border-white/10 transition-colors"
            style={{
              background: "rgba(157, 157, 157, .25)",

              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <p className="text-gray-400 text-[11px] md:text-xs font-semibold tracking-wider uppercase mb-3">
              Plan includes
            </p>
            <div className="text-white text-3xl md:text-[32px] font-medium mb-2">
              200
            </div>
            <p className="text-gray-400 text-[13px] md:text-sm">
              calls per month
            </p>
          </div>
          <div
            className="bg-[#1f2127] rounded-2xl md:rounded-3xl p-6 border border-white/5 hover:border-white/10 transition-colors"
            style={{
              background: "rgba(157, 157, 157, .25)",

              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <p className="text-gray-400 text-[11px] md:text-xs font-semibold tracking-wider uppercase mb-3">
              Trial ends
            </p>
            <div className="text-white text-3xl md:text-[32px] font-medium mb-2">
              Feb 1
            </div>
            <p className="text-gray-400 text-[13px] md:text-sm">
              billing starts
            </p>
          </div>
        </div>
      </div>

      {/* Footer Text & Link */}
      <div className="flex flex-col items-center space-y-4 pt-2 pb-2">
        <p className="text-gray-400 text-[13px] md:text-[14px]">
          Call usage tracking begins after your free trial
        </p>
        <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-[13px] md:text-sm font-medium">
          <ExternalLink size={15} />
          View invoices
        </button>
      </div>
      </div>

      <BillingDialog open={isBillingDialogOpen} setOpen={setIsBillingDialogOpen} />
    </>
  );
};

export default Billing;
