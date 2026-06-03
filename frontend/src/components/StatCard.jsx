const StatCard = ({ icon, label, value, color = 'blue' }) => {
  // Gradientes originais do Dashboard
  const colorGradients = {
    blue: 'from-blue-900/80 to-cyan-900/40',
    green: 'from-green-900/80 to-emerald-900/40',
    purple: 'from-purple-900/80 to-pink-900/40',
    orange: 'from-orange-900/80 to-yellow-900/40'
  };

  const iconBgColors = {
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    purple: 'bg-purple-500/20 text-purple-400',
    orange: 'bg-orange-500/20 text-orange-400'
  };

  return (
    <div className={`p-6 rounded-2xl bg-gradient-to-br ${colorGradients[color]} border border-slate-700/50 transition-all duration-300 hover:scale-[1.02]`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${iconBgColors[color]} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
      <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
      <p className="text-slate-400 text-sm">{label}</p>
    </div>
  );
};

export default StatCard;
