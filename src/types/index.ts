export interface Widget {
  id: string;
  type: 'portfolio-overview' | 'performance-chart' | 'asset-allocation' | 'recent-transactions' | 'news-feed' | 'market-trends' | 'risk-analysis' | 'cash-flow' | 'upcoming-events';
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  data?: any;
  visualizationFormat?: VisualizationFormat;
  customFormatOptions?: {
    showLegend?: boolean;
    colors?: string[];
    showLabels?: boolean;
    compactView?: boolean;
    showTrends?: boolean;
  };
}

export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  widgetAction?: WidgetAction;
  suggestedWidget?: Widget['type'];
}

export type VisualizationFormat = 'bar-chart' | 'line-chart' | 'pie-chart' | 'table' | 'cards' | 'list' | 'donut-chart' | 'area-chart';

export interface WidgetAction {
  type: 'add' | 'update' | 'remove' | 'format-change';
  widgetType?: Widget['type'];
  widgetId?: string;
  widgetData?: Partial<Widget>;
  updateType?: 'data' | 'title' | 'size' | 'format' | 'options';
  newFormat?: VisualizationFormat;
  formatOptions?: {
    showLegend?: boolean;
    colors?: string[];
    showLabels?: boolean;
    compactView?: boolean;
    showTrends?: boolean;
  };
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

export interface Contact {
  id: string;
  name: string;
  role: 'fund-manager' | 'investor-relations' | 'operations' | 'legal' | 'compliance';
  company: string;
  email: string;
  phone?: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface CommunicationMessage {
  id: string;
  senderId: string;
  recipientId: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'file' | 'system' | 'ai-response';
  isRead: boolean;
  attachments?: {
    name: string;
    size: number;
    type: string;
    url: string;
  }[];
  metadata?: {
    fundName?: string;
    documentId?: string;
    requestType?: 'form-request' | 'info-update' | 'document-request' | 'general';
  };
}

export interface Conversation {
  id: string;
  participants: Contact[];
  lastMessage: CommunicationMessage;
  unreadCount: number;
  isPinned: boolean;
  subject?: string;
  fundContext?: string;
}

export interface AITask {
  id: string;
  type: 'contact-update' | 'form-request' | 'document-retrieval' | 'appointment-scheduling';
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  description: string;
  requestedBy: string;
  createdAt: Date;
  completedAt?: Date;
  result?: any;
}

export interface Company {
  id: string;
  name: string;
  displayName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  headerStyle: {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
  };
  footerStyle: {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
  };
}

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  companyId: string;
  company: Company;
  role: 'investor' | 'admin';
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: Date;
  endDate?: Date;
  type: 'meeting' | 'capital-call' | 'distribution' | 'deadline' | 'conference' | 'webinar' | 'presentation' | 'other';
  location?: string;
  attendees?: string[];
  fundName?: string;
  isReminder?: boolean;
  reminderTime?: number; // minutes before event
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  isRecurring?: boolean;
  recurrencePattern?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  createdBy?: string;
  url?: string; // For virtual meetings
}

export interface CalendarReminder {
  id: string;
  eventId: string;
  reminderTime: number; // minutes before event
  isActive: boolean;
  notificationSent: boolean;
}

export interface Fund {
  id: string;
  name: string;
  type: 'private-equity' | 'venture-capital' | 'real-estate' | 'hedge-fund' | 'credit' | 'infrastructure';
  vintage: number; // year
  status: 'active' | 'closed' | 'liquidating' | 'fully-realized';
  strategy: string;
  geography: string;
  commitment: number; // total commitment amount
  called: number; // called capital amount
  distributed: number; // total distributions received
  currentValue: number; // current NAV
  irr: number; // internal rate of return
  multiple: number; // total value multiple
  fundSize: number; // total fund size
  managementFee: number; // annual management fee percentage
  carriedInterest: number; // carried interest percentage
  preferredReturn: number; // preferred return percentage
  generalPartner: string;
  fundManager: string;
  inception: Date;
  termEnd?: Date;
  description: string;
  keyPersonnel: {
    name: string;
    role: string;
    email?: string;
  }[];
  portfolioCompanies?: {
    name: string;
    sector: string;
    investmentDate: Date;
    investmentAmount: number;
    currentValue: number;
    status: 'active' | 'exited' | 'written-off';
  }[];
  recentActivity: {
    date: Date;
    type: 'capital-call' | 'distribution' | 'nav-update' | 'portfolio-update';
    description: string;
    amount?: number;
  }[];
  documents: {
    type: 'quarterly-report' | 'annual-report' | 'capital-call-notice' | 'distribution-notice' | 'k1-tax-form';
    name: string;
    date: Date;
    url?: string;
  }[];
}