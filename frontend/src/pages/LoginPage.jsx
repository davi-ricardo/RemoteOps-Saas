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
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-info/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="relative z-10 w-full max-w-6xl mx-4 flex">
        {/* Left Section - Features */}
        <div className="hidden lg:flex lg:w-1/2 bg-background-secondary backdrop-blur-sm rounded-l-2xl border border-border p-12 flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-text mb-2">RemoteOps</h1>
            <p className="text-text-secondary">Painel de Gerenciamento Centralizado</p>
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
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-xl">
                  {item.icon}
                </div>
                <span className="text-text-secondary">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Section - Login Form */}
        <div className="w-full lg:w-1/2 bg-surface-elevated rounded-2xl lg:rounded-l-none border border-border p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text mb-2">Bem-vindo de volta</h2>
              <p className="text-text-secondary">Entre com suas credenciais</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">E-mail ou Usuário</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu e-mail ou nome de usuário"
                  className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  required
                />
              </div>
              
              {error && (
                <div className="p-4 bg-danger/10 border border-danger/20 rounded-xl text-danger text-sm">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-primary to-info hover:from-primary-hover hover:to-info text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
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
