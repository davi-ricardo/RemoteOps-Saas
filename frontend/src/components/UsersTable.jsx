const UsersTable = ({ users, onEditUser, onToggleUserStatus }) => {
  return (
    <div className="rounded-2xl bg-background-secondary border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-text">Lista de Usuários</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface/30">
            <tr>
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
              <tr key={user.id} className={`hover:bg-surface/30 transition-colors ${!user.is_active ? 'opacity-60' : ''}`}>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-text">{user.username || '-'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-secondary">{user.email}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${user.role === 'admin' ? 'bg-warning/10 text-warning' : 'bg-surface text-text-secondary'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${user.is_active ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                    {user.is_active ? 'Ativo' : 'Desativado'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEditUser(user)}
                      className="px-3 py-1.5 text-sm text-text-secondary hover:bg-surface rounded-lg transition-all"
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
                        }`}
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
