import React, { useState } from 'react';
import { CATERING_PACKAGES, MenuPackage } from '../data/menuData';
import { Utensils, Award, Flame, Coffee, Sparkles, Check, ArrowRight } from 'lucide-react';

interface CateringMenuSectionProps {
  onSelectMenuForBooking: (menuName: string) => void;
}

export const CateringMenuSection: React.FC<CateringMenuSectionProps> = ({
  onSelectMenuForBooking,
}) => {
  const [selectedPackageId, setSelectedPackageId] = useState<string>(CATERING_PACKAGES[0].id);
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [guestCount, setGuestCount] = useState<number>(650);

  const activePackage =
    CATERING_PACKAGES.find((pkg) => pkg.id === selectedPackageId) || CATERING_PACKAGES[0];

  const totalCulinaryCost = guestCount * activePackage.pricePerPlateInr;

  const filterDishes = (items: typeof activePackage.appetizers) => {
    if (dietaryFilter === 'all') return items;
    return items.filter((item) => (item.dietary as string[]).includes(dietaryFilter));
  };

  return (
    <section id="culinary-menu-section" className="py-20 border-b border-[#253047] bg-[#0E1420]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#C5A880] mb-3">
              <span>HACCP Certified Assembly Gastronomy</span>
              <span aria-hidden="true">·</span>
              <span>Commercial Staging Kitchen</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial text-[#F2ECE1]">
              Convention Banqueting & Culinary Menus
            </h2>
            <p className="mt-3 text-[#A2ABB8] text-sm max-w-2xl leading-relaxed">
              Equipped with a 1,200 m² commercial master staging kitchen, walk-in cold rooms, and dedicated sculleries. We cater plated course dinners, grand buffets, and live artisan culinary stations for assemblies up to 3,200 guests.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 text-xs font-mono text-[#828D9F] border border-[#253047] p-3 rounded-lg bg-[#131926]/60 shrink-0">
            <div>
              <span className="text-[#C5A880] text-sm font-bold block">100% HACCP</span>
              <span>Food Safety Certified</span>
            </div>
            <div className="w-px h-8 bg-[#253047]" />
            <div>
              <span className="text-[#F2ECE1] text-sm font-bold block">200 Plates / 10m</span>
              <span>Plating Speed / Station</span>
            </div>
          </div>
        </div>

        {/* Visual Hero Showcase of Luxury Banquet */}
        <div className="mb-12 relative rounded-xl overflow-hidden border border-[#253047] bg-[#131926] shadow-2xl group">
          <img
            src="/src/assets/images/luxury_banquet_catering_1792089948944.jpg"
            alt="L'AURORA Luxury Convention Banquet Staging"
            className="w-full h-[320px] sm:h-[400px] object-cover transition-transform duration-700 group-hover:scale-102"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/40 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#0B0F17]/85 backdrop-blur-md rounded-lg border border-[#253047] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#C5A880] uppercase tracking-wider block">
                Executive Chef Curated Staging
              </span>
              <h3 className="text-xl font-editorial text-[#F2ECE1] mt-1">
                State-of-the-Art Banquet Kitchen & Silver Chafing Array
              </h3>
              <p className="text-xs text-[#A2ABB8] mt-1">
                From live charcoal tandoor fires to nitrogen gelato and bespoke international courses.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono text-[#828D9F]">
                Starting from <span className="text-base text-[#C5A880] font-bold">₹1,450</span> / plate
              </span>
            </div>
          </div>
        </div>

        {/* Menu Package Selector Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {CATERING_PACKAGES.map((pkg) => {
            const isSelected = pkg.id === selectedPackageId;
            return (
              <button
                key={pkg.id}
                onClick={() => setSelectedPackageId(pkg.id)}
                className={`p-4 rounded-lg text-left transition-all border cursor-pointer ${
                  isSelected
                    ? 'border-[#C5A880] bg-[#131926] shadow-lg'
                    : 'border-[#253047] bg-[#131926]/40 hover:border-[#828D9F]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#C5A880] font-mono">
                    ₹{pkg.pricePerPlateInr.toLocaleString('en-IN')} / Plate
                  </span>
                  <span className="text-[10px] text-[#828D9F] font-mono">
                    {pkg.coursesCount} Courses
                  </span>
                </div>
                <h4 className="text-base font-editorial text-[#F2ECE1] mt-1 truncate">
                  {pkg.name}
                </h4>
                <p className="text-xs text-[#828D9F] mt-1 truncate">{pkg.highlightStation}</p>
              </button>
            );
          })}
        </div>

        {/* Active Package Deep Dive */}
        <div className="p-8 rounded-xl border border-[#253047] bg-[#131926]/60 space-y-8">
          {/* Package Overview & Live Plate Budget Estimator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#253047] pb-8">
            <div className="lg:col-span-7 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880]">
                <span>CULINARY DOSSIER</span>
                <span aria-hidden="true">·</span>
                <span>MIN PAX: {activePackage.minimumPax}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-editorial text-[#F2ECE1]">
                {activePackage.name}
              </h3>
              <p className="text-xs text-[#828D9F]">{activePackage.subtitle}</p>
              <p className="text-sm text-[#A2ABB8] leading-relaxed pt-2">
                {activePackage.description}
              </p>
            </div>

            {/* Live Plate Cost Calculator Widget */}
            <div className="lg:col-span-5 p-5 rounded-lg bg-[#0B0F17] border border-[#253047] space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#828D9F] uppercase tracking-wider font-medium">
                  Estimate Guests for Banquet:
                </span>
                <span className="font-mono text-base font-bold text-[#C5A880]">
                  {guestCount.toLocaleString()} Plates
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="3200"
                step="25"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full accent-[#C5A880] bg-[#131926] cursor-pointer"
              />

              <div className="pt-2 border-t border-[#253047] flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-[#828D9F] block">Total Catering Estimate:</span>
                  <span className="text-2xl font-mono font-bold text-[#F2ECE1] tabular-nums">
                    ₹{totalCulinaryCost.toLocaleString('en-IN')}
                  </span>
                </div>
                <button
                  onClick={() => onSelectMenuForBooking(activePackage.name)}
                  className="px-4 py-2 text-xs font-medium text-[#0B0F17] bg-[#C5A880] hover:bg-[#D5BFA0] rounded transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Select Menu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dietary Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#828D9F] uppercase tracking-wider">
                Dietary Filter:
              </span>
              <div className="flex items-center gap-1 p-1 bg-[#0B0F17] rounded-md border border-[#253047]">
                {[
                  { id: 'all', label: 'All Dishes' },
                  { id: 'veg', label: 'Vegetarian' },
                  { id: 'non-veg', label: 'Non-Vegetarian' },
                  { id: 'jain', label: 'Jain Friendly' },
                  { id: 'vegan', label: 'Vegan' },
                  { id: 'gluten-free', label: 'Gluten-Free' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setDietaryFilter(item.id)}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                      dietaryFilter === item.id
                        ? 'bg-[#C5A880] text-[#0B0F17]'
                        : 'text-[#828D9F] hover:text-[#EDE8DF]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <span className="text-xs font-mono text-[#C5A880]">
              *Custom dietary accommodations (Kosher/Halal/Nut-Free) verified upon contract
            </span>
          </div>

          {/* Dishes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Appetizers Column */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#C5A880] flex items-center gap-2 border-b border-[#253047] pb-2">
                <Utensils className="w-3.5 h-3.5" />
                <span>Hors d&apos;Oeuvres & Starters</span>
              </h4>
              <div className="space-y-3">
                {filterDishes(activePackage.appetizers).map((dish, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded bg-[#0B0F17]/60 border border-[#253047] hover:border-[#C5A880]/30 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="text-sm font-semibold text-[#F2ECE1]">{dish.name}</h5>
                      <div className="flex gap-1">
                        {dish.dietary.map((d) => (
                          <span
                            key={d}
                            className="text-[10px] font-mono px-1.5 py-0.2 rounded uppercase border border-[#253047] text-[#828D9F]"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-[#A2ABB8] mt-1">{dish.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mains Column */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#C5A880] flex items-center gap-2 border-b border-[#253047] pb-2">
                <Flame className="w-3.5 h-3.5" />
                <span>Plated Entrées & Main Courses</span>
              </h4>
              <div className="space-y-3">
                {filterDishes(activePackage.mains).map((dish, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded bg-[#0B0F17]/60 border border-[#253047] hover:border-[#C5A880]/30 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="text-sm font-semibold text-[#F2ECE1]">{dish.name}</h5>
                      <div className="flex gap-1">
                        {dish.dietary.map((d) => (
                          <span
                            key={d}
                            className="text-[10px] font-mono px-1.5 py-0.2 rounded uppercase border border-[#253047] text-[#828D9F]"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-[#A2ABB8] mt-1">{dish.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Themed Staging & Desserts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#253047]">
            {/* Live Interactive Stations */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#C5A880] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Live Themed Counters</span>
              </h4>
              <div className="space-y-2">
                {activePackage.liveStations.map((station, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 rounded bg-[#0B0F17] border border-[#253047] flex items-start gap-2.5 text-xs text-[#EDE8DF]"
                  >
                    <span className="text-[#C5A880] font-mono mt-0.5">§</span>
                    <span>{station}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Desserts & Artisanal Brews */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#C5A880] flex items-center gap-2">
                <Coffee className="w-3.5 h-3.5" />
                <span>Fine Patisserie & Artisan Infusions</span>
              </h4>
              <div className="space-y-2">
                {activePackage.desserts.map((dessert, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-3 rounded bg-[#0B0F17] border border-[#253047] text-xs flex justify-between items-center"
                  >
                    <span className="text-[#F2ECE1] font-medium">{dessert.name}</span>
                    <span className="text-[11px] text-[#828D9F] truncate max-w-[200px]">
                      {dessert.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
