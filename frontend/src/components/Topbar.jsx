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
  const { preferences } = usePreferences();

  const filteredNotifications = notifications.filter(
    (n) => {
      const prefKey = typeToPrefKey[n.type];
      return preferences[prefKey] !== false;
    }
  );

  return (
    <header className={`h-16 bg-[var(--bg-secondary)] backdrop-blur-md border-b border-[var(--border-color)] flex items-center justify-between px-6 fixed top-0 right-0 z-30 transition-all duration-200 ${isSidebarCompact ? "left-20" : "left-64"}`}>
      <h1 className="text-xl font-bold text-[var(--text-primary)]">{title}</h1>
      
      <div className="flex items-center gap-4 relative">
        {/* Notification Bell */}
        <button
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className="w-10 h-10 rounded-xl bg-[var(--bg-tertiary)]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all flex items-center justify-center relative"
        >
          🔔
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
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
            <div className="absolute top-14 right-0 w-80 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
              <div className="p-4 border-b border-[var(--border-color)] flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">Notificações</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={() => markAllAsRead()}
                    className="text-sm text-blue-500 hover:text-blue-400 transition-all"
                  >
                    Marcar todas como lidas
                  </button>
                )}
              </div>
              
              <div className="p-2">
                {filteredNotifications.length === 0 ? (
                  <div className="p-6 text-center text-[var(--text-muted)]">
                    <p>Não há notificações</p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className={`p-4 rounded-lg mb-2 cursor-pointer transition-all ${
                        notification.read ? "bg-transparent" : "bg-blue-500/10"
                      } hover:bg-[var(--bg-tertiary)]`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-sm font-semibold text-[var(--text-primary)]">{notification.title}</h4>
                        <span className="text-xs text-[var(--text-muted)]">
                          {new Date(notification.createdAt).toLocaleString("pt-BR")}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)]">{notification.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        <button className="w-10 h-10 rounded-xl bg-[var(--bg-tertiary)]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all flex items-center justify-center">
          ⚙️
        </button>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
        >
          <span>🚪</span>
          <span className="text-sm font-medium">Sair</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;