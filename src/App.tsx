import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { UploadZone } from './components/UploadZone';
import { AnalysisResults } from './components/AnalysisResults';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { IndiaSafetyModal } from './components/IndiaSafetyModal';
import { ModelInfoModal } from './components/ModelInfoModal';
import { AnalysisResponse, ModelInfo, SampleScamScenario } from './types';
import { AlertTriangle, RefreshCw, Cpu, PhoneCall } from 'lucide-react';

export default function App() {
  const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null);
  const [preferredLanguage, setPreferredLanguage] = useState<string>('English');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);
  const [imageFilename, setImageFilename] = useState<string | null>(null);
  const [additionalContext, setAdditionalContext] = useState<string>('');
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<{
    title: string;
    description: string;
    troubleshooting?: string;
    modelConfigured?: string;
  } | null>(null);

  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState<boolean>(false);
  const [isModelModalOpen, setIsModelModalOpen] = useState<boolean>(false);

  // Fetch model information on mount
  useEffect(() => {
    fetch('/api/model-info')
      .then((res) => res.json())
      .then((data: ModelInfo) => {
        setModelInfo(data);
      })
      .catch((err) => {
        console.warn('Could not load model info from server:', err);
      });
  }, []);

  const handleImageSelected = (base64: string, mimeType: string, filename: string) => {
    setImageBase64(base64);
    setImageMimeType(mimeType);
    setImageFilename(filename);
    setImagePreview(`data:${mimeType};base64,${base64}`);
    setErrorMessage(null);
  };

  const handleClearImage = () => {
    setImagePreview(null);
    setImageBase64(null);
    setImageMimeType(null);
    setImageFilename(null);
    setSelectedSampleId(null);
    setErrorMessage(null);
  };

  const handleSelectSample = (scenario: SampleScamScenario) => {
    setSelectedSampleId(scenario.id);
  };

  const handleAnalyze = async () => {
    if (!imageBase64 || !imageMimeType) {
      setErrorMessage({
        title: 'Image Required',
        description: 'Please upload a screenshot or select a sample scenario first.',
      });
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000); // 90s safety timeout

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64,
          mimeType: imageMimeType,
          additionalContext,
          preferredLanguage,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const responseText = await response.text();
      let data: any;
      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(`Server returned unexpected response (Status ${response.status}): ${responseText.slice(0, 150)}`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed. Please check the model configuration.');
      }

      setAnalysisResults(data);
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error('Analysis error:', err);

      const isTimeout = err.name === 'AbortError';
      const isNetworkError =
        err.message === 'Load failed' ||
        err.message?.toLowerCase().includes('failed to fetch') ||
        err.message?.toLowerCase().includes('network');

      setErrorMessage({
        title: isTimeout ? 'Analysis Request Timed Out' : 'Gemma Analysis Error',
        description: isTimeout
          ? 'The analysis with Gemma 4 took longer than expected. Please try uploading a slightly smaller or cropped screenshot focusing directly on the message text.'
          : isNetworkError
          ? 'The analysis request connection was interrupted. The screenshot has been automatically optimized; please click "Retry Analysis" below.'
          : err.message ||
            'Failed to communicate with the configured Gemma model. Please ensure the model is available to your account.',
        troubleshooting: isNetworkError
          ? 'Network requests with high-resolution images can sometimes drop. Re-submitting the optimized image will connect reliably.'
          : 'Make sure GEMINI_API_KEY is configured in your project secrets and that the model specified by GEMMA_MODEL_NAME is enabled.',
        modelConfigured: modelInfo?.modelName || 'models/gemma-4-26b-a4b-it',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetAnalysis = () => {
    setAnalysisResults(null);
    setErrorMessage(null);
    // Keep image preview ready in case user wants to test with different context or language, or clear
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Navigation Header */}
      <Header
        modelInfo={modelInfo}
        preferredLanguage={preferredLanguage}
        onLanguageChange={setPreferredLanguage}
        onOpenModelModal={() => setIsModelModalOpen(true)}
        onOpenSafetyModal={() => setIsSafetyModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Error notification banner if any */}
        {errorMessage && (
          <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 p-5 shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-xl bg-red-100 text-red-700 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-red-950">
                    {errorMessage.title}
                  </h3>
                  {errorMessage.modelConfigured && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-red-100 text-red-800 border border-red-200">
                      Model: {errorMessage.modelConfigured}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-red-800 leading-relaxed">
                  {errorMessage.description}
                </p>
                {errorMessage.troubleshooting && (
                  <p className="text-xs text-red-700/90 pt-1 font-medium">
                    💡 Troubleshooting: {errorMessage.troubleshooting}
                  </p>
                )}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={handleAnalyze}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-700 text-white text-xs font-bold hover:bg-red-800 transition"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Retry Analysis
                  </button>
                  <button
                    onClick={() => setIsModelModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-red-200 text-red-800 text-xs font-semibold hover:bg-red-50 transition"
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    Model Configuration
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Switch: Results OR Upload */}
        {analysisResults ? (
          <AnalysisResults
            results={analysisResults}
            onReset={handleResetAnalysis}
            originalImagePreview={imagePreview}
            onOpenSafetyModal={() => setIsSafetyModalOpen(true)}
          />
        ) : (
          <UploadZone
            imagePreview={imagePreview}
            onImageSelected={handleImageSelected}
            onClearImage={handleClearImage}
            additionalContext={additionalContext}
            onContextChange={setAdditionalContext}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            selectedSampleId={selectedSampleId}
            onSelectSample={handleSelectSample}
          />
        )}
      </main>

      {/* Mandatory Disclaimer Footer */}
      <DisclaimerBanner />

      {/* Modals */}
      <IndiaSafetyModal
        isOpen={isSafetyModalOpen}
        onClose={() => setIsSafetyModalOpen(false)}
      />

      <ModelInfoModal
        isOpen={isModelModalOpen}
        onClose={() => setIsModelModalOpen(false)}
        modelInfo={modelInfo}
      />
    </div>
  );
}
