import { baseAPI } from "@/store/api/baseApi";

export type TBusinessService = {
  id: number;
  business: number;
  name: string;
  category_name: string;
  description: string;
  price: string;
  duration: number;
  allow_booking: boolean;
};

export type TServicePayload = {
  category: string;
  name: string;
  description: string;
  price: string;
  duration: number;
  allow_booking: boolean;
};

export type TBusinessFAQ = {
  id: number;
  question: string;
  answer: string;
};

export type TBusinessAdditionalInfo = {
  id: number;
  content: string;
};

export type TBusinessAdditionalInfoPayload = {
  content: string;
};

export type TBusinessHour = {
  id: number;
  business: number;
  day: number;
  open_time: string;
  close_time: string;
  is_closed: boolean;
};

export type TBusinessPolicy = {
  id: number;
  policy_type: string;
  policy_title: string;
  content: string;
};

export type TBusiness = {
  id: number;
  owner: number;
  name: string;
  business_email: string;
  business_website: string;
  description: string;
  business_type: string;
  services: TBusinessService[];
  faqs: TBusinessFAQ[];
  additional_info: TBusinessAdditionalInfo[];
  hours: TBusinessHour[];
  policies: TBusinessPolicy[];
  address: string;
  timezone: string;
  is_active: boolean;
  has_business_email: boolean;
  created_at: string;
  updated_at: string;
};

export const businessAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getBusinesses: build.query<TBusiness[], void>({
      query: () => "/api/business/businesses/",
      providesTags: ["Business", "Services", "FAQs", "Policies"],
    }),
    createBusiness: build.mutation({
      query: (data) => ({
        url: "/api/business/businesses/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Business"],
    }),
    updateBusiness: build.mutation({
      query: ({ business_id, data }) => ({
        url: `/api/business/businesses/${business_id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Business"],
    }),
    getBusiness: build.query<TBusiness, { business_id: number }>({
      query: ({ business_id }) => `/api/business/businesses/${business_id}/`,
      providesTags: ["Business"],
    }),
    createBusinessServices: build.mutation({
      query: ({ business_id, data }) => ({
        url: `/api/business/businesses/${business_id}/services/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),
    createBusinessHours: build.mutation({
      query: ({ business_id, data }) => ({
        url: `/api/business/businesses/${business_id}/hours/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Business"],
    }),
    updateBusinessHours: build.mutation({
      query: ({ business_id, data }) => ({
        url: `/api/business/businesses/${business_id}/hours/${data.id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Business"],
    }),
    getServices: build.query({
      query: ({ business_id }) =>
        `/api/business/businesses/${business_id}/services/`,
      providesTags: ["Services"],
    }),
    addServices: build.mutation({
      query: ({ business_id, data }: { business_id: number; data: TServicePayload }) => ({
        url: `/api/business/businesses/${business_id}/services/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),
    updateServices: build.mutation({
      query: ({ business_id, id, data }: { business_id: number; id: number; data: TServicePayload }) => ({
        url: `/api/business/businesses/${business_id}/services/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),
    deleteServices: build.mutation({
      query: ({ business_id, id }: { business_id: number; id: number }) => ({
        url: `/api/business/businesses/${business_id}/services/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Services"],
    }),
    getBusinessPolicies: build.query({
      query: ({ business_id }) =>
        `/api/business/businesses/${business_id}/policies/`,
      providesTags: ["Policies"],
    }),
    addBusinessPolicies: build.mutation({
      query: ({ business_id, data }) => ({
        url: `/api/business/businesses/${business_id}/policies/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Policies"],
    }),
    updateBusinessPolicies: build.mutation({
      query: ({ business_id, data }) => ({
        url: `/api/business/businesses/${business_id}/policies/${data.id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Policies"],
    }),
    getBusinessFAQs: build.query({
      query: ({ business_id }) =>
        `/api/business/businesses/${business_id}/faqs/`,
      providesTags: ["FAQs"],
    }),
    addBusinessFAQs: build.mutation({
      query: ({ business_id, data }) => ({
        url: `/api/business/businesses/${business_id}/faqs/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FAQs"],
    }),
    updateBusinessFAQs: build.mutation({
      query: ({ business_id, data }) => ({
        url: `/api/business/businesses/${business_id}/faqs/${data.id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["FAQs"],
    }),
    deleteBusinessFAQs: build.mutation({
      query: ({ business_id, id }) => ({
        url: `/api/business/businesses/${business_id}/faqs/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["FAQs"],
    }),
    deleteBusinessAdditionalInfo: build.mutation({
      query: ({ business_id, id }) => ({
        url: `/api/business/businesses/${business_id}/additional-info/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Business"],
    }),
    addBusinessAdditionalInfo: build.mutation({
      query: ({
        business_id,
        data,
      }: {
        business_id: number;
        data: TBusinessAdditionalInfoPayload;
      }) => ({
        url: `/api/business/businesses/${business_id}/additional-info/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Business"],
    }),
  }),
});

export const {
  useGetBusinessesQuery,
  useCreateBusinessMutation,
  useUpdateBusinessMutation,
  useGetBusinessQuery,
  useCreateBusinessServicesMutation,
  useCreateBusinessHoursMutation,
  useUpdateBusinessHoursMutation,
  useGetServicesQuery,
  useAddServicesMutation,
  useUpdateServicesMutation,
  useDeleteServicesMutation,
  useGetBusinessPoliciesQuery,
  useAddBusinessPoliciesMutation,
  useUpdateBusinessPoliciesMutation,
  useGetBusinessFAQsQuery,
  useAddBusinessFAQsMutation,
  useUpdateBusinessFAQsMutation,
  useDeleteBusinessFAQsMutation,
  useDeleteBusinessAdditionalInfoMutation,
  useAddBusinessAdditionalInfoMutation,
} = businessAPI;
