import { usePreferences } from '../contexts/PreferencesContext';

const Sidebar = ({ activeTab, setActiveTab, currentUser, isCompact }) => {
  const { preferences } = usePreferences();
  const isLight = preferences.theme === 'light' || (preferences.theme === 'system' && !window.matchMedia('(prefers-color-scheme: dark)').matches);
  
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
    <div className={`${isCompact ? "w-20" : "w-64"} h-screen bg-[var(--bg-secondary)] backdrop-blur-md border-r border-[var(--border-color)] flex flex-col fixed left-0 top-0 z-40 transition-all duration-200`}>
      {/* Logo */}
      <div className={`p-6 border-b border-[var(--border-color)] flex items-center ${isCompact ? "justify-center" : "gap-3"}`}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl">
          🖥️
        </div>
        {!isCompact && (
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">RemoteOps</h2>
            <p className="text-xs text-[var(--text-muted)]">Enterprise Panel</p>
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
                ? (isLight 
                  ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 text-blue-600 shadow-lg shadow-blue-500/10' 
                  : 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 text-blue-400 shadow-glow-blue')
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]/50'
            }`}
            title={isCompact ? item.label : undefined}
          >
            <span className="text-xl">{item.icon}</span>
            {!isCompact && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>
      
      {/* User Profile */}
      <div className="p-4 border-t border-[var(--border-color)]">
        <div className={`flex items-center ${isCompact ? "justify-center" : "gap-3"} p-3 bg-[var(--bg-tertiary)]/30 rounded-xl`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-white">
            {currentUser?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          {!isCompact && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                {currentUser?.username || 'Usuário'}
              </p>
              <p className="text-xs text-[var(--text-muted)] capitalize">
                {currentUser?.role || 'user'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
