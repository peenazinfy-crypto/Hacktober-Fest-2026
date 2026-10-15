import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  RotateCcw,
  CheckCircle,
  ExternalLink,
  Info,
  Clock,
  Sparkles,
  PhoneCall,
  Lock,
} from 'lucide-react';
import { AnalysisResponse } from '../types';

interface AnalysisResultsProps {
  results: AnalysisResponse;
  onReset: () => void;
  originalImagePreview: string | null;
  onOpenSafetyModal: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  results,
  onReset,
  originalImagePreview,
  onOpenSafetyModal,
}) => {
  const { overallAssessment, warningSigns, whyTheseSignsMatter, recommendedSafeActions, whatCouldNotBeVerified, indiaSpecificSafetyNotes, modelUsed } = results;

  // Determine styles based on assessment verdict
  const getVerdictTheme = () => {
    switch (overallAssessment.verdict) {
      case 'high_suspicion':
        return {
          bg: 'bg-red-50',
          border: 'border-red-300',
          pillBg: 'bg-red-100 text-red-800 border-red-300',
          icon: <ShieldAlert className="w-7 h-7 text-red-600" />,
          titleColor: 'text-red-950',
          label: 'High Suspicion of Scam / Fraud',
        };
      case 'medium_caution':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-300',
          pillBg: 'bg-amber-100 text-amber-800 border-amber-300',
          icon: <AlertTriangle className="w-7 h-7 text-amber-600" />,
          titleColor: 'text-amber-950',
          label: 'Caution Advised / Unverified Sender',
        };
      case 'low_risk':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-300',
          pillBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          icon: <ShieldCheck className="w-7 h-7 text-emerald-600" />,
          titleColor: 'text-emerald-950',
          label: 'Low Immediate Scam Indicators',
        };
      case 'unreadable_or_incomplete':
      default:
        return {
          bg: 'bg-slate-100',
          border: 'border-slate-300',
          pillBg: 'bg-slate-200 text-slate-800 border-slate-300',
          icon: <HelpCircle className="w-7 h-7 text-slate-600" />,
          titleColor: 'text-slate-900',
          label: 'Image Incomplete or Unclear',
        };
    }
  };

  const theme = getVerdictTheme();

  return (
    <div className="w-full space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-orange-600" />
          <span className="text-xs font-semibold text-slate-600">
            Analyzed using <strong className="text-slate-900">{modelUsed}</strong>
          </span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm transition shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Analyse Another Message</span>
        </button>
      </div>

      {/* Main Grid: Left is Cards, Right is Mini Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Structured Report Cards (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Overall Assessment */}
          <section className={`rounded-2xl border p-6 ${theme.bg} ${theme.border} shadow-sm`}>
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white/80 shadow-xs shrink-0">
                {theme.icon}
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Overall assessment
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${theme.pillBg}`}>
                    {theme.label}
                  </span>
                </div>
                <h2 className={`text-xl font-extrabold ${theme.titleColor} leading-snug`}>
                  {overallAssessment.headline}
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {overallAssessment.summary}
                </p>
              </div>
            </div>
          </section>

          {/* Card 2: Potential Warning Signs */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-700 font-bold">
                1
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Potential warning signs
                </h2>
                <p className="text-xs text-slate-500">
                  Observable red flags detected from image inspection
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3.5">
              {warningSigns && warningSigns.length > 0 ? (
                warningSigns.map((sign, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-slate-300 transition"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                        {sign.title}
                      </h4>
                    </div>

                    {sign.evidence && (
                      <div className="mt-2 text-xs bg-white px-3 py-2 rounded-lg border border-slate-200 font-mono text-slate-800">
                        <strong className="text-slate-500 font-sans block text-[11px] mb-0.5">
                          Evidence in Screenshot:
                        </strong>
                        "{sign.evidence}"
                      </div>
                    )}

                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {sign.significance}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 text-xs text-slate-600">
                  No explicit red flags clearly evident in the visible text.
                </div>
              )}
            </div>
          </section>

          {/* Card 3: Why These Signs Matter */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
                2
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Why these signs matter
                </h2>
                <p className="text-xs text-slate-500">
                  Understanding the attacker's psychological tricks and technical traps
                </p>
              </div>
            </div>

            <div className="mt-4 text-sm text-slate-700 leading-relaxed bg-amber-50/50 p-4 rounded-xl border border-amber-200/60">
              {whyTheseSignsMatter}
            </div>
          </section>

          {/* Card 4: Recommended Safe Actions */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                3
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Recommended safe actions
                </h2>
                <p className="text-xs text-slate-500">
                  Immediate, safe next steps you should take
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {recommendedSafeActions && recommendedSafeActions.length > 0 ? (
                recommendedSafeActions.map((action, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition ${
                      action.isPrimary
                        ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {action.isPrimary ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                            ✓
                          </div>
                        ) : (
                          <CheckCircle className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">
                            {action.action}
                          </h4>
                          {action.isPrimary && (
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-emerald-600 text-white rounded-md tracking-wider">
                              Primary Action
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {action.details}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 text-xs text-slate-600">
                  Do not share OTPs, do not click links, verify with official customer care.
                </div>
              )}
            </div>
          </section>

          {/* Card 5: What Could Not Be Verified */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 font-bold">
                4
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  What could not be verified
                </h2>
                <p className="text-xs text-slate-500">
                  Transparent AI boundaries and unconfirmed items
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {whatCouldNotBeVerified && whatCouldNotBeVerified.length > 0 ? (
                whatCouldNotBeVerified.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-600"
                  >
                    <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500">
                  Sender telephone routing, real-time database reputation, and live URL destinations cannot be verified solely from an image screenshot.
                </p>
              )}
            </div>
          </section>

          {/* Bottom Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onReset}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Analyse Another Message</span>
            </button>
          </div>
        </div>

        {/* Right Side: Image Context & India Safety Essentials (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Screenshot Preview Card */}
          {originalImagePreview && (
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Inspected Image</span>
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                  Verified
                </span>
              </h3>
              <div className="rounded-xl overflow-hidden bg-slate-950 p-1 border border-slate-800">
                <img
                  src={originalImagePreview}
                  alt="Inspected message screenshot"
                  className="w-full h-auto max-h-[300px] object-contain rounded-lg"
                />
              </div>
            </div>
          )}

          {/* India Cyber Emergency Box */}
          <div className="bg-gradient-to-br from-red-600 to-rose-700 text-white rounded-2xl p-5 shadow-md">
            <div className="flex items-center gap-2.5 mb-2">
              <PhoneCall className="w-5 h-5 text-amber-200" />
              <h3 className="font-extrabold text-sm sm:text-base tracking-tight">
                National Cyber Helpline (India)
              </h3>
            </div>
            <p className="text-xs text-red-100 leading-relaxed mb-3">
              If you have already sent money or shared banking information:
            </p>
            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/20 mb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-red-200 block">
                  Toll-Free Helpline
                </span>
                <span className="text-2xl font-black text-white tracking-wider">
                  1930
                </span>
              </div>
              <a
                href="tel:1930"
                className="px-3 py-1.5 rounded-lg bg-white text-red-700 font-bold text-xs hover:bg-red-50 transition shadow-xs"
              >
                Call 1930
              </a>
            </div>
            <div className="text-[11px] text-red-100 flex items-center justify-between pt-1">
              <span>Report online:</span>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold flex items-center gap-1 hover:text-white"
              >
                cybercrime.gov.in <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* India Golden Rules Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Lock className="w-4 h-4 text-orange-600" />
              <span>India Scam Golden Rules</span>
            </div>

            <ul className="text-xs text-slate-600 space-y-2.5">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold shrink-0">1.</span>
                <span>
                  <strong>UPI PIN Rule:</strong> UPI PIN is ONLY needed to deduct money. You NEVER need to enter a PIN or scan a QR to receive cash or rewards.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold shrink-0">2.</span>
                <span>
                  <strong>Sender Header:</strong> Real banks/institutions send SMS with 6-character sender IDs (e.g., VK-SBI, AX-HDFC), never 10-digit mobile numbers.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold shrink-0">3.</span>
                <span>
                  <strong>Electricity Boards:</strong> Discoms never disconnect power via WhatsApp messages or tell you to call an officer's personal number.
                </span>
              </li>
            </ul>

            <button
              onClick={onOpenSafetyModal}
              className="w-full mt-2 py-2 text-xs font-bold text-orange-700 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 rounded-xl transition text-center"
            >
              View Full India Safety Guide
            </button>
          </div>

          {/* Specific Safety Notes from AI */}
          {indiaSpecificSafetyNotes && indiaSpecificSafetyNotes.length > 0 && (
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Specific Notes for this Alert
              </h4>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                {indiaSpecificSafetyNotes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
