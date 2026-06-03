import { createContext, useContext, useState, useEffect } from "react";
import { usePreferences } from "./PreferencesContext";

const NotificationsContext = createContext();

// Mock notifications for testing
const mockNotifications = [
  { id: 1, type: "new_report", title: "Novo relatório criado", message: "Um novo relatório de conexão foi gerado", read: false, createdAt: new Date() },
  { id: 2, type: "system_update", title: "Atualização do sistema", message: "Nova versão do sistema disponível", read: false, createdAt: new Date(Date.now() - 3600000) },
  { id: 3, type: "admin_alert", title: "Aviso administrativo", message: "Manutenção programada para amanhã", read: true, createdAt: new Date(Date.now() - 86400000) },
];

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { preferences } = usePreferences();

  const unreadCount = notifications.filter((n) => !n.read && preferences[`notif${n.type.charAt(0).toUpperCase() + n.type.slice(1)}`] !== false).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addNotification = (notification) => {
    setNotifications((prev) => [
      { ...notification, id: Date.now(), read: false, createdAt: new Date() },
      ...prev,
    ]);
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        isPanelOpen,
        setIsPanelOpen,
        markAsRead,
        markAllAsRead,
        addNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
};