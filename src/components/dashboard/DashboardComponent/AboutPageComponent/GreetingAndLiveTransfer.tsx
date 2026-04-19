import {
  MessageSquareMore,
  PhoneCall,
  Plus,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";
import IntakeQuestionModal from "./AboutPageModal/IntakeQuestionModal";

export default function GreetingAndLiveTransfer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transferNumber, setTransferNumber] = useState("");

  return (
    <>
      <main className="mt-14 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-8">
          {/* Left Column */}
          <div className="flex flex-col gap-10">
            {/* Greeting Section */}
            <div
              className="rounded-3xl p-8 shadow-sm"
              style={{
                background: `radial-gradient(ellipse 70% 60% at top right, rgba(80, 80, 80, 0.45) 0%, #000000 70%)`,
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-normal text-white">Greeting</h2>
                  <p className="text-[#9E9E9E] text-lg mt-1">
                    How your agent greets callers
                  </p>
                </div>
              </div>

              {/* Greeting Message */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-8 pt-4 border-t border-[#333]/50">
                  <label className="text-white text-xl font-normal">
                    Greeting Message
                  </label>
                  <button className="flex items-center cursor-pointer gap-2 px-6 py-3 text-base bg-[#0D7EFD] rounded-xl">
                    <MessageSquareMore />
                    Ai Suggition
                  </button>
                </div>
                <div className="h-56 p-6 rounded-xl border border-[rgba(50,50,50,0.2)] bg-[#0D0D0D]">
                  <p className="text-gray-400 text-lg mt-1">
                    Hello! You've reached Luxe Home Services. specialists in home
                    repairs and upgrades. How may we help make your home better
                    today?
                  </p>
                </div>
              </div>
            </div>

            {/* ── Visual separator + 40px gap before Intake Questions ── */}
            <div
              className="rounded-3xl p-8 shadow-sm"
              style={{
                background: `radial-gradient(ellipse 70% 60% at top right, rgba(80, 80, 80, 0.45) 0%, #000000 70%)`,
              }}
            >
              <div className="mb-6 flex items-center justify-between border-b border-[#333]/50 pb-4">
                <div>
                  <h3 className="text-2xl font-normal text-white">
                    Intake Questions
                  </h3>
                  <p className="text-gray-400 text-lg mt-1">
                    Questions your agent asks during booking calls
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 text-base bg-[#0D7EFD] rounded-xl cursor-pointer"
                >
                  <Plus />
                  Add Questions
                </button>
              </div>

              {/* Empty State */}
              <div className="bg-[#0D0D0D] rounded-2xl p-16 text-center border border-[rgba(50,50,50,0.2)]">
                <p className="text-[#9E9E9E] text-lg font-medium mb-2">
                  No Intake questions configured yet
                </p>
                <p className="text-[#9E9E9E] text-sm">
                  Add questions your agent will ask during booking calls
                </p>
              </div>

              <div className="flex justify-center mt-6">
                <IntakeQuestionModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-10">
            {/* Live Transfer Section */}
            <div
              className="rounded-3xl p-8 shadow-sm"
              style={{
                background: `radial-gradient(ellipse 70% 60% at top right, rgba(80, 80, 80, 0.45) 0%, #000000 70%)`,
              }}
            >
              <h2 className="text-2xl font-normal text-white mb-1">
                Live Transfer
              </h2>
              <p className="text-gray-400 text-lg mb-6">
                What happens when your agent can't help
              </p>

              <div className="bg-[#0D0D0D] p-4 mb-10 rounded-2xl">
                <h2 className="text-[#B50606] text-lg mb-4 flex items-center gap-2">
                  <TriangleAlert />
                  Phone Number Required
                </h2>
                <p className="text-[#9E9E9E]">
                  You need to provision a phone number before you can set up live
                  call transfers. Live transfers require an active Bizzy phone
                  number to forward calls.
                </p>
                <div className="mt-6 flex justify-end">
                  <h2 className="text-[#0E7DFA] text-sm mb-4 flex items-center gap-2">
                    <PhoneCall size={16} />
                    Set up phone number
                  </h2>
                </div>
              </div>

              {/* Transfer Number */}
              <div className="mb-6">
                <label className="text-white text-2xl font-medium block mb-3">
                  Transfer Number
                </label>
                <input
                  type="text"
                  value={transferNumber}
                  onChange={(e) => setTransferNumber(e.target.value)}
                  placeholder="1(555) 123-4567"
                  className="w-full px-4 py-4 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                />
                <p className="text-gray-400 text-base mt-2 mb-4">
                  When transfer conditions are met, calls will be forwarded to
                  this number.
                </p>
              </div>
            </div>

            {/* Agent Personality Section */}
            <div
              className="rounded-3xl p-8 shadow-sm"
              style={{
                background: `radial-gradient(ellipse 70% 60% at top right, rgba(80, 80, 80, 0.45) 0%, #000000 70%)`,
              }}
            >
              <h2 className="text-2xl font-normal text-white mb-1">
                Agent Personality
              </h2>
              <p className="text-gray-400 text-lg mb-6">
                Define your agent's tone and behavior
              </p>

              {/* Personality traits — extra row padding for breathing room */}
              <div className="bg-black rounded-2xl overflow-hidden">
                {[
                  { label: "Tone", value: "Warm & Friendly" },
                  { label: "Formality", value: "Professional" },
                  { label: "Response Length", value: "Concise" },
                  { label: "Escalation", value: "After 2 failed attempts" },
                ].map((item, index, arr) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between py-5 px-4 ${index !== arr.length - 1
                      ? "border-b border-white/5"
                      : ""
                      }`}
                  >
                    <span className="text-gray-400 text-base">{item.label}</span>
                    <span className="text-white text-base font-medium">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Sticky "Test Call" bar ─────────────────────────────────────────── */}
      {/* Prominent sticky bottom bar — most important action on the page */}
      <div className="fixed bottom-0 left-0 right-0 z-0 flex items-center justify-end gap-4 px-8 py-4 bg-linear-to-t from-black via-black/90 to-transparent border-t border-white/5 backdrop-blur-sm">
        <p className="text-gray-500 text-sm hidden sm:block">
          Ready to test your agent configuration?
        </p>
        <button
          className="relative flex items-center gap-3 px-8 py-3.5 rounded-2xl font-semibold text-base text-white overflow-hidden
            bg-[#0E7DFA] hover:bg-[#1a88ff] transition-colors shadow-lg shadow-blue-500/30
            after:absolute after:inset-0 after:rounded-2xl after:ring-2 after:ring-blue-400/40 after:animate-ping after:pointer-events-none"
        >
          <PhoneCall size={20} />
          Test Call
        </button>
      </div>
    </>
  );
}
