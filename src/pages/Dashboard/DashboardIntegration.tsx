import React, { useState } from "react";
import { CheckCircle2, Link2, Plus, SquareArrowOutUpRight } from "lucide-react";
import PageHeader from "@/common/PageHeader";
import TestCallPopup from "@/components/dashboard/TestCallPopup";
import { Link } from "react-router-dom";

// ── Types
type Status = "connected" | "disconnected" | "coming_soon";

interface Integration {
  id: string;
  name: string;
  description: string;
  category: "booking" | "crm" | "payments";
  status: Status;
  logo: React.ReactNode;
  features: string[];
  inputPlaceholder?: string;
}

// ── Logo Components
const MindBodyLogo = () => (
  <div className="w-14 h-14 bg-[#1a2e1a] rounded-xl flex items-center justify-center shrink-0">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M6 8C6 8 10 12 16 16C22 12 26 8 26 8V24C26 24 22 20 16 16C10 20 6 24 6 24V8Z"
        fill="#4ade80"
      />
      <circle cx="16" cy="16" r="3" fill="#86efac" />
    </svg>
  </div>
);

const GoogleCalendarLogo = () => (
  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
    <div className="relative w-10 h-10">
      {/* Google Calendar icon recreation */}
      <div className="w-10 h-10 border-2 border-[#dadce0] rounded-sm flex flex-col overflow-hidden">
        <div className="bg-[#1a73e8] h-2.5 flex items-center justify-center">
          <span className="text-white text-[6px] font-bold">● ●</span>
        </div>
        <div className="flex-1 flex items-center justify-center bg-white">
          <span className="text-[#1a73e8] text-lg font-bold leading-none">
            31
          </span>
        </div>
      </div>
    </div>
  </div>
);

const CalendlyLogo = () => (
  <div className="w-14 h-14 bg-[#006bff] rounded-xl flex items-center justify-center shrink-0">
    <div className="w-8 h-8 border-[3px] border-white rounded-full flex items-center justify-center">
      <div className="w-4 h-4 border-[3px] border-white rounded-sm rotate-45" />
    </div>
  </div>
);

