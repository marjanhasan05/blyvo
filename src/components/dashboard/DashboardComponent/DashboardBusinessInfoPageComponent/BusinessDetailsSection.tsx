import { SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  TBusiness,
  useUpdateBusinessMutation,
} from "@/store/features/business/business.api";

type BusinessDetailsSectionProps = {
  business?: TBusiness;
};

type TBusinessDetailsForm = {
  name: string;
  business_type: string;
  description: string;
  address: string;
};

export default function BusinessDetailsSection({ business }: BusinessDetailsSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [updateBusiness, { isLoading }] = useUpdateBusinessMutation();

  const { register, handleSubmit, reset } = useForm<TBusinessDetailsForm>({
    defaultValues: {
      name: "",
      business_type: "",
      description: "",
      address: "",
    },
  });

  useEffect(() => {
    reset({
      name: business?.name || "",
      business_type: business?.business_type || "",
      description: business?.description || "",
      address: business?.address || "",
    });
  }, [business, reset]);

  const onSubmit = async (values: TBusinessDetailsForm) => {
    if (!business?.id) {
      toast.error("Business not found");
      return;
    }

    try {
      await updateBusiness({
        business_id: business.id,
        data: {
          name: values.name,
          business_email: business.business_email,
          business_type: values.business_type,
          description: values.description,
          address: values.address,
        },
      }).unwrap();

      toast.success("Business details updated successfully");
      setIsEditing(false);
    } catch {
      toast.error("Failed to update business details");
    }
  };

  const onSave = handleSubmit(onSubmit);

  return (
    <div>
      <div
        className=" rounded-3xl   p-6"
        style={{
            background: 'rgba(157, 157, 157, .25)',

            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-normal text-white">
              Business Details
            </h2>
            <p className="text-lg text-gray-400 mt-0.5">
              Basic information about your business
            </p>
          </div>
          {!isEditing ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(true);
              }}
              className="flex items-center gap-1.5 cursor-pointer bg-[#33384D] text-white text-sm font-medium px-4 py-3 rounded-2xl"
            >
              <SquarePen size={16} />
              Edit
            </button>
          ) : (
            <button
              type="button"
              onClick={onSave}
              disabled={isLoading}
              className="flex items-center gap-1.5 cursor-pointer bg-[#0E7DFA] text-white text-sm font-medium px-4 py-3 rounded-2xl disabled:opacity-60"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          )}
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-white mb-1.5">
              Business name
            </label>
            <input
              type="text"
              disabled={!isEditing || isLoading}
              {...register("name")}
              className="w-full bg-[#111] text-[#9E9E9E] rounded-2xl px-3 py-4 text-base   focus:outline-none disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-white mb-1.5">
              Business Type
            </label>
            <input
              type="text"
              disabled={!isEditing || isLoading}
              {...register("business_type")}
              className="w-full bg-[#111] text-[#9E9E9E] rounded-2xl px-3 py-4 text-base   focus:outline-none disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-white mb-1.5">
              Description
            </label>
            <textarea
              disabled={!isEditing || isLoading}
              {...register("description")}
              className="w-full h-37.5 bg-[#111] text-[#9E9E9E] rounded-2xl px-3 py-4 text-base   focus:outline-none resize-none disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-white mb-1.5">
              Business Address
            </label>
            <input
              type="text"
              disabled={!isEditing || isLoading}
              {...register("address")}
              className="w-full bg-[#111] text-[#9E9E9E] rounded-2xl px-3 py-4 text-base   focus:outline-none disabled:opacity-50"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
