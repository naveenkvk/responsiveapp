import React from 'react';
import { Widget } from '../types';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, PieChart, Clock, Newspaper, AlertTriangle, Activity } from 'lucide-react';

interface WidgetComponentProps {
  widget: Widget;
}

const WidgetComponent: React.FC<WidgetComponentProps> = ({ widget }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const renderContent = () => {
    switch (widget.type) {
      case 'portfolio-overview':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {formatCurrency(widget.data?.totalValue || 0)}
                </div>
                <div className="text-sm text-gray-600">Total Portfolio Value</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-lg font-semibold text-green-600">
                      +{widget.data?.totalReturn || 0}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">Total Return</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-lg font-semibold text-blue-600">
                      +{widget.data?.monthlyChange || 0}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">This Month</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'performance-chart':
        return (
          <div className="space-y-4">
            <div className="h-32 flex items-end justify-between space-x-2">
              {widget.data?.chartData?.map((item: any, index: number) => (
                <div key={index} className="flex flex-col items-center space-y-1">
                  <div
                    className="w-8 bg-primary-500 rounded-t"
                    style={{
                      height: `${(item.value / 2500000) * 100}px`,
                      minHeight: '20px'
                    }}
                  ></div>
                  <span className="text-xs text-gray-600">{item.month}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">5-Month Performance Trend</div>
            </div>
          </div>
        );

      case 'asset-allocation':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              {widget.data?.allocations?.map((allocation: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index % 4]
                      }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">{allocation.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{allocation.percentage}%</div>
                    <div className="text-xs text-gray-600">{formatCurrency(allocation.value)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'recent-transactions':
        return (
          <div className="space-y-3">
            {widget.data?.transactions?.map((transaction: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    transaction.amount > 0 ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{transaction.type}</div>
                    <div className="text-xs text-gray-600">{transaction.fund}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                  </div>
                  <div className="text-xs text-gray-600">{transaction.date}</div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'news-feed':
        return (
          <div className="space-y-3">
            {widget.data?.news?.map((item: any, index: number) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-900 mb-1">{item.title}</div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">{item.source}</span>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        );

      case 'market-trends':
        return (
          <div className="space-y-3">
            {widget.data?.trends?.map((trend: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    trend.trend === 'up' ? 'bg-green-500' : 
                    trend.trend === 'down' ? 'bg-red-500' : 'bg-gray-400'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-900">{trend.sector}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {trend.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : trend.trend === 'down' ? (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  ) : (
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                  )}
                  <span className={`text-sm font-semibold ${
                    trend.trend === 'up' ? 'text-green-600' : 
                    trend.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {trend.percentage > 0 ? '+' : ''}{trend.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      case 'risk-analysis':
        return (
          <div className="space-y-3">
            {widget.data?.riskMetrics?.map((metric: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{metric.metric}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-900">{metric.value}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    metric.status === 'good' ? 'bg-green-500' : 
                    metric.status === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'cash-flow':
        return (
          <div className="space-y-3">
            {widget.data?.cashFlow?.map((flow: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium text-gray-700">{flow.month}</span>
                <div className="text-right">
                  <div className="text-xs text-gray-600">
                    In: {formatCurrency(flow.inflow)} | Out: {formatCurrency(flow.outflow)}
                  </div>
                  <div className={`text-sm font-semibold ${
                    flow.net >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    Net: {flow.net >= 0 ? '+' : ''}{formatCurrency(flow.net)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Widget content not available</p>
          </div>
        );
    }
  };

  const getIcon = () => {
    switch (widget.type) {
      case 'portfolio-overview':
        return <DollarSign className="w-5 h-5" />;
      case 'performance-chart':
        return <BarChart3 className="w-5 h-5" />;
      case 'asset-allocation':
        return <PieChart className="w-5 h-5" />;
      case 'recent-transactions':
        return <Clock className="w-5 h-5" />;
      case 'news-feed':
        return <Newspaper className="w-5 h-5" />;
      case 'market-trends':
        return <TrendingUp className="w-5 h-5" />;
      case 'risk-analysis':
        return <AlertTriangle className="w-5 h-5" />;
      case 'cash-flow':
        return <Activity className="w-5 h-5" />;
      default:
        return <BarChart3 className="w-5 h-5" />;
    }
  };

  return (
    <div className="h-full p-2 sm:p-4 bg-white rounded-lg">
      <div className="flex items-center space-x-2 mb-2 sm:mb-4">
        <div className="text-primary-600">
          {getIcon()}
        </div>
        <h3 className="text-sm sm:text-lg font-semibold text-gray-900 truncate">{widget.title}</h3>
      </div>
      <div className="h-full overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default WidgetComponent;