const OutlookLogo = () => (
  <div className="w-14 h-14 bg-[#0078d4] rounded-xl flex items-center justify-center shrink-0">
    <div className="flex items-center gap-0.5">
      <span className="text-white font-bold text-xl">O</span>
      <div className="w-5 h-5 bg-white/20 rounded-sm flex items-center justify-center">
        <div className="grid grid-cols-2 gap-0.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-white/80 rounded-[1px]" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const HubSpotLogo = () => (
  <div className="w-14 h-14 bg-[#1a1a1a] rounded-xl flex items-center justify-center shrink-0">
    <span className="text-[#ff7a59] font-bold text-sm tracking-tight">
      Hub
      <span className="text-[#ff7a59]">
        S
        <span className="inline-block w-1 h-1 bg-[#ff7a59] rounded-full mb-0.5" />
        t
      </span>
    </span>
  </div>
);

const ZapierLogo = () => (
  <div className="w-14 h-14 bg-[#1a1a1a] rounded-xl flex items-center justify-center shrink-0">
    <span className="text-[#ff4a00] font-bold text-xl italic">zap</span>
  </div>
);

const StripeLogo = () => (
  <div className="w-14 h-14 bg-[#0d0d0d] rounded-xl flex items-center justify-center shrink-0">
    <span className="text-[#635bff] font-bold text-base tracking-tighter">
      stripe
    </span>
  </div>
);

const SquareLogo = () => (
  <div className="w-14 h-14 bg-[#1a1a1a] rounded-xl border border-white/10 flex items-center justify-center shrink-0">
    <div className="w-8 h-8 border-2 border-white/80 rounded-md flex items-center justify-center">
      <div className="w-4 h-4 border-2 border-white/80 rounded-sm" />
    </div>
  </div>
);

// ── Integration Data   ───────────────────
const integrations: Integration[] = [
  {
    id: "mindbody",
    name: "MindBody",
    description:
      "Sync your MindBody calendar to automatically manage bookings and availability",
    category: "booking",
    status: "disconnected",
    logo: <MindBodyLogo />,
    features: [
      "Automatic availability sync",
      "Real-time booking confirmations",
      "Calendar conflict prevention",
      "Two-way appointment updates",
    ],
    inputPlaceholder: "Your MindBody Site ID",
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description:
      "Connect Google Calendar to sync appointments and block off busy times",
    category: "booking",
    status: "connected",
    logo: <GoogleCalendarLogo />,
    features: [
      "Primary calendar sync",
      "Busy time blocking",
      "Event creation",
      "Multi-calendar support",
    ],
    inputPlaceholder: "Your Google Calendar ID",
  },
  {
    id: "calendly",
    name: "Calendly",
    description: "Integrate Calendly for seamless appointment scheduling",
    category: "booking",
    status: "disconnected",
    logo: <CalendlyLogo />,
    features: [
      "Scheduler integration",
      "Workflow automation",
      "Instant booking",
      "Buffer time management",
    ],
    inputPlaceholder: "Your Calendly API Key",
  },
  {
    id: "outlook",
    name: "Outlook Calendar",
    description: "Sync with Outlook for appointment management",
    category: "booking",
    status: "disconnected",
    logo: <OutlookLogo />,
    features: [
      "Exchange calendar sync",
      "Teams meeting support",
      "Out-of-office detection",
      "Recurring event management",
    ],
    inputPlaceholder: "Your Outlook Account Email",
  },
  {
    id: "hubspot",
    name: "HubSpot CRM",
    description: "Sync leads and contacts with your HubSpot CRM",
    category: "crm",
    status: "disconnected",
    logo: <HubSpotLogo />,
    features: [
      "Contact sync",
      "Deal pipeline updates",
      "Call logging",
      "Lead capture",
    ],
    inputPlaceholder: "Your HubSpot API Key",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect to 5,000+ apps via Zapier automations",
    category: "crm",
    status: "disconnected",
    logo: <ZapierLogo />,
    features: [
      "5,000+ app connections",
      "Custom trigger/action flows",
      "No-code automation",
      "Webhook support",
    ],
    inputPlaceholder: "Your Zapier Webhook URL",
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Process payments and manage subscriptions",
    category: "payments",
    status: "coming_soon",
    logo: <StripeLogo />,
    features: [
      "Payment processing",
      "Subscription management",
      "Invoice generation",
      "Refund handling",
    ],
  },
  {
    id: "square",
    name: "Square POS",
    description: "Sync with Square for payment and booking",
    category: "payments",
    status: "coming_soon",
    logo: <SquareLogo />,
    features: [
      "POS integration",
      "Inventory sync",
      "Booking payments",
      "Receipt management",
    ],
  },
];

// ── Status Badge  ──
const StatusBadge = ({
  status,
  onClick,
}: {
  status: Status;
  onClick?: () => void;
}) => {
  if (status === "connected") {
    return (
      <span className="flex items-center gap-1.5 bg-[#1a2e1a] border border-green-700/40 text-green-400 text-xs font-medium px-3 py-1.5 rounded-lg shrink-0">
        <CheckCircle2 size={13} />
        Connected
      </span>
    );
  }
  if (status === "coming_soon") {
    return (
      <span className="bg-[#1e1e1e] border border-white/10 text-gray-400 text-xs font-medium px-3 py-1.5 rounded-lg shrink-0">
        Coming soon
      </span>
    );
  }
  return (
    <button
      onClick={onClick}
      className="bg-[#1e1e1e] border border-white/10 hover:border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-lg shrink-0 transition-colors cursor-pointer"
    >
      Connect
    </button>
  );
};

// ── Section Header  ─
const SectionHeader = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className="flex items-center gap-2 px-1 mb-3">
    <span className="text-gray-500">{icon}</span>
    <span className="text-gray-400 text-lg lg:text-xl font-semibold tracking-widest uppercase">
      {label}
    </span>
  </div>
);

