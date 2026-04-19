import { baseAPI } from "@/store/api/baseApi";
import type { CallsDashboardResponse } from "./calls-dashboard.types";

export const callsDashboardAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getCallsDashboard: build.query<CallsDashboardResponse, void>({
      query: () => ({
        url: "/api/calls/dashboard/",
        method: "GET",
      }),
      providesTags: ["CallsDashboard"],
    }),
  }),
});

export const { useGetCallsDashboardQuery } = callsDashboardAPI;

