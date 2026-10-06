import React from 'react';
import { X, ShieldAlert, BookOpen, KeyRound, Sparkles } from 'lucide-react';
import { APARTMENT_4A_RULES, VEXILLOLOGY_TERMS } from '../data/flagsData';

interface ApartmentRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApartmentRulesModal: React.FC<ApartmentRulesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border-2 border-amber-400 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden text-white my-8">
        {/* Modal Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-black font-['Bungee',sans-serif] text-white">
              Apartment 4A Vexillological Protocol
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
          {/* Roommate Agreement Excerpt */}
          <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30">
            <span className="text-[11px] font-mono uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 block mb-2 w-max">
              The Roommate Agreement (Clause 42-B)
            </span>
            <h4 className="font-bold text-amber-400 mb-2">
              Sheldon Cooper&apos;s Mandatory Apartment Flag Regulations:
            </h4>
            <ul className="space-y-2 text-slate-300">
              {APARTMENT_4A_RULES.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vexillology Glossary */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <h4 className="font-bold text-emerald-400 uppercase tracking-wider font-mono text-xs">
                Dr. Cooper&apos;s Glossary of Essential Terms:
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {VEXILLOLOGY_TERMS.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 p-3 rounded-xl border border-slate-800"
                >
                  <strong className="text-amber-300 font-bold block mb-0.5">
                    {item.term}
                  </strong>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Studio Gemini Integration Note */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-4 rounded-xl border border-slate-700">
            <div className="flex items-center gap-2 mb-1.5">
              <KeyRound className="w-4 h-4 text-amber-400" />
              <h4 className="font-bold text-amber-300 font-mono text-xs">
                Google Gemini AI Integration Architecture:
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Real-time flag recognition and vexillological analysis are processed through the server-side proxy using{' '}
              <strong className="text-white">@google/genai</strong> and model <code className="text-amber-300 bg-black/40 px-1 py-0.5 rounded">gemini-3.8-flash</code>.
              Your <code className="text-amber-300 bg-black/40 px-1 py-0.5 rounded">GEMINI_API_KEY</code> is automatically injected by Google AI Studio via the Secrets panel.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition font-['Bungee',sans-serif]"
          >
            Acknowledge &amp; Obey
          </button>
        </div>
      </div>
    </div>
  );
};
