import React from 'react';
import { AlertCircle, ShieldCheck } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl bg-amber-50/80 border border-amber-200/90 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-amber-950">
                Important Consumer Disclaimer
              </h4>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                ScamSense provides educational AI analysis to highlight common scam tactics and red flags. <strong>AI analysis is not definitive legal or forensic proof</strong> that a message is genuine or fraudulent. Never share your OTP, UPI PIN, passwords, or netbanking credentials with anyone. In case of any financial doubt, verify independently through the organisation’s official app, visit your bank branch, or contact the <strong>National Cyber Crime Helpline at 1930</strong>.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>ScamSense •</span>
          </div>
          <p className="text-center sm:text-right">
            Dedicated to protecting Indian citizens from digital fraud & impersonation scams.
          </p>
        </div>
      </div>
    </footer>
  );
};
