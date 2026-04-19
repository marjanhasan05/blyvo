import {
  Check,
  CircleCheck,
  Copy,
  PhoneCall,
  RefreshCw,
  Save,
  Download,
  PhoneIncoming,
  PhoneMissed,
  Settings2,
} from "lucide-react";
import { useState } from "react";
import CallForwordingModal from "./CallForwordingModal";
import CallForwardingSetupModal from "./CallForwardingSetupModal";
import { copyText } from "@/lib/copyText";

// ── Types
interface ForwardingOption {
  title: string;
  description: string;
  needsSetup?: boolean;
}

interface RecentCall {
  id: number;
  number: string;
  type: "Incoming" | "Missed";
  handler?: string;
  duration?: string;
  timeAgo: string;
  missed?: boolean;
}

// ── Data    ─
const forwardingOptions: ForwardingOption[] = [
  { title: "Always", description: "Answer all calls 24 / 7" },
  { title: "After Hours", description: "Outside business hours" },
  { title: "Business Hours", description: "Only during set hours" },
  {
    title: "When I don't answer",
    description: "Forward your existing number",
    needsSetup: true,
  },
];

const recentCallsData: RecentCall[] = [
  {
    id: 1,
    number: "+1 (404) 555-1234",
    type: "Incoming",
    handler: "Khalid",
    duration: "3:24",
    timeAgo: "2 mins ago",
  },
  {
    id: 2,
    number: "+1 (404) 555-1234",
    type: "Incoming",
    handler: "Khalid",
    duration: "3:24",
    timeAgo: "2 mins ago",
  },
  {
    id: 3,
    number: "+1 (404) 555-1234",
    type: "Missed",
    timeAgo: "15 mins ago",
    missed: true,
  },
  {
    id: 4,
    number: "+1 (404) 555-1234",
    type: "Incoming",
    handler: "Khalid",
    duration: "3:24",
    timeAgo: "2 mins ago",
  },
];

