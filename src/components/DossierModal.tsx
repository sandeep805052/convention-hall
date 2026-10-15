import React, { useState } from 'react';
import { X, Printer, Check, Copy, Shield, FileText } from 'lucide-react';

interface DossierModalProps {
  data: any;
  onClose: () => void;
  onProceedToBooking: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({
  data,
  onClose,
  onProceedToBooking,
}) => {
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const docketNumber = `AUR-REQ-${Math.floor(100000 + Math.random() * 900000)}`;

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `L'AURORA VENUE FEASIBILITY DOSSIER [${docketNumber}]
Event Type: ${data.eventType}
Attendance: ${data.guestCount} pax (${data.layoutStyle} layout)
Assigned Venue: ${data.primaryRecommendedHall?.name}
Required Gross Area: ${data.grossAreaWithBuffer} m² (${data.grossSqFt} sq ft)
Estimated Power: ${data.estimatedKva} kVA (3-Phase 415V)
Life Safety Egress: ${data.minFireExits} NFPA 101 Exits Required
Certified Security: ${data.requiredGuards} Officers
Estimated Budget: ₹${data.totalEstimatedCost?.toLocaleString('en-IN')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0E1420] border border-[#253047] rounded-xl shadow-2xl overflow-hidden my-8 print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-6 border-b border-[#253047] bg-[#131926] print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#C5A880]" />
            <div>
              <h3 className="text-base font-editorial text-[#F2ECE1]">Official Booking Requirements Dossier</h3>
              <p className="text-xs text-[#828D9F] font-mono">Docket {docketNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="p-2 text-xs font-medium text-[#EDE8DF] border border-[#253047] hover:bg-[#253047]/40 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Summary'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-2 text-xs font-medium text-[#0B0F17] bg-[#C5A880] hover:bg-[#D5BFA0] rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#828D9F] hover:text-[#EDE8DF] hover:bg-[#253047]/40 rounded transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dossier Document Sheet */}
        <div className="p-8 space-y-6 text-[#EDE8DF] print:text-black print:p-0">
          {/* Header */}
          <div className="border-b border-[#253047] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-editorial tracking-widest uppercase text-[#C5A880] print:text-stone-800">
                L&apos;AURORA GRAND CONVENTION VENUES
              </span>
              <h2 className="text-2xl font-editorial text-[#F2ECE1] print:text-black mt-1">
                Venue Feasibility & Compliance Specification
              </h2>
              <p className="text-xs text-[#828D9F]">
                Issued for formal presentation to organizing committee, academic faculty, and municipal licensing.
              </p>
            </div>
            <div className="text-left sm:text-right font-mono text-xs">
              <span className="text-[#828D9F] block">DOCKET REFERENCE</span>
              <span className="text-[#C5A880] font-semibold">{docketNumber}</span>
              <span className="text-[#828D9F] block text-[10px] mt-1">STATUS: PRE-QUALIFIED</span>
            </div>
          </div>

          {/* Section 1: Executive Parameters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded bg-[#0B0F17] border border-[#253047] text-xs font-mono">
            <div>
              <span className="text-[#828D9F] block text-[10px]">EVENT PURPOSE</span>
              <span className="text-[#F2ECE1] capitalize font-medium">{data.eventType?.replace('_', ' ')}</span>
            </div>
            <div>
              <span className="text-[#828D9F] block text-[10px]">TOTAL HEADCOUNT</span>
              <span className="text-[#C5A880] font-semibold">{data.guestCount?.toLocaleString()} Delegates</span>
            </div>
            <div>
              <span className="text-[#828D9F] block text-[10px]">SEATING TOPOLOGY</span>
              <span className="text-[#F2ECE1] capitalize font-medium">{data.layoutStyle}</span>
            </div>
            <div>
              <span className="text-[#828D9F] block text-[10px]">RECOMMENDED HALL</span>
              <span className="text-[#F2ECE1] font-medium">{data.primaryRecommendedHall?.name}</span>
            </div>
          </div>

          {/* Section 2: Spatial & Egress Engineering */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C5A880] border-b border-[#253047] pb-1">
              01. Spatial & Life-Safety Clearances (NFPA 101 Compliance)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-[#131926]/50 rounded border border-[#253047]">
                <span className="text-[#828D9F] block text-[10px]">GROSS FOOTPRINT REQUIRED</span>
                <span className="font-mono text-base font-semibold text-[#F2ECE1]">
                  {data.grossAreaWithBuffer?.toLocaleString()} m²
                </span>
                <span className="text-[10px] text-[#828D9F] block">
                  {data.grossSqFt?.toLocaleString()} sq ft (incl. stage/circulation)
                </span>
              </div>

              <div className="p-3 bg-[#131926]/50 rounded border border-[#253047]">
                <span className="text-[#828D9F] block text-[10px]">MANDATORY FIRE EXITS</span>
                <span className="font-mono text-base font-semibold text-[#F2ECE1]">
                  {data.minFireExits} Direct Egress Doors
                </span>
                <span className="text-[10px] text-[#828D9F] block">Min 2.4m unobstructed arterial corridor</span>
              </div>

              <div className="p-3 bg-[#131926]/50 rounded border border-[#253047]">
                <span className="text-[#828D9F] block text-[10px]">SECURITY CROWD MANAGERS</span>
                <span className="font-mono text-base font-semibold text-[#F2ECE1]">
                  {data.requiredGuards} Certified Officers
                </span>
                <span className="text-[10px] text-[#828D9F] block">State licensed security staffing ratio</span>
              </div>
            </div>
          </div>

          {/* Section 3: Technical & Power Distribution */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C5A880] border-b border-[#253047] pb-1">
              02. Technical, Rigging & Electrical Allowances
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#131926]/50 rounded border border-[#253047]">
                <span className="text-[#828D9F] block text-[10px]">ELECTRICAL POWER ENVELOPE</span>
                <span className="font-mono text-sm text-[#F2ECE1] font-semibold">
                  {data.estimatedKva} kVA Load Calculated
                </span>
                <p className="text-[11px] text-[#828D9F] mt-1">
                  Balanced 3-Phase 415V camlock distribution with isolated ground for FOH audio racks.
                </p>
              </div>

              <div className="p-3 bg-[#131926]/50 rounded border border-[#253047]">
                <span className="text-[#828D9F] block text-[10px]">RIGGING & OVERHEAD INFRASTRUCTURE</span>
                <span className="font-mono text-sm text-[#F2ECE1] font-semibold">
                  {data.riggingPoints} Certified Rigging Points
                </span>
                <p className="text-[11px] text-[#828D9F] mt-1">
                  Minimum 1,000 kg WLL per anchor point. Stamped rigging plot required 14 days in advance.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Financial Summary & Staging */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C5A880] border-b border-[#253047] pb-1">
              03. Tenancy Milestone & Commercial Estimates
            </h4>
            <div className="p-4 bg-[#0B0F17] rounded border border-[#253047] space-y-2 text-xs">
              <div className="flex justify-between text-[#828D9F]">
                <span>Hall Licensing ({data.eventDays} Event Days + {data.setupDays} Setup Day):</span>
                <span className="font-mono text-[#EDE8DF]">₹{data.totalHallRate?.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#828D9F]">
                <span>Technical & Staging Infrastructure:</span>
                <span className="font-mono text-[#EDE8DF]">₹{data.totalTechRate?.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#828D9F]">
                <span>Mandatory Security Staffing:</span>
                <span className="font-mono text-[#EDE8DF]">₹{data.securityDayRate?.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#F2ECE1] pt-2 border-t border-[#253047]">
                <span>Total Estimated Event Tenancy:</span>
                <span className="font-mono text-[#C5A880] text-base font-bold">
                  ₹{data.totalEstimatedCost?.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Legal Certification Note */}
          <div className="p-4 rounded bg-[#131926]/30 border border-[#253047] text-[11px] text-[#828D9F] flex items-start gap-3">
            <Shield className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
            <p>
              This document serves as an architectural feasibility baseline under ISO 20121 and NFPA 101 standards. Confirmation is subject to statutory fire marshal review, executed Master Services Agreement, and verification of commercial general liability insurance (₹80 Crore / $10M aggregate).
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-6 border-t border-[#253047] bg-[#131926] flex items-center justify-end gap-3 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[#EDE8DF] border border-[#253047] hover:bg-[#253047]/40 rounded transition-colors cursor-pointer"
          >
            Close Dossier
          </button>
          <button
            onClick={() => {
              onClose();
              onProceedToBooking();
            }}
            className="px-5 py-2 text-xs font-medium text-[#0B0F17] bg-[#C5A880] hover:bg-[#D5BFA0] rounded transition-colors whitespace-nowrap cursor-pointer"
          >
            Submit for Formal Date Hold
          </button>
        </div>
      </div>
    </div>
  );
};
