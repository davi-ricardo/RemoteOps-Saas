import { usePreferences } from '../contexts/PreferencesContext';

const Sidebar = ({ activeTab, setActiveTab, currentUser, isCompact }) => {
  const { preferences, savePreferences } = usePreferences();

  const toggleSidebar = () => {
    const newSidebar = preferences.sidebar === "compact" ? "expanded" : "compact";
    savePreferences({ sidebar: newSidebar });
  };
  
  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: '🏠' },
    { id: 'devices', label: 'Dispositivos', icon: '🖥️' },
    { id: 'groups', label: 'Grupos', icon: '🗂️' },
    { id: 'reports', label: 'Relatórios', icon: '📊' },
    ...(currentUser?.role === 'admin' ? [
      { id: 'service-categories', label: 'Tipos de Serviço', icon: '🏷️' },
      { id: 'users', label: 'Usuários', icon: '👥' }
    ] : []),
    { id: 'settings', label: 'Configurações', icon: '⚙️' }
  ];

  return (
    <div className={`${isCompact ? "w-20" : "w-64"} h-screen bg-sidebar-background backdrop-blur-md border-r border-border flex flex-col fixed left-0 top-0 z-40 transition-all duration-300`}>
      {/* Logo */}
      <div className={`p-6 border-b border-border flex items-center ${isCompact ? "justify-center" : "gap-3"}`}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-info flex items-center justify-center text-xl">
          🖥️
        </div>
        {!isCompact && (
          <div>
            <h2 className="text-xl font-bold text-text">RemoteOps</h2>
            <p className="text-xs text-text-muted">Enterprise Panel</p>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center ${isCompact ? "justify-center" : "gap-3"} px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-blue-900/30 text-blue-400 shadow-[0_0_40px_rgba(59,130,246,0.7)] border border-blue-500/40'
                : 'text-sidebar-text hover:text-text hover:bg-sidebar-surface'
            }`}
            title={isCompact ? item.label : undefined}
          >
            <span className="text-xl">{item.icon}</span>
            {!isCompact && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>
      
      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className={`flex items-center ${isCompact ? "justify-center" : "gap-3"} p-3 bg-sidebar-surface rounded-xl`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center font-bold text-white">
            {currentUser?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          {!isCompact && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text truncate">
                {currentUser?.username || 'Usuário'}
              </p>
              <p className="text-xs text-text-muted capitalize">
                {currentUser?.role || 'user'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Toggle de Sidebar */}
      <button
        onClick={toggleSidebar}
        className="absolute right-0 bottom-20 w-4 h-8 bg-sidebar-background border-t border-b border-r border-border rounded-r-lg flex items-center justify-center text-xs text-text-secondary hover:text-text hover:bg-sidebar-surface transition-all duration-300 z-50"
        title={isCompact ? "Expandir menu" : "Recolher menu"}
      >
        {isCompact ? "››" : "‹‹"}
      </button>
    </div>
  );
};

export default Sidebar;
