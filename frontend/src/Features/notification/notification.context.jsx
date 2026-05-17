import React, { createContext, useCallback, useContext, useRef, useState } from "react";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const timeoutRef = useRef(null);

  const showNotification = useCallback(({ message, type = "success" }) => {
    if (!message) return;

    setNotification({ message, type });
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setNotification(null);
    }, 3200);
  }, []);

  const hideNotification = useCallback(() => {
    window.clearTimeout(timeoutRef.current);
    setNotification(null);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      {notification && (
        <div className={`toast toast--${notification.type}`} role="status" aria-live="polite">
          <span className="toast__dot" />
          <p>{notification.message}</p>
          <button type="button" aria-label="Close notification" onClick={hideNotification}>
            x
          </button>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used inside NotificationProvider");
  }

  return context;
};
