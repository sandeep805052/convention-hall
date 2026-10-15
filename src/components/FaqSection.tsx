import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the precise legal difference between a First-Option Hold and a Confirmed Booking?',
      a: 'A First-Option Hold provides the organizer with an exclusive 14-calendar-day window during which no other client can book the space. If another party issues a competing date challenge, you receive written notice with 48 hours to either execute the Master Services Agreement (MSA) and pay the 25% retainer or release the date. A Confirmed Booking is legally binding only after the signed contract and 25% non-refundable retainer are deposited.',
    },
    {
      q: 'What specific Certificate of Insurance (COI) parameters must our institution submit?',
      a: 'Organizers must provide a Certificate of Commercial General Liability insurance showing a minimum limit of ₹80 Crore (₹800,000,000 INR / $10M equivalent) per occurrence / aggregate, naming L\'AURORA Convention Centre and the Municipal Port Authority as additional insured parties. The policy must include host liquor liability (if alcohol is served), contractual liability, and proof of statutory workers\' compensation coverage for all sub-contractors.',
    },
    {
      q: 'Are independent AV production companies and outside caterers allowed on premises?',
      a: 'Yes. External production and catering teams are welcomed subject to technical accreditation. Outside rigging vendors must supply certified ETCP riggers and PE-stamped rigging plots. Outside caterers must operate within our master culinary prep staging facilities, possess valid municipal food service permits, and follow HACCP certified food handling rules.',
    },
    {
      q: 'How are bump-in (load-in) and bump-out windows scheduled to prevent freight bottlenecking?',
      a: 'All vehicle arrivals at our dual hydraulic loading bays require allocated 45-minute marshaling slots scheduled through our Dockmaster portal. Standard tenancies budget 1 full load-in day prior to event opening. Operating outside contracted tenancy hours (after 23:30 or before 07:00) incurs an hourly facility fee plus overtime staffing surcharges.',
    },
    {
      q: 'How does the Fire Marshal approval process work for custom exhibition layouts?',
      a: 'Every bespoke floor plan must be submitted to the municipal Fire Prevention Bureau at least 21 days before doors open. The plan must clearly denote 2.4m egress corridors, fire hose cabinet clear zones, exit signage sightlines, and emergency extinguisher locations. Doors cannot open until the Fire Marshal conducts an on-site physical inspection and posts the stamped occupancy certificate.',
    },
    {
      q: 'When and how is the refundable security damage bond refunded?',
      a: 'A refundable security bond (typically ₹12,00,000 INR) is held in an escrow account. Within 72 hours of event conclusion, a joint post-event dilapidation walkthrough is conducted with the venue operations manager. Barring mechanical, architectural, or carpet damage, 100% of the escrow is released back to your institution within 14 business days.',
    },
  ];

  return (
    <section id="booking-faq" className="py-20 border-b border-[#253047] bg-[#0E1420]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-widest uppercase text-[#C5A880] mb-3">
            <span>Contractual Clarifications</span>
            <span aria-hidden="true">·</span>
            <span>Tenancy Terms & FAQs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial text-[#F2ECE1]">
            Convention Tenancy Governance
          </h2>
          <p className="mt-3 text-sm text-[#A2ABB8]">
            Key operational policies, statutory obligations, and milestone protocols governing convention hall reservations.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-lg border border-[#253047] bg-[#131926]/40 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#131926]/70 transition-colors"
                >
                  <span className="text-sm sm:text-base font-editorial text-[#F2ECE1] font-medium">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C5A880] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#A2ABB8] leading-relaxed border-t border-[#253047]/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
