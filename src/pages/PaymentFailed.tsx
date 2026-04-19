import React from "react";
import { motion, Variants } from "motion/react";
import {
  XCircle,
  ArrowRight,
  RefreshCcw,
  Home,
  AlertCircle,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentFailed: React.FC = () => {
  const navigate = useNavigate();

  const transaction = {
    id: "TRX-98234105",
    amount: "$49.00",
    reason: "Insufficient funds or card expired",
    errorCode: "ERR_PAYMENT_DECLINED",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
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

  const iconVariants: Variants = {
    hidden: { scale: 0, rotate: -45 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1,
      },
    },
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: {
        duration: 0.5,
        delay: 0.8,
        repeat: 1,
        repeatDelay: 2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-rose-500/30">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-2xl"
      >
        {/* Error Icon & Header */}
        <div className="text-center mb-8">
          <motion.div
            variants={iconVariants}
            animate={["visible", "shake"]}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-rose-500/20 mb-6 relative"
          >
            <div className="absolute inset-0 rounded-full bg-rose-500/10 animate-pulse" />
            <XCircle className="w-12 h-12 text-rose-500 relative z-10" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight"
          >
            Payment Failed
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-zinc-400 text-lg sm:text-xl max-w-md mx-auto"
          >
            We couldn't process your payment. Please check your details and try
            again.
          </motion.p>
        </div>

        {/* Error Details Card */}
        <motion.div
          variants={itemVariants}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-rose-500" />
              </div>
              <h2 className="text-zinc-100 text-sm font-medium uppercase tracking-wider opacity-60">
                Failure Details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
              <div className="space-y-1">
                <span className="text-zinc-500 text-xs uppercase font-semibold">
                  Transaction ID
                </span>
                <p className="text-zinc-100 font-mono text-sm">
                  {transaction.id}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-zinc-500 text-xs uppercase font-semibold">
                  Error Code
                </span>
                <p className="text-rose-400 font-mono text-sm font-medium">
                  {transaction.errorCode}
                </p>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <span className="text-zinc-500 text-xs uppercase font-semibold">
                  Reason for Failure
                </span>
                <p className="text-zinc-200 font-medium bg-rose-500/5 border border-rose-500/10 p-3 rounded-xl mt-1 italic">
                  "{transaction.reason}"
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-zinc-500 text-xs uppercase font-semibold">
                  Date
                </span>
                <p className="text-zinc-100 font-medium">{transaction.date}</p>
              </div>

              <div className="space-y-1">
                <span className="text-zinc-500 text-xs uppercase font-semibold">
                  Amount Attempted
                </span>
                <p className="text-2xl font-bold text-white">
                  {transaction.amount}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Need help with your payment?</span>
              </div>
              <button className="flex items-center gap-2 text-rose-400 hover:text-rose-300 transition-colors text-sm font-semibold group">
                <MessageSquare className="w-4 h-4" />
                <span>Contact Support</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Action Footer */}
          <div className="bg-zinc-800/30 p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/pricing")}
              className="flex-1 group relative flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-400 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(244,63,94,0.3)] active:scale-[0.98]"
            >
              <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>Try Again</span>
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 border border-zinc-700 active:scale-[0.98]"
            >
              <span>Back to Dashboard</span>
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

export default PaymentFailed;
