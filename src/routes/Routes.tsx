import { createBrowserRouter, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import App from "../App";
import CreateAgent from "@/pages/CreateAgent";
import NotFound from "@/pages/NotFound";
// import DashboardHome from "@/pages/Dashboard/DashboardHome";
// import ProtectedRoute from "./ProtectedRoute";
// import DashboardLayout from "./DashboardLayout";
// import DashboardAboutPage from "@/pages/Dashboard/DashboardAboutPage";
// import DashboardBusinessInfoPage from "@/pages/Dashboard/DashboardBusinessInfoPage";
// import DashboardBusinessServicesPage from "@/pages/Dashboard/DashboardBusinessServicesPage";
// import DashboardPhone from "@/pages/Dashboard/DashboardPhone";
// import DashboardIntegration from "@/pages/Dashboard/DashboardIntegration";
// import DashboardSettings from "@/pages/Dashboard/DashboardSettings";
import ChyrHome from "@/pages/ChyrHome";
import LoginCHYR from "@/pages/LoginCHYR";
import SignupCHYR from "@/pages/SignupCHYR";
// import SuperAdminLayout from "./SuperAdminLayout";
// import SuperAdmin from "@/pages/SuperAdmin/SuperAdmin";
import ContactUs from "@/pages/ContactUs";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfServices from "@/pages/TermsOfServices";
import { LandingConfigProvider } from "@/contexts/LandingConfigContext"; // adjust path if needed
import DashboardLayoutTwo from "./DashboardLayoutTwo";
import DashboardTwoHome from "@/pages/DashboardTwo/DashboardTwoHome";
import Agents from "@/pages/DashboardTwo/Agents";
import SettingsPage from "@/pages/DashboardTwo/SettingsPage";
import Pricing from "@/pages/DashboardTwo/Pricing";
import CallsLog from "@/pages/DashboardTwo/CallsLog";
import DashboardBusinessInfoPage from "@/pages/Dashboard/DashboardBusinessInfoPage";
import DashboardBusinessServicesPage from "@/pages/Dashboard/DashboardBusinessServicesPage";
import SuperAdminLayout from "./SuperAdminLayout";
import SuperAdmin from "@/pages/SuperAdmin/SuperAdmin";
import ManageFeature from "@/pages/SuperAdmin/ManageFeature";
import ManagePlan from "@/pages/SuperAdmin/ManagePlan";
import PaymentSuccess from "@/pages/PaymentSuccess";
import PaymentFailed from "@/pages/PaymentFailed";
import ProtectedRoute from "./ProtectedRoute";

// Simple wrapper that provides the landing config to all routes
const RootProvider = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      delay: 200,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return (
    <LandingConfigProvider>
      <Outlet />
    </LandingConfigProvider>
  );
};

const routes = createBrowserRouter([
  {
    element: <RootProvider />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            index: true,
            element: <ChyrHome />,
          },
        ],
      },
      {
        path: "/login",
        element: <LoginCHYR />,
      },
      {
        path: "/signup",
        element: <SignupCHYR />,
      },
      {
        path: "/create-agent",
        element: <CreateAgent />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms",
        element: <TermsOfServices />,
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute allowedRoles={["org_admin"]} />,
        children: [
          {
            element: <DashboardLayoutTwo />,
            children: [
              {
                index: true,
                element: <DashboardTwoHome />,
              },
              {
                path: "agents",
                element: <Agents />,
              },
              {
                path: "calls-log",
                element: <CallsLog />,
              },
              {
                path: "business",
                element: <DashboardBusinessInfoPage />,
              },
              {
                path: "services",
                element: <DashboardBusinessServicesPage />,
              },
              {
                path: "pricing",
                element: <Pricing />,
              },
              {
                path: "settings",
                element: <SettingsPage />,
              },
            ],
          },
        ],
      },
      {
        path: "/super-admin",
        element: <ProtectedRoute allowedRoles={["super_admin"]} />,
        children: [
          {
            element: <SuperAdminLayout />,
            children: [
              {
                index: true,
                element: <SuperAdmin />,
              },
              {
                path: "manage-feature",
                element: <ManageFeature />,
              },
              {
                path: "manage-plan",
                element: <ManagePlan />,
              },
            ],
          },
        ],
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/payment-failed",
        element: <PaymentFailed />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default routes;
