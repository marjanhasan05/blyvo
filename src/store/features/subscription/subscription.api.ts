import { baseAPI } from "@/store/api/baseApi";
import { SubscriptionPlanResponse, EligibleFeaturesResponse } from "./subscription.types";

export const subscriptionAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getSubscriptionPlans: build.query<SubscriptionPlanResponse, void>({
      query: () => "/subscription/plans/",
      providesTags: ["Plan"],
    }),
    getEligibleFeatures: build.query<EligibleFeaturesResponse, { planId: number }>({
      query: ({ planId }) => ({
        url: "/subscription/eligible-features/",
        method: "POST",
        body: {
          eligible_for: "plan",
          id: planId,
        },
      }),
    }),
  }),
});

export const { useGetSubscriptionPlansQuery, useGetEligibleFeaturesQuery } = subscriptionAPI;
