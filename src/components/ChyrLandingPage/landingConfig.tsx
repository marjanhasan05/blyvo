import {
  Phone,
  Calendar,
  Zap,
  Droplet,
  Globe,
  BarChart3,
  Clock,
  PhoneCall,
  Mic2,
  MessagesSquare,
} from "lucide-react";
import chyLogo from "@/assets/images/chyrImage/logo-chy.png";

export type BaseBrandVariables = {
  brandName: string;
  colors: {
    primaryHost: string;
    primaryStyle: string;
    primaryHex: string;
    secondaryHex: string;
    buttonGradientBorder: string;
    buttonShadow: string;
    revenueCTAGradient: string;
    securityGradientTarget: string;
    brandColor?: string;
    brandColorHex?: string;
  };
  assets: {
    phoneUILogo: string;
    integrationImg: string;
    heroBgVideo?: string;
  };
  texts: {
    hero: {
      rotatingWords: string[];
      description: string;
      finalWord: string;
    };
    businessMiss: {
      sentence: string;
      title: string;
      features: { title: string; content: string; Icon: any }[];
    };
    tryLiveDemo: {
      button1Icon: any;
      button1Text: string;
      button2Icon: any;
      button2Text: string;
      description: string;
    };
    reliableEmployee: {
      titlePrefix: string;
      features: { title: string; content: string; Icon: any }[];
    };
    faq: {
      subtitle: string;
      list: { value: string; trigger: string; content: string }[];
    };
    forwardCalls: {
      numberTitle: string;
      businessLabel: string;
      activity1: string;
      activity1Sub: string;
      activity2: string;
      alertText: string;
      title: string;
      desc: string;
      steps: { title: string; content: string }[];
    };
    hylnSteps: {
      titlePart1: string;
      titlePart2: string;
      importLabel: string;
      importPlaceholder: string;
      tellMeAbout: string;
      tellMeSub: string;
      step1Title: string;
      step1Desc: string;
      step1List: { title: string; content: string }[];
    };
    customizeHyln: {
      title: string;
      desc: string;
      steps: { title: string; content: string }[];
      greeting: string;
      servicesLabel: string;
      services: string[];
      intakeQuestions: string[];
      transferText: string;
      integration1Name: string;
    };
    integrations: {
      titleSuffix: string;
    };
    heroCallWidget: {
      title: string;
      cardColor?: string;
      askAnything: string;
      features: { Icon: any; title: string; sub: string }[];
      activities: { name: string; status: string }[];
    };
  };
};

