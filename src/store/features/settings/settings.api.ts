import { baseAPI } from "@/store/api/baseApi";
import { LogEntry, LogLevel } from "@/types/logs.type";

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
  data: null;
}

export interface GetLogsParams {
  keyword?: string;
  from_date?: string;
  to_date?: string;
  log_level?: LogLevel;
  actor_type?: "anonymous" | "system" | "user";
  page_number?: number;
  page_size?: number;
}

interface GetLogsListWrapper {
  status: string;
  message: string;
  data: LogEntry[];
}

export interface GetLogsResponse {
  success: boolean;
  message: string;
  data: {
    total_records: number;
    total_pages: number;
    current_page: number;
    page_size: number;
    next: string | null;
    previous: string | null;
    logs: GetLogsListWrapper;
  };
}

export type MemberInvitationRole = "org_admin" | "org_member";

export interface MemberInvitation {
  id: number;
  email: string;
  role: MemberInvitationRole;
  token: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
  business: number;
}

export interface InviteMemberPayload {
  frontend_url: string;
  email: string;
  role: MemberInvitationRole;
  expires_at: string;
}

export const settingsAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    changePassword: build.mutation<ChangePasswordResponse, ChangePasswordPayload>({
      query: (body) => ({
        url: "/auth/password/change/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    getLogs: build.query<GetLogsResponse, GetLogsParams>({
      query: (params) => ({
        url: "/logs/",
        method: "GET",
        params,
      }),
      providesTags: ["Logs"],
    }),
    getMemberInvitations: build.query<MemberInvitation[], void>({
      query: () => ({
        url: "/auth/member-invitation/",
        method: "GET",
      }),
      providesTags: ["MemberInvitation"],
    }),
    inviteMember: build.mutation<MemberInvitation, InviteMemberPayload>({
      query: (body) => ({
        url: "/auth/member-invitation/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MemberInvitation"],
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useGetLogsQuery,
  useGetMemberInvitationsQuery,
  useInviteMemberMutation,
} = settingsAPI;
