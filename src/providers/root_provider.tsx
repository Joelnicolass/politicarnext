"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { SoundProvider } from "./sound_provider";

type Props = {
  children?: React.ReactNode;
};

const RootProvider = ({ children }: Props) => {
  return (
    <SoundProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </SoundProvider>
  );
};

export default RootProvider;
