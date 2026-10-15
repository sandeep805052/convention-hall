import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#253047] bg-[#0B0F17] py-12 text-xs text-[#828D9F]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#253047]">
          {/* Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <span className="text-lg font-editorial tracking-wider text-[#F2ECE1] uppercase block">
              L&apos;AURORA
            </span>
            <p className="text-xs text-[#A2ABB8] leading-relaxed">
              Grand Architectural Convention & Event Centre. Engineered for global assemblies, academic symposiums, and cultural milestones.
            </p>
          </div>

          {/* Quick Nav */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#F2ECE1] block mb-3 font-mono">
              Convention Modules
            </span>
            <ul className="space-y-2 text-[#A2ABB8]">
              <li>
                <a href="#requirements-guide" className="hover:text-[#F2ECE1] transition-colors">
                  5-Pillar Booking Requirements
                </a>
              </li>
              <li>
                <a href="#halls-showcase" className="hover:text-[#F2ECE1] transition-colors">
                  Grand Architectural Halls
                </a>
              </li>
              <li>
                <a href="#feasibility-calculator" className="hover:text-[#F2ECE1] transition-colors">
                  Spatial & Egress Calculator
                </a>
              </li>
              <li>
                <a href="#compliance-standards" className="hover:text-[#F2ECE1] transition-colors">
                  Statutory Fire & Rigging Codes
                </a>
              </li>
            </ul>
          </div>

          {/* Specifications */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#F2ECE1] block mb-3 font-mono">
              Venue Standards
            </span>
            <ul className="space-y-2 text-[#A2ABB8]">
              <li>NFPA 101 Life Safety Certified</li>
              <li>Dual 10 Gbps Redundant Symmetrical Fiber</li>
              <li>3-Phase 415V/650 kVA Industrial Power</li>
              <li>ISO 20121 Sustainable Event Certified</li>
            </ul>
          </div>

          {/* Institutional Note */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#F2ECE1] block mb-3 font-mono">
              Licensing Office
            </span>
            <p className="text-xs text-[#A2ABB8] leading-relaxed">
              Tenancy Administration & Dockmaster Office
              <br />
              East Pavilion Maritime Quay, Waterfront District
              <br />
              Inquiries: tenancy@laurora-convention.org
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#828D9F]">
          <p>© 2026 L&apos;AURORA Architectural Convention Centre. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Life Safety Ordinance Compliant</span>
            <span aria-hidden="true">·</span>
            <span>ICC / IBC / NFPA Assembly Classification A-3</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
