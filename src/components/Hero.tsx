import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Send, CheckCircle2, Instagram, Linkedin, Twitter, Sparkles } from "lucide-react";
// @ts-ignore
import avanzaYaLogo from "@/src/assets/images/public/Logo Avanza Ya.png";

interface LogoWrapperProps {
  activeColor: string;
}

function LogoWrapper({ activeColor }: LogoWrapperProps) {
  return (
    <img 
      src={avanzaYaLogo} 
      alt="Avanza Ya Logo" 
      className="h-20 md:h-24 w-auto object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
      referrerPolicy="no-referrer"
    />
  );
}

interface HeroProps {
  colorTheme: string;
  agencyName: string;
  showMockup: boolean;
  uploadedBgUrl: string | null;
}

export default function Hero({ colorTheme, agencyName, showMockup, uploadedBgUrl }: HeroProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedContactMethod, setSelectedContactMethod] = useState("email");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setIsSubmitted(true);
      
      // Open mailto link directly for lucasave64@gmail.com
      const subject = encodeURIComponent("Contacto desde Avanza Ya");
      const body = encodeURIComponent(`Hola Lucas, mi correo electrónico es: ${email}. Me gustaría ponerme en contacto contigo para avanzar con un proyecto.`);
      window.location.href = `mailto:lucasave64@gmail.com?subject=${subject}&body=${body}`;

      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 5000);
    }
  };

  // Get active theme colors
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
    <section className="relative w-full min-h-screen pt-20 pb-6 flex flex-col justify-between overflow-hidden px-6 md:px-12 select-none">
      
      {/* 1. Large background typography "GAMER/CREATIVE" */}
      <div className="absolute inset-x-0 top-[28%] -translate-y-1/2 flex justify-center items-center pointer-events-none select-none z-10 overflow-hidden mix-blend-screen opacity-90">
        <motion.h1 
          className="text-[17vw] font-extrabold tracking-[0.05em] uppercase font-tech text-center transition-all duration-700 leading-none"
          style={{
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.12)",
            color: "transparent",
            textShadow: `0 0 45px ${activeColor}0f`,
          }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {agencyName}
        </motion.h1>
      </div>

      {/* 2. Cyber Astronaut / Helmet mockup and custom uploads */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-20">
        <AnimatePresence mode="wait">
          {uploadedBgUrl ? (
            <motion.div 
              key="uploaded"
              className="relative w-full h-full flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={uploadedBgUrl} 
                alt="Uploaded Background Animation" 
                className="w-full h-full object-cover object-center opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-neutral-950/40"></div>
            </motion.div>
          ) : showMockup ? (
            <motion.div 
              key="mockup"
              className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            >
              <video 
                src="https://res.cloudinary.com/dq9lqahdf/video/upload/v1782170138/Chica_del_futuro_bad8zd.mp4" 
                className="w-full h-full object-cover aspect-video"
                autoPlay
                loop
                muted
                playsInline
              />
              
              {/* Highlight background light */}
              <div 
                className="absolute w-[350px] h-[350px] rounded-full blur-[120px] opacity-35 transition-all duration-1000"
                style={{ backgroundColor: activeColor }}
              ></div>

              {/* Overlay shading to blend in */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/30 pointer-events-none"></div>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              className="w-full h-full flex items-center justify-center bg-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
            >
              {/* Just a beautiful pulsing portal glow when backgrounds are hidden */}
              <div 
                className="w-[300px] h-[300px] rounded-full blur-[140px] opacity-35 animate-pulse transition-all duration-1000"
                style={{ backgroundColor: activeColor }}
              ></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Grid Overlay matching user's hi-tech image layout */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60 z-0"></div>

      {/* 3. Hero Contents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end relative z-30 w-full max-w-7xl mx-auto mt-48 md:mt-60 pb-10 md:pb-16 self-center grow">
        
        {/* Left Column: Title & Actions */}
        <div className="col-span-1 lg:col-span-5 flex flex-col justify-end space-y-8 pb-1 items-start">
          
          {/* Logo container placed right at the top of the Left column, above main title */}
          <motion.div
            className="mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <LogoWrapper activeColor={activeColor} />
          </motion.div>

          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white font-display leading-[1.1] max-w-lg uppercase">
              Creamos{" "}
              <span id="product-stats-badge" className="relative inline-flex items-center px-4 py-1 mx-1 rounded-md bg-neutral-900 border border-white/10 overflow-hidden font-tech">
                <span 
                  className="absolute left-0 top-0 w-1 h-full"
                  style={{ backgroundColor: activeColor }}
                ></span>
                <span className="text-white relative z-10 text-2xl font-black tracking-wide">Ecosistemas</span>
                <span className="absolute right-1 bottom-1 text-[8px] opacity-25 font-mono">SYS_V2</span>
              </span>{" "}
              Digitales de Alto Impacto
            </h2>
          </motion.div>

          {/* Action buttons (Pill shape) */}
          <motion.div 
            className="flex flex-wrap gap-4 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a 
              id="start-flow-btn"
              href="https://wa.me/5493517616857"
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-8 py-3.5 rounded-full overflow-hidden text-xs uppercase font-mono tracking-widest font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer inline-flex items-center space-x-2"
              style={{
                background: `linear-gradient(135deg, ${activeColor}, #111)`,
                boxShadow: `0 4px 15px -3px ${activeColor}40`
              }}
            >
              <span>Iniciar Flow</span>
              <ArrowRight size={14} className="ml-1" />
            </a>
          </motion.div>
        </div>

        {/* Empty spacing for center visual */}
        <div className="hidden lg:block col-span-3 h-20"></div>

        {/* Right Column: Mini description */}
        <div className="col-span-1 lg:col-span-4 flex flex-col justify-end space-y-6 pb-1">
          
          {/* Subtle details header text */}
          <motion.div 
            className="bg-neutral-950/40 backdrop-blur-md border border-white/5 rounded-2xl p-5 space-y-2 relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Grid graphic accent on top corner */}
            <div className="absolute top-2 right-2 text-[8px] font-mono text-neutral-600">SYS_V2.19</div>
            <p className="text-xs text-neutral-300 leading-relaxed font-sans font-normal">
              <span className="block mb-3">
                Diseñamos programas de formación práctica para transformar equipos de trabajo en fuerzas altamente eficientes. Entregamos un plan de acción directo y sin rodeos para que implementes la IA de forma inmediata en la toma de decisiones.
              </span>
              <span className="block">
                Reescribimos las reglas de tu negocio integrando activos digitales a medida. Fusionamos analítica de datos, creación de contenido con narrativa visual y optimización de conversiones para multiplicar el crecimiento real de tu marca.
              </span>
            </p>
          </motion.div>
        </div>

      </div>

      {/* 4. Bottom Contact Banner (stretching full width below the main grid) */}
      <motion.div 
        id="hero-contact-card"
        className="cyber-glass-glow rounded-3xl p-6 relative select-none glow-red w-full max-w-7xl mx-auto mt-10 z-30"
        style={{ 
          borderColor: `${activeColor}20`,
          boxShadow: `0 8px 32px 0 ${activeColor}0a`
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-left w-full md:w-auto">
            <div>
              <h3 className="text-sm font-semibold font-display text-white tracking-wide">Contactar por email</h3>
              <p className="text-[11px] text-neutral-400 font-mono mt-1">Ingresa tu correo para conectarnos al instante.</p>
            </div>

            {/* Micro circular channel indicators */}
            <div className="flex space-x-2.5 justify-center md:justify-start">
              <a 
                id="contact-channel-instagram"
                href="https://instagram.com/avanzayacba/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 hover:bg-white/5 transition-all cursor-pointer text-neutral-400 hover:text-white"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                }}
              >
                <Instagram size={13} />
              </a>
              <a 
                id="contact-channel-linkedin"
                href="https://www.linkedin.com/in/lucas-avenente-06a18211/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 hover:bg-white/5 transition-all cursor-pointer text-neutral-400 hover:text-white"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                }}
              >
                <Linkedin size={13} />
              </a>
            </div>
          </div>

          {/* Email form input slider */}
          <div className="w-full md:max-w-md shrink-0">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit}
                  className="relative flex items-center bg-neutral-950 rounded-full border border-white/10 p-1 w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <input 
                    id="contact-email-input"
                    type="email" 
                    placeholder="tu@correo.com" 
                    className="bg-transparent text-xs text-white placeholder-neutral-500 px-4 py-2 w-full focus:outline-none font-mono"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button 
                    id="contact-submit-btn"
                    type="submit"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-950 hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
                    style={{ backgroundColor: activeColor, color: "#000" }}
                  >
                    <Send size={12} />
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="thanks"
                  className="flex items-center space-x-2 text-xs font-mono text-emerald-400 py-2.5 px-3 bg-emerald-500/10 rounded-xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CheckCircle2 size={15} className="shrink-0" />
                  <span>¡Éxito! Abriendo tu correo para conectar...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
