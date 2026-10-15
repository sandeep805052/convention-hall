import React, { useState } from 'react';
import { CONVENTION_REQUIREMENTS_PILLARS } from '../data/requirementsData';
import {
  CheckSquare,
  Square,
  ShieldCheck,
  Zap,
  Scale,
  Truck,
  FileCheck2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface RequirementsGuideProps {
  onOpenBooking: () => void;
}

export const RequirementsGuide: React.FC<RequirementsGuideProps> = ({ onOpenBooking }) => {
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  const activePillar = CONVENTION_REQUIREMENTS_PILLARS[activePillarIndex];

  const toggleCheck = (itemId: string) => {
    setCompletedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Calculate overall readiness from all 25 checklist items
  const totalChecklistItems = CONVENTION_REQUIREMENTS_PILLARS.reduce(
    (acc, p) => acc + p.checklistItems.length,
    0
  );
  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const readinessPercentage = Math.round((completedCount / totalChecklistItems) * 100);

  const getPillarIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Scale className="w-4 h-4" />;
      case 1:
        return <Zap className="w-4 h-4" />;
      case 2:
        return <ShieldCheck className="w-4 h-4" />;
      case 3:
        return <Truck className="w-4 h-4" />;
      case 4:
        return <FileCheck2 className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <section id="requirements-guide" className="py-20 border-b border-[#253047] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#C5A880] mb-3">
            <span>Essential Operations Syllabus</span>
            <span aria-hidden="true">·</span>
            <span>Venue Qualification Protocol</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial text-[#F2ECE1] leading-tight">
            The Five Pillars of Convention Hall Booking Requirements
          </h2>
          <p className="mt-4 text-[#A2ABB8] text-base leading-relaxed">
            Booking a grand convention facility is an intricate technical, spatial, and legal undertaking. Below is the comprehensive regulatory and logistical doctrine required to execute a flawless event contract.
          </p>
        </div>

        {/* Global Readiness Tracker Banner */}
        <div className="mb-10 p-5 rounded-lg border border-[#253047] bg-[#131926]/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-medium text-[#F2ECE1]">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>Organizer Pre-Booking Compliance Audit</span>
            </div>
            <p className="text-xs text-[#828D9F]">
              Verify each mandatory statutory standard across all 5 operational pillars before submitting your tenancy filing.
            </p>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="text-right">
              <span className="text-xs text-[#828D9F] block">Readiness Index</span>
              <span className="text-lg font-mono text-[#C5A880] font-semibold tabular-nums">
                {completedCount} / {totalChecklistItems} items ({readinessPercentage}%)
              </span>
            </div>
            <div className="w-24 sm:w-32 h-2 bg-[#0B0F17] rounded-full overflow-hidden border border-[#253047]">
              <div
                className="h-full bg-[#C5A880] transition-all duration-300"
                style={{ width: `${readinessPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Pillar Navigation Segmented Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar border-b border-[#253047]/60">
          {CONVENTION_REQUIREMENTS_PILLARS.map((pillar, idx) => {
            const isActive = activePillarIndex === idx;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillarIndex(idx)}
                className={`flex items-center gap-3 px-5 py-3 text-xs sm:text-sm font-medium rounded-t-md transition-all whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
                  isActive
                    ? 'border-[#C5A880] text-[#F2ECE1] bg-[#131926]'
                    : 'border-transparent text-[#828D9F] hover:text-[#EDE8DF] hover:bg-[#131926]/40'
                }`}
              >
                <span className="font-mono text-[#C5A880] text-xs">{pillar.pillarNumber}.</span>
                <span className="flex items-center gap-2">
                  {getPillarIcon(idx)}
                  {pillar.title.split('&')[0].trim()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Deep Dive Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column: In-Depth Factors & Benchmarks */}
          <div className="lg:col-span-8 space-y-8">
            <div className="p-6 rounded-lg border border-[#253047] bg-[#131926]/50">
              <div className="flex items-center gap-3 text-xs text-[#C5A880] font-mono mb-2">
                <span>CHAPTER {activePillar.pillarNumber}</span>
                <span aria-hidden="true">/</span>
                <span>REGULATORY DOCTRINE</span>
              </div>
              <h3 className="text-2xl font-editorial text-[#F2ECE1] mb-2">{activePillar.title}</h3>
              <p className="text-xs text-[#828D9F] mb-4">{activePillar.subtitle}</p>
              <p className="text-sm text-[#A2ABB8] leading-relaxed border-t border-[#253047] pt-4">
                {activePillar.overview}
              </p>
            </div>

            {/* Key Engineering & Operational Factors */}
            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-wider text-[#828D9F] font-medium">
                Core Architectural & Operational Benchmarks
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activePillar.keyFactors.map((factor, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-5 rounded-lg border border-[#253047] bg-[#131926]/30 hover:border-[#C5A880]/30 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h5 className="text-sm font-semibold text-[#F2ECE1]">{factor.title}</h5>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          factor.importance === 'Mandatory'
                            ? 'text-rose-300 border-rose-500/30 bg-rose-950/20'
                            : factor.importance === 'Critical'
                            ? 'text-amber-300 border-amber-500/30 bg-amber-950/20'
                            : 'text-sky-300 border-sky-500/30 bg-sky-950/20'
                        }`}
                      >
                        {factor.importance}
                      </span>
                    </div>
                    <p className="text-xs text-[#A2ABB8] leading-relaxed mb-4">{factor.description}</p>
                    <div className="p-2.5 rounded bg-[#0B0F17] border border-[#253047] text-[11px] font-mono text-[#C5A880]">
                      <span className="text-[#828D9F] block text-[10px] uppercase">Standard:</span>
                      {factor.benchmark}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statutory Standard Citations */}
            <div className="p-5 rounded-lg border border-[#253047] bg-[#131926]/20">
              <h4 className="text-xs uppercase tracking-wider text-[#828D9F] font-medium mb-3 flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Statutory Codes & Compliance Governance</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#A2ABB8]">
                {activePillar.regulatoryStandards.map((std, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2">
                    <span className="text-[#C5A880] font-mono">§</span>
                    <span>{std}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar Column: Interactive Filing Checklist */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-lg border border-[#253047] bg-[#131926] sticky top-24">
              <div className="flex items-center justify-between pb-4 border-b border-[#253047]">
                <div>
                  <h4 className="text-base font-editorial text-[#F2ECE1]">Pre-Filing Checklist</h4>
                  <p className="text-xs text-[#828D9F]">Chapter {activePillar.pillarNumber} deliverables</p>
                </div>
                <span className="text-xs font-mono text-[#C5A880] tabular-nums">
                  {
                    activePillar.checklistItems.filter(
                      (item) => completedItems[`${activePillar.id}-${item}`]
                    ).length
                  }{' '}
                  / {activePillar.checklistItems.length}
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {activePillar.checklistItems.map((item, cIdx) => {
                  const itemId = `${activePillar.id}-${item}`;
                  const isChecked = !!completedItems[itemId];
                  return (
                    <button
                      key={cIdx}
                      onClick={() => toggleCheck(itemId)}
                      className={`w-full p-3 rounded text-left text-xs transition-all flex items-start gap-3 cursor-pointer border ${
                        isChecked
                          ? 'bg-[#C5A880]/10 border-[#C5A880]/40 text-[#F2ECE1]'
                          : 'bg-[#0B0F17] border-[#253047] text-[#A2ABB8] hover:border-[#828D9F]'
                      }`}
                    >
                      <span className="mt-0.5 shrink-0 text-[#C5A880]">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4" />
                        ) : (
                          <Square className="w-4 h-4 text-[#828D9F]" />
                        )}
                      </span>
                      <span className={isChecked ? 'line-through text-[#828D9F]' : ''}>{item}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-5 border-t border-[#253047] space-y-3">
                <p className="text-[11px] text-[#828D9F] leading-tight">
                  Once all checklist requirements are verified, proceed with reserving your hall dates or run the feasibility calculator to check space allocation.
                </p>
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 px-4 text-xs font-medium text-[#0B0F17] bg-[#C5A880] hover:bg-[#D5BFA0] rounded transition-colors whitespace-nowrap cursor-pointer"
                >
                  Initiate Venue Reservation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
