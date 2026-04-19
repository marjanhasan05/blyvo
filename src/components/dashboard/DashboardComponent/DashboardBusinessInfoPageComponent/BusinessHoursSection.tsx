import { SquarePen } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  TBusinessHour,
  useUpdateBusinessHoursMutation,
} from "@/store/features/business/business.api";

type BusinessHoursSectionProps = {
  businessId?: number;
  hours: TBusinessHour[];
  timezone: string;
};

type THoursForm = {
  day: number;
  open_time: string;
  close_time: string;
  is_closed: boolean;
};

const DAY_OPTIONS = [
  { label: "Monday", value: 0 },
  { label: "Tuesday", value: 1 },
  { label: "Wednesday", value: 2 },
  { label: "Thursday", value: 3 },
  { label: "Friday", value: 4 },
  { label: "Saturday", value: 5 },
  { label: "Sunday", value: 6 },
];

const toInputTime = (value?: string) => (value ? value.slice(0, 5) : "");
const toApiTime = (value?: string) => (value ? `${value}:00` : "00:00:00");

export default function BusinessHoursSection({
  businessId,
  hours,
  timezone,
}: BusinessHoursSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [updateBusinessHours, { isLoading }] = useUpdateBusinessHoursMutation();
  const activeHour = useMemo(() => hours?.[0], [hours]);

  const { register, handleSubmit, reset } = useForm<THoursForm>({
    defaultValues: {
      day: 0,
      open_time: "",
      close_time: "",
      is_closed: false,
    },
  });

  useEffect(() => {
    reset({
      day: activeHour?.day ?? 0,
      open_time: toInputTime(activeHour?.open_time),
      close_time: toInputTime(activeHour?.close_time),
      is_closed: activeHour?.is_closed ?? false,
    });
  }, [activeHour, reset]);

  const onSubmit = async (values: THoursForm) => {
    if (!businessId) return;
    if (!activeHour?.id) {
      toast.error("No business hours record found to update");
      return;
    }

    try {
      await updateBusinessHours({
        business_id: businessId,
        data: {
          id: activeHour.id,
          business: businessId,
          day: Number(values.day),
          open_time: toApiTime(values.open_time),
          close_time: toApiTime(values.close_time),
          is_closed: values.is_closed,
        },
      }).unwrap();

      toast.success("Business hours updated successfully");
      setIsEditing(false);
    } catch {
      toast.error("Failed to update business hours");
    }
  };

  const onSave = handleSubmit(onSubmit);

  return (
    <div>
      <div
        className=" rounded-3xl   p-6"
        // style={{
        //   background: `radial-gradient(ellipse 70% 60% at top right, rgba(80, 80, 80, 0.45) 0%, #000000 70%)`,
        // }}
        style={{
            background: 'rgba(157, 157, 157, .25)',

            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-normal text-white">Business Hours</h2>
            <p className="text-lg text-[#9E9E9E] mt-0.5">
              When your business is open
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
              disabled={isLoading}
              className="flex items-center gap-1.5 cursor-pointer bg-[#0E7DFA] text-white text-xs font-medium px-4 py-3 rounded-xl disabled:opacity-60"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          )}
        </div>

        <form className="space-y-8">
          <div
            className="p-4 rounded-2xl"
            // style={{
            //   background: `radial-gradient(ellipse 70% 60% at top right, rgba(80, 80, 80, 0.45) 0%, #000000 70%)`,
            // }}
            style={{
            background: 'rgba(157, 157, 157, .25)',

            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
        }}
          >
            <label className="block text-lg font-medium text-white mb-2">
              Operating Hours
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#9E9E9E] mb-1">Day</label>
                <select
                  disabled={!isEditing || isLoading}
                  {...register("day", { valueAsNumber: true })}
                  className="w-full bg-[#1E1E1E] rounded-2xl px-3 py-4 text-white focus:outline-none"
                >
                  {DAY_OPTIONS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  id="is_closed"
                  type="checkbox"
                  disabled={!isEditing || isLoading}
                  {...register("is_closed")}
                />
                <label htmlFor="is_closed" className="text-sm text-white">
                  Closed this day
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm text-[#9E9E9E] mb-1">Open Time</label>
                <input
                  type="time"
                  disabled={!isEditing || isLoading}
                  {...register("open_time")}
                  className="w-full bg-[#1E1E1E] rounded-2xl px-3 py-4 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-[#9E9E9E] mb-1">Close Time</label>
                <input
                  type="time"
                  disabled={!isEditing || isLoading}
                  {...register("close_time")}
                  className="w-full bg-[#1E1E1E] rounded-2xl px-3 py-4 text-white focus:outline-none"
                />
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              Enter your business hours in a natural format. Our AI will
              understand it.
            </p>

            <div className=" mt-8">
              <label className="block text-lg font-medium text-white mb-1.5">
                Business Timezone
              </label>
              <input
                type="text"
                value={timezone || "N/A"}
                disabled
                className="w-full bg-[#1E1E1E] rounded-2xl px-3 py-4 text-white focus:outline-none"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
