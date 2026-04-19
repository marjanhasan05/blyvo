import { SuperAdminHeader } from "@/components/SuperAdmin/SuperAdminHeader";
import { SuperAdminStatCard } from "@/components/SuperAdmin/SuperAdminStatCard";
import { RevenueAnalytics } from "@/components/SuperAdmin/RevenueAnalytics";
import { ClientManagement } from "@/components/SuperAdmin/ClientManagement";
import { UsageAnalytics } from "@/components/SuperAdmin/UsageAnalytics";
import { TrialConversionFunnel } from "@/components/SuperAdmin/TrialConversionFunnel";
import { SystemHealth } from "@/components/SuperAdmin/SystemHealth";
import { ProfitabilitySection } from "@/components/SuperAdmin/ProfitabilitySection";
import { useAppSelector } from "@/store/hook";
import { selectUser } from "@/store/features/auth/auth.slice";

const SuperAdmin = () => {


    const user = useAppSelector(selectUser)
    console.log(user)

    const metrics1 = [
        { label: "Total Businesses", value: "458", trend: "+12%", sub: "vs last month" },
        { label: "Active Businesses", value: "391", trend: "+8%", sub: "85.4% of total" },
        { label: "Free Trial", value: "47", trend: "", sub: "10.3% of total" },
        { label: "Paid Businesses", value: "344", trend: "+18", sub: "this month" },
        { label: "MRR", value: "$67,200", trend: "+24.9%", sub: "vs last month" },
    ];

    const metrics2 = [
        { label: "Revenue This Month", value: "$71,480", trend: "+$12.3K", sub: "incl. overage" },
        { label: "Total Calls Today", value: "2,847", trend: "+6.2%", sub: "vs yesterday" },
        { label: "Minutes Today", value: "8,541", trend: "", sub: "avg 3.0 min/call" },
        { label: "Avg Usage/Biz", value: "142 calls", trend: "", sub: "per month" },
        { label: "Trial → Paid", value: "24%", trend: "+3.1%", sub: "conversion rate" },
    ];

    // Chart Data
    const mrrData = [
        { m: "Sep", v: 12400 },
        { m: "Oct", v: 18200 },
        { m: "Nov", v: 24800 },
        { m: "Dec", v: 31500 },
        { m: "Jan", v: 42100 },
        { m: "Feb", v: 53800 },
        { m: "Mar", v: 67200 },
    ];

    const planData = [
        { n: "Starter", v: 22140, col: "#10b981", c: 124 },
        { n: "Pro", v: 31840, col: "#06b6d4", c: 156 },
        { n: "Scale", v: 13220, col: "#8b5cf6", c: 64 },
    ];

    const indData = [
        { n: "Restaurants", v: 28400, col: "#f59e0b" },
        { n: "Salons", v: 18200, col: "#ec4899" },
        { n: "Clinics", v: 11600, col: "#10b981" },
        { n: "Travel", v: 5200, col: "#06b6d4" },
        { n: "Other", v: 3800, col: "#8b5cf6" },
    ];

    const callData = [
        { d: "Mon", v: 1842 },
        { d: "Tue", v: 2103 },
        { d: "Wed", v: 1956 },
        { d: "Thu", v: 2287 },
        { d: "Fri", v: 2541 },
        { d: "Sat", v: 1203 },
        { d: "Sun", v: 891 },
    ];

    const minsData = [
        { d: "Mon", v: 5526 },
        { d: "Tue", v: 6309 },
        { d: "Wed", v: 5868 },
        { d: "Thu", v: 6861 },
        { d: "Fri", v: 7623 },
        { d: "Sat", v: 3609 },
        { d: "Sun", v: 2673 },
    ];

    const funnelData = [
        { name: "Trials Started", value: 142, percentage: "100%", color: "#3b82f6", gradientId: "gradBlue" },
        { name: "Activated", value: 98, percentage: "69%", color: "#06b6d4", gradientId: "gradCyan" },
        { name: "High Activity", value: 64, percentage: "45%", color: "#10b981", gradientId: "gradEmerald" },
        { name: "Converting", value: 41, percentage: "29%", color: "#f59e0b", gradientId: "gradOrange" },
        { name: "Paid", value: 34, percentage: "24%", color: "#8b5cf6", gradientId: "gradPurple" },
    ];

    const funnelStatusCards = [
        { label: "Expiring in 3 Days", value: 12, color: "text-orange-400", bg: "bg-orange-500/5", border: "border-orange-500/10" },
        { label: "High Activity Trials", value: 23, color: "text-emerald-400", bg: "bg-emerald-500/5", border: "border-emerald-500/10" },
        { label: "No Activity Trials", value: 8, color: "text-rose-400", bg: "bg-rose-500/5", border: "border-rose-500/10" },
    ];

    const topBusinesses = [
        { name: "Noor Medical Center", industry: "Clinic", calls: 892, mins: 4460, rank: 1 },
        { name: "Riyadh Dental Care", industry: "Clinic", calls: 634, mins: 3170, rank: 2 },
        { name: "Al Rayyan Restaurant", industry: "Restaurant", calls: 487, mins: 1461, rank: 3 },
        { name: "Pearl Lounge", industry: "Restaurant", calls: 341, mins: 1023, rank: 4 },
        { name: "Glamour Spa Bahrain", industry: "Salon", calls: 124, mins: 372, rank: 5 },
    ];

    return (
        <div className="bg-[#080c14] min-h-screen text-slate-200">
            <div className="p-4 md:py-6 md:px-7 space-y-8 md:space-y-10 pb-40 scroll-smooth max-w-full overflow-x-hidden">
                {/* HOME SECTION */}
                <div id="home" className="space-y-6 md:space-y-6 scroll-mt-6 cursor-pointer group">
                    <SuperAdminHeader />
                    <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                            {metrics1.map((m, i) => (
                                <SuperAdminStatCard key={i} {...m} />
                            ))}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                            {metrics2.map((m, i) => (
                                <SuperAdminStatCard key={i} {...m} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* REVENUE SECTION */}
                <div id="revenue" className=" scroll-mt-10">
                    <RevenueAnalytics mrrData={mrrData} planData={planData} indData={indData} />
                </div>

                {/* CLIENTS SECTION */}
                <div id="clients" className=" scroll-mt-10 text-white overflow-hidden cursor-pointer group">
                    <ClientManagement />
                </div>

                {/* USAGE SECTION */}
                <div id="usage" className=" scroll-mt-10">
                    <UsageAnalytics callData={callData} minsData={minsData} topBusinesses={topBusinesses} />
                </div>

                {/* TRIALS SECTION */}
                <div id="trials" className=" scroll-mt-10 cursor-pointer group">
                    <TrialConversionFunnel data={funnelData} statusCards={funnelStatusCards} />
                </div>

                {/* SYSTEM SECTION */}
                <div id="system" className=" scroll-mt-10 cursor-pointer group">
                    <SystemHealth />
                </div>

                {/* PROFIT SECTION */}
                <div id="profit" className=" scroll-mt-20 cursor-pointer group">
                    <ProfitabilitySection />
                </div>
            </div>
        </div>
    );
};

export default SuperAdmin;
