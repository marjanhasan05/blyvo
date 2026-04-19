import { SquarePen } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  TBusinessPolicy,
  useAddBusinessPoliciesMutation,
  useUpdateBusinessPoliciesMutation,
} from "@/store/features/business/business.api";

type BusinessPoliciesSectionProps = {
  businessId?: number;
  policies: TBusinessPolicy[];
};

type TPolicyForm = {
  cancellation: string;
  payment: string;
  deposit: string;
};

export default function BusinessPoliciesSection({
  businessId,
  policies,
}: BusinessPoliciesSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [updateBusinessPolicies, { isLoading: isUpdating }] =
    useUpdateBusinessPoliciesMutation();
  const [addBusinessPolicies, { isLoading: isAdding }] =
    useAddBusinessPoliciesMutation();

  const loading = isUpdating || isAdding;

  const policiesByType = useMemo(() => {
    return {
      cancellation: policies.find((p) => p.policy_type === "cancellation"),
      payment: policies.find((p) => p.policy_type === "payment"),
      deposit: policies.find((p) => p.policy_type === "deposit"),
    };
  }, [policies]);

  const { register, handleSubmit, reset } = useForm<TPolicyForm>({
    defaultValues: {
      cancellation: "",
      payment: "",
      deposit: "",
    },
  });

  useEffect(() => {
    reset({
      cancellation: policiesByType.cancellation?.content || "",
      payment: policiesByType.payment?.content || "",
      deposit: policiesByType.deposit?.content || "",
    });
  }, [policiesByType, reset]);

  const savePolicy = async (
    policyType: "cancellation" | "payment" | "deposit",
    content: string,
  ) => {
    if (!businessId || !content.trim()) return;

    const existing = policiesByType[policyType];
    const payload = {
      ...(existing?.id ? { id: existing.id } : {}),
      business: businessId,
      policy_type: policyType,
      policy_title: policyType,
      content,
    };

    if (existing?.id) {
      await updateBusinessPolicies({
        business_id: businessId,
        data: payload,
      }).unwrap();
      return;
    }

    await addBusinessPolicies({
      business_id: businessId,
      data: payload,
    }).unwrap();
  };

  const onSubmit = async (values: TPolicyForm) => {
    try {
      await Promise.all([
        savePolicy("cancellation", values.cancellation),
        savePolicy("payment", values.payment),
        savePolicy("deposit", values.deposit),
      ]);

      toast.success("Business policies updated successfully");
      setIsEditing(false);
    } catch {
      toast.error("Failed to update business policies");
    }
  };

  const onSave = handleSubmit(onSubmit);

  return (
    <div>
      <div
        className="rounded-3xl  p-6"
        // style={{
        //   background: `radial-gradient(ellipse 70% 60% at top right, rgba(80, 80, 80, 0.45) 0%, #000000 70%)`,
        // }}
        style={{
            background: 'rgba(157, 157, 157, .25)',

            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-normal text-white">Business Policies</h2>
            <p className="text-lg text-[#9E9E9E] mt-0.5">
              Important policies your agent should know
            </p>
          </div>
          {!isEditing ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(true);
              }}
              className="flex items-center gap-1.5 cursor-pointer bg-[#33384D] text-white text-xs font-medium px-4 py-3 rounded-xl"
            >
              <SquarePen size={16} />
              Edit
            </button>
          ) : (
            <button
              type="button"
              onClick={onSave}
              disabled={loading}
              className="flex items-center gap-1.5 cursor-pointer bg-[#0E7DFA] text-white text-xs font-medium px-4 py-3 rounded-xl disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          )}
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-white mb-1.5">
              Cancellation Policy
            </label>
            <textarea
              disabled={!isEditing || loading}
              {...register("cancellation")}
              className="w-full rounded-2xl px-3 py-5 bg-[rgba(25,25,26,0.60)] text-base text-gray-200 focus:outline-none resize-none"
              placeholder="e.g. 24-hour notice required for cancellations"
            />
          </div>

          <div className="mt-6">
            <label className="block text-lg font-medium text-white mb-1.5">
              Payment Policy
            </label>
            <textarea
              disabled={!isEditing || loading}
              {...register("payment")}
              className="w-full rounded-2xl px-3 py-5 bg-[rgba(25,25,26,0.60)] text-base text-gray-200 focus:outline-none resize-none"
              placeholder="e.g. Payment due at time of service"
            />
          </div>

          <div className="mt-6">
            <label className="block text-lg font-medium text-white mb-1.5">
              Deposit Requirements
            </label>
            <textarea
              disabled={!isEditing || loading}
              {...register("deposit")}
              className="w-full rounded-2xl px-3 py-5 bg-[rgba(25,25,26,0.60)] text-base text-gray-200 focus:outline-none resize-none"
              placeholder="e.g. 50% deposit required for appointments over $100"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
