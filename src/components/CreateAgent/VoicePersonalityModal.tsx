import { useState, useRef } from "react";
import { FiSave, FiCheck } from "react-icons/fi";
import { Play, Pause, Mic } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export interface VoicePersonality {
    voiceId: string;
    voiceName: string;
    tone: string;
    personality: string;
    speed: number;
    language: string;
}

interface VoiceOption {
    id: string;
    name: string;
    gender: "Male" | "Female";
    accent: string;
    description: string;
    color: string;
}

// interface PersonalityOption {
//     id: string;
//     label: string;
//     description: string;
//     icon: React.ReactNode;
// }

const VOICES: VoiceOption[] = [
    { id: "aria", name: "Aria", gender: "Female", accent: "American", description: "Warm & professional", color: "#A78BFA" },
    { id: "james", name: "James", gender: "Male", accent: "American", description: "Confident & clear", color: "#60A5FA" },
    { id: "sophia", name: "Sophia", gender: "Female", accent: "British", description: "Polished & elegant", color: "#F472B6" },
    { id: "marcus", name: "Marcus", gender: "Male", accent: "British", description: "Authoritative & calm", color: "#34D399" },
    { id: "luna", name: "Luna", gender: "Female", accent: "Australian", description: "Friendly & upbeat", color: "#FBBF24" },
    { id: "ryan", name: "Ryan", gender: "Male", accent: "Irish", description: "Approachable & warm", color: "#F87171" },
];

interface VoicePersonalityModalProps {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    value: VoicePersonality;
    onSave: (value: VoicePersonality) => void;
}

