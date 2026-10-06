import React, { useState } from 'react';
import {
  Scale,
  Sparkles,
  ArrowRightLeft,
  Award,
  AlertCircle,
  RefreshCw,
  Search,
  ExternalLink,
  Info,
} from 'lucide-react';
import { FAMOUS_RIVALRIES, FlagRivalry } from '../data/flagsData';
import { getFlagGraphic, FlagGraphicInfo } from '../utils/flagLookup';
import { soundEffects } from '../utils/audio';

interface FlagComparisonProps {
  onInspectFlag?: (flagName: string) => void;
}

export const FlagComparison: React.FC<FlagComparisonProps> = ({ onInspectFlag }) => {
  const [selectedRivalry, setSelectedRivalry] = useState<FlagRivalry>(FAMOUS_RIVALRIES[0]);
  const [customFlag1, setCustomFlag1] = useState('Chad');
  const [customFlag2, setCustomFlag2] = useState('Romania');
  const [comparisonResult, setComparisonResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectPredefined = (rivalry: FlagRivalry) => {
    soundEffects.playScanBeep();
    setSelectedRivalry(rivalry);
    setCustomFlag1(rivalry.flag1);
    setCustomFlag2(rivalry.flag2);
    setComparisonResult(null);
  };

  const handleCompareCustom = async (f1: string, f2: string) => {
    if (!f1 || !f2) return;
    setIsLoading(true);
    setError(null);
    soundEffects.playScanBeep();

    try {
      const response = await fetch('/api/compare-flags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flag1: f1, flag2: f2 }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      soundEffects.playBazinga();
      setComparisonResult(data);
    } catch (err: any) {
      console.error('Comparison error:', err);
      setError(err.message || 'Comparison request failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const activeFlag1Name = comparisonResult?.flag1Name ?? selectedRivalry.flag1;
  const activeFlag2Name = comparisonResult?.flag2Name ?? selectedRivalry.flag2;
  const activeSimilarity =
    comparisonResult?.similarityScore ?? selectedRivalry.similarityScore;
  const activeSheldonTake =
    comparisonResult?.sheldonsVerdict ?? selectedRivalry.sheldonTake;
  const activeAmyTake =
    comparisonResult?.amysVerdict ?? selectedRivalry.amyTake;
  const activeVerdict =
    comparisonResult?.winnerReason
      ? `Winner: ${comparisonResult.winner} — ${comparisonResult.winnerReason}`
      : selectedRivalry.verdict;

  const flag1Graphic: FlagGraphicInfo = getFlagGraphic(activeFlag1Name);
  const flag2Graphic: FlagGraphicInfo = getFlagGraphic(activeFlag2Name);

  // Quick suggestion pairs
  const quickPairs = [
    { f1: 'USA', f2: 'Liberia' },
    { f1: 'Norway', f2: 'Iceland' },
    { f1: 'Colombia', f2: 'Ecuador' },
    { f1: 'Poland', f2: 'Indonesia' },
    { f1: 'France', f2: 'Netherlands' },
  ];

  return (
    <div className="w-full bg-slate-900/90 rounded-2xl border-2 border-slate-700 shadow-2xl p-4 sm:p-6 text-white backdrop-blur">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-400 font-['Bungee',sans-serif] flex items-center gap-2">
            <Scale className="w-6 h-6 text-amber-400" />
            Match or Clash: Flag Comparison Tool
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Side-by-side visual and vexillological scrutiny of identical twins, fierce rivalries, and optical confusion.
          </p>
        </div>

        <div className="bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 flex items-center gap-2 shadow-inner">
          <span className="text-xs text-slate-400 font-mono">Similarity Index:</span>
          <span className="text-sm font-black text-amber-400 font-mono">{activeSimilarity}%</span>
        </div>
      </div>

      {/* Preset Rivalries Ribbon */}
      <div className="my-4">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
          Famous Historical Flag Duels:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {FAMOUS_RIVALRIES.map((riv) => (
            <button
              key={riv.id}
              onClick={() => handleSelectPredefined(riv)}
              className={`p-2.5 rounded-xl border text-left transition text-xs font-bold ${
                selectedRivalry.id === riv.id && !comparisonResult
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md ring-1 ring-amber-400/50'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="truncate">{riv.title}</span>
                <span className="text-[10px] font-mono text-amber-400 shrink-0">
                  {riv.similarityScore}%
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-normal truncate block">
                {riv.flag1} vs {riv.flag2}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Comparison Input Bar */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6">
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-2 font-mono">
          Compare Any Two Sovereign Flags:
        </span>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <input
            type="text"
            value={customFlag1}
            onChange={(e) => setCustomFlag1(e.target.value)}
            placeholder="Flag 1 (e.g. Chad, Ireland, USA)"
            className="w-full sm:flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium"
          />
          <ArrowRightLeft className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
          <input
            type="text"
            value={customFlag2}
            onChange={(e) => setCustomFlag2(e.target.value)}
            placeholder="Flag 2 (e.g. Romania, Côte d'Ivoire, Liberia)"
            className="w-full sm:flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium"
          />
          <button
            onClick={() => handleCompareCustom(customFlag1, customFlag2)}
            disabled={isLoading || !customFlag1 || !customFlag2}
            className="w-full sm:w-auto px-5 py-2 bg-gradient-to-r from-red-600 to-amber-500 hover:brightness-110 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 disabled:opacity-50 shrink-0 font-['Bungee',sans-serif]"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span>{isLoading ? 'Comparing...' : 'Compare with AI'}</span>
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-900 text-xs">
          <span className="text-[10px] text-slate-500 font-mono">Try pairs:</span>
          {quickPairs.map((pair, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCustomFlag1(pair.f1);
                setCustomFlag2(pair.f2);
                handleCompareCustom(pair.f1, pair.f2);
              }}
              className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-300 text-[11px] font-mono border border-slate-800 transition"
            >
              {pair.f1} vs {pair.f2}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-950/80 border border-red-700 text-red-200 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Side-by-Side Faceoff Arena with ACTUAL FLAGS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {/* VS Badge in the center */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-950 border-2 border-amber-400 text-amber-400 font-black items-center justify-center font-['Bungee',sans-serif] shadow-2xl">
          VS
        </div>

        {/* Flag 1 Card */}
        <div className="bg-slate-950 p-5 rounded-2xl border-2 border-slate-800 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                Specimen Alpha
              </span>
              <span className="text-xs text-amber-400 font-mono font-bold">
                Ratio: {flag1Graphic.aspectRatio}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-['Bungee',sans-serif] truncate">
              {activeFlag1Name}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Official sovereign flag standard
            </p>
          </div>

          {/* Actual Flag Visual Display */}
          <div className="my-5 w-full aspect-[3/2] bg-slate-900/90 rounded-xl border-2 border-slate-700/80 overflow-hidden flex items-center justify-center p-3 relative shadow-inner group">
            {flag1Graphic.svgHtml ? (
              <div
                className="w-full h-full max-h-56 flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: flag1Graphic.svgHtml }}
              />
            ) : flag1Graphic.imageUrl ? (
              <img
                src={flag1Graphic.imageUrl}
                alt={`Flag of ${activeFlag1Name}`}
                className="w-full h-full object-contain rounded shadow drop-shadow-md"
                onError={(e) => {
                  // Fallback if network image fails
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-400">
                <span className="text-5xl mb-2">🚩</span>
                <span className="text-xs font-mono">{activeFlag1Name} Standard</span>
              </div>
            )}

            {/* Ratio badge overlay */}
            <span className="absolute bottom-2 right-2 bg-black/80 text-[10px] text-amber-300 font-mono px-2 py-0.5 rounded border border-slate-800">
              {flag1Graphic.aspectRatio}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-900">
            <span className="text-[11px] font-mono text-slate-400">
              NAVA Standard Codification
            </span>
            {onInspectFlag && (
              <button
                onClick={() => onInspectFlag(activeFlag1Name)}
                className="flex items-center gap-1 text-[11px] font-mono text-amber-400 hover:text-amber-300 hover:underline"
                title="Deep scan this flag with Sheldon's AI Scanner"
              >
                <span>Inspect in Scanner</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Flag 2 Card */}
        <div className="bg-slate-950 p-5 rounded-2xl border-2 border-slate-800 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded border border-teal-500/30">
                Specimen Beta
              </span>
              <span className="text-xs text-teal-400 font-mono font-bold">
                Ratio: {flag2Graphic.aspectRatio}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-['Bungee',sans-serif] truncate">
              {activeFlag2Name}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Counterpart sovereign flag standard
            </p>
          </div>

          {/* Actual Flag Visual Display */}
          <div className="my-5 w-full aspect-[3/2] bg-slate-900/90 rounded-xl border-2 border-slate-700/80 overflow-hidden flex items-center justify-center p-3 relative shadow-inner group">
            {flag2Graphic.svgHtml ? (
              <div
                className="w-full h-full max-h-56 flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: flag2Graphic.svgHtml }}
              />
            ) : flag2Graphic.imageUrl ? (
              <img
                src={flag2Graphic.imageUrl}
                alt={`Flag of ${activeFlag2Name}`}
                className="w-full h-full object-contain rounded shadow drop-shadow-md"
                onError={(e) => {
                  // Fallback if network image fails
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-400">
                <span className="text-5xl mb-2">🚩</span>
                <span className="text-xs font-mono">{activeFlag2Name} Standard</span>
              </div>
            )}

            {/* Ratio badge overlay */}
            <span className="absolute bottom-2 right-2 bg-black/80 text-[10px] text-teal-300 font-mono px-2 py-0.5 rounded border border-slate-800">
              {flag2Graphic.aspectRatio}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-900">
            <span className="text-[11px] font-mono text-slate-400">
              NAVA Standard Codification
            </span>
            {onInspectFlag && (
              <button
                onClick={() => onInspectFlag(activeFlag2Name)}
                className="flex items-center gap-1 text-[11px] font-mono text-teal-400 hover:text-teal-300 hover:underline"
                title="Deep scan this flag with Sheldon's AI Scanner"
              >
                <span>Inspect in Scanner</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Similarity Gauge Meter */}
      <div className="mt-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center justify-between text-xs mb-1 font-mono">
          <span className="text-slate-300">Design Overlap &amp; Optical Confusion Index:</span>
          <span className="text-amber-400 font-bold">{activeSimilarity}% Match</span>
        </div>
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 transition-all duration-500"
            style={{ width: `${activeSimilarity}%` }}
          />
        </div>
      </div>

      {/* Co-Host Commentary: Sheldon's Take & Amy's Take */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sheldon */}
        <div className="bg-gradient-to-br from-red-950/40 to-slate-950 p-5 rounded-2xl border-2 border-red-900/50 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🦸‍♂️</span>
            <div>
              <strong className="text-xs font-bold text-red-400 uppercase tracking-wider block">
                Dr. Sheldon Cooper&apos;s Rigorous Verdict
              </strong>
              <span className="text-[10px] text-slate-400 font-mono">Senior Vexillologist</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
            &quot;{activeSheldonTake}&quot;
          </p>
        </div>

        {/* Amy */}
        <div className="bg-gradient-to-br from-teal-950/40 to-slate-950 p-5 rounded-2xl border-2 border-teal-900/50 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">👩‍🔬</span>
            <div>
              <strong className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
                Dr. Amy Farrah Fowler&apos;s Co-Host Observation
              </strong>
              <span className="text-[10px] text-slate-400 font-mono">Neurobiology &amp; Optics</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
            &quot;{activeAmyTake}&quot;
          </p>
        </div>
      </div>

      {/* The Final Verdict Box */}
      <div className="mt-4 bg-amber-500/10 border-2 border-amber-500/40 p-4 rounded-xl flex items-center gap-3 shadow-md">
        <Award className="w-6 h-6 text-amber-400 shrink-0" />
        <div className="flex-1">
          <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider block">
            Official Apartment 4A Vexillological Decision:
          </span>
          <p className="text-xs sm:text-sm text-white font-semibold mt-0.5">
            {activeVerdict}
          </p>
        </div>
      </div>
    </div>
  );
};
