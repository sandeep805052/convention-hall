import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, Building, User, Phone, FileText, ArrowRight, Sparkles, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'login',
}) => {
  const { login, register, quickLogin } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regOrg, setRegOrg] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regGst, setRegGst] = useState('');
  const [regRole, setRegRole] = useState<'organizer' | 'faculty'>('organizer');
  const [regPassword, setRegPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) {
      setError('Please provide an email address.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await login(loginEmail, loginPassword);
      setLoading(false);
      onSuccess();
      onClose();
    } catch {
      setError('Authentication failed. Please verify credentials.');
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regOrg) {
      setError('Please complete all mandatory institution fields.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await register({
        name: regName,
        email: regEmail,
        organization: regOrg,
        phone: regPhone,
        gstNumber: regGst,
        role: regRole,
      });
      setLoading(false);
      onSuccess();
      onClose();
    } catch {
      setError('Registration failed. Please try again.');
      setLoading(false);
    }
  };

  const handleQuickDemo = (role: 'director' | 'faculty') => {
    quickLogin(role);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#0E1420] border border-[#253047] rounded-xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#253047] bg-[#131926]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#C5A880] font-mono uppercase tracking-wider">
              <span>L&apos;AURORA Identity & Tenancy Registry</span>
            </div>
            <h3 className="text-xl font-editorial text-[#F2ECE1] mt-1">
              {mode === 'login' ? 'Organizer & Faculty Sign In' : 'Register Institution / Account'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#828D9F] hover:text-[#EDE8DF] hover:bg-[#253047]/50 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-2 p-1 bg-[#0B0F17] border-b border-[#253047]">
          <button
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`py-2 text-xs font-medium rounded transition-colors cursor-pointer ${
              mode === 'login'
                ? 'bg-[#131926] text-[#F2ECE1] shadow'
                : 'text-[#828D9F] hover:text-[#EDE8DF]'
            }`}
          >
            Sign In to Portal
          </button>
          <button
            onClick={() => {
              setMode('register');
              setError(null);
            }}
            className={`py-2 text-xs font-medium rounded transition-colors cursor-pointer ${
              mode === 'register'
                ? 'bg-[#131926] text-[#F2ECE1] shadow'
                : 'text-[#828D9F] hover:text-[#EDE8DF]'
            }`}
          >
            Create New Account
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
              {error}
            </div>
          )}

          {mode === 'login' ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-1 font-medium">
                  Official Email Address:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#828D9F] absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="director@worldcongress.org"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-[#0B0F17] border border-[#253047] text-[#EDE8DF] text-xs rounded-md pl-10 pr-3 py-2.5 focus:border-[#C5A880] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs text-[#828D9F] uppercase tracking-wider font-medium">
                    Security Password:
                  </label>
                  <span className="text-[11px] text-[#C5A880] hover:underline cursor-pointer">
                    Forgot key?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#828D9F] absolute left-3 top-3" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-[#0B0F17] border border-[#253047] text-[#EDE8DF] text-xs rounded-md pl-10 pr-3 py-2.5 focus:border-[#C5A880] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 text-xs font-medium text-[#0B0F17] bg-[#C5A880] hover:bg-[#D5BFA0] rounded transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>{loading ? 'Authenticating...' : 'Sign In to Organizer Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Demo 1-Click Fast Logins */}
              <div className="pt-4 border-t border-[#253047] space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#828D9F] block text-center">
                  Quick Access One-Click Demo
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('director')}
                    className="p-2 text-left bg-[#0B0F17] hover:bg-[#131926] border border-[#253047] rounded text-[11px] text-[#EDE8DF] cursor-pointer transition-colors"
                  >
                    <span className="text-[#C5A880] font-medium block">Convention Director</span>
                    <span className="text-[10px] text-[#828D9F] block truncate">Dr. Julian Vance</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('faculty')}
                    className="p-2 text-left bg-[#0B0F17] hover:bg-[#131926] border border-[#253047] rounded text-[11px] text-[#EDE8DF] cursor-pointer transition-colors"
                  >
                    <span className="text-[#C5A880] font-medium block">Faculty Reviewer</span>
                    <span className="text-[10px] text-[#828D9F] block truncate">Prof. Sandeep Reddy</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-1 font-medium">
                  Representative Full Name:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#828D9F] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Julian Vance"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full bg-[#0B0F17] border border-[#253047] text-[#EDE8DF] text-xs rounded-md pl-10 pr-3 py-2 focus:border-[#C5A880] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-1 font-medium">
                  Institution / Organization Name:
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-[#828D9F] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Global Tech Summit Foundation"
                    value={regOrg}
                    onChange={(e) => setRegOrg(e.target.value)}
                    className="w-full bg-[#0B0F17] border border-[#253047] text-[#EDE8DF] text-xs rounded-md pl-10 pr-3 py-2 focus:border-[#C5A880] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-1 font-medium">
                    Corporate Email:
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@institution.org"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full bg-[#0B0F17] border border-[#253047] text-[#EDE8DF] text-xs rounded-md px-3 py-2 focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-1 font-medium">
                    Phone / Mobile:
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98450 12345"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full bg-[#0B0F17] border border-[#253047] text-[#EDE8DF] text-xs rounded-md px-3 py-2 focus:border-[#C5A880] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-1 font-medium">
                    GST / Tax ID (Optional):
                  </label>
                  <input
                    type="text"
                    placeholder="29ABCDE1234F1Z5"
                    value={regGst}
                    onChange={(e) => setRegGst(e.target.value)}
                    className="w-full bg-[#0B0F17] border border-[#253047] text-[#EDE8DF] text-xs rounded-md px-3 py-2 font-mono uppercase focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-1 font-medium">
                    Portal Role:
                  </label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value as any)}
                    className="w-full bg-[#0B0F17] border border-[#253047] text-[#EDE8DF] text-xs rounded-md px-3 py-2"
                  >
                    <option value="organizer">Event Organizing Director</option>
                    <option value="faculty">Academic Faculty / Reviewer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-[#828D9F] uppercase tracking-wider block mb-1 font-medium">
                  Create Account Password:
                </label>
                <input
                  type="password"
                  placeholder="Min 8 characters"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-[#253047] text-[#EDE8DF] text-xs rounded-md px-3 py-2 focus:border-[#C5A880] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 text-xs font-medium text-[#0B0F17] bg-[#C5A880] hover:bg-[#D5BFA0] rounded transition-colors flex items-center justify-center gap-2 cursor-pointer mt-3"
              >
                <span>{loading ? 'Creating Account...' : 'Complete Registration & Open Dashboard'}</span>
                <Check className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
