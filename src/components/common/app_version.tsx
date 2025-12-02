import { APP_NAME, VERSION } from "@/utils/constants";

export const AppVersion = () => {
  return (
    <div className="absolute bottom-1 sm:bottom-2 text-[8px] sm:text-[10px] text-stone-600 font-mono opacity-50 pointer-events-none">
      {`© 2026 ${APP_NAME}. Todos los derechos reservados. v${VERSION}`}
    </div>
  );
};
