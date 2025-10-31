import React, { useEffect } from 'react';
import { 
  X, 
  Building2, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Users, 
  FileText, 
  MapPin,
  Activity,
  PieChart,
  BarChart3,
  Download,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Fund } from '../types';

interface FundDetailsModalProps {
  fund: Fund | null;
  isOpen: boolean;
  onClose: () => void;
}

const FundDetailsModal: React.FC<FundDetailsModalProps> = ({ fund, isOpen, onClose }) => {
  // Handle Escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle click outside modal
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !fund) return null;

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const getStatusColor = (status: Fund['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-blue-100 text-blue-800';
      case 'liquidating':
        return 'bg-yellow-100 text-yellow-800';
      case 'fully-realized':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: Fund['type']) => {
    switch (type) {
      case 'private-equity':
        return <Building2 className="w-5 h-5 text-blue-600" />;
      case 'venture-capital':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'real-estate':
        return <MapPin className="w-5 h-5 text-orange-600" />;
      case 'hedge-fund':
        return <BarChart3 className="w-5 h-5 text-purple-600" />;
      case 'credit':
        return <DollarSign className="w-5 h-5 text-red-600" />;
      case 'infrastructure':
        return <Activity className="w-5 h-5 text-gray-600" />;
      default:
        return <PieChart className="w-5 h-5 text-gray-600" />;
    }
  };

  const calledPercentage = (fund.called / fund.commitment) * 100;
  const remainingCommitment = fund.commitment - fund.called;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-[9999] overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="flex items-center justify-center min-h-full p-4">
        <div 
          className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[95vh] flex flex-col my-8"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              {getTypeIcon(fund.type)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{fund.name}</h2>
              <div className="flex items-center space-x-4 mt-1">
                <span className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(fund.status)}`}>
                  {fund.status.replace('-', ' ').toUpperCase()}
                </span>
                <span className="text-sm text-gray-600">{fund.type.replace('-', ' ').toUpperCase()}</span>
                <span className="text-sm text-gray-600">Vintage {fund.vintage}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            title="Close (Esc)"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 min-h-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Key Metrics */}
            <div className="lg:col-span-2 space-y-6">
              {/* Fund Overview */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Fund Overview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(fund.commitment)}</div>
                    <div className="text-sm text-gray-600">Your Commitment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(fund.called)}</div>
                    <div className="text-sm text-gray-600">Called Capital</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(fund.distributed)}</div>
                    <div className="text-sm text-gray-600">Distributions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{formatCurrency(fund.currentValue)}</div>
                    <div className="text-sm text-gray-600">Current NAV</div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{formatPercentage(fund.irr)}</div>
                    <div className="text-sm text-gray-600">Net IRR</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{fund.multiple.toFixed(2)}x</div>
                    <div className="text-sm text-gray-600">Total Multiple</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{calledPercentage.toFixed(0)}%</div>
                    <div className="text-sm text-gray-600">Capital Called</div>
                  </div>
                </div>
              </div>

              {/* Capital Activity */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Capital Activity</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Commitment</span>
                    <span className="font-semibold">{formatCurrency(fund.commitment)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Called to Date</span>
                    <span className="font-semibold text-blue-600">{formatCurrency(fund.called)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Remaining Commitment</span>
                    <span className="font-semibold text-orange-600">{formatCurrency(remainingCommitment)}</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-3">
                    <span className="text-gray-600">Total Distributed</span>
                    <span className="font-semibold text-green-600">{formatCurrency(fund.distributed)}</span>
                  </div>
                </div>
                
                {/* Capital Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Capital Called Progress</span>
                    <span>{calledPercentage.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(calledPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {fund.recentActivity.slice(0, 5).map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="mt-1">
                        {activity.type === 'capital-call' && <DollarSign className="w-4 h-4 text-red-500" />}
                        {activity.type === 'distribution' && <TrendingUp className="w-4 h-4 text-green-500" />}
                        {activity.type === 'nav-update' && <BarChart3 className="w-4 h-4 text-blue-500" />}
                        {activity.type === 'portfolio-update' && <Activity className="w-4 h-4 text-purple-500" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                          {activity.amount && (
                            <span className={`text-sm font-semibold ${
                              activity.type === 'distribution' ? 'text-green-600' : 
                              activity.type === 'capital-call' ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {activity.type === 'capital-call' ? '-' : ''}{formatCurrency(activity.amount)}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{activity.date.toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Fund Details */}
            <div className="space-y-6">
              {/* Fund Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Fund Details</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Strategy</div>
                    <div className="font-medium">{fund.strategy}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Geography</div>
                    <div className="font-medium">{fund.geography}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Fund Size</div>
                    <div className="font-medium">{formatCurrency(fund.fundSize)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">General Partner</div>
                    <div className="font-medium">{fund.generalPartner}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Fund Manager</div>
                    <div className="font-medium">{fund.fundManager}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Inception Date</div>
                    <div className="font-medium">{fund.inception.toLocaleDateString()}</div>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Management Fee</span>
                    <span className="font-medium">{fund.managementFee}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Carried Interest</span>
                    <span className="font-medium">{fund.carriedInterest}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Preferred Return</span>
                    <span className="font-medium">{fund.preferredReturn}%</span>
                  </div>
                </div>
              </div>

              {/* Key Personnel */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Personnel</h3>
                <div className="space-y-3">
                  {fund.keyPersonnel.map((person, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{person.name}</div>
                        <div className="text-sm text-gray-600">{person.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Documents */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Documents</h3>
                <div className="space-y-3">
                  {fund.documents.slice(0, 5).map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                          <div className="text-xs text-gray-500">{doc.date.toLocaleDateString()}</div>
                        </div>
                      </div>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Download className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Last updated: {fund.recentActivity[0]?.date.toLocaleDateString()}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <ExternalLink className="w-4 h-4" />
                <span>View Full Report</span>
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default FundDetailsModal;