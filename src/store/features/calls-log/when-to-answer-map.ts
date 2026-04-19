import { WHEN_TO_ANSWER_API, type WhenToAnswerApi } from "./calls-log.types";

/** UI card keys used in CallsLog */
export type WhenToAnswerUiKey =
  | "always"
  | "after_hours"
  | "business_hours"
  | "no_answer";

const API_TO_UI: Record<string, WhenToAnswerUiKey> = {
  [WHEN_TO_ANSWER_API.ALWAYS]: "always",
  [WHEN_TO_ANSWER_API.AFTER_HOURS]: "after_hours",
  [WHEN_TO_ANSWER_API.BUSINESS_HOURS]: "business_hours",
  [WHEN_TO_ANSWER_API.WHEN_NO_ANSWER]: "no_answer",
};

const UI_TO_API: Record<WhenToAnswerUiKey, WhenToAnswerApi> = {
  always: WHEN_TO_ANSWER_API.ALWAYS,
  after_hours: WHEN_TO_ANSWER_API.AFTER_HOURS,
  business_hours: WHEN_TO_ANSWER_API.BUSINESS_HOURS,
  no_answer: WHEN_TO_ANSWER_API.WHEN_NO_ANSWER,
};

export function whenToAnswerApiToUi(value: string): WhenToAnswerUiKey {
  return API_TO_UI[value] ?? "always";
}

export function whenToAnswerUiToApi(key: WhenToAnswerUiKey): WhenToAnswerApi {
  return UI_TO_API[key];
}
