// animation with text animation
import CommonWrapper from "@/common/CommonWrapper";
import { Play } from "lucide-react";
import { motion } from "motion/react";
import khalid from "@/assets/images/chyrImage/khalid.png";
import sarah from "@/assets/images/chyrImage/sarah.png";
import arjun from "@/assets/images/chyrImage/arjun.png";
import maria from "@/assets/images/chyrImage/maria.png";

// Expanded star array with more stars and larger sizes
const STARS = [
  // Top area
  { top: "5%", left: "10%" },
  { top: "12%", left: "30%" },
  { top: "12%", right: "15%" },
  { top: "13%", right: "29%" },
  { top: "15%", left: "45%" },
  { top: "20%", left: "5%" },
  { top: "25%", right: "10%" },
  { top: "18%", right: "55%" },
  { top: "23%", left: "18%" },
  { top: "40%", right: "25%" },
  { top: "30%", left: "70%" },
  { top: "45%", right: "40%" },
  { top: "53%", left: "8%" },
  { top: "48%", right: "8%" },
  { top: "67%", left: "21%" },
  { top: "2%", left: "25%" },
  { top: "20%", right: "20%" },
  { top: "70%", right: "12%" },
  { top: "80%", left: "15%" },
  { top: "75%", right: "35%" },
  { bottom: "20%", left: "12%" },
  { bottom: "15%", right: "18%" },
  { bottom: "8%", left: "35%" },
  { bottom: "5%", right: "5%" },
  { bottom: "25%", left: "5%" },
  { bottom: "10%", right: "60%" },
  { bottom: "30%", left: "80%" },
  { bottom: "2%", left: "50%" },
  { bottom: "18%", right: "75%" },
  { bottom: "12%", left: "90%" },
];

// Size variants responsive to screen size
const SIZES = [
  "w-3 h-3 sm:w-4 sm:h-4",
  "w-3.5 h-3.5 sm:w-5 sm:h-5",
  "w-4 h-4 sm:w-6 sm:h-6",
  "w-5 h-5 sm:w-7 sm:h-7",
];

const starStyle = {
  clipPath:
    "polygon(50% 0%, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0% 50%, 40% 40%)",
};

// Card data – reuse for both layouts
const CARDS = [
  {
    id: 1,
    category: "LEGAL SERVICES",
    name: "Khalid",
    title: "Graceful & Precise",
    ability: "Lead Qualification",
    languages: ["EN", "AR"],
    progress: 65,
    image: khalid,
    delay: 0.1,
  },
  {
    id: 2,
    category: "HEALTHCARE",
    name: "Sarah",
    title: "Polite & Attentive",
    ability: "Inquiry Handling",
    languages: ["EN", "FR"],
    progress: 85,
    image: sarah,
    delay: 0.2,
  },
  {
    id: 3,
    category: "HOME SERVICES",
    name: "Arjun",
    title: "Warm & Friendly",
    ability: "Manage Schedule",
    languages: ["EN", "HI"],
    progress: 45,
    image: arjun,
    delay: 0.3,
  },
  {
    id: 4,
    category: "BEAUTY & WELLNESS",
    name: "Maria",
    title: "Professional & Approachable",
    ability: "Books Appointments",
    languages: ["EN", "ES"],
    progress: 95,
    image: maria,
    delay: 0.4,
  },
];

