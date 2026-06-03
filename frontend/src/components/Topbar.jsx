import { useNotifications } from "../contexts/NotificationsContext";
import { usePreferences } from "../contexts/PreferencesContext";

// Mapeia tipo de notificação para chave de preferência (mesmo que no NotificationsContext)
const typeToPrefKey = {
  new_report: "notifNewReport",
  system_update: "notifSystemUpdates",
  admin_alert: "notifAdminAlerts",
  permission_change: "notifPermissionChanges"
};

const Topbar = ({ title, onLogout, isSidebarCompact }) => {
  const {
    notifications,
    unreadCount,
    isPanelOpen,
    setIsPanelOpen,
    markAsRead,
    markAllAsRead,
  } = useNotifications();
  const { preferences, savePreferences } = usePreferences();

  const toggleTheme = () => {
    const newTheme = preferences.theme === "light" ? "dark" : "light";
    savePreferences({ theme: newTheme });
  };

  // Verifica se o tema atual é claro (considerando system preference)
  const isLightTheme = () => {
    if (preferences.theme === "light") return true;
    if (preferences.theme === "system") {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    }
    return false;
  };

  const filteredNotifications = notifications.filter(
    (n) => {
      const prefKey = typeToPrefKey[n.type];
      return preferences[prefKey] !== false;
    }
  );

  return (
    <header className={`h-16 bg-topbar-background backdrop-blur-md border-b border-topbar-border flex items-center justify-between px-6 fixed top-0 right-0 z-30 transition-all duration-200 ${isSidebarCompact ? "left-20" : "left-64"}`}>
      <h1 className="text-xl font-bold text-text">{title}</h1>
      
      <div className="flex items-center gap-4 relative">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-xl bg-surface/50 text-text-secondary hover:text-text hover:bg-surface transition-all flex items-center justify-center"
          title={isLightTheme() ? "Mudar para tema escuro" : "Mudar para tema claro"}
        >
          {isLightTheme() ? "🌞" : "🌙"}
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className="w-10 h-10 rounded-xl bg-surface/50 text-text-secondary hover:text-text hover:bg-surface transition-all flex items-center justify-center relative"
        >
          🔔
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger text-white text-xs font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Notifications Panel */}
        {isPanelOpen && (
          <>
            {/* Overlay to close panel when clicking outside */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsPanelOpen(false)}
            />
            <div className="absolute top-14 right-0 w-80 bg-background-secondary border border-border rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
              <div className="p-4 border-b border-border flex justify-between items-center">
                <h3 className="text-lg font-semibold text-text">Notificações</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={() => markAllAsRead()}
                    className="text-sm text-primary hover:text-primary-hover transition-all"
                  >
                    Marcar todas como lidas
                  </button>
                )}
              </div>
              
              <div className="p-2">
                {filteredNotifications.length === 0 ? (
                  <div className="p-6 text-center text-text-muted">
                    <p>Não há notificações</p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className={`p-4 rounded-lg mb-2 cursor-pointer transition-all ${
                        notification.read ? "bg-transparent" : "bg-primary/10"
                      } hover:bg-surface`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-sm font-semibold text-text">{notification.title}</h4>
                        <span className="text-xs text-text-muted">
                          {new Date(notification.createdAt).toLocaleString("pt-BR")}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary">{notification.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        <button className="w-10 h-10 rounded-xl bg-surface/50 text-text-secondary hover:text-text hover:bg-surface transition-all flex items-center justify-center">
          ⚙️
        </button>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-danger/10 text-danger hover:bg-danger/20 transition-all"
        >
          <span>🚪</span>
          <span className="text-sm font-medium">Sair</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;