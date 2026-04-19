import { ChevronDown, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TBusinessService } from "@/store/features/business/business.api";

type ServicesSectionProps = {
  businessId?: number;
  services: TBusinessService[];
};

export default function ServicesSection({
  businessId,
  services,
}: ServicesSectionProps) {
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="rounded-3xl p-6"
        // style={{
        //   background: `radial-gradient(ellipse 70% 60% at top right, rgba(80, 80, 80, 0.45) 0%, #000000 70%)`,
        // }}
        style={{
          background: "rgba(157, 157, 157, .25)",

          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-normal text-white">Services</h2>
            <p className="text-lg text-[#9E9E9E] mt-0.5">
              Services your business offers
            </p>
          </div>
          <button
            onClick={() =>
              navigate(`/dashboard/businessServices/${businessId || 1}`)
            }
            className="flex items-center cursor-pointer gap-1 bg-[#33384D] text-white text-sm font-medium px-3 py-3 rounded-xl"
          >
            See all({services.length})
            <ChevronDown size={14} />
          </button>
        </div>

        <div className="mb-3 mt-8">
          <p className="text-lg font-medium mb-6">Business name</p>
          <div className="space-y-4">
            {services.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between bg-[#111] rounded-lg px-4 py-4 mb-5"
                style={{
                  background: "rgba(157, 157, 157, .25)",

                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                <div className="space-y-2">
                  <p className="text-base font-medium text-white">{s.name}</p>

                  {/* Amber "Price not set" — informational, NOT an error.
                      Removed the red-blue visual clash. */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-amber-500 font-medium">
                      {s.price ? `$${s.price}` : "Price not set"}
                    </span>
                    <button className="text-xs text-[#0E7DFA] px-2 py-0.5 rounded-full border border-blue-500/20 bg-[rgba(34,39,50,0.60)] hover:bg-[rgba(14,125,250,0.15)] transition-colors">
                      set price
                    </button>
                  </div>
                </div>

                <span className="text-sm bg-[#333] px-4 py-1.5 rounded-full text-[#FFFFFF]">
                  {s.category_name || "general"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 w-full">
          <button
            onClick={() =>
              navigate(`/dashboard/services`)
            }
            className="flex items-center justify-center gap-1.5 w-full bg-[#0E7DFA] hover:bg-blue-600 text-white text-sm cursor-pointer font-medium px-3 py-3 rounded-xl transition-colors"
          >
            <Plus size={16} />
            Add Services
          </button>
        </div>
      </div>
    </div>
  );
}
