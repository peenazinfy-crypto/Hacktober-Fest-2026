import React from 'react';
import { X, Cpu, CheckCircle2, ShieldCheck, FileCode, AlertCircle } from 'lucide-react';
import { ModelInfo } from '../types';

interface ModelInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelInfo: ModelInfo | null;
}

export const ModelInfoModal: React.FC<ModelInfoModalProps> = ({
  isOpen,
  onClose,
  modelInfo,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
              <Cpu className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black">
                Gemma Model Architecture & Setup
              </h2>
              <p className="text-xs text-slate-300">
                Configuration
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

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          {/* Active Model Details Card */}
          <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-800">
                Active Configured Model
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-orange-200/70 text-orange-900">
                Multimodal Open Model
              </span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-orange-200/80 font-mono text-xs sm:text-sm text-slate-900 break-all">
              {modelInfo?.modelName || 'models/gemma-4-26b-a4b-it'}
            </div>
            <p className="text-xs text-orange-950 leading-relaxed">
              <strong>Gemma 4 26B A4B IT</strong> is Google's multimodal instruction-tuned Gemma model capable of visual understanding and text extraction from Indian message screenshots.
            </p>
          </div>

          {/* Compliance with Model Rules */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Model Requirement Guarantees
            </h4>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Pure Gemma Execution:</strong> The application exclusively calls the configured Gemma model. It does not pretend to use Gemma while routing to Gemini.
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>No Silent Gemini Fallback:</strong> In accordance with strict guidelines, if Gemma is unavailable or errors, the server returns an explicit error explaining the Gemma status rather than quietly falling back to Gemini.
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Server-Side Secret Isolation:</strong> API keys remain strictly on the Express backend and are never sent to the browser bundle.
                </div>
              </div>
            </div>
          </div>

          {/* How to Change Configuration */}
          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-slate-600" />
              How to Change Model
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              The model name is defined in one central server-side configuration value in <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-[11px]">server.ts</code>. You can change it anytime via the environment variable:
            </p>
            <div className="bg-slate-900 text-slate-100 p-2.5 rounded-xl font-mono text-xs">
              GEMMA_MODEL_NAME="models/gemma-4-26b-a4b-it"
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
