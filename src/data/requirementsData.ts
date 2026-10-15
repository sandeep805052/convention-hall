import { RequirementPillar } from '../types/convention';

export const CONVENTION_REQUIREMENTS_PILLARS: RequirementPillar[] = [
  {
    id: 'spatial-capacity',
    pillarNumber: '01',
    title: 'Spatial Engineering & Capacity Dynamics',
    subtitle: 'Human scale, density allowances, egress corridors, and staging geometry',
    overview:
      'Convention venue planning begins with spatial ergonomics. Overcrowding violates international life-safety codes, while under-utilization dilutes event atmosphere. Spatial requirements dictate square footage allocations per attendee based strictly on seating topology.',
    keyFactors: [
      {
        title: 'Seating Topology & Density Coefficient',
        description:
          'Net floor area requirements vary drastically: Theater style requires 0.65–0.85 m² per delegate; Banquet rounds (60" or 72" tables) require 1.35–1.65 m²; Classroom layout needs 1.85–2.20 m² with writing desks.',
        benchmark: 'Theater: 0.75 m²/pax · Banquet: 1.5 m²/pax · Classroom: 2.0 m²/pax',
        importance: 'Mandatory',
      },
      {
        title: 'Ceiling Clearance & Rigging Envelope',
        description:
          'Clear vertical clearance under the lowest beam or lighting truss dictates projection throw ratios, line array elevation, and large-format LED screen placement without obscuring sightlines.',
        benchmark: 'Minimum 8.5m for plenary screens; 12.0m+ for high-truss arena rigging',
        importance: 'Critical',
      },
      {
        title: 'Primary & Secondary Egress Corridors',
        description:
          'Unobstructed main thoroughfares must maintain direct routes to emergency exits. No cables, equipment cases, or catering tables may encroach upon designated travel pathways.',
        benchmark: 'Minimum 2.4m for primary arterial aisles; 1.5m for secondary service aisles',
        importance: 'Mandatory',
      },
      {
        title: 'Sightline Geometry & Stage Elevation',
        description:
          'The vertical angle from the furthest rear delegate to the presenter stage must not exceed 15° above horizontal. Raised stages (0.9m to 1.5m) prevent head occlusion in flat-floor halls.',
        benchmark: 'Focal sightline clearance $\\ge$ 120mm above preceding row',
        importance: 'Recommended',
      },
    ],
    regulatoryStandards: [
      'NFPA 101: Life Safety Code (Occupant Load Calculations)',
      'IBC Chapter 10: Means of Egress and Minimum Corridor Clearances',
      'ADA Standards for Accessible Seating & Step-free Companion Areas',
    ],
    checklistItems: [
      'Confirm total expected delegate count including crew, speakers, and media',
      'Select primary room configuration (Theater, Banquet, Classroom, or Dual-zone)',
      'Verify ADA accessible seating spaces (min 1% of total capacity + companion spots)',
      'Establish stage dimensions (length, depth, height) and green room proximity',
      'Validate minimum 2.4m clearance around all emergency exit doorways',
    ],
  },
  {
    id: 'technical-infrastructure',
    pillarNumber: '02',
    title: 'Power, Acoustic & Broadcast Infrastructure',
    subtitle: 'Three-phase power delivery, acoustic reverberation control, and digital pipes',
    overview:
      'Modern conventions are media production hubs. A world-class hall requires continuous industrial-grade power distribution, pristine sound insulation with controlled RT60 decay, and broadcast-ready multi-gigabit data backbones.',
    keyFactors: [
      {
        title: '3-Phase Industrial Power Distribution',
        description:
          'High-output moving heads, LED video backdrops, and heavy audio amplifiers require balanced 3-phase 415V/63A or 125A camlock disconnects, isolated cleanly from sensitive audio circuitry to prevent hum.',
        benchmark: 'Minimum 0.35 kVA per delegate for standard AV; 0.85 kVA for heavy broadcast expos',
        importance: 'Mandatory',
      },
      {
        title: 'Acoustic RT60 Reverberation Decay',
        description:
          'Reverberation time (RT60) directly determines speech intelligibility (STI). Convention halls require perforated timber or fabric acoustic absorption to keep reverberation under 1.0 second.',
        benchmark: 'Speech Plenary: RT60 0.65–0.90s · Gala / Music: RT60 1.10–1.35s',
        importance: 'Critical',
      },
      {
        title: 'Truss Working Load Limits (WLL)',
        description:
          'Overhead rigging points must be engineered with certified stamped point loads to support LED video tiles, audio arrays, and moving fixtures safely above crowds.',
        benchmark: 'Engineered for min 1,000 kg per rigging point with secondary safety wire ropes',
        importance: 'Mandatory',
      },
      {
        title: 'Redundant Gigabit Uplink & High-Density Wi-Fi',
        description:
          'Simultaneous live streaming to global networks and concurrent client app engagement requires dedicated symmetrical fiber with automated cellular/satellite failover.',
        benchmark: 'Dual 10 Gbps ISP feeds + Wi-Fi 7 access points supporting 3 devices per seat',
        importance: 'Critical',
      },
    ],
    regulatoryStandards: [
      'ANSI E1.21: Entertainment Technology — Temporary Ground-Supported Rigging',
      'IEC 60268-16: Speech Transmission Index (STI $\\ge$ 0.60 standard)',
      'National Electrical Code (NEC) Article 518: Places of Assembly & Article 520',
    ],
    checklistItems: [
      'Calculate total combined wattage for lighting, video walls, audio, and exhibition booths',
      'Request separate clean technical earth circuits for audio front-of-house (FOH)',
      'Submit stamped structural rigging plot to venue engineer 14 days prior to load-in',
      'Specify dedicated VLANs and bandwidth limits for press room and production trucks',
      'Verify wireless microphone frequency coordination with local spectrum authorities',
    ],
  },
  {
    id: 'statutory-permits',
    pillarNumber: '03',
    title: 'Statutory Permits, Life Safety & Security',
    subtitle: 'Fire marshal inspections, insurance bonds, crowd control, and legal compliance',
    overview:
      'Operating an assembly without municipal licensing or statutory permits voids venue insurance and risks immediate shutdown. Every booking dossier must satisfy rigorous civic safety and indemnification frameworks.',
    keyFactors: [
      {
        title: 'Fire Marshal Occupant Load Permit',
        description:
          'The municipal fire authority must certify the maximum occupant placard for the exact custom room layout before doors open to the public.',
        benchmark: 'Official stamped life-safety permit issued 7 days prior to event',
        importance: 'Mandatory',
      },
      {
        title: 'Public Liability Insurance & COI',
        description:
          'The organizing entity must provide a formal Certificate of Insurance naming the venue and municipality as additional insured parties against property damage and personal liability.',
        benchmark: '₹80 Crore (₹800,000,000 INR / $10M equiv) primary aggregate limit',
        importance: 'Mandatory',
      },
      {
        title: 'Certified Crowd Management & Security Ratio',
        description:
          'Assemblies exceeding 250 occupants mandate trained crowd managers present on site to direct evacuation corridors and monitor access points.',
        benchmark: 'Minimum 1 licensed security officer per 100 guests (1:75 if alcohol is served)',
        importance: 'Mandatory',
      },
      {
        title: 'Temporary Liquor & Food Hygiene Licensure',
        description:
          'Any hospitality service involving craft beverage dispensing, open flame cooking, or external caterers must provide certified health inspections and liquor board authorization.',
        benchmark: 'ServeSafe / HACCP certified caterers with municipal beverage permit',
        importance: 'Critical',
      },
    ],
    regulatoryStandards: [
      'NFPA 1: Fire Code (Public Assembly & Flame-Retardant Draping Standards)',
      'OSHA 29 CFR 1910: General Industry Safety Regulations',
      'Local Municipal Noise Ordinance (strict $\\le$ 65 dBA perimeter after 22:00)',
    ],
    checklistItems: [
      'Provide current Certificate of Insurance (COI) valid through bump-out date',
      'Submit flame-spread certificates (NFPA 701) for all scenic fabrics, banners, and drape',
      'Contract certified security personnel and medical first-responder EMT station',
      'File temporary sound emission permits if external amplification or fireworks are planned',
      'Finalize emergency action plan (EAP) and assign designated floor wardens',
    ],
  },
  {
    id: 'logistics-catering',
    pillarNumber: '04',
    title: 'Loading Logistics, Scheduling & Culinary Chain',
    subtitle: 'Bump-in sequencing, freight elevator capacities, and cold-chain staging',
    overview:
      'Logistical friction during bump-in destroys timelines. A professional convention booking requires micro-scheduling of semi-trailers, floor weight loading verification, and commercial kitchen staging.',
    keyFactors: [
      {
        title: 'Freight Dock Marshalling & Time Windows',
        description:
          'Heavy gear and booth structures require allocated loading dock slots. Semi-truck arrival without prior booking causes street congestion and port delays.',
        benchmark: 'Staggered 45-minute dock arrival windows with dockmaster supervision',
        importance: 'Critical',
      },
      {
        title: 'Freight Elevator Dimensions & Point Load Limits',
        description:
          'Large production road cases, vehicles, or architectural booths must fit inside freight elevators without exceeding cable tonnage or door dimensions.',
        benchmark: 'Elevator: 8-ton hydraulic capacity; floor point load rating $\\ge$ 15 kN/m²',
        importance: 'Mandatory',
      },
      {
        title: 'Bump-In & Bump-Out Timetables',
        description:
          'Contractual hire periods must explicitly budget for 12–24 hours of setup before attendee arrival and 6–12 hours of tear-down post event to avoid hourly penalties.',
        benchmark: 'Standard ratio: 1 day setup for every 2 days of active convention',
        importance: 'Mandatory',
      },
      {
        title: 'HACCP Culinary Staging & Waste Manifest',
        description:
          'Plated service for 1,000+ delegates requires high-output hot holding cabinets, dedicated plating lines, separate sculleries, and organic/recyclable waste management.',
        benchmark: 'Plating line throughput of 200 plates per 10 minutes per station',
        importance: 'Recommended',
      },
    ],
    regulatoryStandards: [
      'FDA Food Code & HACCP Culinary Safe Handling Compliance',
      'DOT Freight Delivery & Dock Marshalling Safety Protocols',
      'ISO 20121: Event Sustainability Management Systems',
    ],
    checklistItems: [
      'Obtain truck dimensions and create loading dock marshaling schedule',
      'Ensure all floor coverings comply with heavy forklift or pallet jack wheels',
      'Coordinate dedicated service elevators for catering staff vs production crews',
      'Plan comprehensive post-event waste breakdown and recycling bins',
      'Schedule end-of-event walkthrough with venue operations manager for bond sign-off',
    ],
  },
  {
    id: 'contractual-financial',
    pillarNumber: '05',
    title: 'Contractual Milestones, Date Protection & SLAs',
    subtitle: 'Pencil holds, non-refundable retainers, damage escrows, and force majeure',
    overview:
      'A convention booking is a legally binding real-estate lease. Understanding the progression from tentative interest to date hold, deposit tranches, and liquidated damages prevents catastrophic financial exposure.',
    keyFactors: [
      {
        title: 'First-Option vs Second-Option Date Holds',
        description:
          'Venues grant a "First Option" hold for typically 14 calendar days. If a competing organizer issues a contract challenge, the holder has 48–72 hours to execute the contract or release the date.',
        benchmark: '14-day tentative hold window with 48-hour challenge clause',
        importance: 'Critical',
      },
      {
        title: 'Staged Retainer & Payment Tranches',
        description:
          'Convention spaces are booked 6 to 24 months in advance. Payments are staged: 25% upon contract execution, 50% at 180 days out, and final 25% + damage escrow 30 days prior.',
        benchmark: '25% booking deposit · 50% milestone · 25% balance + ₹12,00,000 security escrow',
        importance: 'Mandatory',
      },
      {
        title: 'Cancellation & Attrition Scale',
        description:
          'Because convention centers cannot easily resell open dates on short notice, cancellation clauses enforce progressive sliding liquidated damages.',
        benchmark: '>180 days: Retainer forfeited · 90-180 days: 50% due · <90 days: 100% due',
        importance: 'Mandatory',
      },
      {
        title: 'Overtime & Dark Day Penalties',
        description:
          'Exceeding contractual operating hours incurs punitive union labor rates and venue overtime surcharges calculated on an hourly basis.',
        benchmark: 'Overtime billed at 1.5x hourly facility rate + staffing penalty past midnight',
        importance: 'Recommended',
      },
    ],
    regulatoryStandards: [
      'Commercial Real Estate Tenancy & Short-Term License Agreements',
      'Force Majeure / Frustration of Contract Standards (ICC Model Force Majeure Clause)',
      'Escrow Security Deposit Regulations and Post-Event Inspection Audits',
    ],
    checklistItems: [
      'Lock in tentative date hold within the 14-day option window',
      'Execute Master Services Agreement (MSA) and remit 25% booking retainer',
      'Review attrition allowances for contracted hotel block & banquet minimums',
      'Verify exact definition of Force Majeure (pandemic, civil strike, acts of God)',
      'Receive written confirmation of release of damage bond within 14 days post-event',
    ],
  },
];
