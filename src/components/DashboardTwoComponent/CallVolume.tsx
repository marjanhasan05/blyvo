import React, { useMemo, useState } from "react";

type ActivityFeedPoint = { label: string; calls: number };
type ActivityFeedProps = {
  total_calls: number;
  chart: ActivityFeedPoint[];
};

type Props = {
  /** API activity_feed (weekly) */
  activityFeed?: ActivityFeedProps | null;
};

const CallVolume: React.FC<Props> = ({ activityFeed }) => {
  const [activeTab, setActiveTab] = useState<"Weekly" | "Monthly">("Weekly");
  const [activeIndex, setActiveIndex] = useState<number>(4); // FRI is default 4

  const weeklyFromApi = useMemo(() => {
    if (!activityFeed?.chart?.length) return null;
    return activityFeed.chart.map((p) => ({
      day: String(p.label ?? "").toUpperCase(),
      value: Number(p.calls ?? 0),
    }));
  }, [activityFeed]);

  const weeklyFallback = [
    { day: "MON", value: 41 },
    { day: "TUE", value: 22 },
    { day: "WED", value: 35 },
    { day: "THU", value: 80 },
    { day: "FRI", value: 75 },
    { day: "SAT", value: 60 },
    { day: "SUN", value: 90 },
  ];

  const monthlyFallback = [
    { day: "WK1", value: 52 },
    { day: "WK2", value: 78 },
    { day: "WK3", value: 95 },
    { day: "WK4", value: 120 },
  ];

  const chartData =
    activeTab === "Weekly"
      ? weeklyFromApi ?? weeklyFallback
      : monthlyFallback;

  // We set a max height slightly higher than the max value (41) so bars have some breathing room.
  const maxValue = Math.max(50, ...chartData.map((d) => d.value));

  return (
    <div
      className="w-full h-96 p-6 mt-8 bg-linear-to-br from-[#1A1C23] to-[#0D0E12] rounded-4xl   sm:p-4 flex flex-col shadow-2xl border border-white/5 font-sans relative box-border"
      style={{
        background: "rgba(157, 157, 157, .25)",

        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-2 gap-4">
        <h2 className="text-white text-lg sm:text-xl font-medium tracking-wide">
          Call Volume
        </h2>

        {/* Toggle Switch */}
        <div className="flex bg-[#121318] rounded-full p-1 border border-white/3 shadow-inner items-center">
          <button
            onClick={() => setActiveTab("Weekly")}
            className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
              activeTab === "Weekly"
                ? "bg-[#2A2B35] text-white shadow-md"
                : "text-[#6A6D7A] hover:text-white"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setActiveTab("Monthly")}
            className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
              activeTab === "Monthly"
                ? "bg-[#2A2B35] text-white shadow-md"
                : "text-[#6A6D7A] hover:text-white"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 mt-16 min-h-0 flex items-end justify-between h-full  max-h-54.75  gap-2 sm:gap-4 flex-nowrap  relative">
        {chartData.map((item, index) => {
          const heightPercent = (item.value / maxValue) * 100;
          const isActive = activeIndex === index;

          return (
            <div
              key={item.day}
              className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer"
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Bar Container */}
              <div className="h-full w-full max-h-54.75 flex items-end justify-center relative">
                {/* Floating Tooltip */}
                <div
                  className={`absolute top-0   -left-1 -translate-x-1/2 bg-[#262832]/80 backdrop-blur-md border border-white/10 rounded-xl py-2 px-3 shadow-2xl z-30 min-w-22.5 transition-all duration-300 pointer-events-none origin-bottom
                    ${isActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"}
                  `}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.25 h-1.25 rounded-full bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    <span className="text-white text-[13px] font-medium leading-none">
                      {item.value} Calls
                    </span>
                  </div>
                  <span className="text-[#A4B1CD] text-[11px] font-medium pl-3.25 leading-none">
                    +16%
                  </span>
                </div>

                {/* The Bar */}
                <div
                  className={`w-full max-w-20 relative rounded-[20px] transition-all duration-500 ease-in-out max-h-54.75 origin-bottom flex flex-col items-center justify-end pb-4
                    ${
                      isActive
                        ? "bg-[#2563EB] shadow-[0_0_24px_rgba(37,99,235,0.4)] scale-y-105 scale-x-105 z-20"
                        : "bg-[#182C55] group-hover:bg-[#1E3666] group-hover:scale-y-[1.02] z-10"
                    }
                  `}
                  style={{ height: `${heightPercent}%` }}
                >
                  {/* Small circular indicator for active bar */}
                  <div
                    className={`absolute top-3 right-1/2 w-3 h-3 border-2 border-white rounded-full bg-transparent transition-opacity duration-300
                      ${isActive ? "opacity-100" : "opacity-0"}
                    `}
                  />

                  {/* Value Text */}
                  <span
                    className={`text-sm font-semibold z-10 mt-auto transition-colors duration-300
                      ${isActive ? "text-white" : "text-[#6A81AB] group-hover:text-white"}
                    `}
                  >
                    +{item.value}
                  </span>
                </div>
              </div>

              {/* Day Label */}
              <span
                className={`mt-4 text-[11px] font-bold tracking-wider uppercase transition-colors duration-300
                  ${isActive ? "text-white" : "text-[#6A6D7A] group-hover:text-[#A4B1CD]"}
                `}
              >
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CallVolume;