// Reusable Card component
const ProfileCard = ({
  card,
  className = "",
}: {
  card: (typeof CARDS)[0];
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: card.delay }}
    className={`w-full bg-card rounded-2xl sm:rounded-[1.5rem] p-3 sm:p-4 border border-white/10 shadow-2xl relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 ${className}`}
  >
    <div className="inline-block px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border border-brand/50 mb-3 sm:mb-4">
      <span className="text-[7px] sm:text-[8px] font-bold tracking-[0.2em] text-brand uppercase whitespace-nowrap">
        {card.category}
      </span>
    </div>
    <div className="mb-2 sm:mb-3 relative">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-[#BFD2E9]">
        <img
          src={card.image}
          alt={card.name}
          className="w-full h-full rounded-full object-cover"
        />
      </div>
    </div>
    <div className="flex items-center justify-between mb-1">
      <h1 className="text-lg sm:text-xl font-semibold text-brand tracking-tight">
        {card.name}
      </h1>
      <button className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-brand/50 flex items-center justify-center text-brand hover:bg-brand/10 transition-colors group">
        <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-brand group-hover:scale-110 transition-transform" />
      </button>
    </div>
    <p className="text-brand/70 italic text-[10px] sm:text-xs mb-2 sm:mb-3">
      {card.title}
    </p>
    <div className="mb-2 sm:mb-3">
      <h2 className="text-[7px] sm:text-[8px] font-bold tracking-[0.2em] text-brand/60 uppercase mb-1">
        Abilities
      </h2>
      <p className="text-brand text-[10px] sm:text-xs font-medium">
        {card.ability}
      </p>
    </div>
    <div className="flex justify-between items-end mb-2 sm:mb-3">
      <div>
        <h2 className="text-[7px] sm:text-[8px] font-bold tracking-[0.2em] text-brand/60 uppercase mb-1">
          Languages
        </h2>
        <div className="flex gap-1">
          {card.languages.map((lang) => (
            <span
              key={lang}
              className="bg-white text-[#0a192f] px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-bold"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>
      <div className="text-right">
        <h2 className="text-[7px] sm:text-[8px] font-bold tracking-[0.2em] text-brand/60 uppercase mb-1">
          Status
        </h2>
        <div className="w-6 sm:w-8 h-3 sm:h-4 bg-brand/20 rounded-full border border-brand/30 p-0.5 relative">
          <div className="absolute right-0.5 top-0.5 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-brand rounded-full shadow-[0_0_6px_#99F7FE]" />
        </div>
      </div>
    </div>
    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
      <div
        className="h-full bg-bar rounded-full"
        style={{ width: `${card.progress}%` }}
      />
    </div>
  </motion.div>
);

const ChyrHero = () => {
  // Generate random animation parameters for each star
  const starsWithAnimation = STARS.map((star, i) => {
    const size = SIZES[i % SIZES.length];
    // Random blink duration between 1.5s and 4s
    const blinkDur = 1.5 + Math.random() * 2.5;
    // Random float duration between 3s and 7s
    const floatDur = 3 + Math.random() * 4;
    // Random delay between 0s and 2s
    const delay = Math.random() * 2;
    return {
      ...star,
      size,
      blinkDur,
      floatDur,
      delay,
    };
  });

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center bg-black pt-16">
      {/* Stars background with random animations */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
      {starsWithAnimation.map((star, idx) => (
        <div
          key={idx}
          className={`absolute ${star.size} bg-white`}
          style={{
            ...star,
            ...starStyle,
            animation: `twinkle ${star.blinkDur}s ease-in-out infinite, float ${star.floatDur}s ease-in-out infinite`,
            animationDelay: `${star.delay}s, ${star.delay * 0.5}s`,
            opacity: 0.8,
          }}
        />
      ))}

      {/* Half-circle image at bottom center - responsive sizing */}
      {/* Video instead of StripeLevelSun */}
      {/* Video element replacing StripeLevelSun */}
      <div className="absolute -bottom-1 left-0 right-0 z-0 flex justify-center pointer-events-none">
        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-full object-cover object-top rounded-t-full"
            style={{
              maskImage: "linear-gradient(to top, black 80%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to top, black 80%, transparent 100%)", // Safari support
            }}
          >
            {/* Update the source to match your actual filename */}
            <source src="/sun.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Dark overlay to blend with background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="relative z-10 w-full">
        <CommonWrapper className="!py-0">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 sm:gap-12 lg:gap-16 pt-6 sm:pt-10 md:pt-14 pb-12 sm:pb-20 md:pb-28 mb-28 sm:mb-36 lg:mb-20">
            {/* LEFT SIDE: Heading + Buttons */}
            <div className="flex-1 text-center lg:text-left px-4 sm:px-6 lg:px-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-1 sm:space-y-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white"
              >
                <div className="flex flex-wrap justify-center lg:justify-start gap-x-2">
                  <span className="bg-[linear-gradient(95deg,#61EFDE_29.54%,#0099E8_69.88%)] bg-clip-text text-transparent">
                    Every
                  </span>{" "}
                  <span>Industry</span>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-x-2">
                  <span className="bg-[linear-gradient(95deg,#61EFDE_29.54%,#0099E8_69.88%)] bg-clip-text text-transparent">
                    Every
                  </span>{" "}
                  <span>Caller Heard</span>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-x-2">
                  <span className="bg-[linear-gradient(95deg,#61EFDE_29.54%,#0099E8_69.88%)] bg-clip-text text-transparent">
                    Every
                  </span>{" "}
                  <span>Time</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap gap-3 sm:gap-4 pt-4 mt-4 justify-center lg:justify-start"
              >
                {/* Start Free Trial - Gradient Button */}
                <button
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold text-white hover:brightness-110 transition-all duration-300 cursor-pointer shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 hover:scale-[1.02] text-sm sm:text-base"
                  style={{
                    background:
                      "linear-gradient(94deg, #66F9E6 7.78%, #305BC9 100%)",
                  }}
                >
                  Start Free Trial
                </button>

                {/* Live Demo - Outline Button with Gradient Border */}
                <button
                  className="relative px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold text-cyan-400 transition-all duration-300 cursor-pointer hover:brightness-110 hover:scale-[1.02] bg-transparent overflow-hidden text-sm sm:text-base"
                  style={{
                    background: "transparent",
                    border: "2px solid transparent",
                    backgroundClip: "padding-box",
                  }}
                >
                  {/* Gradient border using pseudo-element */}
                  <span
                    className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 -z-10"
                    style={{
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />
                  Live Demo
                </button>
              </motion.div>
            </div>

            {/* RIGHT SIDE: Overlapping Horizontal Cards - Fully Responsive */}
            <div className="flex-1 w-full">
              {/* Mobile/Tablet: 2-column grid (visible below lg) */}
              <div className="block lg:hidden">
                <div className="grid grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-6">
                  {CARDS.map((card) => (
                    <ProfileCard key={card.id} card={card} />
                  ))}
                </div>
              </div>

              {/* Desktop: overlapping horizontal row (visible from lg up) */}
              <div className="hidden lg:block">
                <div className="flex flex-row justify-end items-center gap-0">
                  {CARDS.map((card, idx) => {
                    // Define explicit z-index per card (higher index = higher z-index)
                    let zIndexClass = "";
                    if (idx === 0) zIndexClass = "z-10";
                    else if (idx === 1) zIndexClass = "z-20";
                    else if (idx === 2) zIndexClass = "z-30";
                    else if (idx === 3) zIndexClass = "z-40";

                    const translateY =
                      idx === 1 || idx === 3
                        ? "translate-y-6"
                        : "translate-y-0";
                    const marginRight =
                      idx < CARDS.length - 1
                        ? "-mr-12 lg:-mr-16 xl:-mr-20"
                        : "";
                    const width = "w-48 lg:w-52 xl:w-56";

                    return (
                      <div
                        key={card.id}
                        className={`relative ${zIndexClass} ${marginRight} ${width} shrink-0 ${translateY} transition-all duration-300 hover:z-50 hover:scale-105`}
                      >
                        <ProfileCard
                          card={card}
                          className="border-white/5 hover:shadow-2xl"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </CommonWrapper>
      </div>
    </section>
  );
};

export default ChyrHero;
