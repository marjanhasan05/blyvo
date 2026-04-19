export interface SubscriptionFeatureDetail {
  id: number;
  name: string;
  feature_identifier: string;
  description: string;
  have_limit: boolean;
  value: number;
  overage_price: string;
  price: string;
  currency: string;
  interval: string;
  marketing_features: string[];
  active: boolean;
  stripe_product_id: string | null;
  stripe_price_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionPlan {
  id: number;
  features_details: SubscriptionFeatureDetail[];
  name: string;
  description: string | null;
  interval: string;
  marketing_features: string[];
  price: string;
  currency: string;
  trial_period_days: number;
  active: boolean;
  created_at: string;
  updated_at: string;
  stripe_product_id: string | null;
  stripe_price_id: string | null;
  features: number[];
}

export type SubscriptionPlanResponse = SubscriptionPlan[];

export interface EligibleFeaturesData {
  is_eligible_for_trial: boolean;
  features: SubscriptionFeatureDetail[];
}

export interface EligibleFeaturesResponse {
  success: boolean;
  message: string;
  data: EligibleFeaturesData;
}
