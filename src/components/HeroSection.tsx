import React from 'react';
import { ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExploreRequirements: () => void;
  onOpenCalculator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onExploreRequirements,
  onOpenCalculator,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-[#253047]">
      {/* Subtle architectural ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-[#C5A880]/10 via-[#1E283D]/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Proposition & Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#C5A880]">
              <span>Architectural Convention Engineering</span>
              <span aria-hidden="true">·</span>
              <span>International Venue Protocol</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-editorial tracking-tight text-[#F2ECE1] leading-[1.1] text-balance">
              The Rigorous Architecture of World-Class Conventions
            </h1>

            <p className="text-[#A2ABB8] text-base sm:text-lg leading-relaxed max-w-xl">
              From spatial density algorithms and structural rigging loads to 3-phase industrial power and municipal life-safety permits. Discover the exacting technical and contractual requirements for flawless convention hall reservations.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenCalculator}
                className="px-6 py-3 text-sm font-medium text-[#0B0F17] bg-[#C5A880] hover:bg-[#D5BFA0] rounded-md transition-all flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Calculate Event Requirements</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreRequirements}
                className="px-6 py-3 text-sm font-medium text-[#EDE8DF] border border-[#253047] hover:border-[#C5A880]/50 hover:bg-[#131926] rounded-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#C5A880]" />
                <span>5-Pillar Booking Guide</span>
              </button>
            </div>

            {/* Adjacency proof points */}
            <div className="pt-4 border-t border-[#253047]/60 grid grid-cols-3 gap-4 text-xs text-[#828D9F]">
              <div>
                <p className="text-[#F2ECE1] font-mono text-base font-semibold tabular-nums">NFPA 101</p>
                <p className="mt-0.5">Life-Safety Certified</p>
              </div>
              <div>
                <p className="text-[#F2ECE1] font-mono text-base font-semibold tabular-nums">0.68s RT60</p>
                <p className="mt-0.5">Acoustic Clarity</p>
              </div>
              <div>
                <p className="text-[#F2ECE1] font-mono text-base font-semibold tabular-nums">15 kN/m²</p>
                <p className="mt-0.5">Heavy Floor Loading</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset with Frame Scrim */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#253047] bg-[#131926] shadow-2xl group">
              <img
                src="/src/assets/images/hero_convention_hall_1792088659943.jpg"
                alt="Zenith Grand Pavilion architectural view showing timber vaulted arches and panoramic glass facade"
                className="w-full h-[360px] sm:h-[420px] lg:h-[460px] object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              {/* Subtle architectural gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/30 to-transparent" />

              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#0B0F17]/85 backdrop-blur-md rounded border border-[#253047] flex items-center justify-between">
                <div>
                  <h2 className="text-base font-editorial text-[#F2ECE1]">The Zenith Grand Pavilion</h2>
                  <p className="text-xs text-[#A2ABB8]">2,800 m² column-free glulam arch hall with waterfront glass elevation</p>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="px-3 py-1.5 text-xs font-medium text-[#0B0F17] bg-[#C5A880] hover:bg-[#D5BFA0] rounded transition-colors whitespace-nowrap cursor-pointer"
                >
                  Request Hold
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Architectural KPI Strip below Hero */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#253047]">
          <div className="p-4 rounded border border-[#253047] bg-[#131926]/50">
            <span className="text-xs text-[#828D9F] uppercase tracking-wider block">Gross Footprint</span>
            <span className="text-xl sm:text-2xl font-mono text-[#F2ECE1] font-medium tabular-nums mt-1 block">
              9,200 m²
            </span>
            <span className="text-xs text-[#A2ABB8] mt-1 block">99,028 sq ft across 4 halls</span>
          </div>

          <div className="p-4 rounded border border-[#253047] bg-[#131926]/50">
            <span className="text-xs text-[#828D9F] uppercase tracking-wider block">Max Assembly</span>
            <span className="text-xl sm:text-2xl font-mono text-[#F2ECE1] font-medium tabular-nums mt-1 block">
              3,200 Pax
            </span>
            <span className="text-xs text-[#A2ABB8] mt-1 block">NFPA certified single plenary</span>
          </div>

          <div className="p-4 rounded border border-[#253047] bg-[#131926]/50">
            <span className="text-xs text-[#828D9F] uppercase tracking-wider block">Grid Power</span>
            <span className="text-xl sm:text-2xl font-mono text-[#F2ECE1] font-medium tabular-nums mt-1 block">
              2,150 kVA
            </span>
            <span className="text-xs text-[#A2ABB8] mt-1 block">Dual 415V 3-phase substations</span>
          </div>

          <div className="p-4 rounded border border-[#253047] bg-[#131926]/50">
            <span className="text-xs text-[#828D9F] uppercase tracking-wider block">Structural Trusses</span>
            <span className="text-xl sm:text-2xl font-mono text-[#F2ECE1] font-medium tabular-nums mt-1 block">
              1,000 kg/pt
            </span>
            <span className="text-xs text-[#A2ABB8] mt-1 block">Certified Working Load Limit</span>
          </div>
        </div>
      </div>
    </section>
  );
};
