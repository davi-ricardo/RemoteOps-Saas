const UsersTable = ({ users, onEditUser, onToggleUserStatus }) => {
  return (
    <div className="rounded-2xl bg-slate-900/50 border border-slate-800/50 overflow-hidden">
      <div className="p-6 border-b border-slate-800/50">
        <h3 className="text-lg font-semibold text-white">Lista de Usuários</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-800/30">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Usuário
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Nível
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {users.map(user => (
              <tr key={user.id} className={`hover:bg-slate-800/30 transition-colors ${!user.is_active ? 'opacity-60' : ''}`}>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-white">{user.username || '-'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-400">{user.email}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${user.role === 'admin' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-slate-800 text-slate-400'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${user.is_active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {user.is_active ? 'Ativo' : 'Desativado'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEditUser(user)}
                      className="px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700 rounded-lg transition-all"
                    >
                      Editar
                    </button>
                    {user.username !== 'administrador' && (
                      <button
                        onClick={() => onToggleUserStatus(user.id, user.is_active)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                          user.is_active 
                            ? 'text-red-400 hover:bg-red-500/10' 
                            : 'text-green-400 hover:bg-green-500/10'
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
