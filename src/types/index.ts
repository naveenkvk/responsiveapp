export interface Widget {
  id: string;
  type: 'portfolio-overview' | 'performance-chart' | 'asset-allocation' | 'recent-transactions' | 'news-feed' | 'market-trends' | 'risk-analysis' | 'cash-flow';
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
  widgetAction?: WidgetAction;
  suggestedWidget?: Widget['type'];
}

export interface WidgetAction {
  type: 'add' | 'update' | 'remove';
  widgetType?: Widget['type'];
  widgetId?: string;
  widgetData?: Partial<Widget>;
  updateType?: 'data' | 'title' | 'size';
}

export interface DashboardLayout {
  widgets: Widget[];
}

export interface DashboardContextType {
  widgets: Widget[];
  addWidget: (widget: Omit<Widget, 'id'>) => void;
  updateWidget: (id: string, updates: Partial<Widget>) => void;
  removeWidget: (id: string) => void;
}

export interface Document {
  id: string;
  title: string;
  type: 'quarterly-report' | 'tax-form' | 'fund-document' | 'legal-document' | 'investor-letter' | 'agreement';
  category: 'Fund Level' | 'Investor Specific';
  uploadDate: Date;
  size: number; // in bytes
  description?: string;
  tags: string[];
  fundName?: string;
  quarter?: string;
  year?: number;
  url?: string; // For file download/view
}

export interface DocumentSearchResult {
  document: Document;
  relevanceScore: number;
  matchedContent: string;
  summary?: string;
}