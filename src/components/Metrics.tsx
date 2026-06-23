import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Globe, Plus, Award, Activity, TrendingUp } from "lucide-react";

interface MetricsProps {
  colorTheme: string;
}

export default function Metrics({ colorTheme }: MetricsProps) {
  // Animating count states
  const [projectsCount, setProjectsCount] = useState(0);
  const [successRate, setSuccessRate] = useState(0);
  const [growthCount, setGrowthCount] = useState(0);
  const [activeCircle, setActiveCircle] = useState(0);

  useEffect(() => {
    // Count up animations
    const duration = 1500;
    const intervalTime = 30;
    const steps = duration / intervalTime;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setProjectsCount(Math.min(Math.floor((86 / steps) * step), 86));
      setSuccessRate(Math.min(Math.floor((98 / steps) * step), 98));
      setGrowthCount(Math.min(Math.floor((223 / steps) * step), 223));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    // Auto-cycle indicator dots
    const dotsTimer = setInterval(() => {
      setActiveCircle((prev) => (prev + 1) % 3);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(dotsTimer);
    };
  }, []);

  const getThemeColor = () => {
    switch (colorTheme) {
      case "cyan": return "#00f0ff";
      case "green": return "#10b981";
      case "purple": return "#a855f7";
      case "orange": return "#ff9500";
      default: return "#ff3b30"; // red
    }
  };

  const activeColor = getThemeColor();

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-16 z-30 select-none">
      
      {/* Curved glowing ambient lighting behind the main container */}
      <div 
        className="absolute inset-x-12 top-1/2 -translate-y-1/2 h-[350px] rounded-full blur-[140px] opacity-[0.06] transition-all duration-1000 pointer-events-none"
        style={{ backgroundColor: activeColor }}
      ></div>

      {/* Main glassmorphism container styling */}
      <motion.div 
        id="metrics-glass-card"
        className="cyber-glass rounded-[32px] p-8 md:p-12 border border-white/5 relative overflow-hidden group shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Subtle grid accent inside the card */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40"></div>
        
        {/* Top Header section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 relative z-10">
          
          {/* Top Left: Logo tag and interactive indicator dots */}
          <div className="col-span-1 lg:col-span-5 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 bg-white/5 border border-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-sm">
              <Globe size={14} className="animate-spin" style={{ animationDuration: "12s", color: activeColor }} />
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">SYS_INDEX.A12</span>
            </div>

            {/* Interactive Channels indicator */}
            <div className="flex items-center space-x-3 pl-1">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  id={`metrics-indicator-dot-${idx}`}
                  onClick={() => setActiveCircle(idx)}
                  className="w-3.5 h-3.5 rounded-full transition-all duration-500 hover:scale-110 cursor-pointer"
                  style={{
                    backgroundColor: activeCircle === idx ? activeColor : "rgba(255, 255, 255, 0.15)",
                    boxShadow: activeCircle === idx ? `0 0 10px ${activeColor}` : "none"
                  }}
                />
              ))}
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider pl-2">Engine Mode: 0{activeCircle + 1}</span>
            </div>
          </div>

          {/* Top Right: The bold marketing statement */}
          <div className="col-span-1 lg:col-span-7">
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-display font-medium text-left">
              Transformamos la incertidumbre tecnológica en dominio comercial. En Avanza Ya fusionamos marketing estratégico con programas avanzados de capacitación en Inteligencia Artificial Generativa. Diseñamos masterclasses y planes de acción a medida que automatizan procesos, impulsan la creatividad y están respaldados por una sólida trayectoria de consultoría verificada en el mercado.
            </p>
          </div>

        </div>

        {/* Separator Line */}
        <div className="w-full h-[1px] bg-white/5 mb-12 relative">
          <div 
            className="absolute left-0 top-0 h-[1px] w-20 transition-all duration-1000"
            style={{ backgroundColor: activeColor }}
          ></div>
        </div>

        {/* Bottom Section: 3 Columns of Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
          
          {/* Metric 1 */}
          <motion.div 
            id="metric-col-projects"
            className="space-y-4 flex flex-col items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center h-[60px] md:h-[70px] pl-1">
              <svg 
                viewBox="0 0 272 92" 
                className="w-32 h-auto text-white filter drop-shadow-[0_0_15px_rgba(255,255,255,0.85)]"
                style={{ filter: "drop-shadow(0 0 12px rgba(255,255,255,0.85))" }}
              >
                <path fill="currentColor" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                <path fill="currentColor" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                <path fill="currentColor" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
                <path fill="currentColor" d="M225 3v65h-9.5V3h9.5z"/>
                <path fill="currentColor" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
                <path fill="currentColor" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"/>
              </svg>
            </div>
            
            {/* Metric bottom border indicator */}
            <div className="w-full h-[2px] bg-neutral-900 overflow-hidden rounded">
              <motion.div 
                className="h-full"
                style={{ backgroundColor: activeColor }}
                initial={{ width: 0 }}
                whileInView={{ width: "45%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.5 }}
              />
            </div>

            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mt-2">
              <Award size={12} style={{ color: activeColor }} />
              <span>ADOPCIÓN DE IA</span>
            </div>
          </motion.div>

          {/* Metric 2 */}
          <motion.div 
            id="metric-col-success"
            className="space-y-4 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-center w-full h-[60px] md:h-[70px]">
              <div className="relative w-16 h-16 flex items-center justify-center">
                {/* Rotating HUD outer ring */}
                <motion.div 
                  className="absolute inset-0 border border-dashed rounded-full"
                  style={{ 
                    borderColor: `${activeColor}80`,
                    boxShadow: `0 0 15px ${activeColor}30`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                />
                
                {/* Inner counter-rotating ring */}
                <motion.div 
                  className="absolute w-12 h-12 border border-dotted rounded-full"
                  style={{ 
                    borderColor: "white", 
                    opacity: 0.5,
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                />

                {/* Training graduation cap in the center with glow */}
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-8 h-8 text-white filter"
                  style={{ filter: `drop-shadow(0 0 8px rgba(255,255,255,0.85)) drop-shadow(0 0 6px ${activeColor})` }}
                >
                  <path 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.8" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M22 10v6M2 10l10-5 10 5-10 5z" 
                  />
                  <path 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.8" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M6 12.5V16c0 2 3 3 6 3s6-1 6-3v-3.5" 
                  />
                </svg>
                
                {/* HUD corner lines */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: activeColor }} />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r" style={{ borderColor: activeColor }} />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l" style={{ borderColor: activeColor }} />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: activeColor }} />
              </div>
            </div>
            
            {/* Metric bottom border indicator */}
            <div className="w-full h-[2px] bg-neutral-900 overflow-hidden rounded">
              <motion.div 
                className="h-full"
                style={{ backgroundColor: activeColor }}
                initial={{ width: 0 }}
                whileInView={{ width: "75%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.5 }}
              />
            </div>

            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mt-2">
              <Activity size={12} style={{ color: activeColor }} />
              <span>CAPACITACIÓN EMPRESARIAL</span>
            </div>
          </motion.div>

          {/* Metric 3 */}
          <motion.div 
            id="metric-col-growth"
            className="space-y-4 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center justify-center w-full h-[60px] md:h-[70px]">
              <TrendingUp 
                className="w-16 h-16 text-white filter"
                style={{ filter: "drop-shadow(0 0 12px rgba(255,255,255,0.85))" }}
              />
            </div>
            
            {/* Metric bottom border indicator */}
            <div className="w-full h-[2px] bg-neutral-900 overflow-hidden rounded">
              <motion.div 
                className="h-full"
                style={{ backgroundColor: activeColor }}
                initial={{ width: 0 }}
                whileInView={{ width: "60%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.5 }}
              />
            </div>

            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mt-2">
              <Plus size={12} style={{ color: activeColor }} />
              <span>CAMPAÑAS PROFESIONALES</span>
            </div>
          </motion.div>

        </div>

      </motion.div>
    </section>
  );
}
