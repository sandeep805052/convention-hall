import React, { useState } from 'react';
import { VENUE_HALLS } from '../data/hallsData';
import { HallSpecification, LayoutStyle } from '../types/convention';
import { Maximize2, Users, Volume2, Zap, ArrowRight, Eye } from 'lucide-react';

interface HallsShowcaseProps {
  onSelectHall: (hallId: string) => void;
  onViewFloorPlan: (hall: HallSpecification) => void;
}

export const HallsShowcase: React.FC<HallsShowcaseProps> = ({
  onSelectHall,
  onViewFloorPlan,
}) => {
  const [selectedLayout, setSelectedLayout] = useState<LayoutStyle>('theater');
  const [activeHallId, setActiveHallId] = useState<string>(VENUE_HALLS[0].id);

  const activeHall = VENUE_HALLS.find((h) => h.id === activeHallId) || VENUE_HALLS[0];

  const layoutLabels: { id: LayoutStyle; label: string; ratio: string } = [
    { id: 'theater', label: 'Theater Plenary', ratio: '0.75 m²/pax' },
    { id: 'banquet', label: 'Banquet Gala', ratio: '1.50 m²/pax' },
    { id: 'classroom', label: 'Classroom Academy', ratio: '2.00 m²/pax' },
    { id: 'cocktail', label: 'Cocktail Standing', ratio: '0.60 m²/pax' },
    { id: 'exhibition', label: 'Standard 3x3m Booths', ratio: '9.00 m²/booth' },
  ] as unknown as { id: LayoutStyle; label: string; ratio: string };

  const layoutsList: { id: LayoutStyle; label: string; ratio: string }[] = [
    { id: 'theater', label: 'Theater Plenary', ratio: '0.75 m²/pax' },
    { id: 'banquet', label: 'Banquet Gala', ratio: '1.50 m²/pax' },
    { id: 'classroom', label: 'Classroom Academy', ratio: '2.00 m²/pax' },
    { id: 'cocktail', label: 'Cocktail Standing', ratio: '0.60 m²/pax' },
    { id: 'exhibition', label: 'Exhibition Booths', ratio: '9.00 m²/booth' },
  ];

  return (
    <section id="halls-showcase" className="py-20 border-b border-[#253047] bg-[#0B0F17]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#C5A880] mb-3">
              <span>Architectural Inventory</span>
              <span aria-hidden="true">·</span>
              <span>Column-Free Spans</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial text-[#F2ECE1]">
              The Grand Convention Halls
            </h2>
            <p className="mt-3 text-[#A2ABB8] text-sm max-w-xl">
              Engineered with world-class acoustic envelopes, certified rigging load points, and modular partition options for gatherings from 200 to 3,200 delegates.
            </p>
          </div>

          {/* Interactive Layout Topology Switcher */}
          <div className="space-y-2 shrink-0">
            <span className="text-xs text-[#828D9F] uppercase tracking-wider block">
              Test Seating Topology:
            </span>
            <div className="flex items-center gap-1 p-1 bg-[#131926] rounded-md border border-[#253047] overflow-x-auto">
              {layoutsList.map((layout) => (
                <button
                  key={layout.id}
                  onClick={() => setSelectedLayout(layout.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                    selectedLayout === layout.id
                      ? 'bg-[#C5A880] text-[#0B0F17]'
                      : 'text-[#A2ABB8] hover:text-[#EDE8DF]'
                  }`}
                >
                  {layout.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hall Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {VENUE_HALLS.map((hall) => {
            const isCurrent = hall.id === activeHallId;
            return (
              <button
                key={hall.id}
                onClick={() => setActiveHallId(hall.id)}
                className={`p-4 rounded-lg text-left transition-all border cursor-pointer ${
                  isCurrent
                    ? 'border-[#C5A880] bg-[#131926] shadow-lg'
                    : 'border-[#253047] bg-[#131926]/40 hover:border-[#828D9F]'
                }`}
              >
                <span className="text-xs text-[#C5A880] font-mono block">
                  {hall.areaSqM.toLocaleString()} m² · {hall.ceilingHeightM}m clearance
                </span>
                <h3 className="text-base font-editorial text-[#F2ECE1] mt-1 truncate">
                  {hall.name}
                </h3>
                <span className="text-xs text-[#828D9F] mt-2 block font-mono tabular-nums">
                  {hall.capacities[selectedLayout].toLocaleString()}{' '}
                  {selectedLayout === 'exhibition' ? 'Booths' : 'Seats'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Featured Hall Detailed Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch p-6 rounded-xl border border-[#253047] bg-[#131926]/50">
          {/* Hall Image with Blueprint Trigger */}
          <div className="lg:col-span-7 relative rounded-lg overflow-hidden border border-[#253047] min-h-[360px] lg:min-h-[460px] group">
            <img
              src={activeHall.image}
              alt={activeHall.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent" />

            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={() => onViewFloorPlan(activeHall)}
                className="px-3 py-1.5 text-xs font-medium text-[#EDE8DF] bg-[#0B0F17]/80 backdrop-blur-md rounded border border-[#253047] hover:border-[#C5A880] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Examine Floor Plan Blueprint</span>
              </button>
            </div>

            <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#0B0F17]/90 backdrop-blur-md rounded border border-[#253047]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-lg font-editorial text-[#F2ECE1]">{activeHall.name}</h4>
                  <p className="text-xs text-[#A2ABB8]">{activeHall.subtitle}</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#828D9F] block">Published Day Rate</span>
                  <span className="text-base font-mono font-semibold text-[#C5A880] tabular-nums">
                    ₹{activeHall.baseDayRateInr.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Hall Technical Dossier Specifications */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#828D9F] mb-3">
                <span>Certified Capacity under {selectedLayout.toUpperCase()} configuration:</span>
              </div>
              <div className="p-4 rounded-lg bg-[#0B0F17] border border-[#253047] mb-6 flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-mono font-bold text-[#F2ECE1] tabular-nums">
                    {activeHall.capacities[selectedLayout].toLocaleString()}
                  </span>
                  <span className="text-xs text-[#A2ABB8] ml-2">
                    {selectedLayout === 'exhibition' ? '3x3m Booth Modules' : 'Occupants Max'}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#C5A880]">
                  {(activeHall.areaSqM / (activeHall.capacities[selectedLayout] || 1)).toFixed(2)} m²/pax net
                </span>
              </div>

              {/* Architectural Technical Matrix */}
              <div className="space-y-3">
                <h5 className="text-xs uppercase tracking-wider text-[#828D9F] font-medium">
                  Technical Specifications Matrix
                </h5>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded bg-[#0B0F17]/60 border border-[#253047]">
                    <div className="flex items-center gap-1.5 text-[#828D9F] mb-1">
                      <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Dimensions</span>
                    </div>
                    <span className="font-mono text-[#F2ECE1] tabular-nums">
                      {activeHall.areaSqM} m² / {activeHall.ceilingHeightM}m High
                    </span>
                  </div>

                  <div className="p-3 rounded bg-[#0B0F17]/60 border border-[#253047]">
                    <div className="flex items-center gap-1.5 text-[#828D9F] mb-1">
                      <Zap className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>3-Phase Power</span>
                    </div>
                    <span className="font-mono text-[#F2ECE1] tabular-nums">
                      {activeHall.powerCapacityKva} kVA Dedicated
                    </span>
                  </div>

                  <div className="p-3 rounded bg-[#0B0F17]/60 border border-[#253047]">
                    <div className="flex items-center gap-1.5 text-[#828D9F] mb-1">
                      <Volume2 className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Acoustic Decay</span>
                    </div>
                    <span className="font-mono text-[#F2ECE1] tabular-nums">
                      {activeHall.acousticRatingRt60}
                    </span>
                  </div>

                  <div className="p-3 rounded bg-[#0B0F17]/60 border border-[#253047]">
                    <div className="flex items-center gap-1.5 text-[#828D9F] mb-1">
                      <Users className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Loading Access</span>
                    </div>
                    <span className="text-[#F2ECE1] text-[11px] truncate block" title={activeHall.loadingDockAccess}>
                      {activeHall.loadingDockAccess}
                    </span>
                  </div>
                </div>
              </div>

              {/* Integrated Engineering Features */}
              <div className="mt-5 space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#828D9F] font-medium block">
                  Hall Infrastructure Highlights
                </span>
                <ul className="space-y-1.5 text-xs text-[#A2ABB8]">
                  {activeHall.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <span className="text-[#C5A880] mt-0.5">·</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#253047] flex items-center gap-3">
              <button
                onClick={() => onSelectHall(activeHall.id)}
                className="flex-1 py-3 px-4 text-xs font-medium text-[#0B0F17] bg-[#C5A880] hover:bg-[#D5BFA0] rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Select {activeHall.name} for Booking</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
