import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Plus } from 'lucide-react';
import { ChatMessage, Widget, WidgetAction } from '../types';
import { useDashboard } from '../context/DashboardContext';

const ChatInterface: React.FC = () => {
  const { widgets, addWidget, updateWidget, removeWidget } = useDashboard();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: 'Hello! I\'m your investment assistant. I can help you with portfolio insights, performance analysis, and answer questions about your investments. I can also add new widgets to your dashboard - just ask me to add widgets like "market trends", "risk analysis", or "cash flow"!',
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

  const simulateAssistantResponse = (userMessage: string): { message: string; widgetAction?: WidgetAction } => {
    const message = userMessage.toLowerCase();
    
    // Widget creation patterns
    if (message.includes('add') && (message.includes('widget') || message.includes('chart') || message.includes('overview'))) {
      let widgetType: Widget['type'] | null = null;
      let widgetName = '';
      
      if (message.includes('market') || message.includes('trend')) {
        widgetType = 'market-trends';
        widgetName = 'Market Trends';
      } else if (message.includes('risk')) {
        widgetType = 'risk-analysis';
        widgetName = 'Risk Analysis';
      } else if (message.includes('cash') || message.includes('flow')) {
        widgetType = 'cash-flow';
        widgetName = 'Cash Flow';
      } else if (message.includes('news')) {
        widgetType = 'news-feed';
        widgetName = 'Market News';
      } else if (message.includes('performance')) {
        widgetType = 'performance-chart';
        widgetName = 'Performance Chart';
      } else if (message.includes('allocation')) {
        widgetType = 'asset-allocation';
        widgetName = 'Asset Allocation';
      } else if (message.includes('transaction')) {
        widgetType = 'recent-transactions';
        widgetName = 'Recent Transactions';
      } else {
        widgetType = 'portfolio-overview';
        widgetName = 'Portfolio Overview';
      }
      
      return {
        message: `I've added a ${widgetName} widget to your dashboard! You can now see this information displayed and can drag it to reposition or resize it as needed. The widget has been placed in an optimal location on your dashboard.`,
        widgetAction: {
          type: 'add',
          widgetType,
          widgetData: createWidgetData(widgetType)
        }
      };
    }
    
    // Remove widget patterns
    if (message.includes('remove') || message.includes('delete')) {
      return {
        message: 'To remove a widget, you can tell me which specific widget you\'d like to remove (e.g., "remove the performance chart" or "delete the risk analysis widget"). Alternatively, you can enable customization mode and manually remove widgets from the dashboard.'
      };
    }
    
    // Information responses
    if (message.includes('portfolio') || message.includes('performance')) {
      return {
        message: 'Based on your current portfolio, you have a total value of $2.5M with a 15.8% total return. Your portfolio is well-diversified across Private Equity (40%), Real Estate (30%), Venture Capital (20%), and Hedge Funds (10%). Would you like me to add a performance chart widget to better visualize this data?'
      };
    } else if (message.includes('allocation') || message.includes('diversification')) {
      return {
        message: 'Your current asset allocation shows a balanced approach with Private Equity as your largest holding at 40%. This allocation aligns well with typical LP strategies for long-term growth. Would you like me to add an asset allocation widget to better visualize this data?'
      };
    } else if (message.includes('transaction') || message.includes('capital call') || message.includes('distribution')) {
      return {
        message: 'Your recent transactions show a healthy mix of capital calls and distributions. You received a $75,000 distribution from Real Estate Fund II and had capital calls totaling $75,000. Would you like me to add a transactions widget to your dashboard for better tracking?'
      };
    } else if (message.includes('risk') || message.includes('volatility')) {
      return {
        message: 'Your portfolio shows moderate risk with good diversification across asset classes. The 2.3% monthly change indicates healthy growth with manageable volatility. Your Private Equity and Real Estate holdings provide stability, while VC investments add growth potential. Would you like me to add a risk analysis widget?'
      };
    } else if (message.includes('market') || message.includes('trends')) {
      return {
        message: 'Current market trends show Technology and Healthcare sectors performing strongly with 12.5% and 8.3% growth respectively. Real Estate remains stable at 2.1% while Energy is down 3.2%. Would you like me to add a market trends widget to track these changes?'
      };
    } else if (message.includes('cash') || message.includes('flow')) {
      return {
        message: 'Your cash flow has been positive overall with net inflows of $80,000 over the past quarter. January saw the highest net inflow at $25,000, while February had a temporary outflow of -$30,000 due to capital calls. Would you like me to add a cash flow widget to monitor this better?'
      };
    } else if (message.includes('widget') || message.includes('dashboard')) {
      return {
        message: 'I can help you customize your dashboard! Available widgets include: Portfolio Overview, Performance Chart, Asset Allocation, Recent Transactions, Market Trends, Risk Analysis, Cash Flow, and Market News. Just ask me to "add [widget name]" and I\'ll add it to your dashboard!'
      };
    } else {
      return {
        message: 'I\'d be happy to help you with that! I can provide insights about your portfolio performance, asset allocation, recent transactions, market trends, risk analysis, or cash flow. I can also add new widgets to your dashboard - just ask me to add any widget you\'d like to see!'
      };
    }
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
        const { type, widgetType, widgetData } = response.widgetAction;
        
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
                    <Plus className="w-3 h-3 text-green-600" />
                    <span className="text-green-600 font-medium">
                      Widget {message.widgetAction.type}ed to dashboard
                    </span>
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