import { FC } from "react";
import { Phone, PhoneOff } from "lucide-react";

interface CallItemProps {
  type: string;
  status: "Successful" | "Missed";
  date: string;
  time: string;
  duration: string;
  via?: string;
}

const statusColor = {
  Successful: "bg-green-600/20 text-green-400",
  Missed: "bg-red-600/20 text-red-400",
};

const CallIcon = ({ status }: { status: string }) => {
  return status === "Missed" ? (
    <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center">
      <PhoneOff className="text-red-400" size={20} />
    </div>
  ) : (
    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
      <Phone className="text-white/70" size={20} />
    </div>
  );
};

const CallItem: FC<CallItemProps> = ({
  type,
  status,
  date,
  time,
  duration,
  via,
}) => {
  return (
    <div className="flex justify-between py-5">
      {/* Left Section */}
      <div className="flex gap-4">
        <CallIcon status={status} />

        <div>
          <div className="flex items-center gap-3">
            <p className="text-white text-sm">{type}</p>
            <span
              className={`px-2 py-0.5 text-xs rounded-full ${statusColor[status]}`}
            >
              {status}
            </span>
          </div>
          <p className="text-gray-400 text-xs mt-1">
            {date} &nbsp; {time}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="text-right">
        <p className="text-white text-sm font-medium">{duration}</p>
        <p className="text-gray-400 text-xs">{via ? `via ${via}` : "---"}</p>
      </div>
    </div>
  );
};

export type RecentCallsApiItem = {
  id: number;
  title: string;
  status: string;
  date: string;
  time: string;
  duration: string;
  via: string;
};

const RecentCalls: FC<{
  recentCalls?: RecentCallsApiItem[] | null;
  total?: number | null;
}> = ({ recentCalls, total }) => {
  const list: CallItemProps[] =
    recentCalls?.map((c) => ({
      type: c.title,
      status: c.status === "Missed" ? "Missed" : "Successful",
      date: c.date,
      time: c.time,
      duration: c.duration,
      via: c.via || undefined,
    })) ?? [];

  const count = typeof total === "number" ? total : list.length;
  return (
    <div
      className="bg-[#0E0E10] p-6 rounded-2xl w-full  mt-8 text-white"
      style={{
        background: "rgba(157, 157, 157, .25)",

        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-medium">Recent Calls</h2>
          <span className="px-2 py-0.5 bg-white/10 text-xs rounded-full">
            {count}
          </span>
        </div>

        <button
          type="button"
          disabled
          className="text-gray-500 text-sm cursor-not-allowed"
        >
          See all →
        </button>
      </div>

      {/* List */}
      <div>
        {list.length === 0 ? (
          <p className="text-gray-400 text-sm py-8 text-center">
            No recent calls yet.
          </p>
        ) : (
          list.map((call, idx) => (
            <div key={idx}>
              <CallItem {...call} />
              {idx !== list.length - 1 && <div className="h-px w-full bg-white/10" />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentCalls;
