export interface AnalysisResponse {
  overallAssessment: {
    verdict: 'high_suspicion' | 'medium_caution' | 'low_risk' | 'unreadable_or_incomplete';
    headline: string;
    summary: string;
  };
  warningSigns: Array<{
    title: string;
    evidence: string;
    significance: string;
  }>;
  whyTheseSignsMatter: string;
  recommendedSafeActions: Array<{
    action: string;
    details: string;
    isPrimary?: boolean;
  }>;
  whatCouldNotBeVerified: string[];
  indiaSpecificSafetyNotes?: string[];
  modelUsed: string;
  analyzedAt: string;
}

export interface ModelInfo {
  modelName: string;
  displayName: string;
  modelFamily: string;
  multimodal: boolean;
  hasApiKey: boolean;
  disclaimer: string;
}

export interface SampleScamScenario {
  id: string;
  title: string;
  category: 'Electricity' | 'Postal / Delivery' | 'UPI / Payment' | 'Banking / KYC' | 'Job / Task';
  tag: string;
  description: string;
  contextText: string;
  imagePromptData: {
    sender: string;
    appName: string;
    timestamp: string;
    bodyText: string;
    highlightUrl?: string;
    accentColor: string;
  };
}