// ── Integration Row
const IntegrationRow = ({
  item,
  isSelected,
  onSelect,
}: {
  item: Integration;
  isSelected: boolean;
  onSelect: () => void;
}) => (
  <div
    onClick={() => item.status !== "coming_soon" && onSelect()}
    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
      item.status === "coming_soon"
        ? "opacity-60 cursor-default border-white/5 bg-[#0f0f0f]"
        : isSelected
          ? "border-white/20 bg-[#161616] cursor-pointer"
          : "border-white/6 bg-[#0f0f0f] hover:bg-white/4 hover:border-white/12 cursor-pointer"
    }`}
  >
    {item.logo}
    <div className="flex-1 min-w-0">
      <p className="text-white text-sm font-semibold">{item.name}</p>
      <p className="text-gray-500 text-xs mt-0.5 line-clamp-2">
        {item.description}
      </p>
    </div>
    <StatusBadge status={item.status} onClick={onSelect} />
  </div>
);

// ── Right Panel  ────
const RightPanel = ({
  integration,
  onConnect,
  onDisconnect,
}: {
  integration: Integration | null;
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
}) => {
  const [inputValue, setInputValue] = useState("");

  if (!integration) {
    return (
      <div className="bg-white/5 p-1 lg:p-5 h-full rounded-xl xl:rounded-2xl">
        <div className="relative bg-black flex flex-col items-center justify-center h-full min-h-[400px] gap-4 text-center px-8 rounded-xl xl:rounded-2xl border-2 border-dashed border-white/10 overflow-hidden">
          {/* Subtle dot-grid background pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="dot-grid"
                x="0"
                y="0"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1.2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-grid)" />
          </svg>

          {/* Large faint 'C' watermark — BLYVO brand hint */}
          <span className="absolute text-[260px] font-black text-white/2.5 select-none pointer-events-none leading-none -translate-y-4">
            C
          </span>

          {/* Foreground content */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-[#1a1a1a] border border-white/10 rounded-2xl flex items-center justify-center">
              <Link2 size={24} className="text-gray-500" />
            </div>
            <div>
              <p className="text-white text-base font-medium">
                Select an integration to configure
              </p>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[260px] mt-1">
                Choose any integration on the left to connect and set up your
                tools
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 p-1 lg:p-5 h-full rounded-xl xl:rounded-2xl">
      <div className="flex flex-col justify-center  gap-7 px-3 lg:px-6 py-2 bg-black h-full rounded-xl xl:rounded-2xl border-2 border-dashed border-white/10">
        {/* Logo + title */}
        <div className="flex flex-col gap-4">
          {integration.logo}
          <div>
            <h2 className="text-white text-xl font-semibold">
              Connect {integration.name}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {integration.description}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-col gap-3">
          <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold">
            What you'll get
          </p>
          <ul className="flex flex-col gap-2">
            {integration.features.map((f, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-gray-400 text-sm"
              >
                <div className="w-1 h-1 bg-gray-600 rounded-full shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Input + actions */}
        {integration.status !== "coming_soon" && (
          <div className="flex flex-col gap-4">
            {integration.status === "disconnected" && (
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={integration.inputPlaceholder}
                className="w-full bg-[#0f0f0f] border border-white/10 focus:border-white/25 text-white text-sm placeholder:text-gray-600 rounded-xl px-4 py-3 outline-none transition-colors"
              />
            )}

            <div className="flex flex-col gap-3">
              {integration.status === "disconnected" ? (
                <>
                  <button
                    onClick={() => onConnect(integration.id)}
                    className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
                  >
                    <SquareArrowOutUpRight size={15} />
                    Connect {integration.name}
                  </button>
                  <button className="text-gray-500 hover:text-gray-300 text-sm underline underline-offset-2 transition-colors text-center">
                    Use staff credentials instead
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onDisconnect(integration.id)}
                  className="flex items-center justify-center gap-2 bg-red-600/10 hover:bg-red-600/20 border border-red-600/20 text-red-400 text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
                >
                  Disconnect {integration.name}
                </button>
              )}
            </div>
          </div>
        )}

        {integration.status === "coming_soon" && (
          <div className="bg-[#1a1500] border border-yellow-700/20 rounded-xl px-4 py-3">
            <p className="text-yellow-500/80 text-sm">
              This integration is coming soon. We'll notify you when it's
              available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Main Component  ─
const DashboardIntegration: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Record<string, Status>>(() =>
    Object.fromEntries(integrations.map((i) => [i.id, i.status])),
  );

  const handleConnect = (id: string) => {
    setStatuses((prev) => ({ ...prev, [id]: "connected" }));
  };

  const handleDisconnect = (id: string) => {
    setStatuses((prev) => ({ ...prev, [id]: "disconnected" }));
  };

  const getItem = (id: string | null) => {
    if (!id) return null;
    const base = integrations.find((i) => i.id === id);
    if (!base) return null;
    return { ...base, status: statuses[id] };
  };

  const byCategory = (cat: Integration["category"]) =>
    integrations
      .map((i) => ({ ...i, status: statuses[i.id] }))
      .filter((i) => i.category === cat);

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-6 py-6">
      <PageHeader
        onRefresh={() => console.log("Refreshed")}
        onSave={() => console.log("Saved")}
        actionRows={[
          // Row 1: Primary Action
          <button
            className="bg-[#1877F2] hover:bg-[#1168d9] hover:cursor-pointer text-white px-8 py-2.5 rounded-xl font-medium w-full md:w-auto"
            onClick={() => setIsPopupOpen(true)}
          >
            Test Your Agent
          </button>,

          // Row 2: Secondary Action
          <Link
            to="/create-agent"
            className="flex items-center justify-center md:justify-start gap-2 bg-[#1C1C1E] hover:bg-[#282828] hover:cursor-pointer text-white px-4 py-2.5 rounded-xl text-sm border border-white/5 w-full md:w-auto"
          >
            <Plus size={16} /> New Agent
          </Link>,
        ]}
      >
        {/* Left Side Content */}
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold text-white tracking-tight">
            Good Morning, Sazzy
          </h1>
          <button className="text-[#1877F2] text-xl font-medium hover:underline block">
            Integrations
          </button>
          <p className="text-gray-500 max-w-md">
            Connect your booking calendar to let your AI agent manage
            appointments and streamline your workflow.
          </p>
        </div>
      </PageHeader>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-3 h-full">
        {/* ── LEFT: Integration List    */}
        <div className=" flex flex-col gap-8 overflow-y-auto">
          {/* BOOKING CALENDARS */}
          <section>
            <SectionHeader
              icon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              }
              label="Booking Calendars"
            />
            <div className="flex flex-col gap-3">
              {byCategory("booking").map((item) => (
                <IntegrationRow
                  key={item.id}
                  item={item}
                  isSelected={selectedId === item.id}
                  onSelect={() => setSelectedId(item.id)}
                />
              ))}
            </div>
          </section>

          {/* CRM & AUTOMATION */}
          <section>
            <SectionHeader
              icon={<Link2 size={14} />}
              label="CRM & Automation"
            />
            <div className="flex flex-col gap-3">
              {byCategory("crm").map((item) => (
                <IntegrationRow
                  key={item.id}
                  item={item}
                  isSelected={selectedId === item.id}
                  onSelect={() => setSelectedId(item.id)}
                />
              ))}
            </div>
          </section>

          {/* PAYMENTS */}
          <section>
            <SectionHeader
              icon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="1" y="4" width="22" height="16" rx="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
              }
              label="Payments"
            />
            <div className="flex flex-col gap-3">
              {byCategory("payments").map((item) => (
                <IntegrationRow
                  key={item.id}
                  item={item}
                  isSelected={selectedId === item.id}
                  onSelect={() => setSelectedId(item.id)}
                />
              ))}
            </div>
          </section>
        </div>

        {/* ── Vertical Divider   ───── */}
        <div className="hidden lg:block bg-white/6" />

        {/* ── RIGHT: Config Panel   ── */}
        <div className="flex flex-col justify-center min-h-[400px]">
          <RightPanel
            integration={getItem(selectedId)}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
          />
        </div>
      </div>
      {isPopupOpen && <TestCallPopup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default DashboardIntegration;
