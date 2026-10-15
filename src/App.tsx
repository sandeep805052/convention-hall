import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RequirementsGuide } from './components/RequirementsGuide';
import { HallsShowcase } from './components/HallsShowcase';
import { CateringMenuSection } from './components/CateringMenuSection';
import { RequirementsCalculator } from './components/RequirementsCalculator';
import { StandardsSection } from './components/StandardsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloorPlanModal } from './components/FloorPlanModal';
import { BookingModal } from './components/BookingModal';
import { DossierModal } from './components/DossierModal';
import { AuthModal } from './components/AuthModal';
import { DashboardView } from './components/DashboardView';
import { HallSpecification, BookingState } from './types/convention';
import { CalendarCheck, ChevronRight, LayoutDashboard, Sparkles, UserCheck } from 'lucide-react';
import HeroDemo from './demo';

function AppContent() {
  const { user, isAuthenticated } = useAuth();
  const [viewMode, setViewMode] = useState<'convention' | 'dashboard' | 'hero_demo'>('convention');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isFloorPlanOpen, setIsFloorPlanOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const [activeFloorPlanHall, setActiveFloorPlanHall] = useState<HallSpecification | null>(null);
  const [dossierData, setDossierData] = useState<any>(null);
  const [bookingParams, setBookingParams] = useState<Partial<BookingState>>({});
  const [activeReservationsCount, setActiveReservationsCount] = useState<number>(0);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('aurora_bookings') || '[]');
      setActiveReservationsCount(stored.length);
    } catch {
      setActiveReservationsCount(0);
    }
  }, [isBookingOpen, viewMode]);

  const handleOpenBooking = (initialHallId?: string) => {
    if (initialHallId) {
      setBookingParams((prev) => ({ ...prev, hallId: initialHallId }));
    }
    setIsBookingOpen(true);
  };

  const handleSelectMenuForBooking = (menuName: string) => {
    setBookingParams((prev) => ({
      ...prev,
      cateringOption: 'plated_3course',
      notes: `Preferred Culinary Menu: ${menuName}`,
    }));
    setIsBookingOpen(true);
  };

  const handleViewFloorPlan = (hall: HallSpecification) => {
    setActiveFloorPlanHall(hall);
    setIsFloorPlanOpen(true);
  };

  const handleOpenDossier = (data: any) => {
    setDossierData(data);
    setIsDossierOpen(true);
  };

  const handleProceedFromCalculator = (initialState: Partial<BookingState>) => {
    setBookingParams(initialState);
    setIsBookingOpen(true);
  };

  const handleScrollToRequirements = () => {
    setViewMode('convention');
    setTimeout(() => {
      const el = document.getElementById('requirements-guide');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleScrollToCalculator = () => {
    setViewMode('convention');
    setTimeout(() => {
      const el = document.getElementById('feasibility-calculator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#EDE8DF] flex flex-col font-sans selection:bg-[#C5A880]/30 selection:text-[#EDE8DF]">
      {/* Top Application Switcher Bar */}
      <div className="bg-[#111723] border-b border-[#253047] py-2 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#828D9F] font-mono">L&apos;AURORA Platform Mode:</span>
            <span className="text-[#C5A880] font-mono capitalize">
              {viewMode === 'convention'
                ? 'Public Convention Venue Portal'
                : viewMode === 'dashboard'
                ? 'Organizer & Faculty Workspace'
                : 'Interactive Hero Banner Preview'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 p-0.5 bg-[#0B0F17] rounded-md border border-[#253047]">
            <button
              onClick={() => setViewMode('convention')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'convention'
                  ? 'bg-[#C5A880] text-[#0B0F17]'
                  : 'text-[#828D9F] hover:text-[#EDE8DF]'
              }`}
            >
              Venue Portal
            </button>
            <button
              onClick={() => {
                if (isAuthenticated) {
                  setViewMode('dashboard');
                } else {
                  handleOpenAuth('login');
                }
              }}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                viewMode === 'dashboard'
                  ? 'bg-[#C5A880] text-[#0B0F17]'
                  : 'text-[#828D9F] hover:text-[#EDE8DF]'
              }`}
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>Organizer Dashboard</span>
              {isAuthenticated && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              )}
            </button>
            <button
              onClick={() => setViewMode('hero_demo')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                viewMode === 'hero_demo'
                  ? 'bg-[#C5A880] text-[#0B0F17]'
                  : 'text-[#828D9F] hover:text-[#EDE8DF]'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Hero Demo</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'hero_demo' ? (
        <div className="flex-1 relative">
          <HeroDemo />
        </div>
      ) : viewMode === 'dashboard' ? (
        <div className="flex-1">
          <DashboardView
            onNewBooking={() => handleOpenBooking()}
            onViewRequirements={handleScrollToRequirements}
            onOpenMenu={() => {
              setViewMode('convention');
              setTimeout(() => {
                const el = document.getElementById('culinary-menu-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
          />
        </div>
      ) : (
        <>
          {/* Top Bar Contract Navigation */}
          <Navbar
            onOpenBooking={() => handleOpenBooking()}
            onOpenCalculator={handleScrollToCalculator}
            onOpenAuth={handleOpenAuth}
            onOpenDashboard={() => setViewMode('dashboard')}
          />

          {/* Floating Active Booking Badge indicator if user has placed holds */}
          {activeReservationsCount > 0 && (
            <div className="bg-[#131926] border-b border-[#253047] py-2 px-6">
              <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#C5A880]">
                  <CalendarCheck className="w-4 h-4" />
                  <span>
                    You currently have {activeReservationsCount} active First-Option date hold(s) in registry.
                  </span>
                </div>
                <button
                  onClick={() => setViewMode('dashboard')}
                  className="text-[#EDE8DF] hover:text-[#C5A880] transition-colors flex items-center gap-1 font-medium cursor-pointer"
                >
                  <span>Open in Organizer Dashboard</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Main Content Sections */}
          <main className="flex-1">
            {/* 1. Hero Section */}
            <HeroSection
              onOpenBooking={() => handleOpenBooking()}
              onExploreRequirements={handleScrollToRequirements}
              onOpenCalculator={handleScrollToCalculator}
            />

            {/* 2. Educational & Rigorous 5-Pillar Convention Booking Requirements Guide */}
            <RequirementsGuide onOpenBooking={() => handleOpenBooking()} />

            {/* 3. Grand Architectural Halls & Interactive Topology Visualizer */}
            <HallsShowcase
              onSelectHall={(hallId) => handleOpenBooking(hallId)}
              onViewFloorPlan={handleViewFloorPlan}
            />

            {/* 4. Banqueting & Culinary Menus Section */}
            <CateringMenuSection
              onSelectMenuForBooking={handleSelectMenuForBooking}
            />

            {/* 5. Dynamic Spatial, Egress & Feasibility Estimator */}
            <RequirementsCalculator
              onOpenDossier={handleOpenDossier}
              onProceedToBooking={handleProceedFromCalculator}
            />

            {/* 6. Statutory Codification & Regulatory Standards Reference */}
            <StandardsSection />

            {/* 7. Tenancy Governance & Policies FAQ */}
            <FaqSection />
          </main>

          {/* Quiet Architectural Footer */}
          <Footer />
        </>
      )}

      {/* Modals */}
      <FloorPlanModal
        hall={activeFloorPlanHall}
        onClose={() => setIsFloorPlanOpen(false)}
        onSelectForBooking={(hallId) => {
          setIsFloorPlanOpen(false);
          handleOpenBooking(hallId);
        }}
      />

      <DossierModal
        data={dossierData}
        onClose={() => setIsDossierOpen(false)}
        onProceedToBooking={() => {
          setIsDossierOpen(false);
          handleOpenBooking(dossierData?.primaryRecommendedHall?.id);
        }}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialParams={bookingParams}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => setViewMode('dashboard')}
        initialMode={authMode}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
