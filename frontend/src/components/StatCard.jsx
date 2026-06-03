import { usePreferences } from '../contexts/PreferencesContext';

const StatCard = ({ icon, label, value, color = 'blue' }) => {
  const { preferences } = usePreferences();
  const isLight = preferences.theme === 'light' || (preferences.theme === 'system' && !window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const colorClassesDark = {
    blue: 'from-blue-500/20 to-cyan-500/20',
    green: 'from-green-500/20 to-emerald-500/20',
    purple: 'from-purple-500/20 to-pink-500/20',
    orange: 'from-orange-500/20 to-yellow-500/20'
  };

  const colorClassesLight = {
    blue: 'from-blue-50 to-cyan-50',
    green: 'from-green-50 to-emerald-50',
    purple: 'from-purple-50 to-pink-50',
    orange: 'from-orange-50 to-yellow-50'
  };

  const iconBgClassesDark = {
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    purple: 'bg-purple-500/20 text-purple-400',
    orange: 'bg-orange-500/20 text-orange-400'
  };

  const iconBgClassesLight = {
    blue: 'bg-blue-500/15 text-blue-600',
    green: 'bg-green-500/15 text-green-600',
    purple: 'bg-purple-500/15 text-purple-600',
    orange: 'bg-orange-500/15 text-orange-600'
  };

  const colorClasses = isLight ? colorClassesLight : colorClassesDark;
  const iconBgClasses = isLight ? iconBgClassesLight : iconBgClassesDark;

  return (
    <div className={`p-6 rounded-2xl bg-gradient-to-br ${colorClasses[color]} border border-[var(--border-color)] transition-all duration-300 hover:scale-[1.02] ${isLight ? 'shadow-md shadow-slate-200' : ''}`}>
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
