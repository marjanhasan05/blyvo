import ActivityFeedChart from "@/components/dashboard/home/ActivityFeedChart";
import MyAgentsPanel from "@/components/dashboard/home/MyAgentsPanel";
import RecentActivity from "@/components/dashboard/home/RecentActivity";
import StatsSection from "@/components/dashboard/home/StatsSection";

const DashboardHome = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-black min-h-screen p-4">

        <div className="lg:col-span-2 min-h-[50vh] text-white px-5 rounded-3xl">
          <StatsSection />
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
            <ActivityFeedChart />
            <RecentActivity />
          </div>
        </div>

        <div className="min-h-[50vh] rounded-[40px] ">
          <MyAgentsPanel />
        </div>

      </div>
    </>
  )
};

export default DashboardHome;
