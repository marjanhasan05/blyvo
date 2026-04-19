"use client";

import { useState } from "react";
import { Check, Headphones } from "lucide-react";
import robot from "@/assets/images/robo.png";
import AgentConfigHeader from "./AgentConfigHeader";

const voices = [
  {
    id: "1",
    name: "Kora",
    gender: "Female",
    description: "Warm, expressive California voice",
  },
  {
    id: "2",
    name: "Colton Rivers",
    gender: "Male",
    description: "Friendly Southern Texas voice",
  },
  {
    id: "3",
    name: "Ito",
    gender: "Male",
    description: "Natural, conversational male voice",
  },
  {
    id: "4",
    name: "Inspiring Woman",
    gender: "Female",
    description: "Motivational voice",
  },
  {
    id: "5",
    name: "Kora",
    gender: "Male",
    description: "Warm, expressive California voice",
  },
  {
    id: "6",
    name: "Colton Rivers",
    gender: "Male",
    description: "Friendly Southern Texas voice",
  },
  {
    id: "7",
    name: "Ito",
    gender: "Male",
    description: "Natural, conversational male voice",
  },
  {
    id: "8",
    name: "Inspiring Woman",
    gender: "Male",
    description: "Motivational voice",
  },
];

export default function VoiceSection() {
  const [selectedVoice, setSelectedVoice] = useState<string>("1");

  const handlePreview = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    console.log(`Preview voice ${id}`);
  };

  return (
    <main className="mt-8 px-8">
      <div className="p-2">
        <AgentConfigHeader />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">Voice</h2>
            <p className="text-base text-[#9E9E9E]">
              Choose your agent's voice
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {voices.map((voice) => {
            const isActive = selectedVoice === voice.id;

            return (
              <div
                key={voice.id}
                onClick={() => setSelectedVoice(voice.id)}
                className={`
                  relative overflow-hidden rounded-[20px] p-6 cursor-pointer
                  transition-all duration-300 group
                  ${isActive
                    ? "border-2 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.30)] bg-[#0a1a12]"
                    : "border border-[#323232] hover:border-[#555] hover:shadow-[0_4px_18px_rgba(255,255,255,0.07)] hover:-translate-y-0.5"
                  }
                `}
              >
                {/* Active checkmark overlay — top-left badge */}
                {isActive && (
                  <div className="absolute top-3 left-3 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center z-20 shadow-md">
                    <Check size={11} strokeWidth={3} className="text-white" />
                  </div>
                )}

                {/* Gradient hover overlay (only when NOT active) */}
                {!isActive && (
                  <div
                    className="absolute inset-0 bg-[linear-gradient(109deg,#AD34EB_4.38%,#E77FB2_27.77%,#FC979A_39.14%,#E43055_56.69%,#B828A6_77.33%,#9688F6_109.04%)]
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[20px]"
                  />
                )}

                <div className="relative z-10 flex gap-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-white mb-1">
                      {voice.name}{" "}
                      <span
                        className={`border text-xs p-1 rounded-full ${
                          isActive ? "border-emerald-500/50" : "border-[#323232]"
                        }`}
                      >
                        <span className="font-medium px-2 py-[2px] rounded-full text-[#9E9E9E]">
                          {voice.gender}
                        </span>
                      </span>
                    </h3>

                    <p className="text-base mt-4 text-[#9E9E9E] group-hover:text-gray-100 transition-colors duration-300">
                      {voice.description}
                    </p>
                  </div>

                  {/* Robot avatar */}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-16 h-16 flex items-center justify-center transition-all duration-300"
                      style={{
                        borderRadius: "16px",
                        border: isActive
                          ? "1px solid rgba(16,185,129,0.4)"
                          : "1px solid rgba(213, 243, 249, 0.35)",
                      }}
                    >
                      <img
                        src={robot}
                        alt=""
                        className="h-9 w-9 transition-colors duration-300"
                      />
                    </div>

                    {/* Headphone button — proper circular dark button */}
                    <button
                      onClick={(e) => handlePreview(e, voice.id)}
                      title="Preview voice"
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
                        ${isActive
                          ? "bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400"
                          : "bg-[#1e1e1e] hover:bg-[#2a2a2a] text-gray-400 hover:text-white"
                        }
                        shadow-sm border border-white/10
                      `}
                    >
                      <Headphones size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
