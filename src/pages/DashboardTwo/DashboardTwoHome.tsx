import React from "react";
import { ArrowRight } from "lucide-react";
import CommonWrapper from "@/common/CommonWrapper";
import { useGetCallsDashboardQuery } from "@/store/features/calls-dashboard/calls-dashboard.api";

const StatCard = ({
  title,
  value,
  change,
  changeText,
  changeType,
  fillHex,
}: {
  title: string;
  value: string;
  change: string;
  changeText: string;
  changeType: "up" | "down";
  fillHex: string;
}) => {
  const isUp = changeType === "up";
  return (
    <div
      className="relative overflow-hidden w-full  rounded-3xl p-6 lg:p-8 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col h-full min-h-65 cursor-pointer hover:border-white/10 transition-colors"
      style={{
        background: "rgba(157, 157, 157, .25)",

        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Glow Background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-45 h-45 rounded-full pointer-events-none"
        style={{
          background: fillHex,
          filter: "blur(67px)",
          opacity: 0.8,
        }}
      />

      <div className="relative z-10 flex flex-col justify-start pt-5 items-center h-full">
        <div className="flex flex-col gap-y-0.5">
          <span className="text-white text-[18px] font-medium tracking-wider uppercase mb-6">
            {title}
          </span>
          <div className="text-white text-[40px] font-bold leading-none mb-4 tracking-tight">
            {value}
          </div>
          <div className="flex flex-col gap-1.5">
            <span
              className={`text-[14px] font-medium flex items-center gap-1.5 w-fit ${isUp ? "text-[#37D906]" : "text-[#D90606]"}`}
            >
              {isUp ? (
                <svg
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 0L10 8H0L5 0Z" />
                </svg>
              ) : (
                <svg
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 8L0 0H10L5 8Z" />
                </svg>
              )}
              {change}
            </span>
            {changeText && (
              <span className="text-[#9E9E9E] text-[14px]">{changeText}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import CallBreakdown from "../../components/DashboardTwoComponent/CallBreakdown";
import CallVolume from "@/components/DashboardTwoComponent/CallVolume";
import RecentCalls from "@/components/DashboardTwoComponent/RecentCalls";
import AgentsSection from "@/components/DashboardTwoComponent/AgentsSection";
import AgentProfileCard from "@/components/DashboardTwoComponent/AgentProfileCard";

const DashboardTwoHome: React.FC = () => {
  const { data: dashboard } = useGetCallsDashboardQuery();

  const summary = dashboard?.homepage_summary;
  const activityFeed = dashboard?.activity_feed;
  const recentCalls = dashboard?.recent_calls;
  const recentCallsTotal = dashboard?.recent_calls_total;

  const totalCallsValue = summary?.total_calls_handled?.value_display ?? "1,247";
  const totalCallsChange = summary?.total_calls_handled?.change_calls ?? 38;

  const answeredValue = summary?.answered?.value_display ?? "164";
  const answeredChangePct = summary?.answered?.change_percentage ?? 12.3;
  const answeredTrend = summary?.answered?.trend ?? "up";

  const missedValue = summary?.missed?.value_display ?? "22";
  const missedChangePct = summary?.missed?.change_percentage ?? 10.1;
  const missedTrend = summary?.missed?.trend ?? "down";

  const resolvedValue = summary?.resolved?.value_display ?? "141";
  const resolvedChangePct = summary?.resolved?.change_percentage ?? 76;
  const resolvedTrend = summary?.resolved?.trend ?? "up";

  const avgHandleValue = summary?.avg_handle_time?.value_display ?? "2:34";
  const avgHandleChangeSeconds = summary?.avg_handle_time?.change_seconds ?? 8;
  const avgHandleTrend = summary?.avg_handle_time?.trend ?? "down";

  return (
    <div className="  gap-8  ">
      {/* Top Alert Bar */}
      <div
        data-aos="fade-in"
        className="w-full  py-0 mt-4 px-6 flex items-center justify-between gap-6 backdrop-blur-xl border-b border-white/5"
        // style={{
        //     background: 'rgba(82, 98, 199, 0.20)',
        // }}
        style={{
          background: "rgba(157, 157, 157, .25)",

          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <CommonWrapper>
          <div className="flex flex-col md:flex-row md:justify-between justify-center items-center md:gap-30 gap-4">
            <p className="text-white text-[14px] md:text-[16px] text-center md:text-left font-medium  leading-relaxed px-4 md:px-8">
              You've used 86% of your Starter plan 60/70 calls Overages will be
              charged at $1.50/call .
            </p>
            <button className="whitespace-nowrap px-7 py-2.5 bg-white text-black font-bold rounded-xl text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-xl cursor-pointer mr-4 md:mr-8">
              Upgrade Plan <ArrowRight size={18} />
            </button>
          </div>
        </CommonWrapper>
      </div>
      <CommonWrapper className=" ">
        <div data-aos="fade-up" className="flex flex-col gap-10 mt-4">
          {/* Page Heading */}
          <h1 className="text-white px-2 md:px-0 text-4xl md:text-3xl font-bold tracking-tight">
            My Dashboard
          </h1>

          {/* Plan Status Card */}
          <div className="grid grid-cols-5 gap-8">
            <div
              className="col-span-5 md:col-span-2 max-w-4xl w-full  rounded-[40px] p-4 md:p-12 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              style={{
                background: "rgba(157, 157, 157, .25)",

                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                <div className="flex flex-col gap-2">
                  <h2 className="text-white text-xl   uppercase font-light px-1 text-left">
                    Starter Plan
                  </h2>
                  <p className="text-white text-4xl md:text-xl font-bold text-left">
                    60{" "}
                    <span className="text-white/50 text-xl font-light">
                      / 70 calls
                    </span>
                  </p>
                </div>
                <button
                  className="px-8 py-4 font-bold text-white rounded-2xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center gap-2 shadow-[0_10px_30px_-10px_#305BC9] group"
                  style={{
                    background:
                      "linear-gradient(94deg, #66F9E6 7.78%, #305BC9 100%)",
                  }}
                >
                  Upgrade Plan{" "}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>

              {/* Progress Bar Section */}
              <div className="flex flex-col gap-6">
                <div className="h-3 w-full bg-white/5 rounded-full p-0.5 overflow-hidden border border-white/5 shadow-inner">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_0_15px_rgba(102,249,230,0.4)]"
                    style={{
                      width: "86%",
                      background:
                        "linear-gradient(90deg, #66F9E6 0%, #305BC9 100%)",
                    }}
                  />
                </div>
                <p className="text-white/30 text-sm font-medium   tracking-wide text-center px-2">
                  Resets May 10
                </p>
              </div>
            </div>
          </div>

          {/* Stats Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {/* 1st Card: Total Calls */}
            <div
              className="col-span-1 lg:col-span-2 relative overflow-hidden p-6 lg:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col min-h-65"
              style={{
                borderRadius: "29.971px",
                // background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(94deg, #66F9E6 7.78%, #305BC9 100%), #121214'
                background: "rgba(157, 157, 157, .25)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {/* Background Shape */}
              <img
                src="/card/card-shap-1.svg"
                alt="Background Shape"
                className="absolute right-0 bottom-0 h-[140%] max-w-62.5 object-contain pointer-events-none translate-x-2 translate-y-6 opacity-80"
              />

              {/* Background Shape */}
              <img
                src="/card/card-shap-1.svg"
                alt="Background Shape"
                className="absolute right-0 -bottom-24 h-[140%] max-w-62.5 object-contain pointer-events-none transf translate-x-2 translate-y-6 opacity-80"
              />

              <div className="relative z-10 flex flex-col h-full pl-12.5">
                <div>
                  <h2 className="text-white text-[32px] font-medium mb-3">
                    Total calls handled
                  </h2>
                  <div className="flex flex-col gap-2">
                    <span className="text-white text-[48px] lg:text-[48px] font-bold leading-none tracking-tight">
                      {totalCallsValue}
                    </span>
                    <span className="text-white text-[14px] font-medium">
                      +{totalCallsChange} calls from last week
                    </span>
                  </div>
                </div>

                {/* <div className="flex items-center gap-3 mt-auto pt-8">
                  <button className="bg-black text-white px-6 py-2.5 rounded-full text-[13px] font-bold hover:bg-black/80 transition-all shadow-md">
                    Test Agent
                  </button>
                  <div className="bg-white rounded-full flex items-center pr-1.5 pl-5 py-1.5 gap-4 shadow-md hover:bg-white/90 cursor-pointer transition-all">
                    <span className="text-black text-[13px] font-bold whitespace-nowrap">
                      New Agent
                    </span>
                    <div className="w-7.5 h-7.5 rounded-full bg-[#F4F4F4] shadow-inner flex items-center justify-center">
                      <Phone
                        className="w-3.5 h-3.5 text-black"
                        fill="#000000"
                        size={14}
                      />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Additional Stats Cards */}
            <StatCard
              title="ANSWERED"
              value={answeredValue}
              change={`${answeredChangePct}%`}
              changeText="vs last week"
              changeType={answeredTrend === "up" ? "up" : "down"}
              fillHex="#43536E"
            />
            <StatCard
              title="MISSED"
              value={missedValue}
              change={`${missedChangePct}%`}
              changeText="vs last week"
              changeType={missedTrend === "up" ? "up" : "down"}
              fillHex="#387169"
            />
            <StatCard
              title="RESOLVED"
              value={resolvedValue}
              change={`${resolvedChangePct}%`}
              changeText="vs last week"
              changeType={resolvedTrend === "up" ? "up" : "down"}
              fillHex="#42516C"
            />
            <StatCard
              title="AVG HANDLE"
              value={avgHandleValue}
              change={`${avgHandleChangeSeconds}s ${avgHandleTrend === "down" ? "faster" : "slower"}`}
              changeText=""
              changeType={avgHandleTrend === "up" ? "up" : "down"}
              fillHex="#42516C"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 md:gap-6  ">
            <div className="col-span-2" data-aos="fade-up" data-aos-delay="300">
              <CallBreakdown />
              <CallVolume
                activityFeed={
                  activityFeed
                    ? { total_calls: activityFeed.total_calls, chart: activityFeed.chart }
                    : null
                }
              />
              <RecentCalls
                recentCalls={recentCalls ?? null}
                total={recentCallsTotal ?? null}
              />
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <AgentsSection />
              <AgentProfileCard />
            </div>
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default DashboardTwoHome;
