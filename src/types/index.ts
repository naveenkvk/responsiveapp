export interface Widget {
  id: string;
  type: 'portfolio-overview' | 'performance-chart' | 'asset-allocation' | 'recent-transactions' | 'news-feed';
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  data?: any;
}

export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface DashboardLayout {
  widgets: Widget[];
}