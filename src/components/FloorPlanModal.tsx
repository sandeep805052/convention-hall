import React, { useState } from 'react';
import { HallSpecification, LayoutStyle } from '../types/convention';
import { X, Maximize2, Shield, Zap, Layers, Check } from 'lucide-react';

interface FloorPlanModalProps {
  hall: HallSpecification | null;
  onClose: () => void;
  onSelectForBooking: (hallId: string) => void;
}

export const FloorPlanModal: React.FC<FloorPlanModalProps> = ({
  hall,
  onClose,
  onSelectForBooking,
}) => {
  const [activeLayout, setActiveLayout] = useState<LayoutStyle>('theater');

  if (!hall) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0E1420] border border-[#253047] rounded-xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#253047] bg-[#131926]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#C5A880] font-mono uppercase tracking-wider">
              <span>Architectural Blueprint</span>
              <span aria-hidden="true">·</span>
              <span>Cadastral Staging Vector</span>
            </div>
            <h3 className="text-xl font-editorial text-[#F2ECE1] mt-1">{hall.name} Schematic</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#828D9F] hover:text-[#EDE8DF] hover:bg-[#253047]/50 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Blueprint Layout Controls */}
        <div className="px-6 py-4 border-b border-[#253047] bg-[#0B0F17] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#828D9F]">Topology Overlay:</span>
            <div className="flex items-center gap-1 p-1 bg-[#131926] rounded-md border border-[#253047]">
              {(['theater', 'banquet', 'classroom', 'exhibition'] as LayoutStyle[]).map((style) => (
                <button
                  key={style}
                  onClick={() => setActiveLayout(style)}
                  className={`px-3 py-1 text-xs font-medium rounded capitalize transition-colors cursor-pointer ${
                    activeLayout === style
                      ? 'bg-[#C5A880] text-[#0B0F17]'
                      : 'text-[#A2ABB8] hover:text-[#EDE8DF]'
                  }`}
                >
                  {style} ({hall.capacities[style]})
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs font-mono text-[#828D9F] tabular-nums">
            Clearance: <span className="text-[#F2ECE1]">{hall.ceilingHeightM}m</span> · Area:{' '}
            <span className="text-[#F2ECE1]">{hall.areaSqM} m²</span>
          </div>
        </div>

        {/* SVG Blueprint Canvas */}
        <div className="p-6 bg-[#080C14] flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl bg-[#0D1322] border-2 border-dashed border-[#253047] rounded-lg p-6 relative overflow-hidden">
            {/* Grid background simulation */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(#C5A880 1px, transparent 1px), radial-gradient(#C5A880 1px, #0D1322 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Stage / Plenary Proscenium */}
            <div className="relative z-10 mx-auto w-3/4 h-16 bg-[#1A2338] border border-[#C5A880]/60 rounded flex items-center justify-center text-xs font-mono text-[#C5A880] mb-6 shadow-md">
              <div className="text-center">
                <span className="block font-semibold">MAIN ELEVATED STAGE (18m x 6m)</span>
                <span className="text-[10px] text-[#828D9F]">4K Direct-View LED Proscenium Backdrop</span>
              </div>
            </div>

            {/* Stage Left/Right Green Rooms */}
            <div className="relative z-10 flex justify-between gap-4 mb-6">
              <div className="w-24 h-10 border border-[#253047] bg-[#131926] text-[10px] font-mono text-[#828D9F] flex items-center justify-center rounded">
                Green Room A
              </div>
              <div className="text-[10px] font-mono text-[#C5A880] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
                Primary Egress Aisle (2.4m NFPA Clear)
              </div>
              <div className="w-24 h-10 border border-[#253047] bg-[#131926] text-[10px] font-mono text-[#828D9F] flex items-center justify-center rounded">
                Production FOH
              </div>
            </div>

            {/* Simulated Seating Area based on layout */}
            <div className="relative z-10 py-6 px-4 border border-[#253047] rounded bg-[#0B0F17]/70">
              {activeLayout === 'theater' && (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((row) => (
                    <div key={row} className="flex justify-between items-center gap-4">
                      <div className="flex-1 flex justify-around gap-1">
                        {Array.from({ length: 14 }).map((_, i) => (
                          <span
                            key={i}
                            className="w-2.5 h-2.5 rounded-sm bg-[#253047] hover:bg-[#C5A880] transition-colors"
                          />
                        ))}
                      </div>
                      <div className="w-8 text-center text-[10px] font-mono text-[#828D9F]">
                        AISLE
                      </div>
                      <div className="flex-1 flex justify-around gap-1">
                        {Array.from({ length: 14 }).map((_, i) => (
                          <span
                            key={i}
                            className="w-2.5 h-2.5 rounded-sm bg-[#253047] hover:bg-[#C5A880] transition-colors"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                  <p className="text-center text-[10px] text-[#828D9F] font-mono mt-4">
                    52 Continuous Delegate Rows · 1.05m pitch · Staggered sightlines
                  </p>
                </div>
              )}

              {activeLayout === 'banquet' && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 py-4 place-items-center">
                  {Array.from({ length: 18 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="w-12 h-12 rounded-full border border-[#C5A880]/50 bg-[#131926] flex items-center justify-center text-[9px] font-mono text-[#C5A880]"
                    >
                      T{idx + 1} (10p)
                    </div>
                  ))}
                </div>
              )}

              {activeLayout === 'classroom' && (
                <div className="space-y-3 py-2">
                  {[1, 2, 3, 4].map((row) => (
                    <div key={row} className="flex justify-around items-center gap-3">
                      <div className="flex-1 h-4 bg-[#1A2338] border border-[#253047] rounded text-[9px] font-mono text-[#828D9F] flex items-center justify-center">
                        Desk Row {row}A (Power/USB-C)
                      </div>
                      <div className="w-6 text-center text-[9px] font-mono text-[#828D9F]">•</div>
                      <div className="flex-1 h-4 bg-[#1A2338] border border-[#253047] rounded text-[9px] font-mono text-[#828D9F] flex items-center justify-center">
                        Desk Row {row}B (Power/USB-C)
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeLayout === 'exhibition' && (
                <div className="grid grid-cols-4 gap-3 py-3">
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="h-16 border border-[#C5A880]/40 bg-[#131926] rounded p-1 text-center flex flex-col justify-between"
                    >
                      <span className="text-[10px] font-mono text-[#C5A880]">BOOTH #{101 + idx}</span>
                      <span className="text-[9px] text-[#828D9F]">3m x 3m (32A Feed)</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Rear Control Booth & Emergency Exits */}
            <div className="relative z-10 flex items-center justify-between mt-6 pt-4 border-t border-[#253047] text-[10px] font-mono text-[#828D9F]">
              <span className="flex items-center gap-1 text-rose-400">
                <Shield className="w-3 h-3" />
                Fire Exit West (2.8m Door)
              </span>
              <div className="p-1 px-3 bg-[#131926] border border-[#253047] text-[#C5A880] rounded">
                Dante / SDI Audio-Visual Master Riser
              </div>
              <span className="flex items-center gap-1 text-rose-400">
                <Shield className="w-3 h-3" />
                Fire Exit East (2.8m Door)
              </span>
            </div>
          </div>
        </div>

        {/* Footer info & CTA */}
        <div className="p-6 border-t border-[#253047] bg-[#131926] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#A2ABB8]">
            <span className="text-[#F2ECE1] font-medium block">Approved Staging Document</span>
            <span>Flooring: {hall.flooring} · Loading: {hall.loadingDockAccess}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#EDE8DF] border border-[#253047] hover:bg-[#253047]/40 rounded transition-colors cursor-pointer"
            >
              Close Blueprint
            </button>
            <button
              onClick={() => {
                onClose();
                onSelectForBooking(hall.id);
              }}
              className="px-4 py-2 text-xs font-medium text-[#0B0F17] bg-[#C5A880] hover:bg-[#D5BFA0] rounded transition-colors whitespace-nowrap cursor-pointer"
            >
              Select for Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
