import React from 'react';
import { X, DollarSign, BarChart3, PieChart, Clock, Newspaper, TrendingUp, AlertTriangle, Activity } from 'lucide-react';
import { Widget } from '../types';
import { useDashboard } from '../context/DashboardContext';

interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WidgetOption {
  type: Widget['type'];
  title: string;
  description: string;
  icon: React.ReactNode;
  size: { w: number; h: number };
}

const AddWidgetModal: React.FC<AddWidgetModalProps> = ({ isOpen, onClose }) => {
  const { addWidget, widgets } = useDashboard();

  const widgetOptions: WidgetOption[] = [
    {
      type: 'portfolio-overview',
      title: 'Portfolio Overview',
      description: 'Total portfolio value, returns, and monthly performance',
      icon: <DollarSign className="w-6 h-6" />,
      size: { w: 6, h: 4 }
    },
    {
      type: 'performance-chart',
      title: 'Performance Chart',
      description: 'Visual representation of portfolio growth over time',
      icon: <BarChart3 className="w-6 h-6" />,
      size: { w: 6, h: 4 }
    },
    {
      type: 'asset-allocation',
      title: 'Asset Allocation',
      description: 'Breakdown by investment categories and percentages',
      icon: <PieChart className="w-6 h-6" />,
      size: { w: 4, h: 3 }
    },
    {
      type: 'recent-transactions',
      title: 'Recent Transactions',
      description: 'Latest capital calls, distributions, and fund activities',
      icon: <Clock className="w-6 h-6" />,
      size: { w: 8, h: 3 }
    },
    {
      type: 'market-trends',
      title: 'Market Trends',
      description: 'Sector performance trends and market indicators',
      icon: <TrendingUp className="w-6 h-6" />,
      size: { w: 6, h: 4 }
    },
    {
      type: 'risk-analysis',
      title: 'Risk Analysis',
      description: 'Portfolio risk metrics including Beta and Sharpe Ratio',
      icon: <AlertTriangle className="w-6 h-6" />,
      size: { w: 4, h: 3 }
    },
    {
      type: 'cash-flow',
      title: 'Cash Flow',
      description: 'Monthly cash inflows, outflows, and net positions',
      icon: <Activity className="w-6 h-6" />,
      size: { w: 6, h: 3 }
    },
    {
      type: 'news-feed',
      title: 'Market News',
      description: 'Latest investment news and market updates',
      icon: <Newspaper className="w-6 h-6" />,
      size: { w: 6, h: 4 }
    }
  ];

  const createWidgetData = (type: Widget['type']) => {
    const widgetTemplates = {
      'portfolio-overview': {
        data: {
          totalValue: 2500000,
          totalReturn: 15.8,
          monthlyChange: 2.3
        }
      },
      'performance-chart': {
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
        data: {
          transactions: [
            { date: '2024-01-15', type: 'Capital Call', fund: 'Tech Growth Fund III', amount: -50000 },
            { date: '2024-01-10', type: 'Distribution', fund: 'Real Estate Fund II', amount: 75000 },
            { date: '2024-01-05', type: 'Capital Call', fund: 'Healthcare Fund I', amount: -25000 },
          ]
        }
      },
      'news-feed': {
        data: {
          news: [
            { title: 'Private Equity Market Outlook', source: 'Financial Times', date: '2024-01-16' },
            { title: 'Real Estate Investment Trends', source: 'WSJ', date: '2024-01-15' },
            { title: 'VC Funding Reaches New High', source: 'TechCrunch', date: '2024-01-14' },
          ]
        }
      },
      'market-trends': {
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

    return widgetTemplates[type] || { data: {} };
  };

  const handleAddWidget = (option: WidgetOption) => {
    const widgetData = createWidgetData(option.type);
    
    const newWidget = {
      type: option.type,
      title: option.title,
      w: option.size.w,
      h: option.size.h,
      x: 0,
      y: 0,
      data: widgetData.data
    };

    addWidget(newWidget);
    onClose();
  };

  const isWidgetTypeExisting = (type: Widget['type']) => {
    return widgets.some(widget => widget.type === type);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add Widget to Dashboard</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          <p className="text-gray-600 mb-6">
            Choose a widget to add to your dashboard. Each widget provides different insights into your investment portfolio.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {widgetOptions.map((option) => {
              const isExisting = isWidgetTypeExisting(option.type);
              return (
                <div
                  key={option.type}
                  onClick={!isExisting ? () => handleAddWidget(option) : undefined}
                  className={`p-4 border rounded-lg transition-all ${
                    isExisting
                      ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                      : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50 cursor-pointer group'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`${
                      isExisting
                        ? 'text-gray-400'
                        : 'text-primary-600 group-hover:text-primary-700'
                    }`}>
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`text-lg font-semibold ${
                          isExisting ? 'text-gray-500' : 'text-gray-900'
                        }`}>
                          {option.title}
                        </h3>
                        {isExisting && (
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                            Already added
                          </span>
                        )}
                      </div>
                      <p className={`text-sm mb-2 ${
                        isExisting ? 'text-gray-500' : 'text-gray-600'
                      }`}>
                        {option.description}
                      </p>
                      <div className={`text-xs ${
                        isExisting ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Size: {option.size.w} × {option.size.h} grid units
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;