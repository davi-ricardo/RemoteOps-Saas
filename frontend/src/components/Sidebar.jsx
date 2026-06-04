import {
  LayoutDashboard,
  Monitor,
  FolderTree,
  ChartColumn,
  Tags,
  Users,
  Settings,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Laptop
} from "lucide-react" 

import { usePreferences } from '../contexts/PreferencesContext';

const Sidebar = ({ activeTab, setActiveTab, currentUser, isCompact }) => {
  const { preferences, savePreferences } = usePreferences();

  const toggleTheme = () => {
    const newTheme = preferences.theme === "light" ? "dark" : "light";
    savePreferences({ theme: newTheme });
  };

  const toggleSidebar = () => {
    const newSidebar = preferences.sidebar === "compact" ? "expanded" : "compact";
    savePreferences({ sidebar: newSidebar });
  };
  
  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'devices', label: 'Dispositivos', icon: Monitor },
    { id: 'groups', label: 'Grupos', icon: FolderTree },
    { id: 'reports', label: 'Relatórios', icon: ChartColumn },
    ...(currentUser?.role === 'admin' ? [
      { id: 'service-categories', label: 'Tipos de Serviço', icon: Tags },
      { id: 'users', label: 'Usuários', icon: Users }
    ] : []),
    { id: 'settings', label: 'Configurações', icon: Settings }
  ];

  // Verifica se o tema atual é claro (considerando system preference)
  const isLightTheme = () => {
    if (preferences.theme === "light") return true;
    if (preferences.theme === "system") {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    }
    return false;
  };

  return (
    <div className={`${isCompact ? "w-20" : "w-64"} h-screen bg-sidebar-background backdrop-blur-md border-r border-border flex flex-col fixed left-0 top-0 z-40 transition-all duration-300`}>
      {/* Logo */}
      <div className={`p-6 border-b border-border flex items-center justify-between ${isCompact ? "justify-center" : "gap-3"}`}>
        <div className={`flex items-center ${isCompact ? "justify-center" : "gap-3"}`}>
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
        {/* Toggle de Tema (comentado para caso queira retornar depois)*/}
        {/*<button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-lg bg-surface hover:bg-surface-hover text-text-secondary hover:text-text transition-all duration-300 flex items-center justify-center text-sm"
          title={isLightTheme() ? "Mudar para tema escuro" : "Mudar para tema claro"}
        >
          {isLightTheme() 
            ? <Moon size={18}/>
            : <Sun size={18}/>
          }
        </button>*/}
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
            <item.icon size={20} />
            {!isCompact && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      
      {/* Toggle de Sidebar */}
      <div className="px-4 pb-4 border-t border-border pt-4">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center gap-2 text-text-secondary hover:text-text transition-colors"
        >
          {isCompact
            ? <ChevronRight size={16} />
            : <ChevronLeft size={16} />
          }
          {!isCompact && (
            <span className="text-sm">Recolher menu</span>
          )}
        </button>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div
          className={`flex items-center ${
            isCompact ? "justify-center" : "gap-3"
          } p-3 bg-sidebar-surface rounded-xl`}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center font-bold text-white">
            {currentUser?.username?.[0]?.toUpperCase() || "U"}
          </div>
          {!isCompact && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text truncate">
                {currentUser?.username || "Usuário"}
              </p>
              <p className="text-xs text-text-muted capitalize">
                {currentUser?.role || "user"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;