// import React from "react";

// export default function AdditionalInformationSection() {
//   return <div>AdditionalInformationSection</div>;
// }

import { Plus, TrashIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import AddAdditionalInfoModal from "./modal/AddAdditionalInfoModal";
import {
  TBusinessAdditionalInfo,
  useDeleteBusinessAdditionalInfoMutation,
} from "@/store/features/business/business.api";

type AdditionalInformationProps = {
  businessId?: number;
  items: TBusinessAdditionalInfo[];
};

export default function AdditionalInformation({
  businessId,
  items,
}: AdditionalInformationProps) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteInfo, { isLoading: isDeleting }] =
    useDeleteBusinessAdditionalInfoMutation();

  const resolvedItems = useMemo(() => items ?? [], [items]);

  const handleDelete = async (item: TBusinessAdditionalInfo) => {
    if (!businessId) {
      toast.error("Business not found");
      return;
    }
    if (!item?.id) return;

    try {
      await deleteInfo({ business_id: businessId, id: item.id }).unwrap();
      toast.success("Information deleted");
    } catch {
      toast.error("Failed to delete information");
    }
  };

  return (
    <div className="mt-16">
      <div
        className="rounded-3xl "
        // style={{
        //   background: `radial-gradient(ellipse 70% 60% at top right, rgba(80, 80, 80, 0.45) 0%, #000000 70%)`,
        // }}
        style={{
          background: "rgba(157, 157, 157, .25)",

          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Header */}
        <div className="mb-6 p-6">
          <h2 className="text-2xl font-semibold text-white">
            Additional Information
          </h2>
          <p className="text-base text-[#9E9E9E] mt-1">
            Anything else your agent should know about your business
          </p>
        </div>

        <div className=" rounded-2xl p-6">
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
            {resolvedItems.map((item, index) => (
              <div
                key={item.id || index}
                className="flex items-start gap-3 bg-[#19191A] mb-2  rounded-xl px-4 py-4 transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                style={{
                  background: "rgba(157, 157, 157, .25)",

                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                <span className="shrink-0 w-10 h-10 rounded-full bg-[#0e2a4a] border border-blue-500/20 text-[#60a5fa] text-base font-semibold flex items-center justify-center mt-0.5">
                  {index + 1}
                </span>

                <span className="flex-1 text-lg text-white leading-snug">
                  {item.content}
                </span>

                <button
                  type="button"
                  onClick={() => handleDelete(item)}
                  disabled={isDeleting}
                  className="shrink-0 mt-0.5 text-[#9E9E9E] cursor-pointer opacity-30 hover:opacity-100 hover:text-red-500 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Delete"
                >
                  <TrashIcon />
                </button>
              </div>
            ))}
          </div>

          {/* Add Button */}
          <div className="flex justify-center mt-5">
            <button
              type="button"
              onClick={() => setIsAddOpen(true)}
              className="flex items-center gap-2 cursor-pointer bg-[#0E7DFA] hover:bg-blue-600 text-white text-sm font-medium px-5 py-3 rounded-lg transition-colors duration-150"
            >
              <Plus size={16} />
              Add Information
            </button>
          </div>
        </div>
      </div>

      <AddAdditionalInfoModal
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        businessId={businessId}
      />
    </div>
  );
}
