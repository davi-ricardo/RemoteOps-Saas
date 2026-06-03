import StatCard from '../components/StatCard';

const DashboardPage = ({ devices, users, todayConnections }) => {
  const onlineDevices = devices.filter(d => d.is_online).length;
  
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
      <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Bem-vindo ao RemoteOps!</h2>
        <p className="text-[var(--text-secondary)]">Gerencie seus dispositivos, usuários e relatórios de forma centralizada.</p>
      </div>
    </div>
  );
};

export default DashboardPage;
