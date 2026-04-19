import yelp from "@/assets/logo/yelp.png";
import toast from "@/assets/logo/toast.png";
import square from "@/assets/logo/square.png";
import opentable from "@/assets/logo/opentable.png";
import calendar from "@/assets/logo/calendar.png";
import stripe from "@/assets/logo/stripe.png";
import mindsbody from "@/assets/logo/mindsbody.png";
import outlook from "@/assets/logo/outlook.png";
const integrations = [
  {
    name: "Google Calendar",
    category: "POS & Payments",
    icon: calendar,
  },
  {
    name: "Square",
    category: "POS & Payments",
    icon: square,
  },
  {
    name: "Toast",
    category: "Restaurant POS",
    icon: toast,
  },
  {
    name: "Stripe",
    category: "Payments",
    icon: stripe,
  },
  {
    name: "OpenTable",
    category: "Reservations",
    icon: opentable,
  },
  {
    name: "Outlook",
    category: "Email",
    icon: outlook,
  },
  {
    name: "Yelp",
    category: "Reviews",
    icon: yelp,
  },
  {
    name: "Mindbody",
    category: "Wellness",
    icon: mindsbody,
  },
];

export default function ChyrIntegrations() {
  const doubledIntegrations = [...integrations, ...integrations];

  return (
    <section className="min-h-screen text-white flex flex-col items-center justify-center p-6 font-sans py-0 md:py-10 bg-[#060D10]">
      {/* Badge with AOS fade-up (shorter delay) */}
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/20 border border-cyan-900/50 text-cyan-400 text-sm font-medium mb-8"
      >
        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse-dot" />
        Works With Your Stack
      </div>

      {/* Title & Subtitle with AOS fade-up + 500ms delay */}
      <div
        data-aos="fade-up"
        data-aos-delay="500"
        className="max-w-4xl text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-[linear-gradient(95deg,#61EFDE_29.54%,#0099E8_69.88%)] bg-clip-text text-transparent leading-tight">
          Integrates With The Tools <br /> You Already Use
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
          No switching software. No learning something new. <br />
          Blyvo plugs into your existing setup in minutes.
        </p>
      </div>

      {/* Infinite Scroll Row */}
      <div
        data-aos="fade-up"
        data-aos-delay="600"
        className="w-full relative overflow-hidden max-w-[1400px] px-2 md:px-4 py-2 md:py-4 mx-auto"
      >
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#060D10] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#060D10] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 w-max px-6 animate-marquee hover:[animation-play-state:paused]">
          {doubledIntegrations.map((item, index) => (
            <div
              key={index}
              className="group bg-[#161b1e] border border-white/5 p-4 rounded-2xl flex items-center justify-center min-w-[280px] 
    transition-all duration-500 
    hover:border-cyan-500/30 hover:bg-[#1c2226] 
    hover:shadow-[0_0_20px_rgba(34,211,238,0.05)]
    opacity-0 animate-fadeUp"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <img
                src={item.icon}
                alt={item.name}
                className="w-32 object-contain brightness-110"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Text */}
      <p
        data-aos="fade-up"
        data-aos-delay="700"
        className="mt-12 text-gray-500 font-medium tracking-wide text-sm uppercase"
      >
        Setup takes less than 5 minutes
      </p>

      <style>{`
        @keyframes pulseDot {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-pulse-dot {
          animation: pulseDot 1.5s ease-in-out infinite;
        }
        /* Make sure you have this marquee keyframe in your global CSS */
        @keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeUp {
  animation: fadeUp 0.6s ease forwards;
}
        .animate-marquee {
  animation: marquee 25s linear infinite;
  animation-delay: 0.8s; /* 🔥 makes it feel natural */
}
      `}</style>
    </section>
  );
}
