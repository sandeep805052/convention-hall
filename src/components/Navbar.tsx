import React from 'react';
import { ArrowUpRight, User, LayoutDashboard, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenCalculator: () => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onOpenDashboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenCalculator,
  onOpenAuth,
  onOpenDashboard,
}) => {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F17]/90 backdrop-blur-md border-b border-[#253047]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-xl font-editorial tracking-wider text-[#F2ECE1] uppercase whitespace-nowrap shrink-0 hover:text-[#C5A880] transition-colors"
        >
          L&apos;AURORA
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#A2ABB8]">
          <a
            href="#requirements-guide"
            className="hover:text-[#F2ECE1] transition-colors whitespace-nowrap shrink-0"
          >
            Requirements
          </a>
          <a
            href="#halls-showcase"
            className="hover:text-[#F2ECE1] transition-colors whitespace-nowrap shrink-0"
          >
            Grand Halls
          </a>
          <a
            href="#culinary-menu-section"
            className="hover:text-[#F2ECE1] transition-colors whitespace-nowrap shrink-0"
          >
            Banqueting Menus
          </a>
          <a
            href="#feasibility-calculator"
            className="hover:text-[#F2ECE1] transition-colors whitespace-nowrap shrink-0"
          >
            Feasibility Calculator
          </a>
          <a
            href="#booking-faq"
            className="hover:text-[#F2ECE1] transition-colors whitespace-nowrap shrink-0"
          >
            Tenancy Terms
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {isAuthenticated ? (
            <button
              onClick={onOpenDashboard}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#EDE8DF] border border-[#253047] hover:border-[#C5A880] hover:bg-[#131926] rounded-md transition-colors cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="truncate max-w-[110px]">{user?.name?.split(' ')[0]}</span>
            </button>
          ) : (
            <button
              onClick={() => onOpenAuth('login')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#A2ABB8] hover:text-[#EDE8DF] hover:bg-[#131926] rounded-md transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Portal Login</span>
            </button>
          )}

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#0B0F17] bg-[#C5A880] rounded-md hover:bg-[#D5BFA0] transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            <span>Reserve Hall</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
