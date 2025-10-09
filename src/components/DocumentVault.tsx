import React, { useState } from 'react';
import { 
  Search, 
  Upload, 
  Filter, 
  FileText, 
  Calendar, 
  Tag, 
  Download, 
  Eye, 
  Sparkles,
  Folder,
  Clock,
  User,
  Brain,
  X,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Document, DocumentSearchResult } from '../types';

interface DocumentSummary {
  id: string;
  title: string;
  keyPoints: string[];
  executiveSummary: string;
  financialHighlights?: {
    label: string;
    value: string;
    trend?: 'positive' | 'negative' | 'neutral';
  }[];
  riskFactors?: string[];
  nextSteps?: string[];
  generatedAt: Date;
}

const DocumentVault: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Fund Level' | 'Investor Specific'>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<DocumentSearchResult[]>([]);
  const [selectedDocumentForSummary, setSelectedDocumentForSummary] = useState<Document | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [documentSummary, setDocumentSummary] = useState<DocumentSummary | null>(null);

  // Sample documents data
  const sampleDocuments: Document[] = [
    {
      id: '1',
      title: 'Tech Growth Fund III - Q4 2023 Quarterly Report',
      type: 'quarterly-report',
      category: 'Fund Level',
      uploadDate: new Date('2024-01-15'),
      size: 2840000,
      description: 'Comprehensive quarterly performance report including portfolio updates and market analysis',
      tags: ['Q4 2023', 'performance', 'portfolio', 'tech'],
      fundName: 'Tech Growth Fund III',
      quarter: 'Q4',
      year: 2023,
    },
    {
      id: '2',
      title: 'K-1 Tax Form 2023 - Healthcare Fund I',
      type: 'tax-form',
      category: 'Investor Specific',
      uploadDate: new Date('2024-02-28'),
      size: 450000,
      description: 'Annual K-1 tax documentation for Healthcare Fund I investment',
      tags: ['K-1', '2023', 'tax', 'healthcare'],
      fundName: 'Healthcare Fund I',
      year: 2023,
    },
    {
      id: '3',
      title: 'Real Estate Fund II - Capital Call Notice',
      type: 'fund-document',
      category: 'Fund Level',
      uploadDate: new Date('2024-01-05'),
      size: 180000,
      description: 'Capital call notice for upcoming real estate acquisition opportunities',
      tags: ['capital call', 'real estate', 'funding'],
      fundName: 'Real Estate Fund II',
    },
    {
      id: '4',
      title: 'Limited Partnership Agreement - Venture Fund IV',
      type: 'legal-document',
      category: 'Investor Specific',
      uploadDate: new Date('2023-12-20'),
      size: 3200000,
      description: 'Complete limited partnership agreement and investment terms',
      tags: ['LPA', 'legal', 'venture', 'agreement'],
      fundName: 'Venture Fund IV',
    },
    {
      id: '5',
      title: 'Annual Investor Letter 2023',
      type: 'investor-letter',
      category: 'Fund Level',
      uploadDate: new Date('2024-03-01'),
      size: 850000,
      description: 'Annual review of portfolio performance and market outlook',
      tags: ['annual', 'investor letter', '2023', 'review'],
      year: 2023,
    }
  ];

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getTypeIcon = (type: Document['type']) => {
    switch (type) {
      case 'quarterly-report':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'tax-form':
        return <Calendar className="w-5 h-5 text-green-600" />;
      case 'fund-document':
        return <Folder className="w-5 h-5 text-purple-600" />;
      case 'legal-document':
        return <FileText className="w-5 h-5 text-red-600" />;
      case 'investor-letter':
        return <User className="w-5 h-5 text-orange-600" />;
      case 'agreement':
        return <FileText className="w-5 h-5 text-gray-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: Document['type']) => {
    switch (type) {
      case 'quarterly-report':
        return 'bg-blue-100 text-blue-800';
      case 'tax-form':
        return 'bg-green-100 text-green-800';
      case 'fund-document':
        return 'bg-purple-100 text-purple-800';
      case 'legal-document':
        return 'bg-red-100 text-red-800';
      case 'investor-letter':
        return 'bg-orange-100 text-orange-800';
      case 'agreement':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const simulateAISearch = async (query: string) => {
    setIsSearching(true);
    
    // Simulate AI search with delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const results: DocumentSearchResult[] = sampleDocuments
      .filter(doc => {
        const searchLower = query.toLowerCase();
        return (
          doc.title.toLowerCase().includes(searchLower) ||
          doc.description?.toLowerCase().includes(searchLower) ||
          doc.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
          doc.fundName?.toLowerCase().includes(searchLower)
        );
      })
      .map(doc => ({
        document: doc,
        relevanceScore: Math.random() * 0.3 + 0.7, // 0.7-1.0 relevance
        matchedContent: `...${doc.description?.substring(0, 100)}...`,
        summary: `AI Summary: This document contains key information about ${doc.fundName || 'the fund'} including ${doc.type.replace('-', ' ')} details and relevant financial data.`
      }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

    setSearchResults(results);
    setIsSearching(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      simulateAISearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  };

  const generateAISummary = async (document: Document): Promise<DocumentSummary> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate different summaries based on document type
    const summaries: Record<string, Partial<DocumentSummary>> = {
      'quarterly-report': {
        keyPoints: [
          'Portfolio performance exceeded benchmarks by 2.3% in Q4 2023',
          'Three new investments completed totaling $125M in committed capital',
          'Two portfolio companies achieved successful exits generating 3.2x returns',
          'Fund is 85% deployed with strong pipeline for remaining capital'
        ],
        executiveSummary: 'This quarterly report demonstrates strong fund performance with notable outperformance against benchmarks and successful portfolio management. The fund continues to execute its investment strategy effectively with disciplined capital deployment and value creation initiatives.',
        financialHighlights: [
          { label: 'Quarterly Return', value: '+8.7%', trend: 'positive' },
          { label: 'YTD Performance', value: '+15.2%', trend: 'positive' },
          { label: 'Total Fund Size', value: '$500M', trend: 'neutral' },
          { label: 'Deployed Capital', value: '85%', trend: 'positive' }
        ],
        riskFactors: [
          'Market volatility may impact near-term valuations',
          'Interest rate environment affecting growth company multiples'
        ],
        nextSteps: [
          'Complete due diligence on two pipeline opportunities',
          'Prepare for annual investor meeting in Q1 2024'
        ]
      },
      'tax-form': {
        keyPoints: [
          'K-1 form reflects $45,000 in taxable income allocation',
          'Ordinary income: $12,000 from fund operations',
          'Capital gains: $33,000 from portfolio company exits',
          'No passive activity limitations apply to this investment'
        ],
        executiveSummary: 'This K-1 tax form summarizes your tax obligations from Healthcare Fund I for the 2023 tax year. The allocation includes both ordinary income from fund operations and capital gains from successful portfolio exits.',
        financialHighlights: [
          { label: 'Total Taxable Income', value: '$45,000', trend: 'neutral' },
          { label: 'Ordinary Income', value: '$12,000', trend: 'neutral' },
          { label: 'Capital Gains', value: '$33,000', trend: 'positive' },
          { label: 'Tax Credits', value: '$0', trend: 'neutral' }
        ],
        nextSteps: [
          'Consult with tax advisor for proper reporting',
          'Include in Schedule K-1 of personal tax return'
        ]
      },
      'fund-document': {
        keyPoints: [
          'Capital call of $2.5M requested for Real Estate Fund II',
          'Funding required for two industrial property acquisitions',
          'Properties located in high-growth logistics markets',
          'Payment due within 10 business days of notice'
        ],
        executiveSummary: 'This capital call notice requests additional funding to support strategic real estate acquisitions in the industrial logistics sector, aligning with the fund\'s investment thesis of capitalizing on e-commerce growth.',
        financialHighlights: [
          { label: 'Capital Call Amount', value: '$2.5M', trend: 'neutral' },
          { label: 'Total Fund Commitment', value: '$25M', trend: 'neutral' },
          { label: 'Called to Date', value: '68%', trend: 'positive' },
          { label: 'Expected IRR', value: '12-15%', trend: 'positive' }
        ],
        nextSteps: [
          'Transfer funds by specified due date',
          'Review acquisition details in attached materials'
        ]
      },
      'legal-document': {
        keyPoints: [
          'Limited Partnership Agreement establishes fund structure and terms',
          'Management fee: 2% annually on committed capital',
          'Carried interest: 20% above 8% preferred return threshold',
          'Investment period: 5 years with potential 2-year extension'
        ],
        executiveSummary: 'This Limited Partnership Agreement outlines the legal structure, economic terms, and governance provisions for Venture Fund IV, establishing the relationship between the general partner and limited partners.',
        riskFactors: [
          'Venture investments carry high risk of total loss',
          'Illiquid investment with limited redemption rights',
          'Concentrated exposure to early-stage technology companies'
        ],
        nextSteps: [
          'Execute signature pages and return to fund administrator',
          'Wire initial capital commitment as specified'
        ]
      },
      'investor-letter': {
        keyPoints: [
          'Fund portfolio generated 18.5% net return for 2023',
          'Market outlook remains cautiously optimistic for 2024',
          'ESG initiatives integrated across all portfolio companies',
          'Two new senior investment professionals joined the team'
        ],
        executiveSummary: 'The annual investor letter provides a comprehensive review of fund performance, market conditions, and strategic initiatives undertaken during 2023, while outlining the investment team\'s perspective for the coming year.',
        financialHighlights: [
          { label: '2023 Net Return', value: '+18.5%', trend: 'positive' },
          { label: '5-Year IRR', value: '+14.2%', trend: 'positive' },
          { label: 'Portfolio Companies', value: '23 active', trend: 'neutral' },
          { label: 'Assets Under Management', value: '$850M', trend: 'positive' }
        ],
        nextSteps: [
          'Annual investor meeting scheduled for March 2024',
          'Q1 2024 quarterly report expected in April'
        ]
      }
    };

    const baseSummary = summaries[document.type] || {
      keyPoints: [
        'Document contains important fund-related information',
        'Review recommended for investment decision making',
        'Contains regulatory and compliance information'
      ],
      executiveSummary: `This ${document.type.replace('-', ' ')} document contains important information related to ${document.fundName || 'your investment'}. Review is recommended to stay informed about fund operations and performance.`,
      nextSteps: [
        'Review document contents thoroughly',
        'Contact fund manager with any questions'
      ]
    };

    return {
      id: document.id,
      title: document.title,
      keyPoints: baseSummary.keyPoints || [],
      executiveSummary: baseSummary.executiveSummary || '',
      financialHighlights: baseSummary.financialHighlights,
      riskFactors: baseSummary.riskFactors,
      nextSteps: baseSummary.nextSteps,
      generatedAt: new Date()
    };
  };

  const handleAISummary = async (document: Document) => {
    setSelectedDocumentForSummary(document);
    setIsGeneratingSummary(true);
    setDocumentSummary(null);
    
    try {
      const summary = await generateAISummary(document);
      setDocumentSummary(summary);
    } catch (error) {
      console.error('Failed to generate summary:', error);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const closeSummaryModal = () => {
    setSelectedDocumentForSummary(null);
    setDocumentSummary(null);
    setIsGeneratingSummary(false);
  };

  const filteredDocuments = sampleDocuments.filter(doc => {
    const categoryMatch = selectedCategory === 'All' || doc.category === selectedCategory;
    const typeMatch = selectedType === 'All' || doc.type === selectedType;
    return categoryMatch && typeMatch;
  });

  const displayDocuments = searchQuery.trim() ? searchResults.map(r => r.document) : filteredDocuments;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Secure Document Vault</h2>
          <p className="text-gray-600 mt-1">Centralized repository for fund-level and investor-specific documents</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
            <Upload className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* AI-Powered Search */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary-500" />
            <h3 className="text-lg font-semibold text-gray-900">AI-Powered Document Search</h3>
          </div>
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents, ask questions, or request summaries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 transition-colors"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
          {searchQuery && (
            <p className="text-sm text-gray-600 mt-2">
              ✨ AI will analyze document content and provide intelligent search results with summaries
            </p>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Categories</option>
              <option value="Fund Level">Fund Level</option>
              <option value="Investor Specific">Investor Specific</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Type:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Types</option>
              <option value="quarterly-report">Quarterly Reports</option>
              <option value="tax-form">Tax Forms</option>
              <option value="fund-document">Fund Documents</option>
              <option value="legal-document">Legal Documents</option>
              <option value="investor-letter">Investor Letters</option>
              <option value="agreement">Agreements</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Results or Document List */}
      <div className="space-y-4">
        {searchQuery.trim() && searchResults.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800 font-medium">
                AI found {searchResults.length} relevant document{searchResults.length !== 1 ? 's' : ''} with summaries
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {displayDocuments.map((document) => {
            const searchResult = searchResults.find(r => r.document.id === document.id);
            
            return (
              <div key={document.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="mt-1">
                      {getTypeIcon(document.type)}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">{document.title}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded ${getTypeColor(document.type)}`}>
                            {document.type.replace('-', ' ').toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded ${
                            document.category === 'Fund Level' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {document.category}
                          </span>
                        </div>
                      </div>

                      {document.description && (
                        <p className="text-gray-600 text-sm">{document.description}</p>
                      )}

                      {/* AI Summary for search results */}
                      {searchResult?.summary && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <div className="flex items-start space-x-2">
                            <Sparkles className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-yellow-800 font-medium mb-1">AI Summary</p>
                              <p className="text-sm text-yellow-700">{searchResult.summary}</p>
                              {searchResult.relevanceScore && (
                                <div className="mt-2">
                                  <div className="text-xs text-yellow-600">
                                    Relevance: {Math.round(searchResult.relevanceScore * 100)}%
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Document metadata */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{document.uploadDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText className="w-4 h-4" />
                          <span>{formatFileSize(document.size)}</span>
                        </div>
                        {document.fundName && (
                          <div className="flex items-center space-x-1">
                            <Folder className="w-4 h-4" />
                            <span>{document.fundName}</span>
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {document.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            <Tag className="w-3 h-3" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    <button 
                      onClick={() => handleAISummary(document)}
                      className="p-2 text-purple-500 hover:text-purple-700 hover:bg-purple-50 rounded transition-colors"
                      title="AI Summary"
                    >
                      <Brain className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {displayDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery.trim() ? 'No documents found' : 'No documents match the selected filters'}
            </h3>
            <p className="text-gray-600">
              {searchQuery.trim() 
                ? 'Try adjusting your search terms or clearing filters' 
                : 'Try changing the category or document type filters'}
            </p>
          </div>
        )}
      </div>

      {/* AI Summary Modal */}
      {selectedDocumentForSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999] overflow-hidden">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col relative">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <Brain className="w-6 h-6 text-purple-600" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">AI Document Summary</h2>
                  <p className="text-sm text-gray-600">Intelligent analysis powered by AI</p>
                </div>
              </div>
              <button
                onClick={closeSummaryModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                title="Close"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-0">
              {/* Document Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {getTypeIcon(selectedDocumentForSummary.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {selectedDocumentForSummary.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                      <span>{selectedDocumentForSummary.category}</span>
                      <span>•</span>
                      <span>{formatFileSize(selectedDocumentForSummary.size)}</span>
                      <span>•</span>
                      <span>{selectedDocumentForSummary.uploadDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {isGeneratingSummary && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center space-x-3">
                    <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">Generating AI Summary...</p>
                      <p className="text-sm text-gray-600">Analyzing document content and extracting key insights</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Summary Content */}
              {documentSummary && !isGeneratingSummary && (
                <div className="space-y-6">
                  {/* Executive Summary */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="flex items-center space-x-2 font-semibold text-purple-900 mb-3">
                      <Sparkles className="w-5 h-5" />
                      <span>Executive Summary</span>
                    </h4>
                    <p className="text-purple-800 leading-relaxed">{documentSummary.executiveSummary}</p>
                  </div>

                  {/* Key Points */}
                  <div>
                    <h4 className="flex items-center space-x-2 font-semibold text-gray-900 mb-3">
                      <ChevronRight className="w-5 h-5 text-blue-600" />
                      <span>Key Points</span>
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {documentSummary.keyPoints.map((point, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-blue-900 text-sm">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Financial Highlights */}
                  {documentSummary.financialHighlights && (
                    <div>
                      <h4 className="flex items-center space-x-2 font-semibold text-gray-900 mb-3">
                        <ChevronRight className="w-5 h-5 text-green-600" />
                        <span>Financial Highlights</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {documentSummary.financialHighlights.map((highlight, index) => (
                          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-600">{highlight.label}</span>
                              <span className={`text-lg font-bold ${
                                highlight.trend === 'positive' ? 'text-green-600' :
                                highlight.trend === 'negative' ? 'text-red-600' :
                                'text-gray-900'
                              }`}>
                                {highlight.value}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Risk Factors */}
                  {documentSummary.riskFactors && (
                    <div>
                      <h4 className="flex items-center space-x-2 font-semibold text-gray-900 mb-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <span>Risk Factors</span>
                      </h4>
                      <div className="space-y-2">
                        {documentSummary.riskFactors.map((risk, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <p className="text-red-800 text-sm">{risk}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Next Steps */}
                  {documentSummary.nextSteps && (
                    <div>
                      <h4 className="flex items-center space-x-2 font-semibold text-gray-900 mb-3">
                        <ChevronRight className="w-5 h-5 text-orange-600" />
                        <span>Recommended Next Steps</span>
                      </h4>
                      <div className="space-y-2">
                        {documentSummary.nextSteps.map((step, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                              {index + 1}
                            </div>
                            <p className="text-orange-800 text-sm">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-xs text-gray-500">
                      Summary generated on {documentSummary.generatedAt.toLocaleDateString()} at {documentSummary.generatedAt.toLocaleTimeString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      ✨ Powered by AI • Analysis is for informational purposes only
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {documentSummary && !isGeneratingSummary && (
              <div className="border-t border-gray-200 p-4 sm:p-6 flex-shrink-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Brain className="w-4 h-4 text-purple-500" />
                    <span>AI-generated summary • Please verify important details</span>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={closeSummaryModal}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Close
                    </button>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      View Full Document
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentVault;