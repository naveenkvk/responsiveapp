import { Fund } from '../types';

export const fundData: Record<string, Fund> = {
  'Tech Growth Fund III': {
    id: 'tgf3',
    name: 'Tech Growth Fund III',
    type: 'venture-capital',
    vintage: 2023,
    status: 'active',
    strategy: 'Growth-stage technology investments in B2B SaaS, fintech, and healthcare tech',
    geography: 'North America & Europe',
    commitment: 5000000, // $5M commitment
    called: 3200000, // $3.2M called
    distributed: 800000, // $800K distributed
    currentValue: 4500000, // $4.5M current NAV
    irr: 24.8,
    multiple: 1.66,
    fundSize: 500000000, // $500M total fund
    managementFee: 2.0,
    carriedInterest: 20,
    preferredReturn: 8,
    generalPartner: 'Growth Capital Partners',
    fundManager: 'Sarah Chen',
    inception: new Date('2023-01-15'),
    description: 'Leading venture capital fund focused on growth-stage technology companies with proven business models and strong market traction.',
    keyPersonnel: [
      {
        name: 'Sarah Chen',
        role: 'Managing Partner',
        email: 'sarah.chen@growthcap.com'
      },
      {
        name: 'Michael Rodriguez',
        role: 'Investment Partner',
        email: 'michael.r@growthcap.com'
      },
      {
        name: 'David Park',
        role: 'Operating Partner',
        email: 'david.park@growthcap.com'
      }
    ],
    portfolioCompanies: [
      {
        name: 'CloudSync Technologies',
        sector: 'B2B SaaS',
        investmentDate: new Date('2023-06-15'),
        investmentAmount: 800000,
        currentValue: 1200000,
        status: 'active'
      },
      {
        name: 'FinanceFlow AI',
        sector: 'Fintech',
        investmentDate: new Date('2023-09-20'),
        investmentAmount: 1200000,
        currentValue: 1800000,
        status: 'active'
      },
      {
        name: 'HealthStream Analytics',
        sector: 'Healthcare Tech',
        investmentDate: new Date('2024-02-10'),
        investmentAmount: 600000,
        currentValue: 900000,
        status: 'active'
      }
    ],
    recentActivity: [
      {
        date: new Date('2025-09-15'),
        type: 'capital-call',
        description: 'Capital call for FinanceFlow AI Series B follow-on investment',
        amount: 800000
      },
      {
        date: new Date('2025-08-28'),
        type: 'distribution',
        description: 'Partial exit distribution from CloudSync Technologies secondary sale',
        amount: 400000
      },
      {
        date: new Date('2025-08-15'),
        type: 'nav-update',
        description: 'Q2 2025 NAV update - portfolio revaluation',
      },
      {
        date: new Date('2025-07-20'),
        type: 'portfolio-update',
        description: 'New investment: HealthStream Analytics Series A',
        amount: 600000
      }
    ],
    documents: [
      {
        type: 'quarterly-report',
        name: 'Q3 2025 Quarterly Report',
        date: new Date('2025-10-01')
      },
      {
        type: 'capital-call-notice',
        name: 'Capital Call Notice - October 2025',
        date: new Date('2025-09-25')
      },
      {
        type: 'k1-tax-form',
        name: 'K-1 Tax Form 2024',
        date: new Date('2025-03-15')
      }
    ]
  },
  'Healthcare Fund I': {
    id: 'hf1',
    name: 'Healthcare Fund I',
    type: 'private-equity',
    vintage: 2022,
    status: 'active',
    strategy: 'Healthcare services and medical technology buyouts and growth investments',
    geography: 'United States',
    commitment: 8000000, // $8M commitment
    called: 6400000, // $6.4M called
    distributed: 1200000, // $1.2M distributed
    currentValue: 9500000, // $9.5M current NAV
    irr: 18.5,
    multiple: 1.68,
    fundSize: 750000000, // $750M total fund
    managementFee: 2.0,
    carriedInterest: 20,
    preferredReturn: 8,
    generalPartner: 'Healthcare Capital LLC',
    fundManager: 'Dr. Emma Thompson',
    inception: new Date('2022-03-01'),
    description: 'Specialized private equity fund investing in healthcare services, medical devices, and healthcare IT companies.',
    keyPersonnel: [
      {
        name: 'Dr. Emma Thompson',
        role: 'Managing Partner',
        email: 'emma.thompson@healthcap.com'
      },
      {
        name: 'John Martinez',
        role: 'Principal',
        email: 'john.martinez@healthcap.com'
      },
      {
        name: 'Lisa Wang',
        role: 'Operating Partner',
        email: 'lisa.wang@healthcap.com'
      }
    ],
    portfolioCompanies: [
      {
        name: 'Regional Medical Centers',
        sector: 'Healthcare Services',
        investmentDate: new Date('2022-08-15'),
        investmentAmount: 2500000,
        currentValue: 3800000,
        status: 'active'
      },
      {
        name: 'MedDevice Solutions',
        sector: 'Medical Technology',
        investmentDate: new Date('2023-01-20'),
        investmentAmount: 1800000,
        currentValue: 2200000,
        status: 'active'
      },
      {
        name: 'CareConnect Platform',
        sector: 'Healthcare IT',
        investmentDate: new Date('2023-06-10'),
        investmentAmount: 1200000,
        currentValue: 1600000,
        status: 'active'
      }
    ],
    recentActivity: [
      {
        date: new Date('2025-10-05'),
        type: 'capital-call',
        description: 'Capital call for MedDevice Solutions expansion financing',
        amount: 1200000
      },
      {
        date: new Date('2025-09-20'),
        type: 'nav-update',
        description: 'Q3 2025 NAV update - strong portfolio performance',
      },
      {
        date: new Date('2025-08-15'),
        type: 'distribution',
        description: 'Dividend distribution from Regional Medical Centers',
        amount: 600000
      }
    ],
    documents: [
      {
        type: 'quarterly-report',
        name: 'Q3 2025 Quarterly Report',
        date: new Date('2025-10-01')
      },
      {
        type: 'capital-call-notice',
        name: 'Capital Call Notice - October 2025',
        date: new Date('2025-10-01')
      },
      {
        type: 'annual-report',
        name: 'Annual Report 2024',
        date: new Date('2025-03-31')
      }
    ]
  },
  'Real Estate Fund II': {
    id: 'ref2',
    name: 'Real Estate Fund II',
    type: 'real-estate',
    vintage: 2021,
    status: 'active',
    strategy: 'Opportunistic real estate investments in industrial, multifamily, and office properties',
    geography: 'Major US Metropolitan Areas',
    commitment: 10000000, // $10M commitment
    called: 8500000, // $8.5M called
    distributed: 2800000, // $2.8M distributed
    currentValue: 12500000, // $12.5M current NAV
    irr: 16.2,
    multiple: 1.8,
    fundSize: 1200000000, // $1.2B total fund
    managementFee: 1.5,
    carriedInterest: 20,
    preferredReturn: 7,
    generalPartner: 'Metro Real Estate Partners',
    fundManager: 'James Wilson',
    inception: new Date('2021-06-01'),
    description: 'Opportunistic real estate fund targeting value-add and development opportunities in high-growth markets.',
    keyPersonnel: [
      {
        name: 'James Wilson',
        role: 'Managing Partner',
        email: 'james.wilson@metroreal.com'
      },
      {
        name: 'Rachel Kim',
        role: 'Investment Director',
        email: 'rachel.kim@metroreal.com'
      },
      {
        name: 'Tom Anderson',
        role: 'Asset Management Partner',
        email: 'tom.anderson@metroreal.com'
      }
    ],
    portfolioCompanies: [
      {
        name: 'Logistics Center Portfolio',
        sector: 'Industrial',
        investmentDate: new Date('2021-09-15'),
        investmentAmount: 3500000,
        currentValue: 5200000,
        status: 'active'
      },
      {
        name: 'Urban Multifamily Complex',
        sector: 'Multifamily',
        investmentDate: new Date('2022-02-20'),
        investmentAmount: 2800000,
        currentValue: 3800000,
        status: 'active'
      },
      {
        name: 'Downtown Office Tower',
        sector: 'Office',
        investmentDate: new Date('2022-08-10'),
        investmentAmount: 2200000,
        currentValue: 2600000,
        status: 'active'
      }
    ],
    recentActivity: [
      {
        date: new Date('2025-09-28'),
        type: 'distribution',
        description: 'Quarterly distribution from Logistics Center Portfolio',
        amount: 1500000
      },
      {
        date: new Date('2025-09-10'),
        type: 'nav-update',
        description: 'Q3 2025 property appraisal updates',
      },
      {
        date: new Date('2025-08-20'),
        type: 'capital-call',
        description: 'Capital call for Downtown Office Tower renovation',
        amount: 800000
      }
    ],
    documents: [
      {
        type: 'quarterly-report',
        name: 'Q3 2025 Quarterly Report',
        date: new Date('2025-10-01')
      },
      {
        type: 'distribution-notice',
        name: 'Distribution Notice - September 2025',
        date: new Date('2025-09-25')
      },
      {
        type: 'annual-report',
        name: 'Annual Report 2024',
        date: new Date('2025-03-31')
      }
    ]
  },
  'Venture Fund IV': {
    id: 'vf4',
    name: 'Venture Fund IV',
    type: 'venture-capital',
    vintage: 2024,
    status: 'active',
    strategy: 'Early-stage technology investments in AI/ML, cybersecurity, and enterprise software',
    geography: 'Silicon Valley & Boston',
    commitment: 3000000, // $3M commitment
    called: 1500000, // $1.5M called
    distributed: 0, // No distributions yet
    currentValue: 2100000, // $2.1M current NAV
    irr: 28.5,
    multiple: 1.4,
    fundSize: 300000000, // $300M total fund
    managementFee: 2.5,
    carriedInterest: 25,
    preferredReturn: 8,
    generalPartner: 'Silicon Valley Ventures',
    fundManager: 'Alex Chen',
    inception: new Date('2024-01-01'),
    description: 'Early-stage venture fund focused on disruptive technology companies with strong technical teams.',
    keyPersonnel: [
      {
        name: 'Alex Chen',
        role: 'Managing Partner',
        email: 'alex.chen@svventures.com'
      },
      {
        name: 'Maria Santos',
        role: 'Partner',
        email: 'maria.santos@svventures.com'
      },
      {
        name: 'Kevin Liu',
        role: 'Principal',
        email: 'kevin.liu@svventures.com'
      }
    ],
    portfolioCompanies: [
      {
        name: 'AI Security Labs',
        sector: 'Cybersecurity',
        investmentDate: new Date('2024-04-15'),
        investmentAmount: 600000,
        currentValue: 900000,
        status: 'active'
      },
      {
        name: 'DataFlow Enterprise',
        sector: 'Enterprise Software',
        investmentDate: new Date('2024-08-20'),
        investmentAmount: 500000,
        currentValue: 700000,
        status: 'active'
      }
    ],
    recentActivity: [
      {
        date: new Date('2025-09-05'),
        type: 'capital-call',
        description: 'Capital call for new investment in AI Security Labs Series A',
        amount: 750000
      },
      {
        date: new Date('2025-08-15'),
        type: 'portfolio-update',
        description: 'New investment: DataFlow Enterprise seed round',
        amount: 500000
      },
      {
        date: new Date('2025-07-20'),
        type: 'nav-update',
        description: 'Q2 2025 portfolio valuation update',
      }
    ],
    documents: [
      {
        type: 'quarterly-report',
        name: 'Q3 2025 Quarterly Report',
        date: new Date('2025-10-01')
      },
      {
        type: 'capital-call-notice',
        name: 'Capital Call Notice - September 2025',
        date: new Date('2025-09-01')
      }
    ]
  }
};

export const getFundByName = (fundName: string): Fund | null => {
  return fundData[fundName] || null;
};