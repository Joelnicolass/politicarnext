"use client";

import Version from "@/components/Version";
import { APP_NAME } from "@/utils/constants";
import { motion } from "framer-motion";
import { Play, Trophy, Info } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MenuScreen() {
  const router = useRouter();

  const menuButtons = [
    {
      id: "play",
      label: "Jugar",
      icon: Play,
      color: "bg-red-800 hover:bg-red-700",
      action: () => router.push("/deck-selection"),
    },
    {
      id: "achievements",
      label: "Logros",
      icon: Trophy,
      color: "bg-amber-800 hover:bg-amber-700",
      action: () => console.log("Próximamente..."),
      disabled: true,
    },
    {
      id: "creator",
      label: "Creador de Decks",
      icon: undefined,
      color: "bg-yellow-600 hover:bg-yellow-500",
      action: () => console.log("Próximamente..."),
      disabled: true,
    },
    {
      id: "info",
      label: "Créditos",
      icon: Info,
      color: "bg-stone-700 hover:bg-stone-600",
      action: () => console.log("Próximamente..."),
    },
  ];

  return (
    <div className="crt h-dvh w-full flex flex-col items-center justify-center p-2 sm:p-4 relative font-tech select-none bg-[#1a1815] text-[#dcdcdc] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6 sm:mb-12 px-2"
      >
        <h1 className="font-propaganda text-4xl sm:text-6xl md:text-8xl text-red-600 tracking-tighter mb-2 sm:mb-4 drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]">
          {APP_NAME}
        </h1>
        <p className="font-typewriter text-stone-400 text-xs sm:text-sm md:text-base">
          Un simulador de política argentina
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full max-w-sm px-4 space-y-3 sm:space-y-4"
      >
        {menuButtons.map((button, index) => (
          <motion.button
            key={button.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            onClick={button.action}
            className={`w-full ${
              button.color
            } text-white p-3 sm:p-4 rounded border-2 border-stone-900 font-propaganda text-lg sm:text-xl transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl active:scale-95
            ${
              button.disabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:scale-105"
            }`}
            disabled={button.disabled}
          >
            {button.icon && <button.icon size={20} className="sm:w-6 sm:h-6" />}
            {button.label}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-2 sm:bottom-4 text-[8px] sm:text-[10px] text-stone-600 font-mono opacity-50"
      >
        <Version />
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Share+Tech+Mono&family=Special+Elite&display=swap');
        .font-propaganda { font-family: 'Black Ops One', cursive; }
        .font-typewriter { font-family: 'Special Elite', cursive; }
        .font-tech { font-family: 'Share Tech Mono', monospace; }
        .crt::before { content: " "; display: block; position: absolute; top: 0; left: 0; bottom: 0; right: 0; background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06)); z-index: 50; background-size: 100% 2px, 3px 100%; pointer-events: none; }
      `}</style>
    </div>
  );
}
