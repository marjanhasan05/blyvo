import { useState, useEffect } from "react";
import { PhoneOff, Mic, MicOff, X, Volume2, PhoneCall } from "lucide-react";
import GradientButton from "@/common/GradientButton";

export default function TestCallPopup({ onClose }: { onClose: () => void }) {
    const [callState, setCallState] = useState("ready"); // "ready" | "connected"
    const [seconds, setSeconds] = useState(0);
    const [muted, setMuted] = useState(false);
    const [agentSpeaking, setAgentSpeaking] = useState(true);

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (callState === "connected") {
            timer = setInterval(() => setSeconds((s) => s + 1), 1000);
            // Simulate agent speaking toggle
            const speakTimer = setInterval(() => {
                setAgentSpeaking((v) => !v);
            }, 2500);
            return () => {
                clearInterval(timer);
                clearInterval(speakTimer);
            };
        }
    }, [callState]);

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60)
            .toString()
            .padStart(2, "0");
        const sec = (s % 60).toString().padStart(2, "0");
        return `${m}:${sec}`;
    };

    const handleStartCall = () => {
        setCallState("connected");
        setSeconds(0);
        setMuted(false);
        setAgentSpeaking(true);
    };

    const handleEndCall = () => {
        setCallState("ready");
        setSeconds(0);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
            <div
                className="w-96 p-4 relative bg-white"
                style={{
                    borderRadius: "20px",
                    boxShadow: "0 0 34px 0 rgba(0, 0, 0, 0.25)",
                    backdropFilter: "blur(12px)",
                }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 cursor-pointer right-4 text-gray-900 hover:text-gray-600 transition-colors"
                >
                    <X size={18} />
                </button>

                {/* Phone icon */}
                <div className="flex flex-col items-center mb-4 space-y-4">
                    <div
                        className="w-16 h-16 flex mb-4 items-center justify-center border-2 overflow-hidden border-gray-200 bg-green-600/20 transition-colors duration-500"
                        style={{
                            borderRadius: "20px",
                            boxShadow: "0 8px 14px 0 rgba(78, 78, 78, 0.58)",
                        }}
                    >
                        <PhoneCall
                            size={28}
                            className={`transition-colors duration-500 ${callState === "connected" ? "text-green-500" : "text-gray-600"
                                }`}
                        />
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-900">Test Call</h2>
                    <p className="text-base text-gray-900 mt-0.5">
                        Luxe Home Services Assistant
                    </p>
                </div>

                {/* State-specific content */}
                {callState === "ready" ? (
                    <>
                        <p className="text-center text-lg font-medium text-gray-900 mb-4">
                            Ready to make a test call
                        </p>

                        {/* Start Call button */}
                        <GradientButton
                            onClick={handleStartCall}
                            className="w-full mb-6 mt-2 "
                        >
                            Start Call
                        </GradientButton>
                    </>
                ) : (
                    <>
                        {/* Connected status */}
                        <div className="flex flex-col items-center mb-4">
                            <span className="text-green-500 font-semibold text-sm mb-1">
                                Connected
                            </span>
                            <span className="text-gray-800 font-bold text-2xl tracking-widest">
                                {formatTime(seconds)}
                            </span>

                            {/* Agent speaking indicator */}
                            <div className="flex items-center gap-1.5 mt-2">
                                <Volume2
                                    size={14}
                                    className={`transition-colors ${agentSpeaking ? "text-green-500" : "text-gray-300"
                                        }`}
                                />
                                <span
                                    className={`text-xs font-medium transition-colors ${agentSpeaking ? "text-green-500" : "text-gray-300"
                                        }`}
                                >
                                    Agent speaking
                                </span>
                            </div>
                        </div>

                        {/* Mute + End call buttons */}
                        <div className="flex gap-3 mb-5">
                            <button
                                onClick={() => setMuted((m) => !m)}
                                className={`flex-1 flex items-center cursor-pointer justify-center gap-2 py-3 rounded-2xl border text-sm font-semibold transition-colors ${muted
                                    ? "bg-gray-800 text-white border-gray-800"
                                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                                    }`}
                            >
                                {muted ? <MicOff size={16} /> : <Mic size={16} />}
                                {muted ? "Unmute" : "Mute"}
                            </button>

                            <button
                                onClick={handleEndCall}
                                className="flex-1 flex items-center cursor-pointer justify-center gap-2 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
                            >
                                <PhoneOff size={16} />
                                End call
                            </button>
                        </div>
                    </>
                )}

                {/* Agent Details */}
                <div className="bg-[#F2F4F5] rounded-xl p-6">
                    <p className="text-lg font-semibold text-gray-900 uppercase tracking-wider mb-2">
                        Agent Details
                    </p>
                    <ul className="space-y-1 list-disc pl-4">
                        <li className="text-sm text-gray-400">
                            <span className="font-medium text-gray-900">Business:</span> Luxe
                            Home Services
                        </li>
                        <li className="text-sm text-gray-400">
                            <span className="font-medium text-gray-700">Type:</span> Home
                            repair and handyman services
                        </li>
                    </ul>
                    <p className="text-xs text-gray-700 italic mt-2">
                        "Hi there! I'm the Luxe Home Services virtual assistant. How can I
                        help you today?"
                    </p>
                </div>
            </div>
        </div>
    );
}
