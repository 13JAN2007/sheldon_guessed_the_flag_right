import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, BookOpen, Video, Sparkles } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface HeaderBannerProps {
  onOpenRules: () => void;
  activeTab: 'scanner' | 'quiz' | 'compare';
  setActiveTab: (tab: 'scanner' | 'quiz' | 'compare') => void;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  onOpenRules,
  activeTab,
  setActiveTab,
}) => {
  const [isMuted, setIsMuted] = useState(soundEffects.isMuted);
  const [recSeconds, setRecSeconds] = useState(254);
  const [isHarpPlaying, setIsHarpPlaying] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setRecSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const toggleMute = () => {
    soundEffects.isMuted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handlePlayHarp = () => {
    setIsHarpPlaying(true);
    soundEffects.playHarpTheme();
    setTimeout(() => setIsHarpPlaying(false), 1500);
  };

  return (
    <header className="w-full bg-slate-900 text-white shadow-2xl border-b-4 border-amber-400 relative overflow-hidden">
      {/* Top Webcam Broadcast Status Bar */}
      <div className="bg-black/80 px-4 py-1.5 flex flex-wrap items-center justify-between text-xs font-mono border-b border-slate-800 gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-red-950/80 text-red-400 px-2 py-0.5 rounded border border-red-800 animate-pulse">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block shadow-sm shadow-red-500"></span>
            <span className="font-bold tracking-wider">REC</span>
            <span>{formatTime(recSeconds)}</span>
          </div>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-amber-400 font-semibold hidden sm:inline">
            APARTMENT 4A WEBCAM FEED #282
          </span>
          <span className="text-slate-400 hidden md:inline">|</span>
          <span className="text-slate-300 hidden md:inline">
            MIC: SENNHEISER DUAL (DR. COOPER / DR. FOWLER)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayHarp}
            title="Amy, play the theme song on the harp!"
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition font-sans font-medium ${
              isHarpPlaying
                ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700'
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${isHarpPlaying ? 'animate-bounce' : ''}`} />
            <span>Amy&apos;s Harp Theme</span>
          </button>

          <button
            onClick={toggleMute}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded text-xs transition border border-slate-700"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Audio ON'}</span>
          </button>

          <button
            onClick={onOpenRules}
            className="flex items-center gap-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded text-xs transition font-sans"
            title="Apartment 4A Flag Protocol & Vexillological Terms"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Apt 4A Rules</span>
          </button>
        </div>
      </div>

      {/* Decorative Flag Bunting */}
      <div className="h-2.5 w-full flex overflow-hidden">
        <div className="flex-1 bg-red-600"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-blue-600"></div>
        <div className="flex-1 bg-yellow-400"></div>
        <div className="flex-1 bg-emerald-600"></div>
        <div className="flex-1 bg-red-600"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-blue-600"></div>
        <div className="flex-1 bg-yellow-400"></div>
        <div className="flex-1 bg-emerald-600"></div>
        <div className="flex-1 bg-purple-600"></div>
        <div className="flex-1 bg-orange-500"></div>
      </div>

      {/* Main Show Banner */}
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left flex-1">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            The Premier YouTube Podcast on Vexillology
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-['Bungee',sans-serif] drop-shadow-md text-balance leading-tight">
            <span className="text-amber-400">Sheldon Cooper</span> Presents:{' '}
            <span className="text-red-500 bg-white/10 px-2 py-0.5 rounded border border-white/20 inline-block mt-1 sm:mt-0">
              Fun with Flags!
            </span>
          </h1>

          <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl font-sans">
            Hosted by <strong className="text-amber-300">Dr. Sheldon Cooper</strong> (B.S., M.S., Ph.D., Sc.D.) &amp;{' '}
            <strong className="text-emerald-300">Dr. Amy Farrah Fowler</strong> (Ph.D., Neurobiology). An intellectual celebration of tinctures, cantons, and geopolitical cloth!
          </p>
        </div>

        {/* Co-host Portraits / Talk Show Badge */}
        <div className="flex items-center gap-4 bg-slate-800/90 p-3 rounded-2xl border-2 border-slate-700 shadow-xl backdrop-blur-sm">
          {/* Sheldon Card */}
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-2xl" title="Dr. Sheldon Cooper">
                🦸‍♂️
              </div>
            </div>
            <span className="text-xs font-bold text-amber-300 mt-1">Dr. S. Cooper</span>
            <span className="text-[10px] text-slate-400">Vexillologist</span>
          </div>

          <div className="text-amber-400 text-xl font-black">&amp;</div>

          {/* Amy Card */}
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-2xl" title="Dr. Amy Farrah Fowler">
                👩‍🔬
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-300 mt-1">Dr. A. Fowler</span>
            <span className="text-[10px] text-slate-400">Harp &amp; Biology</span>
          </div>
        </div>
      </div>

      {/* Show Navigation Tabs */}
      <div className="bg-slate-950/90 px-4 pt-1 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex items-center justify-center sm:justify-start gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-bold transition border-t-2 border-x-2 ${
              activeTab === 'scanner'
                ? 'bg-slate-900 text-amber-400 border-amber-400 shadow-lg'
                : 'bg-slate-950 text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>1. Flag Scanner &amp; AI Breakdown</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-bold transition border-t-2 border-x-2 ${
              activeTab === 'quiz'
                ? 'bg-slate-900 text-amber-400 border-amber-400 shadow-lg'
                : 'bg-slate-950 text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>2. Sheldon&apos;s Flag Challenge (Quiz)</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-bold transition border-t-2 border-x-2 ${
              activeTab === 'compare'
                ? 'bg-slate-900 text-amber-400 border-amber-400 shadow-lg'
                : 'bg-slate-950 text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <span className="text-base leading-none">⚖️</span>
            <span>3. Match or Clash (Comparison)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
