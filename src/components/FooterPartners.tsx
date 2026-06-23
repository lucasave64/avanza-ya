import { motion } from "motion/react";
import { Github, Figma, Codepen, Terminal, Server, ShieldCheck } from "lucide-react";

interface FooterPartnersProps {
  colorTheme: string;
}

export default function FooterPartners({ colorTheme }: FooterPartnersProps) {
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

  const brandPartners = [
    { id: "github", icon: <Github size={20} />, label: "GitHub Core Integrator", desc: "Decentralized pipelines" },
    { id: "figma", icon: <Figma size={20} />, label: "Figma Design Partner", desc: "Collaborative mockups" },
    { id: "archin", text: "archin", label: "Archin Architecture", desc: "System engineering" },
    { id: "codepen", icon: <Codepen size={20} />, label: "CodePen Labs", desc: "Creative playgrounds" },
    { id: "terminal", icon: <Terminal size={20} />, text: "K-Force", label: "K-Force Terminals", desc: "High octane telemetry" },
    { id: "server", icon: <Server size={18} />, text: "D-Edge", label: "D-Edge Cloud Services", desc: "Low latency containers" },
  ];

  return (
    <section className="relative w-full max-w-4xl mx-auto px-6 md:px-12 py-20 z-30 select-none">
      <div className="flex flex-col items-center text-center space-y-8">
        
        {/* Experience Title Info */}
        <motion.div 
          id="experience-content-block"
          className="space-y-4 flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
            <ShieldCheck size={14} style={{ color: activeColor }} />
            <span>Trayectoria Comprobada en la Industria</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white font-display uppercase leading-tight">
            <motion.span 
              className="font-tech inline-block cursor-default select-none"
              style={{
                color: activeColor,
                textShadow: `0 0 25px ${activeColor}40`,
              }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              Desde Córdoba
            </motion.span>
          </h2>

          <p className="text-xs sm:text-sm font-mono text-neutral-500 uppercase tracking-widest">
            Acompañando y potenciando a las marcas líderes globales.
          </p>
        </motion.div>

        <p className="text-sm text-neutral-400 font-sans leading-relaxed max-w-xl border-t border-white/10 pt-6" style={{ borderTopColor: `${activeColor}20` }}>
          Durante más de una década, nuestra misión ha sido inquebrantable. Fusionamos la supremacía técnica con la poesía del diseño para crear experiencias digitales inolvidables que marcan un estándar de excelencia.
        </p>
      </div>
    </section>
  );
}
