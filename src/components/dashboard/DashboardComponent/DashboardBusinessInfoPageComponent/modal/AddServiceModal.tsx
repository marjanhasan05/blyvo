import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAddServicesMutation } from "@/store/features/business/business.api";

interface AddServiceModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  businessId: number | undefined;
}

type TAddServiceForm = {
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  allow_booking: boolean;
};

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  setIsOpen,
  businessId,
}: AddServiceModalProps) => {
  const { register, handleSubmit, reset } = useForm<TAddServiceForm>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      duration: "",
      category: "",
      allow_booking: false,
    },
  });

  const [addService, { isLoading }] = useAddServicesMutation();

  const onSubmit = async (values: TAddServiceForm) => {
    if (!businessId) {
      toast.error("Business not found");
      return;
    }

    try {
      await addService({
        business_id: businessId,
        data: {
          category: values.category,
          name: values.name,
          description: values.description,
          price: values.price,
          duration: parseInt(values.duration, 10),
          allow_booking: values.allow_booking,
        },
      }).unwrap();

      toast.success("Service added successfully");
      reset();
      setIsOpen(false);
    } catch {
      toast.error("Failed to add service");
    }
  };

  const onSave = handleSubmit(onSubmit);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogPortal>
        <DialogOverlay />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
            Add Service
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
            className="w-8 h-8 flex items-center cursor-pointer justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-800 disabled:opacity-50"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-5">
            {/* Service Name */}
            <div className="space-y-1.5">
              <label className="text-lg text-gray-800 flex items-center gap-1.5">
                Service Name
                <span className="text-gray-900">*</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="e.g. Burger Serving"
                className="w-full bg-gray-100 rounded-2xl px-4 py-4 text-base text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-300 transition"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-lg text-gray-800 flex items-center gap-1.5">
                Description
              </label>
              <textarea
                {...register("description")}
                placeholder="Describe the service..."
                rows={3}
                className="w-full bg-gray-100 rounded-2xl px-4 py-4 text-base text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-300 transition resize-none"
              />
            </div>

            {/* Price + Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-lg text-gray-800 flex items-center gap-1.5">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("price")}
                  placeholder="0.00"
                  className="w-full bg-gray-100 rounded-2xl px-4 py-4 text-base text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-300 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-lg text-gray-800 flex items-center gap-1.5">
                  Duration (min)
                </label>
                <input
                  type="number"
                  {...register("duration")}
                  placeholder="30"
                  className="w-full bg-gray-100 rounded-2xl px-4 py-4 text-base text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-300 transition"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-lg text-gray-800 flex items-center gap-1.5">
                Category
              </label>
              <input
                type="text"
                {...register("category")}
                placeholder="e.g. Serving"
                className="w-full bg-gray-100 rounded-2xl px-4 py-4 text-base text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-300 transition"
              />
            </div>

            {/* Checkbox */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                {...register("allow_booking")}
                className="hidden"
              />
              <div
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                  register("allow_booking") ? "bg-gray-900 border-gray-900" : "bg-white border-gray-300 group-hover:border-gray-500"
                }`}
              >
                <svg
                  width="11"
                  height="9"
                  viewBox="0 0 11 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="hidden"
                >
                  <path
                    d="M1 4L4 7L10 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm text-gray-600 select-none">
                Allow customers to book this service
              </span>
            </label>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2 flex gap-3">
          <button
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
            className="flex-1 py-3 rounded-2xl border-2 cursor-pointer border-gray-700 text-gray-800 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={isLoading}
            className="flex-1 py-3 rounded-2xl cursor-pointer bg-gray-900 text-white font-semibold text-sm hover:bg-gray-700 active:scale-95 transition-all disabled:opacity-60"
          >
            {isLoading ? "Adding..." : "Add Service"}
          </button>
        </div>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
};

export default AddServiceModal;
