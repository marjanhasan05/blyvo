import React, { useState } from "react";
import BaseDialog from "@/common/BaseDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RevokeInviteDialog from "./RevokeInviteDialog";
import { toast } from "sonner";
import {
  MemberInvitationRole,
  useInviteMemberMutation,
} from "@/store/features/settings/settings.api";

interface InviteUserDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  revokedUserEmail: string;
  setRevokedUserEmail: (email: string) => void;
}

const InviteUserDialog: React.FC<InviteUserDialogProps> = ({
  open,
  setOpen,
  revokedUserEmail,
  setRevokedUserEmail,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  revokedUserEmail: string;
  setRevokedUserEmail: (email: string) => void;
}) => {
  const [revokeOpen, setRevokeOpen] = useState(false);
  const [role, setRole] = useState<MemberInvitationRole>("org_member");
  const [frontendUrl, setFrontendUrl] = useState<string>(
    typeof window !== "undefined" ? window.location.origin : "",
  );
  const [expiresAtLocal, setExpiresAtLocal] = useState<string>("");
  const [inviteMember, { isLoading }] = useInviteMemberMutation();

  const buildExpiresAt = () => {
    // Default: 30 days from now (backend accepts ISO, e.g. 2026-05-01T08:30:55.123456Z)
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString();
  };

  const toIsoFromDatetimeLocal = (value: string) => {
    // value example: "2026-05-01T14:30"
    // Convert assuming local timezone; backend accepts ISO (Z or offset)
    const dt = new Date(value);
    return Number.isNaN(dt.getTime()) ? null : dt.toISOString();
  };

  const handleInvite = async () => {
    const email = revokedUserEmail.trim();
    if (!email) {
      toast.error("Email is required");
      return;
    }
    const url = frontendUrl.trim();
    if (!url) {
      toast.error("Frontend URL is required");
      return;
    }

    const expiresAtIso =
      expiresAtLocal.trim().length > 0
        ? toIsoFromDatetimeLocal(expiresAtLocal)
        : buildExpiresAt();

    if (!expiresAtIso) {
      toast.error("Invalid expiry date");
      return;
    }

    try {
      await inviteMember({
        frontend_url: url,
        email,
        role,
        expires_at: expiresAtIso,
      }).unwrap();

      toast.success("Invitation sent");
      setOpen(false);
      setRevokedUserEmail("");
      setRole("org_member");
      setFrontendUrl(
        typeof window !== "undefined" ? window.location.origin : "",
      );
      setExpiresAtLocal("");
    } catch {
      toast.error("Failed to send invitation");
    }
  };

  return (
    <>
      <BaseDialog
        open={open}
        setOpen={setOpen}
        title="Invite user"
        description={
          <span className="text-[#9E9E9E] text-xs md:text-sm ">
            An invitation will be sent to this email address with a link to
            complete their account.
          </span>
        }
        maxWidth="md"
        className="w-[660px] max-w-[95vw]"
      >
        <div className="flex flex-col gap-8 py-4 w-full">
          {/* Email Address */}
          <div className="flex flex-col gap-3">
            <label className="text-[#000] font-geist text-sm md:text-base font-normal leading-normal">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter an address"
              onChange={(e) => setRevokedUserEmail(e.target.value)}
              className="w-full p-5 bg-[#F2F4F5] rounded-[20px] text-black font-geist text-xl font-normal placeholder:text-[#9E9E9E] outline-none border-none"
            />
          </div>

          {/* Frontend URL */}
          <div className="flex flex-col gap-3">
            <label className="text-[#000] font-geist text-sm md:text-base font-normal leading-normal">
              Frontend URL
            </label>
            <input
              type="url"
              placeholder="https://your-frontend.com"
              value={frontendUrl}
              onChange={(e) => setFrontendUrl(e.target.value)}
              className="w-full p-5 bg-[#F2F4F5] rounded-[20px] text-black font-geist text-xl font-normal placeholder:text-[#9E9E9E] outline-none border-none"
            />
          </div>

          {/* Expires at */}
          <div className="flex flex-col gap-3">
            <label className="text-[#000] font-geist text-sm md:text-base font-normal leading-normal">
              Expires at
            </label>
            <input
              type="datetime-local"
              value={expiresAtLocal}
              onChange={(e) => setExpiresAtLocal(e.target.value)}
              className="w-full p-5 bg-[#F2F4F5] rounded-[20px] text-black font-geist text-xl font-normal placeholder:text-[#9E9E9E] outline-none border-none"
            />
            <span className="text-[#9E9E9E] text-xs md:text-sm">
              Leave empty to use default (30 days).
            </span>
          </div>

          {/* Role */}
          <div className="flex flex-col gap-3">
            <label className="text-[#000] font-geist text-sm md:text-base font-normal leading-normal">
              Role
            </label>
            <Select
              value={role}
              onValueChange={(v) => setRole(v as MemberInvitationRole)}
            >
              <SelectTrigger className="w-full bg-[#F2F4F5] border-none rounded-[20px] p-5 h-auto font-geist text-xl font-normal text-black shadow-none focus:ring-0 focus:ring-offset-0 [&>svg]:size-6">
                <SelectValue placeholder="Member" />
              </SelectTrigger>
              <SelectContent className="rounded-[20px] bg-white border-none shadow-xl">
                <SelectItem
                  value="org_member"
                  className="font-geist text-lg cursor-pointer"
                >
                  Member
                </SelectItem>
                <SelectItem
                  value="org_admin"
                  className="font-geist text-lg cursor-pointer"
                >
                  Admin
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
            <button
              onClick={() => setOpen(false)}
              disabled={isLoading}
              className="w-full sm:w-auto px-12 py-2 border border-[#212121] rounded-xl font-geist text-sm font-normal text-[#000] hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleInvite}
              disabled={isLoading}
              className="w-full sm:w-auto px-12 py-2 bg-[#212121] rounded-xl font-geist text-sm font-normal text-white hover:opacity-90 transition-opacity cursor-pointer"
            >
              {isLoading ? "Inviting..." : "Invite"}
            </button>
          </div>
        </div>
      </BaseDialog>
      <RevokeInviteDialog
        open={revokeOpen}
        setOpen={setRevokeOpen}
        setRevokeOpen={setRevokeOpen}
        email={revokedUserEmail}
      />
    </>
  );
};

export default InviteUserDialog;
