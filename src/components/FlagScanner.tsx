import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  RefreshCw,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Sliders,
  Maximize2,
  FlipHorizontal,
  Flame,
} from 'lucide-react';
import { SAMPLE_FLAGS, FlagSpecimen } from '../data/flagsData';
import { soundEffects } from '../utils/audio';

interface FlagScannerProps {
  onAnalysisComplete: (result: any, previewImage?: string) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  error: string | null;
  setError: (val: string | null) => void;
}

export const FlagScanner: React.FC<FlagScannerProps> = ({
  onAnalysisComplete,
  isLoading,
  setIsLoading,
  error,
  setError,
}) => {
  const [mode, setMode] = useState<'camera' | 'upload' | 'preset'>('camera');
  const [cameraActive, setCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Cycle loading quips in Sheldon's voice
  useEffect(() => {
    if (!isLoading) {
      setLoadingStep(0);
      return;
    }
    const quotes = [
      'Calibrating optical spectrophotometer...',
      'Comparing tinctures against NAVA standard codex...',
      'Verifying canton alignment and mathematical proportions...',
      'Dr. Amy Farrah Fowler is adjusting the apartment webcam focus...',
      'Consulting Article 42 of the Roommate Agreement regarding heraldic displays...',
    ];
    const timer = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % quotes.length);
    }, 1800);
    return () => clearInterval(timer);
  }, [isLoading]);

  // Start / Stop camera stream
  const startCamera = async () => {
    setError(null);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
      soundEffects.playScanBeep();
    } catch (err: any) {
      console.warn('Camera access issue:', err);
      setError(
        'Webcam access unavailable or permission was not granted. You can still upload any image below or choose one of our curated sample flags!'
      );
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    if (mode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [mode, facingMode]);

  // Capture frame from video stream
  const captureFrame = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const base64 = canvas.toDataURL('image/jpeg', 0.85);

    soundEffects.playShutter();
    analyzeImagePayload(base64, 'image/jpeg');
  };

  // Handle uploaded file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WEBP, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setUploadedPreview(result);
      soundEffects.playScanBeep();
      analyzeImagePayload(result, file.type);
    };
    reader.readAsDataURL(file);
  };

  // Perform server-side Gemini flag analysis
  const analyzeImagePayload = async (base64Image: string, mimeType: string, hint?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze-flag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Image,
          mimeType,
          flagNameHint: hint,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      soundEffects.playBazinga();
      onAnalysisComplete(data, base64Image);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(
        err.message || 'Sheldon encountered a vexillological anomaly during analysis. Please try again!'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Load a preset sample flag
  const handleSelectPreset = (flag: FlagSpecimen) => {
    soundEffects.playScanBeep();
    // Build an SVG data uri for preview
    const svgDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 100">${flag.svgContent}</svg>`
    )}`;

    // Pass the rich preset directly so it loads instantaneously, while also updating
    onAnalysisComplete(
      {
        isFlag: true,
        countryOrEntity: flag.name,
        aspectRatio: flag.aspectRatio,
        classification: flag.classification,
        colorPalette: flag.colors,
        symbolism: flag.symbolism,
        sheldonGrade: flag.sheldonGrade,
        sheldonsFunFlagFact: flag.sheldonsFunFlagFact,
        amysCommentary: flag.amysCommentary,
        sheldonReactionQuote: flag.sheldonReactionQuote,
        vexillologicalRulesCompliance: flag.vexillologicalRulesCompliance,
      },
      svgDataUri
    );
  };

  const loadingQuotes = [
    'Calibrating optical spectrophotometer...',
    'Comparing tinctures against NAVA standard codex...',
    'Verifying canton alignment and mathematical proportions...',
    'Dr. Amy Farrah Fowler is adjusting the apartment webcam focus...',
    'Consulting Article 42 of the Roommate Agreement regarding heraldic displays...',
  ];

  return (
    <div className="w-full bg-slate-900/90 rounded-2xl border-2 border-slate-700 shadow-2xl p-4 sm:p-6 backdrop-blur">
      {/* Hidden canvas for video captures */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-400 font-['Bungee',sans-serif] flex items-center gap-2">
            <Camera className="w-6 h-6 text-red-500" />
            Flag Scanner &amp; AI Breakdown
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Show a flag to Dr. Sheldon Cooper’s webcam, upload a photo, or choose a specimen from the collection.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs font-semibold">
          <button
            onClick={() => setMode('camera')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
              mode === 'camera'
                ? 'bg-amber-500 text-slate-950 shadow font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Live Webcam</span>
          </button>
          <button
            onClick={() => setMode('upload')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
              mode === 'upload'
                ? 'bg-amber-500 text-slate-950 shadow font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Photo</span>
          </button>
          <button
            onClick={() => setMode('preset')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
              mode === 'preset'
                ? 'bg-amber-500 text-slate-950 shadow font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sample Flags</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-950/80 border border-red-700 text-red-200 rounded-xl text-xs sm:text-sm flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <strong className="font-bold text-red-300">Sheldon&apos;s Error Log:</strong> {error}
          </div>
        </div>
      )}

      {/* Main Scanner Viewport */}
      {mode === 'camera' && (
        <div className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden bg-black border-2 border-amber-400/70 shadow-2xl aspect-[4/3] sm:aspect-[16/9] flex items-center justify-center">
          <video
            ref={videoRef}
            playsInline
            muted
            className="w-full h-full object-cover"
          />

          {/* Vexillological TV Studio HUD Overlay */}
          <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
            {/* Top HUD */}
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="bg-black/75 px-3 py-1 rounded border border-amber-400/40 text-amber-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>OPTICAL SCANNER: READY</span>
              </div>
              <div className="bg-black/75 px-3 py-1 rounded border border-slate-700 text-slate-300">
                RATIO SENSOR: 16:9 HD
              </div>
            </div>

            {/* Center Targeting Reticle */}
            <div className="relative mx-auto w-3/4 sm:w-3/5 h-3/5 border-2 border-dashed border-amber-400/60 rounded-xl flex items-center justify-center">
              {/* Corner brackets */}
              <div className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-amber-400"></div>
              <div className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-amber-400"></div>
              <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-amber-400"></div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-amber-400"></div>

              {/* Crosshair */}
              <div className="w-8 h-0.5 bg-amber-400/70"></div>
              <div className="h-8 w-0.5 bg-amber-400/70 absolute"></div>

              {/* Sweeping laser scan line */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-lg shadow-red-500/80 animate-[bounce_3s_infinite]"></div>

              <div className="absolute bottom-2 bg-black/80 text-[11px] font-mono text-amber-300 px-2.5 py-0.5 rounded border border-amber-500/30">
                ALIGN FLAG OR OBJECT INSIDE RETICLE
              </div>
            </div>

            {/* Bottom HUD info */}
            <div className="text-center font-mono text-[10px] text-slate-400 bg-black/60 py-1 rounded">
              &quot;Geopolitical cloth inspection active. Please do not fold flags improperly.&quot; — Dr. Cooper
            </div>
          </div>

          {/* Camera Controls Overlay */}
          <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-3 px-4 pointer-events-auto">
            <button
              onClick={() => setFacingMode((m) => (m === 'user' ? 'environment' : 'user'))}
              className="p-3 bg-slate-900/90 hover:bg-slate-800 text-slate-200 rounded-full border border-slate-700 shadow-lg transition"
              title="Flip Camera (Front/Rear)"
            >
              <FlipHorizontal className="w-5 h-5" />
            </button>

            <button
              onClick={captureFrame}
              disabled={isLoading || !cameraActive}
              className="px-6 py-3 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-slate-950 font-black rounded-full shadow-2xl hover:brightness-110 active:scale-95 transition flex items-center gap-2 border-2 border-white/50 disabled:opacity-50 text-sm sm:text-base font-['Bungee',sans-serif]"
            >
              <Camera className="w-5 h-5" />
              <span>{isLoading ? 'Scanning...' : 'SCAN FLAG NOW!'}</span>
            </button>

            <button
              onClick={startCamera}
              className="p-3 bg-slate-900/90 hover:bg-slate-800 text-slate-200 rounded-full border border-slate-700 shadow-lg transition"
              title="Reset Video Stream"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Upload Viewport */}
      {mode === 'upload' && (
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-amber-400/60 hover:border-amber-400 bg-slate-950/60 hover:bg-slate-950/90 rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition flex flex-col items-center justify-center gap-4 group"
          >
            {uploadedPreview ? (
              <div className="max-w-xs max-h-56 rounded-xl overflow-hidden border-2 border-amber-400 shadow-xl relative">
                <img
                  src={uploadedPreview}
                  alt="Uploaded Flag"
                  className="w-full h-full object-contain bg-slate-900"
                />
                <span className="absolute bottom-2 right-2 bg-black/80 text-[10px] text-amber-300 px-2 py-0.5 rounded font-mono">
                  Ready for Sheldon
                </span>
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-amber-500/10 group-hover:bg-amber-500/20 text-amber-400 flex items-center justify-center transition border border-amber-500/30">
                <Upload className="w-9 h-9" />
              </div>
            )}

            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition font-['Bungee',sans-serif]">
                {uploadedPreview ? 'Click to Change Image' : 'Click to Upload Flag Photo'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm">
                Supports photos of real flags, stickers, heraldic standards, or vexilloids in PNG, JPG, or WEBP.
              </p>
            </div>

            <button
              type="button"
              className="mt-2 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-md transition"
            >
              Browse Files
            </button>
          </div>
        </div>
      )}

      {/* Preset Flags Viewport */}
      {mode === 'preset' && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Curated Vexillological Specimens for Instant Scan:
            </span>
            <span className="text-xs text-amber-400 font-mono">8 Classic Specimens</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SAMPLE_FLAGS.map((flag) => (
              <button
                key={flag.id}
                onClick={() => handleSelectPreset(flag)}
                disabled={isLoading}
                className="flex flex-col bg-slate-800/80 hover:bg-slate-800 border-2 border-slate-700 hover:border-amber-400 rounded-xl p-3 text-left transition group shadow-md hover:shadow-amber-500/10"
              >
                <div className="w-full aspect-[3/2] bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center p-2 mb-2 border border-slate-700">
                  <div
                    className="w-full h-full flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: flag.svgContent }}
                  />
                </div>
                <strong className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-400 truncate">
                  {flag.name}
                </strong>
                <span className="text-[10px] text-slate-400 truncate mt-0.5">
                  {flag.subtitle}
                </span>
                <span className="mt-2 inline-block text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800 self-start">
                  Grade: {flag.sheldonGrade.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-amber-400/50 shadow-2xl flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 text-amber-400 font-black text-sm uppercase tracking-wider mb-2 font-mono">
            <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
            <span>AI Vexillologist Analysis in Progress</span>
          </div>

          <p className="text-sm font-medium text-slate-200 italic max-w-lg">
            &quot;{loadingQuotes[loadingStep]}&quot;
          </p>

          <div className="w-48 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-3">
            <div className="w-full h-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400 animate-[pulse_1.5s_infinite]"></div>
          </div>
        </div>
      )}
    </div>
  );
};