export const CHYR_CONFIG: BaseBrandVariables = {
  brandName: "Blyvo",
  colors: {
    // Text gradients (use with bg-clip-text text-transparent)
    primaryHost:
      "bg-[linear-gradient(95deg,#61EFDE_29.54%,#0099E8_69.88%)] bg-clip-text text-transparent",
    primaryStyle:
      "bg-[linear-gradient(95deg,#61EFDE_29.54%,#0099E8_69.88%)] bg-clip-text text-transparent",

    // Primary color fallback (using the start color of the gradient)
    primaryHex: "#61EFDE",

    // Secondary button color
    secondaryHex: "#FFF",

    // Button gradient border (primary button gradient)
    buttonGradientBorder:
      "linear-gradient(94deg, #66F9E6 7.78%, #305BC9 100%), linear-gradient(275deg, #0005FF 40.61%, #393CF2 96.6%)",

    // Button shadow (unchanged)
    buttonShadow: "0 4px 18px 0 rgba(99, 5, 113, 0.50)",

    // Revenue CTA gradient (unchanged)
    revenueCTAGradient:
      "radial-gradient(circle at 70% 30%,  #F1A34C 0%, #9F1DF5 60%)",

    // Security gradient target (unchanged)
    securityGradientTarget: "to-[#FFCD72]",

    // Brand background gradient (primary gradient)
    brandColor:
      "bg-[linear-gradient(94deg,#66F9E6_7.78%,#305BC9_100%),linear-gradient(275deg,#0005FF_40.61%,#393CF2_96.6%)]",

    // Brand color fallback
    brandColorHex: "#FFF",
  },
  assets: {
    phoneUILogo: chyLogo,
    integrationImg: chyLogo,
    heroBgVideo: chyLogo,
  },
  texts: {
    hero: {
      rotatingWords: ["appointment.", "reservation.", "order.", "booking."],
      description:
        "Blyvo answers your phones, books your appointments, and helps you stay on top of every customer.",
      finalWord: "appointment.",
    },
    businessMiss: {
      sentence:
        "Businesses miss up to 1 in 3 incoming calls. Blyvo misses None",
      title: "Trusted by growing businesses across industries",
      features: [
        {
          title: "Missed Calls",
          content:
            "Up to 34% of salon calls go unanswered during peak hours. That's lost revenue.",
          Icon: Phone,
        },
        {
          title: "Table Bookings",
          content:
            "Customers want to book instantly. If nobody answers, they call the competition.",
          Icon: Calendar,
        },
        {
          title: "Takeout Orders",
          content:
            "Phone orders get messy during dinner rush. Mistakes cost money and bad reviews.",
          Icon: Zap,
        },
        {
          title: "Menu Questions",
          content:
            'Staff spend hours answering "Are you open?" and "Do you have vegan options?"',
          Icon: Droplet,
        },
      ],
    },
    tryLiveDemo: {
      button1Icon: PhoneCall,
      button1Text: "Try Blyvo",
      button2Icon: Mic2,
      button2Text: "See Blyvo Handle a Real Call",
      description:
        "Blyvo answers instantly, understands the caller, books appointments, answers questions, and routes conversations — all in real time.",
    },
    reliableEmployee: {
      titlePrefix: "Your restaurant's ",
      features: [
        {
          title: "24/7 Call Answering",
          content:
            "Never miss a booking request again even during peak hours or days off.",
          Icon: Clock,
        },
        {
          title: "Lead Capture & Qualification",
          content:
            "AI collects travel preferences, budget, and dates to qualify leads instantly.",
          Icon: Calendar,
        },
        {
          title: "Smart Package Recommendations",
          content:
            "Suggests packages based on customer preferences and increases conversion automatically.",
          Icon: Zap,
        },
        {
          title: "Appointment Scheduling",
          content:
            "Books consultation calls with travel agents and sends confirmation messages.",
          Icon: Droplet,
        },
        {
          title: "Multilingual Support",
          content:
            "English, Arabic, and other languages help international clients feel understood instantly.",
          Icon: Globe,
        },
        {
          title: "Analytics Dashboard",
          content:
            "Track calls answered, leads captured, peak inquiry times, and conversion rates.",
          Icon: BarChart3,
        },
      ],
    },
    faq: {
      subtitle: "Everything you need to know about Blyvo.",
      list: [
        {
          value: "item-1",
          trigger: "How will appointments be added to our booking system?",
          content:
            "Blyvo integrates with all major salon and restaurant booking systems, including Square, OpenTable, Resy, and more. When a customer books through Blyvo, the appointment is automatically added to your existing calendar in real-time.",
        },
        {
          value: "item-2",
          trigger: "Can the AI handle cancellations and rescheduling?",
          content:
            "Yes! Blyvo can handle cancellations and rescheduling requests 24/7. Customers can cancel or change their appointments through Blyvo, and the changes will be reflected in your booking system instantly.",
        },
        {
          value: "item-3",
          trigger:
            "How will the AI handle customers who struggle to speak English?",
          content:
            "Blyvo is fluent in English, Arabic, French, Spanish, and over 100+ other languages. It can communicate naturally with customers in their preferred language, ensuring they feel understood and valued.",
        },
        {
          value: "item-4",
          trigger:
            "How would you provide us with support, and do we need to pay for it?",
          content:
            "Every Blyvo account includes 24/7 technical support via email, phone, and live chat. We also offer optional onboarding and training services to ensure you get the most out of Blyvo.",
        },
        {
          value: "item-5",
          trigger:
            "Will I be able to see a report of how the AI is performing?",
          content:
            "Yes! You'll get a detailed analytics dashboard showing calls answered, appointments booked, peak hours, conversion rates, and more. All data is updated in real-time.",
        },
        {
          value: "item-6",
          trigger: "Can the AI upsell services or packages?",
          content:
            "Yes! Blyvo can be trained to upsell services and packages based on your business goals. It can recommend add-ons, premium options, or special packages to customers during the conversation.",
        },
        {
          value: "item-7",
          trigger: "What if a client asks for a specific stylist or therapist?",
          content:
            "Yes! Blyvo can be customized to handle specific requests like stylist or therapist preferences. You can train it to know your team's availability and recommend the right person for each appointment.",
        },
      ],
    },
    forwardCalls: {
      numberTitle: "Your Blyvo Number",
      businessLabel: "Business number",
      activity1: "Sarah M.",
      activity1Sub: "Blyvo answering..",
      activity2: "Faisal A.",
      alertText: "Transfer urgent to you",
      title: "Forward your calls and go live",
      desc: "Forward calls from your business line to Nohm — she'll start answering, booking appointments, and keeping you in the loop instantly.",
      steps: [
        {
          title: "Get Your Blyvo Number — ",
          content: "Forward calls when busy or after hours",
        },
        { title: "See every call — ", content: "Summaries in your dashboard" },
        {
          title: "Get notified — ",
          content: "Text or email alerts for urgent calls and new bookings",
        },
      ],
    },
    hylnSteps: {
      titlePart1: "business calls",
      titlePart2: "in",
      importLabel: "Import your website and let Blyvo learn your business",
      importPlaceholder: "https://yourbusiness.com",
      tellMeAbout: "Talk to Blyvo About Your Business",
      tellMeSub:
        "Have a quick conversation and we’ll set everything up for you",
      step1Title: "Launch Blyvo in Minutes",
      step1Desc:
        "Import your website or speak with Blyvo directly — your AI receptionist will learn your services, hours, pricing, and FAQs instantly.",
      step1List: [
        {
          title: "Import from your website — Blyvo ",
          content: "extracts all your business details automatically",
        },
        {
          title: "Talk to Blyvo — ",
          content: "Describe how you operate and we configure everything live",
        },
        {
          title: "Connect your booking system — ",
          content: "Sync calendars and start scheduling immediately",
        },
      ],
    },
    customizeHyln: {
      title: "Shape How Blyvo Handles Every Call",
      desc: "Customize your voice, greeting, and call flow so every conversation reflects your brand perfectly.",
      steps: [
        {
          title: "Pick your voice — ",
          content: "Friendly, professional, or somewhere in between",
        },
        {
          title: "Add intake questions — ",
          content: "Ask about allergies, preferences, or anything you need",
        },
        {
          title: "Connect integrations — ",
          content: "MindBody, Square, Vagaro, and more",
        },
      ],
      greeting:
        "““Thank you for calling [Restaurant Name]. This is [Name]. How may I assist you today?””",
      servicesLabel: "Taking Orders",
      services: [
        "Make a Reservation",
        "Modify / Cancel Reservation",
        "Order Takeout",
        "Menu Information",
      ],
      intakeQuestions: [
        "1. What date and time is your reservation?",
        "2. How many guests?",
      ],
      transferText: "Transfer urgent calls to (555) 123-4567",
      integration1Name: "Mindbody",
    },
    integrations: {
      titleSuffix: "restaurant tools",
    },
    heroCallWidget: {
      title: "Talk to Blyvo Live",
      cardColor: "bg-[#6E5BBD]",
      askAnything: "Ask Blyvo anything and try it out for yourself",
      features: [
        { Icon: Calendar, title: "Book Appointments", sub: "Syncs to Square" },
        {
          Icon: MessagesSquare,
          title: "Send Confirmations",
          sub: "Auto text reminders",
        },
        { Icon: Clock, title: "Works 24/7", sub: "Never misses a call" },
      ],
      activities: [
        { name: "Sarah M", status: "Reserved table for 4" },
        { name: "Mike T.", status: "Takeout order" },
        { name: "Jessica R", status: "Reserved table" },
        { name: "David K.", status: "Answered" },
      ],
    },
  },
};
