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
}

export interface WidgetAction {
  type: 'add' | 'update' | 'remove';
  widgetType?: Widget['type'];
  widgetId?: string;
  widgetData?: Partial<Widget>;
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