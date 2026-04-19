import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface DeleteServiceModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const DeleteServiceModal: React.FC<DeleteServiceModalProps> = ({
  isOpen,
  setIsOpen,
  onConfirm,
  isLoading = false,
}: DeleteServiceModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogPortal>
        <DialogOverlay />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
            Delete Service
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
            className="w-8 h-8 flex items-center cursor-pointer justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-800 disabled:opacity-50"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        <div className="px-6 py-4 space-y-5">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete this service?
          </p>
        </div>

        <div className="px-6 pb-6 pt-2 flex gap-3">
          <button
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
            className="flex-1 py-3 rounded-2xl border-2 cursor-pointer border-gray-700 text-gray-800 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-3 rounded-2xl cursor-pointer bg-gray-900 text-white font-semibold text-sm hover:bg-gray-700 active:scale-95 transition-all disabled:opacity-60"
          >
            {isLoading ? "Deleting..." : "Delete Service"}
          </button>
        </div>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
};

export default DeleteServiceModal;