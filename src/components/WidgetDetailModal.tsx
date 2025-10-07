import React from 'react';
import { X, TrendingUp, TrendingDown, DollarSign, Calendar, Building, User, AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Widget } from '../types';

interface WidgetDetailModalProps {
  widget: Widget | null;
  isOpen: boolean;
  onClose: () => void;
}

const WidgetDetailModal: React.FC<WidgetDetailModalProps> = ({ widget, isOpen, onClose }) => {
  if (!isOpen || !widget) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const renderPortfolioOverviewDetail = () => {
    const data = widget.data;
    const totalValue = data?.totalValue || 2500000;
    const totalReturn = data?.totalReturn || 15.8;
    const monthlyChange = data?.monthlyChange || 2.3;

    const detailedBreakdown = [
      { fund: 'Tech Growth Fund III', nav: 850000, allocation: 34, return: 18.5, change: 3.2 },
      { fund: 'Healthcare Fund I', nav: 625000, allocation: 25, return: 14.2, change: 2.1 },
      { fund: 'Real Estate Fund II', nav: 500000, allocation: 20, return: 12.8, change: 1.8 },
      { fund: 'Venture Fund IV', nav: 525000, allocation: 21, return: 16.9, change: 2.7 },
    ];

    return (
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Portfolio Value</p>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(totalValue)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Return</p>
                <p className="text-2xl font-bold text-blue-900">{formatPercentage(totalReturn)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Monthly Change</p>
                <p className="text-2xl font-bold text-purple-900">{formatPercentage(monthlyChange)}</p>
              </div>
              {monthlyChange >= 0 ? (
                <TrendingUp className="w-8 h-8 text-purple-600" />
              ) : (
                <TrendingDown className="w-8 h-8 text-purple-600" />
              )}
            </div>
          </div>
        </div>

        {/* Detailed Fund Breakdown */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Fund-by-Fund Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fund</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAV</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allocation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Return</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {detailedBreakdown.map((fund, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{fund.fund}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(fund.nav)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {fund.allocation}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        fund.return >= 15 ? 'bg-green-100 text-green-800' :
                        fund.return >= 10 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {formatPercentage(fund.return)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {fund.change >= 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                        )}
                        <span className={fund.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {formatPercentage(fund.change)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderPerformanceChartDetail = () => {
    const data = widget.data;
    const chartData = data?.chartData || [];
    
    const extendedData = [
      { month: 'Jan 2023', value: 2000000, return: 8.2, benchmark: 6.1 },
      { month: 'Feb 2023', value: 2050000, return: 2.5, benchmark: 1.8 },
      { month: 'Mar 2023', value: 2120000, return: 3.4, benchmark: 2.2 },
      { month: 'Apr 2023', value: 2080000, return: -1.9, benchmark: -0.8 },
      { month: 'May 2023', value: 2150000, return: 3.4, benchmark: 2.1 },
      { month: 'Jun 2023', value: 2200000, return: 2.3, benchmark: 1.9 },
      { month: 'Jul 2023', value: 2180000, return: -0.9, benchmark: 0.5 },
      { month: 'Aug 2023', value: 2250000, return: 3.2, benchmark: 2.8 },
      { month: 'Sep 2023', value: 2300000, return: 2.2, benchmark: 1.4 },
      { month: 'Oct 2023', value: 2350000, return: 2.2, benchmark: 1.8 },
      { month: 'Nov 2023', value: 2400000, return: 2.1, benchmark: 1.6 },
      { month: 'Dec 2023', value: 2500000, return: 4.2, benchmark: 3.1 },
    ];

    const totalReturn = ((extendedData[extendedData.length - 1].value - extendedData[0].value) / extendedData[0].value * 100);
    const benchmarkReturn = extendedData.reduce((acc, curr) => acc + curr.benchmark, 0);

    return (
      <div className="space-y-6">
        {/* Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">12-Month Performance</h3>
            <p className="text-2xl font-bold text-blue-900">{formatPercentage(totalReturn)}</p>
            <p className="text-sm text-blue-600">vs Benchmark: {formatPercentage(benchmarkReturn)}</p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-medium text-green-900 mb-2">Outperformance</h3>
            <p className="text-2xl font-bold text-green-900">{formatPercentage(totalReturn - benchmarkReturn)}</p>
            <p className="text-sm text-green-600">Above benchmark</p>
          </div>
        </div>

        {/* Monthly Performance Table */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Performance History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Portfolio Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Return</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Benchmark</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outperformance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {extendedData.map((month, index) => {
                  const outperformance = month.return - month.benchmark;
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{month.month}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(month.value)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          month.return >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {formatPercentage(month.return)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatPercentage(month.benchmark)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`font-medium ${outperformance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatPercentage(outperformance)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderAssetAllocationDetail = () => {
    const data = widget.data;
    const allocations = data?.allocations || [];

    const detailedAllocations = [
      {
        category: 'Private Equity',
        percentage: 40,
        value: 1000000,
        funds: [
          { name: 'Tech Growth Fund III', value: 600000, vintage: 2021 },
          { name: 'Healthcare Fund I', value: 400000, vintage: 2020 },
        ]
      },
      {
        category: 'Real Estate',
        percentage: 30,
        value: 750000,
        funds: [
          { name: 'Real Estate Fund II', value: 500000, vintage: 2022 },
          { name: 'REIT Portfolio', value: 250000, vintage: 2023 },
        ]
      },
      {
        category: 'Venture Capital',
        percentage: 20,
        value: 500000,
        funds: [
          { name: 'Venture Fund IV', value: 300000, vintage: 2023 },
          { name: 'Early Stage Fund', value: 200000, vintage: 2022 },
        ]
      },
      {
        category: 'Hedge Funds',
        percentage: 10,
        value: 250000,
        funds: [
          { name: 'Multi-Strategy Fund', value: 150000, vintage: 2021 },
          { name: 'Long/Short Equity', value: 100000, vintage: 2022 },
        ]
      },
    ];

    return (
      <div className="space-y-6">
        {/* Allocation Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {detailedAllocations.map((allocation, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">{allocation.category}</p>
                <p className="text-2xl font-bold text-gray-900">{allocation.percentage}%</p>
                <p className="text-sm text-gray-500">{formatCurrency(allocation.value)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Fund Breakdown */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Fund-Level Detail</h3>
          </div>
          <div className="p-6 space-y-6">
            {detailedAllocations.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h4 className="text-md font-medium text-gray-900 mb-3">{category.category}</h4>
                <div className="space-y-3">
                  {category.funds.map((fund, fundIndex) => (
                    <div key={fundIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Building className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{fund.name}</p>
                          <p className="text-sm text-gray-500">Vintage: {fund.vintage}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{formatCurrency(fund.value)}</p>
                        <p className="text-sm text-gray-500">
                          {((fund.value / category.value) * 100).toFixed(1)}% of category
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderRecentTransactionsDetail = () => {
    const extendedTransactions = [
      { date: '2024-01-15', type: 'Capital Call', fund: 'Tech Growth Fund III', amount: -50000, description: 'Series C investment in AI startup', status: 'Completed' },
      { date: '2024-01-10', type: 'Distribution', fund: 'Real Estate Fund II', amount: 75000, description: 'Quarterly distribution from office REIT portfolio', status: 'Received' },
      { date: '2024-01-05', type: 'Capital Call', fund: 'Healthcare Fund I', amount: -25000, description: 'Follow-on investment in biotech company', status: 'Completed' },
      { date: '2023-12-28', type: 'Distribution', fund: 'Venture Fund IV', amount: 45000, description: 'IPO proceeds from portfolio company exit', status: 'Received' },
      { date: '2023-12-15', type: 'Capital Call', fund: 'Real Estate Fund II', amount: -35000, description: 'Industrial property acquisition', status: 'Completed' },
      { date: '2023-12-01', type: 'Distribution', fund: 'Healthcare Fund I', amount: 28000, description: 'Recapitalization proceeds', status: 'Received' },
      { date: '2023-11-20', type: 'Capital Call', fund: 'Tech Growth Fund III', amount: -40000, description: 'Growth capital for SaaS company', status: 'Completed' },
      { date: '2023-11-15', type: 'Distribution', fund: 'Venture Fund IV', amount: 62000, description: 'Secondary sale proceeds', status: 'Received' },
    ];

    const totalDistributions = extendedTransactions
      .filter(t => t.type === 'Distribution')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalCapitalCalls = Math.abs(extendedTransactions
      .filter(t => t.type === 'Capital Call')
      .reduce((sum, t) => sum + t.amount, 0));

    return (
      <div className="space-y-6">
        {/* Transaction Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Distributions</p>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(totalDistributions)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Total Capital Calls</p>
                <p className="text-2xl font-bold text-red-900">{formatCurrency(totalCapitalCalls)}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Net Cash Flow</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(totalDistributions - totalCapitalCalls)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Detailed Transactions */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fund</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {extendedTransactions.map((transaction, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.type === 'Distribution' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.fund}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                      <span className={transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {formatCurrency(Math.abs(transaction.amount))}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderRiskAnalysisDetail = () => {
    const riskScenarios = [
      { scenario: 'Bull Market', probability: '25%', portfolioReturn: '22.5%', description: 'Strong economic growth, low interest rates' },
      { scenario: 'Base Case', probability: '50%', portfolioReturn: '15.8%', description: 'Moderate economic growth, stable markets' },
      { scenario: 'Bear Market', probability: '20%', portfolioReturn: '5.2%', description: 'Economic slowdown, market volatility' },
      { scenario: 'Severe Recession', probability: '5%', portfolioReturn: '-8.3%', description: 'Major economic downturn, high volatility' },
    ];

    const riskMetrics = [
      { metric: 'Value at Risk (95%)', value: '-12.5%', status: 'moderate', description: '95% confidence that losses will not exceed this amount' },
      { metric: 'Maximum Drawdown', value: '-8.3%', status: 'low', description: 'Largest peak-to-trough decline historically' },
      { metric: 'Beta', value: '0.85', status: 'low', description: 'Portfolio sensitivity to market movements' },
      { metric: 'Sharpe Ratio', value: '1.42', status: 'good', description: 'Risk-adjusted returns vs risk-free rate' },
      { metric: 'Sortino Ratio', value: '1.89', status: 'good', description: 'Downside risk-adjusted returns' },
      { metric: 'Information Ratio', value: '0.73', status: 'moderate', description: 'Active return per unit of tracking error' },
    ];

    return (
      <div className="space-y-6">
        {/* Risk Scenarios */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Scenario Analysis</h3>
            <p className="text-sm text-gray-600">Potential portfolio outcomes under different market conditions</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {riskScenarios.map((scenario, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-gray-900">{scenario.scenario}</h4>
                      <span className="text-sm text-gray-500">({scenario.probability} probability)</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{scenario.description}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      parseFloat(scenario.portfolioReturn) >= 15 ? 'text-green-600' :
                      parseFloat(scenario.portfolioReturn) >= 0 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {scenario.portfolioReturn}
                    </p>
                    <p className="text-xs text-gray-500">Expected Return</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Metrics Detail */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Risk Metrics Explained</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {riskMetrics.map((metric, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{metric.metric}</h4>
                    <div className="flex items-center space-x-1">
                      {metric.status === 'good' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {metric.status === 'moderate' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                      {metric.status === 'low' && <Info className="w-4 h-4 text-blue-500" />}
                      <span className={`text-sm font-medium ${
                        metric.status === 'good' ? 'text-green-600' :
                        metric.status === 'moderate' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`}>
                        {metric.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-gray-900 mb-2">{metric.value}</p>
                  <p className="text-sm text-gray-600">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMarketTrendsDetail = () => {
    const marketData = [
      { sector: 'Technology', trend: 'up', percentage: 12.5, details: 'AI and cloud computing driving growth', marketCap: '2.4T', leaders: ['Apple', 'Microsoft', 'Google'] },
      { sector: 'Healthcare', trend: 'up', percentage: 8.3, details: 'Biotech breakthroughs and aging population', marketCap: '1.8T', leaders: ['Johnson & Johnson', 'Pfizer', 'UnitedHealth'] },
      { sector: 'Real Estate', trend: 'stable', percentage: 2.1, details: 'Interest rate stabilization', marketCap: '890B', leaders: ['American Tower', 'Prologis', 'Crown Castle'] },
      { sector: 'Energy', trend: 'down', percentage: -3.2, details: 'Oil price volatility and transition to renewables', marketCap: '1.2T', leaders: ['Exxon Mobil', 'Chevron', 'ConocoPhillips'] },
      { sector: 'Financials', trend: 'up', percentage: 6.8, details: 'Rising interest rates benefiting banks', marketCap: '2.1T', leaders: ['JPMorgan Chase', 'Bank of America', 'Wells Fargo'] },
      { sector: 'Consumer Goods', trend: 'stable', percentage: 1.4, details: 'Mixed consumer spending patterns', marketCap: '1.5T', leaders: ['Procter & Gamble', 'Coca-Cola', 'Nike'] },
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-medium text-green-900 mb-2">Positive Trends</h3>
            <p className="text-2xl font-bold text-green-900">{marketData.filter(d => d.trend === 'up').length}</p>
            <p className="text-sm text-green-600">Sectors trending up</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-medium text-yellow-900 mb-2">Stable</h3>
            <p className="text-2xl font-bold text-yellow-900">{marketData.filter(d => d.trend === 'stable').length}</p>
            <p className="text-sm text-yellow-600">Sectors stable</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-medium text-red-900 mb-2">Declining</h3>
            <p className="text-2xl font-bold text-red-900">{marketData.filter(d => d.trend === 'down').length}</p>
            <p className="text-sm text-red-600">Sectors declining</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Sector Analysis</h3>
          </div>
          <div className="p-6 space-y-4">
            {marketData.map((sector, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${
                      sector.trend === 'up' ? 'bg-green-500' : 
                      sector.trend === 'down' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}></div>
                    <h4 className="font-medium text-gray-900">{sector.sector}</h4>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-bold ${
                      sector.trend === 'up' ? 'text-green-600' : 
                      sector.trend === 'down' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {sector.percentage > 0 ? '+' : ''}{sector.percentage}%
                    </span>
                    <p className="text-sm text-gray-500">Market Cap: ${sector.marketCap}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{sector.details}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-gray-500">Key Players:</span>
                  {sector.leaders.map((leader, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {leader}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderNewsDetail = () => {
    const newsArticles = [
      {
        title: 'Private Equity Market Outlook Shows Strong Growth',
        source: 'Financial Times',
        date: '2024-01-16',
        summary: 'Private equity firms raised $400B in 2023, with technology and healthcare leading sector investments.',
        impact: 'Positive',
        relevance: 'High',
        content: 'The private equity market demonstrated remarkable resilience in 2023, with total fundraising reaching $400 billion despite economic uncertainties. Technology companies continue to attract significant investment...'
      },
      {
        title: 'Real Estate Investment Trends Shift Toward Industrial Properties',
        source: 'Wall Street Journal',
        date: '2024-01-15',
        summary: 'Industrial real estate sees 15% growth as e-commerce drives demand for logistics facilities.',
        impact: 'Positive',
        relevance: 'Medium',
        content: 'The surge in e-commerce has fundamentally reshaped real estate investment priorities, with industrial properties experiencing unprecedented demand...'
      },
      {
        title: 'VC Funding Reaches New High in Q4 2023',
        source: 'TechCrunch',
        date: '2024-01-14',
        summary: 'Venture capital investments totaled $180B in 2023, with AI and fintech leading funding rounds.',
        impact: 'Positive',
        relevance: 'High',
        content: 'Venture capital activity concluded 2023 on a strong note, with fourth-quarter investments reaching record levels...'
      },
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Total Articles</h3>
            <p className="text-2xl font-bold text-blue-900">{newsArticles.length}</p>
            <p className="text-sm text-blue-600">Recent market news</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-medium text-green-900 mb-2">Positive Impact</h3>
            <p className="text-2xl font-bold text-green-900">{newsArticles.filter(n => n.impact === 'Positive').length}</p>
            <p className="text-sm text-green-600">Favorable news</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-medium text-purple-900 mb-2">High Relevance</h3>
            <p className="text-2xl font-bold text-purple-900">{newsArticles.filter(n => n.relevance === 'High').length}</p>
            <p className="text-sm text-purple-600">Highly relevant</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">News Analysis</h3>
          </div>
          <div className="p-6 space-y-6">
            {newsArticles.map((article, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-medium text-gray-900 flex-1 pr-4">{article.title}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      article.impact === 'Positive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {article.impact}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      article.relevance === 'High' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {article.relevance}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                  <span>{article.source}</span>
                  <span>•</span>
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
                <p className="text-sm font-medium text-gray-900 mb-2">{article.summary}</p>
                <p className="text-sm text-gray-600">{article.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCashFlowDetail = () => {
    const extendedCashFlow = [
      { month: 'Jan 2024', inflow: 75000, outflow: -50000, net: 25000, source: 'Real Estate Fund II Distribution', use: 'Tech Growth Fund III Capital Call' },
      { month: 'Feb 2024', inflow: 0, outflow: -30000, net: -30000, source: 'No distributions', use: 'Healthcare Fund I Capital Call' },
      { month: 'Mar 2024', inflow: 100000, outflow: -25000, net: 75000, source: 'Venture Fund IV IPO Proceeds', use: 'Real Estate Fund II Capital Call' },
      { month: 'Apr 2024', inflow: 50000, outflow: -40000, net: 10000, source: 'Healthcare Fund I Distribution', use: 'Tech Growth Fund III Follow-on' },
      { month: 'Dec 2023', inflow: 85000, outflow: -35000, net: 50000, source: 'Tech Growth Fund III Distribution', use: 'Venture Fund IV Capital Call' },
      { month: 'Nov 2023', inflow: 45000, outflow: -55000, net: -10000, source: 'Real Estate Fund II Distribution', use: 'Multiple Capital Calls' },
    ];

    const totalInflow = extendedCashFlow.reduce((sum, flow) => sum + flow.inflow, 0);
    const totalOutflow = extendedCashFlow.reduce((sum, flow) => sum + flow.outflow, 0);
    const netCashFlow = totalInflow + totalOutflow;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Inflows</p>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(totalInflow)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Total Outflows</p>
                <p className="text-2xl font-bold text-red-900">{formatCurrency(Math.abs(totalOutflow))}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Net Cash Flow</p>
                <p className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-blue-900' : 'text-red-900'}`}>
                  {formatCurrency(netCashFlow)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Detailed Cash Flow History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inflows</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outflows</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Primary Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Primary Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {extendedCashFlow.map((flow, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{flow.month}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                      {flow.inflow > 0 ? formatCurrency(flow.inflow) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                      {flow.outflow < 0 ? formatCurrency(Math.abs(flow.outflow)) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                      <span className={flow.net >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {formatCurrency(flow.net)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{flow.source}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{flow.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderDetailContent = () => {
    switch (widget.type) {
      case 'portfolio-overview':
        return renderPortfolioOverviewDetail();
      case 'performance-chart':
        return renderPerformanceChartDetail();
      case 'asset-allocation':
        return renderAssetAllocationDetail();
      case 'recent-transactions':
        return renderRecentTransactionsDetail();
      case 'risk-analysis':
        return renderRiskAnalysisDetail();
      case 'market-trends':
        return renderMarketTrendsDetail();
      case 'news-feed':
        return renderNewsDetail();
      case 'cash-flow':
        return renderCashFlowDetail();
      default:
        return (
          <div className="text-center py-12">
            <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Detailed view coming soon</h3>
            <p className="text-gray-600">This widget type doesn't have a detailed view yet.</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{widget.title}</h2>
            <p className="text-sm text-gray-600 mt-1">Detailed analysis and breakdown</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {renderDetailContent()}
        </div>
      </div>
    </div>
  );
};

export default WidgetDetailModal;