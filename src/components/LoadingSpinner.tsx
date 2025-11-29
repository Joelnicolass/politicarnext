"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface LoadingSpinnerProps {
  text?: string;
  size?: number;
}

export function LoadingSpinner({
  text = "Cargando...",
  size = 48,
}: LoadingSpinnerProps) {
  return (
    <div className="h-dvh w-full flex items-center justify-center bg-[#1a1815]">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-4"
        >
          <Zap size={size} className="text-red-600" />
        </motion.div>
        <p className="font-tech text-stone-400">{text}</p>
      </div>
    </div>
  );
}
