import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PhoneCall, Search } from "lucide-react";
import { useState } from "react";

const CallForwordingModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const [areaCode, setAreaCode] = useState("650");
  const [step, setStep] = useState<1 | 2>(1);

  const numbers = [
    "(650) 250-0287",
    "(650) 250-0288",
    "(650) 250-0289",
    "(650) 250-0290",
    "(650) 250-0291",
    "(650) 250-0292",
  ];
  const [selectedNumber, setSelectedNumber] = useState<string | null>(
    "(650) 250-0287",
  );
  switch (step) {
    case 1:
      return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
            <div>
              {/* Header / Card top */}
              <div className=" pt-2 pb-8 px-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg ">
                  <PhoneCall size={24} />
                </div>
                <h1 className="text-lg xl:text-xl text-gray-900 mb-1">
                  Get Phone Number
                </h1>
                <p className="text-gray-400 text-xs xl:text-base">
                  Luxe Home Services Assistant
                </p>
              </div>

              {/* Main content */}
              <div className="px-8 pb-2">
                <div className="mt-8 mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Area Code
                  </label>
                  <p className="text-xs text-gray-400 mb-3">
                    Enter a 3-digit US area code (e.g., 650 for Palo Alto, 415
                    for San Francisco)
                  </p>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      maxLength={3}
                      value={areaCode}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        setAreaCode(val);
                      }}
                      placeholder="650"
                      className="
                                        flex-1 px-4 py-1 text-md 
                                        border border-gray-300 text-gray-500 rounded-2xl
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                        transition-all
                                        "
                    />
                    <button
                      className="
                                            px-6 py-2 bg-black text-white font-medium
                                            rounded-2xl hover:bg-gray-900 active:scale-95
                                            transition-all flex items-center gap-2
                                            "
                      onClick={() => setStep(2)}
                    >
                      <Search className="h-5 w-5" />
                      <span>Search</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    case 2:
      return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
            <div>
              {/* Header */}
              <div className=" pt-8 pb-2 px-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg ">
                  <PhoneCall size={24} />
                </div>
                <h1 className="text-lg xl:text-xl text-gray-900 mb-1">
                  Get Phone Number
                </h1>
                <p className="text-gray-400 text-xs xl:text-base">
                  Luxe Home Services Assistant
                </p>
              </div>

              {/* Content */}
              <div className="px-6 pb-2">
                <div className="mt-6 mb-6">
                  <h2 className="text-xs font-medium text-gray-400 mb-4">
                    Found 10 available numbers with area code 650:
                  </h2>

                  <div className="space-y-3 mb-8">
                    {numbers.map((num, i) => (
                      <div
                        key={i}
                        className={`
                                                        px-4 py-1  rounded-xl
                                                        text-sm md:text-base font-medium 
                                                        hover:bg-blue-50 hover:border-blue-200
                                                        transition-colors cursor-pointer
                                                    ${selectedNumber === num ? "border border-gray-200 text-gray-800" : "text-gray-400"}`}
                        onClick={() => setSelectedNumber(num)}
                      >
                        {num}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="rounded-2xl w-1/2"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-1/2 rounded-2xl bg-black text-white font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>Provision Number</span>
                    </Button>
                  </div>

                  <p className="text-center text-xs text-gray-400 mt-6">
                    This number will be dedicated to your AI agent
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
  }
};

export default CallForwordingModal;
