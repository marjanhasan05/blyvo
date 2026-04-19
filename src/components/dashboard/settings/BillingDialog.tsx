import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface BillingDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const BillingDialog: React.FC<BillingDialogProps> = ({ open, setOpen }) => {
    const navigate = useNavigate();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 border-none">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-gray-900">Subscription</h2>
                    <span className="flex items-center gap-1.5 bg-yellow-50 text-yellow-600 border border-yellow-200 text-xs font-medium px-2 py-1 rounded-lg">
                        <CheckCircle2 size={13} /> Trial
                    </span>
                </div>
                
                <p className="text-gray-500 text-sm mb-6">Manage your subscription and billing information.</p>
                
                <div className="flex flex-col gap-4">
                    {/* Plan Info Card */}
                    <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex flex-col gap-2">
                        <h3 className="text-gray-900 text-2xl font-semibold">Pro</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-gray-900 text-xl font-semibold">$199</span>
                            <span className="text-gray-500 text-sm">/month</span>
                        </div>
                        <div className="flex flex-col gap-1 mt-2">
                            <p className="text-gray-900 text-sm">
                                200 <span className="text-gray-500">calls Included</span>
                            </p>
                            <p className="text-gray-900 text-sm">
                                $1.30<span className="text-gray-500">/call after 200</span>
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 mt-2">
                        <button
                            onClick={() => {
                                setOpen(false);
                                navigate("/dashboard/change-plan");
                            }}
                            className="w-full bg-black hover:bg-gray-900 text-white text-sm font-semibold rounded-xl py-2.5 transition-colors cursor-pointer"
                        >
                            Change Plan
                        </button>
                        <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 text-sm font-semibold rounded-xl py-2.5 transition-colors cursor-pointer">
                            Update Payment Method
                        </button>
                        <button className="w-full text-red-500 hover:text-red-700 hover:bg-red-50 text-sm font-medium py-2 rounded-xl transition-colors cursor-pointer">
                            Cancel Subscription
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BillingDialog;
