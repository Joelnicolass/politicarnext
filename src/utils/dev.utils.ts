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
  let EXPERIMENTAL = false;

  if (typeof window === "undefined") return "EL AJUSTE";

  const URL_EL_AJUSTE = "elajuste.com.ar";
  const URL_CHORIPLAN = "choriplan.com.ar";

  const host = window.location.host;

  if (host.includes("experimental")) {
    EXPERIMENTAL = true;
  }

  if (host.includes(URL_CHORIPLAN)) {
    return "CHORIPLAN" + (EXPERIMENTAL ? " EXPERIMENTAL" : "");
  }

  if (host.includes(URL_EL_AJUSTE)) {
    return "EL AJUSTE" + (EXPERIMENTAL ? " EXPERIMENTAL" : "");
  }

  return "EL AJUSTE" + (EXPERIMENTAL ? " EXPERIMENTAL" : "");
};
