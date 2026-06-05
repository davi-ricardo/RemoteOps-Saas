import { usePreferences } from '../contexts/PreferencesContext';

const StatCard = ({ icon, label, value, color = 'blue' }) => {
  const { preferences } = usePreferences();

  // Verifica se o tema atual é claro
  const isLightTheme = () => {
    if (preferences.theme === "light") return true;
    if (preferences.theme === "system") {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    }
    return false;
  };

  // === TEMA ESCURO ORIGINAL (SEM ALTERAÇÕES) ===
  const darkGradients = {
    blue: 'from-blue-900/80 to-cyan-900/40',
    green: 'from-green-900/80 to-emerald-900/40',
    purple: 'from-purple-900/80 to-pink-900/40',
    orange: 'from-orange-900/80 to-yellow-900/40'
  };

  const darkIconBg = {
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    purple: 'bg-purple-500/20 text-purple-400',
    orange: 'bg-orange-500/20 text-orange-400'
  };

  // === NOVO TEMA CLARO PREMIUM (CARD COLORIDO COMO GLPI) ===
  const lightStyles = {
    blue: { 
      bg: 'bg-[#0ea5e9]', 
      text: 'text-white', 
      icon: 'text-white',
      iconBg: 'bg-white/30'
    },
    green: { 
      bg: 'bg-[#10b981]', 
      text: 'text-white', 
      icon: 'text-white',
      iconBg: 'bg-white/30'
    },
    purple: { 
      bg: 'bg-[#8b5cf6]', 
      text: 'text-white', 
      icon: 'text-white',
      iconBg: 'bg-white/30'
    },
    orange: { 
      bg: 'bg-[#f97316]', 
      text: 'text-white', 
      icon: 'text-white',
      iconBg: 'bg-white/30'
    }
  };

  const currentLight = lightStyles[color];

  if (isLightTheme()) {
    return (
      <div className={`p-6 rounded-2xl ${currentLight.bg} border border-transparent shadow-light-card transition-all duration-300 hover:-translate-y-2 hover:shadow-light-card-hover`}>
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl ${currentLight.iconBg} flex items-center justify-center text-2xl ${currentLight.icon}`}>
            {icon}
          </div>
        </div>
        <h3 className={`text-3xl font-bold mb-1 ${currentLight.text}`}>{value}</h3>
        <p className={`text-sm ${currentLight.text} opacity-70`}>{label}</p>
      </div>
    );
  }

  // TEMA ESCURO (INALTERADO)
  return (
    <div className={`p-6 rounded-2xl bg-gradient-to-br ${darkGradients[color]} border border-slate-700/50 transition-all duration-300 hover:scale-[1.02]`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${darkIconBg[color]} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
      <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
      <p className="text-slate-400 text-sm">{label}</p>
    </div>
  );
};

export default StatCard;
