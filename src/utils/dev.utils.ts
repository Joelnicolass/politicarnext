export const isDev = () => {
  if (typeof window === "undefined") return;

  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("dev") === "true";
};

export const logger = (message: string | object) => {
  if (!message) return;
  if (!isDev()) return;

  console.log("=== DEV LOG ===");
  if (typeof message === "object") message = JSON.stringify(message, null, 2);

  console.log(message);
  console.log("================");
};

export const getTitle = () => {
  if (typeof window === "undefined") return "";

  const URL_EL_AJUSTE = "elajuste.com.ar";
  const URL_CHORIPLAN = "choriplan.com.ar";

  const host = window.location.host;

  if (host.includes(URL_CHORIPLAN)) {
    return "CHORIPLAN";
  }

  if (host.includes(URL_EL_AJUSTE)) {
    return "EL AJUSTE";
  }

  return "EL AJUSTE";
};
