import { baseAPI } from "@/store/api/baseApi";
import type { PhoneAnswer, SearchNumberItem } from "./calls-log.types";

export type CreatePhoneAnswerBody = SearchNumberItem & {
  agent?: number;
};

/**
 * AI `/agent/phone-numbers/search` rows can differ slightly; map to a strict shape
 * so provision never sends wrong/missing keys.
 */
export function normalizeAiPhoneSearchRow(raw: unknown): SearchNumberItem {
  const r = raw as Record<string, unknown>;
  const cap = (r.capabilities ?? {}) as Record<string, unknown>;
  const locality = r.locality;
  return {
    phone_number: String(r.phone_number ?? "").trim(),
    friendly_name: String(
      r.friendly_name ?? r.friendlyName ?? "",
    ).trim(),
    locality:
      locality == null || locality === ""
        ? null
        : String(locality).trim(),
    region: String(r.region ?? "").trim(),
    iso_country: String(
      r.iso_country ?? r.isoCountry ?? "",
    ).trim(),
    capabilities: {
      MMS: Boolean(cap.MMS),
      SMS: Boolean(cap.SMS),
      voice: Boolean(cap.voice),
    },
  };
}

/**
 * Build POST body so no field is `undefined` (JSON.stringify drops undefined keys;
 * the API then often saves blanks for missing keys).
 */
export function buildCreatePhoneAnswerBodyFromAiRow(
  row: SearchNumberItem,
  agentId: number,
): CreatePhoneAnswerBody {
  return {
    agent: agentId,
    phone_number: row.phone_number.trim(),
    friendly_name: (row.friendly_name ?? "").trim(),
    locality: (row.locality ?? "").trim(),
    region: (row.region ?? "").trim(),
    iso_country: (row.iso_country ?? "").trim(),
    capabilities: {
      MMS: Boolean(row.capabilities?.MMS),
      SMS: Boolean(row.capabilities?.SMS),
      voice: Boolean(row.capabilities?.voice),
    },
  };
}

export type UpdatePhoneAnswerBody = Partial<
  Pick<
    PhoneAnswer,
    | "phone_number"
    | "friendly_name"
    | "locality"
    | "region"
    | "iso_country"
    | "capabilities"
    | "when_to_answer"
    | "call_forwarding"
  >
>;

export const phoneAnswerAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getPhoneAnswers: build.query<PhoneAnswer[], void>({
      query: () => ({
        url: "/api/phone-numbers/phone/answer/",
        method: "GET",
      }),
      providesTags: ["PhoneAnswer"],
    }),
    createPhoneAnswer: build.mutation<PhoneAnswer, CreatePhoneAnswerBody>({
      query: (body) => ({
        url: "/api/phone-numbers/phone/answer/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PhoneAnswer"],
    }),
    updatePhoneAnswer: build.mutation<
      PhoneAnswer,
      { id: number; body: UpdatePhoneAnswerBody }
    >({
      query: ({ id, body }) => ({
        url: `/api/phone-numbers/phone/answer/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["PhoneAnswer"],
    }),
    deleteCallForwarding: build.mutation<void, number>({
      query: (id) => ({
        url: `/api/phone-numbers/phone/call-forwarding/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["PhoneAnswer"],
    }),
  }),
});

export const {
  useGetPhoneAnswersQuery,
  useCreatePhoneAnswerMutation,
  useUpdatePhoneAnswerMutation,
  useDeleteCallForwardingMutation,
} = phoneAnswerAPI;
