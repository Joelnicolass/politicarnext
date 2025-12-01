"use client";

import { useTypewriter } from "@/hooks";

type Props = {
  name: string;
};

export const AppName = ({ name }: Props) => {
  const { displayedText } = useTypewriter(name, 150);

  return (
    <h1 className="font-propaganda text-4xl sm:text-6xl md:text-8xl text-red-600 tracking-tighter mb-2 sm:mb-4 drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]">
      {displayedText}
    </h1>
  );
};

export default AppName;
