/** API values for `when_to_answer` */
export const WHEN_TO_ANSWER_API = {
  ALWAYS: "always",
  AFTER_HOURS: "after hours",
  BUSINESS_HOURS: "business hours",
  WHEN_NO_ANSWER: "when i don't answer",
} as const;

export type WhenToAnswerApi =
  (typeof WHEN_TO_ANSWER_API)[keyof typeof WHEN_TO_ANSWER_API];

/** Row from AI search response (used for provision POST body) */
export type SearchNumberItem = {
  phone_number: string;
  friendly_name: string;
  locality: string | null;
  region: string;
  iso_country: string;
  capabilities: {
    MMS?: boolean;
    SMS?: boolean;
    voice?: boolean;
  };
};

export type CallForwardingPayload = {
  id?: number;
  current_number: string;
  type?: string;
  carrier?: string;
  when_should_forward?: string;
  forwarding_on_prefix?: string;
  forwarding_off_prefix?: string;
};

export type PhoneAnswer = {
  id: number;
  agent: number;
  phone_number: string;
  friendly_name: string;
  locality: string;
  region: string;
  iso_country: string;
  capabilities: Record<string, boolean | unknown>;
  when_to_answer: WhenToAnswerApi | string;
  call_forwarding: CallForwardingPayload | null;
};
