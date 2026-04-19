export type Trend = "up" | "down" | "flat" | string;

export type HomepageSummaryItemBase = {
  value_display: string;
  trend: Trend;
};

export type HomepageSummary = {
  total_calls_handled: HomepageSummaryItemBase & {
    value: number;
    change_calls: number;
  };
  answered: HomepageSummaryItemBase & {
    value: number;
    change_percentage: number;
  };
  missed: HomepageSummaryItemBase & {
    value: number;
    change_percentage: number;
  };
  resolved: HomepageSummaryItemBase & {
    value: number;
    change_percentage: number;
  };
  avg_handle_time: HomepageSummaryItemBase & {
    value_display: string;
    change_seconds: number;
  };
};

export type ActivityFeedChartPoint = {
  label: string; // e.g. "Mon"
  calls: number;
};

export type ActivityFeed = {
  period: string; // e.g. "weekly"
  total_calls: number;
  updated_at: string; // ISO
  percentage_change: number;
  trend: Trend;
  chart: ActivityFeedChartPoint[];
};

export type DashboardActionItem = {
  id: number;
  title: string;
  action_type: string;
  status: string;
  caller_phone_number: string;
  time_ago: string;
  external_call_id: string;
  summary: string;
  transcript: string;
  transcript_pdf_url: string;
  is_test: boolean;
  created_at: string;
};

export type RecentCall = {
  id: number;
  title: string;
  status: string;
  status_tone?: string;
  date: string;
  time: string;
  duration: string;
  via: string;
  external_call_id: string;
  caller_phone_number: string;
  is_test: boolean;
  created_at: string;
};

export type CallsDashboardResponse = {
  call_today: number;
  call_this_week: number;
  pending_calls: number;
  avg_handle_time: string;
  homepage_summary: HomepageSummary;
  activity_feed: ActivityFeed;
  action_items: DashboardActionItem[];
  recent_calls_total: number;
  recent_calls: RecentCall[];
};

