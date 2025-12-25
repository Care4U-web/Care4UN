
export type MessageRole = 'user' | 'assistant' | 'staff';
export type SeverityLevel = 'mild' | 'moderate' | 'high';
export type DurationLevel = 'short' | 'medium' | 'long';
export type JourneyStage = 'Wellness' | 'Monitoring' | 'Recovery' | 'Follow-up';

export interface User {
  studentId: string;
  name: string;
  department: string;
  points: number;
  level: number;
  badges: string[];
  lastCheckIn?: Date;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: Date;
  staffName?: string;
  status?: 'sent' | 'delivered' | 'read';
}

export interface SymptomCard {
  id: string;
  title: string;
  description: string;
  type: 'cold' | 'flu' | 'warning';
  icon: string;
  category: 'head' | 'chest' | 'general' | 'throat';
}

export interface HealthTask {
  id: string;
  title: string;
  completed: boolean;
  points: number;
}

export interface CareStep {
  id: string;
  title: string;
  instruction: string;
  icon: string;
  symptomIds: string[];
}

export interface ConsultationRecord {
  id: string;
  date: Date;
  summary: string;
  symptoms: string[];
  severity: SeverityLevel;
  syncStatus: 'synced' | 'pending';
  serverId: string;
  recommendation?: string;
}

export interface Article {
  id: string;
  title: string;
  preview: string;
  content: string;
  category: string;
  readTime: string;
  imageUrl: string;
  icon: string;
}
