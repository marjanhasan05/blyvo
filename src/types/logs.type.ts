export type LogLevel = "CRITICAL" | "ERROR" | "WARNING" | "INFO" | "SUCCESS";

export interface LogEntry {
  id: number;
  timestamp: string;
  log_level: LogLevel;
  event_name: string;
  message: string;
  actor_type: "user" | "system" | "anonymous";
  actor_id: string | null;
  actor_email: string | null;
  business_id: string | null;
  model_name: string | null;
  file_name: string | null;
  function_name: string | null;
  traceback: string | null;
  metadata: Record<string, unknown> | null;
  service_name: string | null;
  request_id: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}
