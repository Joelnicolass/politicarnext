import { isMobileDevice } from "@/lib/utils";
import { useEffect, useState } from "react";

// Hook to detect mobile and update on resize
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(isMobileDevice());

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
