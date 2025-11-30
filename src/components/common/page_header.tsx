import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  actions?: ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  onBack,
  actions,
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl bg-stone-800 p-3 sm:p-4 border-b-2 sm:border-b-4 border-red-900 shadow-lg mb-4 sm:mb-6"
    >
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={onBack}
          className="bg-stone-700 hover:bg-stone-600 p-1.5 sm:p-2 rounded border border-stone-600 transition-colors shrink-0"
        >
          <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="text-red-600 font-propaganda text-xl sm:text-2xl md:text-3xl tracking-tighter truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[10px] sm:text-xs text-stone-400 font-tech">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex gap-2 shrink-0">{actions}</div>}
      </div>
    </motion.div>
  );
}
