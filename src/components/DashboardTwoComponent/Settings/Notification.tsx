import { ConfirmDangerModal } from "@/pages/Dashboard/DashboardSettings";
import React, { useState } from "react";

const Notification: React.FC = () => {
  const [emailNotify, setEmailNotify] = useState(false);
  const [dangerAction, setDangerAction] = useState<string | null>(null);

  return (
    <div className="w-full mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 font-sans" >
      {/* Notifications Card */}
      <div className=" rounded-3xl md:rounded-4xl p-6 md:p-8 flex flex-col border border-white/5 relative z-10 w-full overflow-hidden"  style={{
        background: "rgba(157, 157, 157, .25)",

        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}>
        <h2 className="text-xl md:text-2xl font-medium text-white mb-6 md:mb-8">
          Notifications
        </h2>

        <div className="flex justify-between items-start mb-8 md:mb-10 gap-4">
          <div>
            <h3 className="text-white text-[15px] md:text-base font-medium mb-1.5">
              Email after every call
            </h3>
            <p className="text-gray-400 text-[13px] md:text-[14px] leading-relaxed">
              Get notified with caller details and intake and
              <br className="hidden md:block" /> after each completed call
            </p>
          </div>
          <button
            onClick={() => setEmailNotify(!emailNotify)}
            className={`w-11 h-6 rounded-full flex items-center transition-colors shrink-0 mt-0.5 ${emailNotify ? "bg-white" : "bg-[#404044]"}`}
          >
            <div
              className={`w-4.5 h-4.5 rounded-full shadow-sm transition-transform ${emailNotify ? "translate-x-5.75 bg-black" : "translate-x-0.75 bg-[#95969A]"}`}
            />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4 mt-auto">
          <div className="bg-[#1c1d22]/80 rounded-xl md:rounded-[20px] p-4 md:p-5 flex flex-col min-h-22.5 md:min-h-25 justify-center transition-colors border border-transparent hover:border-white/5">
            <h4 className="text-gray-400 text-[13px] md:text-[14px] font-medium mb-1.5">
              SMS alerts
            </h4>
            <p className="text-gray-500 text-[12px] md:text-[13px]">
              Coming Soon
            </p>
          </div>
          <div className="bg-[#1c1d22]/80 rounded-xl md:rounded-[20px] p-4 md:p-5 flex flex-col min-h-22.5 md:min-h-25 justify-center transition-colors border border-transparent hover:border-white/5">
            <h4 className="text-gray-400 text-[13px] md:text-[14px] font-medium mb-1.5">
              Weekly summary
            </h4>
            <p className="text-gray-500 text-[12px] md:text-[13px]">
              Coming Soon
            </p>
          </div>
        </div>
      </div>

      {/* Danger Zone Card */}
      <div className=" rounded-3xl md:rounded-4xl p-6 md:p-8 flex flex-col border border-white/5 relative z-10 w-full xl:max-w-none"  style={{
        background: "rgba(157, 157, 157, .25)",

        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}>
        <h2 className="text-xl md:text-2xl font-medium text-red-500 mb-2">
          Danger Zone
        </h2>
        <p className="text-red-400/80 text-[13px] md:text-[14px] mb-8">
          Irreversible actions
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <button
            onClick={() => setDangerAction("Cancel Subscription")}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-red-500/40 hover:bg-red-500/10 transition-colors text-red-500 text-[13px] md:text-sm font-medium"
          >
            Cancel Subscription
          </button>
          <button
            onClick={() => setDangerAction("Delete Account")}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-red-500/40 hover:bg-red-500/10 transition-colors text-red-500 text-[13px] md:text-sm font-medium"
          >
            Delete Account
          </button>
        </div>
      </div>
      {dangerAction && (
        <ConfirmDangerModal
          open={!!dangerAction}
          setOpen={(v) => !v && setDangerAction(null)}
          action={dangerAction}
          onConfirm={() => setDangerAction(null)}
        />
      )}
    </div>
  );
};

export default Notification;
