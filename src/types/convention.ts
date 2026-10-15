export type EventType =
  | 'international_summit'
  | 'corporate_gala'
  | 'tech_expo'
  | 'academic_symposium'
  | 'cultural_concert'
  | 'luxury_reception';

export type LayoutStyle = 'theater' | 'banquet' | 'classroom' | 'cocktail' | 'exhibition';

export interface HallSpecification {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  areaSqM: number;
  areaSqFt: number;
  ceilingHeightM: number;
  maxCapacity: number;
  capacities: Record<LayoutStyle, number>;
  powerCapacityKva: number;
  acousticRatingRt60: string; // e.g., "0.85s"
  flooring: string;
  loadingDockAccess: string;
  features: string[];
  description: string;
  baseDayRateInr: number;
}

export interface RequirementPillar {
  id: string;
  pillarNumber: string;
  title: string;
  subtitle: string;
  overview: string;
  keyFactors: {
    title: string;
    description: string;
    benchmark: string;
    importance: 'Mandatory' | 'Critical' | 'Recommended';
  }[];
  regulatoryStandards: string[];
  checklistItems: string[];
}

export interface BookingState {
  hallId: string;
  eventType: EventType;
  layoutStyle: LayoutStyle;
  guestCount: number;
  eventDate: string;
  timeSlot: 'morning' | 'evening' | 'full_day';
  cateringOption: 'none' | 'canapes' | 'plated_3course' | 'buffet_deluxe';
  technicalTier: 'standard_av' | 'broadcast_grade' | 'immersive_production';
  securityStaffing: boolean;
  dedicatedFiberStream: boolean;
  simultaneousTranslation: boolean;
  contactName: string;
  contactEmail: string;
  organization: string;
  notes: string;
}
