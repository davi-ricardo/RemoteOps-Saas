const GroupsTable = ({ groups, onEditGroup, onDeleteGroup, onViewDevices }) => {
  return (
    <div className="rounded-2xl bg-slate-900/50 border border-slate-800/50 overflow-hidden">
      <div className="p-6 border-b border-slate-800/50">
        <h3 className="text-lg font-semibold text-white">Lista de Departamentos</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-800/30">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Descrição
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Dispositivos
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {groups.map(group => (
              <tr key={group.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-white">{group.name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-400">{group.description || '-'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-300">{group.device_count || 0}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onViewDevices(group.id)}
                      className="px-3 py-1.5 text-sm text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                    >
                      Ver IDs
                    </button>
                    <button
                      onClick={() => onEditGroup(group)}
                      className="px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700 rounded-lg transition-all"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDeleteGroup(group.id)}
                      className="px-3 py-1.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      Excluir
                    </button>
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

export default GroupsTable;
