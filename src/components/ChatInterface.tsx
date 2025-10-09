import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Plus, Edit, Trash2 } from 'lucide-react';
import { ChatMessage, Widget, WidgetAction, VisualizationFormat } from '../types';
import { useDashboard } from '../context/DashboardContext';

interface ChatInterfaceProps {
  activeTab?: 'dashboard' | 'documents' | 'communication';
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ activeTab = 'dashboard' }) => {
  const { widgets, addWidget, updateWidget, removeWidget } = useDashboard();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [lastSuggestedWidget, setLastSuggestedWidget] = useState<Widget['type'] | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize messages when component mounts or activeTab changes
  useEffect(() => {
    let initialMessage = '';
    
    if (activeTab === 'documents') {
      initialMessage = 'Hello! I\'m your document assistant. I can help you with document management and analysis. I can:\n\n• Search documents: "Find Q4 2023 reports" or "Show me tax forms"\n• Summarize content: "Summarize the latest investor letter"\n• Answer questions: "What are my capital call obligations?"\n• Document insights: "Show me all healthcare fund documents"\n\nWhat documents would you like to explore?';
    } else if (activeTab === 'communication') {
      initialMessage = 'Hello! I\'m your communication assistant. I can help you with messaging, task automation, and staying connected with your fund managers. I can:\n\n• Schedule meetings: "Book a call with Sarah Chen"\n• Request forms: "I need updated tax forms"\n• Update information: "Change my contact details"\n• Answer questions: "When is my next capital call?"\n• Send messages: "Message the IR team about distributions"\n\nHow can I assist you today?';
    } else {
      initialMessage = 'Hello! I\'m your investment assistant. I can help you with portfolio insights, performance analysis, and manage your dashboard widgets. I can:\n\n• Add widgets: "show me market trends" or "add risk analysis"\n• Edit widgets: "change performance chart to 3 months"\n• Change formats: "convert performance chart to line chart" or "show asset allocation as table"\n• Remove widgets: "remove the cash flow widget"\n• Answer investment questions about your portfolio\n\nWhat would you like to explore today?';
    }

    setMessages([
      {
        id: '1',
        message: initialMessage,
        sender: 'assistant',
        timestamp: new Date(),
      }
    ]);
  }, [activeTab]);

  const createWidgetData = (type: Widget['type']): Partial<Widget> => {
    const widgetTemplates: Record<Widget['type'], Partial<Widget>> = {
      'portfolio-overview': {
        title: 'Portfolio Overview',
        w: 6,
        h: 4,
        visualizationFormat: 'cards' as VisualizationFormat,
        data: {
          totalValue: 2500000,
          totalReturn: 15.8,
          monthlyChange: 2.3
        }
      },
      'performance-chart': {
        title: 'Performance Chart',
        w: 6,
        h: 4,
        visualizationFormat: 'bar-chart' as VisualizationFormat,
        data: {
          chartData: [
            { month: 'Jan', value: 2200000 },
            { month: 'Feb', value: 2300000 },
            { month: 'Mar', value: 2250000 },
            { month: 'Apr', value: 2400000 },
            { month: 'May', value: 2500000 },
          ]
        }
      },
      'asset-allocation': {
        title: 'Asset Allocation',
        w: 4,
        h: 3,
        visualizationFormat: 'pie-chart' as VisualizationFormat,
        data: {
          allocations: [
            { category: 'Private Equity', percentage: 40, value: 1000000 },
            { category: 'Real Estate', percentage: 30, value: 750000 },
            { category: 'Venture Capital', percentage: 20, value: 500000 },
            { category: 'Hedge Funds', percentage: 10, value: 250000 },
          ]
        }
      },
      'recent-transactions': {
        title: 'Recent Transactions',
        w: 8,
        h: 3,
        visualizationFormat: 'list' as VisualizationFormat,
        data: {
          transactions: [
            { date: '2024-01-15', type: 'Capital Call', fund: 'Tech Growth Fund III', amount: -50000 },
            { date: '2024-01-10', type: 'Distribution', fund: 'Real Estate Fund II', amount: 75000 },
            { date: '2024-01-05', type: 'Capital Call', fund: 'Healthcare Fund I', amount: -25000 },
          ]
        }
      },
      'news-feed': {
        title: 'Market News',
        w: 6,
        h: 4,
        visualizationFormat: 'list' as VisualizationFormat,
        data: {
          news: [
            { title: 'Private Equity Market Outlook', source: 'Financial Times', date: '2024-01-16' },
            { title: 'Real Estate Investment Trends', source: 'WSJ', date: '2024-01-15' },
            { title: 'VC Funding Reaches New High', source: 'TechCrunch', date: '2024-01-14' },
          ]
        }
      },
      'market-trends': {
        title: 'Market Trends',
        w: 6,
        h: 4,
        visualizationFormat: 'bar-chart' as VisualizationFormat,
        data: {
          trends: [
            { sector: 'Technology', trend: 'up', percentage: 12.5 },
            { sector: 'Healthcare', trend: 'up', percentage: 8.3 },
            { sector: 'Real Estate', trend: 'stable', percentage: 2.1 },
            { sector: 'Energy', trend: 'down', percentage: -3.2 },
          ]
        }
      },
      'risk-analysis': {
        title: 'Risk Analysis',
        w: 4,
        h: 3,
        visualizationFormat: 'table' as VisualizationFormat,
        data: {
          riskMetrics: [
            { metric: 'Portfolio Beta', value: 0.85, status: 'low' },
            { metric: 'Sharpe Ratio', value: 1.42, status: 'good' },
            { metric: 'Max Drawdown', value: -8.3, status: 'moderate' },
            { metric: 'Volatility', value: 12.1, status: 'low' },
          ]
        }
      },
      'cash-flow': {
        title: 'Cash Flow',
        w: 6,
        h: 3,
        visualizationFormat: 'bar-chart' as VisualizationFormat,
        data: {
          cashFlow: [
            { month: 'Jan', inflow: 75000, outflow: -50000, net: 25000 },
            { month: 'Feb', inflow: 0, outflow: -30000, net: -30000 },
            { month: 'Mar', inflow: 100000, outflow: -25000, net: 75000 },
            { month: 'Apr', inflow: 50000, outflow: -40000, net: 10000 },
          ]
        }
      }
    };

    return widgetTemplates[type] || widgetTemplates['portfolio-overview'];
  };

  const detectWidgetIntent = (message: string): { type: Widget['type']; confidence: number } | null => {
    const msg = message.toLowerCase();
    const patterns = {
      'portfolio-overview': [
        'portfolio', 'overview', 'total value', 'total return', 'summary',
        'dashboard overview', 'investment summary', 'portfolio summary'
      ],
      'performance-chart': [
        'performance', 'chart', 'graph', 'growth', 'trend chart', 'performance graph',
        'historical performance', 'time series', 'portfolio performance'
      ],
      'asset-allocation': [
        'allocation', 'asset', 'diversification', 'breakdown', 'distribution',
        'asset breakdown', 'investment allocation', 'portfolio allocation'
      ],
      'recent-transactions': [
        'transaction', 'capital call', 'distribution', 'recent activity',
        'fund activity', 'investment activity', 'cash movements'
      ],
      'market-trends': [
        'market', 'trends', 'sector', 'industry', 'market performance',
        'sector trends', 'industry performance', 'market analysis'
      ],
      'risk-analysis': [
        'risk', 'volatility', 'beta', 'sharpe', 'analysis', 'risk metrics',
        'portfolio risk', 'risk assessment', 'risk profile'
      ],
      'cash-flow': [
        'cash flow', 'cash', 'inflow', 'outflow', 'liquidity',
        'cash position', 'cash movements', 'fund flows'
      ],
      'news-feed': [
        'news', 'updates', 'market news', 'financial news', 'headlines',
        'market updates', 'investment news', 'latest news'
      ]
    };

    let bestMatch: { type: Widget['type']; score: number } | null = null;

    for (const [widgetType, keywords] of Object.entries(patterns)) {
      let score = 0;
      for (const keyword of keywords) {
        if (msg.includes(keyword)) {
          score += keyword.split(' ').length; // Multi-word matches get higher scores
        }
      }
      
      if (score > 0 && (!bestMatch || score > bestMatch.score)) {
        bestMatch = { type: widgetType as Widget['type'], score };
      }
    }

    return bestMatch ? { type: bestMatch.type, confidence: Math.min(bestMatch.score * 0.2, 1) } : null;
  };

  const detectAction = (message: string): 'add' | 'update' | 'remove' | 'info' | 'format-change' => {
    const msg = message.toLowerCase();
    
    // Check for format change patterns first
    const formatChangePatterns = [
      'change to', 'convert to', 'make it a', 'switch to', 'turn into', 'display as',
      'show as a', 'visualize as', 'format as', 'render as'
    ];
    
    const chartTypePatterns = [
      'bar chart', 'line chart', 'pie chart', 'table', 'list', 'cards',
      'donut chart', 'area chart', 'graph', 'chart'
    ];
    
    const hasFormatChange = formatChangePatterns.some(pattern => msg.includes(pattern));
    const hasChartType = chartTypePatterns.some(pattern => msg.includes(pattern));
    
    if (hasFormatChange && hasChartType) {
      return 'format-change';
    }
    
    // Action keywords with priorities
    const actionPatterns = {
      add: ['add', 'create', 'show me', 'display', 'i want', 'i need', 'get me', 'bring up'],
      update: ['change', 'update', 'modify', 'edit', 'adjust', 'switch', 'make it', 'set to'],
      remove: ['remove', 'delete', 'hide', 'get rid of', 'take away'],
      info: ['what', 'how', 'tell me', 'explain', 'describe', 'status']
    };

    let bestAction: { action: string; score: number } = { action: 'info', score: 0 };

    for (const [action, patterns] of Object.entries(actionPatterns)) {
      for (const pattern of patterns) {
        if (msg.includes(pattern)) {
          const score = pattern.split(' ').length;
          if (score > bestAction.score) {
            bestAction = { action, score };
          }
        }
      }
    }

    return bestAction.action as 'add' | 'update' | 'remove' | 'info' | 'format-change';
  };

  const detectVisualizationFormat = (message: string): VisualizationFormat | null => {
    const msg = message.toLowerCase();
    
    const formatPatterns: Record<VisualizationFormat, string[]> = {
      'bar-chart': ['bar chart', 'bar graph', 'bars', 'column chart', 'column graph'],
      'line-chart': ['line chart', 'line graph', 'trend line', 'time series'],
      'pie-chart': ['pie chart', 'pie graph', 'pie'],
      'donut-chart': ['donut chart', 'donut graph', 'doughnut chart'],
      'area-chart': ['area chart', 'area graph', 'filled line'],
      'table': ['table', 'grid', 'tabular', 'rows and columns'],
      'cards': ['cards', 'card view', 'card layout'],
      'list': ['list', 'list view', 'bullet points']
    };
    
    for (const [format, patterns] of Object.entries(formatPatterns)) {
      if (patterns.some(pattern => msg.includes(pattern))) {
        return format as VisualizationFormat;
      }
    }
    
    return null;
  };

  const findTargetWidget = (message: string): Widget | null => {
    const msg = message.toLowerCase();
    return widgets.find(widget => {
      const titleLower = widget.title.toLowerCase();
      return msg.includes(titleLower) || 
             msg.includes(widget.type.replace('-', ' ')) ||
             (widget.type === 'performance-chart' && msg.includes('performance')) ||
             (widget.type === 'asset-allocation' && msg.includes('allocation')) ||
             (widget.type === 'recent-transactions' && msg.includes('transaction')) ||
             (widget.type === 'market-trends' && msg.includes('market')) ||
             (widget.type === 'risk-analysis' && msg.includes('risk')) ||
             (widget.type === 'cash-flow' && msg.includes('cash')) ||
             (widget.type === 'news-feed' && msg.includes('news'));
    }) || null;
  };

  const detectFollowUpResponse = (message: string): 'yes' | 'no' | 'neutral' => {
    const msg = message.toLowerCase().trim();
    
    const yesPatterns = ['yes', 'yeah', 'yep', 'sure', 'ok', 'okay', 'please', 'do it', 'go ahead', 'add it', 'that would be great', 'sounds good', 'perfect'];
    const noPatterns = ['no', 'nah', 'nope', 'not now', 'maybe later', 'not really', 'no thanks', 'cancel'];
    
    if (yesPatterns.some(pattern => msg === pattern || msg.includes(pattern))) {
      return 'yes';
    }
    
    if (noPatterns.some(pattern => msg === pattern || msg.includes(pattern))) {
      return 'no';
    }
    
    return 'neutral';
  };

  const simulateAssistantResponse = (userMessage: string): { message: string; widgetAction?: WidgetAction; suggestedWidget?: Widget['type'] } => {
    const message = userMessage.toLowerCase();
    const followUp = detectFollowUpResponse(userMessage);

    // Handle document-specific queries when in document vault
    if (activeTab === 'documents') {
      if (message.includes('find') || message.includes('search') || message.includes('show me')) {
        if (message.includes('q4') || message.includes('quarter')) {
          return {
            message: 'I found several Q4 documents in your vault:\n\n• Tech Growth Fund III - Q4 2023 Quarterly Report (2.8MB)\n• Real Estate Fund II - Q4 Performance Summary (1.2MB)\n\nWould you like me to summarize any of these documents or search for specific information within them?'
          };
        }
        if (message.includes('tax') || message.includes('k-1')) {
          return {
            message: 'Here are your tax-related documents:\n\n• K-1 Tax Form 2023 - Healthcare Fund I (450KB)\n• K-1 Tax Form 2023 - Tech Growth Fund III (380KB)\n• Annual Tax Summary 2023 (920KB)\n\nThese documents contain your investment income and deduction information for tax filing purposes.'
          };
        }
        if (message.includes('healthcare') || message.includes('health')) {
          return {
            message: 'Found 3 documents related to Healthcare Fund I:\n\n• K-1 Tax Form 2023 - Healthcare Fund I\n• Healthcare Fund I - Investment Agreement\n• Healthcare Fund I - Q3 2023 Update\n\nWould you like me to provide a summary of the fund\'s performance or specific document details?'
          };
        }
      }

      if (message.includes('summarize') || message.includes('summary')) {
        return {
          message: '📄 **AI Document Summary**\n\nBased on the latest investor letter (Annual Investor Letter 2023):\n\n**Key Highlights:**\n• Portfolio returned 15.8% for the year, outperforming benchmarks\n• Successful exits from 3 portfolio companies generated $45M in distributions\n• New investments in 2 high-growth technology companies\n• Strong pipeline for 2024 with $120M in committed capital\n\n**Risk Factors:** Market volatility in tech sector, potential interest rate impacts\n\nWould you like me to dive deeper into any specific section?'
        };
      }

      if (message.includes('capital call') || message.includes('obligations')) {
        return {
          message: '💰 **Capital Call Summary**\n\nCurrent and upcoming capital call obligations:\n\n**Active Calls:**\n• Real Estate Fund II: $50,000 due Feb 15, 2024\n• Venture Fund IV: $25,000 due Mar 1, 2024\n\n**Recent History:**\n• Healthcare Fund I: $25,000 called Jan 2024 (completed)\n• Tech Growth Fund III: $50,000 called Dec 2023 (completed)\n\n**Total Unfunded Commitments:** $340,000 across all active funds'
        };
      }

      return {
        message: 'I can help you search, analyze, and summarize your investment documents. Try asking me to:\n\n• "Find all Q4 2023 reports"\n• "Show me tax documents"\n• "Summarize the latest investor letter"\n• "What are my capital call obligations?"\n\nWhat specific documents or information are you looking for?'
      };
    }

    // Handle communication-specific queries
    if (activeTab === 'communication') {
      if (message.includes('schedule') || message.includes('book') || message.includes('meeting') || message.includes('call')) {
        const nameMatch = message.match(/with ([a-z\s]+)/i);
        const contactName = nameMatch ? nameMatch[1].trim() : 'your fund manager';
        return {
          message: `📅 **Meeting Scheduled**\n\nI've initiated a meeting request ${nameMatch ? `with ${contactName}` : 'with your fund manager'}. Here's what I'll do:\n\n✅ Check their availability for next week\n✅ Send calendar invites\n✅ Prepare agenda with recent portfolio updates\n✅ Set up video conference link\n\nYou'll receive a confirmation email within 15 minutes with the meeting details. Is there a specific topic you'd like to discuss?`
        };
      }

      if (message.includes('request') && (message.includes('form') || message.includes('document'))) {
        return {
          message: '📋 **Form Request Processed**\n\nI\'ve automatically requested the following documents for you:\n\n• Updated contact information forms\n• Banking detail update forms\n• Tax information worksheets\n• Beneficiary designation forms\n\nThese will be sent to your registered email address within 2 business hours. The forms are pre-filled with your current information where possible.\n\n📧 **Email notification sent:** Form request confirmation'
        };
      }

      if (message.includes('update') && (message.includes('contact') || message.includes('information') || message.includes('details'))) {
        return {
          message: '✏️ **Information Update Started**\n\nI\'ve initiated the contact information update process. Here\'s what happens next:\n\n1. **Secure verification link** sent to your email\n2. **Update form** with current details pre-populated\n3. **Compliance review** (24-48 hours)\n4. **Confirmation** once changes are active\n\n🔒 **Security Note:** For your protection, banking and tax information updates require additional verification steps.\n\nCheck your email for the secure update link!'
        };
      }

      if (message.includes('message') || message.includes('send') || message.includes('contact')) {
        if (message.includes('ir') || message.includes('investor relations')) {
          return {
            message: '💬 **Message Sent to Investor Relations**\n\n**To:** Healthcare Fund I - Investor Relations Team\n**From:** John Doe\n**Subject:** General Inquiry\n\n✅ Message delivered successfully\n✅ Read receipt requested\n✅ Expected response: 1-2 business days\n\n📱 **Follow-up options:**\n• Schedule a call if you need immediate assistance\n• Check Communication Hub for response tracking\n\nIs there anything specific you\'d like me to mention in the message?'
          };
        }
        return {
          message: '💬 **Message Prepared**\n\nI\'m ready to send your message. Please specify:\n\n👥 **Who should I contact?**\n• Sarah Chen (Fund Manager - Tech Growth III)\n• Michael Rodriguez (IR - Healthcare Fund)\n• Emma Thompson (Operations - Real Estate Fund)\n• David Park (Compliance - Venture Fund)\n\n📝 **What would you like to say?**\nI can help draft professional messages for various purposes like performance inquiries, document requests, or meeting scheduling.'
        };
      }

      if (message.includes('capital call') || message.includes('next call') || message.includes('funding')) {
        return {
          message: '💰 **Upcoming Capital Calls**\n\n**Next 30 Days:**\n• Real Estate Fund II: $50,000 due Feb 15, 2024\n• Venture Fund IV: $25,000 due Mar 1, 2024\n\n**Recent Completed:**\n• Healthcare Fund I: $25,000 (Jan 2024) ✅\n• Tech Growth Fund III: $50,000 (Dec 2023) ✅\n\n📊 **Summary:**\n• Total upcoming: $75,000\n• Remaining commitments: $340,000\n• Average quarterly calls: $62,500\n\n🔔 **Automated reminders** are set for 7 days and 2 days before each due date.'
        };
      }

      return {
        message: 'I can help you with communication tasks and staying connected with your fund managers. Try asking me to:\n\n• "Schedule a meeting with Sarah Chen"\n• "Request updated tax forms"\n• "Update my contact information"\n• "Message the IR team"\n• "When is my next capital call?"\n\nWhat would you like me to help you with?'
      };
    }
    
    // Handle follow-up responses first
    if (followUp === 'yes' && lastSuggestedWidget) {
      // Check if widget already exists
      const exists = widgets.some(w => w.type === lastSuggestedWidget);
      if (exists) {
        setLastSuggestedWidget(null);
        return {
          message: `The ${lastSuggestedWidget.replace('-', ' ')} widget is already on your dashboard. Is there anything else I can help you with?`
        };
      }

      const widgetNames = {
        'portfolio-overview': 'Portfolio Overview',
        'performance-chart': 'Performance Chart', 
        'asset-allocation': 'Asset Allocation',
        'recent-transactions': 'Recent Transactions',
        'market-trends': 'Market Trends',
        'risk-analysis': 'Risk Analysis',
        'cash-flow': 'Cash Flow',
        'news-feed': 'Market News'
      };

      const widgetName = widgetNames[lastSuggestedWidget];
      setLastSuggestedWidget(null);
      
      return {
        message: `Perfect! I've added the ${widgetName} widget to your dashboard. You can now see detailed ${lastSuggestedWidget.replace('-', ' ')} information and customize its position by dragging it around.`,
        widgetAction: {
          type: 'add',
          widgetType: lastSuggestedWidget,
          widgetData: createWidgetData(lastSuggestedWidget)
        }
      };
    }

    if (followUp === 'no' && lastSuggestedWidget) {
      setLastSuggestedWidget(null);
      return {
        message: 'No problem! Is there anything else I can help you with regarding your portfolio or dashboard?'
      };
    }

    const action = detectAction(message);
    const widgetIntent = detectWidgetIntent(message);
    const targetWidget = findTargetWidget(message);
    const newFormat = detectVisualizationFormat(message);

    // Handle widget format changes
    if (action === 'format-change' && targetWidget && newFormat) {
      const formatNames: Record<VisualizationFormat, string> = {
        'bar-chart': 'bar chart',
        'line-chart': 'line chart',
        'pie-chart': 'pie chart',
        'donut-chart': 'donut chart',
        'area-chart': 'area chart',
        'table': 'table',
        'cards': 'card layout',
        'list': 'list view'
      };
      
      // Check if the format change is compatible with the widget type
      const compatibleFormats: Record<Widget['type'], VisualizationFormat[]> = {
        'performance-chart': ['bar-chart', 'line-chart', 'area-chart', 'table'],
        'asset-allocation': ['pie-chart', 'donut-chart', 'bar-chart', 'table', 'cards'],
        'recent-transactions': ['table', 'list', 'cards'],
        'market-trends': ['bar-chart', 'line-chart', 'table', 'cards'],
        'risk-analysis': ['table', 'cards', 'bar-chart'],
        'cash-flow': ['bar-chart', 'line-chart', 'area-chart', 'table'],
        'news-feed': ['list', 'cards', 'table'],
        'portfolio-overview': ['cards', 'table']
      };
      
      const isCompatible = compatibleFormats[targetWidget.type]?.includes(newFormat);
      
      if (!isCompatible) {
        const validFormats = compatibleFormats[targetWidget.type] || [];
        const validFormatNames = validFormats.map(f => formatNames[f]).join(', ');
        return {
          message: `I can't display ${targetWidget.title} as a ${formatNames[newFormat]}. However, I can show it as: ${validFormatNames}. Which format would you prefer?`
        };
      }
      
      return {
        message: `Perfect! I've changed the ${targetWidget.title} to display as a ${formatNames[newFormat]}. The data is now visualized in a more suitable format for your needs.`,
        widgetAction: {
          type: 'format-change',
          widgetId: targetWidget.id,
          newFormat: newFormat,
          updateType: 'format'
        }
      };
    }
    
    // Handle format change requests without specific widget target
    if (action === 'format-change' && newFormat && widgetIntent) {
      const widgetOfType = widgets.find(w => w.type === widgetIntent.type);
      if (widgetOfType) {
        const formatNames: Record<VisualizationFormat, string> = {
          'bar-chart': 'bar chart',
          'line-chart': 'line chart', 
          'pie-chart': 'pie chart',
          'donut-chart': 'donut chart',
          'area-chart': 'area chart',
          'table': 'table',
          'cards': 'card layout',
          'list': 'list view'
        };
        
        return {
          message: `I've changed your ${widgetOfType.title} to display as a ${formatNames[newFormat]}. The visualization now better represents your data in the requested format.`,
          widgetAction: {
            type: 'format-change',
            widgetId: widgetOfType.id,
            newFormat: newFormat,
            updateType: 'format'
          }
        };
      }
    }

    // Handle widget updates/edits
    if (action === 'update' && targetWidget) {
      // Performance chart editing
      if (targetWidget.type === 'performance-chart') {
        const monthMatch = message.match(/(\d+)[- ]?month/);
        if (monthMatch) {
          const months = parseInt(monthMatch[1]);
          const newData = {
            chartData: Array.from({ length: months }, (_, i) => ({
              month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i] || `M${i+1}`,
              value: 2200000 + (i * 50000) + (Math.random() * 100000)
            }))
          };
          
          return {
            message: `I've updated the Performance Chart to show ${months}-month trend data. The chart now displays ${months} months of portfolio performance history.`,
            widgetAction: {
              type: 'update',
              widgetId: targetWidget.id,
              widgetData: { data: newData },
              updateType: 'data'
            }
          };
        }
      }

      // Risk analysis updates
      if (targetWidget.type === 'risk-analysis' && (message.includes('conservative') || message.includes('aggressive'))) {
        const isConservative = message.includes('conservative');
        const newData = {
          riskMetrics: [
            { metric: 'Portfolio Beta', value: isConservative ? 0.65 : 1.25, status: isConservative ? 'low' : 'high' },
            { metric: 'Sharpe Ratio', value: isConservative ? 1.8 : 0.9, status: isConservative ? 'good' : 'moderate' },
            { metric: 'Max Drawdown', value: isConservative ? -4.2 : -15.8, status: isConservative ? 'low' : 'high' },
            { metric: 'Volatility', value: isConservative ? 8.1 : 18.7, status: isConservative ? 'low' : 'high' },
          ]
        };
        
        return {
          message: `I've updated the Risk Analysis to reflect a ${isConservative ? 'conservative' : 'aggressive'} risk profile. The metrics now show ${isConservative ? 'lower risk parameters' : 'higher risk tolerance'}.`,
          widgetAction: {
            type: 'update',
            widgetId: targetWidget.id,
            widgetData: { data: newData },
            updateType: 'data'
          }
        };
      }

      return {
        message: `I understand you want to update the ${targetWidget.title}. Could you be more specific about what you'd like to change? For example, for the Performance Chart, you can ask me to change it to show a different number of months.`
      };
    }

    // Handle widget removal
    if (action === 'remove' && targetWidget) {
      return {
        message: `I've removed the ${targetWidget.title} widget from your dashboard. You can always add it back using the "Add Widget" button or by asking me to add it again.`,
        widgetAction: {
          type: 'remove',
          widgetId: targetWidget.id
        }
      };
    }

    // Handle widget addition - much more flexible patterns
    if ((action === 'add' || message.includes('show me') || message.includes('i want') || message.includes('display')) && widgetIntent) {
      const widgetType = widgetIntent.type;
      const widgetNames = {
        'portfolio-overview': 'Portfolio Overview',
        'performance-chart': 'Performance Chart', 
        'asset-allocation': 'Asset Allocation',
        'recent-transactions': 'Recent Transactions',
        'market-trends': 'Market Trends',
        'risk-analysis': 'Risk Analysis',
        'cash-flow': 'Cash Flow',
        'news-feed': 'Market News'
      };

      // Check if widget already exists
      const exists = widgets.some(w => w.type === widgetType);
      if (exists) {
        return {
          message: `The ${widgetNames[widgetType]} widget is already on your dashboard. Would you like me to update it instead, or help you with something else?`
        };
      }

      return {
        message: `I've added a ${widgetNames[widgetType]} widget to your dashboard! You can now see this information displayed and can drag it to reposition or resize it as needed.`,
        widgetAction: {
          type: 'add',
          widgetType,
          widgetData: createWidgetData(widgetType)
        }
      };
    }

    // Informational responses with widget suggestions
    if (widgetIntent && !widgets.some(w => w.type === widgetIntent.type)) {
      const widgetNames = {
        'portfolio-overview': 'Portfolio Overview',
        'performance-chart': 'Performance Chart', 
        'asset-allocation': 'Asset Allocation',
        'recent-transactions': 'Recent Transactions',
        'market-trends': 'Market Trends',
        'risk-analysis': 'Risk Analysis',
        'cash-flow': 'Cash Flow',
        'news-feed': 'Market News'
      };

      const responses = {
        'portfolio-overview': 'Your total portfolio value is $2.5M with a 15.8% total return and 2.3% monthly growth. Your investments are well-diversified across multiple asset classes.',
        'performance-chart': 'Your portfolio has shown strong performance over the past 5 months, with steady growth from $2.2M to $2.5M. The trend indicates consistent positive returns.',
        'asset-allocation': 'Your portfolio is allocated across Private Equity (40%), Real Estate (30%), Venture Capital (20%), and Hedge Funds (10%). This shows good diversification.',
        'recent-transactions': 'Recent activity includes a $75,000 distribution from Real Estate Fund II and capital calls totaling $75,000 from Tech Growth Fund III and Healthcare Fund I.',
        'market-trends': 'Current market trends show Technology (+12.5%) and Healthcare (+8.3%) performing strongly, while Real Estate remains stable (+2.1%) and Energy is down (-3.2%).',
        'risk-analysis': 'Your portfolio shows moderate risk with a Beta of 0.85, Sharpe Ratio of 1.42, and 12.1% volatility. The risk profile indicates good risk-adjusted returns.',
        'cash-flow': 'Your cash flow has been positive with $80,000 net inflows over the past quarter. January showed $25,000 net inflow, with some outflow in February due to capital calls.',
        'news-feed': 'Latest investment news includes updates on Private Equity market outlook, Real Estate investment trends, and VC funding reaching new highs.'
      };

      return {
        message: `${responses[widgetIntent.type]} Would you like me to add a ${widgetNames[widgetIntent.type]} widget to your dashboard for better visualization?`,
        suggestedWidget: widgetIntent.type
      };
    }

    // Default helpful response
    return {
      message: 'I can help you with portfolio information, add widgets to your dashboard, or modify existing widgets. Try asking me to:\n\n• "Add a performance chart"\n• "Show me market trends"\n• "Change performance chart to line chart"\n• "Convert asset allocation to table view"\n• "Show transactions as cards"\n• "Change the performance chart to 3 months"\n• "Remove the risk analysis widget"\n\nI can display data as bar charts, line charts, pie charts, tables, cards, or lists depending on the widget type.'
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const messageText = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const response = simulateAssistantResponse(messageText);
      
      // Set suggested widget for follow-up responses
      if (response.suggestedWidget) {
        setLastSuggestedWidget(response.suggestedWidget);
      } else if (!response.widgetAction) {
        // Clear suggested widget if no suggestion and no action
        setLastSuggestedWidget(null);
      }
      
      // Execute widget action if present
      if (response.widgetAction) {
        const { type, widgetType, widgetId, widgetData, newFormat } = response.widgetAction;
        
        if (type === 'add' && widgetType && widgetData) {
          const newWidget = {
            type: widgetType,
            title: widgetData.title || 'New Widget',
            w: widgetData.w || 4,
            h: widgetData.h || 3,
            x: 0,
            y: 0,
            data: widgetData.data,
            visualizationFormat: widgetData.visualizationFormat
          };
          addWidget(newWidget);
        } else if (type === 'update' && widgetId && widgetData) {
          updateWidget(widgetId, widgetData);
        } else if (type === 'format-change' && widgetId && newFormat) {
          updateWidget(widgetId, { visualizationFormat: newFormat });
        } else if (type === 'remove' && widgetId) {
          removeWidget(widgetId);
        }
      }
      
      const assistantResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: response.message,
        sender: 'assistant',
        timestamp: new Date(),
        widgetAction: response.widgetAction,
        suggestedWidget: response.suggestedWidget,
      };

      setMessages(prev => [...prev, assistantResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.sender === 'assistant' && (
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.message}</p>
              {(message.widgetAction || message.suggestedWidget) && message.sender === 'assistant' && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="flex items-center space-x-1 text-xs">
                    {message.widgetAction?.type === 'add' && (
                      <>
                        <Plus className="w-3 h-3 text-green-600" />
                        <span className="text-green-600 font-medium">
                          Widget added to dashboard
                        </span>
                      </>
                    )}
                    {message.widgetAction?.type === 'update' && (
                      <>
                        <Edit className="w-3 h-3 text-blue-600" />
                        <span className="text-blue-600 font-medium">
                          Widget updated on dashboard
                        </span>
                      </>
                    )}
                    {message.widgetAction?.type === 'remove' && (
                      <>
                        <Trash2 className="w-3 h-3 text-red-600" />
                        <span className="text-red-600 font-medium">
                          Widget removed from dashboard
                        </span>
                      </>
                    )}
                    {message.suggestedWidget && !message.widgetAction && (
                      <>
                        <Plus className="w-3 h-3 text-orange-600" />
                        <span className="text-orange-600 font-medium">
                          Widget suggestion pending - respond with "yes" or "no"
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            {message.sender === 'user' && (
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your investments..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;