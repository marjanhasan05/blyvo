import { Pause, Play } from "lucide-react";
import { IoMale, IoFemale } from "react-icons/io5";
import {
  useGetAllAgentQuery,
  useSelectAgentMutation,
} from "@/store/features/agent/agent.api";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useRef, useState } from "react";

const VoiceSkeleton = () => (
  <div className="flex-1 bg-[linear-gradient(180deg,#112A3A_0%,#0F2A3A_100%)] rounded-[14px] p-6 flex flex-col border border-transparent min-w-75">
    <div className="flex justify-between items-center mb-1.5">
      <Skeleton className="h-7 w-32 bg-white/10" />
    </div>
    <Skeleton className="h-4 w-48 mb-5 bg-white/5" />
    <div className="flex gap-1.5 mb-6">
      <Skeleton className="h-6 w-20 bg-white/10" />
      <Skeleton className="h-6 w-12 bg-white/10" />
    </div>
    <Skeleton className="h-10 w-full mb-6 bg-white/5" />
    <div className="flex justify-between items-center mt-auto">
      <Skeleton className="h-4 w-24 bg-white/5" />
      <Skeleton className="h-5 w-9 rounded-full bg-white/10" />
    </div>
  </div>
);

const VoiceSelector = () => {
  const { data: agentVoices, isLoading, isError } = useGetAllAgentQuery();
  const [selectAgent, { isLoading: isUpdating }] = useSelectAgentMutation();
  const [playingId, setPlayingId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleToggleActive = async (
    agentVoiceId: number,
    currentActive: boolean,
  ) => {
    if (currentActive) return;
    try {
      await selectAgent({
        data: { id: agentVoiceId, is_active: true },
      }).unwrap();
      toast.success("Voice updated successfully");
    } catch (error) {
      toast.error("Failed to update voice");
      console.error("Select agent error:", error);
    }
  };

  const handlePlayPreview = (voiceId: number, previewUrl: string) => {
    // If the clicked voice is already playing, pause it
    if (playingId === voiceId) {
      audioRef.current?.pause();
      setPlayingId(null);
      return;
    }

    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Create and play new audio
    try {
      const audio = new Audio(previewUrl);
      audioRef.current = audio;

      audio.play().catch((err) => {
        toast.error("Unable to play audio preview");
        console.error("Audio playback error:", err);
        setPlayingId(null);
      });

      audio.onended = () => {
        setPlayingId(null);
        audioRef.current = null;
      };

      audio.onerror = () => {
        toast.error("Failed to load audio preview");
        setPlayingId(null);
        audioRef.current = null;
      };

      setPlayingId(voiceId);
    } catch (error) {
      toast.error("Audio preview unavailable");
      console.error("Audio setup error:", error);
    }
  };

  if (isError) {
    return (
      <div className="w-full p-6 mt-8 text-center text-red-400 bg-red-400/10 rounded-[30px] border border-red-400/20">
        <p>Failed to load voices. Please try again later.</p>
      </div>
    );
  }

  return (
    <div
      className="w-full p-6 mt-8 text-white font-sans"
      style={{
        borderRadius: "30px",
        background: "rgba(157, 157, 157, .25)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Header unchanged */}
      <div className="flex justify-between items-start mb-9">
        <div>
          <h2 className="text-[34px] font-bold m-0 mb-2 text-white leading-none">
            Voice
          </h2>
          <p className="text-[24px] text-[#9E9E9E] m-0 font-normal">
            Choose your agent's voice
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5 w-full">
        {isLoading ? (
          <>
            <VoiceSkeleton />
            <VoiceSkeleton />
            <VoiceSkeleton />
            <VoiceSkeleton />
          </>
        ) : (
          agentVoices?.map((agentVoice) => {
            const voice = agentVoice.voice;
            if (!voice) return null;

            const isActive = agentVoice.is_active;
            const isPlaying = playingId === voice.id;
            const hasPreview = !!voice.preview_url;

            return (
              <div
                key={agentVoice.id}
                className={`flex-1 min-w-75 bg-[linear-gradient(180deg,#112A3A_0%,#0F2A3A_100%)] rounded-[14px] p-6 flex flex-col transition-all duration-300 border ${
                  isActive ? "border-white/20 shadow-lg" : "border-transparent"
                }`}
              >
                {/* Header with name and active badge unchanged */}
                <div className="flex justify-between items-center mb-1.5">
                  <h3 className="text-[24px] font-normal m-0 text-white leading-none">
                    {voice.name}
                  </h3>
                  {isActive && (
                    <div className="flex items-center gap-1.5 bg-[#22C55E]/10 px-2 py-1 rounded text-[11px] text-[#22C55E] font-medium">
                      <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full shadow-[0_0_6px_#22C55E]"></span>
                      Active
                    </div>
                  )}
                </div>
                <p className="text-[14px] text-[#99F7FE] m-0 mb-5 font-normal">
                  {voice.description || "Sophisticated AI Voice"}
                </p>

                {/* Gender and language badges unchanged */}
                <div className="flex gap-1.5 mb-6">
                  <div className="flex items-center bg-white/20 justify-center rounded gap-1 text-[#99F7FE] py-1 px-3 text-xs font-medium">
                    {voice.gender?.toLowerCase() === "male" ? (
                      <IoMale size={14} />
                    ) : (
                      <IoFemale size={14} />
                    )}
                    <span className="capitalize">{voice.gender}</span>
                  </div>
                  <div className="flex items-center justify-center font-semibold rounded bg-white text-black px-3 py-0.5 tracking-wide text-[8px]">
                    {voice.language?.toUpperCase()}
                  </div>
                </div>

                {/* Preview button with integrated audio */}
                <button
                  onClick={() =>
                    hasPreview &&
                    handlePlayPreview(voice.id, voice.preview_url!)
                  }
                  disabled={!hasPreview}
                  className={`w-full flex items-center bg-white/5 border-none rounded-lg py-3 px-4 text-[#E2E8F0] text-[13px] font-normal transition-colors duration-200 gap-3 mb-6 ${
                    hasPreview
                      ? "cursor-pointer hover:bg-white/10"
                      : "cursor-not-allowed opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white/80 shrink-0">
                    {isPlaying ? (
                      <Pause size={12} fill="currentColor" />
                    ) : (
                      <Play size={12} fill="currentColor" />
                    )}
                  </div>
                  <span className="whitespace-nowrap">
                    {isPlaying ? "Playing Preview" : "Preview Voice"}
                  </span>
                  <div className="flex items-center gap-0.5 ml-auto h-3">
                    {[4, 8, 14, 10, 16, 6, 8, 12, 5].map((height, i) => (
                      <span
                        key={i}
                        className={`w-0.5 rounded-[1px] opacity-70 transition-colors ${
                          isActive
                            ? "bg-[#22C55E]"
                            : isPlaying
                              ? "bg-[#38BDF8]"
                              : "bg-[#38BDF8]"
                        }`}
                        style={{ height: `${height}px` }}
                      ></span>
                    ))}
                  </div>
                </button>

                {/* Active toggle switch unchanged */}
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-[13px] text-[#A0B3C6]">
                    Set as active
                  </span>
                  <label className="relative inline-block w-9 h-5 cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={isActive}
                      disabled={isUpdating}
                      onChange={() =>
                        handleToggleActive(agentVoice.id, isActive)
                      }
                    />
                    <div className="absolute inset-0 bg-transparent border-[1.5px] border-white transition-colors duration-300 rounded-full peer-checked:border-[#22C55E]"></div>
                    <div className="absolute left-0.75 top-0.75 w-3.5 h-3.5 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-4 peer-checked:bg-[#22C55E]"></div>
                  </label>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default VoiceSelector;
