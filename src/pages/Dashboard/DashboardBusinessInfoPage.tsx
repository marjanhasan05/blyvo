import CommonWrapper from "@/common/CommonWrapper";
import AdditionalInformation from "@/components/dashboard/DashboardComponent/DashboardBusinessInfoPageComponent/AdditionalInformationSection";
import BusinessDetailsSection from "@/components/dashboard/DashboardComponent/DashboardBusinessInfoPageComponent/BusinessDetailsSection";
import BusinessHoursSection from "@/components/dashboard/DashboardComponent/DashboardBusinessInfoPageComponent/BusinessHoursSection";
import BusinessPoliciesSection from "@/components/dashboard/DashboardComponent/DashboardBusinessInfoPageComponent/BusinessPoliciesSection";
import BussinessFAQSection from "@/components/dashboard/DashboardComponent/DashboardBusinessInfoPageComponent/BussinessFAQSection";
import LuxeToolbar from "@/components/dashboard/DashboardComponent/DashboardBusinessInfoPageComponent/LuxeToolbar";
import ServicesSection from "@/components/dashboard/DashboardComponent/DashboardBusinessInfoPageComponent/ServicesSection";
import { useGetBusinessesQuery } from "@/store/features/business/business.api";
import { useAppSelector } from "@/store/hook";
import { useMemo } from "react";

export default function DashboardBusinessInfoPage() {
  const userId = useAppSelector((state) => state.auth?.user?.id);
  const { data: businesses = [], isLoading, isError } = useGetBusinessesQuery();
 console.log(businesses,'business info................');
  const activeBusiness = useMemo(() => {
    if (!businesses.length) return undefined;
    const matched = businesses.find((item) => String(item.owner) === String(userId));
    return matched || businesses[0];
  }, [businesses, userId]);

  return (
    <div className="px-6">
      <CommonWrapper>
        <LuxeToolbar businessName={activeBusiness?.name} />
        <div className="mt-8">
          {isLoading ? (
            <div className="text-[#9E9E9E] text-sm">Loading business information...</div>
          ) : null}
          {isError ? (
            <div className="text-red-400 text-sm mb-4">Failed to load business information.</div>
          ) : null}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left column — Business Details + Services */}
            <div className="space-y-6">
              <BusinessDetailsSection business={activeBusiness} />
              <ServicesSection
                businessId={activeBusiness?.id}
                services={activeBusiness?.services || []}
              />
            </div>

            {/* Right column — Hours + Policies + FAQ + Additional Information
              Moving AdditionalInformation here balances column heights */}
            <div className="space-y-6">
              <BusinessHoursSection
                businessId={activeBusiness?.id}
                hours={activeBusiness?.hours || []}
                timezone={activeBusiness?.timezone || ""}
              />
              <BusinessPoliciesSection
                businessId={activeBusiness?.id}
                policies={activeBusiness?.policies || []}
              />
              <BussinessFAQSection
                businessId={activeBusiness?.id}
                faqs={activeBusiness?.faqs || []}
              />
            </div>
          </div>
          <AdditionalInformation
            businessId={activeBusiness?.id}
            items={activeBusiness?.additional_info || []}
          />
        </div>
      </CommonWrapper>
    </div>
  );
}
