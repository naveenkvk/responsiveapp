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
  User
} from 'lucide-react';
import { Document, DocumentSearchResult } from '../types';

const DocumentVault: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Fund Level' | 'Investor Specific'>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<DocumentSearchResult[]>([]);

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
    </div>
  );
};

export default DocumentVault;