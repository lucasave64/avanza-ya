import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Metrics from "./components/Metrics";
import VideoCarousel from "./components/VideoCarousel";
import FooterPartners from "./components/FooterPartners";
import Customizer from "./components/Customizer";

export default function App() {
  // Theme and customization states
  const [colorTheme, setColorTheme] = useState("red");
  const [agencyName, setAgencyName] = useState("GAMER");
  const [showMockup, setShowMockup] = useState(true);
  const [uploadedBgUrl, setUploadedBgUrl] = useState<string | null>(null);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [gridOpacity, setGridOpacity] = useState(0.4);
  const [bgGlowIntensity, setBgGlowIntensity] = useState(0.15);

  // Get current accent hex
  const getThemeColorHex = () => {
    switch (colorTheme) {
      case "cyan": return "#00f0ff";
      case "green": return "#10b981";
      case "purple": return "#a855f7";
      case "orange": return "#ff9500";
      default: return "#ff3b30";
    }
  };

  const activeColorHex = getThemeColorHex();

  return (
    <div className="min-h-screen bg-[#050507] text-white overflow-x-hidden relative font-sans">
      
      {/* 1. Global Interactive Ambient Aurora Backdrops */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Continuous slow animating aurora spots mimicking premium design background */}
        <div 
          className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full blur-[200px] transition-all duration-1000 animate-pulse"
          style={{ 
            backgroundColor: `${activeColorHex}`,
            opacity: bgGlowIntensity,
            animationDuration: "10s"
          }}
        ></div>
        
        <div 
          className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full blur-[180px] transition-all duration-1000"
          style={{ 
            backgroundColor: `${activeColorHex}`,
            opacity: bgGlowIntensity * 0.7,
          }}
        ></div>

        {/* Global Tech Grid lines with custom opacity */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px]"
          style={{ opacity: gridOpacity }}
        ></div>

        {/* Vertical/Horizontal tech crosshair markers matching the original screenshot's style */}
        <div className="absolute top-24 left-1/2 w-[1px] h-32 bg-white/5 -translate-x-1/2"></div>
        <div className="absolute top-24 left-1/2 -translate-x-1/2 flex justify-between w-64 text-[9px] font-mono text-neutral-600 px-2">
          <span>PORTAL_GRID_SEC_X</span>
          <span>VAL_8.12</span>
        </div>
      </div>

      {/* 2. Top Navigation Bar */}
      <Navbar colorTheme={colorTheme} />

      {/* 3. Core Landing Page Contents */}
      <main className="relative z-10 w-full flex flex-col items-center">
        
        {/* Hero Section */}
        <Hero 
          colorTheme={colorTheme} 
          agencyName={agencyName}
          showMockup={showMockup}
          uploadedBgUrl={uploadedBgUrl}
        />

        {/* Mid-level Results Metrics Panel */}
        <Metrics colorTheme={colorTheme} />

        {/* Interactive Video Showcase Carousel */}
        <VideoCarousel />

        {/* Bottom Partners Logo Grid & Company Tenet */}
        <FooterPartners colorTheme={colorTheme} />

      </main>

      {/* 4. Elegant Minimalistic Footer */}
      <footer className="w-full py-8 border-t border-white/5 bg-neutral-950/40 backdrop-blur-md relative z-10 text-center text-[10px] font-mono text-neutral-500 tracking-wider">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeColorHex }} />
            <span>Contenido creado por Avanza Ya.</span>
          </div>
          <div className="flex space-x-4">
            <span>SYSTEM_ONLINE_2026</span>
          </div>
        </div>
      </footer>

      {/* 5. Cyber design customization sandbox drawer panel */}
      <Customizer 
        colorTheme={colorTheme}
        setColorTheme={setColorTheme}
        agencyName={agencyName}
        setAgencyName={setAgencyName}
        showMockup={showMockup}
        setShowMockup={setShowMockup}
        uploadedBgUrl={uploadedBgUrl}
        setUploadedBgUrl={setUploadedBgUrl}
        isOpen={customizerOpen}
        setIsOpen={setCustomizerOpen}
        gridOpacity={gridOpacity}
        setGridOpacity={setGridOpacity}
        bgGlowIntensity={bgGlowIntensity}
        setBgGlowIntensity={setBgGlowIntensity}
      />

    </div>
  );
}
