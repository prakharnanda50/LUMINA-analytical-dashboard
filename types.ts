export interface KPI {
  id: string;
  label: string;
  value: string;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
  description?: string;
  history: number[]; // Array of values for sparkline
}

export interface ChartDataPoint {
  name: string;
  value1: number; // e.g., Current Year
  value2: number; // e.g., Previous Year
}

export interface MarketInsight {
  title: string;
  content: string;
  sources?: Array<{
    title: string;
    uri: string;
  }>;
}

export enum AppSection {
  OVERVIEW = 'Overview',
  REPORTS = 'Reports',
  INSIGHTS = 'Insights',
  SETTINGS = 'Settings',
}

export interface AnalysisResult {
  text: string;
  relatedLinks?: Array<{ title: string; uri: string }>;
}

export interface Anomaly {
  period: string;
  severity: 'critical' | 'warning' | 'info';
  description: string;
}
