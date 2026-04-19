import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAddBusinessAdditionalInfoMutation } from "@/store/features/business/business.api";

type TAddAdditionalInfoForm = {
  content: string;
};

interface AddAdditionalInfoModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  businessId: number | undefined;
}

const MAX_CHARS = 500;

const AddAdditionalInfoModal: React.FC<AddAdditionalInfoModalProps> = ({
  isOpen,
  setIsOpen,
  businessId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<TAddAdditionalInfoForm>({
    defaultValues: { content: "" },
  });

  const content = watch("content") ?? "";
  const charCount = useMemo(() => content.length, [content]);

  const [addInfo, { isLoading }] = useAddBusinessAdditionalInfoMutation();
  const busy = isLoading || isSubmitting;

  const onSubmit = async (values: TAddAdditionalInfoForm) => {
    if (!businessId) {
      toast.error("Business not found");
      return;
    }

    const contentTrimmed = values.content.trim();
    if (!contentTrimmed) {
      toast.error("Information content is required");
      return;
    }

    try {
      await addInfo({
        business_id: businessId,
        data: { content: contentTrimmed },
      }).unwrap();

      toast.success("Information added");
      reset();
      setIsOpen(false);
    } catch {
      toast.error("Failed to add information");
    }
  };

  const onSave = handleSubmit(onSubmit);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogPortal>
        <DialogOverlay className="bg-black/80" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0f] shadow-2xl text-white">
            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-6 pb-3">
              <div>
                <h2 className="text-lg font-semibold leading-tight">
                  Add New Information
                </h2>
                <p className="mt-1 text-sm text-white/60">
                  Add details that help your agent understand your business
                  better
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={busy}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 pb-6 space-y-3">
              <div className="space-y-2">
                <label className="text-sm text-white/70">
                  Information Content
                </label>
                <textarea
                  {...register("content")}
                  placeholder="Enter information about your business..."
                  rows={6}
                  maxLength={MAX_CHARS}
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-[#0E7DFA] focus:ring-2 focus:ring-[#0E7DFA]/30"
                />
                <div className="text-xs text-white/40">
                  {charCount}/{MAX_CHARS} characters
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={busy}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onSave}
                  disabled={busy}
                  className="flex-1 rounded-xl bg-[#0E7DFA] py-3 text-sm font-semibold text-white hover:bg-blue-600 transition-colors disabled:opacity-60"
                >
                  {busy ? "Adding..." : "Add Information"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
};

export default AddAdditionalInfoModal;

