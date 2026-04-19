import { baseAPI } from "@/store/api/baseApi";

export const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: "/auth/login/",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    registerClient: build.mutation({
      query: (body) => ({
        url: "/auth/register/",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    verifyOTP: build.mutation({
      query: (data) => ({
        url: "/otp/get-otp/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    updatePassword: build.mutation({
      query: (payload) => ({
        url: "/user/update-password",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterClientMutation,
  useVerifyOTPMutation,
  useUpdatePasswordMutation,
} = userAPI;
