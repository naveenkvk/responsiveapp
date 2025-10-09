import React, { useState } from 'react';
import { Widget, VisualizationFormat } from '../types';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, PieChart, Clock, Newspaper, AlertTriangle, Activity, X, ExternalLink, List } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import WidgetDetailModal from './WidgetDetailModal';

interface WidgetComponentProps {
  widget: Widget;
  isCustomizing?: boolean;
}

const WidgetComponent: React.FC<WidgetComponentProps> = ({ widget, isCustomizing = false }) => {
  const { removeWidget } = useDashboard();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const renderVisualization = (type: Widget['type'], data: any, format?: VisualizationFormat) => {
    // Default format based on widget type if not specified
    const defaultFormats: Record<Widget['type'], VisualizationFormat> = {
      'performance-chart': 'bar-chart',
      'asset-allocation': 'pie-chart',
      'recent-transactions': 'list',
      'market-trends': 'bar-chart',
      'risk-analysis': 'table',
      'cash-flow': 'bar-chart',
      'news-feed': 'list',
      'portfolio-overview': 'cards'
    };
    
    const currentFormat = format || defaultFormats[type];
    
    // Performance Chart Visualizations
    if (type === 'performance-chart') {
      if (currentFormat === 'line-chart') {
        return renderLineChart(data?.chartData || []);
      } else if (currentFormat === 'area-chart') {
        return renderAreaChart(data?.chartData || []);
      } else if (currentFormat === 'table') {
        return renderPerformanceTable(data?.chartData || []);
      } else {
        // Default bar chart
        return renderBarChart(data?.chartData || []);
      }
    }
    
    // Asset Allocation Visualizations
    if (type === 'asset-allocation') {
      if (currentFormat === 'donut-chart') {
        return renderDonutChart(data?.allocations || []);
      } else if (currentFormat === 'bar-chart') {
        return renderAllocationBarChart(data?.allocations || []);
      } else if (currentFormat === 'table') {
        return renderAllocationTable(data?.allocations || []);
      } else if (currentFormat === 'cards') {
        return renderAllocationCards(data?.allocations || []);
      } else {
        // Default pie chart representation
        return renderPieChart(data?.allocations || []);
      }
    }
    
    // Recent Transactions Visualizations
    if (type === 'recent-transactions') {
      if (currentFormat === 'table') {
        return renderTransactionTable(data?.transactions || []);
      } else if (currentFormat === 'cards') {
        return renderTransactionCards(data?.transactions || []);
      } else {
        // Default list view
        return renderTransactionList(data?.transactions || []);
      }
    }
    
    // Market Trends Visualizations
    if (type === 'market-trends') {
      if (currentFormat === 'line-chart') {
        return renderTrendsLineChart(data?.trends || []);
      } else if (currentFormat === 'table') {
        return renderTrendsTable(data?.trends || []);
      } else if (currentFormat === 'cards') {
        return renderTrendsCards(data?.trends || []);
      } else {
        // Default bar chart
        return renderTrendsBarChart(data?.trends || []);
      }
    }
    
    // Risk Analysis Visualizations
    if (type === 'risk-analysis') {
      if (currentFormat === 'cards') {
        return renderRiskCards(data?.riskMetrics || []);
      } else if (currentFormat === 'bar-chart') {
        return renderRiskBarChart(data?.riskMetrics || []);
      } else {
        // Default table
        return renderRiskTable(data?.riskMetrics || []);
      }
    }
    
    // Cash Flow Visualizations
    if (type === 'cash-flow') {
      if (currentFormat === 'line-chart') {
        return renderCashFlowLineChart(data?.cashFlow || []);
      } else if (currentFormat === 'area-chart') {
        return renderCashFlowAreaChart(data?.cashFlow || []);
      } else if (currentFormat === 'table') {
        return renderCashFlowTable(data?.cashFlow || []);
      } else {
        // Default bar chart
        return renderCashFlowBarChart(data?.cashFlow || []);
      }
    }
    
    // News Feed Visualizations
    if (type === 'news-feed') {
      if (currentFormat === 'cards') {
        return renderNewsCards(data?.news || []);
      } else if (currentFormat === 'table') {
        return renderNewsTable(data?.news || []);
      } else {
        // Default list view
        return renderNewsList(data?.news || []);
      }
    }
    
    // Portfolio Overview Visualizations
    if (type === 'portfolio-overview') {
      if (currentFormat === 'table') {
        return renderPortfolioTable(data);
      } else {
        // Default cards view
        return renderPortfolioCards(data);
      }
    }
    
    // Fallback to original rendering
    return renderOriginalContent(type, data);
  };
  
  // Individual rendering methods for different formats
  const renderBarChart = (chartData: any[]) => {
    return (
      <div className="space-y-4">
        <div className="h-32 flex items-end justify-between space-x-2">
          {chartData.map((item: any, index: number) => (
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
          <div className="text-sm text-gray-600">Performance Trend (Bar Chart)</div>
        </div>
      </div>
    );
  };
  
  const renderLineChart = (chartData: any[]) => {
    const maxValue = Math.max(...chartData.map(d => d.value));
    return (
      <div className="space-y-4">
        <div className="h-32 relative">
          <svg className="w-full h-full">
            <polyline
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              points={chartData.map((item, index) => 
                `${(index / (chartData.length - 1)) * 100},${100 - (item.value / maxValue) * 80}`
              ).join(' ')}
              vectorEffect="non-scaling-stroke"
              className="drop-shadow-sm"
            />
            {chartData.map((item, index) => (
              <circle
                key={index}
                cx={`${(index / (chartData.length - 1)) * 100}%`}
                cy={`${100 - (item.value / maxValue) * 80}%`}
                r="4"
                fill="#3b82f6"
                className="drop-shadow-sm"
              />
            ))}
          </svg>
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
            {chartData.map((item, index) => (
              <span key={index} className="text-xs text-gray-600">{item.month}</span>
            ))}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">Performance Trend (Line Chart)</div>
        </div>
      </div>
    );
  };
  
  const renderAreaChart = (chartData: any[]) => {
    const maxValue = Math.max(...chartData.map(d => d.value));
    const points = chartData.map((item, index) => 
      `${(index / (chartData.length - 1)) * 100},${100 - (item.value / maxValue) * 80}`
    ).join(' ');
    
    return (
      <div className="space-y-4">
        <div className="h-32 relative">
          <svg className="w-full h-full">
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <polygon
              fill="url(#areaGradient)"
              stroke="#3b82f6"
              strokeWidth="2"
              points={`0,100 ${points} 100,100`}
            />
          </svg>
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
            {chartData.map((item, index) => (
              <span key={index} className="text-xs text-gray-600">{item.month}</span>
            ))}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">Performance Trend (Area Chart)</div>
        </div>
      </div>
    );
  };
  
  const renderPerformanceTable = (chartData: any[]) => {
    return (
      <div className="space-y-4">
        <div className="text-sm text-gray-600 text-center mb-2">Performance Data (Table View)</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left font-medium text-gray-700 pb-2">Month</th>
                <th className="text-right font-medium text-gray-700 pb-2">Value</th>
                <th className="text-right font-medium text-gray-700 pb-2">Change</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((item, index) => {
                const prevValue = index > 0 ? chartData[index - 1].value : item.value;
                const change = ((item.value - prevValue) / prevValue) * 100;
                return (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-1 text-gray-900">{item.month}</td>
                    <td className="py-1 text-right text-gray-900">{formatCurrency(item.value)}</td>
                    <td className={`py-1 text-right text-sm ${
                      change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {index > 0 ? `${change >= 0 ? '+' : ''}${change.toFixed(1)}%` : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  const renderPieChart = (allocations: any[]) => {
    return (
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="w-24 h-24 relative">
            <svg className="w-full h-full transform -rotate-90">
              {(() => {
                let cumulativePercentage = 0;
                return allocations.map((allocation, index) => {
                  const percentage = allocation.percentage;
                  const strokeDasharray = `${percentage * 2.51} 251`;
                  const strokeDashoffset = -cumulativePercentage * 2.51;
                  const color = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index % 4];
                  cumulativePercentage += percentage;
                  
                  return (
                    <circle
                      key={index}
                      cx="48"
                      cy="48"
                      r="40"
                      fill="transparent"
                      stroke={color}
                      strokeWidth="16"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                    />
                  );
                });
              })()
              }
            </svg>
          </div>
        </div>
        <div className="space-y-2">
          {allocations.map((allocation, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index % 4]
                  }}
                ></div>
                <span className="font-medium text-gray-700">{allocation.category}</span>
              </div>
              <span className="font-semibold text-gray-900">{allocation.percentage}%</span>
            </div>
          ))}
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">Asset Allocation (Pie Chart)</div>
        </div>
      </div>
    );
  };
  
  const renderOriginalContent = (type: Widget['type'], data: any) => {
    // Original rendering logic as fallback
    switch (type) {
      case 'portfolio-overview':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {formatCurrency(data?.totalValue || 0)}
                </div>
                <div className="text-sm text-gray-600">Total Portfolio Value</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-lg font-semibold text-green-600">
                      +{data?.totalReturn || 0}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">Total Return</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-lg font-semibold text-blue-600">
                      +{data?.monthlyChange || 0}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">This Month</div>
                </div>
              </div>
            </div>
          </div>
        );
      // Add other original cases as needed
      default:
        return <div>Visualization not available</div>;
    }
  };

  // Placeholder methods for other visualization types (to be implemented)
  const renderDonutChart = (data: any[]) => renderPieChart(data);
  const renderAllocationBarChart = (data: any[]) => renderBarChart(data.map((item, index) => ({ month: item.category, value: item.value })));
  const renderAllocationTable = (data: any[]) => renderPerformanceTable(data.map((item, index) => ({ month: item.category, value: item.value })));
  const renderAllocationCards = (data: any[]) => renderPieChart(data);
  
  const renderTransactionTable = (data: any[]) => renderPerformanceTable(data.map((item, index) => ({ month: item.date, value: Math.abs(item.amount) })));
  const renderTransactionCards = (data: any[]) => renderTransactionList(data);
  const renderTransactionList = (transactions: any[]) => {
    return (
      <div className="space-y-3">
        {transactions.map((transaction: any, index: number) => (
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
  };
  
  const renderTrendsLineChart = (data: any[]) => renderLineChart(data.map((item, index) => ({ month: item.sector, value: Math.abs(item.percentage * 1000) })));
  const renderTrendsTable = (data: any[]) => renderPerformanceTable(data.map((item, index) => ({ month: item.sector, value: item.percentage })));
  const renderTrendsCards = (data: any[]) => renderTrendsBarChart(data);
  const renderTrendsBarChart = (trends: any[]) => {
    return (
      <div className="space-y-3">
        {trends.map((trend: any, index: number) => (
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
  };
  
  const renderRiskCards = (data: any[]) => renderRiskTable(data);
  const renderRiskBarChart = (data: any[]) => renderBarChart(data.map((item, index) => ({ month: item.metric, value: parseFloat(item.value) || 0 })));
  const renderRiskTable = (riskMetrics: any[]) => {
    return (
      <div className="space-y-3">
        {riskMetrics.map((metric: any, index: number) => (
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
  };
  
  const renderCashFlowLineChart = (data: any[]) => renderLineChart(data.map((item, index) => ({ month: item.month, value: Math.abs(item.net) })));
  const renderCashFlowAreaChart = (data: any[]) => renderAreaChart(data.map((item, index) => ({ month: item.month, value: Math.abs(item.net) })));
  const renderCashFlowTable = (data: any[]) => renderPerformanceTable(data.map((item, index) => ({ month: item.month, value: item.net })));
  const renderCashFlowBarChart = (cashFlow: any[]) => {
    return (
      <div className="space-y-3">
        {cashFlow.map((flow: any, index: number) => (
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
  };
  
  const renderNewsCards = (data: any[]) => renderNewsList(data);
  const renderNewsTable = (data: any[]) => renderPerformanceTable(data.map((item, index) => ({ month: item.title, value: index })));
  const renderNewsList = (news: any[]) => {
    return (
      <div className="space-y-3">
        {news.map((item: any, index: number) => (
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
  };
  
  const renderPortfolioTable = (data: any) => {
    const items = [
      { label: 'Total Value', value: formatCurrency(data?.totalValue || 0) },
      { label: 'Total Return', value: `${data?.totalReturn || 0}%` },
      { label: 'Monthly Change', value: `${data?.monthlyChange || 0}%` }
    ];
    
    return (
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
            <span className="text-sm font-medium text-gray-700">{item.label}</span>
            <span className="text-sm font-semibold text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    );
  };
  
  const renderPortfolioCards = (data: any) => {
    return renderOriginalContent('portfolio-overview', data);
  };

  const renderContent = () => {
    return renderVisualization(widget.type, widget.data, widget.visualizationFormat);
  };
  
  // Original switch statement logic - keeping for reference
  const renderContentOriginal = () => {
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
        // This is now handled by renderVisualization method
        return null;

      case 'asset-allocation':
      case 'recent-transactions':
      case 'news-feed':
      case 'market-trends':
      case 'risk-analysis':
      case 'cash-flow':
        // All now handled by renderVisualization method
        return null;


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

  const handleWidgetClick = () => {
    if (!isCustomizing) {
      setIsDetailModalOpen(true);
    }
  };

  return (
    <>
      <div 
        className={`h-full p-2 sm:p-4 bg-white rounded-lg relative transition-all duration-200 ${
          !isCustomizing ? 'cursor-pointer hover:shadow-lg hover:bg-gray-50 group' : ''
        }`}
        onClick={handleWidgetClick}
      >
        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex items-center space-x-1 z-10">
          {!isCustomizing && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDetailModalOpen(true);
              }}
              className="p-1 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full transition-colors opacity-0 group-hover:opacity-100 shadow-sm"
              title="View details"
            >
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
          
          {isCustomizing && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeWidget(widget.id);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="p-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-colors shadow-sm"
              title="Remove widget"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Widget Header */}
        <div className="flex items-center space-x-2 mb-2 sm:mb-4">
          <div className="text-primary-600">
            {getIcon()}
          </div>
          <h3 className="text-sm sm:text-lg font-semibold text-gray-900 truncate pr-8">{widget.title}</h3>
        </div>

        {/* Widget Content */}
        <div className="h-full overflow-auto p-1">
          {renderContent()}
        </div>

        {/* Hover Indicator */}
        {!isCustomizing && (
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded shadow-sm">
              Click for details
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <WidgetDetailModal
        widget={widget}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </>
  );
};

export default WidgetComponent;