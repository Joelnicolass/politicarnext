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
