import React, { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InviteUserDialog from "./InviteUserDialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useGetMemberInvitationsQuery } from "@/store/features/settings/settings.api";

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  lastActive: string;
  isCurrent?: boolean;
}

interface TeamMembersDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TeamMembersDialog: React.FC<TeamMembersDialogProps> = ({
  open,
  setOpen,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [revokedUserEmail, setRevokedUserEmail] = useState<string>("");

  const {
    data: invitations = [],
    isLoading,
    isError,
    refetch,
  } = useGetMemberInvitationsQuery();

  const membersList: Member[] = useMemo(() => {
    const mapped = invitations.map((inv) => {
      const nameFromEmail = inv.email?.split("@")[0] || inv.email;
      const roleLabel = inv.role === "org_admin" ? "Admin" : "Member";
      return {
        id: String(inv.id),
        name: nameFromEmail,
        email: inv.email,
        role: roleLabel,
        lastActive: "-",
      };
    });

    const q = searchQuery.trim().toLowerCase();
    if (!q) return mapped;
    return mapped.filter(
      (m) =>
        m.email.toLowerCase().includes(q) || m.name.toLowerCase().includes(q),
    );
  }, [invitations, searchQuery]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-5xl! bg-white rounded-2xl shadow-xl p-6 lg:p-8 border-none">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                Team Members
              </h2>
              <p className="text-sm text-gray-500 pr-6">
                Invite team members to collaborate on your agents and manage
                calls together.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            {/* Search and Action Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 w-full flex-1">
                {/* Search Input */}
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 flex-1 max-w-md focus-within:border-gray-400 transition-colors">
                  <Search className="text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search by name or email"
                    className="flex-1 bg-transparent border-none outline-none ml-2 text-sm text-gray-900 placeholder:text-gray-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* All Filter */}
                <Select defaultValue="all">
                  <SelectTrigger className="w-32 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl h-auto py-2.5 px-4 outline-none focus:ring-0 focus:ring-offset-0 focus:border-gray-400">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 text-gray-900 rounded-xl shadow-lg">
                    <SelectItem
                      value="all"
                      className="focus:bg-gray-100 focus:text-gray-900 cursor-pointer hover:bg-gray-100"
                    >
                      All
                    </SelectItem>
                    <SelectItem
                      value="admin"
                      className="focus:bg-gray-100 focus:text-gray-900 cursor-pointer hover:bg-gray-100"
                    >
                      Admin
                    </SelectItem>
                    <SelectItem
                      value="editor"
                      className="focus:bg-gray-100 focus:text-gray-900 cursor-pointer hover:bg-gray-100"
                    >
                      Editor
                    </SelectItem>
                    <SelectItem
                      value="viewer"
                      className="focus:bg-gray-100 focus:text-gray-900 cursor-pointer hover:bg-gray-100"
                    >
                      Viewer
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <button
                onClick={() => setInviteOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-gray-900 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap cursor-pointer"
              >
                <Plus size={16} />
                Invite User
              </button>
            </div>

            {/* Member List */}
            <div className="flex flex-col gap-2">
              {isLoading ? (
                <div className="text-sm text-gray-500 py-6 text-center">
                  Loading team members...
                </div>
              ) : null}
              {isError ? (
                <div className="text-sm text-red-600 py-3 text-center">
                  Failed to load team members.{" "}
                  <button
                    type="button"
                    onClick={() => refetch()}
                    className="underline"
                  >
                    Retry
                  </button>
                </div>
              ) : null}

              {!isLoading && !isError && membersList.length === 0 ? (
                <div className="text-sm text-gray-500 py-6 text-center">
                  No invitations found.
                </div>
              ) : null}

              {membersList.map((member) => (
                <div
                  key={member.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 transition-colors hover:border-gray-300"
                >
                  {/* User Section */}
                  <div className="flex flex-col gap-1 min-w-[200px] flex-1">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1 lg:hidden">
                      User
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {member.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-900 text-sm font-medium">
                            {member.name}
                          </span>
                          {member.isCurrent && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-medium uppercase tracking-wider">
                              You
                            </span>
                          )}
                        </div>
                        <span className="text-gray-500 text-xs">
                          {member.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Role Section */}
                  <div className="flex flex-col gap-1 w-24">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1 lg:hidden">
                      Role
                    </p>
                    <span className="text-sm text-gray-700">{member.role}</span>
                  </div>

                  {/* <div className="flex flex-col gap-1 w-32">
                                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1 lg:hidden">Last active</p>
                                        <span className="text-sm text-gray-700">{member.lastActive}</span>
                                    </div>

                                  
                                    <div className="flex flex-col gap-1">
                                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1 lg:hidden">Actions</p>
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-gray-500 hover:text-black bg-gray-50 hover:bg-gray-100 border border-transparent hover:border-gray-200 rounded-lg transition-colors cursor-pointer" title="Reset Password" disabled>
                                                <RotateCcw size={16} />
                                            </button>
                                            <button className="p-2 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-transparent hover:border-red-200 rounded-lg transition-colors cursor-pointer" title="Remove Member" disabled>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div> */}
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <InviteUserDialog
        open={inviteOpen}
        setOpen={setInviteOpen}
        revokedUserEmail={revokedUserEmail}
        setRevokedUserEmail={setRevokedUserEmail}
      />
    </>
  );
};

export default TeamMembersDialog;
