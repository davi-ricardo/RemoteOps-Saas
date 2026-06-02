import { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await onLogin(email, password, setError, setLoading);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="relative z-10 w-full max-w-6xl mx-4 flex">
        {/* Left Section - Features */}
        <div className="hidden lg:flex lg:w-1/2 bg-slate-900/50 backdrop-blur-sm rounded-l-2xl border border-slate-800/50 p-12 flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">RemoteOps</h1>
            <p className="text-slate-400">Painel de Gerenciamento Centralizado</p>
          </div>
          
          <div className="space-y-6">
            {[
              { icon: '🖥️', text: 'Gestão de dispositivos em tempo real' },
              { icon: '📊', text: 'Inventário centralizado e organizado' },
              { icon: '🔐', text: 'Controle de acesso seguro por funções' },
              { icon: '📈', text: 'Relatórios de atendimento detalhados' },
              { icon: '🔗', text: 'Integração nativa com RustDesk' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-xl">
                  {item.icon}
                </div>
                <span className="text-slate-300">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Section - Login Form */}
        <div className="w-full lg:w-1/2 bg-slate-900 rounded-2xl lg:rounded-l-none border border-slate-800/50 p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Bem-vindo de volta</h2>
              <p className="text-slate-400">Entre com suas credenciais</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">E-mail ou Usuário</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu e-mail ou nome de usuário"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  required
                />
              </div>
              
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
