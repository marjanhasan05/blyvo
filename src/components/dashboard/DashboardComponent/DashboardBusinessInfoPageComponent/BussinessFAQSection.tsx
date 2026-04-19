import { HelpCircle, Plus } from "lucide-react";
import { TBusinessFAQ } from "@/store/features/business/business.api";
import { useState } from "react";
import AddFAQModal from "./modal/AddFAQModal";

type BussinessFAQSectionProps = {
  faqs: TBusinessFAQ[];
  businessId?: number;
};

export default function BussinessFAQSection({
  faqs,
  businessId,
}: BussinessFAQSectionProps) {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div>
      <div
        className="rounded-3xl p-6"
        // style={{
        //   background: `radial-gradient(ellipse 70% 60% at top right, rgba(80, 80, 80, 0.45) 0%, #000000 70%)`,
        // }}
        style={{
            background: 'rgba(157, 157, 157, .25)',

            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="mb-4">
          <h2 className="text-2xl font-normal text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#9E9E9E] mt-0.5">
            Common questions your agent can answer
          </p>
        </div>

        {faqs.length ? (
          <div className="space-y-3 mb-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="rounded-2xl px-4 py-4 bg-[rgba(25,25,26,0.60)]"
              >
                <p className="text-white text-sm font-medium">{faq.question}</p>
                <p className="text-[#9E9E9E] text-sm mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#3a3a3a] p-8 flex flex-col items-center justify-center text-center min-h-50 mb-4 bg-[#0d0d0d]/40">
            <div className="w-12 h-12 rounded-2xl bg-[#1e1e1e] flex items-center justify-center mb-4">
              <HelpCircle size={22} className="text-[#555]" />
            </div>
            <p className="text-sm font-medium text-[#9E9E9E] mb-1">
              No FAQs added yet
            </p>
            <p className="text-xs text-[#666] max-w-55 leading-relaxed">
              Add common questions your AI will answer for callers
            </p>
          </div>
        )}

        {/* Button matches "+ Add Services" style — not a heavy full-width block */}
        <div className="flex mt-4">
          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="flex items-center justify-center cursor-pointer gap-1.5 bg-[#0E7DFA] hover:bg-blue-600 text-white text-sm font-medium px-3 py-3 rounded-xl w-full transition-colors"
          >
            <Plus size={16} />
            Add FAQ
          </button>
        </div>
      </div>

      <AddFAQModal
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        businessId={businessId}
      />
    </div>
  );
}
