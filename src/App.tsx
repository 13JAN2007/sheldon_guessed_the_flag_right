/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeaderBanner } from './components/HeaderBanner';
import { FlagScanner } from './components/FlagScanner';
import { FlagReport } from './components/FlagReport';
import { FlagQuiz } from './components/FlagQuiz';
import { FlagComparison } from './components/FlagComparison';
import { ApartmentRulesModal } from './components/ApartmentRulesModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'scanner' | 'quiz' | 'compare'>('scanner');
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [analyzedReport, setAnalyzedReport] = useState<any | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysisComplete = (result: any, preview?: string) => {
    setAnalyzedReport(result);
    setPreviewImage(preview);
    setActiveTab('scanner');
  };

  const handleScanAnother = () => {
    setAnalyzedReport(null);
    setPreviewImage(undefined);
    setError(null);
  };

  const handleInspectFlag = async (flagName: string) => {
    setActiveTab('scanner');
    setIsLoading(true);
    setAnalyzedReport(null);
    setError(null);

    try {
      const response = await fetch('/api/analyze-flag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flagNameHint: flagName }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setAnalyzedReport(data);
    } catch (err: any) {
      setError('Could not scan flag: ' + (err?.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Retro Broadcast Header */}
      <HeaderBanner
        onOpenRules={() => setIsRulesOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Studio Set Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {/* Tab 1: Flag Scanner & Report */}
        {activeTab === 'scanner' && (
          <div className="space-y-6">
            {analyzedReport ? (
              <FlagReport
                report={analyzedReport}
                previewImage={previewImage}
                onScanAnother={handleScanAnother}
              />
            ) : (
              <FlagScanner
                onAnalysisComplete={handleAnalysisComplete}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                error={error}
                setError={setError}
              />
            )}
          </div>
        )}

        {/* Tab 2: Sheldon's Flag Challenge (Quiz) */}
        {activeTab === 'quiz' && <FlagQuiz />}

        {/* Tab 3: Match or Clash (Comparison Tool) */}
        {activeTab === 'compare' && <FlagComparison onInspectFlag={handleInspectFlag} />}
      </main>

      {/* Retro Talk-Show Lower Thirds / Footer */}
      <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 py-6 px-4 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-bold text-slate-300 font-mono">
              &quot;Sheldon Cooper Presents: Fun with Flags!&quot; © Pasadena Vexillological Society
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Broadcast live from the living room sofa of Apartment 4A. Sheldon’s spot is reserved in perpetuity.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsRulesOpen(true)}
              className="text-amber-400 hover:underline font-mono text-xs"
            >
              Apartment Rules &amp; Glossary
            </button>
            <span>•</span>
            <span className="text-slate-400 font-mono">Powered by Google Gemini</span>
          </div>
        </div>
      </footer>

      {/* Roommate Agreement & Rules Modal */}
      <ApartmentRulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />
    </div>
  );
}
