import { useLandingConfig } from "@/contexts/LandingConfigContext";
import { FiMic } from "react-icons/fi";

interface ManualStepTwoProps {
    data: {
        services: string;
        hours: any;
        category?: string;
    };
    onChange: (field: string, value: any) => void;
}

const ManualStepTwo = ({ data, onChange }: ManualStepTwoProps) => {
    const {config} = useLandingConfig();
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Services You Offer Field */}
            <div className="relative">
                <div className="absolute left-4 -top-2.5 px-1.5 bg-[#121214] z-10">
                    <label className="text-[14px] lg:text-xs font-normal text-white/80 leading-normal">Services You Offer</label>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        value={data.services}
                        onChange={(e) => onChange("services", e.target.value)}
                        placeholder="e.g. Haircuts, Massage therapy"
                        className="w-full p-3.5 border border-white/10 rounded-[10px] bg-transparent focus:border-[#5B63F1] focus:outline-none transition-all placeholder:text-gray-500 text-white font-poppins pr-10"
                    />
                    <FiMic size={18} className="absolute right-4 top-1/2 -translate-y-1/2  cursor-pointer" style={{color : config.colors.brandColorHex}}/>
                </div>
                <p className="text-[#9E9E9E] text-[10px] mt-2 ml-2 leading-relaxed">
                    *List 1-2 main services your business provides.
                </p>
            </div>

            {/* Business Hours Summary */}
            <div className="relative pt-4">
                <div className="absolute left-4 top-1.5 px-1.5 bg-[#121214] z-10">
                    <label className="text-[14px] lg:text-xs font-normal text-white/80 leading-normal">Business Hours</label>
                </div>
                <div className="relative p-3.5 border border-white/10 rounded-[10px] bg-transparent text-white font-poppins min-h-[50px]">
                    <p className="text-sm">
                        {data.hours?.openTime ? `${data.hours.openTime} ${data.hours.openAmPm} - ${data.hours.closeTime} ${data.hours.closeAmPm}` : "Hours not configured"}
                    </p>
                </div>
                <p className="text-[#9E9E9E] text-[10px] mt-2 ml-2 leading-relaxed">
                    *Your agent will inform callers about when you're open.
                </p>
            </div>
        </div>
    );
};

export default ManualStepTwo;
