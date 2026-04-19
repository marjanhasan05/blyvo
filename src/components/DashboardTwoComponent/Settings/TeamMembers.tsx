import React, { useState } from "react";
import TeamMembersDialog from "@/components/dashboard/settings/TeamMembersDialog";

const TeamMembers: React.FC = () => {
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);

  return (
    <>
      <div
        className="w-full mt-8  bg-[#111216] md:bg-[#13141a] rounded-3xl p-6 md:p-8 space-y-8 border border-white/5 font-sans"
        style={{
          background: "rgba(157, 157, 157, .25)",

          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Header */}
        <div className="">
          <h2 className="text-xl md:text-2xl font-medium text-white">
            Team Members
          </h2>
          <p className="text-gray-400 text-sm">
            Invite team members to collaborate on your agents and manage calls
            together.{" "}
          </p>
        </div>

        {/* Security Section */}
        <div
          className="bg-[#0b0c0f] rounded-3xl p-6 flex justify-between items-center mt-6"
          style={{
            background: "rgba(100, 100, 100, .10)",

            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div className="space-y-1">
            <h3 className="text-white text-[15px] font-medium">Manage Team</h3>
            <p className="text-gray-400 text-sm">
              Invite, remove, or changes roles
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsTeamDialogOpen(true)}
            className="bg-[#262831] hover:bg-[#32343e] transition-colors text-white text-sm font-medium py-2 px-5 rounded-2xl"
          >
            Manage
          </button>
        </div>
        {/* Form Fields */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
       
        <div className="space-y-3">
          <label className="text-gray-200 text-sm font-medium">Name</label>
          <div className="bg-[#1f2127] rounded-xl px-4 py-3.5 border border-transparent hover:border-white/10 transition-colors">
            <span className="text-gray-400 text-sm">Sazzy Dune</span>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-gray-200 text-sm font-medium">Email</label>
          <div className="bg-[#1f2127] rounded-xl px-4 py-3.5 border border-transparent hover:border-white/10 transition-colors">
            <span className="text-gray-400 text-sm">
              testing1234515@proton.me
            </span>
          </div>
        </div>
      </div> */}
      </div>

      <TeamMembersDialog
        open={isTeamDialogOpen}
        setOpen={setIsTeamDialogOpen}
      />
    </>
  );
};

export default TeamMembers;
