import React, { useState } from 'react';
import {
  Trophy,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Zap,
  Volume2,
} from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/flagsData';
import { soundEffects } from '../utils/audio';

export const FlagQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [sheldonPatience, setSheldonPatience] = useState(100); // 0-100%

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      soundEffects.playCorrectFanfare();
      setScore((s) => s + 100 + streak * 25);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > highestStreak) setHighestStreak(newStreak);
      setSheldonPatience((p) => Math.min(100, p + 10));
    } else {
      soundEffects.playWrongBuzzer();
      setStreak(0);
      setSheldonPatience((p) => Math.max(10, p - 25));
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentIndex((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
  };

  const handleResetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setSheldonPatience(100);
  };

  const getPatienceColor = () => {
    if (sheldonPatience > 60) return 'bg-emerald-500';
    if (sheldonPatience > 30) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full bg-slate-900/90 rounded-2xl border-2 border-slate-700 shadow-2xl p-4 sm:p-6 text-white backdrop-blur">
      {/* Quiz Header & Gamification Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-400 font-['Bungee',sans-serif] flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            Sheldon&apos;s Flag Challenge
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Test your vexillological prowess. Answer correctly to earn Sheldon&apos;s rare approval!
          </p>
        </div>

        {/* Stats Pills */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Score:</span>
            <span className="text-sm font-black text-amber-400 font-mono">{score}</span>
          </div>

          <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5">
            <Flame className={`w-4 h-4 ${streak > 0 ? 'text-orange-500 animate-bounce' : 'text-slate-600'}`} />
            <span className="text-xs text-slate-400 font-mono">Streak:</span>
            <span className="text-sm font-black text-orange-400 font-mono">{streak}</span>
          </div>

          <button
            onClick={handleResetQuiz}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition"
            title="Reset Quiz"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sheldon's Patience Meter */}
      <div className="my-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center justify-between text-xs mb-1 font-mono">
          <span className="text-slate-400 flex items-center gap-1.5">
            <span>Dr. Cooper&apos;s Patience Index:</span>
            <strong className={sheldonPatience < 35 ? 'text-red-400 animate-pulse' : 'text-amber-300'}>
              {sheldonPatience}%
            </strong>
          </span>
          <span className="text-[10px] text-slate-500">
            {sheldonPatience > 70
              ? 'Currently Tolerant of Inferior Minds'
              : sheldonPatience > 35
              ? 'Irritation Brewing in Apartment 4A'
              : 'Imminent Roommate Agreement Sanctions'}
          </span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${getPatienceColor()}`}
            style={{ width: `${sheldonPatience}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-slate-950 p-6 rounded-2xl border-2 border-slate-800 mt-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase bg-amber-500/10 text-amber-400 px-2.5 py-0.5 rounded border border-amber-500/30">
            Challenge #{currentIndex + 1} of {QUIZ_QUESTIONS.length}
          </span>
          <span className="text-xs font-mono text-slate-400">
            Best Streak: {highestStreak}
          </span>
        </div>

        <h3 className="text-base sm:text-xl font-bold text-white leading-snug">
          {currentQ.question}
        </h3>

        {/* Option Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;

            let buttonClass =
              'bg-slate-900 border-2 border-slate-800 hover:border-amber-400 text-slate-200';
            if (isAnswered) {
              if (isCorrect) {
                buttonClass =
                  'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/20';
              } else if (isSelected) {
                buttonClass =
                  'bg-red-950/80 border-2 border-red-500 text-red-200 shadow-lg shadow-red-500/20';
              } else {
                buttonClass = 'bg-slate-950 border-2 border-slate-800 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`p-4 rounded-xl text-left text-sm font-semibold transition flex items-center justify-between group ${buttonClass}`}
              >
                <span>{opt}</span>
                {isAnswered && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback Box from Sheldon & Amy */}
        {isAnswered && (
          <div className="mt-6 pt-6 border-t border-slate-800 space-y-4">
            {/* Sheldon's Verdict */}
            <div
              className={`p-4 rounded-xl border-2 flex items-start gap-3 ${
                selectedOption === currentQ.correctIndex
                  ? 'bg-emerald-950/40 border-emerald-500/60'
                  : 'bg-red-950/40 border-red-500/60'
              }`}
            >
              <div className="text-3xl shrink-0">
                {selectedOption === currentQ.correctIndex ? '🦸‍♂️' : '😠'}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <strong className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Dr. Sheldon Cooper:
                  </strong>
                  <span className="text-[10px] font-mono text-slate-400">
                    {selectedOption === currentQ.correctIndex
                      ? 'Approving Reaction'
                      : 'Severe Disappointment'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 italic leading-relaxed">
                  &quot;
                  {selectedOption === currentQ.correctIndex
                    ? currentQ.sheldonCorrectQuote
                    : currentQ.sheldonIncorrectQuote}
                  &quot;
                </p>
              </div>
            </div>

            {/* Amy's Insight & Trivia */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
              <div className="text-3xl shrink-0">👩‍🔬</div>
              <div className="flex-1 text-xs">
                <strong className="font-bold text-teal-400 uppercase tracking-wider block">
                  Dr. Amy Farrah Fowler&apos;s Co-Host Note:
                </strong>
                <p className="text-slate-300 mt-0.5 leading-relaxed italic">
                  &quot;{currentQ.amyInsight}&quot;
                </p>
                <div className="mt-2 text-[11px] font-mono text-amber-300/90 bg-black/40 p-2 rounded border border-amber-500/20">
                  <span className="font-bold">Historical Trivia:</span> {currentQ.funFact}
                </div>
              </div>
            </div>

            {/* Next Question Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-amber-500 text-slate-950 font-black rounded-xl text-xs sm:text-sm hover:brightness-110 active:scale-95 transition font-['Bungee',sans-serif] shadow-lg flex items-center gap-2"
              >
                <span>Next Vexillology Question</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
