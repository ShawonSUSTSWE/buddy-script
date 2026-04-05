import { showError } from "./ToastUtils";

export const apiClient = async (url, options = {}) => {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await res.json();

  console.log({ data });

  if (!res.ok) {
    const message = data.message || "An unexpected error occurred";
    showError(message);
    throw new Error(message);
  }

  return data.result;
};
