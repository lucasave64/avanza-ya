import { useState, useEffect } from "react";
import { Menu, Globe, ArrowUpRight } from "lucide-react";
// @ts-ignore
import avanzaYaLogo from "@/src/assets/images/public/Logo Avanza Ya.png";

interface NavbarProps {
  colorTheme: string;
}

export default function Navbar({ colorTheme }: NavbarProps) {
  const [time, setTime] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("es");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Cordoba, Argentina Time format
      const optionsCordoba: Intl.DateTimeFormatOptions = {
        timeZone: "America/Argentina/Cordoba",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const cordobaTimeString = new Intl.DateTimeFormat("es-AR", optionsCordoba).format(now);
      
      // UTC dynamic tech timestamp
      const optionsUTC: Intl.DateTimeFormatOptions = {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      const utcTimeString = new Intl.DateTimeFormat("en-US", optionsUTC).format(now);
      
      setTime(`Córdoba, Argentina, ${cordobaTimeString} / UTC ${utcTimeString}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="w-full h-16 fixed top-0 left-0 bg-neutral-950/40 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-between px-6 md:px-12">
      {/* Left side: Menu button & Location Clock */}
      <div className="flex items-center space-x-6">
        <button 
          id="nav-menu-btn"
          className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <Menu size={16} className="text-neutral-400" />
          <span className="hidden sm:inline">Menu</span>
        </button>

        <div className="hidden md:flex items-center space-x-2 text-xs font-mono text-neutral-500 border-l border-white/10 pl-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{time}</span>
        </div>
      </div>

      {/* Center: Brand Image Logo */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-2">
        <img 
          src={avanzaYaLogo} 
          alt="Avanza Ya Logo" 
          className="h-10 md:h-12 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Right side: Global hubs & Get Started */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Language Selector Dropdown */}
        <div className="relative">
          <button 
            id="nav-lang-btn"
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            <Globe size={13} className="text-neutral-400" />
            <span className="uppercase">{selectedLang}</span>
            <span className="text-[10px] text-neutral-500 transition-transform duration-200" style={{ transform: langOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
          </button>

          {langOpen && (
            <>
              {/* Backing clickable overlay to close the dropdown */}
              <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
              
              <div 
                className="absolute right-0 mt-2 w-32 rounded-xl bg-neutral-900/95 border border-white/10 backdrop-blur-md overflow-hidden z-50 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150"
              >
                {[
                  { code: "es", label: "Español" },
                  { code: "en", label: "English" },
                  { code: "pt", label: "Português" }
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang.code);
                      setLangOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-mono uppercase tracking-wider hover:bg-white/10 transition-colors flex items-center justify-between"
                    style={{
                      color: selectedLang === lang.code ? (colorTheme === "cyan" ? "#00f0ff" : colorTheme === "green" ? "#10b981" : colorTheme === "purple" ? "#a855f7" : colorTheme === "orange" ? "#ff9500" : "#ff3b30") : "#a3a3a3"
                    }}
                  >
                    <span>{lang.label}</span>
                    {selectedLang === lang.code && (
                      <span className="w-1.5 h-1.5 rounded-full" style={{
                        backgroundColor: colorTheme === "cyan" ? "#00f0ff" : colorTheme === "green" ? "#10b981" : colorTheme === "purple" ? "#a855f7" : colorTheme === "orange" ? "#ff9500" : "#ff3b30"
                      }} />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
