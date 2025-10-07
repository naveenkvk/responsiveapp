import React from 'react';
import { Shield, Phone, Mail, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BrandedFooter: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const { company } = user;
  const footerStyle = {
    backgroundColor: company.footerStyle.backgroundColor,
    color: company.footerStyle.textColor,
    borderTopColor: company.footerStyle.borderColor,
  };

  const linkStyle = {
    color: `${company.footerStyle.textColor}80`,
  };

  const linkHoverStyle = {
    color: company.footerStyle.textColor,
  };

  const getCompanyInfo = () => {
    switch (company.id) {
      case 'blackstone':
        return {
          description: 'Leading global investment business focused on real estate, private equity, hedge fund solutions, credit, secondary funds, and multi-asset strategies.',
          phone: '+1 (212) 583-5000',
          email: 'investor.relations@blackstone.com',
          website: 'www.blackstone.com',
          address: '345 Park Avenue, New York, NY 10154',
        };
      case 'apollo':
        return {
          description: 'Global alternative investment manager with a contrarian approach to investing across private equity, credit, and real assets.',
          phone: '+1 (212) 515-3200',
          email: 'investor.relations@apollo.com',
          website: 'www.apollo.com',
          address: '9 West 57th Street, New York, NY 10019',
        };
      default:
        return {
          description: 'Investment management firm focused on delivering superior risk-adjusted returns.',
          phone: '+1 (555) 123-4567',
          email: 'info@company.com',
          website: 'www.company.com',
          address: 'New York, NY',
        };
    }
  };

  const companyInfo = getCompanyInfo();

  return (
    <footer 
      className="border-t mt-auto"
      style={footerStyle}
    >
      <div className="max-w-[95vw] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{company.logo}</div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: company.footerStyle.textColor }}>
                  {company.displayName}
                </h3>
                <p className="text-sm opacity-75">Investment Management</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              {companyInfo.description}
            </p>
            <div className="flex items-center space-x-2 text-xs opacity-75">
              <Shield className="w-4 h-4" />
              <span>SEC Registered Investment Advisor</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold" style={{ color: company.footerStyle.textColor }}>
              Contact Information
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 opacity-60" />
                <a 
                  href={`tel:${companyInfo.phone}`}
                  className="transition-colors duration-200"
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, linkHoverStyle);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.currentTarget.style, linkStyle);
                  }}
                >
                  {companyInfo.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 opacity-60" />
                <a 
                  href={`mailto:${companyInfo.email}`}
                  className="transition-colors duration-200"
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, linkHoverStyle);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.currentTarget.style, linkStyle);
                  }}
                >
                  {companyInfo.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 opacity-60" />
                <a 
                  href={`https://${companyInfo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200"
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, linkHoverStyle);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.currentTarget.style, linkStyle);
                  }}
                >
                  {companyInfo.website}
                </a>
              </div>
              <div className="text-xs opacity-60">
                {companyInfo.address}
              </div>
            </div>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold" style={{ color: company.footerStyle.textColor }}>
              Legal & Compliance
            </h4>
            <div className="space-y-2 text-sm">
              <a 
                href="#"
                className="block transition-colors duration-200"
                style={linkStyle}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, linkHoverStyle);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, linkStyle);
                }}
              >
                Privacy Policy
              </a>
              <a 
                href="#"
                className="block transition-colors duration-200"
                style={linkStyle}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, linkHoverStyle);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, linkStyle);
                }}
              >
                Terms of Service
              </a>
              <a 
                href="#"
                className="block transition-colors duration-200"
                style={linkStyle}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, linkHoverStyle);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, linkStyle);
                }}
              >
                Regulatory Disclosures
              </a>
              <a 
                href="#"
                className="block transition-colors duration-200"
                style={linkStyle}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, linkHoverStyle);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, linkStyle);
                }}
              >
                Form ADV
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div 
          className="mt-8 pt-8 border-t text-center text-xs opacity-60"
          style={{ borderTopColor: company.footerStyle.borderColor }}
        >
          <p>
            © {new Date().getFullYear()} {company.displayName}. All rights reserved. | 
            This portal contains confidential and proprietary information.
          </p>
          <p className="mt-2">
            Investment advisory services provided by {company.displayName}, a registered investment advisor.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default BrandedFooter;