import { baseAPI } from "@/store/api/baseApi";
import {
  Agent,
  AgentLanguage,
  AgentPhoneNumber,
  AgentVoiceResponse,
  FormOptionsResponse,
  IntakeQuestion,
} from "./aget.type";

export const agentAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAgent: build.query<Agent, void>({
      query: () => `/api/agent/agents/`,
      providesTags: ["Agent"],
    }),
    getAllAgent: build.query<AgentVoiceResponse[], void>({
      query: () => `/api/agent/agent-voices/`,
      providesTags: ["Agent"],
    }),
    getAgentLanguages: build.query<AgentLanguage[], void>({
      query: () => `/api/agent/languages/`,
      providesTags: ["Agent"],
    }),
    getAgentPhoneNumbers: build.query<AgentPhoneNumber[], void>({
      query: () => `/api/agent/transfer-number/`,
      providesTags: ["Agent"],
    }),
    updateAgentLanguage: build.mutation({
      query: ({ data }) => ({
        url: `/api/agent/languages/${data.id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Agent"],
    }),
    selectAgent: build.mutation({
      query: ({ data }) => ({
        url: `/api/agent/agent-voices/${data.id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Agent"],
    }),
    createAgent: build.mutation({
      query: ({ business_id, data }) => ({
        url: `/api/business/businesses/${business_id}/agents/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Agent"],
    }),
    updateAgent: build.mutation({
      query: ({ business_id, data }) => ({
        url: `/api/business/businesses/${business_id}/agents/${data.id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Agent"],
    }),
    deleteAgent: build.mutation({
      query: ({ business_id, data }) => ({
        url: `/api/business/businesses/${business_id}/agents/${data.id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Agent"],
    }),
    createIntakeQuestion: build.mutation({
      query: (data) => ({
        url: "/api/agent/intake-questions/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["IntakeQuestions"],
    }),
    getIntakeFormOptions: build.query<FormOptionsResponse, void>({
      query: () => `/api/agent/intake-questions/form-options/`,
      providesTags: ["IntakeFormOptions"],
    }),
    getIntakeQuestions: build.query<IntakeQuestion[], void>({
      query: () => "/api/agent/intake-questions/",
      providesTags: ["IntakeQuestions"],
    }),
  }),
});

export const {
  useGetAgentQuery,
  useGetAllAgentQuery,
  useSelectAgentMutation,
  useCreateAgentMutation,
  useUpdateAgentMutation,
  useDeleteAgentMutation,
  useUpdateAgentLanguageMutation,
  useGetAgentLanguagesQuery,
  useGetAgentPhoneNumbersQuery,
  useCreateIntakeQuestionMutation,
  useGetIntakeFormOptionsQuery,
  useGetIntakeQuestionsQuery,
} = agentAPI;
