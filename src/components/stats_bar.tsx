"use client";

import {
  LucideIcon,
  Briefcase,
  Megaphone,
  DollarSign,
  Shield,
  Users,
  Tv,
  Coins,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useMemo } from "react";
import { StatusEffect } from "@/types";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";

export const StatBar = ({
  value,
  diff = 0,
  icon,
  color,
  activeEffects,
  name,
  showAffects = true,
}: {
  value: number;
  diff?: number;
  icon: string;
  color: string;
  activeEffects: StatusEffect[];
  name: string;
  showAffects?: boolean;
}) => {
  const IconCmp = useMemo(() => {
    const map: Record<string, LucideIcon> = {
      briefcase: Briefcase,
      megaphone: Megaphone,
      "dollar-sign": DollarSign,
      shield: Shield,
      users: Users,
      tv: Tv,
      coins: Coins,
    };
    return map[icon] || Coins;
  }, [icon]);

  const showIndicator = diff !== 0;
  const indicatorColor = diff > 0 ? "bg-green-500" : "bg-red-600";
  const indicatorSize = showIndicator
    ? "scale-100 opacity-100"
    : "scale-0 opacity-0";

  return (
    <Tooltip>
      <TooltipTrigger className="w-full flex">
        <div className="flex flex-col w-full mb-1">
          <div className="flex items-center gap-1.5 sm:gap-2 relative">
            <div
              className={`w-4 sm:w-6 flex justify-center ${color} relative shrink-0`}
            >
              <IconCmp size={14} className="sm:w-4 sm:h-4" />

              {/* Diff Indicator */}
              {showAffects && (
                <div
                  className={`absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-black shadow-sm transition-all duration-200 ${indicatorColor} ${indicatorSize}`}
                ></div>
              )}
            </div>
            <div className="relative bg-[#2a2a2a] h-5 sm:h-5 w-full border border-[#5a5a5a] overflow-hidden">
              <div className="absolute -top-0.5 bottom-0 w-0.5 bg-white left-1/2 opacity-20 z-10" />

              <div
                className={`h-full transition-all ease-linear duration-200 ${
                  value < 20
                    ? "bg-red-600 animate-pulse"
                    : value > 80
                    ? "bg-amber-500"
                    : "bg-stone-500"
                }`}
                style={{ width: `${value}%` }}
              />

              {/* Stat Name in the center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[9px] sm:text-[10px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] tracking-wider uppercase">
                  {name}
                </span>
              </div>
            </div>
          </div>
          {activeEffects.length > 0 && (
            <div className="flex gap-1 ml-5 sm:ml-8 mt-1 flex-wrap">
              {activeEffects.map((ef, idx) => (
                <div
                  key={idx}
                  className={`text-[8px] sm:text-[9px] px-1 rounded flex items-center gap-0.5 sm:gap-1 border ${
                    ef.val > 0
                      ? "border-green-800 bg-green-900/50 text-green-300"
                      : "border-red-800 bg-red-900/50 text-red-300"
                  }`}
                >
                  {ef.val > 0 ? (
                    <TrendingUp size={8} />
                  ) : (
                    <TrendingDown size={8} />
                  )}{" "}
                  {ef.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent className="bg-stone-800 text-stone-200 text-xs sm:text-lg p-1 rounded">
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
};
