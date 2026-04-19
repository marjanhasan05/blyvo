import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PhoneCall, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { SearchNumberItem } from "@/store/features/calls-log/calls-log.types";
import { WHEN_TO_ANSWER_API } from "@/store/features/calls-log/calls-log.types";
import {
  buildCreatePhoneAnswerBodyFromAiRow,
  normalizeAiPhoneSearchRow,
  useCreatePhoneAnswerMutation,
  useGetPhoneAnswersQuery,
  useUpdatePhoneAnswerMutation,
} from "@/store/features/calls-log/phone-answer.api";
import { useAppSelector } from "@/store/hook";
import { selectToken } from "@/store/features/auth/auth.slice";
import { useGetAgentQuery } from "@/store/features/agent/agent.api";

export type CallForwardingSetupVariant = "full_setup" | "forwarding_only";

export type ForwardingOnlyIntent = "configure" | "no_answer";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  variant: CallForwardingSetupVariant;
  /** Used when variant is forwarding_only */
  forwardingOnlyIntent?: ForwardingOnlyIntent;
};

/** AI search: only area code is collected in the UI; rest are defaults */
const AI_SEARCH_DEFAULTS = {
  country_code: "CA",
  number_type: "local",
  contains: "string",
  limit: 10,
} as const;

/** AI service (not in Redux) — only used by this modal */
const AI_PHONE_SEARCH_URL =
  "https://ai.useblyvo.com/api/v1/agent/phone-numbers/search";

type AiPhoneSearchRequestBody = {
  country_code: string;
  number_type: string;
  area_code: number;
  contains: string;
  limit: number;
};

