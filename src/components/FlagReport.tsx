import React from 'react';
import {
  Award,
  CheckCircle,
  HelpCircle,
  Palette,
  Compass,
  Calendar,
  Sparkles,
  AlertTriangle,
  Flame,
  Volume2,
  Share2,
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface FlagReportProps {
  report: {
    isFlag: boolean;
    countryOrEntity: string;
    aspectRatio: string;
    classification: string;
    colorPalette: {
      name: string;
      hex: string;
      percentage: number;
      symbolism: string;
    }[];
    symbolism: {
      shapesAndEmblems: string;
      historicalSignificance: string;
      adoptionYear: string;
    };
    sheldonGrade: string;
    sheldonsFunFlagFact: string;
    amysCommentary: string;
    sheldonReactionQuote: string;
    vexillologicalRulesCompliance: {
      simpleToDraw: string;
      meaningfulSymbolism: string;
      fewColors: string;
      noLetteringOrSeals: string;
      distinctive: string;
    };
  };
  previewImage?: string;
  onScanAnother: () => void;
}

export const FlagReport: React.FC<FlagReportProps> = ({
  report,
  previewImage,
  onScanAnother,
}) => {
  // If the user scanned something that is NOT a flag (like a selfie, mug, or cat)
  if (!report.isFlag) {
    return (
      <div className="w-full bg-slate-900 border-2 border-red-500/80 rounded-2xl shadow-2xl p-6 sm:p-8 text-white">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-red-950 border-4 border-red-600 flex items-center justify-center text-4xl shrink-0">
            🚫
          </div>

          <div className="flex-1 text-center sm:text-left">
            <span className="text-xs font-mono uppercase bg-red-900/60 text-red-300 px-2.5 py-1 rounded border border-red-700">
              VEXILLOLOGICAL ANOMALY DETECTED
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-red-400 mt-2 font-['Bungee',sans-serif]">
              &quot;{report.countryOrEntity || 'Non-Vexillological Entity'}&quot; Is NOT a Flag!
            </h2>
            <p className="mt-3 text-slate-300 text-sm leading-relaxed">
              {report.sheldonReactionQuote ||
                'Amy, look at this. The user pointed their camera at something completely devoid of geopolitical cloth heraldry! While that object may have domestic utility, it is not recognized by the International Federation of Vexillological Associations (FIAV)!'}
            </p>
          </div>
        </div>

        {/* Sheldon and Amy dialogue */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-red-900/40">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1">
              <span>🦸‍♂️ Dr. Sheldon Cooper</span>
            </div>
            <p className="text-xs text-slate-300 italic">
              &quot;{report.sheldonsFunFlagFact ||
                'I am drafting an amendment to the Geneva Conventions classifying the presentation of non-flags on Fun with Flags as a misdemeanor.'}&quot;
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-teal-900/40">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
              <span>👩‍🔬 Dr. Amy Farrah Fowler</span>
            </div>
            <p className="text-xs text-slate-300 italic">
              &quot;{report.amysCommentary ||
                'Sheldon, calm down. The user was probably just testing if the optical recognition works. Plus, their visual cortex was clearly intrigued by our show.'}&quot;
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onScanAnother}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition font-['Bungee',sans-serif]"
          >
            Scan a Legitimate Flag
          </button>
        </div>
      </div>
    );
  }

  const triggerBazinga = () => {
    soundEffects.playBazinga();
  };

  return (
    <div className="w-full bg-slate-900/95 border-2 border-amber-400/80 rounded-2xl shadow-2xl overflow-hidden text-white backdrop-blur">
      {/* Dossier Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 border-b-2 border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          {previewImage && (
            <div className="w-20 h-14 sm:w-28 sm:h-20 bg-black rounded-lg border-2 border-amber-400/60 overflow-hidden shrink-0 shadow-lg flex items-center justify-center p-1">
              <img
                src={previewImage}
                alt={report.countryOrEntity}
                className="w-full h-full object-contain"
              />
            </div>
          )}

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                Official Vexillological Dossier
              </span>
              <span className="text-[11px] font-mono uppercase bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                Class: {report.classification}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white font-['Bungee',sans-serif] mt-1 text-balance">
              {report.countryOrEntity}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 mt-0.5 flex items-center gap-3">
              <span>Ratio: <strong className="text-amber-400 font-mono">{report.aspectRatio}</strong></span>
              <span>•</span>
              <span>Adopted: <strong className="text-emerald-400 font-mono">{report.symbolism.adoptionYear}</strong></span>
            </p>
          </div>
        </div>

        {/* Sheldon's Grade Stamp */}
        <div className="flex items-center gap-3 self-end md:self-center">
          <div className="text-right">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Sheldon&apos;s Rating</span>
            <span className="text-xs font-bold text-amber-400 font-mono">NAVA Evaluation</span>
          </div>

          <div
            onClick={triggerBazinga}
            title="Click to celebrate with Sheldon's Bazinga!"
            className="cursor-pointer group flex flex-col items-center justify-center bg-gradient-to-br from-amber-500 to-red-600 text-slate-950 px-4 py-2 rounded-xl shadow-xl border-2 border-white/60 hover:scale-105 active:scale-95 transition"
          >
            <span className="text-xl sm:text-2xl font-black font-['Bungee',sans-serif] leading-none">
              {report.sheldonGrade.split(' ')[0]}
            </span>
            <span className="text-[9px] uppercase tracking-wider font-extrabold mt-0.5 group-hover:underline">
              Bazinga!
            </span>
          </div>
        </div>
      </div>

      {/* Sheldon's Opening Quote */}
      <div className="bg-amber-500/10 border-b border-amber-500/30 px-6 py-3 flex items-center gap-3 text-xs sm:text-sm text-amber-200">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="italic">
          &quot;{report.sheldonReactionQuote}&quot; — Dr. Sheldon Cooper
        </span>
      </div>

      <div className="p-6 space-y-6">
        {/* Color Palette Breakdown */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2 font-mono">
              <Palette className="w-4 h-4" />
              Tincture &amp; Color Palette Breakdown
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {report.colorPalette.length} Distinct Tinctures
            </span>
          </div>

          {/* Color percentage bar */}
          <div className="w-full h-4 rounded-full overflow-hidden flex border border-slate-700 shadow-inner mb-3">
            {report.colorPalette.map((col, idx) => (
              <div
                key={idx}
                style={{
                  width: `${col.percentage}%`,
                  backgroundColor: col.hex,
                }}
                className="h-full relative group transition hover:opacity-90"
                title={`${col.name}: ${col.percentage}%`}
              />
            ))}
          </div>

          {/* Color cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {report.colorPalette.map((col, idx) => (
              <div
                key={idx}
                className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 flex items-start gap-3"
              >
                <div
                  className="w-7 h-7 rounded-lg shrink-0 border border-white/20 shadow-sm mt-0.5"
                  style={{ backgroundColor: col.hex }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <strong className="text-xs font-bold text-white truncate">
                      {col.name}
                    </strong>
                    <span className="text-[10px] font-mono text-amber-300">
                      {col.hex} ({col.percentage}%)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                    {col.symbolism}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Heraldic Symbolism & Shapes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2 font-mono mb-2">
              <Compass className="w-4 h-4" />
              Geometry &amp; Heraldic Charges
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {report.symbolism.shapesAndEmblems}
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2 font-mono mb-2">
              <Calendar className="w-4 h-4" />
              Historical Adoption &amp; Geopolitics
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {report.symbolism.historicalSignificance}
            </p>
          </div>
        </div>

        {/* Co-Host Commentary: Sheldon & Amy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sheldon's Fun Flag Fact */}
          <div className="bg-gradient-to-br from-red-950/40 to-slate-950 p-5 rounded-2xl border-2 border-red-900/50 relative overflow-hidden">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-xl">🦸‍♂️</span>
              <div>
                <strong className="text-xs font-bold text-red-400 uppercase tracking-wider block">
                  Sheldon&apos;s Fun Flag Fact
                </strong>
                <span className="text-[10px] text-slate-400 font-mono">
                  Dr. Sheldon Cooper, B.S., M.S., Ph.D., Sc.D.
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
              &quot;{report.sheldonsFunFlagFact}&quot;
            </p>
          </div>

          {/* Amy's Commentary */}
          <div className="bg-gradient-to-br from-teal-950/40 to-slate-950 p-5 rounded-2xl border-2 border-teal-900/50 relative overflow-hidden">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-xl">👩‍🔬</span>
              <div>
                <strong className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
                  Dr. Amy Farrah Fowler&apos;s Perspective
                </strong>
                <span className="text-[10px] text-slate-400 font-mono">
                  Ph.D. Neurobiology, Harvard / Caltech
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
              &quot;{report.amysCommentary}&quot;
            </p>
          </div>
        </div>

        {/* NAVA "Good Flag, Bad Flag" 5 Principles Scorecard */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <Award className="w-4 h-4" />
              Ted Kaye&apos;s NAVA &apos;Good Flag, Bad Flag&apos; 5 Principles
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">NAVA Compliance Matrix</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 text-xs">
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold text-amber-300 block mb-1">
                1. Keep It Simple
              </span>
              <p className="text-[11px] text-slate-300">
                {report.vexillologicalRulesCompliance.simpleToDraw}
              </p>
            </div>

            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold text-amber-300 block mb-1">
                2. Meaningful Symbolism
              </span>
              <p className="text-[11px] text-slate-300">
                {report.vexillologicalRulesCompliance.meaningfulSymbolism}
              </p>
            </div>

            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold text-amber-300 block mb-1">
                3. Use 2–3 Colors
              </span>
              <p className="text-[11px] text-slate-300">
                {report.vexillologicalRulesCompliance.fewColors}
              </p>
            </div>

            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold text-amber-300 block mb-1">
                4. No Lettering / Seals
              </span>
              <p className="text-[11px] text-slate-300">
                {report.vexillologicalRulesCompliance.noLetteringOrSeals}
              </p>
            </div>

            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold text-amber-300 block mb-1">
                5. Distinctive
              </span>
              <p className="text-[11px] text-slate-300">
                {report.vexillologicalRulesCompliance.distinctive}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={triggerBazinga}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-xl text-xs font-bold border border-amber-500/40 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Play Sheldon&apos;s Bazinga Chime</span>
          </button>

          <button
            onClick={onScanAnother}
            className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-amber-500 text-slate-950 font-black rounded-xl text-xs sm:text-sm hover:brightness-110 active:scale-95 transition font-['Bungee',sans-serif] shadow-lg"
          >
            Scan Another Flag
          </button>
        </div>
      </div>
    </div>
  );
};
