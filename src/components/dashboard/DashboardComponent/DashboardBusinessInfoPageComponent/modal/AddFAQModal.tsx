import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAddBusinessFAQsMutation } from "@/store/features/business/business.api";

type TAddFAQForm = {
  question: string;
  answer: string;
};

interface AddFAQModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  businessId: number | undefined;
}

const AddFAQModal: React.FC<AddFAQModalProps> = ({
  isOpen,
  setIsOpen,
  businessId,
}) => {
  const { register, handleSubmit, reset } = useForm<TAddFAQForm>({
    defaultValues: { question: "", answer: "" },
  });

  const [addFAQ, { isLoading }] = useAddBusinessFAQsMutation();

  const onSubmit = async (values: TAddFAQForm) => {
    if (!businessId) {
      toast.error("Business not found");
      return;
    }

    const question = values.question.trim();
    const answer = values.answer.trim();
    if (!question || !answer) {
      toast.error("Question and answer are required");
      return;
    }

    try {
      await addFAQ({
        business_id: businessId,
        data: { question, answer },
      }).unwrap();

      toast.success("FAQ added");
      reset();
      setIsOpen(false);
    } catch {
      toast.error("Failed to add FAQ");
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
                  Add New FAQ
                </h2>
                <p className="mt-1 text-sm text-white/60">
                  Create a new FAQ for your business
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 pb-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-white/70">Question</label>
                <input
                  type="text"
                  {...register("question")}
                  placeholder="What is your question?"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-[#0E7DFA] focus:ring-2 focus:ring-[#0E7DFA]/30"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-white/70">Answer</label>
                <textarea
                  {...register("answer")}
                  placeholder="Provide the answer..."
                  rows={5}
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-[#0E7DFA] focus:ring-2 focus:ring-[#0E7DFA]/30"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={isLoading}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onSave}
                  disabled={isLoading}
                  className="flex-1 rounded-xl bg-[#0E7DFA] py-3 text-sm font-semibold text-white hover:bg-blue-600 transition-colors disabled:opacity-60"
                >
                  {isLoading ? "Adding..." : "Add FAQ"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
};

export default AddFAQModal;
