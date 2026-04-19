import { useState } from "react";
import { CircleCheck, Info } from "lucide-react";

export default function LanguageSettingsSection() {
  const [multilingualEnabled, setMultilingualEnabled] = useState(true);
  const [selectedSupported, setSelectedSupported] = useState("US");
  const [selectedDefault, setSelectedDefault] = useState("US");

  const supportedLanguages = [
    { code: "US", name: "English" },
    { code: "MX", name: "Spanish" },
    { code: "AR", name: "Arabic" },
    { code: "RU", name: "Russian" },
  ];

  const defaultLanguages = [
    { code: "US", name: "English" },
    { code: "MX", name: "Spanish" },
  ];

  return (
    <div className="mt-6 px-6 ">
      <div
        className=" rounded-3xl p-8 "
        style={{
          background: `radial-gradient(ellipse 70% 60% at top right, rgba(80, 80, 80, 0.45) 0%, #000000 70%)`,
        }}
      >
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-normal text-white mb-2">
            Language Settings
          </h2>
          <p className="text-gray-400 text-base">
            Enable multilingual support to serve customers in their preferred
            language
          </p>
        </div>

        <div className="  rounded-3xl ">
          {/* Enable Multilingual Mode Toggle */}
          <div className="mb-6 pb-2 ">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-normal text-white mb-1">
                  Enable Multilingual Mode
                </h2>
                <p className="text-base text-gray-400">
                  Agent will automatically detect and respond in the caller's
                  language
                </p>
              </div>
              <button
                onClick={() => setMultilingualEnabled(!multilingualEnabled)}
                className={`relative inline-flex h-8 w-16 items-center cursor-pointer rounded-full transition-colors px-1 ${multilingualEnabled
                    ? "toggle-on"
                    : "bg-gray-600 justify-start"
                  }`}
              >
                <span className="inline-block h-6 w-6 rounded-full bg-white transition-transform" />
              </button>
            </div>
          </div>

          {/* Main Content Grid - 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8  ">
            {/* Purple Mother Div */}
            <div className="md:col-span-2   rounded-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                {/* Left Column - Supported Languages */}
                <div className="rounded-lg ">
                  <h3 className="text-lg font-normal text-white mb-4">
                    Supported Languages
                  </h3>

                  <div className="space-y-3 p-4 rounded-3xl">
                    {supportedLanguages.map((lang) => {
                      const active = selectedSupported === lang.code;

                      return (
                        <div
                          key={lang.code}
                          className={`rounded-2xl p-px ${active ? "bg-[rgba(255,255,255,0.02)]" : ""}`}
                        >
                          <button
                            onClick={() => setSelectedSupported(lang.code)}
                            className={`w-full flex items-center gap-3 py-4 cursor-pointer p-3 rounded-2xl transition-colors ${active
                                ? "bg-[rgba(255,255,255,0.02)] border border-gray-700 hover:border-gray-500"
                                : "bg-[rgba(34,34,34,0.5)]"
                              }`}
                          >
                            <span className="text-sm bg-[rgba(242,244,245,0.1)] h-10 w-10 rounded-full flex items-center justify-center font-normal text-gray-200">
                              {lang.code}
                            </span>

                            <span className="text-lg text-white font-normal flex-1 text-left">
                              {lang.name}
                            </span>

                            {active && (
                              <CircleCheck className="w-6 h-6 text-white shrink-0" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Middle Column - Default Greeting Language */}
                <div className="rounded-lg">
                  <h3 className="text-lg font-normal text-white mb-4">
                    Default Greeting Language
                  </h3>

                  <div className="space-y-3  p-4 rounded-3xl">
                    {defaultLanguages.map((lang) => {
                      const active = selectedDefault === lang.code;

                      return (
                        <div
                          key={lang.code}
                          className={`rounded-2xl p-px ${active ? "bg-[rgba(255,255,255,0.02)]" : ""}`}
                        >
                          <button
                            onClick={() => setSelectedDefault(lang.code)}
                            className={`w-full flex items-center gap-3 py-4 cursor-pointer p-3 rounded-2xl transition-colors ${active
                                ? "bg-[rgba(255,255,255,0.02)] border border-gray-700 hover:border-gray-500"
                                : "bg-[rgba(34,34,34,0.5)]"
                              }`}
                          >
                            <span className="text-sm bg-[rgba(242,244,245,0.1)] h-10 w-10 rounded-full flex items-center justify-center font-normal text-gray-200">
                              {lang.code}
                            </span>

                            <span className="text-lg text-white font-normal flex-1 text-left">
                              {lang.name}
                            </span>

                            {active && (
                              <CircleCheck className="w-6 h-6 text-white shrink-0" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column — soft amber info cards (NOT aggressive red/amber warnings) */}
            <div className="space-y-4 bg-black p-6 rounded-3xl">
              {/* Spanish Voice info */}
              <div className="bg-[#1a1400] p-4 rounded-3xl border border-amber-700/30">
                <h4 className="font-medium text-amber-400 text-base flex items-center gap-2 mb-3">
                  <Info size={17} className="shrink-0" />
                  Spanish Voice — Bilingual Voice Required
                </h4>
                <p className="text-sm text-[#8a8070] leading-relaxed">
                  To generate a Spanish voice, select a voice that supports
                  bilingual from the Voice &amp; Style section above.
                </p>
              </div>

              {/* Russian Voice info */}
              <div className="bg-[#1a1400] p-4 rounded-3xl border border-amber-700/30">
                <h4 className="font-medium text-amber-400 text-base flex items-center gap-2 mb-3">
                  <Info size={17} className="shrink-0" />
                  Russian Voice — Bilingual Voice Required
                </h4>
                <p className="text-sm text-[#8a8070] leading-relaxed">
                  To generate a Russian voice, select a voice that supports
                  bilingual from the Voice &amp; Style section above.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
