const Topbar = ({ title, onLogout }) => {
  return (
    <header className="h-16 bg-slate-900/50 backdrop-blur-md border-b border-slate-800/50 flex items-center justify-between px-6 fixed top-0 left-64 right-0 z-30">
      <h1 className="text-xl font-bold text-white">{title}</h1>
      
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-xl bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-all flex items-center justify-center">
          🔔
        </button>
        <button className="w-10 h-10 rounded-xl bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-all flex items-center justify-center">
          ⚙️
        </button>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
        >
          <span>🚪</span>
          <span className="text-sm font-medium">Sair</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
