import React, { useState } from 'react';
import { VENUE_HALLS } from '../data/hallsData';
import { BookingState, EventType, LayoutStyle } from '../types/convention';
import {
  X,
  Calendar,
  Clock,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Building,
  User,
  Mail,
  Copy,
  Check,
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialHallId?: string;
  initialParams?: Partial<BookingState>;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialHallId,
  initialParams,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [copied, setCopied] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  const [form, setForm] = useState<BookingState>({
    hallId: initialHallId || initialParams?.hallId || VENUE_HALLS[0].id,
    eventType: (initialParams?.eventType as EventType) || 'international_summit',
    layoutStyle: (initialParams?.layoutStyle as LayoutStyle) || 'theater',
    guestCount: initialParams?.guestCount || 850,
    eventDate: initialParams?.eventDate || '2026-11-20',
    timeSlot: 'full_day',
    cateringOption: initialParams?.cateringOption || 'plated_3course',
    technicalTier: initialParams?.technicalTier || 'broadcast_grade',
    securityStaffing: true,
    dedicatedFiberStream: true,
    simultaneousTranslation: false,
    contactName: '',
    contactEmail: '',
    organization: '',
    notes: '',
  });

  if (!isOpen) return null;

  const selectedHall = VENUE_HALLS.find((h) => h.id === form.hallId) || VENUE_HALLS[0];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete booking
      const refCode = `LAUR-${Math.random().toString(36).substring(2, 8).toUpperCase()}-2026`;
      setBookingReference(refCode);
      setBookingConfirmed(true);

      // Save to localStorage
      try {
        const existing = JSON.parse(localStorage.getItem('aurora_bookings') || '[]');
        existing.push({
          reference: refCode,
          timestamp: new Date().toISOString(),
          ...form,
          hallName: selectedHall.name,
        });
        localStorage.setItem('aurora_bookings', JSON.stringify(existing));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(bookingReference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0E1420] border border-[#253047] rounded-xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#253047] bg-[#131926]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#C5A880] font-mono uppercase tracking-wider">
              <span>Official Reservation Registry</span>
              <span aria-hidden="true">·</span>
              <span>14-Day Tenancy Option Hold</span>
            </div>
            <h3 className="text-xl font-editorial text-[#F2ECE1] mt-1">
              {bookingConfirmed ? 'Reservation Confirmed' : 'Reserve Convention Space'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#828D9F] hover:text-[#EDE8DF] hover:bg-[#253047]/50 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper (if not confirmed) */}
        {!bookingConfirmed && (
          <div className="px-6 py-3 border-b border-[#253047] bg-[#0B0F17] flex items-center justify-between text-xs font-mono">
            {[
              { num: 1, label: 'Space & Format' },
              { num: 2, label: 'Schedule & Time' },
              { num: 3, label: 'Technical & Safety' },
              { num: 4, label: 'Host Credentials' },
            ].map((step) => (
              <div
                key={step.num}
                className={`flex items-center gap-1.5 ${
                  currentStep === step.num
                    ? 'text-[#C5A880] font-semibold'
                    : currentStep > step.num
                    ? 'text-emerald-400'
                    : 'text-[#828D9F]'
                }`}
              >
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
                  {step.num}
                </span>
                <span className="hidden sm:inline">{step.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Body content */}
        <div className="p-6">
          {bookingConfirmed ? (
            /* Confirmation State */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono text-[#C5A880] uppercase tracking-wider block">
                  Official Venue Reservation Established
                </span>
                <h4 className="text-2xl font-editorial text-[#F2ECE1] mt-1">
                  14-Day Priority Date Hold Confirmed
                </h4>
                <p className="text-xs text-[#A2ABB8] mt-2 max-w-md mx-auto">
                  Your reservation docket has been placed on First-Option hold for {selectedHall.name}. A formal Master Services Agreement and Life-Safety compliance pack will be dispatched to your contact email.
                </p>
              </div>

              {/* Reference Code Card */}
              <div className="max-w-md mx-auto p-4 rounded-lg bg-[#0B0F17] border border-[#253047] flex items-center justify-between">
                <div className="text-left font-mono">
                  <span className="text-[10px] text-[#828D9F] block">DOCKET REFERENCE NUMBER</span>
                  <span className="text-base font-bold text-[#C5A880]">{bookingReference}</span>
                </div>
                <button
                  onClick={handleCopyRef}
                  className="px-3 py-1.5 text-xs font-medium text-[#EDE8DF] border border-[#253047] hover:bg-[#253047]/50 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Summary Specs */}
              <div className="max-w-md mx-auto grid grid-cols-2 gap-3 text-left text-xs p-4 rounded bg-[#131926]/40 border border-[#253047]">
                <div>
                  <span className="text-[#828D9F] block text-[10px]">HALL</span>
                  <span className="text-[#F2ECE1] font-medium">{selectedHall.name}</span>
                </div>
                <div>
                  <span className="text-[#828D9F] block text-[10px]">EVENT DATE</span>
                  <span className="text-[#F2ECE1] font-medium">{form.eventDate} ({form.timeSlot.replace('_', ' ')})</span>
                </div>
                <div>
                  <span className="text-[#828D9F] block text-[10px]">DELEGATES</span>
                  <span className="text-[#F2ECE1] font-medium">{form.guestCount} pax ({form.layoutStyle})</span>
                </div>
                <div>
                  <span className="text-[#828D9F] block text-[10px]">TECH & BROADCAST</span>
                  <span className="text-[#F2ECE1] font-medium capitalize">{form.technicalTier.replace('_', ' ')}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-medium text-[#0B0F17] bg-[#C5A880] hover:bg-[#D5BFA0] rounded transition-colors cursor-pointer"
                >
                  Return to Venue Portal
                </button>
              </div>
            </div>
          ) : (
            /* Step Form */
            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
              {/* STEP 1: Space & Format */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-2 font-medium">
                      Select Architectural Convention Hall:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {VENUE_HALLS.map((hall) => (
                        <div
                          key={hall.id}
                          onClick={() => setForm({ ...form, hallId: hall.id })}
                          className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                            form.hallId === hall.id
                              ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#F2ECE1]'
                              : 'border-[#253047] bg-[#0B0F17] text-[#A2ABB8] hover:border-[#828D9F]'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-semibold text-[#F2ECE1]">{hall.name}</span>
                            <span className="text-xs font-mono text-[#C5A880]">₹{hall.baseDayRateInr.toLocaleString('en-IN')}</span>
                          </div>
                          <span className="text-[11px] text-[#828D9F] block mt-1">
                            {hall.areaSqM} m² · Up to {hall.maxCapacity} pax
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-1 font-medium">
                        Event Category:
                      </label>
                      <select
                        value={form.eventType}
                        onChange={(e) => setForm({ ...form, eventType: e.target.value as EventType })}
                        className="w-full bg-[#0B0F17] border border-[#253047] text-[#EDE8DF] text-xs rounded-md px-3 py-2.5"
                      >
                        <option value="international_summit">International Summit</option>
                        <option value="corporate_gala">Corporate Gala & Awards</option>
                        <option value="tech_expo">Global Tech Expo / Trade Fair</option>
                        <option value="academic_symposium">Academic & Scientific Symposium</option>
                        <option value="luxury_reception">Landmark Celebratory Assembly</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-1 font-medium">
                        Seating Configuration:
                      </label>
                      <select
                        value={form.layoutStyle}
                        onChange={(e) => setForm({ ...form, layoutStyle: e.target.value as LayoutStyle })}
                        className="w-full bg-[#0B0F17] border border-[#253047] text-[#EDE8DF] text-xs rounded-md px-3 py-2.5"
                      >
                        <option value="theater">Theater Plenary (0.75 m²/pax)</option>
                        <option value="banquet">Banquet Gala Rounds (1.5 m²/pax)</option>
                        <option value="classroom">Classroom with Desks (2.0 m²/pax)</option>
                        <option value="cocktail">Cocktail Standing (0.6 m²/pax)</option>
                        <option value="exhibition">Exhibition 3x3m Booths</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-1 font-medium">
                      Target Delegate Headcount (Max {selectedHall.capacities[form.layoutStyle]}):
                    </label>
                    <input
                      type="number"
                      min="50"
                      max={selectedHall.capacities[form.layoutStyle] || 3000}
                      value={form.guestCount}
                      onChange={(e) => setForm({ ...form, guestCount: Number(e.target.value) })}
                      className="w-full bg-[#0B0F17] border border-[#253047] text-[#EDE8DF] text-xs rounded-md px-3 py-2.5 font-mono"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Schedule & Time */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-2 font-medium">
                      Event Date Preference:
                    </label>
                    <input
                      type="date"
                      value={form.eventDate}
                      onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                      className="w-full bg-[#0B0F17] border border-[#253047] text-[#EDE8DF] text-xs sm:text-sm rounded-md px-3 py-2.5 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-2 font-medium">
                      Daily Tenancy Shift:
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'morning', label: 'Morning Session', time: '08:00 – 14:00' },
                        { id: 'evening', label: 'Evening Gala', time: '17:00 – 23:30' },
                        { id: 'full_day', label: 'Full Day Tenancy', time: '07:00 – 23:00' },
                      ].map((slot) => (
                        <div
                          key={slot.id}
                          onClick={() => setForm({ ...form, timeSlot: slot.id as any })}
                          className={`p-3 rounded-lg border cursor-pointer text-left transition-all ${
                            form.timeSlot === slot.id
                              ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#F2ECE1]'
                              : 'border-[#253047] bg-[#0B0F17] text-[#A2ABB8]'
                          }`}
                        >
                          <span className="text-xs font-semibold block">{slot.label}</span>
                          <span className="text-[10px] text-[#828D9F] block mt-1">{slot.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-2 font-medium">
                      Culinary Staging & Catering:
                    </label>
                    <select
                      value={form.cateringOption}
                      onChange={(e) => setForm({ ...form, cateringOption: e.target.value as any })}
                      className="w-full bg-[#0B0F17] border border-[#253047] text-[#EDE8DF] text-xs rounded-md px-3 py-2.5"
                    >
                      <option value="none">Venue Only (External HACCP Catering)</option>
                      <option value="canapes">High-End Canapés & Beverage Reception</option>
                      <option value="plated_3course">Executive 3-Course Plated Banquet</option>
                      <option value="buffet_deluxe">Deluxe International Buffet</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 3: Technical & Safety */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-2 font-medium">
                      Audiovisual Production Tier:
                    </label>
                    <select
                      value={form.technicalTier}
                      onChange={(e) => setForm({ ...form, technicalTier: e.target.value as any })}
                      className="w-full bg-[#0B0F17] border border-[#253047] text-[#EDE8DF] text-xs rounded-md px-3 py-2.5"
                    >
                      <option value="standard_av">Standard AV (Dual 1080p, Lectern PA, Microphones)</option>
                      <option value="broadcast_grade">Broadcast 4K (Curved LED Wall, Line Array, Tri-Cam)</option>
                      <option value="immersive_production">Immersive Arena Production (Kinetic Rigging, Multi-Screen, Dante)</option>
                    </select>
                  </div>

                  <div className="space-y-3 pt-2">
                    <span className="text-xs text-[#828D9F] uppercase tracking-wider block font-medium">
                      Statutory Requirements & Infrastructure Add-ons:
                    </span>

                    <label className="flex items-center gap-3 p-3 bg-[#0B0F17] rounded border border-[#253047] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.securityStaffing}
                        onChange={(e) => setForm({ ...form, securityStaffing: e.target.checked })}
                        className="accent-[#C5A880]"
                      />
                      <div className="text-xs">
                        <span className="text-[#F2ECE1] font-medium block">Licensed Security & Crowd Management</span>
                        <span className="text-[#828D9F]">Certified 1:100 ratio with emergency marshal coordination</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 bg-[#0B0F17] rounded border border-[#253047] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.dedicatedFiberStream}
                        onChange={(e) => setForm({ ...form, dedicatedFiberStream: e.target.checked })}
                        className="accent-[#C5A880]"
                      />
                      <div className="text-xs">
                        <span className="text-[#F2ECE1] font-medium block">Dedicated 10 Gbps Redundant Symmetrical Fiber</span>
                        <span className="text-[#828D9F]">Isolated subnet for 4K live broadcast & attendee Wi-Fi 7</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 bg-[#0B0F17] rounded border border-[#253047] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.simultaneousTranslation}
                        onChange={(e) => setForm({ ...form, simultaneousTranslation: e.target.checked })}
                        className="accent-[#C5A880]"
                      />
                      <div className="text-xs">
                        <span className="text-[#F2ECE1] font-medium block">Simultaneous Interpretation Cabins (ISO 2603)</span>
                        <span className="text-[#828D9F]">Multilingual infrared audio distribution with delegate receivers</span>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 4: Host Credentials */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-1 font-medium">
                      Host Organization / Institution:
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-[#828D9F] absolute left-3 top-3" />
                      <input
                        required
                        type="text"
                        placeholder="e.g. World Architecture Congress / University Foundation"
                        value={form.organization}
                        onChange={(e) => setForm({ ...form, organization: e.target.value })}
                        className="w-full bg-[#0B0F17] border border-[#253047] text-[#EDE8DF] text-xs rounded-md pl-10 pr-3 py-2.5 focus:border-[#C5A880] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-1 font-medium">
                      Authorized Event Director / Lead Contact:
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#828D9F] absolute left-3 top-3" />
                      <input
                        required
                        type="text"
                        placeholder="e.g. Dr. Julian Vance"
                        value={form.contactName}
                        onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                        className="w-full bg-[#0B0F17] border border-[#253047] text-[#EDE8DF] text-xs rounded-md pl-10 pr-3 py-2.5 focus:border-[#C5A880] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-1 font-medium">
                      Corporate / Official Email Address:
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#828D9F] absolute left-3 top-3" />
                      <input
                        required
                        type="email"
                        placeholder="e.g. director@worldcongress.org"
                        value={form.contactEmail}
                        onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                        className="w-full bg-[#0B0F17] border border-[#253047] text-[#EDE8DF] text-xs rounded-md pl-10 pr-3 py-2.5 focus:border-[#C5A880] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-1 font-medium">
                      Special Technical Riders or Architectural Requirements:
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Specify loading dock dockmaster notes, heavy equipment, or VIP security protocol..."
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="w-full bg-[#0B0F17] border border-[#253047] text-[#EDE8DF] text-xs rounded-md p-3 focus:border-[#C5A880] focus:outline-none"
                    />
                  </div>

                  <div className="p-3 bg-[#0B0F17] rounded border border-[#253047] text-[11px] text-[#828D9F]">
                    By submitting, you initiate a 14-day First-Option pencil hold under L&apos;AURORA Convention Tenancy terms. A preliminary license agreement and COI requirements will be dispatched for review.
                  </div>
                </div>
              )}

              {/* Form Navigation */}
              <div className="pt-4 border-t border-[#253047] flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-4 py-2 text-xs font-medium text-[#EDE8DF] border border-[#253047] hover:bg-[#253047]/40 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-medium text-[#0B0F17] bg-[#C5A880] hover:bg-[#D5BFA0] rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{currentStep === 4 ? 'Confirm 14-Day Option Hold' : 'Continue'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
