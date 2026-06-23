import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, X, Monitor, Cpu, Sparkles } from "lucide-react";

// Importing the actual uploaded assets
import videoScreenGrab from "../assets/images/public/Grabación de pantalla desde 2026-06-23 10-22-23.mp4";
import videoPromoIA from "../assets/images/public/Promo cursos IA Avanza ya 2.mp4";
import videoPromoMundia from "../assets/images/public/Promo mundia - La Verdu.mp4";
import videoTerere from "../assets/images/public/Terere listo para usar.mp4";

interface VideoItem {
  id: number;
  title: string;
  desc: string;
  src: string;
  tag: string;
}

export default function VideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [modalMuted, setModalMuted] = useState(false);
  const [modalPlaying, setModalPlaying] = useState(true);
  
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  const videos: VideoItem[] = [
    {
      id: 1,
      tag: "MASTERCLASS",
      title: "IA Generativa Avanza Ya",
      desc: "Capacitaciones premium ideadas para automatizar procesos e impulsar tu dominio comercial.",
      src: videoPromoIA,
    },
    {
      id: 2,
      tag: "DEMOSTRACIÓN",
      title: "Agentes Cognitivos en Acción",
      desc: "Implementación en vivo de flujos inteligentes y respuestas adaptativas personalizadas.",
      src: videoScreenGrab,
    },
    {
      id: 3,
      tag: "ESTRATEGIA",
      title: "Campañas de Alto Impacto",
      desc: "Dominio de canales digitales integrando IA para escalar conversiones sin límites.",
      src: videoPromoMundia,
    },
    {
      id: 4,
      tag: "CASO PRÁCTICO",
      title: "Soluciones de Alto Nivel",
      desc: "Ejemplos prácticos listos para implementar que transforman la incertidumbre en resultados.",
      src: videoTerere,
    }
  ];

  // Automated slow, smooth rotation. Moves and pauses in the center for 3 seconds.
  useEffect(() => {
    if (isPaused || selectedVideo) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 3800); // 3 seconds static pause + ~0.8s transition time

    return () => clearInterval(interval);
  }, [isPaused, selectedVideo, videos.length]);

  // Ensure and sync play state of all carousel inline videos (always muted, plays on loop)
  useEffect(() => {
    videos.forEach((video) => {
      const el = videoRefs.current[video.id];
      if (el) {
        el.muted = true;
        el.playsInline = true;
        
        // Active gets played, background ones can be loaded or played gently
        if (video.id === videos[currentIndex].id) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      }
    });
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const togglePlayPauseModal = () => {
    if (modalVideoRef.current) {
      if (modalPlaying) {
        modalVideoRef.current.pause();
      } else {
        modalVideoRef.current.play().catch(() => {});
      }
      setModalPlaying(!modalPlaying);
    }
  };

  const toggleMuteModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !modalVideoRef.current.muted;
      setModalMuted(modalVideoRef.current.muted);
    }
  };

  return (
    <section 
      id="video-gallery-section"
      className="relative w-full bg-black py-24 select-none overflow-hidden border-y border-neutral-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Abstract Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-yellow-400/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-yellow-400/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-yellow-400/10 border border-yellow-400/20 px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest text-[#facc15] uppercase shadow-[0_0_15px_rgba(234,179,8,0.15)]">
            <Sparkles size={12} className="animate-pulse" />
            <span>Contenido Audiovisual Interactivo</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-display uppercase">
            Avanza Ya <span className="text-[#facc15]" style={{ textShadow: "0 0 15px rgba(234,179,8,0.3)" }}>En Acción</span>
          </h2>
          <p className="text-xs sm:text-sm font-mono text-neutral-400 uppercase tracking-widest">
            Dominio de IA generativa, masterclasses y automatizaciones verificadas.
          </p>
        </div>

        {/* Carousel View Container */}
        <div className="relative w-full flex items-center justify-center min-h-[520px] md:min-h-[580px] lg:min-h-[640px]">
          
          {/* Active Carousel Track */}
          <div className="relative flex items-center justify-center w-full max-w-sm md:max-w-3xl lg:max-w-4xl h-full">
            
            {videos.map((video, idx) => {
              // Calculate positional relations index helper
              const total = videos.length;
              let diff = idx - currentIndex;
              
              // Normalize difference to support circular flow
              if (diff > total / 2) diff -= total;
              if (diff < -total / 2) diff += total;

              const isActive = diff === 0;
              const isPrev = diff === -1 || (currentIndex === 0 && idx === total - 1);
              const isNext = diff === 1 || (currentIndex === total - 1 && idx === 0);
              const isVisible = isActive || isPrev || isNext;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={video.id}
                  className={`absolute w-[210px] sm:w-[250px] md:w-[280px] lg:w-[310px] h-auto aspect-[9/16] cursor-pointer rounded-2xl transition-all duration-[1000ms] ${
                    isActive ? "z-30 pointer-events-auto" : "z-10 opacity-40 hover:opacity-70 pointer-events-none md:pointer-events-auto"
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                  }}
                  animate={{
                    scale: isActive ? 1.08 : 0.82,
                    x: isActive ? 0 : diff * 220 + (diff < 0 ? -20 : 20),
                    rotateY: isActive ? 0 : diff * -18,
                    z: isActive ? 50 : -100,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 75,
                    damping: 22,
                    mass: 0.9
                  }}
                  onClick={() => {
                    if (isActive) {
                      setSelectedVideo(video);
                    } else {
                      setCurrentIndex(idx);
                    }
                  }}
                >
                  {/* Decorative Yellow Glow and Yellow Rounded Borders */}
                  <div 
                    className={`absolute inset-0 rounded-2xl border-3 transition-all duration-[1000ms] overflow-hidden ${
                      isActive 
                        ? "border-[#facc15] shadow-[0_0_35px_rgba(250,204,21,0.55)]" 
                        : "border-yellow-500/25 shadow-[0_0_15px_rgba(250,204,21,0.08)] hover:border-yellow-400/40"
                    }`}
                  >
                    {/* Video Element */}
                    <video
                      ref={(el) => { videoRefs.current[video.id] = el; }}
                      src={video.src}
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover select-none bg-neutral-950 pointer-events-none"
                    />

                    {/* Dark gradient overlay for typography visibility */}
                    <div className="absolute inset-y-0 inset-x-0 bg-gradient-to-t from-black via-black/20 to-black/40 flex flex-col justify-between p-4 sm:p-5 pointer-events-none">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono tracking-widest text-[#facc15] bg-black/60 border border-yellow-400/30 px-2 py-0.5 rounded-full backdrop-blur-sm uppercase font-bold">
                          {video.tag}
                        </span>
                        {isActive && (
                          <motion.div 
                            className="w-7 h-7 rounded-full bg-[#facc15] text-black flex items-center justify-center shadow-[0_0_10px_rgba(250,204,21,0.6)]"
                            animate={{ scale: [1, 1.12, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          >
                            <Play size={11} fill="currentColor" className="ml-0.5" />
                          </motion.div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-sm sm:text-base font-bold font-display uppercase text-white leading-tight">
                          {video.title}
                        </h3>
                        <p className="text-[10px] font-sans text-neutral-400 line-clamp-2 leading-relaxed">
                          {video.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

          </div>

          {/* Left Arrow */}
          <button 
            id="carousel-nav-prev"
            onClick={handlePrev}
            className="absolute left-4 md:left-8 z-40 p-3 rounded-full border border-neutral-800 bg-neutral-950/80 text-white hover:text-[#facc15] hover:border-yellow-400/30 transition-all shadow-lg backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right Arrow */}
          <button 
            id="carousel-nav-next"
            onClick={handleNext}
            className="absolute right-4 md:right-8 z-40 p-3 rounded-full border border-neutral-800 bg-neutral-950/80 text-white hover:text-[#facc15] hover:border-yellow-400/30 transition-all shadow-lg backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dynamic Indicator dots */}
        <div className="flex items-center space-x-3 mt-8">
          {videos.map((_, idx) => (
            <button
              key={idx}
              id={`carousel-dot-${idx}`}
              onClick={() => setCurrentIndex(idx)}
              className="w-8 h-1 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: currentIndex === idx ? "#facc15" : "rgba(255, 255, 255, 0.15)",
                boxShadow: currentIndex === idx ? "0 0 10px #facc15" : "none"
              }}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Video Focus Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Click backdrop to close */}
            <div className="absolute inset-0 z-10 cursor-alias" onClick={() => setSelectedVideo(null)} />

            {/* Modal Box */}
            <motion.div
              className="relative bg-neutral-950 border-2 border-[#facc15] rounded-[24px] overflow-hidden shadow-[0_0_50px_rgba(250,204,21,0.35)] w-full max-w-sm aspect-[9/16] z-20 flex flex-col justify-between"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
            >
              {/* Media Player */}
              <video
                ref={modalVideoRef}
                src={selectedVideo.src}
                className="absolute inset-0 w-full h-full object-cover origin-center select-none"
                autoPlay={modalPlaying}
                loop
                playsInline
                onClick={togglePlayPauseModal}
              />

              {/* Gradient Shading */}
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />

              {/* Top Bar with actions */}
              <div className="relative z-20 flex items-center justify-between p-5">
                <span className="text-[10px] font-mono tracking-widest text-[#facc15] bg-black/70 border border-yellow-400/40 px-3 py-1 rounded-full backdrop-blur-sm uppercase font-bold">
                  {selectedVideo.tag}
                </span>

                <button
                  id="modal-close-btn"
                  onClick={() => setSelectedVideo(null)}
                  className="p-2 rounded-full bg-black/70 border border-white/10 hover:border-yellow-400 text-white hover:text-[#facc15] transition-all cursor-pointer backdrop-blur-sm"
                  aria-label="Cerrar reproductor"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Playback Controls Overlay on focus */}
              <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={togglePlayPauseModal}
                  className="p-5 rounded-full bg-black/60 border border-yellow-400/30 text-white hover:text-[#facc15] hover:scale-110 active:scale-95 transition-all shadow-2xl cursor-pointer"
                >
                  {modalPlaying ? <Pause size={28} /> : <Play size={28} fill="currentColor" className="ml-1" />}
                </button>
              </div>

              {/* Bottom Information and Controls */}
              <div className="relative z-20 p-6 space-y-4">
                <div className="space-y-1.5 text-left">
                  <h3 className="text-lg md:text-xl font-extrabold tracking-tight font-display text-white uppercase leading-none">
                    {selectedVideo.title}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    {selectedVideo.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  {/* Left Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={togglePlayPauseModal}
                      className="text-white hover:text-[#facc15] transition-colors cursor-pointer"
                      aria-label={modalPlaying ? "Pausar" : "Reproducir"}
                    >
                      {modalPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
                    </button>
                    <button
                      onClick={toggleMuteModal}
                      className="text-white hover:text-[#facc15] transition-colors cursor-pointer"
                      aria-label={modalMuted ? "Desactivar silencio" : "Silenciar"}
                    >
                      {modalMuted ? <VolumeX size={18} className="text-yellow-400" /> : <Volume2 size={18} />}
                    </button>
                  </div>

                  {/* Status Indicator Tag */}
                  <div className="flex items-center space-x-1.5 text-[9px] font-mono uppercase text-neutral-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>Reproduciendo</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
