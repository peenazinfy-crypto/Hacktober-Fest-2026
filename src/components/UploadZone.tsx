import React, { useRef, useState, useCallback } from 'react';
import {
  UploadCloud,
  Image as ImageIcon,
  X,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { SAMPLE_SCENARIOS, generateSampleScreenshot } from '../utils/sampleGenerator';
import { optimizeImageForAnalysis } from '../utils/imageCompressor';
import { SampleScamScenario } from '../types';

interface UploadZoneProps {
  imagePreview: string | null;
  onImageSelected: (base64: string, mimeType: string, filename: string) => void;
  onClearImage: () => void;
  additionalContext: string;
  onContextChange: (val: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  selectedSampleId: string | null;
  onSelectSample: (scenario: SampleScamScenario) => void;
}

const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

export const UploadZone: React.FC<UploadZoneProps> = ({
  imagePreview,
  onImageSelected,
  onClearImage,
  additionalContext,
  onContextChange,
  onAnalyze,
  isLoading,
  selectedSampleId,
  onSelectSample,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);

  const processFile = useCallback(
    async (file: File) => {
      setFileError(null);

      if (!ACCEPTED_TYPES.includes(file.type)) {
        setFileError('Please upload an image in PNG, JPEG, or WebP format.');
        return;
      }

      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setFileError(`Image file is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed is ${MAX_FILE_SIZE_MB}MB.`);
        return;
      }

      setIsOptimizing(true);
      try {
        const { base64, mimeType } = await optimizeImageForAnalysis(file);
        onImageSelected(base64, mimeType, file.name);
      } catch (err) {
        console.warn('Optimization error, falling back to direct read:', err);
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (result) {
            const base64Data = result.split(',')[1];
            onImageSelected(base64Data, file.type, file.name);
          }
        };
        reader.onerror = () => {
          setFileError('Unable to read image file. Please try another one.');
        };
        reader.readAsDataURL(file);
      } finally {
        setIsOptimizing(false);
      }
    },
    [onImageSelected]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleLoadSample = (scenario: SampleScamScenario) => {
    setFileError(null);
    const sample = generateSampleScreenshot(scenario);
    if (sample && sample.base64) {
      onImageSelected(sample.base64, sample.mimeType, `${scenario.id}.jpg`);
      onSelectSample(scenario);
      if (!additionalContext || SAMPLE_SCENARIOS.some((s) => s.contextText === additionalContext)) {
        onContextChange(scenario.contextText);
      }
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Hero Mission banner */}
      <div className="text-center max-w-3xl mx-auto pt-2 pb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 text-orange-800 text-xs font-semibold mb-3 border border-orange-200">
          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
          <span>Multimodal AI Scam Detection for India</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Received a suspicious message or payment request?
        </h1>
        <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Upload a screenshot of any SMS, WhatsApp alert, electricity bill cutoff threat, or UPI cashback request. ScamSense uses multimodal Gemma to unpack deceptive tactics and give safe steps.
        </p>
      </div>

      {/* Main Upload Box / Preview Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7 transition-all">
        {!imagePreview ? (
          /* Drag & Drop Dropzone */
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
              isDragging
                ? 'border-orange-500 bg-orange-50/60 scale-[1.005]'
                : 'border-slate-300 hover:border-orange-400 bg-slate-50/60 hover:bg-orange-50/20'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".png,.jpg,.jpeg,.webp"
              onChange={handleFileInputChange}
              className="hidden"
            />

            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shadow-inner">
              <UploadCloud className="w-8 h-8 stroke-[2.2]" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Upload your screenshot or photo
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              Drag and drop an image here, or{' '}
              <span className="text-orange-600 font-semibold underline underline-offset-2">
                browse from your device
              </span>
            </p>

            <div className="mt-4 flex items-center justify-center gap-3 text-xs text-slate-400 font-medium">
              <span>PNG, JPEG, WebP</span>
              <span>•</span>
              <span>Max 10 MB</span>
              <span>•</span>
              <span className="text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                100% Private (No permanent storage)
              </span>
            </div>
          </div>
        ) : (
          /* Image Preview and Controls */
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-orange-600" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Screenshot Preview
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                  Ready for analysis
                </span>
              </div>
              <button
                type="button"
                onClick={onClearImage}
                disabled={isLoading}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
              >
                <X className="w-3.5 h-3.5" />
                Remove
              </button>
            </div>

            <div className="relative rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center max-h-[380px] p-2 border border-slate-800">
              <img
                src={imagePreview}
                alt="Uploaded scam screenshot"
                className="max-h-[360px] w-auto object-contain rounded-lg shadow-md"
              />
            </div>
          </div>
        )}

        {/* File Error Display */}
        {fileError && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{fileError}</span>
          </div>
        )}

        {/* Optional Context Field */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <label
            htmlFor="additionalContext"
            className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5"
          >
            Anything else you’d like us to know?{' '}
            <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            id="additionalContext"
            rows={2}
            value={additionalContext}
            onChange={(e) => onContextChange(e.target.value)}
            disabled={isLoading}
            placeholder="e.g. Received via WhatsApp from +91 98xxx, delivery agent asked me to scan QR to receive parcel refund, claimed electricity will be cut in 2 hours..."
            className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition disabled:bg-slate-100"
          />
        </div>

        {/* CTA Analyze Button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted transmission to server-side Gemma 4</span>
          </div>

          <button
            type="button"
            onClick={onAnalyze}
            disabled={!imagePreview || isLoading}
            className={`w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-md ${
              !imagePreview || isLoading
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-orange-500/25 active:scale-[0.99]'
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Analyzing with Gemma 4...</span>
              </>
            ) : (
              <>
                <span>Analyse Message</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Try Sample Scenarios Section */}
      <div className="bg-gradient-to-br from-slate-100/90 to-amber-50/50 rounded-2xl p-5 border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
              Or Try a Common India Scam Sample
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
            1-click realistic test cases
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {SAMPLE_SCENARIOS.map((scenario) => {
            const isSelected = selectedSampleId === scenario.id;
            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => handleLoadSample(scenario)}
                disabled={isLoading}
                className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-orange-50/90 border-orange-400 ring-2 ring-orange-200'
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {scenario.category}
                    </span>
                    <span className="text-[10px] font-semibold text-orange-700">
                      {scenario.tag}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {scenario.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {scenario.description}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-orange-600">
                  <span>{isSelected ? 'Loaded in Preview' : 'Load Screenshot'}</span>
                  {isSelected ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Zap className="w-3 h-3 text-orange-500" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
