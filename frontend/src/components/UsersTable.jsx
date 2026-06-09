import { usePreferences } from '../contexts/PreferencesContext';

const UsersTable = ({ users, onEditUser, onToggleUserStatus }) => {
  const { preferences } = usePreferences();

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
    <div className={`rounded-2xl bg-background-secondary border border-border overflow-hidden transition-all duration-300 ${
      light ? 'shadow-light-box' : ''
    }`}>
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-text">Lista de Usuários</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background">
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Usuário
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Nível
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map(user => (
              <tr key={user.id} className={`bg-surface hover:bg-surface-hover transition-colors ${!user.is_active ? 'opacity-60' : ''}`}>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-text">{user.username || '-'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-secondary">{user.email}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${user.role === 'admin' ? 'bg-warning/10 text-warning' : 'bg-surface text-text-secondary'} ${light ? 'border ' + (user.role === 'admin' ? 'border-warning/20' : 'border-border') : ''}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${user.is_active ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'} ${light ? 'border ' + (user.is_active ? 'border-success/20' : 'border-danger/20') : ''}`}>
                    {user.is_active ? 'Ativo' : 'Desativado'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEditUser(user)}
                      className={`px-3 py-1.5 text-sm text-text-secondary hover:bg-surface rounded-lg transition-all ${light ? 'border border-border' : ''}`}
                    >
                      Editar
                    </button>
                    {user.username !== 'administrador' && (
                      <button
                        onClick={() => onToggleUserStatus(user.id, user.is_active)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                          user.is_active 
                            ? 'text-danger hover:bg-danger/10' 
                            : 'text-success hover:bg-success/10'
                        } ${light ? 'border ' + (user.is_active ? 'border-danger/20' : 'border-success/20') : ''}`}
                      >
                        {user.is_active ? 'Desativar' : 'Ativar'}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
