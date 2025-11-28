"use client";

import { TooltipProvider } from "@/components/ui/tooltip";

type Props = {
  children?: React.ReactNode;
};

const RootProvider = ({ children }: Props) => {
  return (
    <>
      <TooltipProvider>{children}</TooltipProvider>
    </>
  );
};

export default RootProvider;
