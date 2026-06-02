const Sidebar = ({ activeTab, setActiveTab, currentUser }) => {
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
    <div className="w-64 h-screen bg-slate-900/80 backdrop-blur-md border-r border-slate-800/50 flex flex-col fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl">
            🖥️
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">RemoteOps</h2>
            <p className="text-xs text-slate-500">Enterprise Panel</p>
          </div>
        </div>
      </div>
      
      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 text-blue-400 shadow-glow-blue'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      
      {/* User Profile */}
      <div className="p-4 border-t border-slate-800/50">
        <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-white">
            {currentUser?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {currentUser?.username || 'Usuário'}
            </p>
            <p className="text-xs text-slate-500 capitalize">
              {currentUser?.role || 'user'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
