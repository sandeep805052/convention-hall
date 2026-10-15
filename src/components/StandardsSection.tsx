import React, { useState } from 'react';
import { ShieldCheck, BookOpen, AlertOctagon, Scale, Award, ExternalLink } from 'lucide-react';

export const StandardsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('safety');

  const standardsData = {
    safety: [
      {
        code: 'NFPA 101',
        title: 'Life Safety Code (Chapter 12 & 13: Assembly Occupancies)',
        scope:
          'Defines mandatory occupant load calculation formulas, panics hardware requirements, illuminated exit signs with emergency battery failover, and exit separation distance math.',
        enforcement: 'Mandatory civic inspection prior to assembly doors opening.',
      },
      {
        code: 'NFPA 701',
        title: 'Standard Methods of Fire Tests for Flame Propagation of Textiles and Films',
        scope:
          'All draperies, acoustic velours, stage scenic fabrics, banners, and carpet runners must carry certified flame-retardant laboratory documentation.',
        enforcement: 'Non-compliant drapes must be removed immediately by order of Fire Marshal.',
      },
      {
        code: 'IBC Chapter 10',
        title: 'International Building Code: Means of Egress & Corridor Geometries',
        scope:
          'Specifies minimum width for main egress aisles (min 2,400mm) and dead-end corridor length maximums (max 6.1m in sprinklered spaces).',
        enforcement: 'Strict architectural verification on event floor plans.',
      },
    ],
    technical: [
      {
        code: 'ANSI E1.21',
        title: 'Temporary Structures Used to Support Audio, Video & Lighting Equipment',
        scope:
          'Governs structural calculations for ground-supported and flown truss towers, ballast weight guidelines against lateral wind or dynamic seismic forces.',
        enforcement: 'Requires PE (Professional Engineer) stamped structural certification.',
      },
      {
        code: 'IEC 60268-16',
        title: 'Objective Rating of Speech Intelligibility by the Speech Transmission Index (STI)',
        scope:
          'Enforces that plenary public address audio must achieve STI $\\ge$ 0.60 across 95% of delegate seating to ensure emergency broadcast and keynote intelligibility.',
        enforcement: 'Acoustic calibration verified using calibrated analyzer microphones.',
      },
      {
        code: 'NEC Article 518 / 520',
        title: 'Places of Assembly and Theatrical/Convention Electrical Distribution',
        scope:
          'Mandates portable feeder cables (4/0 or 2/0 camlocks), ground fault protection, clear 1.0m clearance around distribution switchboards, and isolated audio earths.',
        enforcement: 'Inspected by licensed master electricians during load-in.',
      },
    ],
    operations: [
      {
        code: 'ISO 20121',
        title: 'Event Sustainability Management Systems',
        scope:
          'Framework for zero single-use plastics, verified 85%+ waste diversion from landfill, locally sourced culinary produce, and transparent carbon accounting.',
        enforcement: 'Audited post-convention environmental reporting.',
      },
      {
        code: 'HACCP & FDA Food Code',
        title: 'Hazard Analysis Critical Control Point in Large-Scale Assembly Banqueting',
        scope:
          'Rigorous temperature tracking of hot/cold holding chains, safe staging protocols, and certified allergen segregation across multi-thousand guest banquets.',
        enforcement: 'Mandatory for all external and internal culinary providers.',
      },
      {
        code: 'OSHA 29 CFR 1910.184',
        title: 'Occupational Safety and Health: Rigging Gear Slings & Shackle Inspection',
        scope:
          'Working load limits (WLL), alloy steel chain slings, rated drop-forged shackles with cotter pins, and personal fall arrest systems for high-wire riggers.',
        enforcement: 'Zero tolerance: Uncertified hardware confiscated upon arrival.',
      },
    ],
  };

  return (
    <section id="compliance-standards" className="py-20 border-b border-[#253047] bg-[#0B0F17]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#C5A880] mb-3">
            <span>Statutory Codification</span>
            <span aria-hidden="true">·</span>
            <span>Legal & Engineering Framework</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial text-[#F2ECE1]">
            Recognized Regulatory & Statutory Standards
          </h2>
          <p className="mt-4 text-[#A2ABB8] text-base leading-relaxed">
            Convention management requires adherence to internationally accredited building, electrical, and life-safety codes. Here are the core specifications enforced at L&apos;AURORA.
          </p>
        </div>

        {/* Category selector */}
        <div className="flex items-center gap-2 mb-8 p-1 bg-[#131926] rounded-md border border-[#253047] w-fit">
          {[
            { id: 'safety', label: 'Life-Safety & Fire Codes' },
            { id: 'technical', label: 'Engineering & Electrical Codes' },
            { id: 'operations', label: 'Culinary, Rigging & Sustainability' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#C5A880] text-[#0B0F17]'
                  : 'text-[#A2ABB8] hover:text-[#EDE8DF]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(standardsData as any)[selectedCategory].map((std: any, idx: number) => (
            <div
              key={idx}
              className="p-6 rounded-lg border border-[#253047] bg-[#131926]/40 flex flex-col justify-between hover:border-[#C5A880]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-[#C5A880]">{std.code}</span>
                  <span className="text-[10px] font-mono text-[#828D9F] uppercase">Statute §{idx + 1}</span>
                </div>
                <h3 className="text-base font-editorial text-[#F2ECE1] mb-2">{std.title}</h3>
                <p className="text-xs text-[#A2ABB8] leading-relaxed mb-4">{std.scope}</p>
              </div>

              <div className="p-3 rounded bg-[#0B0F17] border border-[#253047] text-[11px]">
                <span className="text-[#828D9F] block text-[10px] uppercase font-mono">Enforcement Protocol:</span>
                <span className="text-[#EDE8DF]">{std.enforcement}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