async function postAiPhoneNumberSearch(
  body: AiPhoneSearchRequestBody,
  accessToken: string | null,
): Promise<unknown[]> {
  const headers: Record<string, string> = {
    accept: "application/json",
    "Content-Type": "application/json",
  };
  if (accessToken) {
    headers.authorization = `Bearer ${accessToken}`;
  }

  const res = await fetch(AI_PHONE_SEARCH_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Search failed (${res.status})`);
  }

  const raw: unknown = await res.json();
  return Array.isArray(raw) ? raw : [];
}

export default function CallForwardingSetupModal({
  isOpen,
  setIsOpen,
  variant,
  forwardingOnlyIntent = "configure",
}: Props) {
  const token = useAppSelector(selectToken);
  const { data: agents } = useGetAgentQuery();
  const agentId = agents?.id;
  const { data: phoneAnswers, refetch: refetchAnswers } =
    useGetPhoneAnswersQuery(undefined, { skip: !isOpen });
  const activeAnswer = phoneAnswers?.[0];

  const [createPhoneAnswer, { isLoading: isCreating }] =
    useCreatePhoneAnswerMutation();
  const [updatePhoneAnswer, { isLoading: isUpdating }] =
    useUpdatePhoneAnswerMutation();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [areaCode, setAreaCode] = useState("650");
  const [searchResults, setSearchResults] = useState<SearchNumberItem[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<SearchNumberItem | null>(
    null,
  );
  const [provisionedId, setProvisionedId] = useState<number | null>(null);
  const [forwardingNumber, setForwardingNumber] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setAreaCode("650");
    setSearchResults([]);
    setSelectedNumber(null);
    setProvisionedId(null);
    setForwardingNumber("");
  }, [isOpen]);

  const handleSearch = async (): Promise<boolean> => {
    const digits = areaCode.replace(/\D/g, "");
    if (digits.length !== 3) {
      toast.error("Enter a 3-digit area code");
      return false;
    }
    const parsedArea = Number.parseInt(digits, 10);
    setSearchLoading(true);
    try {
      const list = await postAiPhoneNumberSearch(
        {
          country_code: AI_SEARCH_DEFAULTS.country_code,
          number_type: AI_SEARCH_DEFAULTS.number_type,
          area_code: parsedArea,
          contains: AI_SEARCH_DEFAULTS.contains,
          limit: AI_SEARCH_DEFAULTS.limit,
        },
        token,
      );
      const normalized = list.map(normalizeAiPhoneSearchRow);
      setSearchResults(normalized);
      if (normalized.length === 0) {
        toast.message("No numbers found — try another area code.");
      }
      return true;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Search failed");
      return false;
    } finally {
      setSearchLoading(false);
    }
  };

  const handleProvision = async () => {
    if (!selectedNumber?.phone_number) {
      toast.error("Select a number");
      return;
    }
    if (agentId == null) {
      toast.error("No agent found — create an agent first.");
      return;
    }

    // selectedNumber comes directly from searchResults, so this already has AI fields.
    const createBody = buildCreatePhoneAnswerBodyFromAiRow(
      selectedNumber,
      agentId,
    );

    try {
      const created = await createPhoneAnswer(createBody).unwrap();

      // Some backend create flows persist only core fields; sync metadata explicitly.
      await updatePhoneAnswer({
        id: created.id,
        body: {
          friendly_name: createBody.friendly_name,
          locality: createBody.locality ?? "",
          region: createBody.region,
          iso_country: createBody.iso_country,
          capabilities: createBody.capabilities,
        },
      }).unwrap();

      setProvisionedId(created.id);
      setStep(3);
      toast.success("Number provisioned");
      refetchAnswers();
    } catch {
      toast.error("Could not provision number");
    }
  };

  const handleSaveForwarding = async () => {
    const trimmed = forwardingNumber.trim();
    if (!trimmed) {
      toast.error("Enter your call forwarding number");
      return;
    }
    const id = variant === "forwarding_only" ? activeAnswer?.id : provisionedId;
    if (id == null) {
      toast.error("Missing phone configuration");
      return;
    }
    try {
      const setNoAnswerPref =
        variant === "full_setup" ||
        (variant === "forwarding_only" && forwardingOnlyIntent === "no_answer");

      await updatePhoneAnswer({
        id,
        body: {
          ...(setNoAnswerPref
            ? { when_to_answer: WHEN_TO_ANSWER_API.WHEN_NO_ANSWER }
            : {}),
          call_forwarding: {
            current_number: trimmed,
            type: "mobile phone",
            carrier: "at&t",
            when_should_forward: "when i don't answer",
          },
        },
      }).unwrap();
      toast.success("Call forwarding saved");
      setIsOpen(false);
      refetchAnswers();
    } catch {
      toast.error("Could not save forwarding");
    }
  };

  const isForwardingOnly = variant === "forwarding_only";
  const showFullFlow = variant === "full_setup";
  const showSearchStep = showFullFlow && step === 1;
  const showPickStep = showFullFlow && step === 2;
  const showForwardingStep = isForwardingOnly || (showFullFlow && step === 3);

  const isBusy = isCreating || isUpdating;
  const isCompleteDisabled =
    isBusy ||
    (isForwardingOnly && !activeAnswer) ||
    (showFullFlow && !provisionedId);

  let modalTitle = "Choose a number";
  if (isForwardingOnly || (showFullFlow && step === 3)) {
    modalTitle = "Set Up Call Forwarding";
  } else if (step === 1) {
    modalTitle = "Find your SOW number";
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full max-w-md bg-white rounded-2xl shadow-xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 shadow">
              <PhoneCall size={24} />
            </div>
            <h1 className="text-lg font-semibold text-gray-900">
              {modalTitle}
            </h1>
          </div>

          {/* —— Full setup: search —— */}
          {showSearchStep && (
            <>
              <p className="text-sm text-gray-500 mb-3">
                Enter a 3-digit area code, then search for available numbers.
              </p>
              <label className="text-xs text-gray-500 block mb-1">
                Area code
              </label>
              <input
                type="text"
                inputMode="numeric"
                className="w-full border rounded-xl px-4 py-2 mb-4"
                value={areaCode}
                onChange={(e) =>
                  setAreaCode(e.target.value.replace(/\D/g, "").slice(0, 3))
                }
                placeholder="e.g. 650"
                maxLength={3}
              />
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="w-1/2 rounded-xl"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="w-1/2 bg-black text-white rounded-xl"
                  onClick={async () => {
                    const ok = await handleSearch();
                    if (ok) setStep(2);
                  }}
                  disabled={searchLoading}
                >
                  {searchLoading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    "Search"
                  )}
                </Button>
              </div>
            </>
          )}

          {/* —— Full setup: pick number —— */}
          {showPickStep && (
            <>
              <p className="text-sm text-gray-600 mb-3">
                Select a number, then provision it for your agent.
              </p>
              <div className="space-y-2 mb-4 max-h-56 overflow-y-auto">
                {searchResults.map((n) => (
                  <button
                    type="button"
                    key={n.phone_number}
                    onClick={() => setSelectedNumber(n)}
                    className={`w-full text-left border rounded-xl px-3 py-2 text-sm ${
                      selectedNumber?.phone_number === n.phone_number
                        ? "border-black bg-gray-50"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    <div className="font-medium">
                      {n.friendly_name || n.phone_number}
                    </div>
                    <div className="text-xs text-gray-400">
                      {n.phone_number}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="w-1/2 rounded-xl"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button
                  className="w-1/2 bg-black text-white rounded-xl"
                  onClick={handleProvision}
                  disabled={isBusy || !selectedNumber}
                >
                  {isCreating ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    "Provision number"
                  )}
                </Button>
              </div>
            </>
          )}

          {/* —— Forwarding: full step 3 OR forwarding_only —— */}
          {showForwardingStep && (
            <>
              {isForwardingOnly && !activeAnswer && (
                <p className="text-sm text-red-600 mb-4">
                  No SOW number yet — use Setup on the Calls page first.
                </p>
              )}
              <p className="text-sm text-gray-500 mb-4">
                Enter the number you forward calls from.
              </p>
              <label className="text-xs text-gray-500 block mb-1">
                Forwarding number
              </label>
              <input
                type="text"
                className="w-full border rounded-xl px-4 py-2 mb-6"
                placeholder="+1 ..."
                value={forwardingNumber}
                onChange={(e) => setForwardingNumber(e.target.value)}
              />

              <div className="flex gap-3">
                {showFullFlow && (
                  <Button
                    variant="outline"
                    className="w-1/2 rounded-xl"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </Button>
                )}
                {isForwardingOnly && (
                  <Button
                    variant="outline"
                    className="w-1/2 rounded-xl"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  className={`rounded-xl bg-black text-white ${showFullFlow ? "w-1/2" : "w-1/2 flex-1"}`}
                  onClick={handleSaveForwarding}
                  disabled={isCompleteDisabled}
                >
                  {isUpdating ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    "Complete setup"
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
