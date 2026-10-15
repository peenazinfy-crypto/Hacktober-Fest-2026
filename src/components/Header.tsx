import React from 'react';
import { ShieldAlert, Cpu, PhoneCall, Info } from 'lucide-react';
import { ModelInfo } from '../types';

interface HeaderProps {
  modelInfo: ModelInfo | null;
  preferredLanguage: string;
  onLanguageChange: (lang: string) => void;
  onOpenModelModal: () => void;
  onOpenSafetyModal: () => void;
}

const SUPPORTED_LANGUAGES = [
  { code: 'English', label: 'English' },
  { code: 'Hinglish (Everyday Hindi+English)', label: 'Hinglish (हिंग्लिश)' },
  { code: 'Hindi (हिंदी)', label: 'हिंदी (Hindi)' },
  { code: 'Bengali (বাংলা)', label: 'বাংলা (Bengali)' },
  { code: 'Tamil (தமிழ்)', label: 'தமிழ் (Tamil)' },
  { code: 'Telugu (తెలుగు)', label: 'తెలుగు (Telugu)' },
  { code: 'Marathi (मराठी)', label: 'मराठी (Marathi)' },
  { code: 'Gujarati (ગુજરાતી)', label: 'ગુજરાતી (Gujarati)' },
  { code: 'Kannada (ಕನ್ನಡ)', label: 'ಕನ್ನಡ (Kannada)' },
  { code: 'Malayalam (മലയാളം)', label: 'മലയാളം (Malayalam)' },
  { code: 'Punjabi (ਪੰਜਾਬੀ)', label: 'ਪੰਜਾਬੀ (Punjabi)' },
];

export const Header: React.FC<HeaderProps> = ({
  modelInfo,
  preferredLanguage,
  onLanguageChange,
  onOpenModelModal,
  onOpenSafetyModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 ring-2 ring-orange-200">
            <ShieldAlert className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Scam<span className="text-orange-600">Sense</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                India Edition
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500 tracking-wide">
              Pause. Check. Stay Safe.
            </p>
          </div>
        </div>

        {/* Actions & Model info */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          {/* Active Model Pill */}
          <button
            onClick={onOpenModelModal}
            title="Inspect Gemma Model Configuration"
            className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-medium text-slate-700 transition"
          >
            <Cpu className="w-3.5 h-3.5 text-orange-600 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline text-slate-500">Model:</span>
            <span className="font-semibold text-slate-900">
              {modelInfo ? 'Gemma 4 (Multimodal)' : 'Gemma 4'}
            </span>
            <Info className="w-3 h-3 text-slate-400 group-hover:text-slate-600" />
          </button>

          {/* India 1930 Helpline Button */}
          <button
            onClick={onOpenSafetyModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-xs font-semibold text-amber-900 transition shadow-2xs"
          >
            <PhoneCall className="w-3.5 h-3.5 text-red-600 animate-pulse" />
            <span>Cyber Helpline: <strong className="text-red-700 font-bold">1930</strong></span>
          </button>

          {/* Language Selector */}
          <div className="relative">
            <select
              value={preferredLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              aria-label="Select Preferred Language"
              className="appearance-none bg-white hover:bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 pr-7 text-xs font-medium text-slate-800 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-2xs"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
