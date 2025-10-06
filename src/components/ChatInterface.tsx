import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Plus, Edit, Trash2 } from 'lucide-react';
import { ChatMessage, Widget, WidgetAction } from '../types';
import { useDashboard } from '../context/DashboardContext';

const ChatInterface: React.FC = () => {
  const { widgets, addWidget, updateWidget, removeWidget } = useDashboard();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: 'Hello! I\'m your investment assistant. I can help you with portfolio insights, performance analysis, and manage your dashboard widgets. I can:\n\n• Add widgets: "show me market trends" or "add risk analysis"\n• Edit widgets: "change performance chart to 3 months"\n• Remove widgets: "remove the cash flow widget"\n• Answer investment questions about your portfolio\n\nWhat would you like to explore today?',
      sender: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const createWidgetData = (type: Widget['type']) => {
    const widgetTemplates = {
      'portfolio-overview': {
        title: 'Portfolio Overview',
        w: 6,
        h: 4,
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

  const detectAction = (message: string): 'add' | 'update' | 'remove' | 'info' => {
    const msg = message.toLowerCase();
    
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

    return bestAction.action as 'add' | 'update' | 'remove' | 'info';
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

  const simulateAssistantResponse = (userMessage: string): { message: string; widgetAction?: WidgetAction } => {
    const message = userMessage.toLowerCase();
    const action = detectAction(message);
    const widgetIntent = detectWidgetIntent(message);
    const targetWidget = findTargetWidget(message);

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
        message: `${responses[widgetIntent.type]} Would you like me to add a ${widgetNames[widgetIntent.type]} widget to your dashboard for better visualization?`
      };
    }

    // Default helpful response
    return {
      message: 'I can help you with portfolio information, add widgets to your dashboard, or modify existing widgets. Try asking me to "add a performance chart", "show me market trends", "change the performance chart to 3 months", or "remove the risk analysis widget".'
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
      
      // Execute widget action if present
      if (response.widgetAction) {
        const { type, widgetType, widgetId, widgetData } = response.widgetAction;
        
        if (type === 'add' && widgetType && widgetData) {
          const newWidget = {
            type: widgetType,
            title: widgetData.title || 'New Widget',
            w: widgetData.w || 4,
            h: widgetData.h || 3,
            x: 0,
            y: 0,
            data: widgetData.data
          };
          addWidget(newWidget);
        } else if (type === 'update' && widgetId && widgetData) {
          updateWidget(widgetId, widgetData);
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
              {message.widgetAction && message.sender === 'assistant' && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="flex items-center space-x-1 text-xs">
                    {message.widgetAction.type === 'add' && (
                      <>
                        <Plus className="w-3 h-3 text-green-600" />
                        <span className="text-green-600 font-medium">
                          Widget added to dashboard
                        </span>
                      </>
                    )}
                    {message.widgetAction.type === 'update' && (
                      <>
                        <Edit className="w-3 h-3 text-blue-600" />
                        <span className="text-blue-600 font-medium">
                          Widget updated on dashboard
                        </span>
                      </>
                    )}
                    {message.widgetAction.type === 'remove' && (
                      <>
                        <Trash2 className="w-3 h-3 text-red-600" />
                        <span className="text-red-600 font-medium">
                          Widget removed from dashboard
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