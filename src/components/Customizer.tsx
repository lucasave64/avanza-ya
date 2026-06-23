import { Sliders, RefreshCw, Upload, Image, Sparkles, Wand2, Palette, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useRef } from "react";

interface CustomizerProps {
  colorTheme: string;
  setColorTheme: (theme: string) => void;
  agencyName: string;
  setAgencyName: (name: string) => void;
  showMockup: boolean;
  setShowMockup: (val: boolean) => void;
  uploadedBgUrl: string | null;
  setUploadedBgUrl: (url: string | null) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  gridOpacity: number;
  setGridOpacity: (val: number) => void;
  bgGlowIntensity: number;
  setBgGlowIntensity: (val: number) => void;
}

export default function Customizer({
  colorTheme,
  setColorTheme,
  agencyName,
  setAgencyName,
  showMockup,
  setShowMockup,
  uploadedBgUrl,
  setUploadedBgUrl,
  isOpen,
  setIsOpen,
  gridOpacity,
  setGridOpacity,
  bgGlowIntensity,
  setBgGlowIntensity,
}: CustomizerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        const url = URL.createObjectURL(file);
        setUploadedBgUrl(url);
        setShowMockup(false); // Hide the default astronaut so the user's upload shows
      } else {
        alert("Please select a supported image or video file.");
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedBgUrl(url);
      setShowMockup(false);
    }
  };

  const resetAll = () => {
    setColorTheme("red");
    setAgencyName("GAMER");
    setShowMockup(true);
    setUploadedBgUrl(null);
    setGridOpacity(0.4);
    setBgGlowIntensity(0.15);
  };

  // Predefined gorgeous neon cyber themes
  const colorThemes = [
    { id: "red", label: "Neon Crimson", hex: "#ff3b30" },
    { id: "orange", label: "Volt Amber", hex: "#ff9500" },
    { id: "cyan", label: "Hyper Cyan", hex: "#00f0ff" },
    { id: "green", label: "Emerald Matrix", hex: "#10b981" },
    { id: "purple", label: "Synth Purple", hex: "#a855f7" },
  ];

  const activeThemeColor = colorThemes.find(t => t.id === colorTheme)?.hex || "#ff3b30";

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="customizer-drawer"
            className="fixed top-0 right-0 h-full w-full max-w-sm md:max-w-md bg-neutral-950/95 backdrop-blur-xl border-l border-white/10 z-40 p-6 md:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl select-none"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
          >
            <div className="space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wand2 size={18} style={{ color: activeThemeColor }} />
                  <h3 className="text-sm font-bold font-tech uppercase text-white tracking-widest mt-1">Design Studio</h3>
                </div>
                <button
                  id="customizer-close-btn"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-mono px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-neutral-400 hover:text-white transition-all cursor-pointer"
                >
                  Hide Studio
                </button>
              </div>

              <div className="text-xs text-neutral-400 bg-white/5 border border-white/10 rounded-xl p-4 leading-relaxed font-mono">
                💡 <span className="text-white text-semibold">Interactive Sandbox Mode</span>: Recreate your precise aesthetic goals. Upload your future backgrounds today and adjust accent glows to visualize how they align in real time!
              </div>

              {/* Theme Settings Selection */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Palette size={14} style={{ color: activeThemeColor }} />
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Cyber Theme / Colors</span>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {colorThemes.map((theme) => (
                    <button
                      key={theme.id}
                      id={`theme-btn-${theme.id}`}
                      onClick={() => setColorTheme(theme.id)}
                      className="aspect-square rounded-xl border border-white/10 flex flex-col items-center justify-center p-1 cursor-pointer transition-all hover:scale-105"
                      style={{
                        borderColor: colorTheme === theme.id ? theme.hex : "rgba(255,255,255,0.08)",
                        backgroundColor: colorTheme === theme.id ? `${theme.hex}15` : "rgba(10,10,10,0.4)"
                      }}
                      title={theme.label}
                    >
                      <div className="w-5 h-5 rounded-full" style={{ backgroundColor: theme.hex }} />
                      <span className="text-[7px] font-mono uppercase tracking-widest text-neutral-400 mt-1.5 truncate max-w-full">
                        {theme.id}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Branding Customizer text input */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Sparkles size={14} style={{ color: activeThemeColor }} />
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Header Display Text</span>
                </div>
                <input
                  id="customizer-agency-name"
                  type="text"
                  maxLength={15}
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value.toUpperCase())}
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white/20 font-mono tracking-widest"
                  placeholder="e.g. GAMER"
                />
              </div>

              {/* Background Mockup controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Image size={14} style={{ color: activeThemeColor }} />
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Faux Helmet Overly</span>
                  </div>
                  
                  {/* Toggle view mockup button */}
                  <button
                    id="toggle-helmet-mockup"
                    onClick={() => {
                      setShowMockup(!showMockup);
                      if (!showMockup) setUploadedBgUrl(null); // Clear custom background so user can see default mockup
                    }}
                    className="flex items-center space-x-1 py-1 px-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-[10px] font-mono text-neutral-300 transition-colors cursor-pointer"
                  >
                    {showMockup ? (
                      <>
                        <EyeOff size={11} />
                        <span>Hide Helmet</span>
                      </>
                    ) : (
                      <>
                        <Eye size={11} />
                        <span>Show Helmet</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Custom Animated Background Uploader */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  Test Your Animated Background (Local File)
                </span>
                
                <div
                  id="bg-dropzone"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-dashed border-white/10 hover:border-white/20 bg-neutral-900/30 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all text-center space-y-2 select-none group"
                >
                  <Upload size={22} className="text-neutral-500 group-hover:text-white transition-colors" />
                  <span className="text-xs font-medium text-neutral-300 group-hover:text-white">
                    {uploadedBgUrl ? "✅ Backdrop Layer Loaded" : "Upload Animated Asset"}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    Drag and drop your animation/image or click to browse.
                  </span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*,video/*"
                    className="hidden"
                  />
                </div>

                {uploadedBgUrl && (
                  <button
                    id="clear-uploaded-bg-btn"
                    onClick={() => {
                      setUploadedBgUrl(null);
                      setShowMockup(true);
                    }}
                    className="w-full py-2 bg-rose-500/10 border border-rose-500/20 rounded-xl text-[10px] font-mono text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                  >
                    Clear Custom Backdrop
                  </button>
                )}
              </div>

              {/* Grid Line Opacity and Accent Ambient Glow Intensity settings */}
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  Fine Tuning Controls
                </span>

                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] font-mono text-neutral-500 text-left">
                    <span>Background Grid Lines Opacity</span>
                    <span>{Math.round(gridOpacity * 100)} Tokyo Grid</span>
                  </div>
                  <input
                    id="grid-opacity-slider"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={gridOpacity}
                    onChange={(e) => setGridOpacity(parseFloat(e.target.value))}
                    className="w-full accent-neutral-200"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] font-mono text-neutral-500 text-left">
                    <span>Backdrop Aurora Glow Intensity</span>
                    <span>{Math.round(bgGlowIntensity * 100)} Flux</span>
                  </div>
                  <input
                    id="glow-intensity-slider"
                    type="range"
                    min="0"
                    max="0.8"
                    step="0.05"
                    value={bgGlowIntensity}
                    onChange={(e) => setBgGlowIntensity(parseFloat(e.target.value))}
                    className="w-full accent-neutral-200"
                  />
                </div>
              </div>
            </div>

            {/* Reset Defaults button */}
            <button
              id="customizer-reset-btn"
              onClick={resetAll}
              className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl flex items-center justify-center space-x-2 text-xs font-mono tracking-wider text-white transition-all cursor-pointer"
            >
              <RefreshCw size={12} />
              <span>Reset Scene Configuration</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
