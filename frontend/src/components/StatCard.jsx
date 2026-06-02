const StatCard = ({ icon, label, value, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-500/20 to-cyan-500/20 hover:shadow-glow-blue',
    green: 'from-green-500/20 to-emerald-500/20 hover:shadow-glow-blue',
    purple: 'from-purple-500/20 to-pink-500/20 hover:shadow-glow-blue',
    orange: 'from-orange-500/20 to-yellow-500/20 hover:shadow-glow-blue'
  };

  const iconBgClasses = {
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    purple: 'bg-purple-500/20 text-purple-400',
    orange: 'bg-orange-500/20 text-orange-400'
  };

  return (
    <div className={`p-6 rounded-2xl bg-gradient-to-br ${colorClasses[color]} border border-slate-800/50 transition-all duration-300 hover:scale-[1.02]`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${iconBgClasses[color]} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
      <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
      <p className="text-slate-400 text-sm">{label}</p>
    </div>
  );
};

export default StatCard;
