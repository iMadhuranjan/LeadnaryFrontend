"use client";
import { createContext, useContext, useState, useCallback } from "react";
import Toast from "./Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((type, message) => {
    setToast({ type, message });
  }, []);

  const toastApi = {
    success: (msg) => showToast("success", msg),
    error: (msg) => showToast("error", msg),
    warning: (msg) => showToast("warning", msg),
    info: (msg) => showToast("info", msg),
  };

  return (
    <ToastContext.Provider value={toastApi}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
