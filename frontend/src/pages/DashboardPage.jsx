import StatCard from '../components/StatCard';
import { usePreferences } from '../contexts/PreferencesContext';

const DashboardPage = ({ devices, users, todayConnections }) => {
  const { preferences } = usePreferences();
  const onlineDevices = devices.filter(d => d.is_online).length;

  // Verifica se o tema atual é claro
  const isLightTheme = () => {
    if (preferences.theme === "light") return true;
    if (preferences.theme === "system") {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    }
    return false;
  };

  const light = isLightTheme();
  
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon="🖥️"
          label="Dispositivos"
          value={devices.length}
          color="blue"
        />
        <StatCard
          icon="🟢"
          label="Online"
          value={onlineDevices}
          color="green"
        />
        <StatCard
          icon="👥"
          label="Usuários"
          value={users.length}
          color="purple"
        />
        <StatCard
          icon="🔗"
          label="Conexões Hoje"
          value={todayConnections}
          color="orange"
        />
      </div>
      
      {/* Welcome Message */}
      <div className={`p-6 rounded-2xl bg-background-secondary border border-border transition-all duration-300 ${
        light 
          ? 'bg-white shadow-light-card border-l-4 border-l-[#2563eb]' 
          : ''
      }`}>
        <h2 className="text-xl font-bold text-text mb-2">Bem-vindo ao RemoteOps!</h2>
        <p className="text-text-secondary">Gerencie seus dispositivos, usuários e relatórios de forma centralizada.</p>
      </div>
    </div>
  );
};

export default DashboardPage;