export default function CallSettings() {
  const sowNumber = "(650) 250-0287";
  const [forwardingOption, setForwardingOption] = useState<ForwardingOption>(
    forwardingOptions[0],
  );
  const [isForwardingModalOpen, setIsForwardingModalOpen] = useState(false);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-6 py-4 flex flex-col gap-6">
      {/* ── Page header         ──────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-lg md:text-xl xl:text-2xl text-gray-400">
          Manage your{" "}
          <span
            className="font-semibold text-white hover:text-blue-400 transition-colors cursor-pointer underline"
            onClick={() => setIsSetupModalOpen(true)}
          >
            Phone setting
          </span>{" "}
          and call routing.
        </p>

        <div className="flex items-center gap-2">
          {/* SOW number badge */}
          <button
            onClick={() => copyText(sowNumber)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors text-white text-sm font-medium px-4 py-2 rounded-xl"
          >
            <Copy size={14} />
            {sowNumber}
          </button>
        </div>
      </div>

      {/* Action buttons row */}
      <div className="flex justify-start md:justify-end gap-2">
        <button className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#222] border border-white/10 text-white text-sm px-4 py-2 rounded-xl transition-colors">
          <RefreshCw size={14} />
          Refresh
        </button>
        <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30  text-white text-sm px-4 py-2 rounded-xl transition-colors">
          <Save size={14} />
          Save Changes
        </button>
      </div>

      {/* ── Top two-column grid          */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LEFT — SOW Number + Call Forwarding */}
        <div className="bg-[#111111] border border-white/8 rounded-2xl p-6 flex flex-col gap-8">
          {/* SOW Number — compact, content-fit sub-card */}
          <div className="bg-[#0d0d0d] border border-white/8 rounded-xl px-5 py-5">
            <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mb-3">
              Your SOW Number
            </p>
            <h2 className="text-3xl font-semibold tracking-tight mb-1 leading-none">
              <span className="text-white">(650) 250–</span>
              <span className="text-blue-400">0287</span>
            </h2>
            <p className="text-gray-500 text-xs mt-2 mb-4">
              Customers call this number to reach your AI assistant
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => copyText(sowNumber)}
                className="flex items-center gap-2 bg-[#1e1e1e] hover:bg-[#262626] border border-white/10 text-white text-sm px-4 py-2.5 rounded-xl transition-colors font-medium"
              >
                <Copy size={14} />
                Copy Number
              </button>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2.5 rounded-xl transition-colors font-medium">
                <PhoneCall size={14} />
                Test Call
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/8" />

          {/* Call Forwarding */}
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-white text-lg font-semibold">
                Call Forwarding
              </h3>
              <span className="text-xs border border-white/20 text-gray-400 px-2.5 py-0.5 rounded-full">
                Optional
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-5">
              Forward your existing number to BLYVO via your carrier
            </p>

            {/* Configure forwarding — compact inline card, not a big empty box */}
            <div
              className="border border-white/10 bg-[#0d0d0d] rounded-xl px-4 py-3.5 flex items-center gap-4 cursor-pointer hover:bg-[#141414] transition-colors"
              onClick={() => setIsForwardingModalOpen(true)}
            >
              <div className="w-9 h-9 bg-[#1a1a1a] rounded-lg flex items-center justify-center shrink-0">
                <PhoneCall size={16} className="text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">
                  Configure Forwarding
                </p>
                <p className="text-gray-500 text-xs mt-0.5 truncate">
                  Setup call forwarding from your existing number
                </p>
              </div>
              <button className="flex items-center gap-1.5 bg-[#1e1e1e] hover:bg-[#282828] border border-white/10 text-blue-400 text-xs px-3 py-1.5 rounded-lg transition-colors shrink-0">
                <Settings2 size={12} />
                Set up
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT — When To Answer */}
        <div className="bg-[#111111] border border-white/8 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
            <h3 className="text-white text-lg font-semibold">When To Answer</h3>
            <div className="flex items-center gap-1.5 bg-[#1a1a1a] border border-white/10 text-white text-sm px-3 py-1.5 rounded-xl">
              <Check size={14} className="text-gray-300" />
              <span>Always On</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {forwardingOptions.map((option) => {
              const isSelected = forwardingOption.title === option.title;
              return (
                <div
                  key={option.title}
                  onClick={() => {
                    setForwardingOption(option);
                    if (option.needsSetup) setIsSetupModalOpen(true);
                  }}
                  className={`flex items-center justify-between rounded-xl px-5 py-4 cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-[#1a1a1a] border border-white/15"
                      : "bg-transparent hover:bg-[#141414] border border-transparent"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white text-sm font-medium">
                        {option.title}
                      </p>
                      {option.needsSetup && (
                        <span className="text-xs bg-blue-600/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full">
                          Setup needed
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {option.description}
                    </p>
                  </div>
                  {isSelected && (
                    <CircleCheck
                      size={18}
                      className="text-blue-400 shrink-0 ml-3"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Recent Calls         ─────── */}
      <div className="bg-[#111111] border border-white/8 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-1 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <h3 className="text-white text-lg font-semibold">Recent Calls</h3>
            <span className="text-xs bg-blue-600/20 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 rounded-full font-medium">
              12 today
            </span>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-xl transition-colors">
            <Download size={14} />
            Export
          </button>
        </div>
        <p className="text-gray-500 text-sm mb-5">
          Call handled by your AI assistant
        </p>

        {/* Calls list */}
        <div className="flex flex-col divide-y divide-white/6">
          {recentCallsData.map((call) => (
            <div
              key={call.id}
              className={`flex items-center justify-between py-4 gap-4 pl-3 border-l-2 ${
                call.missed ? "border-l-red-500/70" : "border-l-emerald-500/70"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Icon — coloured background distinguishes call type at a glance */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    call.missed ? "bg-red-500/10" : "bg-emerald-500/10"
                  }`}
                >
                  {call.missed ? (
                    <PhoneMissed size={16} className="text-red-400" />
                  ) : (
                    <PhoneIncoming size={16} className="text-emerald-400" />
                  )}
                </div>

                {/* Info */}
                <div>
                  <p className="text-white text-sm font-medium">
                    {call.number}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                    <span
                      className={
                        call.missed
                          ? "text-red-400 font-medium"
                          : "text-emerald-400 font-medium"
                      }
                    >
                      {call.type}
                    </span>
                    {call.handler && (
                      <>
                        <span className="text-gray-600">•</span>
                        <span>{call.handler} handled</span>
                        <span className="text-blue-400 cursor-pointer hover:underline ml-1">
                          View Transcript →
                        </span>
                      </>
                    )}
                    {call.missed && (
                      <>
                        <span className="text-gray-600">•</span>
                        <span>No agent available</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Duration / time — duration is bolder, reads as primary data */}
              <div className="text-right shrink-0">
                {call.duration && (
                  <p className="text-white text-base font-bold tracking-tight">
                    {call.duration}
                  </p>
                )}
                {call.missed && (
                  <span className="text-red-400/60 text-sm font-medium">—</span>
                )}
                <p className="text-gray-500 text-xs mt-0.5">{call.timeAgo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Modals   */}
      {isForwardingModalOpen && (
        <CallForwordingModal
          isOpen={isForwardingModalOpen}
          setIsOpen={setIsForwardingModalOpen}
        />
      )}
      {isSetupModalOpen && (
        <CallForwardingSetupModal
          isOpen={isSetupModalOpen}
          setIsOpen={setIsSetupModalOpen}
          variant="forwarding_only"
        />
      )}
    </div>
  );
}
