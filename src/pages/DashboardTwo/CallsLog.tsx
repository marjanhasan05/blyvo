import { useState, type ReactNode } from "react";
import { Check, CheckCircle2, Download, Trash2 } from "lucide-react";
import CommonWrapper from "@/common/CommonWrapper";
import CallForwardingSetupModal from "@/components/dashboard/phone/CallForwardingSetupModal";
import type {
  CallForwardingSetupVariant,
  ForwardingOnlyIntent,
} from "@/components/dashboard/phone/CallForwardingSetupModal";
import {
  useDeleteCallForwardingMutation,
  useGetPhoneAnswersQuery,
  useUpdatePhoneAnswerMutation,
} from "@/store/features/calls-log/phone-answer.api";
import {
  whenToAnswerApiToUi,
  whenToAnswerUiToApi,
  type WhenToAnswerUiKey,
} from "@/store/features/calls-log/when-to-answer-map";
import { toast } from "sonner";

const CallsLog = () => {
  const { data: phoneAnswers, isLoading } = useGetPhoneAnswersQuery();
  const [updatePhoneAnswer, { isLoading: isSavingAnswer }] =
    useUpdatePhoneAnswerMutation();
  const [deleteCallForwarding, { isLoading: isDeleting }] =
    useDeleteCallForwardingMutation();

  const active = phoneAnswers?.[0];
  const hasPhone = Boolean(active?.phone_number);
  const hasForwarding = Boolean(active?.call_forwarding?.id);
  const showTwoOptionsOnly = hasForwarding;

  const [setupModalVariant, setSetupModalVariant] =
    useState<CallForwardingSetupVariant>("full_setup");
  const [forwardingOnlyIntent, setForwardingOnlyIntent] =
    useState<ForwardingOnlyIntent>("configure");
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);

  const selectedAnswer: WhenToAnswerUiKey = active?.when_to_answer
    ? whenToAnswerApiToUi(String(active.when_to_answer))
    : "always";

  const displaySow =
    active?.friendly_name?.trim() || active?.phone_number || "";

  const handleSelectAnswer = async (key: WhenToAnswerUiKey) => {
    if (!active?.id) return;
    if (key === "no_answer" && !hasForwarding) {
      setForwardingOnlyIntent("no_answer");
      setSetupModalVariant("forwarding_only");
      setIsSetupModalOpen(true);
      return;
    }
    try {
      await updatePhoneAnswer({
        id: active.id,
        body: { when_to_answer: whenToAnswerUiToApi(key) },
      }).unwrap();
    } catch {
      toast.error("Could not update answer preference");
    }
  };

  const handleDeleteForwarding = async () => {
    const cfId = active?.call_forwarding?.id;
    if (cfId == null) return;
    try {
      await deleteCallForwarding(cfId).unwrap();
      toast.success("Call forwarding removed");
    } catch {
      toast.error("Could not remove forwarding");
    }
  };

  const openFullSetup = () => {
    setSetupModalVariant("full_setup");
    setIsSetupModalOpen(true);
  };

  const openConfigureForwarding = () => {
    setForwardingOnlyIntent("configure");
    setSetupModalVariant("forwarding_only");
    setIsSetupModalOpen(true);
  };

  const alwaysOnLabel = selectedAnswer === "always" ? "Always On" : "Scheduled";

  return (
    <div className="py-16">
      <CommonWrapper>
        <div className="font-sans w-full space-y-6" data-aos="fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SOW Number Card */}
            <div
              className="bg-[#121214] rounded-3xl p-8 flex flex-col justify-between min-h-57.5 shadow-sm"
              style={{
                background: "rgba(157, 157, 157, .25)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              <div>
                <h2 className="text-white text-[28px] font-medium mb-4 tracking-wide">
                  Your SOW Number
                </h2>
                {isLoading ? (
                  <p className="text-[#8e8e93] text-[18px]">Loading…</p>
                ) : hasPhone ? (
                  <h1 className="text-[#00d0e6] text-[34px] font-normal tracking-wide mb-2 break-all">
                    {displaySow}
                  </h1>
                ) : (
                  <p className="text-[#8e8e93] text-[18px] mb-4">
                    No number assigned yet. Set up your number to receive calls.
                  </p>
                )}
              </div>
              {!hasPhone && !isLoading && (
                <button
                  type="button"
                  onClick={openFullSetup}
                  className="mt-4 w-full max-w-xs rounded-2xl bg-[#007aff] hover:bg-[#0062cc] text-white py-3 px-4 font-medium transition-colors"
                >
                  Set up SOW number
                </button>
              )}
              <p className="text-[#8e8e93] text-[18px] mt-4">
                Customers call this number to reach your AI assistant
              </p>
            </div>

            {/* Call Forwarding Card */}
            <div
              className="bg-[#121214] rounded-3xl p-8 min-h-57.5 flex flex-col shadow-sm"
              style={{
                background: "rgba(157, 157, 157, .25)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-white text-[28px] font-medium tracking-wide">
                  Call Forwarding
                </h2>
                <span className="bg-[#2c2c2e] text-[#a1a1a6] text-[18px] px-3 py-0.75 rounded-full font-medium">
                  Optional
                </span>
              </div>
              <p className="text-[#8e8e93] text-[18px] mb-6">
                Forward your existing number to BIZZY via your carrier
              </p>

              {!hasPhone ? (
                <p className="text-[#8e8e93] text-[15px]">
                  Provision a SOW number first.
                </p>
              ) : hasForwarding ? (
                <div className="flex flex-col gap-3">
                  <div className="rounded-2xl border border-white/10 bg-[#1a1a1c] px-4 py-3 flex items-center justify-between gap-3">
                    <p className="text-white text-[17px] font-medium truncate">
                      {active?.call_forwarding?.current_number}
                    </p>
                    <button
                      type="button"
                      onClick={handleDeleteForwarding}
                      disabled={isDeleting}
                      className="shrink-0 p-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400 transition-colors"
                      aria-label="Delete forwarding"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={openConfigureForwarding}
                  className="flex-1 w-full flex items-center justify-center rounded-2xl border border-dashed border-[#3a3a3c] bg-[#1a1a1c] hover:bg-[#242427] transition-colors cursor-pointer py-4"
                >
                  <span className="text-[#8e8e93] text-[18px] font-medium">
                    Configure Forwarding
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* When To Answer Card */}
          {hasPhone && (
            <div
              className="bg-[#121214] rounded-3xl p-8 shadow-sm pb-10"
              style={{
                background: "rgba(157, 157, 157, .25)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                <h2 className="text-white text-[28px] font-medium tracking-wide">
                  When To Answer
                </h2>
                <button
                  type="button"
                  className="flex items-center w-fit gap-2 bg-[#1a1a1c] hover:bg-[#242427] cursor-pointer border border-[#3a3a3c] px-4 py-2 rounded-full transition-colors text-white text-[14px] font-medium"
                >
                  <Check size={16} className="text-white stroke-3" />
                  <span>{alwaysOnLabel}</span>
                </button>
              </div>

              <div
                className={`grid grid-cols-1 ${showTwoOptionsOnly ? "md:grid-cols-2" : "md:grid-cols-2"} gap-4`}
              >
                <OptionCard
                  title="Always"
                  description="Answer all calls 24 / 7"
                  selected={selectedAnswer === "always"}
                  disabled={isSavingAnswer}
                  onClick={() => void handleSelectAnswer("always")}
                />
                {!showTwoOptionsOnly && (
                  <>
                    <OptionCard
                      title="After Hours"
                      description="Outside business hours"
                      selected={selectedAnswer === "after_hours"}
                      disabled={isSavingAnswer}
                      onClick={() => void handleSelectAnswer("after_hours")}
                    />
                    <OptionCard
                      title="Business Hours"
                      description="Only during set hours"
                      selected={selectedAnswer === "business_hours"}
                      disabled={isSavingAnswer}
                      onClick={() => void handleSelectAnswer("business_hours")}
                    />
                  </>
                )}
                <OptionCard
                  title="When I don't answer"
                  description="Forward your existing number"
                  selected={selectedAnswer === "no_answer"}
                  disabled={isSavingAnswer}
                  onClick={() => void handleSelectAnswer("no_answer")}
                  badge={
                    !hasForwarding ? (
                      <span className="bg-white text-black text-[12px] px-2.5 py-1 rounded-full font-semibold leading-none">
                        Setup needed
                      </span>
                    ) : null
                  }
                />
              </div>
            </div>
          )}

          {/* Recent Calls Section */}
          <div
            className="bg-[#121214] rounded-3xl p-8 shadow-sm"
            style={{
              background: "rgba(157, 157, 157, .25)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div className="flex justify-between items-start mb-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-white text-[28px] font-medium tracking-wide">
                    Recent Calls
                  </h2>
                </div>
                <p className="text-[#8e8e93] text-[18px]">
                  Call handled by your AI assistant
                </p>
              </div>
              <button
                type="button"
                className="flex items-center gap-2 bg-[#007aff] hover:bg-[#0062cc] text-white px-5 py-2.5 rounded-xl transition-all font-medium shadow-lg shadow-blue-500/20 active:scale-95 opacity-50 cursor-not-allowed"
                disabled
              >
                <Download size={18} />
                <span>Export</span>
              </button>
            </div>

            <p className="text-[#8e8e93] text-[16px] py-8 text-center">
              No recent calls yet.
            </p>
          </div>
        </div>
      </CommonWrapper>

      {isSetupModalOpen && (
        <CallForwardingSetupModal
          isOpen={isSetupModalOpen}
          setIsOpen={setIsSetupModalOpen}
          variant={setupModalVariant}
          forwardingOnlyIntent={forwardingOnlyIntent}
        />
      )}
    </div>
  );
};

function OptionCard({
  title,
  description,
  selected,
  onClick,
  disabled,
  badge,
}: {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  badge?: ReactNode;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => !disabled && onClick()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!disabled) onClick();
        }
      }}
      className={`p-6 rounded-2xl cursor-pointer relative bg-[#19191A] border transition-all ${
        selected ? "border-[#3D6980]" : "border-transparent"
      } ${disabled ? "opacity-60 pointer-events-none" : ""}`}
    >
      <div className="flex items-center gap-3 mb-2">
        <h3 className="text-white text-[17px] font-medium tracking-wide">
          {title}
        </h3>
        {badge}
      </div>
      <p className="text-[15px] text-[#8e8e93]">{description}</p>
      {selected && (
        <div className="absolute right-6 top-1/2 -translate-y-1/2">
          <CheckCircle2 size={24} className="text-[#E5E5EA] stroke-[1.5]" />
        </div>
      )}
    </div>
  );
}

export default CallsLog;
