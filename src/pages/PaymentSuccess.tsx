import React from "react";
import { motion, Variants } from "motion/react";
import {
  CheckCircle2,
  ArrowRight,
  Download,
  Home,
  CreditCard,
  Calendar,
  Hash,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  const transaction = {
    id: "TRX-98234105",
    amount: "$49.00",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    method: "•••• 4242",
    plan: "Pro Annual Plan",
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-emerald-500/30">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-2xl"
      >
        {/* Success Icon & Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/20 mb-6 relative"
          >
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
            <CheckCircle2 className="w-12 h-12 text-emerald-400 relative z-10" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight"
          >
            Payment Successful!
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-zinc-400 text-lg sm:text-xl"
          >
            Your transaction has been processed successfully.
          </motion.p>
        </div>

        {/* Transaction Details Card */}
        <motion.div
          variants={itemVariants}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="p-6 sm:p-8">
            <h2 className="text-zinc-100 text-sm font-medium uppercase tracking-wider mb-6 opacity-60">
              Transaction Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <Hash className="w-4 h-4" />
                  <span className="text-xs uppercase font-semibold">
                    Transaction ID
                  </span>
                </div>
                <p className="text-zinc-100 font-mono text-sm">
                  {transaction.id}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs uppercase font-semibold">Date</span>
                </div>
                <p className="text-zinc-100 font-medium">{transaction.date}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-xs uppercase font-semibold">
                    Payment Method
                  </span>
                </div>
                <p className="text-zinc-100 font-medium">
                  {transaction.method}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <span className="text-emerald-500 font-bold">$</span>
                  <span className="text-xs uppercase font-semibold">
                    Amount Paid
                  </span>
                </div>
                <p className="text-2xl font-bold text-emerald-400">
                  {transaction.amount}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-500 text-xs uppercase font-semibold mb-1">
                    Plan Activated
                  </p>
                  <p className="text-white font-semibold text-lg">
                    {transaction.plan}
                  </p>
                </div>
                <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/20">
                  Active
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="bg-zinc-800/30 p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex-1 group relative flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#0a0a0a] font-bold py-4 rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-[0.98]"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 border border-zinc-700 active:scale-[0.98]">
              <Download className="w-5 h-5" />
              <span>Receipt</span>
            </button>
          </div>
        </motion.div>

        {/* Footer Link */}
        <motion.div variants={itemVariants} className="text-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
