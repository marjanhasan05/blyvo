import {
  useGetAgentLanguagesQuery,
  useGetAgentQuery,
  useUpdateAgentLanguageMutation,
  useUpdateAgentMutation,
} from "@/store/features/agent/agent.api";
import React from "react";
import { toast } from "sonner";

const languageNames: Record<string, string> = {
  en: "English",
  es: "Spanish",
  ar: "Arabic",
  ru: "Russian",
  fr: "French",
  de: "German",
  zh: "Chinese",
};

const LanguageSettingsSkeleton: React.FC = () => {
  return (
    <div className="mt-8 p-4 sm:p-8 font-sans animate-pulse">
      <div className="w-full rounded-[20px] shadow-2xl">
        <div className="mb-10">
          <div className="h-10 w-64 bg-white/10 rounded-lg mb-4" />
          <div className="h-6 w-96 bg-white/5 rounded-lg" />
        </div>

        <div className="mb-10 pb-8 border-b border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="h-6 w-48 bg-white/10 rounded-lg" />
              <div className="h-4 w-80 bg-white/5 rounded-lg" />
            </div>
            <div className="h-8 w-14 bg-white/10 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8">
          <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-white/5 rounded-[20px]">
            <div className="space-y-4">
              <div className="h-8 w-40 bg-white/10 rounded-lg mb-5" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-white/5 rounded-2xl" />
              ))}
            </div>
            <div className="space-y-4">
              <div className="h-8 w-48 bg-white/10 rounded-lg mb-5" />
              {[1, 2].map((i) => (
                <div key={i} className="h-16 bg-white/5 rounded-2xl" />
              ))}
            </div>
          </div>
          <div className="p-5 bg-white/5 rounded-[20px] space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-8 w-32 bg-white/10 rounded-lg" />
                <div className="h-24 bg-white/5 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const LanguageSettings: React.FC = () => {
  const { data: agentsData, isLoading: isAgentLoading } = useGetAgentQuery();
  const { data: languages = [], isLoading: isLangLoading } =
    useGetAgentLanguagesQuery();
  const [updateAgentLanguage, { isLoading: isUpdatingLanguage }] =
    useUpdateAgentLanguageMutation();
  const [updateAgent, { isLoading: isUpdatingAgent }] =
    useUpdateAgentMutation();

  const isLoading = isAgentLoading || isLangLoading;

  if (isLoading) {
    return <LanguageSettingsSkeleton />;
  }

  const agent = Array.isArray(agentsData) ? agentsData[0] : agentsData;
  const multilingualEnabled = agent?.multilingual_enabled ?? false;
  const defaultLanguages = languages.filter((l) => l.is_default);

  const handleLanguageUpdate = async (id: number, language: string) => {
    try {
      await updateAgentLanguage({
        data: {
          id,
          language,
          is_greeting: true,
          is_default: true,
        },
      }).unwrap();
      toast.success(
        `${languageNames[language] || language} updated successfully`,
      );
    } catch (error) {
      toast.error("Failed to update language settings");
      console.error("Language update error:", error);
    }
  };

  const handleToggleMultilingual = async () => {
    if (!agent) return;
    const businessId =
      languages?.[0]?.business || agent.language?.[0]?.business;
    if (!businessId) {
      toast.error("Business ID not found");
      return;
    }

    try {
      await updateAgent({
        business_id: businessId,
        data: {
          id: agent.id,
          multilingual_enabled: !multilingualEnabled,
        },
      }).unwrap();
      toast.success(
        `Multilingual mode ${!multilingualEnabled ? "enabled" : "disabled"}`,
      );
    } catch (error) {
      toast.error("Failed to update agent settings");
      console.error("Agent update error:", error);
    }
  };

  return (
    <div
      className="mt-8 p-4 sm:p-8 font-sans rounded-[20px]"
      style={{
        background: "rgba(157, 157, 157, .25)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="w-full rounded-[20px]  ">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-white text-[34px] font-semibold tracking-tight mb-2">
            Language Settings
          </h1>
          <p className="text-[#9E9E9E] text-[24px]">
            Enable multilingual support to serve customers in their preferred
            language
          </p>
        </div>

        {/* Multilingual Mode Toggle */}
        <div className="mb-10 pb-8 ">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-white text-[18px] font-medium tracking-wide">
                    Enable Multilingual Mode
                  </span>
                </div>
                <p className="text-[#9E9E9E] mt-1.5 text-[15px]">
                  Agent will automatically detect and respond in the caller's
                  language
                </p>
              </div>
            </div>

            {/* Gradient Switch */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleToggleMultilingual}
                disabled={isUpdatingAgent}
                className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full transition-colors duration-300 ease-in-out focus:outline-none ${
                  multilingualEnabled
                    ? "bg-linear-to-r from-cyan-400 to-blue-500"
                    : "bg-[#334155]"
                } ${isUpdatingAgent ? "opacity-50 cursor-not-allowed" : ""}`}
                role="switch"
                aria-checked={multilingualEnabled}
              >
                <span className="sr-only">Multilingual Mode</span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out self-center ${
                    multilingualEnabled ? "translate-x-6.5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Columns Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8">
          <div
            className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 p-5"
            style={{
              borderRadius: "20px",
              background: "rgba(157, 157, 157, .25)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* Column 1: Supported Languages */}
            <div className="">
              <h2 className="text-white text-[20px] font-medium mb-5">
                Supported Languages
              </h2>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div
                    key={`supp-lang-${lang.id}`}
                    onClick={() =>
                      !isUpdatingLanguage &&
                      handleLanguageUpdate(lang.id, lang.language)
                    }
                    className={`group flex items-center justify-between p-4 rounded-2xl bg-[#112447] transition-all ${
                      isUpdatingLanguage
                        ? "opacity-70 cursor-not-allowed"
                        : "cursor-pointer hover:bg-[#162d5a]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 shrink-0 bg-[#0A1A3A] rounded-full flex items-center justify-center text-[12px] font-bold text-[#A0B8E0] border border-[#234280] uppercase">
                        {lang.language}
                      </div>
                      <span className="text-[#F1F5F9] font-medium text-[15px]">
                        {languageNames[lang.language] || lang.language}
                      </span>
                    </div>
                    {lang.is_default ? (
                      <div className="w-6 h-6 flex items-center justify-center text-cyan-400">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-6 h-6 flex items-center justify-center text-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
                {languages.length === 0 && (
                  <p className="text-[#9E9E9E] italic">
                    No supported languages found.
                  </p>
                )}
              </div>
            </div>

            {/* Column 2: Default Greeting Language */}
            <div>
              <h2 className="text-white text-[20px] font-medium mb-5">
                Default Greeting Language
              </h2>
              <div className="space-y-3">
                {defaultLanguages.map((lang) => (
                  <div
                    key={`default-lang-${lang.id}`}
                    className="flex items-center justify-between p-4 rounded-2xl cursor-default transition-all bg-[#1D4A4A] shadow-[0_0_15px_rgba(45,212,191,0.15)]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-[12px] font-bold border transition-colors bg-[#0F2E2E] text-teal-300 border-teal-700 uppercase">
                        {lang.language}
                      </div>
                      <span className="font-medium text-[15px] text-white">
                        {languageNames[lang.language] || lang.language}
                      </span>
                    </div>
                    <div className="w-6 h-6 flex items-center justify-center text-teal-400">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
                {defaultLanguages.length === 0 && (
                  <p className="text-[#9E9E9E] italic">
                    No default language selected.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Column 3: Voice Requirements */}
          <div
            className="pt-0.5 "
            style={{
              background: "rgba(157, 157, 157, .25)",
              borderRadius: "20px",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* Spanish Voice */}
            <div className="relative rounded-2xl p-5 shadow-sm">
              <div className=" mb-4">
                <h3 className="text-white text-[20px] font-normal tracking-wide">
                  Spanish Voice
                </h3>
              </div>
              <div className="bg-[#131313] rounded-xl p-4 ">
                <p className="text-[#9E9E9E] font-medium mb-2 text-[20px]">
                  Cartesia Voice Required
                </p>
                <p className="text-[#9E9E9E] leading-[1.6] text-[16px]">
                  To generate a Spanish voice, select a voice that "supports
                  bilingual" from the Voice & Style section above.
                </p>
              </div>
            </div>

            {/* Russian Voice */}
            <div className="relative rounded-2xl p-5 shadow-sm">
              <div className="  mb-4">
                <h3 className="text-white text-[20px] font-normal tracking-wide">
                  Russian Voice
                </h3>
              </div>
              <div className="bg-[#131313] rounded-xl p-4 ">
                <p className="text-[#9E9E9E] font-medium mb-2 text-[20px]">
                  Cartesia Voice Required
                </p>
                <p className="text-[#9E9E9E] leading-[1.6] text-[16px]">
                  To generate a Russian voice, select a voice that "supports
                  bilingual" from the Voice & Style section above.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSettings;
