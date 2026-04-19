import IntakeQuestionModal from "@/components/dashboard/DashboardComponent/AboutPageComponent/AboutPageModal/IntakeQuestionModal";
import {
  useGetAgentPhoneNumbersQuery,
  useGetIntakeQuestionsQuery,
} from "@/store/features/agent/agent.api";
import { Plus, Phone, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";

const ChatSparkleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM12 13.5L11 10.5L8 9.5L11 8.5L12 5.5L13 8.5L16 9.5L13 10.5L12 13.5Z" />
  </svg>
);

const AgentGreetings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const INITIAL_DISPLAY_COUNT = 3;

  const { data: phoneNumbers = [], isLoading: _isPhoneLoading } =
    useGetAgentPhoneNumbersQuery();
  const {
    data: questions,
    isLoading,
    isError,
    error,
  } = useGetIntakeQuestionsQuery();

  const visibleQuestions = showAllQuestions
    ? questions
    : questions?.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMoreQuestions =
    questions && questions.length > INITIAL_DISPLAY_COUNT;

  return (
    <div className="w-full text-white font-sans mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] xl:grid-cols-[1.3fr_1fr] gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Greeting Card */}
          <div
            className="bg-[#121212] rounded-3xl p-8 border border-white/4"
            style={{
              background: "rgba(157, 157, 157, .25)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-10">
              <div>
                <h2 className="text-[22px] font-medium tracking-tight mb-2">
                  Greeting
                </h2>
                <p className="text-white/40 text-[15px]">
                  How your agent greets callers
                </p>
              </div>
              <button className="bg-white text-black font-semibold rounded-xl px-5 py-2.5 flex items-center gap-2.5 hover:bg-white/90 transition-colors shrink-0">
                <ChatSparkleIcon className="w-4 h-4" />
                <span className="text-[15px]">AI Suggestions</span>
              </button>
            </div>

            <div className="flex justify-between items-baseline mb-4">
              <h3 className="text-white/90 text-[16px] tracking-wide">
                Greeting Message
              </h3>
              <span className="text-white/40 text-[13px]">128 characters</span>
            </div>

            <p className="text-white/40 text-[15px] leading-relaxed max-w-[480px]">
              Enter a transfer number above to configure when your agent should
              escalate calls to a human.
            </p>
          </div>

          {/* Intake Questions Card */}
          <div
            className="bg-[#121212] rounded-3xl p-8 border border-white/4 flex flex-col min-h-105 md:min-h-0"
            style={{
              background: "rgba(157, 157, 157, .25)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div className="mb-8">
              <h2 className="text-[22px] font-medium tracking-tight mb-2">
                Intake Questions
              </h2>
              <p className="text-white/40 text-[15px]">
                Questions your agent asks during booking calls
              </p>
            </div>

            {/* Content area: loading, error, empty, or list */}
            <div className="flex-1 min-h-[220px] border border-dashed border-white/8 rounded-3xl flex flex-col py-4 px-2 mb-8 bg-[#ffffff]/1 overflow-hidden">
              {isLoading ? (
                <div className="flex-1 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-white/40 animate-spin" />
                </div>
              ) : isError ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                  <AlertCircle className="w-6 h-6 text-red-400/60 mb-2" />
                  <p className="text-white/60 text-[15px] mb-1">
                    Failed to load questions
                  </p>
                  <p className="text-white/40 text-[14px]">
                    {error && "data" in error
                      ? (error.data as any)?.message || "Please try again"
                      : "An unexpected error occurred"}
                  </p>
                </div>
              ) : questions && questions.length > 0 ? (
                <>
                  <div className="flex-1 overflow-y-auto px-4 space-y-2">
                    {visibleQuestions?.map((q) => (
                      <div
                        key={q.id}
                        className="bg-white/5 rounded-xl p-3 border border-white/5"
                      >
                        {/* Question Header */}
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-white/90 text-[15px] font-medium">
                            {q.question}
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {q.is_required && (
                              <span className="text-[10px] uppercase tracking-wider text-red-400/80 bg-red-400/10 px-2 py-0.5 rounded-full">
                                Required
                              </span>
                            )}
                            {q.disqualification_rules?.disqualifying_value && (
                              <span className="text-[10px] uppercase tracking-wider text-amber-400/80 bg-amber-400/10 px-2 py-0.5 rounded-full">
                                Disqualifies
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Answer Type & When To Ask */}
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <span className="text-white/40 text-[12px] capitalize bg-white/5 px-2 py-0.5 rounded-md">
                            {q.answer_type.replace("_", " ")}
                          </span>
                          <span className="text-white/30 text-[12px]">
                            {q.when_to_ask === "all_calls"
                              ? "All calls"
                              : q.when_to_ask === "specific_services"
                                ? "Specific services"
                                : "Tagged services"}
                          </span>
                        </div>

                        {/* Multiple Choice Options - show ALL */}
                        {q.answer_type === "multiple_choice" &&
                          q.multiple_choice.length > 0 && (
                            <div className="mt-2">
                              <span className="text-white/30 text-[11px] block mb-1">
                                Options:
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {q.multiple_choice.map((option, idx) => (
                                  <span
                                    key={idx}
                                    className="text-white/50 text-[11px] bg-white/5 px-2 py-0.5 rounded-full border border-white/5"
                                  >
                                    {option}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                        {/* Specific Services - show ALL */}
                        {q.when_to_ask === "specific_services" &&
                          q.specific_services.length > 0 && (
                            <div className="mt-2">
                              <span className="text-white/30 text-[11px] block mb-1">
                                Applies to services:
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {q.specific_services.map((service, idx) => (
                                  <span
                                    key={idx}
                                    className="text-white/50 text-[11px] bg-white/5 px-2 py-0.5 rounded-full border border-white/5"
                                  >
                                    {service}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                        {/* Tagged Services - show ALL */}
                        {q.when_to_ask === "tagged_services" &&
                          q.specific_tagged.length > 0 && (
                            <div className="mt-2">
                              <span className="text-white/30 text-[11px] block mb-1">
                                Applies to tags:
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {q.specific_tagged.map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="text-white/50 text-[11px] bg-white/5 px-2 py-0.5 rounded-full border border-white/5"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                        {/* Disqualification Message */}
                        {q.disqualification_rules?.message_to_caller && (
                          <div className="mt-2 text-amber-400/60 text-[11px] italic border-l-2 border-amber-400/30 pl-2">
                            Disqualify message: "
                            {q.disqualification_rules.message_to_caller}"
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* See More / See Less Button */}
                  {hasMoreQuestions && (
                    <div className="px-4 pt-2">
                      <button
                        onClick={() => setShowAllQuestions(!showAllQuestions)}
                        className="text-white/60 text-[13px] hover:text-white/90 transition-colors underline-offset-2 hover:underline"
                      >
                        {showAllQuestions
                          ? "See less"
                          : `See all ${questions.length} questions`}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center py-12 px-6">
                  <p className="text-white/60 text-[15px] mb-2 font-medium text-center">
                    No intake questions configured yet
                  </p>
                  <p className="text-white/40 text-[14px] text-center">
                    Add questions your agent will ask during booking calls
                  </p>
                </div>
              )}
            </div>

            {/* Add Questions Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-black font-semibold rounded-xl px-5 py-2.5 flex items-center gap-2 hover:bg-white/90 transition-colors"
              >
                <Plus className="w-[18px] h-[18px] stroke-[2.5]" />
                <span className="text-[15px]">Add Questions</span>
              </button>
            </div>
          </div>

          {/* Modal */}
          <IntakeQuestionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>

        {/* Right Column */}
        <div className="h-full">
          {/* Live Transfer Card */}
          <div
            className="bg-[#121212] rounded-3xl p-8 border border-white/4 h-full flex flex-col"
            style={{
              background: "rgba(157, 157, 157, .25)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div className="mb-12">
              <h2 className="text-[22px] font-medium tracking-tight mb-2">
                Live Transfer
              </h2>
              <p className="text-white/40 text-[15px]">
                What happens when your agent can't help
              </p>
            </div>

            <div className="mb-14">
              <h3 className="text-white/70 text-[17px] mb-3">
                Phone Number Required
              </h3>
              <p className="text-white/40 text-[15px] leading-relaxed mb-6 max-w-120">
                You need to provision a phone number before you can set up live
                call transfers. Live transfers require an active Bizzy phone
                number to forward calls.
              </p>
              <button className="bg-white text-black font-semibold rounded-xl px-5 py-2.5 flex items-center gap-2.5 hover:bg-white/90 transition-colors w-fit">
                <Phone
                  className="w-4.5 h-4.5 fill-transparent"
                  strokeWidth={2.5}
                />
                <span className="text-[15px]">Set up phone number</span>
              </button>
            </div>

            <div className="pt-4">
              <h3 className="text-white font-medium text-[19px] mb-5">
                Transfer Number
              </h3>
              <p className="text-white/80 text-[16px] tracking-wide mb-8">
                {phoneNumbers?.[0]?.number || "No phone number"}
              </p>
              <p className="text-white/40 text-[14px] leading-relaxed">
                When transfer conditions are met, calls will be forwarded to
                this number.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentGreetings;
