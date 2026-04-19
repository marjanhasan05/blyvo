import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/store/features/settings/settings.api";

interface ChangePasswordDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
  open,
  setOpen,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const extractErrorMessage = (error: unknown) => {
    const fallback = "Failed to change password. Please try again.";

    if (!error || typeof error !== "object") return fallback;

    const e = error as {
      data?: unknown;
      error?: string;
    };

    if (
      Array.isArray(e.data) &&
      e.data.length > 0 &&
      typeof e.data[0] === "string"
    ) {
      return e.data[0];
    }

    if (typeof e.data === "string") {
      return e.data;
    }

    if (e.data && typeof e.data === "object") {
      const dataObj = e.data as Record<string, unknown>;

      if (typeof dataObj.message === "string") {
        return dataObj.message;
      }

      if (typeof dataObj.detail === "string") {
        return dataObj.detail;
      }

      for (const value of Object.values(dataObj)) {
        if (
          Array.isArray(value) &&
          value.length > 0 &&
          typeof value[0] === "string"
        ) {
          return value[0];
        }
      }
    }

    return e.error || fallback;
  };

  const handleSubmit = async () => {
    if (
      !currentPassword.trim() ||
      !newPassword.trim() ||
      !confirmPassword.trim()
    ) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const response = await changePassword({
        old_password: currentPassword,
        new_password: newPassword,
      }).unwrap();

      toast.success(response.message || "Password changed successfully");
      resetForm();
      setOpen(false);
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  const handleClose = () => {
    if (isLoading) return;
    resetForm();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          resetForm();
        }
        setOpen(nextOpen);
      }}
    >
      <DialogContent className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 border-none">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Change Password
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter your current and new password to update your account security.
        </p>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-600 mb-1.5 block">
              Enter your current password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={isLoading}
                className="w-full border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm rounded-xl px-4 py-3 outline-none focus:border-gray-400 transition-colors pr-10"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
                type="button"
              >
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1.5 block">
              Enter your new password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isLoading}
                className="w-full border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm rounded-xl px-4 py-3 outline-none focus:border-gray-400 transition-colors pr-10"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
                type="button"
              >
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1.5 block">
              Confirm your new password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                className="w-full border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm rounded-xl px-4 py-3 outline-none focus:border-gray-400 transition-colors pr-10"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
                type="button"
              >
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 bg-white border border-gray-200 text-gray-900 text-sm font-medium rounded-xl py-2.5 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 bg-black hover:bg-gray-900 text-white text-sm font-semibold rounded-xl py-2.5 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
