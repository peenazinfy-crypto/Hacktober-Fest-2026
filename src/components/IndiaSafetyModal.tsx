import React from 'react';
import { X, ShieldAlert, PhoneCall, ExternalLink, CheckCircle2, AlertOctagon } from 'lucide-react';

interface IndiaSafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IndiaSafetyModal: React.FC<IndiaSafetyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black">
                India Cyber Crime Emergency & Safety Guide
              </h2>
              <p className="text-xs text-orange-100">
                Official Government of India reporting helplines and portals
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
          {/* Emergency 1930 Helpline Banner */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <PhoneCall className="w-7 h-7 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs uppercase tracking-wider font-extrabold text-red-700">
                  National Cyber Helpline (MHA / I4C)
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-red-950">
                  Dial 1930
                </h3>
                <p className="text-xs text-red-800 mt-1">
                  If money has been debited fraudulently, call within the 'Golden Hour' to freeze money transfer before scammers withdraw it.
                </p>
              </div>
            </div>
            <a
              href="tel:1930"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm text-center shrink-0 shadow-md"
            >
              Call 1930
            </a>
          </div>

          {/* Official Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Official Government Portals
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50/30 transition flex items-start justify-between group"
              >
                <div>
                  <h5 className="text-xs font-bold text-slate-900 group-hover:text-orange-600">
                    National Cyber Crime Portal
                  </h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    File official online FIR for financial cyber fraud or extortion.
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-orange-500 shrink-0" />
              </a>

              <a
                href="https://sancharsaathi.gov.in/sfc"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50/30 transition flex items-start justify-between group"
              >
                <div>
                  <h5 className="text-xs font-bold text-slate-900 group-hover:text-orange-600">
                    Chakshu (Sanchar Saathi)
                  </h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Report suspected fraudulent calls, SMS, and WhatsApp messages.
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-orange-500 shrink-0" />
              </a>

              <a
                href="https://sachet.rbi.org.in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50/30 transition flex items-start justify-between group"
              >
                <div>
                  <h5 className="text-xs font-bold text-slate-900 group-hover:text-orange-600">
                    RBI Sachet Portal
                  </h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Report unauthorized loan apps, deposit schemes, and banking fraud.
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-orange-500 shrink-0" />
              </a>

              <a
                href="https://www.ceir.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50/30 transition flex items-start justify-between group"
              >
                <div>
                  <h5 className="text-xs font-bold text-slate-900 group-hover:text-orange-600">
                    CEIR Portal (Lost Mobile)
                  </h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Block and trace stolen or lost mobile handsets across India.
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-orange-500 shrink-0" />
              </a>
            </div>
          </div>

          {/* The 4 Non-Negotiable Safety Rules in India */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-red-600" />
              The 4 Non-Negotiable Indian Digital Safety Rules
            </h4>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>1. UPI PIN is ONLY for paying:</strong> To receive money, lottery, refund, or cashback, you NEVER need to enter a UPI PIN or scan a QR code.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>2. Never install screen-sharing apps:</strong> Scammers ask you to install AnyDesk, TeamViewer QuickSupport, or RustDesk to steal OTPs. Never install apps instructed over phone calls.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>3. Verify electricity bills on official discom apps:</strong> Never call personal numbers given in "bill overdue" SMS alerts.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>4. Digital Arrest is 100% FAKE:</strong> Indian police, CBI, ED, and judges NEVER conduct "digital arrests" over Skype or WhatsApp video calls.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
