import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Calendar,
  Building,
  FileText,
  ShieldCheck,
  Truck,
  DollarSign,
  ArrowRight,
  Download,
  Trash2,
  Upload,
  CheckCircle2,
  Clock,
  AlertCircle,
  PlusCircle,
  LogOut,
  Utensils,
  Layers,
} from 'lucide-react';

interface DashboardViewProps {
  onNewBooking: () => void;
  onViewRequirements: () => void;
  onOpenMenu: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNewBooking,
  onViewRequirements,
  onOpenMenu,
}) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'holds' | 'documents' | 'catering' | 'dockmaster'>('holds');
  const [reservations, setReservations] = useState<any[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  // Load bookings from localStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('aurora_bookings') || '[]');
      if (stored.length === 0) {
        // Seed an initial demo booking so the dashboard is immediately impressive and rich
        const defaultHold = [
          {
            reference: 'LAUR-GT2026-891',
            timestamp: new Date().toISOString(),
            hallName: 'Zenith Grand Pavilion',
            eventType: 'international_summit',
            layoutStyle: 'theater',
            guestCount: 1850,
            eventDate: '2026-11-24',
            timeSlot: 'full_day',
            cateringOption: 'plated_3course',
            technicalTier: 'broadcast_grade',
            totalCostInr: 2750000,
            status: '14-Day Option Hold',
            organization: user?.organization || 'Global Technology Council',
          },
        ];
        setReservations(defaultHold);
        localStorage.setItem('aurora_bookings', JSON.stringify(defaultHold));
      } else {
        setReservations(stored);
      }
    } catch {
      setReservations([]);
    }
  }, [user]);

  const handleCancelReservation = (ref: string) => {
    const updated = reservations.filter((r) => r.reference !== ref);
    setReservations(updated);
    localStorage.setItem('aurora_bookings', JSON.stringify(updated));
  };

  const handleSimulateUpload = (docName: string) => {
    setUploadSuccess(`Document "${docName}" successfully filed to venue registrar.`);
    setTimeout(() => setUploadSuccess(null), 3000);
  };

  const totalCommittedInr = reservations.reduce(
    (acc, r) => acc + (r.totalCostInr || 1550000),
    0
  );

  return (
    <div className="py-10 bg-[#0B0F17] text-[#EDE8DF] min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Top Profile Lockup */}
        <div className="p-6 rounded-xl border border-[#253047] bg-[#131926] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-lg bg-[#C5A880]/15 border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] text-xl font-bold font-editorial">
              {user?.name?.charAt(0) || 'D'}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-editorial text-[#F2ECE1]">{user?.name || 'Authorized Director'}</h2>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-[#C5A880]/50 text-[#C5A880] bg-[#C5A880]/10">
                  {user?.role === 'faculty' ? 'Faculty Reviewer' : 'Lead Event Director'}
                </span>
              </div>
              <p className="text-xs text-[#A2ABB8] flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-[#828D9F]" />
                <span>{user?.organization || 'Apex International Delegation'}</span>
                {user?.gstNumber && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-[#828D9F]">GST: {user.gstNumber}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNewBooking}
              className="px-4 py-2.5 text-xs font-medium text-[#0B0F17] bg-[#C5A880] hover:bg-[#D5BFA0] rounded transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Reserve Additional Hall</span>
            </button>
            <button
              onClick={logout}
              className="px-3.5 py-2.5 text-xs font-medium text-[#828D9F] hover:text-[#EDE8DF] border border-[#253047] hover:bg-[#253047]/40 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* 4 Metric KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-[#131926]/50 border border-[#253047]">
            <span className="text-xs text-[#828D9F] uppercase tracking-wider block">Active Date Holds</span>
            <span className="text-2xl font-mono text-[#F2ECE1] font-bold tabular-nums mt-1 block">
              {reservations.length} Venues
            </span>
            <span className="text-xs text-[#C5A880] mt-1 block">14-Day First Option Priority</span>
          </div>

          <div className="p-4 rounded-lg bg-[#131926]/50 border border-[#253047]">
            <span className="text-xs text-[#828D9F] uppercase tracking-wider block">Committed Tenancy Value</span>
            <span className="text-2xl font-mono text-[#C5A880] font-bold tabular-nums mt-1 block">
              ₹{totalCommittedInr.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-[#828D9F] mt-1 block">Pre-tax estimated rate</span>
          </div>

          <div className="p-4 rounded-lg bg-[#131926]/50 border border-[#253047]">
            <span className="text-xs text-[#828D9F] uppercase tracking-wider block">Statutory Audit Score</span>
            <span className="text-2xl font-mono text-emerald-400 font-bold tabular-nums mt-1 block">
              92%
            </span>
            <span className="text-xs text-[#828D9F] mt-1 block">NFPA 101 & COI compliant</span>
          </div>

          <div className="p-4 rounded-lg bg-[#131926]/50 border border-[#253047]">
            <span className="text-xs text-[#828D9F] uppercase tracking-wider block">Freight Bay Window</span>
            <span className="text-2xl font-mono text-[#F2ECE1] font-bold tabular-nums mt-1 block">
              Bay #02
            </span>
            <span className="text-xs text-[#828D9F] mt-1 block">07:00 AM Bump-In Reserved</span>
          </div>
        </div>

        {/* Notification Alert Banner */}
        {uploadSuccess && (
          <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{uploadSuccess}</span>
          </div>
        )}

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#253047] pb-1 overflow-x-auto">
          {[
            { id: 'holds', label: 'Venue Reservations & Holds', count: reservations.length },
            { id: 'documents', label: 'Statutory Filings & COI' },
            { id: 'catering', label: 'Banquet & Culinary Orders' },
            { id: 'dockmaster', label: 'Freight Dock Marshalling' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 text-xs font-medium rounded-t transition-colors whitespace-nowrap cursor-pointer border-b-2 ${
                activeTab === tab.id
                  ? 'border-[#C5A880] text-[#F2ECE1] bg-[#131926]'
                  : 'border-transparent text-[#828D9F] hover:text-[#EDE8DF]'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="ml-2 font-mono text-[10px] bg-[#0B0F17] px-1.5 py-0.5 rounded border border-[#253047] text-[#C5A880]">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TAB 1: Reservations List */}
        {activeTab === 'holds' && (
          <div className="space-y-4">
            {reservations.length === 0 ? (
              <div className="p-12 text-center rounded-xl border border-[#253047] bg-[#131926]/30 space-y-3">
                <Calendar className="w-8 h-8 text-[#828D9F] mx-auto" />
                <h4 className="text-base font-editorial text-[#F2ECE1]">No Active Venue Holds Found</h4>
                <p className="text-xs text-[#828D9F] max-w-sm mx-auto">
                  You have not placed any halls on priority hold yet. Select a grand pavilion and secure your 14-day hold.
                </p>
                <button
                  onClick={onNewBooking}
                  className="px-4 py-2 text-xs font-medium text-[#0B0F17] bg-[#C5A880] hover:bg-[#D5BFA0] rounded transition-colors cursor-pointer"
                >
                  Reserve Hall Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {reservations.map((res, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl border border-[#253047] bg-[#131926] flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-mono font-bold text-[#C5A880]">
                          {res.reference}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-amber-500/30 text-amber-300 bg-amber-950/20">
                          {res.status || '14-Day Option Hold'}
                        </span>
                        <span className="text-xs text-[#828D9F]">
                          Placed on: {new Date(res.timestamp).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="text-xl font-editorial text-[#F2ECE1]">
                        {res.hallName || 'Zenith Grand Pavilion'}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#A2ABB8] font-mono">
                        <span>Date: {res.eventDate || '2026-11-24'}</span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">Shift: {res.timeSlot?.replace('_', ' ')}</span>
                        <span aria-hidden="true">·</span>
                        <span>Delegates: {res.guestCount} pax</span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">Layout: {res.layoutStyle}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-[#253047]">
                      <div className="text-left lg:text-right">
                        <span className="text-[10px] text-[#828D9F] uppercase block font-mono">
                          Committed Budget
                        </span>
                        <span className="text-lg font-mono font-bold text-[#C5A880] tabular-nums">
                          ₹{(res.totalCostInr || 2750000).toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={onViewRequirements}
                          className="px-3 py-2 text-xs font-medium text-[#EDE8DF] border border-[#253047] hover:bg-[#253047]/50 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#C5A880]" />
                          <span>View Dossier</span>
                        </button>
                        <button
                          onClick={() => handleCancelReservation(res.reference)}
                          className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded border border-[#253047] transition-colors cursor-pointer"
                          title="Release Hold"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Statutory Documents & COI */}
        {activeTab === 'documents' && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-[#131926]/30 border border-[#253047] text-xs text-[#A2ABB8]">
              All statutory rider documentation must be validated by the venue legal registrar and Fire Prevention Bureau at least 14 days prior to bump-in.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: 'coi',
                  name: 'Certificate of Commercial General Liability Insurance (COI)',
                  standard: '₹80 Crore ($10M USD) aggregate coverage naming L\'AURORA as insured',
                  status: 'Approved',
                  file: 'COI_Aurora_Executed_2026.pdf',
                },
                {
                  id: 'rigging',
                  name: 'PE-Stamped Structural Rigging & Point Load Calculation Plot',
                  standard: 'ANSI E1.21 stamped by certified structural engineer',
                  status: 'Under Review',
                  file: 'Truss_Rigging_Plot_v2.dwg',
                },
                {
                  id: 'fire',
                  name: 'Fire Marshal Occupant Load & Life Safety Corridors Placard',
                  standard: 'NFPA 101 Table 12.2.4.1 compliance with 2.4m egress paths',
                  status: 'Approved',
                  file: 'NFPA_Egress_Approval_Signed.pdf',
                },
                {
                  id: 'hygiene',
                  name: 'HACCP Culinary Safety & Municipal Food Service License',
                  standard: 'FSSAI / FDA commercial kitchen catering authorization',
                  status: 'Pending Submission',
                  file: 'Awaiting upload',
                },
              ].map((doc) => (
                <div key={doc.id} className="p-5 rounded-lg border border-[#253047] bg-[#131926] space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-[#F2ECE1]">{doc.name}</h4>
                      <p className="text-xs text-[#828D9F] mt-0.5">{doc.standard}</p>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border whitespace-nowrap ${
                        doc.status === 'Approved'
                          ? 'border-emerald-500/30 text-emerald-300 bg-emerald-950/20'
                          : doc.status === 'Under Review'
                          ? 'border-amber-500/30 text-amber-300 bg-amber-950/20'
                          : 'border-rose-500/30 text-rose-300 bg-rose-950/20'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-[#0B0F17] border border-[#253047] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#A2ABB8] truncate max-w-[200px]">{doc.file}</span>
                    <button
                      onClick={() => handleSimulateUpload(doc.name)}
                      className="text-[#C5A880] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Update File</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Catering & Banquet Coordinator */}
        {activeTab === 'catering' && (
          <div className="p-6 rounded-xl border border-[#253047] bg-[#131926] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#253047] pb-4">
              <div>
                <h3 className="text-lg font-editorial text-[#F2ECE1]">
                  Catering Coordination & Dietary Breakdowns
                </h3>
                <p className="text-xs text-[#828D9F]">
                  Master kitchen staging assignments for active reservations
                </p>
              </div>
              <button
                onClick={onOpenMenu}
                className="px-3.5 py-2 text-xs font-medium text-[#0B0F17] bg-[#C5A880] hover:bg-[#D5BFA0] rounded transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Explore Full Banquet Menus</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded bg-[#0B0F17] border border-[#253047] space-y-2">
                <span className="text-xs text-[#828D9F] uppercase font-mono">Active Banquet Choice</span>
                <span className="text-base font-editorial text-[#F2ECE1] block">
                  Royal Heritage Banquet
                </span>
                <p className="text-xs text-[#A2ABB8]">
                  Awadhi & Coastal spread with Live Tandoori & Lucknowi Galouti station.
                </p>
              </div>

              <div className="p-4 rounded bg-[#0B0F17] border border-[#253047] space-y-2">
                <span className="text-xs text-[#828D9F] uppercase font-mono">Dietary Preferences</span>
                <div className="space-y-1 text-xs text-[#EDE8DF]">
                  <div className="flex justify-between">
                    <span>Vegetarian / Jain:</span>
                    <span className="font-mono text-[#C5A880]">650 Plates (35%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Non-Vegetarian / Halal:</span>
                    <span className="font-mono text-[#C5A880]">1,200 Plates (65%)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded bg-[#0B0F17] border border-[#253047] space-y-2">
                <span className="text-xs text-[#828D9F] uppercase font-mono">Kitchen Staging Window</span>
                <span className="text-base font-editorial text-[#F2ECE1] block">
                  14:00 – 23:00 (Evening Gala)
                </span>
                <p className="text-xs text-[#A2ABB8]">
                  Equipped with 3 commercial plating lines and cold chain holding.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Freight Dock Marshalling */}
        {activeTab === 'dockmaster' && (
          <div className="p-6 rounded-xl border border-[#253047] bg-[#131926] space-y-6">
            <div className="border-b border-[#253047] pb-4">
              <h3 className="text-lg font-editorial text-[#F2ECE1]">
                Loading Dock Marshalling & Freight Elevator Schedule
              </h3>
              <p className="text-xs text-[#828D9F]">
                Twin hydraulic bays (5.2m overhead clearance) with 8-ton freight lift access
              </p>
            </div>

            <div className="space-y-3">
              {[
                { time: '07:00 – 07:45 AM', bay: 'Bay #01', vendor: 'Apex Audio & Rigging Systems (40ft Semi)', status: 'Confirmed' },
                { time: '08:00 – 08:45 AM', bay: 'Bay #02', vendor: 'Ultra-Fine 4K LED Screen Wall (24ft Truck)', status: 'Confirmed' },
                { time: '09:00 – 09:45 AM', bay: 'Bay #01', vendor: 'Grand Gala Table Linens & Decor', status: 'Reserved' },
                { time: '10:00 – 10:45 AM', bay: 'Bay #02', vendor: 'Commercial Catering Cold Chain Supply', status: 'Reserved' },
              ].map((slot, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded bg-[#0B0F17] border border-[#253047] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[#C5A880] font-bold">{slot.time}</span>
                    <span className="font-mono px-2 py-0.5 rounded bg-[#131926] border border-[#253047] text-[#EDE8DF]">
                      {slot.bay}
                    </span>
                    <span className="text-[#A2ABB8]">{slot.vendor}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-300 bg-emerald-950/20 w-fit">
                    {slot.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