export function VoicePersonalityModal({ open, onOpenChange, value, onSave }: VoicePersonalityModalProps) {
    const [local, setLocal] = useState<VoicePersonality>(value);
    const [playingId, setPlayingId] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const set = <K extends keyof VoicePersonality>(key: K, val: VoicePersonality[K]) =>
        setLocal((prev) => ({ ...prev, [key]: val }));

    const togglePreview = (voiceId: string) => {
        if (!audioRef.current) {
            audioRef.current = new Audio("/demoCallSound.mp3");
        }

        const audio = audioRef.current;

        // If same voice clicked -> pause
        if (playingId === voiceId) {
            audio.pause();
            audio.currentTime = 0;
            setPlayingId(null);
            return;
        }

        // Stop any currently playing audio
        audio.pause();
        audio.currentTime = 0;

        // Play again
        audio.play();

        setPlayingId(voiceId);

        // Reset when audio finishes
        audio.onended = () => {
            setPlayingId(null);
        };
    };

    const handleSave = () => {
        onSave(local);
        onOpenChange(false);
        toast.success("Voice & personality saved!");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-7xl! bg-[#121214] border border-white/10 w-full" style={{ display: "flex", flexDirection: "column", padding: 0 }}>
                <DialogHeader className="px-8 pt-7 pb-4 border-b border-white/10 shrink-0">
                    <DialogTitle className="text-xl font-semibold text-white font-geist">Voice & Personality</DialogTitle>
                    <p className="text-[#9E9E9E] text-xs mt-0.5">Customize how your AI agent sounds and behaves during calls</p>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-10">

                    {/* ── Voice Selection ──────────────────────────────────────────── */}
                    <section>
                        <div className="flex items-center gap-2 mb-1">
                            <Mic size={16} className="text-[#5D5FEF]" />
                            <h3 className="text-base font-semibold text-white">Choose Voice</h3>
                        </div>
                        <p className="text-[#9E9E9E] text-xs mb-4">Click play to preview each voice</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {VOICES.map((voice) => {
                                const selected = local.voiceId === voice.id;
                                const playing = playingId === voice.id;
                                return (
                                    <div
                                        key={voice.id}
                                        onClick={() => { set("voiceId", voice.id); set("voiceName", voice.name); }}
                                        className={`relative flex items-center gap-4 p-4 rounded-[16px] border-2 cursor-pointer transition-all ${selected ? "border-[#5D5FEF] bg-[#5D5FEF]/8 shadow-sm" : "border-transparent bg-[#5D5FEF]/5 hover:border-[#5D5FEF]/30"
                                            }`}
                                    >
                                        {/* Avatar */}
                                        <div
                                            className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                                            style={{ background: `linear-gradient(135deg, ${voice.color}cc, ${voice.color})` }}
                                        >
                                            {voice.name[0]}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold text-white">{voice.name}</span>
                                                {selected && <FiCheck size={13} className="text-[#5D5FEF]" />}
                                            </div>
                                            <p className="text-[11px] text-[#9E9E9E]">{voice.gender} · {voice.accent}</p>
                                            <p className="text-[11px] text-[#5D5FEF] italic">{voice.description}</p>
                                        </div>

                                        {/* Preview button */}
                                        <button
                                            onClick={(e) => { e.stopPropagation(); togglePreview(voice.id); }}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ${playing ? "bg-[#5D5FEF] text-white shadow-md" : "bg-[#1C1C1E] text-[#5D5FEF] shadow-sm hover:shadow-md"
                                                }`}
                                        >
                                            {playing ? <Pause size={13} /> : <Play size={13} className="translate-x-0.5" />}
                                        </button>

                                        {/* Playing indicator */}
                                        {playing && (
                                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-0.5 items-end h-3">
                                                {[1, 2, 3, 4].map((b) => (
                                                    <div
                                                        key={b}
                                                        className="w-0.5 bg-[#5D5FEF] rounded-full animate-pulse"
                                                        style={{ height: `${[8, 12, 6, 10][b - 1]}px`, animationDelay: `${b * 0.1}s` }}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="shrink-0 px-8 py-5 border-t border-white/10 flex items-center justify-between bg-[#121214]">
                    <p className="text-xs text-[#9E9E9E]">
                        Current: <span className="text-[#5D5FEF] font-medium">{local.voiceName}</span>
                        {local.personality && <> · <span className="capitalize text-[#5D5FEF] font-medium">{local.personality}</span></>}
                    </p>
                    <div className="flex gap-3">
                        <button onClick={() => onOpenChange(false)} className="px-5 py-2 rounded-full text-sm text-gray-300 border border-white/10 hover:bg-white/10 transition-colors">
                            Cancel
                        </button>
                        <button onClick={handleSave} className="px-6 py-2 rounded-full text-sm font-semibold text-white bg-[#5D5FEF] hover:bg-[#4a4ce0] transition-colors flex items-center gap-2 shadow-md">
                            <FiSave size={14} /> Save Changes
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

// these will be not use for now 
// const PERSONALITIES: PersonalityOption[] = [
//     { id: "professional", label: "Professional", description: "Formal, precise and business-focused", icon: <Shield size={16} /> },
//     { id: "friendly", label: "Friendly", description: "Warm, approachable and conversational", icon: <Smile size={16} /> },
//     { id: "energetic", label: "Energetic", description: "Upbeat, enthusiastic and motivating", icon: <Zap size={16} /> },
//     { id: "empathetic", label: "Empathetic", description: "Caring, patient and understanding", icon: <Heart size={16} /> },
//     { id: "premium", label: "Premium", description: "Sophisticated, refined and exclusive", icon: <Star size={16} /> },
// ];

// const TONES = ["Formal", "Semi-formal", "Casual", "Conversational"];
// const LANGUAGES = ["English (US)", "English (UK)", "English (AU)", "Spanish", "French", "Arabic"];


{/* ── Personality ──────────────────────────────────────────────── */ }
{/* <section>
                        <h3 className="text-base font-semibold text-white mb-1">Personality Style</h3>
                        <p className="text-[#9E9E9E] text-xs mb-4">How should your agent present itself?</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                            {PERSONALITIES.map((p) => {
                                const selected = local.personality === p.id;
                                return (
                                    <button
                                        key={p.id}
                                        onClick={() => set("personality", p.id)}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-[16px] border-2 transition-all text-center ${selected ? "border-[#5D5FEF] bg-[#5D5FEF]/8" : "border-transparent bg-[#5D5FEF]/5 hover:border-[#5D5FEF]/25"
                                            }`}
                                    >
                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${selected ? "bg-[#5D5FEF] text-white" : "bg-[#1C1C1E] text-[#5D5FEF]"}`}>
                                            {p.icon}
                                        </div>
                                        <span className={`text-xs font-semibold ${selected ? "text-[#5D5FEF]" : "text-white"}`}>{p.label}</span>
                                        <span className="text-[10px] text-[#9E9E9E] leading-tight">{p.description}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </section> */}

{/* ── Tone & Language ──────────────────────────────────────────── */ }
{/* <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-base font-semibold text-white mb-1">Communication Tone</h3>
                            <p className="text-[#9E9E9E] text-xs mb-4">Sets the level of formality</p>
                            <div className="grid grid-cols-2 gap-3">
                                {TONES.map((tone) => {
                                    const selected = local.tone === tone;
                                    return (
                                        <button
                                            key={tone}
                                            onClick={() => set("tone", tone)}
                                            className={`py-2.5 px-4 rounded-xl border-2 text-sm font-medium transition-all ${selected ? "border-[#5D5FEF] bg-[#5D5FEF]/10 text-[#5D5FEF]" : "border-white/10 text-gray-300 hover:border-[#5D5FEF]/30"
                                                }`}
                                        >
                                            {tone}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-base font-semibold text-white mb-1">Language</h3>
                            <p className="text-[#9E9E9E] text-xs mb-4">Primary language for calls</p>
                            <select
                                value={local.language}
                                onChange={(e) => set("language", e.target.value)}
                                className="w-full text-sm text-white bg-white border-2 border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#5D5FEF] transition-colors"
                            >
                                {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
                            </select>
                        </div>
                    </section> */}

{/* ── Speaking Speed ───────────────────────────────────────────── */ }
{/* <section>
                        <h3 className="text-base font-semibold text-white mb-1">Speaking Speed</h3>
                        <p className="text-[#9E9E9E] text-xs mb-4">
                            Adjust how fast your agent speaks&nbsp;
                            <span className="text-[#5D5FEF] font-semibold">
                                {local.speed === 1 ? "Normal" : local.speed < 1 ? "Slow" : "Fast"} ({local.speed.toFixed(1)}x)
                            </span>
                        </p>
                        <div className="flex items-center gap-4">
                            <span className="text-xs text-[#9E9E9E] w-10">Slow</span>
                            <input
                                type="range"
                                min={0.5}
                                max={2}
                                step={0.1}
                                value={local.speed}
                                onChange={(e) => set("speed", parseFloat(e.target.value))}
                                className="flex-1 accent-[#5D5FEF] h-2 rounded-full"
                            />
                            <span className="text-xs text-[#9E9E9E] w-10 text-right">Fast</span>
                        </div>
                    </section> */}