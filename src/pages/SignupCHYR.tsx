import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hook";
import { setUser } from "@/store/features/auth/auth.slice";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Eye, EyeOff, Loader2, X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { STARS, starStyle } from "./CreateAgent";
import BookingHeroComponent from "@/components/BookingHeroComponent";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  useRegisterClientMutation,
  useVerifyOTPMutation,
} from "@/store/features/auth/auth.api";
import { toast } from "sonner";
import { CHYRIcon } from "@/assets/logo/BrandLogoNew";
import { motion, AnimatePresence } from "motion/react";

const loginSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

// --- START: OTP Modal Component ---
const OTPModal = ({
  isOpen,
  onClose,
  email,
  onVerify,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerify: (otp: string) => void;
  isLoading: boolean;
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const val = value.replace(/[^0-9]/g, "");
    if (!val) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }
    const newOtp = [...otp];
    const chars = val.split("");
    for (let i = 0; i < chars.length && index + i < 6; i++) {
      newOtp[index + i] = chars[i];
    }
    setOtp(newOtp);
    const nextIndex = Math.min(index + chars.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .trim()
      .slice(0, 6)
      .replace(/[^0-9]/g, "");
    if (!pastedData) return;
    const newOtp = [...otp];
    const chars = pastedData.split("");
    for (let i = 0; i < chars.length; i++) {
      newOtp[i] = chars[i];
    }
    setOtp(newOtp);
    const focusIndex = Math.min(chars.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join("");
    if (otpString.length === 6) {
      onVerify(otpString);
    } else {
      toast.error("Please enter a valid 6-digit OTP");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl p-8 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-[#888888] hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2 text-white font-['Space_Grotesk']">
                Verify your email
              </h2>
              <p className="text-[#888888] text-sm font-['Geist']">
                We've sent a code to{" "}
                <span className="text-white font-medium">{email}</span>
              </p>
            </div>
            <div className="flex justify-between gap-2 mb-8">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="\d{1}"
                  value={digit}
                  onPaste={handlePaste}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-12 h-14 bg-black border border-[#1f1f1f] rounded-xl text-center text-xl font-bold text-white focus:outline-none focus:border-white/40 transition-colors"
                />
              ))}
            </div>
            <button
              onClick={handleVerify}
              disabled={isLoading}
              className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-[#f0f0f0] transition-colors mb-4 flex items-center justify-center gap-2 font-['Geist'] cursor-pointer"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                "Verify Account"
              )}
            </button>
            <p className="text-center text-sm text-[#888888] font-['Geist']">
              Didn't receive the code?{" "}
              <button className="text-white hover:underline cursor-pointer">
                Resend
              </button>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const SignupCHYR = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // --- START: OTP State Variables ---
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [tempData, setTempData] = useState<LoginFormInputs | null>(null);
  const [verifyOTP, { isLoading: isRequestingOtp }] = useVerifyOTPMutation();
  const [registerClient, { isLoading: isRegistering }] =
    useRegisterClientMutation();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      // Step 1: Request OTP via API
      await verifyOTP({
        purpose: "registration",
        user_identifier: data.email,
        password: data.password,
      }).unwrap();

      // Success: store form data and open OTP modal
      setTempData(data);
      setIsOtpOpen(true);
      toast.success("OTP sent to your email!");
    } catch (err) {
      toast.error("Failed to send OTP. Please try again.");
      console.error("OTP request error:", err);
    }
  };

  const onVerifyOtp = async (otp: string) => {
    if (!tempData) return;

    const finalData = {
      first_name: tempData.firstName,
      last_name: tempData.lastName,
      email: tempData.email,
      password: tempData.password,
      otp, // OTP entered by user
    };

    console.log("Submitting registration with:", finalData);

    try {
      await registerClient(finalData).unwrap();
      dispatch(setUser(tempData)); // store user data in Redux if needed
      toast.success("Registration successful!");
      setIsOtpOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please check your OTP and try again.");
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      delay: 200,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="flex bg-black font-sans w-full h-screen">
      {STARS.map((star, i) => (
        <div
          key={i}
          className={`absolute ${star.size} bg-white animate-pulse opacity-80`}
          style={{ ...star, ...starStyle }}
        />
      ))}
      {/* left Section - Login Form */}
      <div
        data-aos="fade-left"
        className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-10 relative"
      >
        <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 md:px-[82px] py-10 max-w-[542px] mx-auto w-full">
          {/* Logo */}
          <Link
            to={"/"}
            className="flex items-center gap-3 mb-14 hover:cursor-pointer"
          >
            <CHYRIcon />
          </Link>

          {/* Heading */}
          <div className="mb-10">
            <p
              className="text-[#434343] text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              GET STATTED
            </p>
            <h1
              className="text-white text-[34px] font-bold leading-tight mb-3"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Create your account
            </h1>
            <p
              className="text-[#434343] text-sm"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Already have one?{" "}
              <Link
                to="/login"
                className="text-[#9E9E9E] font-semibold underline hover:text-white transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="First name"
                  {...register("firstName")}
                  className="w-full h-[58px] px-[28px] bg-black border border-[#43434380] rounded-[10px] text-white placeholder:text-[#434343] text-sm focus:outline-none focus:border-white transition-colors"
                  style={{ fontFamily: "Geist, sans-serif" }}
                />
                {errors.firstName && (
                  <p className="text-red-400 text-[11px] mt-1 ml-1 absolute">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Last name"
                  {...register("lastName")}
                  className="w-full h-[58px] px-[28px] bg-black border border-[#43434380] rounded-[10px] text-white placeholder:text-[#434343] text-sm focus:outline-none focus:border-white transition-colors"
                  style={{ fontFamily: "Geist, sans-serif" }}
                />
                {errors.lastName && (
                  <p className="text-red-400 text-[11px] mt-1 ml-1 absolute">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="Work email"
                {...register("email")}
                className="w-full h-[58px] px-[28px] bg-black! border border-[#43434380] rounded-[10px] text-white placeholder:text-[#434343] text-sm focus:outline-none focus:border-white transition-colors"
                style={{ fontFamily: "Geist, sans-serif" }}
              />
              {errors.email && (
                <p className="text-red-400 text-[11px] mt-1 ml-1 absolute">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  className="w-full h-[58px] px-[28px] pr-12 bg-black border border-[#43434380] rounded-[10px] text-white placeholder:text-[#434343] text-sm focus:outline-none focus:border-white transition-colors"
                  style={{ fontFamily: "Geist, sans-serif" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#434343] hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-[11px] mt-1 ml-1 absolute">
                  {errors.password.message}
                </p>
              )}
              {/* <div className="flex justify-end mt-2">
                                <Link
                                    to="#"
                                    className="text-[#9E9E9E] text-xs font-semibold underline hover:text-white transition-colors"
                                    style={{ fontFamily: "Geist, sans-serif" }}
                                >
                                    Forgot password?
                                </Link>
                            </div> */}
            </div>

            {/* Submit */}
            <div className="mt-2">
              <button
                type="submit"
                disabled={isRequestingOtp}
                className="w-full h-[52px] bg-white rounded-[10px] text-black font-semibold text-base flex items-center justify-center gap-2 hover:bg-[#f0f0f0] transition-all group cursor-pointer"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                {isRegistering || isRequestingOtp ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  "Sign up"
                )}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>

            {/* OR Divider */}
            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-px bg-[#434343]" />
              <span
                className="text-[#9E9E9E] text-sm"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                OR
              </span>
              <div className="flex-1 h-px bg-[#434343]" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full h-[52px] border border-[#434343] rounded-[10px] flex items-center justify-center gap-3 text-[#9E9E9E] font-semibold text-base hover:border-white hover:text-white transition-all cursor-pointer"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              <FcGoogle size={22} />
              Continue with Google
            </button>
          </form>

          {/* Footer */}
          <p
            className="text-[#434343] text-sm mt-10"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            By signing in you agree to our{" "}
            <Link
              to="#"
              className="text-[#9E9E9E] font-semibold underline hover:text-white transition-colors"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              to="#"
              className="text-[#9E9E9E] font-semibold underline hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 hidden md:flex justify-center items-center">
        <div className="w-full min-h-[80vh]">
          <BookingHeroComponent />
        </div>
      </div>
      {/* START: OTP Modal Usage */}
      <OTPModal
        isOpen={isOtpOpen}
        onClose={() => setIsOtpOpen(false)}
        email={tempData?.email || ""}
        onVerify={onVerifyOtp}
        isLoading={isRegistering}
      />
    </div>
  );
};

export default SignupCHYR;
