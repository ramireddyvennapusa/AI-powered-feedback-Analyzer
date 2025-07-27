
export interface AnalysisResult {
  sentiment: 'Positive' | 'Negative' | 'Neutral' | 'Mixed';
  summary: string;
  key_themes: string[];
  actionable_insights: string[];
}
