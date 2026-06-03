const StatCard = ({ icon, label, value, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-500/20 to-cyan-500/20',
    green: 'from-green-500/20 to-emerald-500/20',
    purple: 'from-purple-500/20 to-pink-500/20',
    orange: 'from-orange-500/20 to-yellow-500/20'
  };

  const iconBgClasses = {
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    purple: 'bg-purple-500/20 text-purple-400',
    orange: 'bg-orange-500/20 text-orange-400'
  };

  return (
    <div className={`p-6 rounded-2xl bg-gradient-to-br ${colorClasses[color]} border border-[var(--border-color)] transition-all duration-300 hover:scale-[1.02]`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${iconBgClasses[color]} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
      <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-1">{value}</h3>
      <p className="text-[var(--text-secondary)] text-sm">{label}</p>
    </div>
  );
};

export default StatCard;
