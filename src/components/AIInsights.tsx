import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Sparkles,
  BarChart3,
  DollarSign,
  Activity
} from 'lucide-react';
import { Widget } from '../types';
import { useDashboard } from '../context/DashboardContext';

interface AIInsight {
  id: string;
  type: 'positive' | 'negative' | 'neutral' | 'alert' | 'info';
  title: string;
  description: string;
  widgetSource: string[];
  priority: 'high' | 'medium' | 'low';
  icon: React.ReactNode;
}

const AIInsights: React.FC = () => {
  const { widgets } = useDashboard();
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const generateInsights = (widgets: Widget[]): AIInsight[] => {
    const insights: AIInsight[] = [];
    
    // Analyze Portfolio Overview
    const portfolioWidget = widgets.find(w => w.type === 'portfolio-overview');
    if (portfolioWidget?.data) {
      const { totalReturn, monthlyChange } = portfolioWidget.data;
      
      if (totalReturn > 15) {
        insights.push({
          id: 'portfolio-performance',
          type: 'positive',
          title: 'Strong Portfolio Performance',
          description: `Your portfolio has achieved an exceptional ${totalReturn}% total return, significantly outperforming market benchmarks. This represents excellent investment performance across your fund holdings.`,
          widgetSource: ['Portfolio Overview'],
          priority: 'high',
          icon: <TrendingUp className="w-5 h-5" />
        });
      }

      if (monthlyChange > 2) {
        insights.push({
          id: 'monthly-growth',
          type: 'positive',
          title: 'Positive Monthly Momentum',
          description: `Your portfolio gained ${monthlyChange}% this month, indicating strong momentum. This growth is likely driven by positive performance across multiple fund positions.`,
          widgetSource: ['Portfolio Overview'],
          priority: 'medium',
          icon: <Activity className="w-5 h-5" />
        });
      } else if (monthlyChange < -2) {
        insights.push({
          id: 'monthly-decline',
          type: 'negative',
          title: 'Monthly Portfolio Decline',
          description: `Your portfolio declined ${Math.abs(monthlyChange)}% this month. Consider reviewing individual fund performances and market conditions affecting your investments.`,
          widgetSource: ['Portfolio Overview'],
          priority: 'high',
          icon: <TrendingDown className="w-5 h-5" />
        });
      }
    }

    // Analyze Asset Allocation
    const allocationWidget = widgets.find(w => w.type === 'asset-allocation');
    if (allocationWidget?.data?.allocations) {
      const allocations = allocationWidget.data.allocations;
      const privateEquityAllocation = allocations.find((a: any) => a.category === 'Private Equity');
      
      if (privateEquityAllocation && privateEquityAllocation.percentage >= 40) {
        insights.push({
          id: 'pe-concentration',
          type: 'info',
          title: 'Private Equity Focus',
          description: `Private equity represents ${privateEquityAllocation.percentage}% of your portfolio (${privateEquityAllocation.value.toLocaleString()}), showing strong commitment to this asset class with potential for higher returns but lower liquidity.`,
          widgetSource: ['Asset Allocation'],
          priority: 'medium',
          icon: <BarChart3 className="w-5 h-5" />
        });
      }

      // Check for diversification
      const topAllocation = Math.max(...allocations.map((a: any) => a.percentage));
      if (topAllocation > 50) {
        insights.push({
          id: 'concentration-risk',
          type: 'alert',
          title: 'Portfolio Concentration Alert',
          description: `Your largest asset allocation is ${topAllocation}%. Consider diversifying across more asset classes to reduce concentration risk and improve risk-adjusted returns.`,
          widgetSource: ['Asset Allocation'],
          priority: 'high',
          icon: <AlertTriangle className="w-5 h-5" />
        });
      } else {
        insights.push({
          id: 'good-diversification',
          type: 'positive',
          title: 'Well-Diversified Portfolio',
          description: 'Your portfolio shows excellent diversification across multiple asset classes, which helps optimize risk-adjusted returns and reduce volatility.',
          widgetSource: ['Asset Allocation'],
          priority: 'low',
          icon: <CheckCircle className="w-5 h-5" />
        });
      }
    }

    // Analyze Recent Transactions
    const transactionWidget = widgets.find(w => w.type === 'recent-transactions');
    if (transactionWidget?.data?.transactions) {
      const transactions = transactionWidget.data.transactions;
      const totalDistributions = transactions
        .filter((t: any) => t.type === 'Distribution')
        .reduce((sum: number, t: any) => sum + t.amount, 0);
      
      const totalCapitalCalls = transactions
        .filter((t: any) => t.type === 'Capital Call')
        .reduce((sum: number, t: any) => sum + Math.abs(t.amount), 0);

      if (totalDistributions > totalCapitalCalls) {
        insights.push({
          id: 'positive-cashflow',
          type: 'positive',
          title: 'Positive Cash Flow Period',
          description: `Recent distributions ($${totalDistributions.toLocaleString()}) exceed capital calls ($${totalCapitalCalls.toLocaleString()}), providing positive net cash flow from your fund investments.`,
          widgetSource: ['Recent Transactions'],
          priority: 'medium',
          icon: <DollarSign className="w-5 h-5" />
        });
      } else if (totalCapitalCalls > totalDistributions * 2) {
        insights.push({
          id: 'high-capital-calls',
          type: 'info',
          title: 'Active Investment Period',
          description: `Capital calls ($${totalCapitalCalls.toLocaleString()}) significantly exceed distributions, indicating your funds are actively deploying capital into new investments.`,
          widgetSource: ['Recent Transactions'],
          priority: 'medium',
          icon: <Info className="w-5 h-5" />
        });
      }
    }

    // Analyze Market Trends
    const trendsWidget = widgets.find(w => w.type === 'market-trends');
    if (trendsWidget?.data?.trends) {
      const trends = trendsWidget.data.trends;
      const positivesTrends = trends.filter((t: any) => t.trend === 'up');
      const negativeTrends = trends.filter((t: any) => t.trend === 'down');

      if (positivesTrends.length >= 3) {
        const topSector = positivesTrends.reduce((prev: any, current: any) => 
          prev.percentage > current.percentage ? prev : current
        );
        insights.push({
          id: 'market-momentum',
          type: 'positive',
          title: 'Favorable Market Conditions',
          description: `Multiple sectors are trending positively, with ${topSector.sector} leading at +${topSector.percentage}%. This broad market strength should benefit your diversified portfolio.`,
          widgetSource: ['Market Trends'],
          priority: 'medium',
          icon: <TrendingUp className="w-5 h-5" />
        });
      }

      if (negativeTrends.length > 0) {
        const worstSector = negativeTrends.reduce((prev: any, current: any) => 
          prev.percentage < current.percentage ? prev : current
        );
        insights.push({
          id: 'sector-headwinds',
          type: 'neutral',
          title: 'Sector-Specific Headwinds',
          description: `${worstSector.sector} is facing challenges with ${worstSector.percentage}% decline. Monitor funds with significant exposure to this sector for potential impact.`,
          widgetSource: ['Market Trends'],
          priority: 'medium',
          icon: <TrendingDown className="w-5 h-5" />
        });
      }
    }

    // Analyze Risk Analysis
    const riskWidget = widgets.find(w => w.type === 'risk-analysis');
    if (riskWidget?.data?.riskMetrics) {
      const riskMetrics = riskWidget.data.riskMetrics;
      const sharpeRatio = riskMetrics.find((m: any) => m.metric === 'Sharpe Ratio');
      const volatility = riskMetrics.find((m: any) => m.metric === 'Volatility');

      if (sharpeRatio && sharpeRatio.value > 1.3) {
        insights.push({
          id: 'excellent-risk-return',
          type: 'positive',
          title: 'Excellent Risk-Adjusted Returns',
          description: `Your Sharpe ratio of ${sharpeRatio.value} indicates superior risk-adjusted performance. You're achieving strong returns relative to the risk taken.`,
          widgetSource: ['Risk Analysis'],
          priority: 'high',
          icon: <CheckCircle className="w-5 h-5" />
        });
      }

      if (volatility && volatility.value < 15) {
        insights.push({
          id: 'low-volatility',
          type: 'positive',
          title: 'Stable Portfolio Performance',
          description: `Portfolio volatility of ${volatility.value}% indicates stable performance with lower risk, suitable for investors seeking consistent returns.`,
          widgetSource: ['Risk Analysis'],
          priority: 'low',
          icon: <Activity className="w-5 h-5" />
        });
      }
    }

    // Sort by priority
    return insights.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  useEffect(() => {
    if (widgets.length > 0) {
      setIsAnalyzing(true);
      // Simulate AI analysis delay
      setTimeout(() => {
        const newInsights = generateInsights(widgets);
        setInsights(newInsights);
        setIsAnalyzing(false);
      }, 1500);
    } else {
      setInsights([]);
    }
  }, [widgets]);

  const getInsightStyle = (type: AIInsight['type']) => {
    switch (type) {
      case 'positive':
        return {
          borderColor: '#10b981',
          iconColor: '#10b981',
          bgColor: '#f0fdf4',
        };
      case 'negative':
        return {
          borderColor: '#ef4444',
          iconColor: '#ef4444',
          bgColor: '#fef2f2',
        };
      case 'alert':
        return {
          borderColor: '#f59e0b',
          iconColor: '#f59e0b',
          bgColor: '#fffbeb',
        };
      case 'neutral':
        return {
          borderColor: '#6b7280',
          iconColor: '#6b7280',
          bgColor: '#f9fafb',
        };
      case 'info':
        return {
          borderColor: '#3b82f6',
          iconColor: '#3b82f6',
          bgColor: '#eff6ff',
        };
      default:
        return {
          borderColor: '#6b7280',
          iconColor: '#6b7280',
          bgColor: '#f9fafb',
        };
    }
  };

  if (widgets.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">AI Insights</h2>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>Powered by AI analysis</span>
          </div>
        </div>
        {isAnalyzing && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Analyzing portfolio data...</span>
          </div>
        )}
      </div>

      {isAnalyzing ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600">Analyzing your portfolio data and market conditions...</p>
          </div>
        </div>
      ) : insights.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {insights.map((insight) => {
            const style = getInsightStyle(insight.type);
            return (
              <div
                key={insight.id}
                className="bg-white rounded-lg border-2 p-6 hover:shadow-md transition-shadow"
                style={{ 
                  borderColor: style.borderColor,
                  backgroundColor: style.bgColor 
                }}
              >
                <div className="flex items-start space-x-4">
                  <div 
                    className="p-2 rounded-full flex-shrink-0"
                    style={{ 
                      backgroundColor: `${style.iconColor}20`,
                      color: style.iconColor 
                    }}
                  >
                    {insight.icon}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {insight.title}
                      </h3>
                      <span 
                        className="px-2 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: `${style.iconColor}20`,
                          color: style.iconColor
                        }}
                      >
                        {insight.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {insight.description}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>Source:</span>
                      <div className="flex flex-wrap gap-1">
                        {insight.widgetSource.map((source, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                          >
                            {source}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Insights Available
          </h3>
          <p className="text-gray-600">
            Add some widgets to your dashboard to get AI-powered insights about your portfolio performance.
          </p>
        </div>
      )}
    </div>
  );
};

export default AIInsights;