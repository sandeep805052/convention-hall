import React, { useState, useMemo } from 'react';
import { VENUE_HALLS } from '../data/hallsData';
import { EventType, LayoutStyle } from '../types/convention';
import {
  Calculator,
  Layers,
  Zap,
  ShieldAlert,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Download,
} from 'lucide-react';

interface RequirementsCalculatorProps {
  onOpenDossier: (dossierData: any) => void;
  onProceedToBooking: (initialState: any) => void;
}

export const RequirementsCalculator: React.FC<RequirementsCalculatorProps> = ({
  onOpenDossier,
  onProceedToBooking,
}) => {
  const [eventType, setEventType] = useState<EventType>('international_summit');
  const [guestCount, setGuestCount] = useState<number>(850);
  const [layoutStyle, setLayoutStyle] = useState<LayoutStyle>('theater');
  const [techTier, setTechTier] = useState<'standard_av' | 'broadcast_grade' | 'immersive_production'>('broadcast_grade');
  const [catering, setCatering] = useState<'none' | 'canapes' | 'plated_3course' | 'buffet_deluxe'>('plated_3course');
  const [setupDays, setSetupDays] = useState<number>(1);
  const [eventDays, setEventDays] = useState<number>(2);

  // Density coefficients (m² per person including circulation)
  const densityFactors: Record<LayoutStyle, number> = {
    theater: 0.85,
    banquet: 1.65,
    classroom: 2.1,
    cocktail: 0.65,
    exhibition: 6.5, // average per booth/person allocation
  };

  const calculations = useMemo(() => {
    // 1. Spatial required area
    const netAreaRequired = Math.round(guestCount * densityFactors[layoutStyle]);
    // Stage, green rooms and AV front of house buffer (+20%)
    const grossAreaWithBuffer = Math.round(netAreaRequired * 1.25);
    const grossSqFt = Math.round(grossAreaWithBuffer * 10.764);

    // 2. Power draw estimation
    const baseKvaPerPax = techTier === 'standard_av' ? 0.25 : techTier === 'broadcast_grade' ? 0.45 : 0.75;
    const estimatedKva = Math.round(guestCount * baseKvaPerPax + 50);

    // 3. Statutory Life Safety exits (NFPA 101 Table 12.2.4.1)
    let minFireExits = 2;
    if (guestCount > 1000) minFireExits = 4;
    else if (guestCount > 500) minFireExits = 3;

    // 4. Certified Security Personnel (1:100 standard, 1:75 if alcohol/dinner)
    const securityRatio = catering !== 'none' ? 75 : 100;
    const requiredGuards = Math.max(2, Math.ceil(guestCount / securityRatio));

    // 5. Chain hoists / rigging points required
    const riggingPoints = techTier === 'standard_av' ? 8 : techTier === 'broadcast_grade' ? 18 : 36;

    // 6. Find viable halls that satisfy spatial and capacity requirements
    const viableHalls = VENUE_HALLS.filter(
      (h) => h.areaSqM >= grossAreaWithBuffer && h.capacities[layoutStyle] >= guestCount
    );

    const primaryRecommendedHall =
      viableHalls.length > 0
        ? viableHalls[0]
        : VENUE_HALLS.reduce((prev, curr) => (curr.areaSqM > prev.areaSqM ? curr : prev));

    const isHallOverflow = viableHalls.length === 0;

    // 7. Cost breakdown calculation
    const baseDayRate = primaryRecommendedHall.baseDayRateInr;
    const totalHallRate = baseDayRate * eventDays + baseDayRate * 0.5 * setupDays;

    const techTierRates = {
      standard_av: 250000 * eventDays,
      broadcast_grade: 650000 * eventDays,
      immersive_production: 1200000 * eventDays,
    };
    const totalTechRate = techTierRates[techTier];

    const securityDayRate = requiredGuards * 3200 * eventDays;
    const totalEstimatedCost = totalHallRate + totalTechRate + securityDayRate;

    return {
      netAreaRequired,
      grossAreaWithBuffer,
      grossSqFt,
      estimatedKva,
      minFireExits,
      requiredGuards,
      riggingPoints,
      viableHalls,
      primaryRecommendedHall,
      isHallOverflow,
      totalHallRate,
      totalTechRate,
      securityDayRate,
      totalEstimatedCost,
    };
  }, [guestCount, layoutStyle, techTier, catering, setupDays, eventDays]);

  const handleLaunchDossier = () => {
    onOpenDossier({
      eventType,
      guestCount,
      layoutStyle,
      techTier,
      catering,
      setupDays,
      eventDays,
      ...calculations,
    });
  };

  const handleProceed = () => {
    onProceedToBooking({
      hallId: calculations.primaryRecommendedHall.id,
      eventType,
      layoutStyle,
      guestCount,
      cateringOption: catering,
      technicalTier: techTier,
      securityStaffing: true,
      dedicatedFiberStream: techTier !== 'standard_av',
      simultaneousTranslation: eventType === 'international_summit',
    });
  };

  return (
    <section id="feasibility-calculator" className="py-20 border-b border-[#253047] bg-[#0E1420]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#C5A880] mb-3">
            <span>Dynamic Engineering Model</span>
            <span aria-hidden="true">·</span>
            <span>Feasibility & Requirements Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial text-[#F2ECE1]">
            Convention Spatial & Technical Calculator
          </h2>
          <p className="mt-4 text-[#A2ABB8] text-base leading-relaxed">
            Test architectural loads, NFPA minimum egress clearances, electrical draw, and certified staffing metrics for any convention configuration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Parameter Controls */}
          <div className="lg:col-span-6 space-y-6 p-6 rounded-xl border border-[#253047] bg-[#131926]/60">
            <h3 className="text-sm uppercase tracking-wider text-[#F2ECE1] font-semibold flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#C5A880]" />
              <span>Event Parameters Configuration</span>
            </h3>

            {/* Event Category */}
            <div>
              <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-2 font-medium">
                Convention Purpose / Event Type:
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value as EventType)}
                className="w-full bg-[#0B0F17] border border-[#253047] text-[#EDE8DF] text-xs sm:text-sm rounded-md px-3 py-2.5 focus:border-[#C5A880] focus:outline-none"
              >
                <option value="international_summit">International Summit / Intergovernmental</option>
                <option value="corporate_gala">Corporate Gala & Awards Ceremony</option>
                <option value="tech_expo">Global Technology Expo & Trade Fair</option>
                <option value="academic_symposium">Academic & Scientific Research Congress</option>
                <option value="luxury_reception">Landmark Celebratory Assembly</option>
              </select>
            </div>

            {/* Attendance Count Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#828D9F] uppercase tracking-wider font-medium">
                  Expected Delegate Attendance:
                </span>
                <span className="font-mono text-base font-semibold text-[#C5A880] tabular-nums">
                  {guestCount.toLocaleString()} Delegates
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="3200"
                step="50"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full accent-[#C5A880] bg-[#0B0F17] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#828D9F] font-mono mt-1">
                <span>100 pax (Intimate)</span>
                <span>1,500 pax (Standard Plenary)</span>
                <span>3,200 pax (Max Arena)</span>
              </div>
            </div>

            {/* Seating Topology Selector */}
            <div>
              <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-2 font-medium">
                Seating Topology & Floorplan Style:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(['theater', 'banquet', 'classroom', 'cocktail', 'exhibition'] as LayoutStyle[]).map(
                  (style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setLayoutStyle(style)}
                      className={`p-2.5 text-xs rounded text-left border transition-all cursor-pointer ${
                        layoutStyle === style
                          ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#F2ECE1]'
                          : 'border-[#253047] bg-[#0B0F17] text-[#A2ABB8] hover:border-[#828D9F]'
                      }`}
                    >
                      <span className="capitalize font-medium block">{style}</span>
                      <span className="text-[10px] text-[#828D9F] block">
                        {densityFactors[style]} m²/pax
                      </span>
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Technical Tier */}
            <div>
              <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-2 font-medium">
                Audiovisual & Broadcast Production Level:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'standard_av', name: 'Standard AV', desc: 'Projector + Podium + PA' },
                  { id: 'broadcast_grade', name: 'Broadcast 4K', desc: 'LED Wall + Line Array + 3-Cam' },
                  { id: 'immersive_production', name: 'Immersive Stage', desc: 'Kinetic Truss + Multi-4K + Dante' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setTechTier(tier.id as any)}
                    className={`p-2.5 text-xs rounded text-left border transition-all cursor-pointer ${
                      techTier === tier.id
                        ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#F2ECE1]'
                        : 'border-[#253047] bg-[#0B0F17] text-[#A2ABB8] hover:border-[#828D9F]'
                    }`}
                  >
                    <span className="font-medium block text-[#F2ECE1]">{tier.name}</span>
                    <span className="text-[10px] text-[#828D9F] block">{tier.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Event Duration & Setup */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-1 font-medium">
                  Active Convention Days:
                </label>
                <select
                  value={eventDays}
                  onChange={(e) => setEventDays(Number(e.target.value))}
                  className="w-full bg-[#0B0F17] border border-[#253047] text-[#EDE8DF] text-xs rounded-md px-3 py-2"
                >
                  <option value={1}>1 Full Day</option>
                  <option value={2}>2 Days</option>
                  <option value={3}>3 Days</option>
                  <option value={5}>5 Days (Summit)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-1 font-medium">
                  Bump-In Setup Window:
                </label>
                <select
                  value={setupDays}
                  onChange={(e) => setSetupDays(Number(e.target.value))}
                  className="w-full bg-[#0B0F17] border border-[#253047] text-[#EDE8DF] text-xs rounded-md px-3 py-2"
                >
                  <option value={1}>1 Day Prior (12-hr load-in)</option>
                  <option value={2}>2 Days Prior (Heavy Rigging)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Architectural Output & Dossier */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-xl border border-[#253047] bg-[#131926]">
              <div className="flex items-center justify-between pb-4 border-b border-[#253047]">
                <div>
                  <h4 className="text-base font-editorial text-[#F2ECE1]">Calculated Requirements Profile</h4>
                  <p className="text-xs text-[#828D9F]">Real-time spatial & regulatory metrics</p>
                </div>
                {calculations.isHallOverflow ? (
                  <span className="flex items-center gap-1.5 text-xs text-rose-400 font-mono">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Exceeds Single Hall Limit</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Feasible Space</span>
                  </span>
                )}
              </div>

              {/* 4 Output Metrics */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-[#0B0F17] border border-[#253047]">
                  <div className="flex items-center gap-1.5 text-xs text-[#828D9F] mb-1">
                    <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Min Net Floor Area</span>
                  </div>
                  <span className="text-xl font-mono text-[#F2ECE1] font-semibold tabular-nums block">
                    {calculations.grossAreaWithBuffer.toLocaleString()} m²
                  </span>
                  <span className="text-[11px] text-[#828D9F] font-mono tabular-nums">
                    {calculations.grossSqFt.toLocaleString()} sq ft (incl. 25% stage/buffer)
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-[#0B0F17] border border-[#253047]">
                  <div className="flex items-center gap-1.5 text-xs text-[#828D9F] mb-1">
                    <Zap className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Required Power Load</span>
                  </div>
                  <span className="text-xl font-mono text-[#F2ECE1] font-semibold tabular-nums block">
                    {calculations.estimatedKva} kVA
                  </span>
                  <span className="text-[11px] text-[#828D9F] font-mono">
                    3-Phase 415V isolated technical feed
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-[#0B0F17] border border-[#253047]">
                  <div className="flex items-center gap-1.5 text-xs text-[#828D9F] mb-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Life Safety Egress</span>
                  </div>
                  <span className="text-xl font-mono text-[#F2ECE1] font-semibold tabular-nums block">
                    {calculations.minFireExits} Fire Exits
                  </span>
                  <span className="text-[11px] text-[#828D9F] font-mono">
                    NFPA 101 Table 12.2.4.1 compliance
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-[#0B0F17] border border-[#253047]">
                  <div className="flex items-center gap-1.5 text-xs text-[#828D9F] mb-1">
                    <FileCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Security Personnel</span>
                  </div>
                  <span className="text-xl font-mono text-[#F2ECE1] font-semibold tabular-nums block">
                    {calculations.requiredGuards} Officers
                  </span>
                  <span className="text-[11px] text-[#828D9F] font-mono">
                    State licensed crowd management
                  </span>
                </div>
              </div>

              {/* Recommended Venue Assignment */}
              <div className="mt-6 p-4 rounded-lg border border-[#253047] bg-[#0B0F17]/70">
                <span className="text-[11px] text-[#828D9F] uppercase tracking-wider block">
                  Recommended Architectural Venue Match:
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-2">
                  <div>
                    <h5 className="text-base font-editorial text-[#C5A880]">
                      {calculations.primaryRecommendedHall.name}
                    </h5>
                    <p className="text-xs text-[#A2ABB8]">
                      {calculations.primaryRecommendedHall.areaSqM.toLocaleString()} m² · {calculations.primaryRecommendedHall.ceilingHeightM}m clearance · {calculations.primaryRecommendedHall.capacities[layoutStyle]} max in {layoutStyle}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#EDE8DF] shrink-0">
                    Day Rate: ₹{calculations.primaryRecommendedHall.baseDayRateInr.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Itemized Cost Breakdown Preview */}
              <div className="mt-6 pt-5 border-t border-[#253047] space-y-2 text-xs">
                <div className="flex justify-between text-[#828D9F]">
                  <span>Hall License ({eventDays} days + {setupDays} load-in):</span>
                  <span className="font-mono text-[#EDE8DF] tabular-nums">
                    ₹{calculations.totalHallRate.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-[#828D9F]">
                  <span>Technical & AV Package ({techTier.replace('_', ' ')}):</span>
                  <span className="font-mono text-[#EDE8DF] tabular-nums">
                    ₹{calculations.totalTechRate.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-[#828D9F]">
                  <span>Mandatory Security Coverage ({calculations.requiredGuards} guards):</span>
                  <span className="font-mono text-[#EDE8DF] tabular-nums">
                    ₹{calculations.securityDayRate.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#F2ECE1] pt-3 border-t border-[#253047]">
                  <span>Estimated Total Feasibility Budget:</span>
                  <span className="font-mono text-[#C5A880] tabular-nums text-base">
                    ₹{calculations.totalEstimatedCost.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-[#253047] flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={handleLaunchDossier}
                  className="w-full sm:w-auto flex-1 py-3 px-4 text-xs font-medium text-[#EDE8DF] border border-[#253047] hover:border-[#C5A880] hover:bg-[#131926] rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>View Official Feasibility Dossier</span>
                </button>

                <button
                  type="button"
                  onClick={handleProceed}
                  className="w-full sm:w-auto flex-1 py-3 px-4 text-xs font-medium text-[#0B0F17] bg-[#C5A880] hover:bg-[#D5BFA0] rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Lock in Venue Dates</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
